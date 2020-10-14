<?php

class FollowProduct extends Request {
    protected function post() {
        if(!$this->productCheck()) {
            $this->setHttpStatus(404);
            exit();
        }
        if($this->data['follow']) {
            $this->productFollow();
        } else {
            $this->productUnfollow();
        }
    }
    private function productCheck() {
        return Database::existCheck('SELECT * FROM product WHERE product_id=? AND product_visible=1', [$this->data['productID']]);
    }
    private function productFollow() {
        $check = Database::existCheck('SELECT * FROM product_follow WHERE product_id=? AND member_id=?', [$this->data['productID'], USERID]);
        if($check) {
            $this->success();
            exit();
        }
        $query = Database::executeWithError('INSERT INTO product_follow (member_id, product_id) VALUES (?,?)', [USERID, $this->data['productID']]);
        $query2 = Database::executeWithError('INSERT INTO product_follow_history (member_id, product_id, follow_or_unfollow) VALUES (?,?,1)', [USERID, $this->data['productID']]);
        if(!$query[0] or !$query2[0]) {
            $this->setHttpStatus(500);
            exit();
        }
        $this->success();
    }
    private function productUnfollow() {
        $check = Database::existCheck('SELECT * FROM product_follow WHERE product_id=? AND member_id=?', [$this->data['productID'], USERID]);
        if(!$check) {
            $this->success();
            exit();
        }
        $query = Database::executeWithError('DELETE FROM product_follow WHERE member_id=? AND product_id=?', [USERID, $this->data['productID']]);
        $query2 = Database::executeWithError('INSERT INTO product_follow_history (member_id, product_id, follow_or_unfollow) VALUES (?,?,0)', [USERID, $this->data['productID']]);
        if(!$query[0] or !$query2[0]) {
            $this->setHttpStatus(500);
            exit();
        }
        $this->success();
    }
    protected function get() {
        if(is_string($this->data['totalPage']) or $this->data['totalPage']<1){
            $this->data['totalPage']=1;
        }
        $index = $this->data['totalPage']*10;
        $followingProduct = Database::getRows('SELECT p.product_id, p.product_slug, p.product_name, pw.last_seen_date_time FROM product_follow pw INNER JOIN product p ON pw.product_id = p.product_id WHERE p.product_visible=1 AND pw.member_id=? LIMIT 0, '.$index, [USERID]);
        $arr = [];
        foreach($followingProduct as $fp) {
            $newComment = Database::getRow('SELECT count(*) as newComment FROM comment WHERE product_id=? and member_id!=? and ?<comment_create_date_time', [$fp['product_id'], USERID, $fp['last_seen_date_time']])['newComment'];
            $arr[] = [
                'productID'=>$fp['product_id'],
                'productSlug'=>$fp['product_slug'],
                'productName'=>$fp['product_name'],
                'newComment'=>$newComment
            ];
        }
        $this->success($arr);
    }
}