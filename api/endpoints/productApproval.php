<?php

class ProductApproval extends Request {
    protected function post() {
        $this->productRequest = Database::existCheck('SELECT * FROM product_request WHERE product_request_id=? AND product_request_answered=0', [$this->data['productRequestID']]);
        if(!$this->productRequest) {
            $this->setHttpStatus(404);
            exit();
        }
        if($this->data['accept']) {
            if($this->productRequest['product_id']) {
                $this->update();
            } else {
                $this->newProduct();
            }
        }
        $this->insertProductRequestResponse();
        $this->markAsAnswered();
        // tag_with_product işlemleri
        $this->manageTagWithProduct();
        $this->success();
    }
    private function update() {
        $product = Database::getRow('SELECT product_id, admin_id, member_id, product_name, product_slug, history_pointer FROM product WHERE product_id=?', [$this->productRequest['product_id']]);
        Database::execute('INSERT INTO product_history (product_id, admin_id, member_id, product_old_name, product_old_slug, product_request_date_time, history_id) VALUES (?,?,?,?,?,?,?)',[
            $product['product_id'],
            $product['admin_id'],
            $product['member_id'],
            $product['product_name'],
            $product['product_slug'],
            $this->productRequest['product_request_date_time'],
            $product['history_pointer']
        ]);
        Database::execute('UPDATE product SET admin_id=?, member_id=?, product_name=?, product_slug=?, history_pointer=history_pointer+1 WHERE product_id=?', [
            USERID,
            $this->productRequest['member_id'],
            $this->productRequest['product_name'],
            $this->productRequest['product_slug'],
            $this->productRequest['product_id']
        ]);
    }
    private function newProduct() {
        $available = Database::existCheck('SELECT * FROM product WHERE product_name=? or product_slug=?', [$this->productRequest['product_name'], $this->productRequest['product_slug']]);
        if($available) {
            $this->responseWithMessage(7, ['product'=>$available, 'request'=>$this->productRequest]);
            exit();
        }
        Database::execute('INSERT INTO product (admin_id, member_id, product_name, product_slug, product_created_by_member) VALUES(?,?,?,?,1)', [
            USERID,
            $this->productRequest['member_id'],
            $this->productRequest['product_name'],
            $this->productRequest['product_slug']
        ]);
        $this->newProductID = Database::getRow('SELECT product_id FROM product WHERE product_slug=?', [$this->productRequest['product_slug']])['product_id'];
    }
    private function insertProductRequestResponse() {
        Database::execute('INSERT INTO product_request_response (product_request_id, admin_id, accepted, admin_note) VALUES(?,?,?,?)', [ $this->productRequest['product_request_id'], USERID, ($this->data['accept'])?1:0, $this->data['adminNote']]);
    }
    private function markAsAnswered() {
        Database::execute('UPDATE product_request SET product_request_answered=1, admin_note=? WHERE product_request_id=?', [$this->data['adminNote'], $this->productRequest['product_request_id']]);
    }
    private function manageTagWithProduct() {
        $raw = Database::getRows('SELECT tag_with_product_request_id, tag_id, product_id, member_id FROM tag_with_product_request WHERE product_request_id=?', [$this->productRequest['product_request_id']]);
        $this->twpRequestIDs = [];
        foreach($raw as $row) {
            if($row['tag_id'] and Database::existCheck('SELECT tag_id FROM tag WHERE tag_id=? and tag_visible=1', [$row['tag_id']])) {
                Database::execute('INSERT INTO tag_with_product (tag_id, product_id, admin_id, member_id) VALUES(?,?,?,?)', [
                    $row['tag_id'],
                    ($this->newProductID)?$this->newProductID:$row['product_id'],
                    USERID,
                    $row['member_id']
                ]);
            } else {
                //
            }
            $this->twpRequestIDs[] = $row['tag_with_product_request_id'];
        };
        print_r($this->twpRequestIDs);
        exit();
    }
}