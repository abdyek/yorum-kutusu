<?php

namespace YorumKutusu\Api\Controller;
use YorumKutusu\Api\Core\Controller;
use YorumKutusu\Api\Core\Database;

class CheckProductSlug extends Controller{
    protected function get() {
        $bool = (Database::getRow('SELECT product_id FROM product WHERE product_slug=? AND product_deleted=0', [$this->data['slug']]))?true:false;
        $this->success([
            'state'=>$bool
        ]);
    }
}
