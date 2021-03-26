<?php

namespace YorumKutusu\Api\Controller;
use YorumKutusu\Api\Core\Controller;
use YorumKutusu\Api\Core\Database;

class Product extends Controller {
    protected function get() {
        $this->checkSortBy();
        $this->getProductInfo();
        if(!$this->data['onlyComment']) {
            $this->tagsInfo = $this->getTags($this->productInfo['id']);
        }
        $this->hasComment = null;
        $this->getFollowInfo();
        $this->getPageCount();
        $this->hiddenComment = [];
        $this->reportedComment = [];
        if($this->who==="member") {
            $this->hiddenComment = $this->getHiddenComment($this->userId, $this->who);
            $this->reportedComment = $this->getReportedComment($this->userId, $this->who);
        }
        $sql = $this->getCommentSql($this->data['type']);
        //$arr = [$this->productInfo['id']];
        $this->getCommentsWithRating(['sql'=>$sql, 'arr'=>[$this->productInfo['id']]]);

        $this->updateLastSeen();
        $this->mergeAllInfo();
        $this->increaseProductFetchCount();
    }
    private function checkSortBy() {
        if(!in_array($this->data['type'], ['time', 'like'])) {
            $this->setHttpStatus(400);
            exit();
        }
    }
    private function getProductInfo() {
        $this->product = Database::existCheck('SELECT * FROM product WHERE product_slug=? AND product_deleted=0', [$this->data['productSlug']]);
        if(!$this->product) {
            $this->setHttpStatus(404);
            exit();
        }
        $this->productInfo = [
            'id'=>$this->product['product_id'],
            'title'=>$this->product['product_name'],
            'slug'=>$this->product['product_slug']
        ];
    }
    private function getFollowInfo() {
        $this->followed = false;
        $this->lastSeen = null;
        if($this->who=="member") {
            $this->productFollowQuery = Database::existCheck('SELECT product_follow_id, last_seen_date_time FROM product_follow WHERE product_id=? AND member_id=?', [$this->productInfo['id'],$this->userId]);
            $this->followed = ($this->productFollowQuery)?true:false;
            $this->lastSeen = ($this->productFollowQuery)?$this->productFollowQuery['last_seen_date_time']:null;
        }
    }
    private function getPageCount() {
        $commentCount = $this->product['product_comment_count'];
        $additional = ($commentCount%10==0)?0:1;
        $this->pageCount = intval($this->product['product_comment_count']/10)+$additional;
    }
    public function getTags($productID) {
        $tags = Database::getRows('SELECT * FROM tag_with_product twp INNER JOIN tag t ON t.tag_id=twp.tag_id WHERE twp.product_id=?', [$productID]);
        $tagsInfo = [];
        foreach($tags as $tag) {
            $tagsInfo[] = [
                'id'=>$tag['tag_id'],
                'slug'=>$tag['tag_slug'],
                'tagName'=>$tag['tag_name'],
                'tagAvarageRating'=>$tag['tag_avarage_rating'],
                'tagPassive'=>$tag['tag_passive']
            ];
        }
        return $tagsInfo;
    }
    public function getHiddenComment($userId, $who) {
        $hiddenComment = [];
        if($who==='member') {
            $query = Database::getRows('SELECT comment_id FROM hidden_comment WHERE member_id=?', [$userId]);
            foreach($query as $key=>$q) {
                $hiddenComment[] = $q['comment_id'];
            }
        }
        return $hiddenComment;
    }
    public function getReportedComment($userId, $who) {
        $reportedComment = [];
        if($who==='member') {
            $query = Database::getRows('SELECT comment_id FROM comment_report_request WHERE report_answered=0 and member_id=?', [$userId]);
            foreach($query as $q) {
                $reportedComment[] = $q['comment_id'];
            }
        }
        return $reportedComment;
    }
    private function getCommentsWithRating($getRowsPar) {
        $comments = Database::getRows($getRowsPar['sql'], $getRowsPar['arr']);
        $this->commentsInfo = [];
        foreach($comments as $key=>$com) {
            $rating = Database::getRows('SELECT t.tag_slug, t.tag_name, tr.tag_rating_value FROM tag_rating tr INNER JOIN tag_with_product twp ON twp.tag_with_product_id=tr.tag_with_product_id INNER JOIN tag t ON t.tag_id=twp.tag_id WHERE tr.member_id=? AND twp.product_id=?', [$com['member_id'], $com['product_id']]);
            $liked = ($this->who==='member' and Database::getRow('SELECT * FROM comment_like WHERE member_id=? and comment_id=?', [$this->userId, $com['comment_id']]))?true:false;
            $ratingInfo = [];
            foreach($rating as $rate) {
                $ratingInfo[] = [
                    'slug'=>$rate['tag_slug'],
                    'tagName'=>$rate['tag_name'],
                    'ratingValue'=>$rate['tag_rating_value']
                ];
            }
            $this->hasComment = ($this->who==='member' and $this->userId==$com['member_id'])?true:false;
            $this->commentsInfo[] = [
                'commentID'=>$com['comment_id'],
                'commentText'=>$com['comment_text'],
                'commentCreateDateTime'=>$com['comment_create_date_time'],
                'commentEdited'=>($com['comment_edited']==="1")?true:false,
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
                'rating'=>$ratingInfo,
                'unread'=>($this->followed and $com['comment_create_date_time']>$this->lastSeen)?true:false
                
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
        if($this->who=='member' and $this->data['type']=='time' and count($this->commentsInfo)){
            $time = end($this->commentsInfo)['commentCreateDateTime'];
            Database::executeWithErr('UPDATE product_follow SET new_comment_count=(new_comment_count-(SELECT count(*) FROM comment WHERE product_id=? AND comment_deleted=0 AND comment_create_date_time>last_seen_date_time AND comment_create_date_time<=?)) WHERE member_id=? AND product_id=?', [$this->productInfo['id'], $time, $this->userId, $this->productInfo['id']]);
            Database::executeWithErr('UPDATE product_follow SET last_seen_date_time=? WHERE member_id=? AND product_id=? AND last_seen_date_time<?', [$time, $this->userId, $this->productInfo['id'], $time]);
        }
    }
    private function ownCommentWrapper() {
        $this->ownCommentPublished = false;
        if($this->who!='member') {
            return null;
        }
        $this->memberInfo = Database::getRow('SELECT member_username, member_slug, member_restricted FROM member WHERE member_id=?', [$this->userId]);
        $this->com = Database::existCheck('SELECT * FROM comment WHERE member_id=? AND product_id=? AND comment_deleted=0', [$this->userId, $this->productInfo['id']]);
        if($this->memberInfo['member_restricted']==='0') {
            $this->ownCommentPublished = true;
            return $this->fetchOwnComment();
        } else {
            return $this->fetchOwnCommentRequest();
        }
        return null;
    }
    private function fetchOwnComment() {
        $com = $this->com;
        if($com) {
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
            'commentEdited'=>($com['comment_edited']==="1")?true:false,
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
            $publishedComment = Database::existCheck('SELECT comment_text, comment_create_date_time FROM comment WHERE comment_deleted=0 AND member_id=? AND product_id=?', [$this->userId, $this->productInfo['id']]);
            $this->ownCommentPublished = ($publishedComment and $publishedComment['comment_text']==$comment['comment_text'])?true:false;
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
                'commentID'=>($this->com)?$this->com['comment_id']:null,
                'commentText'=>$comment['comment_text'],
                'commentCreateDateTime'=>($comment['comment_id']===null)?$comment['comment_request_date_time']:$publishedComment['comment_create_date_time'],
                'commentEdited'=>($comment['comment_id']===null)?false:true,
                'commentLastEditDateTime'=>($comment['comment_id']===null)?null:$comment['comment_request_date_time'],
                'commentLikeCount'=>0,
                'liked'=>0,
                'isOwner'=>1,
                'reported'=>0,
                'hidden'=>false,
                'owner'=>[
                    'id'=>$this->userId,
                    'username'=>$this->memberInfo['member_username'],
                    'slug'=>$this->memberInfo['member_slug'],
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
                'tags'=>$this->tagsInfo,
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
