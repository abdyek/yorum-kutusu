<?php

namespace YorumKutusu\Api\Controller;
use YorumKutusu\Api\Core\Controller;
use YorumKutusu\Api\Core\Database;
use YorumKutusu\Api\Core\Other;

class UpdateProduct extends Controller {
    protected function patch() {
        $this->checkTags();
        $this->checkProductExist();
        $this->member = Database::getRow('SELECT * FROM member WHERE member_id=?', [$this->userId]);
        $this->checkAvailable();
        $this->addProductRequest();
        $this->addTWPRequest();
        $this->increaseRequestPointer();
        $this->success();
    }

    private function checkTags() {
        foreach($this->data['tags'] as $tag) {
            if(isset($tag['id'])) {
                $tag = Database::existCheck('SELECT * FROM tag WHERE tag_id=? AND tag_deleted=0', [$tag['id']]);
                if(!$tag) {
                    $this->setHttpStatus(404);
                    exit();
                }
            } elseif(isset($tag['newTag']) and $tag['newTag']==true) {
                $tag = Database::existCheck('SELECT * FROM tag WHERE tag_name=? AND tag_deleted=0', [$tag['name']]);
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

    private function checkProductExist(){
        $this->product = Database::existCheck('SELECT * FROM product WHERE product_deleted=0 AND product_id=?', [$this->data['productID']]);
        if(!$this->product){
            $this->setHttpStatus(404);
            exit();
        }
    }

    private function checkAvailable(){
        $productRequest = Database::existCheck('SELECT * FROM product_request WHERE member_id=? AND product_id=? AND product_request_answered=0 AND cancelled=0',[
            $this->userId,
            $this->data['productID'],
        ]);
        if($productRequest) {
            Database::execute('UPDATE product_request SET cancelled=1 WHERE product_id=? ', [
                $this->data['productID']
            ]);
            Database::execute('UPDATE tag_with_product_request SET cancelled=1 WHERE member_id=? AND request_id=?', [
                $this->userId,
                $productRequest['request_id']
            ]);
        }
    }

    private function addProductRequest(){
        Database::execute('INSERT INTO product_request(product_id, member_id, product_name, product_slug, request_id) VALUES(?,?,?,?,?)', [
            $this->data['productID'],
            $this->userId,
            $this->data['productNewName'],
            Other::generateSlug($this->data['productNewName']),
            $this->member['request_pointer']
        ]);
        $this->productRequest = Database::getRow('SELECT * FROM product_request WHERE member_id=? AND request_id=?', [$this->userId, $this->member['request_pointer']]);
    }

    private function addTWPRequest() {
        foreach($this->data['tags'] as $tag){
            if(isset($tag['id'])) {
                Database::execute('INSERT INTO tag_with_product_request (member_id, product_request_id, product_id, tag_id, request_id ) VALUES(?,?,?,?,?)', [
                    $this->userId,
                    $this->productRequest['product_request_id'],
                    $this->product['product_id'],
                    $tag['id'],
                    $this->member['request_pointer']
                ]);
            } else {
                $q = Database::executeWithError('INSERT INTO tag_with_product_request (member_id, product_request_id, product_id, tag_name, tag_slug, request_id) VALUES(?,?,?,?,?,?)', [
                    $this->userId,
                    $this->productRequest['product_request_id'],
                    $this->product['product_id'],
                    $tag['name'],
                    Other::generateSlug($tag['name']),
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
        $q = Database::executeWithError('UPDATE member SET request_pointer=request_pointer+1 WHERE member_id=?', [$this->userId]);
        if($q[0]==false) {
            print_r($q[1]);
            exit();
        }
    }

}
