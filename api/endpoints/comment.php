<?php

// bu isteğin adının comment olması yanıltmasın yorum çekme işlemlerini burada yapmıyorum
class Comment extends Request {
    protected function post() {
        $product = Database::existCheck('SELECT * FROM product WHERE product_id=? AND product_visible=1', [$this->data['productID']]);
        if(!$product) {
            $this->setHttpStatus(404);
            exit();
        }
        if(!$this->tagCheck()) {
            $this->setHttpStatus(422);
            exit();
        }
        $this->writeToDB();
    }
    private function tagCheck() {
        if(isset($this->data['rating'])) {
            if(!is_array($this->data['rating'])) {
                return false;
            }
            $tags = array_keys($this->data['rating']);
            foreach($tags as $tag) {
                if(!Database::existCheck('SELECT * FROM tag t INNER JOIN tag_with_product twp ON twp.tag_id=t.tag_id WHERE t.tag_slug=? AND t.tag_visible=1 AND twp.product_id=? AND twp.tag_with_product_visible=1 AND t.tag_passive=0', [$tag, $this->data['productID']])) {
                    return false;
                }
            }
        }
        return true;
    }
    private function writeToDB() {
        $memberRestricted = Database::getRow('SELECT member_restricted FROM member WHERE member_id=?', [USERID])['member_restricted'];
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
}