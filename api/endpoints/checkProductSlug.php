<?php

class CheckProductSlug extends Request {
    protected function get() {
        $bool = (Database::getRow('SELECT product_id FROM product WHERE product_slug=? AND product_visible=1', [$this->data['slug']]))?true:false;
        $this->success([
            'state'=>$bool
        ]);
    }
}