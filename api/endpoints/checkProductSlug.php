<?php

class CheckProductSlug extends Request {
    protected function get() {
        $bool = (Database::getRow('SELECT product_id FROM product WHERE product_slug=? AND product_deleted=0', [$this->data['slug']]))?true:false;
        $this->success([
            'state'=>$bool
        ]);
    }
}
