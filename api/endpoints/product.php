<?php

class Product extends Request {
    protected function get() {
        if(!Database::existCheck('SELECT * FROM product WHERE product_id=? AND product_visible=1', [$this->data['productID']])) {
            $this->setHttpStatus(404);
            exit();
        }
        if(!$this->data['onlyComment']) {
            $this->getProductInfo();
            $this->getTags();
        }
        $this->getCommentsWithRating();
        $this->updateLastSeen();
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
            $sql = 'SELECT * FROM comment c INNER JOIN member m ON m.member_id = c.member_id  WHERE c.product_id=? AND c.comment_deleted=0 ORDER BY c.comment_create_date_time LIMIT '.$index.', 10';
        }
        $arr = [$this->data['productID']];
        $comments = Database::getRows($sql, $arr);
        $this->commentsInfo = [];
        foreach($comments as $com) {
            $rating = Database::getRows('SELECT t.tag_slug, t.tag_name, tr.tag_rating_value FROM tag_rating tr INNER JOIN tag_with_product twp ON twp.tag_with_product_id=tr.tag_with_product_id INNER JOIN tag t ON t.tag_id=twp.tag_id WHERE tr.member_id=? AND twp.product_id=?', [$com['member_id'], $this->data['productID']]);
            $liked = (USERID!=null and Database::getRow('SELECT * FROM comment_like WHERE member_id=? and comment_id=?', [USERID, $com['comment_id']]))?true:false;
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
                'commentID'=>$com['comment_id'],
                'commentText'=>$com['comment_text'],
                'commentCreateDateTime'=>$com['comment_create_date_time'],
                'commentEdited'=>$com['comment_edited'],
                'commentLastEditDateTime'=>$com['comment_last_edit_date_time'],
                'commentLikeCount'=>$com['comment_like_count'],
                'liked'=>$liked,
                'owner'=>(USERID!=null and USERID==$com['member_id'])?true:false,
                'rating'=>[
                    $ratingInfo
                ]
            ];
        }
    }
    private function updateLastSeen() {
        if(USERID and $this->data['sortBy']=='time'){
            // şuan için sadece kronolojik sırada okundu olarak işaretliyorum, diğer türlü yatlıyor
            $lashComment = end($this->commentsInfo);
            $check = (Database::getRow('SELECT last_seen_date_time FROM product_follow WHERE product_id=? AND member_id=? AND ?>last_seen_date_time', [$this->data['productID'], USERID, $lashComment['commentCreateDateTime']]))?true:false;
            if($check) {
                $query = Database::execute('UPDATE product_follow SET last_seen_date_time=? WHERE member_id=? AND product_id=?', [$lashComment['commentCreateDateTime'],USERID, $this->data['productID']]);
            }
        }
    }
    private function mergeAllInfo() {
        if(!$this->data['onlyComment']) {
            $this->success(array_merge(
                $this->productInfo, ['tags'=>array_values($this->tagsInfo)], ['comments'=>$this->commentsInfo]
            ));
        } else {
            $this->success(
                ['comments'=>$this->commentsInfo]
            );
        }
    }
    protected function post() {
        
    }
}