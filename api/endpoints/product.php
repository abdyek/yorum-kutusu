<?php

class Product extends Request {
    protected function get() {
        if(!Database::existCheck('SELECT * FROM product WHERE product_id=? AND product_visible=1', [$this->data['productID']])) {
            $this->setHttpStatus(404);
            exit();
        }
        $this->getProductInfo();
        $this->getTags();
        $this->getCommentsWithRating();
        $this->mergeAllInfo();
    }
    private function getProductInfo() {
        $product = Database::getRow('SELECT * FROM product WHERE product_id=? AND product_visible=1', [$this->data['productID']]);
        $this->productInfo = [
            'id'=>$product['product_id'],
            'title'=>$product['product_name'],
            'slug'=>$product['product_slug']
        ];
    }
    private function getTags() {
        $tags = Database::getRows('SELECT * FROM tag_with_product twp INNER JOIN tag t ON t.tag_id=twp.tag_id WHERE twp.product_id=? and twp.tag_with_product_visible=1', [$this->data['productID']]);
        $this->tagsInfo = [];
        foreach($tags as $tag) {
            $this->tagsInfo[] = [
                'slug'=>$tag['tag_slug'],
                'tagName'=>$tag['tag_name'],
                'tagAvarageRating'=>$tag['tag_avarage_rating']
            ];
        }
    }
    private function getCommentsWithRating() {
        if(is_string($this->data['pageNumber']) or $this->data['pageNumber']<1) {
            $this->data['pageNumber'] = 1;
        }
        $index = ($this->data['pageNumber']-1)*10;
        if($this->data['sortBy']=='like') {
            $sql = 'SELECT * FROM comment c INNER JOIN member m ON m.member_id = c.member_id  WHERE c.product_id=? AND c.comment_deleted=0 ORDER BY c.comment_like_count DESC LIMIT '.$index.', 10';
        } elseif($this->data['sortBy']=='time') {
            $sql = 'SELECT * FROM comment c INNER JOIN member m ON m.member_id = c.member_id  WHERE c.product_id=1 AND c.comment_deleted=0 ORDER BY c.comment_create_date_time LIMIT '.$index.', 10';
        }
        $arr = [$this->data['productID']];
        $comments = Database::getRows($sql, $arr);
        $this->commentsInfo = [];
        foreach($comments as $com) {
            $rating = Database::getRows('SELECT t.tag_slug, t.tag_name, tr.tag_rating_value FROM tag_rating tr INNER JOIN tag_with_product twp ON twp.tag_with_product_id=tr.tag_with_product_id INNER JOIN tag t ON t.tag_id=twp.tag_id WHERE tr.member_id=? AND twp.product_id=?', [$com['member_id'], $this->data['productID']]);
            $liked = (isset($this->data['memberID']) and Database::getRow('SELECT * FROM comment_like WHERE member_id=? and comment_id=?', [$this->data['memberID'], $com['comment_id']]))?true:false;
            $ratingInfo = [];
            foreach($rating as $rate) {
                $ratingInfo[] = [
                    'slug'=>$rate['tag_slug'],
                    'tagName'=>$rate['tag_name'],
                    'ratingValue'=>$rate['tag_rating_value']
                ];
            }
            $this->commentsInfo[] = [
                'ownerID'=>$com['member_id'],
                'ownerUsername'=>$com['member_username'],
                'ownerSlug'=>$com['member_slug'],
                'commentText'=>$com['comment_text'],
                'commentCreateDateTime'=>$com['comment_create_date_time'],
                'commentEdited'=>$com['comment_edited'],
                'commentLastEditDateTime'=>$com['comment_last_edit_date_time'],
                'commentLikeCount'=>$com['comment_like_count'],
                'liked'=>$liked,
                'rating'=>[
                    $ratingInfo
                ]
            ];
        }
    }
    private function mergeAllInfo() {
        $allInfo = array_merge(
            $this->productInfo, ['tags'=>array_values($this->tagsInfo)], ['comments'=>$this->commentsInfo]
        );
        $this->success($allInfo);
    }
}