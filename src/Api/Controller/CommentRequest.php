<?php

namespace YorumKutusu\Api\Controller;
use YorumKutusu\Api\Core\Controller;
use YorumKutusu\Api\Core\Database;

class CommentRequest extends Controller {
    protected function get() {
        $this->prepareRequest();
        $this->success(['request'=>$this->reqArr]);
    }
    private function prepareRequest() {
        $request = Database::getRows('SELECT * FROM comment_request cr INNER JOIN member m ON cr.member_id=m.member_id WHERE cr.cancelled=0 AND cr.comment_request_answered=0 AND cr.product_request_id IS NULL');
        $this->reqArr = [];
        foreach($request as $req) {
            $update = false;
            if($req['comment_id']) {
                $update = true;
            }
            $this->reqArr[] = [
                'commentRequestID'=>$req['comment_request_id'],
                'memberID'=>$req['member_id'],
                'productRequestID'=>$req['product_request_id'],
                'productID'=>$req['product_id'],
                'commentID'=>$req['comment_id'],
                'commentText'=>$req['comment_text'],
                'commentRequestDateTime'=>$req['comment_request_date_time'],
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
        Database::execute('UPDATE comment_request SET comment_request_answered=1, admin_note=? WHERE comment_request_id=?', [$this->data['adminNote'], $this->data['commentRequestID']]);
        Database::execute('INSERT INTO comment_request_response (comment_request_id, admin_id, allowed_or_denied, admin_note) VALUES(?,?,?,?)', [
            $this->data['commentRequestID'],
            $this->userId,
            ($this->data['allow'])?1:0,
            $this->data['adminNote']
        ]);
        if($this->data['allow']) {
            Database::executeWithErr('INSERT INTO comment (member_id, product_id, admin_id, comment_text, comment_create_date_time) VALUES(?,?,?,?,?)', [
                $this->commentRequest['member_id'],
                $this->commentRequest['product_id'],
                $this->userId,
                $this->commentRequest['comment_text'],
                $this->commentRequest['comment_request_date_time']
            ]);
        }
        $this->success();
    }
}
