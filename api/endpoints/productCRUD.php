<?php

class ProductCRUD extends Request {
    protected function post() {
        $product = Database::existCheck('SELECT product_id, product_name, product_slug FROM product WHERE product_name=? OR product_slug=?', [$this->data['productName'], $this->data['productSlug']]);
        if($product) {
            $this->setHttpStatus(422);
            $this->responseWithMessage(7, ['product'=>$product]);
            exit();
        }
        if(!$this->checkTags()) {
            $this->setHttpStatus(404);
            exit();
        }
        $this->createProduct();
        $this->createTwp();
        $this->success();
    }
    private function checkTags() {
        foreach($this->data['tagIDs'] as $id) {
            if(!Database::existCheck('SELECT tag_id FROM tag WHERE tag_deleted=0 AND tag_id=?', [$id])) {
                return false;
            }
        }
        return true;
    }
    private function createProduct() {
        Database::execute('INSERT INTO product (admin_id, product_name, product_slug) VALUES(?,?,?)',[USERID, $this->data['productName'], $this->data['productSlug']]);
        $this->product = Database::getRow('SELECT * FROM product WHERE product_slug=?', [$this->data['productSlug']]);
    }
    private function createTwp() {
        foreach($this->data['tagIDs'] as $tagID) {
            Database::execute('INSERT INTO tag_with_product(tag_id, product_id, admin_id) VALUES(?,?,?)', [$tagID, $this->product['product_id'], USERID]);
        }
    }
    protected function put() {
        $this->product = Database::existCheck('SELECT * FROM product WHERE product_id=?', [$this->data['productID']]);
        if(!$this->product){
            $this->setHttpStatus(404);
            exit();
        }
        if(!$this->checkTags()){
            $this->setHttpStatus(404);
            exit();
        }
        $this->updateProduct();
        $this->updateTwp();
        $this->success();
    }
    private function updateProduct() {
        // history
        Database::execute('INSERT INTO product_history (product_id, admin_id, member_id, product_old_name, product_old_slug, history_id) VALUES(?,?,?,?,?,?)', [
            $this->product['product_id'],
            $this->product['admin_id'],
            $this->product['member_id'],
            $this->product['product_name'],
            $this->product['product_slug'],
            $this->product['history_pointer']
        ]);
        // update
        Database::execute('UPDATE product SET admin_id=?, member_id=null, product_name=?, product_slug=?, history_pointer=history_pointer+1 WHERE product_id=?', [
            USERID,
            $this->data['productName'],
            $this->data['productSlug'],
            $this->data['productID']
        ]);
    }
    private function updateTwp() {
        // history
        $tags = Database::getRows('SELECT * FROM tag_with_product WHERE product_id=?', [$this->data['productID']]);
        foreach($tags as $t) {
            Database::execute('INSERT INTO tag_with_product_history (tag_id, product_id, admin_id, member_id, history_id) VALUES(?,?,?,?,?)',[
                $t['tag_id'],
                $t['product_id'],
                $t['admin_id'],
                $t['member_id'],
                $this->product['history_pointer']
            ]);
        }
        // update (need delete old)
        Database::execute('DELETE FROM tag_with_product WHERE product_id=?', [$this->data['productID']]);
        $this->createTwp();
    }

    protected function delete() {
        $this->admin = Database::getRow('SELECT * FROM admin WHERE admin_id=?', [USERID]);
        $this->productExistCheck();
        $this->passwordCheck();
        $this->deleteProduct();

    }

    private function productExistCheck(){
        $this->product = Database::existCheck('SELECT * FROM product WHERE product_deleted=0 AND product_id=?', [$this->data['productID']]);
        if(!$this->product) {
            $this->setHttpStatus(404);
            exit();
        }
    }

    private function passwordCheck() {
        if(!password_verify($this->data['password'], $this->admin['admin_password_hash'])) {
            $this->setHttpStatus(403);
            exit();
        }
    }

    private function deleteProduct() {
        // TWP
        Database::executeWithErr('UPDATE tag_with_product SET tag_with_product_deleted=1 WHERE product_id=?', [$this->data['productID']]);
        // product
        Database::executeWithErr('UPDATE product SET product_deleted=1 WHERE product_id=?', [$this->data['productID']]);
        // product history
        Database::executeWithErr('INSERT INTO product_delete_history (product_id, admin_id, admin_note) VALUES(?,?,?)', [
            $this->data['productID'],
            USERID,
            $this->data['adminNote']
        ]);
    }
}
