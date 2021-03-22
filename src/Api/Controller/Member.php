<?php

namespace YorumKutusu\Api\Controller;
use YorumKutusu\Api\Core\Controller;
use YorumKutusu\Api\Core\Database;
use YorumKutusu\Api\Controller\Product as ProductController;

class Member extends Controller {
    protected function get() {
        $this->member = Database::existCheck('SELECT * FROM member WHERE member_slug=? and member_deleted=0', [$this->data['slug']]);
        if(!$this->member) {
            $this->setHttpStatus(404);
            exit();
        }
        $this->ownerCheck();
        $this->prepareMemberInfo();
        $this->prepareCommentsWithRating();
        $this->mergeAllInfo();
    }
    private function ownerCheck() {
        $this->ownerBool = ($this->who=='member' and $this->userId==$this->member['member_id'])?true:false;
    }
    private function prepareMemberInfo() {
        $this->memberInfo = [
            'username'=>$this->member['member_username'],
            'slug'=>$this->member['member_slug'],
            'owner'=>$this->ownerBool,
            'email'=>($this->ownerBool)?$this->member['member_email']:null
        ];
    }
    private function prepareCommentsWithRating() {
        if(is_string($this->data['pageNumber']) or $this->data['pageNumber']<1) {
            $this->data['pageNumber'] = 1;
        }
        $index = ($this->data['pageNumber']-1)*10;
        if($this->data['sortBy']=='like') {
            $sql = 'SELECT * FROM comment c INNER JOIN member m ON m.member_id = c.member_id  WHERE c.member_id=? AND c.comment_deleted=0 ORDER BY c.comment_like_count DESC LIMIT '.$index.', 10';
        } elseif($this->data['sortBy']=='time') {
            $sql = 'SELECT * FROM comment c INNER JOIN member m ON m.member_id = c.member_id  WHERE c.member_id=? AND c.comment_deleted=0 ORDER BY c.comment_create_date_time LIMIT '.$index.', 10';
        }
        $comments = Database::getRows($sql, [$this->member['member_id']]);
        $this->commentsInfo = [];
        foreach($comments as $com) {
            $product = Database::getRow('SELECT product_id, product_name, product_slug FROM product WHERE product_id=? and product_deleted=0', [$com['product_id']]);
            if(!$product) {
                continue;
            }
            $liked = (Database::getRow('SELECT * FROM comment_like WHERE comment_id=? AND member_id=?', [$com['comment_id'],$this->userId]))?true:false;
            $tags = ProductController::getTags($product['product_id']);
            $this->ratingInfo = $this->getTagRating($this->member['member_id'], $product['product_id']);
            $this->commentsInfo[$com['comment_id']] = [
                'product'=>[
                    'id'=>$product['product_id'],
                    'name'=>$product['product_name'],
                    'slug'=>$product['product_slug'],
                    'tags'=>$tags
                ],
                'commentID'=>$com['comment_id'],
                'commentText'=>$com['comment_text'],
                'commentCreateDateTime'=>$com['comment_create_date_time'],
                'commentEdited'=>($com['comment_edited']==="1")?true:false,
                'commentLastEditDateTime'=>$com['comment_last_edit_date_time'],
                'commentLikeCount'=>$com['comment_like_count'],
                'liked'=>$liked,
                'isOwner'=>$this->ownerBool,
                'rating'=>$this->ratingInfo,
                'commentPublished'=>true,
            ];
        }
        if($this->ownerBool AND $this->member['member_restricted']==='1') {
            //$request = Database::getRows('SELECT * FROM comment_request WHERE member_id=? AND cancelled=0 AND comment_request_answered=0', [$this->userId]);
            $request = Database::getRows('SELECT cr.member_id, cr.product_id, cr.comment_id, cr.comment_text, cr.comment_request_date_time, p.product_name, p.product_slug FROM comment_request cr INNER JOIN product p ON p.product_id=cr.product_id WHERE cr.member_id=1 AND cancelled=0 AND comment_request_answered=0', [$this->userId]);
            $commentIDs = array_keys($this->commentsInfo);
            $this->commentRequests = [];
            foreach($request as $com) {
                $comId = $com['comment_id'];
                $tags = ProductController::getTags($com['product_id']);
                $ratingInfo = $this->getTagRating($this->member['member_id'], $com['product_id']);
                if($comId===NULL) {
                    $this->commentRequests[] = [
                        'product'=>[
                            'id'=>$com['product_id'],
                            'name'=>$com['product_name'],
                            'slug'=>$com['product_slug'],
                            'tags'=>$tags
                        ],
                        'commentID'=>null,
                        'commentText'=>$com['comment_text'],
                        'commentCreateDateTime'=>$com['comment_request_date_time'],
                        'commentEdited'=>false,
                        'commentLastEditDateTime'=>null,
                        'commentLikeCount'=>0,
                        'liked'=>false,
                        'isOwner'=>true,
                        'rating'=>$ratingInfo,
                        'commentPublished'=>false,
                    ];
                } else if(in_array($comId, $commentIDs)) {
                    $this->commentsInfo[$comId]['commentPublished'] = false;
                    $this->commentsInfo[$comId]['commentText'] = $com['comment_text'];
                    $this->commentsInfo[$comId]['commentEdited'] = true;
                    $this->commentsInfo[$comId]['commentLastEditDateTime'] = $com['comment_request_date_time'];
                }
            }
        }
    }
    private function mergeAllInfo() {
        $this->success([
            'member'=>$this->memberInfo,
            'comments'=>array_values($this->commentsInfo),
            'newCommentRequests'=>($this->ownerBool)?$this->commentRequests:[]
        ]);
    }
    private function getTagRating($memberId, $productId) {
        $rating = Database::getRows('SELECT t.tag_slug, t.tag_name, tr.tag_rating_value FROM tag_rating tr INNER JOIN tag_with_product twp ON twp.tag_with_product_id=tr.tag_with_product_id INNER JOIN tag t ON t.tag_id=twp.tag_id WHERE tr.member_id=? AND twp.product_id=?', [$memberId, $productId]);
        $ratingInfo = [];
        foreach($rating as $rate) {
            $ratingInfo[] = [
                'slug'=>$rate['tag_slug'],
                'tagName'=>$rate['tag_name'],
                'ratingValue'=>$rate['tag_rating_value']
            ];
        }
        return $ratingInfo;
    }
    protected function delete() {
        if($this->who=='member') {
            $this->ownerCheck();
            if(!$this->ownerBool or !$this->passwordCheck()) {
                $this->setHttpStatus(403);
                exit();
            }
            Database::execute('UPDATE member SET member_deleted=1 WHERE member_id=?', [$this->userId]);
            Database::execute('INSERT INTO member_delete_history (member_id) VALUES(?)', [$this->userId]);
            // log out
            if(isset($_COOKIE['jwt'])){
                unset($_COOKIE['jwt']);
                setcookie('jwt',null, -1);
            }
        } else if($this->who=='admin') {
            $this->adminCheck();
            if(!$this->admin or !$this->passwordCheck(true)) {
                $this->setHttpStatus(403);
                exit();
            }
            $this->memberCheck();
            if(!$this->member) {
                $this->setHttpStatus(404);
                exit();
            }
            Database::execute('UPDATE member SET member_deleted=1 WHERE member_id=?', [$this->data['memberID']]);
            Database::execute('INSERT INTO member_delete_history (admin_id, member_id) VALUES(?,?)', [$this->userId, $this->member['member_id']]);
        }
        $this->success();
    }
    private function passwordCheck($admin=false) {
        if($admin) {
            $sql = 'SELECT * FROM admin WHERE admin_id=?';
            $rowName = 'admin_password_hash';
        } else {
            $sql = 'SELECT * FROM member WHERE member_id=?';
            $rowName = 'member_password_hash';
        }
        $hash = Database::existCheck($sql, [$this->userId])[$rowName];
        return password_verify($this->data['password'], $hash);
    }
    private function adminCheck() {
        $this->admin = Database::existCheck('SELECT * FROM admin WHERE admin_id=? AND admin_inactive=0', [$this->userId]);
    }
    private function memberCheck() {
        $this->member = Database::existCheck('SELECT * FROM member WHERE member_id=? AND member_deleted=0', [$this->data['memberID']]);
    }
    protected function patch() {
        $this->memberCheck();
        $restrict = ($this->data['restrict'])?1:0;
        if(!$this->member) {
            $this->setHttpStatus(404);
            exit();
        }
        if($this->member['member_restricted']==$restrict) {
            $this->success();
            exit();
        }
        Database::execute('INSERT INTO member_restricted_history (admin_id, member_id, restricted, admin_note) VALUES (?,?,?,?)', [$this->userId, $this->data['memberID'], $restrict, $this->data['adminNote']]);
        Database::execute('UPDATE member SET member_restricted=? WHERE member_id=?', [$restrict, $this->data['memberID']]);
        $this->success();
    }
}
