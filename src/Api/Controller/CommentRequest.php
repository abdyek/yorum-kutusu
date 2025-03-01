<?php

namespace YorumKutusu\Api\Controller;
use YorumKutusu\Api\Core\Controller;
use YorumKutusu\Api\Core\Database;
use YorumKutusu\Api\Model\Product as ProductModel;
use YorumKutusu\Api\Model\Comment as CommentModel;

class CommentRequest extends Controller {
    protected function get() {
        $this->prepareRequest();
        $this->success(['request'=>$this->reqArr]);
    }
    private function prepareRequest() {
        $request = Database::getRows('SELECT * FROM comment_request cr INNER JOIN member m ON cr.member_id=m.member_id INNER JOIN product p ON p.product_id=cr.product_id WHERE cr.cancelled=0 AND cr.comment_request_answered=0 AND cr.product_request_id IS NULL LIMIT 10');
        $this->reqArr = [];
        foreach($request as $req) {
            $update = false;
            if($req['comment_id']) {
                $update = true;
            }
            $this->reqArr[] = [
                'id'=>$req['comment_request_id'],
                'member'=>[
                    'id'=>$req['member_id'],
                    'username'=>$req['member_username'],
                    'slug'=>$req['member_slug'],
                    'email'=>$req['member_email'],
                ],
                'product'=>[
                    'id'=>$req['product_id'],
                    'name'=>$req['product_name'],
                    'slug'=>$req['product_slug'],
                    //'requestId'=>$req['product_request_id'],
                ],
                'comment'=>[
                    'id'=>$req['comment_id'],
                    'text'=>$req['comment_text'],
                    'dateTime'=>$req['comment_request_date_time'],
                ],
                'update'=>$update
            ];
        }
    }
    protected function post() {
        $this->commentRequest = Database::existCheck('SELECT * FROM comment_request WHERE comment_request_answered=0 and cancelled=0 and comment_request_id=?', [$this->data['commentRequestID']]);
        if(!$this->commentRequest) {
            $this->setHttpStatus(404);
            exit();
        }
        Database::execute('UPDATE comment_request SET comment_request_answered=1, cancelled=?, admin_note=? WHERE comment_request_id=?', [($this->data['allow'])?0:1, $this->data['adminNote'], $this->data['commentRequestID']]);
        Database::execute('INSERT INTO comment_request_response (comment_request_id, admin_id, allowed_or_denied, admin_note) VALUES(?,?,?,?)', [
            $this->data['commentRequestID'],
            $this->userId,
            ($this->data['allow'])?1:0,
            $this->data['adminNote']
        ]);
        if($this->data['allow']) {
            if($this->commentRequest['comment_id']==null){
                Database::executeWithErr('INSERT INTO comment (member_id, product_id, admin_id, comment_text, comment_create_date_time) VALUES(?,?,?,?,?)', [
                    $this->commentRequest['member_id'],
                    $this->commentRequest['product_id'],
                    $this->userId,
                    $this->commentRequest['comment_text'],
                    $this->commentRequest['comment_request_date_time']
                ]);
                ProductModel::increaseCommentCount($this->commentRequest['product_id']);
                CommentModel::increaseNewCommentCount($this->commentRequest['product_id']);
            } else {
                Database::executeWithErr('UPDATE comment SET comment_text=?, comment_edited=1, comment_last_edit_date_time=? WHERE comment_id=?', [$this->commentRequest['comment_text'], $this->commentRequest['comment_request_date_time'],$this->commentRequest['comment_id']]);
            }
        } else {
            CommentModel::removeRating($this->commentRequest['product_id'], $this->commentRequest['member_id']);
        }
        $this->success();
    }
}
