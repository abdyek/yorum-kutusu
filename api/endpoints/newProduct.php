<?php

class NewProduct extends Request {
    protected function post() {
        $this->checkTags();
        $this->checkProduct();
        $this->member = Database::getRow('SELECT * FROM member WHERE member_id=?', [USERID]);
        $this->checkAvailable();
        $this->addProductRequest();
        $this->addTWPRequest();
        $this->increaseRequestPointer();
        $this->success();
    }
    private function checkTags() {
        foreach($this->data['tags'] as $tag) {
            if(isset($tag['id']) and !isset($tag['name']) and !isset($tag['slug'])) {
                $tag = Database::existCheck('SELECT * FROM tag WHERE tag_id=? AND tag_deleted=0', [$tag['id']]);
                if(!$tag) {
                    $this->setHttpStatus(404);
                    exit();
                }
            } elseif(!isset($tag['id']) and isset($tag['name']) and isset($tag['slug'])) {
                $tag = Database::existCheck('SELECT * FROM tag WHERE tag_name=? OR tag_slug=? AND tag_deleted=0', [$tag['name'], $tag['slug']]);
                if($tag) {
                    $this->setHttpStatus(422);
                    exit();
                }
            } else {
                $this->setHttpStatus(400);
                exit();
            }
        }
    }
    private function checkProduct() {
        $product = Database::existCheck('SELECT * FROM product WHERE product_deleted=0 AND product_name=? OR product_slug=?', [$this->data['productName'], $this->data['productSlug']]);
        if($product){
            $this->setHttpStatus(422);
            $this->responseWithMessage(7);
            exit();
        }
    }
    private function checkAvailable() {
        $productRequest = Database::existCheck('SELECT * FROM product_request WHERE member_id=? AND product_name=? AND product_slug=? AND product_request_answered=0 AND cancelled=0',[
            USERID,
            $this->data['productName'],
            $this->data['productSlug']
        ]);
        if($productRequest) {
            Database::execute('UPDATE product_request SET cancelled=1 WHERE product_name=? AND product_slug=?', [
                $this->data['productName'],
                $this->data['productSlug']
            ]);
            Database::execute('UPDATE tag_with_product_request SET cancelled=1 WHERE member_id=? AND request_id=?', [
                USERID,
                $productRequest['request_id']
            ]);
        }
    }
    private function addProductRequest(){
        Database::execute('INSERT INTO product_request (member_id, product_name, product_slug, request_id) VALUES(?,?,?,?)',[
            USERID,
            $this->data['productName'],
            $this->data['productSlug'],
            $this->member['request_pointer']
        ]);
        $this->productRequest = Database::getRow('SELECT * FROM product_request WHERE member_id=? AND request_id=?', [USERID, $this->member['request_pointer']]);
    }
    private function addTWPRequest() {
        foreach($this->data['tags'] as $tag){
            if(isset($tag['id'])) {
                Database::execute('INSERT INTO tag_with_product_request (member_id, product_request_id, tag_id, request_id ) VALUES(?,?,?,?)', [
                    USERID,
                    $this->productRequest['product_request_id'],
                    $tag['id'],
                    $this->member['request_pointer']
                ]);
            } else {
                $q = Database::executeWithError('INSERT INTO tag_with_product_request (member_id, product_request_id, tag_name, tag_slug, request_id) VALUES(?,?,?,?,?)', [
                    USERID,
                    $this->productRequest['product_request_id'],
                    $tag['name'],
                    $tag['slug'],
                    $this->member['request_pointer']
                ]);
                if($q[0]==false) {
                    print_r($q[1]);
                    exit();
                }
            }
        }
    }
    private function increaseRequestPointer() {
        $q = Database::executeWithError('UPDATE member SET request_pointer=request_pointer+1 WHERE member_id=?', [USERID]);
        if($q[0]==false) {
            print_r($q[1]);
            exit();
        }
    }
}
