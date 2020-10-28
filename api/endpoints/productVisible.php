<?php

class ProductVisible extends Request {
    protected function post() {
        $product = Database::existCheck('SELECT product_id, product_visible FROM product WHERE product_id=?', [$this->data['productID']]);
        if(!$product) {
            $this->setHttpStatus(404);
            exit();
        }
        if($product['product_visible']!=$this->data['visible']) {
            $this->showOrHide();
            $this->visibleHistory();
        }
        $this->success();
    }
    private function showOrHide() {
        Database::execute('UPDATE product SET product_visible=?', [($this->data['visible'])?1:0]);
    }
    private function visibleHistory() {
        Database::execute('INSERT INTO product_visible_history (product_id, admin_id, visible_or_invisible, admin_note) VALUES (?,?,?,?)', [$this->data['productID'], USERID, ($this->data['visible'])?1:0, $this->data['adminNote']]);
    }
}