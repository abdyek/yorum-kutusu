<?php

namespace YorumKutusu\Api\Controller;
use YorumKutusu\Api\Core\Controller;
use YorumKutusu\Api\Core\Database;

class Product extends Controller {
    protected function get() {
        $this->checkSortBy();
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
    private function checkSortBy() {
        if(!in_array($this->data['type'], ['time', 'like', 'unread'])) {
            $this->setHttpStatus(400);
            exit();
        }
    }
    private function getProductInfo() {
        $product = Database::existCheck('SELECT * FROM product WHERE product_slug=? AND product_deleted=0', [$this->data['productSlug']]);
        if(!$product) {
            $this->setHttpStatus(404);
            exit();
        }
        $this->productInfo = [
            'id'=>$product['product_id'],
            'title'=>$product['product_name'],
            'slug'=>$product['product_slug']
        ];
    }
    private function getFollowInfo() {
        $this->followed = false;
        if($this->who!="guest") {
            $this->productFollowQuery = Database::getRow('SELECT product_follow_id, last_seen_date_time FROM product_follow WHERE product_id=? AND member_id=?', [$this->productInfo['id'],$this->userId]);
            $this->followed = ($this->productFollowQuery)?true:false;
        }
    }
    private function getPageCount() {
        $this->pageCount = intval(Database::getRow('SELECT count(*) as commentCount FROM comment c INNER JOIN product p ON p.product_id = c.product_id WHERE p.product_slug=? and c.comment_deleted=0', [$this->data['productSlug']])['commentCount'] / 10)+1;
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
        if($this->who=='member') {
            $query = Database::getRows('SELECT comment_id FROM hidden_comment WHERE member_id=?', [$this->userId]);
            foreach($query as $key=>$q) {
                $this->hiddenComment[] = $q['comment_id'];
            }
        }
    }
    private function getReportedComment() {
        $this->reportedComment = [];
        if($this->who=='member') {
            $query = Database::getRows('SELECT comment_id FROM comment_report_request WHERE report_answered=0 and member_id=?', [$this->userId]);
            foreach($query as $q) {
                $this->reportedComment[] = $q['comment_id'];
            }
        }
    }
    private function getCommentsWithRating() {
        $this->ownCommentPublished = true;
        $sql = $this->getCommentSql($this->data['type']);
        $arr = [$this->productInfo['id']];
        $comments = Database::getRows($sql, $arr);
        $this->commentsInfo = [];
        foreach($comments as $key=>$com) {
            $rating = Database::getRows('SELECT t.tag_slug, t.tag_name, tr.tag_rating_value FROM tag_rating tr INNER JOIN tag_with_product twp ON twp.tag_with_product_id=tr.tag_with_product_id INNER JOIN tag t ON t.tag_id=twp.tag_id WHERE tr.member_id=? AND twp.product_id=?', [$com['member_id'], $this->productInfo['id']]);
            $liked = (isset($this->userId) and Database::getRow('SELECT * FROM comment_like WHERE member_id=? and comment_id=?', [$this->userId, $com['comment_id']]))?true:false;
            $ratingInfo = [];
            foreach($rating as $rate) {
                $ratingInfo[] = [
                    'slug'=>$rate['tag_slug'],
                    'tagName'=>$rate['tag_name'],
                    'ratingValue'=>$rate['tag_rating_value']
                ];
            }
            $this->hasComment = (isset($this->userId) and $this->userId==$com['member_id'])?true:false;
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
    private function getCommentSql($type) {
        if(in_array($type, ['like', 'time'])) {
            if($this->data['pageNumber']<1) {
                $this->data['pageNumber'] = 1;
            } elseif($this->data['pageNumber']>$this->pageCount) {
                $this->data['pageNumber'] = $this->pageCount;
            }
            $index = ($this->data['pageNumber']-1)*10;
            if($type=='like') {
                return 'SELECT * FROM comment c INNER JOIN member m ON m.member_id = c.member_id  WHERE c.product_id=? AND c.comment_deleted=0 ORDER BY c.comment_like_count DESC LIMIT '.$index.', 10';
            } elseif($type=='time') {
                return 'SELECT * FROM comment c INNER JOIN member m ON m.member_id = c.member_id  WHERE c.product_id=? AND c.comment_deleted=0 ORDER BY c.comment_create_date_time LIMIT '.$index.', 10';
            }
        } else {
            if($this->who=="member") {
                if(!$this->followed) {
                    $this->data['type']='time';
                    return $this->getCommentSql('time');
                }
                $lastSeen = $this->productFollowQuery['last_seen_date_time'];
                return 'SELECT * FROM comment c INNER JOIN member m ON m.member_id = c.member_id WHERE c.product_id=? AND c.comment_deleted=0 AND c.comment_create_date_time>"' . $lastSeen . '" LIMIT 10';
            } else {
                $this->data['type']='time';
                return $this->getCommentSql('time');
            }
        }
    }
    private function updateLastSeen() {
        if($this->who=='member' and ($this->data['type']=='time' or $this->data['type']=='unread') and count($this->commentsInfo)){
            $time = end($this->commentsInfo)['commentCreateDateTime'];
            Database::executeWithErr('UPDATE product_follow SET new_comment_count=(new_comment_count-(SELECT count(*) FROM comment WHERE product_id=? AND comment_deleted=0 AND comment_create_date_time>last_seen_date_time AND comment_create_date_time<=?)) WHERE member_id=?', [$this->productInfo['id'], $time, $this->userId]);
            Database::execute('UPDATE product_follow SET last_seen_date_time=? WHERE member_id=? AND last_seen_date_time<?', [$time, $this->userId, $time]);
        }
    }
    private function ownCommentWrapper() {
        if($this->who=='guest') {
            return null;
        }
        $this->memberInfo = Database::getRow('SELECT member_username, member_slug, member_restricted FROM member WHERE member_id=?', [$this->userId]);
        if($this->memberInfo['member_restricted']==='0') {
            return $this->fetchOwnComment();
        } else {
            return $this->fetchOwnCommentRequest();
        }
        return null;
    }
    private function fetchOwnComment() {
        $com = Database::existCheck('SELECT * FROM comment WHERE member_id=? AND product_id=? AND comment_deleted=0', [$this->userId, $this->productInfo['id']]);
        if(!$com){
            return null;
        }
        $liked = (Database::getRow('SELECT * FROM comment_like WHERE member_id=? and comment_id=?', [$this->userId, $com['comment_id']]))?true:false;
        $rating = Database::getRows('SELECT t.tag_slug, t.tag_name, tr.tag_rating_value FROM tag_rating tr INNER JOIN tag_with_product twp ON twp.tag_with_product_id=tr.tag_with_product_id INNER JOIN tag t ON t.tag_id=twp.tag_id WHERE tr.member_id=? AND twp.product_id=?', [$this->userId, $this->productInfo['id']]);
        $ratingInfo = [];
        foreach($rating as $rate) {
            $ratingInfo[] = [
                'slug'=>$rate['tag_slug'],
                'tagName'=>$rate['tag_name'],
                'ratingValue'=>$rate['tag_rating_value']
            ];
        }
        return [
            'commentID'=>$com['comment_id'],
            'commentText'=>$com['comment_text'],
            'commentCreateDateTime'=>$com['comment_create_date_time'],
            'commentEdited'=>$com['comment_edited'],
            'commentLastEditDateTime'=>$com['comment_last_edit_date_time'],
            'commentLikeCount'=>$com['comment_like_count'],
            'liked'=>$liked,
            'isOwner'=>true,
            'reported'=>false,
            'hidden'=>false,
            'owner'=>[
                'id'=>$this->userId,
                'username'=>$this->memberInfo['member_username'],
                'slug'=>$this->memberInfo['member_slug'],
            ],
            'rating'=>$ratingInfo
        ];
    }
    private function fetchOwnCommentRequest() {
        $comment = Database::existCheck('SELECT * FROM comment_request WHERE member_id=? and product_id=? AND cancelled=0', [$this->userId, $this->productInfo['id']]);
        if($comment) {
            $this->ownCommentPublished = false;
            $rating = Database::getRows('SELECT t.tag_slug, t.tag_name, tr.tag_rating_value FROM tag_rating tr INNER JOIN tag_with_product twp ON twp.tag_with_product_id=tr.tag_with_product_id INNER JOIN tag t ON t.tag_id=twp.tag_id WHERE tr.member_id=? AND twp.product_id=?', [$this->userId, $this->productInfo['id']]);
            $ratingInfo = [];
            foreach($rating as $rate) {
                $ratingInfo[] = [
                    'slug'=>$rate['tag_slug'],
                    'tagName'=>$rate['tag_name'],
                    'ratingValue'=>$rate['tag_rating_value']
                ];
            }
            return [
                'commentID'=>$comment['comment_id'],
                'commentText'=>$comment['comment_text'],
                'commentCreateDateTime'=>$comment['comment_request_date_time'],
                'commentEdited'=>($comment['comment_id']==null)?0:1,
                'commentLastEditDateTime'=>'',
                'commentLikeCount'=>0,
                'liked'=>0,
                'isOwner'=>1,
                'reported'=>0,
                'hidden'=>false,
                'owner'=>[
                    'id'=>$this->userId,
                    'username'=>$this->memberInfo['member_username'],
                    'slug'=>$this->memberInfo['member_username'],
                ],
                'rating'=>$ratingInfo
            ];
        }
        return null;
    }
    private function mergeAllInfo() {
        if(!$this->data['onlyComment']) {
            $this->success([
                'request'=>$this->data,
                'product'=>$this->productInfo,
                'followed'=>$this->followed,
                'tags'=>array_values($this->tagsInfo),
                'comments'=>$this->commentsInfo,
                'ownComment'=>$this->ownCommentWrapper(),
                'ownCommentPublished'=>$this->ownCommentPublished,
                'pageNumber'=>$this->data['pageNumber'],
                'pageCount'=> $this->pageCount
            ]);
        } else {
            $this->success([
                'comments'=>$this->commentsInfo,
                'ownComment'=>$this->ownCommentWrapper(),
                'ownCommentPublished'=>$this->ownCommentPublished,
                'pageNumber'=>$this->data['pageNumber'],
                'pageCount'=> $this->pageCount
            ]);
        }
    }
    private function increaseProductFetchCount() {
        // artırım buradan gerçekleştirilecek
        if($this->who=='member') {
            $temp = Database::existCheck('SELECT product_fetch_temp_id FROM product_fetch_temp WHERE product_slug=? AND member_id=?', [$this->data['productSlug'], $this->userId]);
            if($temp) {
                Database::execute('UPDATE product_fetch_temp SET fetch_count=fetch_count+1 WHERE product_fetch_temp_id=?', [$temp['product_fetch_temp_id']]);
            } else {
                Database::execute('INSERT INTO product_fetch_temp (product_id, member_id, fetch_count) VALUES (?,?,1)',[$this->productInfo['id'],$this->userId]);
            }
        } else if($this->who=='guest') {
            $temp = Database::existCheck('SELECT product_fetch_temp_id FROM product_fetch_temp WHERE product_id=? AND ip_address=?', [$this->productInfo['id'], $_SERVER['REMOTE_ADDR']]);
            if($temp) {
                Database::execute('UPDATE product_fetch_temp SET fetch_count=fetch_count+1 WHERE product_fetch_temp_id=?', [$temp['product_fetch_temp_id']]);
            } else {
                Database::execute('INSERT INTO product_fetch_temp (product_id, ip_address, fetch_count) VALUES (?,?,1)',[$this->productInfo['id'], $_SERVER['REMOTE_ADDR']]);
            }
        }
    }
}
