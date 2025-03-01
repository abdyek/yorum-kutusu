<?php

namespace YorumKutusu\Api\Controller;
use YorumKutusu\Api\Core\Controller;
use YorumKutusu\Api\Core\Database;
use YorumKutusu\Api\Core\Other;
use YorumKutusu\Api\Model\Product as ProductModel;
use YorumKutusu\Api\Model\Comment as CommentModel;

// bu isteğin adının comment olması yanıltmasın yorum çekme işlemlerini burada yapmıyorum
class Comment extends Controller {
    protected function post() {
        $this->productCheckWrapper();
        $this->tagCheckWrapper();
        if(Database::existCheck('SELECT comment_id FROM comment WHERE comment_deleted=0 AND member_id=? AND product_id=?', [$this->userId, $this->data['productID']]) or
        Database::existCheck('SELECT comment_request_id FROM comment_request WHERE cancelled=0 AND comment_request_answered=0 AND member_id=? AND product_id=?', [$this->userId, $this->data['productID']])){
            // ^ her kullanıcı her ürün için sadece bir tane yorum yapabilir
            $this->setHttpStatus(422);
            exit();
        }
        $this->writeToDB();
        if(!$this->memberRestricted) {
            CommentModel::increaseNewCommentCount($this->data['productID']);
        }
        $this->commitRating();
    }
    // post ve put'un ortak methodu
    private function productCheckWrapper() {
        $product = Database::existCheck('SELECT * FROM product WHERE product_id=? AND product_deleted=0', [$this->data['productID']]);
        if(!$product) {
            $this->setHttpStatus(404);
            exit();
        }
    }
    // post ve put'un ortak methodu
    private function tagCheckWrapper() {
        if(!$this->tagCheck()) {
            $this->setHttpStatus(422);
            exit();
        }
    }

    private function tagCheck() {
        if(isset($this->data['rating'])) {
            if(!is_array($this->data['rating'])) {
                return false;
            }
            $tags = array_keys($this->data['rating']);
            foreach($tags as $tag) {
                if(!Database::existCheck('SELECT * FROM tag t INNER JOIN tag_with_product twp ON twp.tag_id=t.tag_id WHERE t.tag_slug=? AND t.tag_deleted=0 AND twp.product_id=? AND twp.tag_with_product_deleted=0 AND t.tag_passive=0', [$tag, $this->data['productID']])) {
                    return false;
                }
            }
        }
        return true;
    }
    private function writeToDB() {
        $this->memberRestricted = Database::existCheck('SELECT member_restricted FROM member WHERE member_id=?', [$this->userId])['member_restricted'];
        if($this->memberRestricted) {
            $query = Database::executeWithErr('INSERT INTO comment_request (member_id, product_id, comment_text) VALUES(?,?,?)', [$this->userId, $this->data['productID'], $this->data['commentText']]);
            $this->success();
        } else {
            $query = Database::executeWithErr('INSERT INTO comment (member_id, product_id, comment_text) VALUES(?,?,?)', [$this->userId, $this->data['productID'], $this->data['commentText']]);
            ProductModel::increaseCommentCount($this->data['productID']);
            $this->success();
        }
    }
    protected function put() {
        $this->productCheckWrapper();
        $this->tagCheckWrapper();
        $this->request = Database::existCheck('SELECT * FROM comment_request WHERE comment_request_answered=0 AND cancelled=0 AND member_id=? AND product_id=?', [$this->userId, $this->data['productID']]);
        $this->comment = Database::existCheck('SELECT * FROM comment WHERE member_id=? AND product_id=? AND comment_deleted=0', [$this->userId, $this->data['productID']]);
        $memberRestricted = Database::existCheck('SELECT member_restricted FROM member WHERE member_id=?', [$this->userId])['member_restricted'];
        if($memberRestricted) {
            if($this->comment) {
                $this->addRequestToUpdateComment();
            } elseif($this->request) {
                $this->updateRequest();
            } else {
                $this->setHttpStatus(404);
                exit();
            }
        } else {
            $this->updateComment();
        }
        $this->commitRating(true);
    }
    private function addRequestToUpdateComment() {
        if(($this->comment['comment_text']!=$this->data['commentText'])) {
            Database::executeWithErr('UPDATE comment_request SET cancelled=1 WHERE member_id=? AND product_id=?', [$this->userId, $this->data['productID']]);
            Database::executeWithErr('INSERT INTO comment_request (member_id, product_id, comment_id, comment_text) VALUES(?,?,?,?)', [$this->userId, $this->data['productID'], $this->comment['comment_id'], $this->data['commentText']]);
        }
        $this->success();
    }
    private function updateRequest() {
        if($this->request['comment_text']!=$this->data['commentText']) {
            $query = Database::execute('UPDATE comment_request SET cancelled=1 WHERE member_id=? AND product_id=?', [$this->userId, $this->data['productID']]);
            $query = Database::execute('INSERT INTO comment_request (member_id, product_id, comment_text) VALUES(?,?,?)', [$this->userId, $this->data['productID'], $this->data['commentText']]);
        }
        $this->success();
    }
    private function updateComment() {
        if($this->comment['comment_text']!=$this->data['commentText']) {
            $this->writeHistory();
            $query = Database::execute('UPDATE comment SET comment_text=?, comment_edited=1, comment_last_edit_date_time=? WHERE comment_id=?', [$this->data['commentText'], Other::getCurrentDateTime(), $this->comment['comment_id']]);
        }
        $this->success();
    }
    private function writeHistory() {
        $query = Database::execute('INSERT INTO comment_history (comment_id, admin_id, comment_old_text) VALUES(?,?,?)', [$this->comment['comment_id'], $this->comment['admin_id'], $this->comment['comment_text']]);
    }
    // post ve put'un orta metodu
    private function commitRating($forPut=false) {
        $tags = isset($this->data['rating'])?$this->data['rating']:[];
        foreach($tags as $key=>$val) {
            $twpID = Database::getRow('SELECT tag_with_product_id FROM tag_with_product twp INNER JOIN tag t ON t.tag_id=twp.tag_id WHERE t.tag_slug=? AND twp.product_id=?', [$key, $this->data['productID']])['tag_with_product_id'];
            $check = Database::existCheck('SELECT tag_rating_value FROM tag_rating WHERE tag_with_product_id=? AND member_id=?', [$twpID,$this->userId]);
            if($check and $check['tag_rating_value']==$val) {
                continue;
            }
            Database::execute('DELETE FROM tag_rating WHERE tag_with_product_id=? AND member_id=?', [$twpID,$this->userId]);
            if($val=='-') {
                if($forPut and $check) {
                    Database::executeWithErr('UPDATE tag_with_product SET tag_avarage_rating=((tag_avarage_rating * rating_count)-?)/(rating_count-1), rating_count=rating_count-1 WHERE tag_with_product_id=?', [$check['tag_rating_value'], $twpID]);
                }
                continue;
            }
            Database::execute('INSERT INTO tag_rating (tag_with_product_id, member_id, tag_rating_value) VAlUES(?,?,?)', [$twpID,$this->userId, $val]);
            CommentModel::updateRateValue($twpID, $val, $check);
        }
    }
    protected function delete() {
        $this->productCheckWrapper();
        Database::executeWithErr('UPDATE comment_request SET cancelled=1 WHERE member_id=? AND product_id=?', [$this->userId, $this->data['productID']]);
        CommentModel::removeRating($this->data['productID'], $this->userId);
        $this->comment = Database::existCheck('SELECT * FROM comment WHERE comment_deleted=0 AND member_id=? AND product_id=?', [$this->userId, $this->data['productID']]);
        if($this->comment) {
            Database::executeWithErr('UPDATE comment SET comment_deleted=1 WHERE member_id=? AND product_id=?', [$this->userId, $this->data['productID']]);
            ProductModel::decreaseCommentCount($this->data['productID']);
            $this->addHistory();
            CommentModel::removeHiddenComment($this->comment['comment_id']);
            CommentModel::decreaseNewCommentCount($this->comment['product_id'], $this->comment['comment_create_date_time']);
        }
        $this->success();
    }
    private function addHistory() {
        Database::executeWithErr('INSERT INTO comment_delete_history (comment_id) VALUES(?)', [$this->comment['comment_id']]);
    }

}
