<?php

class Product extends Request {
    protected function get() {
        $this->productInfo = Database::existCheck('SELECT * FROM product WHERE product_slug=? AND product_deleted=0', [$this->data['productSlug']]);
        if(!$this->productInfo) {
            $this->setHttpStatus(404);
            exit();
        }
        $this->getProductInfo();
        if(!$this->data['onlyComment']) {
            $this->getTags();
        }
        $this->getCommentsWithRating();
        $this->updateLastSeen();
        $this->mergeAllInfo();
        $this->increaseProductFetchCount();
    }
    private function getProductInfo() {
        $this->productInfo = [
            'id'=>$this->productInfo['product_id'],
            'title'=>$this->productInfo['product_name'],
            'slug'=>$this->productInfo['product_slug']
        ];
    }
    private function getTags() {
        $tags = Database::getRows('SELECT * FROM tag_with_product twp INNER JOIN tag t ON t.tag_id=twp.tag_id WHERE twp.product_slug=?', [$this->data['productSlug']]);
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
        if($this->data['pageNumber']<1) {
            $this->data['pageNumber'] = 1;
        }
        $index = ($this->data['pageNumber']-1)*10;
        if($this->data['sortBy']=='like') {
            $sql = 'SELECT * FROM comment c INNER JOIN member m ON m.member_id = c.member_id  WHERE c.product_id=? AND c.comment_deleted=0 ORDER BY c.comment_like_count DESC LIMIT '.$index.', 10';
        } elseif($this->data['sortBy']=='time') {
            $sql = 'SELECT * FROM comment c INNER JOIN member m ON m.member_id = c.member_id  WHERE c.product_id=? AND c.comment_deleted=0 ORDER BY c.comment_create_date_time LIMIT '.$index.', 10';
        }
        $arr = [$this->productInfo['id']];
        $comments = Database::getRows($sql, $arr);
        $this->commentsInfo = [];
        foreach($comments as $com) {
            $rating = Database::getRows('SELECT t.tag_slug, t.tag_name, tr.tag_rating_value FROM tag_rating tr INNER JOIN tag_with_product twp ON twp.tag_with_product_id=tr.tag_with_product_id INNER JOIN tag t ON t.tag_id=twp.tag_id WHERE tr.member_id=? AND twp.product_id=?', [$com['member_id'], $this->productInfo['id']]);
            $liked = (defined('USERID') and Database::getRow('SELECT * FROM comment_like WHERE member_id=? and comment_id=?', [USERID, $com['comment_id']]))?true:false;
            $ratingInfo = [];
            foreach($rating as $rate) {
                $ratingInfo[] = [
                    'slug'=>$rate['tag_slug'],
                    'tagName'=>$rate['tag_name'],
                    'ratingValue'=>$rate['tag_rating_value']
                ];
            }
            $this->commentsInfo[] = [
                'commentID'=>$com['comment_id'],
                'commentText'=>$com['comment_text'],
                'commentCreateDateTime'=>$com['comment_create_date_time'],
                'commentEdited'=>$com['comment_edited'],
                'commentLastEditDateTime'=>$com['comment_last_edit_date_time'],
                'commentLikeCount'=>$com['comment_like_count'],
                'liked'=>$liked,
                'isOwner'=>(defined('USERID') and USERID==$com['member_id'])?true:false,
                'owner'=>[
                    'id'=>$com['member_id'],
                    'username'=>$com['member_username'],
                    'slug'=>$com['member_slug'],
                ],
                'rating'=>$ratingInfo
                
            ];
        }
    }
    private function updateLastSeen() {
        if(defined('USERID') and $this->data['sortBy']=='time'){
            // şuan için sadece kronolojik sırada okundu olarak işaretliyorum, diğer türlü yatlıyor
            $lashComment = end($this->commentsInfo);
            $check = (Database::getRow('SELECT last_seen_date_time FROM product_follow WHERE product_slug=? AND member_id=? AND ?>last_seen_date_time', [$this->data['productSlug'], USERID, $lashComment['commentCreateDateTime']]))?true:false;
            if($check) {
                $query = Database::execute('UPDATE product_follow SET last_seen_date_time=? WHERE member_id=? AND product_slug=?', [$lashComment['commentCreateDateTime'],USERID, $this->data['productSlug']]);
            }
        }
    }
    private function mergeAllInfo() {
        if(!$this->data['onlyComment']) {
            $this->success(array_merge(
                ['product'=>$this->productInfo], ['tags'=>array_values($this->tagsInfo)], ['comments'=>$this->commentsInfo]
            ));
        } else {
            $this->success(
                ['comments'=>$this->commentsInfo]
            );
        }
    }
    private function increaseProductFetchCount() {
        // artırım buradan gerçekleştirilecek
        if(WHO=='member') {
            $temp = Database::existCheck('SELECT product_fetch_temp_id FROM product_fetch_temp WHERE product_slug=? AND member_id=?', [$this->data['productSlug'], USERID]);
            if($temp) {
                Database::execute('UPDATE product_fetch_temp SET fetch_count=fetch_count+1 WHERE product_fetch_temp_id=?', [$temp['product_fetch_temp_id']]);
            } else {
                Database::execute('INSERT INTO product_fetch_temp (product_id, member_id, fetch_count) VALUES (?,?,1)',[$this->productInfo['id'], USERID]);
            }
        } else if(WHO=='guest') {
            $temp = Database::existCheck('SELECT product_fetch_temp_id FROM product_fetch_temp WHERE product_id=? AND ip_address=?', [$this->productInfo['id'], $_SERVER['REMOTE_ADDR']]);
            if($temp) {
                Database::execute('UPDATE product_fetch_temp SET fetch_count=fetch_count+1 WHERE product_fetch_temp_id=?', [$temp['product_fetch_temp_id']]);
            } else {
                Database::execute('INSERT INTO product_fetch_temp (product_id, ip_address, fetch_count) VALUES (?,?,1)',[$this->productInfo['id'], $_SERVER['REMOTE_ADDR']]);
            }
        }
    }
}
