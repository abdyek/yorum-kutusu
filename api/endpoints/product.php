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
        $this->hasComment = null;
        $this->getFollowInfo();
        $this->getPageCount();
        $this->getHiddenComment();
        $this->getReportedComment();
        $this->getCommentsWithRating();
        $this->updateLastSeen();
        $this->mergeAllInfo();
        $this->increaseProductFetchCount();
    }
    private function getFollowInfo() {
        $this->followed = false;
        if(WHO!="guest") {
            $query = Database::getRow('SELECT product_follow_id FROM product_follow WHERE product_id=? AND member_id=?', [$this->productInfo['id'], USERID]);
            $this->followed = ($query)?true:false;
        }
    }
    private function getProductInfo() {
        $this->productInfo = [
            'id'=>$this->productInfo['product_id'],
            'title'=>$this->productInfo['product_name'],
            'slug'=>$this->productInfo['product_slug']
        ];
    }
    private function getTags() {
        $tags = Database::getRows('SELECT * FROM tag_with_product twp INNER JOIN tag t ON t.tag_id=twp.tag_id WHERE twp.product_id=?', [$this->productInfo['id']]);
        $this->tagsInfo = [];
        foreach($tags as $tag) {
            $this->tagsInfo[] = [
                'id'=>$tag['tag_id'],
                'slug'=>$tag['tag_slug'],
                'tagName'=>$tag['tag_name'],
                'tagAvarageRating'=>$tag['tag_avarage_rating'],
                'tagPassive'=>$tag['tag_passive']
            ];
        }
    }
    private function getHiddenComment() {
        $this->hiddenComment = [];
        if(WHO=='member') {
            $query = Database::getRows('SELECT comment_id FROM hidden_comment WHERE member_id=?', [USERID]);
            foreach($query as $key=>$q) {
                $this->hiddenComment[] = $q['comment_id'];
            }
        }
    }
    private function getReportedComment() {
        $this->reportedComment = [];
        if(WHO=='member') {
            $query = Database::getRows('SELECT comment_id FROM comment_report_request WHERE report_answered=0 and member_id=?', [USERID]);
            foreach($query as $q) {
                $this->reportedComment[] = $q['comment_id'];
            }
        }
    }
    private function getCommentsWithRating() {
        if($this->data['pageNumber']<1) {
            $this->data['pageNumber'] = 1;
        } elseif($this->data['pageNumber']>$this->pageCount) {
            $this->data['pageNumber'] = $this->pageCount;
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
        foreach($comments as $key=>$com) {
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
            $this->hasComment = (defined('USERID') and USERID==$com['member_id'])?true:false;
            if($this->hasComment) {
                $this->ownCommentIndex = $key;
            }
            $this->commentsInfo[] = [
                'commentID'=>$com['comment_id'],
                'commentText'=>$com['comment_text'],
                'commentCreateDateTime'=>$com['comment_create_date_time'],
                'commentEdited'=>$com['comment_edited'],
                'commentLastEditDateTime'=>$com['comment_last_edit_date_time'],
                'commentLikeCount'=>$com['comment_like_count'],
                'liked'=>$liked,
                'isOwner'=> $this->hasComment,
                'reported'=> (in_array($com['comment_id'],$this->reportedComment))?true:false,
                'hidden'=>(in_array($com['comment_id'], $this->hiddenComment))?true:false,
                'owner'=>[
                    'id'=>$com['member_id'],
                    'username'=>$com['member_username'],
                    'slug'=>$com['member_slug'],
                ],
                'rating'=>$ratingInfo
                
            ];
        }
    }
    private function getPageCount() {
        $this->pageCount = intval(Database::getRow('SELECT count(*) as commentCount FROM comment c INNER JOIN product p ON p.product_id = c.product_id WHERE p.product_slug=? and c.comment_deleted=0', [$this->data['productSlug']])['commentCount'] / 10)+1;
    }
    private function updateLastSeen() {
        if(defined('USERID') and $this->data['sortBy']=='time' and count($this->commentsInfo)){
            // şuan için sadece kronolojik sırada okundu olarak işaretliyorum, diğer türlü yatlıyor
            $lastComment = end($this->commentsInfo);
            $check = (Database::getRow('SELECT last_seen_date_time FROM product_follow WHERE product_slug=? AND member_id=? AND ?>last_seen_date_time', [$this->data['productSlug'], USERID, $lastComment['commentCreateDateTime']]))?true:false;
            if($check) {
                $query = Database::execute('UPDATE product_follow SET last_seen_date_time=? WHERE member_id=? AND product_slug=?', [$lastComment['commentCreateDateTime'],USERID, $this->data['productSlug']]);
            }
        }
    }
    private function mergeAllInfo() {
        if(!$this->data['onlyComment']) {
            $this->success([
                'product'=>$this->productInfo,
                'followed'=>$this->followed,
                'tags'=>array_values($this->tagsInfo),
                'comments'=>$this->commentsInfo,
                'ownComment'=>(isset($this->ownCommentIndex))?$this->commentsInfo[$this->ownCommentIndex]:null,
                'pageNumber'=>$this->data['pageNumber'],
                'pageCount'=> $this->pageCount
            ]);
        } else {
            $this->success([
                'comments'=>$this->commentsInfo,
                'ownComment'=>(isset($this->ownCommentIndex))?$this->commentsInfo[$this->ownCommentIndex]:null,
                'pageNumber'=>$this->data['pageNumber'],
                'pageCount'=> $this->pageCount
            ]);
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
