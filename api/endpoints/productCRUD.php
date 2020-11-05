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
        $this->prepareTwp();
        $this->success();
    }
    private function checkTags() {
        foreach($this->data['tagIDs'] as $id) {
            if(!Database::existCheck('SELECT tag_id FROM tag WHERE tag_visible=1 AND tag_id=?', [$id])) {
                return false;
            }
        }
        return true;
    }
    private function createProduct() {
        Database::execute('INSERT INTO product (admin_id, product_name, product_slug) VALUES(?,?,?)',[USERID, $this->data['productName'], $this->data['productSlug']]);
        $this->product = Database::getRow('SELECT * FROM product WHERE product_slug=?', [$this->data['productSlug']]);
    }
    private function prepareTwp() {
        foreach($this->data['tagIDs'] as $tagID) {
            Database::execute('INSERT INTO tag_with_product(tag_id, product_id, admin_id) VALUES(?,?,?)', [$tagID, $this->product['product_id'], USERID]);
        }
    }
}
