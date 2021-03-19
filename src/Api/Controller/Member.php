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
        //$this->prepareFollowProduct();  --> bu sonra kaldırılacak
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
            $rating = Database::getRows('SELECT t.tag_slug, t.tag_name, tr.tag_rating_value FROM tag_rating tr INNER JOIN tag_with_product twp ON twp.tag_with_product_id=tr.tag_with_product_id INNER JOIN tag t ON t.tag_id=twp.tag_id WHERE tr.member_id=? AND twp.product_id=?', [$this->member['member_id'], $product['product_id']]);
            $this->ratingInfo = [];
            foreach($rating as $rate) {
                $this->ratingInfo[] = [
                    'slug'=>$rate['tag_slug'],
                    'tagName'=>$rate['tag_name'],
                    'ratingValue'=>$rate['tag_rating_value']
                ];
            }
            $owner = ($this->who==='member' and $com['member_id']==$this->userId)?true:false;
            $this->commentsInfo[] = [
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
                'isOwner'=>$owner,
                'rating'=>$this->ratingInfo
            ];
        }
    }
    private function prepareFollowProduct() {
        // bu işi followProduct'ın get'i ile çözdüm
    }
    private function mergeAllInfo() {
        $this->success([
            'member'=>$this->memberInfo,
            'comments'=>$this->commentsInfo
        ]);
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
