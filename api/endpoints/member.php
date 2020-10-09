<?php

class Member extends Request {
    protected function get() {
        $this->member = Database::existCheck('SELECT * FROM member WHERE member_id=? and member_deleted=0', [$this->data['memberID']]);
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
        $this->ownerBool = (USERID==$this->data['memberID'])?true:false;
    }
    private function prepareMemberInfo() {
        $this->memberInfo = [
            'memberUsername'=>$this->member['member_username'],
            'memberSlug'=>$this->member['member_slug'],
            'owner'=>$this->ownerBool
        ];
    }
    private function prepareCommentsWithRating() {
        $comments = Database::getRows('SELECT * FROM comment WHERE member_id=? AND comment_deleted=0', [$this->data['memberID']]);
        $this->commentsInfo = [];
        foreach($comments as $com) {
            $product = Database::getRow('SELECT product_id, product_name, product_slug FROM product WHERE product_id=? and product_visible=1', [$com['product_id']]);
            if(!$product) {
                continue;
            }
            $liked = (Database::getRow('SELECT * FROM comment_like WHERbE comment_id=? AND member_id=?', [$com['comment_id'], USERID]))?true:false;
            $rating = Database::getRows('SELECT t.tag_slug, t.tag_name, tr.tag_rating_value FROM tag_rating tr INNER JOIN tag_with_product twp ON twp.tag_with_product_id=tr.tag_with_product_id INNER JOIN tag t ON t.tag_id=twp.tag_id WHERE tr.member_id=? AND twp.product_id=?', [$this->data['memberID'], $product['product_id']]);
            $this->ratingInfo = [];
            foreach($rating as $rate) {
                $this->ratingInfo[] = [
                    'slug'=>$rate['tag_slug'],
                    'tagName'=>$rate['tag_name'],
                    'ratingValue'=>$rate['tag_rating_value']
                ];
            }
            $owner = $com['member_id']==USERID;
            $this->commentsInfo[] = [
                'productID'=>$product['product_id'],
                'productName'=>$product['product_name'],
                'productSlug'=>$product['product_slug'],
                'commentText'=>$com['comment_text'],
                'commentCreateDateTime'=>$com['comment_create_date_time'],
                'commentEdited'=>$com['comment_edited'],
                'commentLastEditDateTime'=>$com['comment_last_edit_date_time'],
                'commentLikeCount'=>$com['comment_like_count'],
                'liked'=>$liked,
                'owner'=>$owner,
                'rating'=>[
                    $this->ratingInfo
                ]
            ];
        }
    }
    private function mergeAllInfo() {
        $this->success([
            'member'=>$this->memberInfo,
            'comments'=>$this->commentsInfo
        ]);
    }
}