<?php

class NewProductApproval extends Request {
    protected function post() {
        $this->checkRequest();
        $this->success();
    }
    protected function delete() {
        $this->checkRequest();
        $this->deleteProductRequest();
        $this->deleteTWPRequest();
        $this->success();
    }
    private function checkRequest() {
        $this->request = Database::existCheck('SELECT * FROM product_request WHERE product_id IS NULL and cancelled=0 and product_request_answered=0 and product_request_id=?', [$this->data['productRequestID']]);
        if(!$this->request) {
            $this->setHttpStatus(404);
            exit();
        }
    }
    private function deleteProductRequest() {
        if(isset($this->data['adminNote'])) {
            $this->adminNote = $this->data['adminNote'];
        } else {
            $this->adminNote = Config::ADMIN_NOTES['newProductRequestDeleteNote'];
        }
        Database::executeWithErr('UPDATE product_request SET product_request_answered=1, admin_note=? WHERE product_request_id=?', [
            $this->adminNote,
            $this->data['productRequestID']
        ]);
        Database::executeWithErr('INSERT INTO product_request_response (product_request_id, admin_id, accepted, admin_note) VALUES(?,?,0,?)', [
            $this->data['productRequestID'],
            USERID,
            $this->adminNote
        ]);
    }
    private function deleteTWPRequest() {
        Database::executeWithErr('UPDATE tag_with_product_request SET tag_with_product_request_answered=1, admin_note=? WHERE product_request_id=?', [
            $this->adminNote,
            $this->data['productRequestID']
        ]);
        $TWPRequest = Database::getRows('SELECT tag_with_product_request_id FROM tag_with_product_request WHERE product_request_id=?', [
            $this->data['productRequestID']
        ]);
        foreach($TWPRequest as $twp) {
            Database::executeWithErr('INSERT INTO tag_with_product_request_response (tag_with_product_request_id, admin_id, allowed_or_denied, admin_note) VALUES(?,?,0,?)', [
                $twp['tag_with_product_request_id'],
                USERID,
                $this->adminNote
            ]);
        }
    }
}
