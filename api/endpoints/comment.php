<?php

// bu isteğin adının comment olması yanıltmasın yorum çekme işlemlerini burada yapmıyorum
class Comment extends Request {
    protected function post() {
        $this->productCheckWrapper();
        $this->tagCheckWrapper();
        if(Database::existCheck('SELECT comment_id FROM comment WHERE comment_deleted=0 AND member_id=? AND product_id=?', [USERID, $this->data['productID']]) or
        Database::existCheck('SELECT comment_request_id FROM comment_request WHERE cancelled=0 AND member_id=? AND product_id=?', [USERID, $this->data['productID']])){
            // ^ her kullanıcı her ürün için sadece bir tane yorum yapabilir
            $this->setHttpStatus(422);
            exit();
        }
        $this->writeToDB();
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
        $memberRestricted = Database::existCheck('SELECT member_restricted FROM member WHERE member_id=?', [USERID])['member_restricted'];
        if($memberRestricted) {
            $query = Database::executeWithError('INSERT INTO comment_request (member_id, product_id, comment_text) VALUES(?,?,?)', [USERID, $this->data['productID'], $this->data['commentText']]);
            if(!$query[0]) {
                $this->setHttpStatus(500);
                $this->responseWithMessage(5);
                exit();
            }
            $this->success();
        } else {
            $query = Database::executeWithError('INSERT INTO comment (member_id, product_id, comment_text) VALUES(?,?,?)', [USERID, $this->data['productID'], $this->data['commentText']]);
            if(!$query[0]) {
                $this->setHttpStatus(500);
                $this->responseWithMessage(5);
                exit();
            }
            $this->success();
        }
    }
    protected function put() {
        $this->productCheckWrapper();
        $this->tagCheckWrapper();
        $this->request = Database::existCheck('SELECT comment_request_id FROM comment_request WHERE cancelled=0 AND member_id=? AND product_id=?', [USERID, $this->data['productID']]);
        $this->comment = Database::existCheck('SELECT comment_id, admin_id, comment_text FROM comment WHERE comment_deleted=0 AND member_id=? AND product_id=?',[USERID, $this->data['productID']]);
        $this->restricted = Database::existCheck('SELECT member_restricted FROM member WHERE member_id=?', [USERID])['member_restricted'];
        if($this->request and $this->restricted) {
            $this->updateRequest();
        } else if($this->comment and !$this->restricted) {
            $this->updateComment();
        } else {
            $this->setHttpStatus(404);
            exit();
        }
        $this->commitRating();
    }
    private function updateRequest() {
        $query = Database::execute('UPDATE comment_request SET cancelled=1 WHERE member_id=?', [USERID]);
        if(!$query) {
            $this->responseWithMessage(5);
            exit();
        }
        $query = Database::execute('INSERT INTO comment_request (member_id, product_id, comment_text) VALUES(?,?,?)', [USERID, $this->data['productID'], $this->data['commentText']]);
        if(!$query) {
            $this->responseWithMessage(5);
            exit();
        }
        $this->success();
    }
    private function updateComment() {
        $this->writeHistory();
        $query = Database::execute('UPDATE comment SET comment_text=?, comment_edited=1, comment_last_edit_date_time=?', [$this->data['commentText'], Other::getCurrentDateTime()]);
        if(!$query) {
            $this->responseWithMessage(5);
            exit();
        }
        $this->success();
    }
    private function writeHistory() {
        $query = Database::execute('INSERT INTO comment_history (comment_id, admin_id, comment_old_text) VALUES(?,?,?)', [$this->comment['comment_id'], $this->comment['admin_id'], $this->comment['comment_text']]);
    }
    // post ve put'un orta metodu
    private function commitRating() {
        $tags = isset($this->data['rating'])?$this->data['rating']:[];
        foreach($tags as $key=>$val) {
            $twpID = Database::getRow('SELECT tag_with_product_id FROM tag_with_product twp INNER JOIN tag t ON t.tag_id=twp.tag_id WHERE t.tag_name=? AND twp.product_id=?', [$key, $this->data['productID']])['tag_with_product_id'];
            $check = Database::existCheck('SELECT tag_rating_value FROM tag_rating WHERE tag_with_product_id=? AND member_id=? AND tag_rating_value=?', [$twpID, USERID, $val]);
            if($check) {
                continue;
            }
            Database::execute('DELETE FROM tag_rating WHERE tag_with_product_id=? AND member_id=?', [$twpID, USERID]);
            Database::execute('INSERT INTO tag_rating_history (tag_with_product_id, member_id, tag_rating_value) VAlUES(?,?,?)', [$twpID, USERID, $val]);
            Database::execute('INSERT INTO tag_rating (tag_with_product_id, member_id, tag_rating_value) VAlUES(?,?,?)', [$twpID, USERID, $val]);
        }
    }
    protected function delete() {
        if(WHO=='admin') {
            $this->deleteByAdmin();
        } elseif(WHO=='member') {
            $this->deleteByMember();
        }
    }
    private function deleteByAdmin() {
        if(!Database::existCheck('SELECT comment_id FROM comment WHERE comment_deleted=0 AND comment_id=?', [$this->data['commentID']])) {
            $this->setHttpStatus(404);
            exit();
        }
        $query = Database::execute('UPDATE comment SET comment_deleted=1 WHERE comment_id=?', [$this->data['commentID']]);
        if(!$query) {
            $this->setHttpStatus(500);
            $this->responseWithMessage(5);
            exit();
        }
        $query = Database::execute('INSERT INTO comment_delete_history (comment_id, admin_id) VALUES(?,?)', [$this->data['commentID'], USERID]);
        if(!$query) {
            $this->setHttpStatus(500);
            $this->responseWithMessage(5);
            exit();
        }
        $this->success();
    }
    private function deleteByMember() {
        if(!Database::existCheck('SELECT comment_id FROM comment WHERE comment_deleted=0 AND member_id=? AND comment_id=?', [USERID, $this->data['commentID']])) {
            $this->setHttpStatus(404);
            exit();
        }
        $query = Database::execute('UPDATE comment SET comment_deleted=1 WHERE comment_id=?', [$this->data['commentID']]);
        if(!$query) {
            $this->setHttpStatus(500);
            $this->responseWithMessage(5);
            exit();
        }
        // history
        $query = Database::execute('INSERT INTO comment_delete_history (comment_id) VALUES(?)', [$this->data['commentID']]);
        if(!$query) {
            $this->setHttpStatus(500);
            $this->responseWithMessage(5);
            exit();
        }
        $this->success();
    }

}
