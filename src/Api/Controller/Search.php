<?php

namespace YorumKutusu\Api\Controller;
use YorumKutusu\Api\Core\Controller;
use YorumKutusu\Api\Core\Database;

class Search extends Controller {
    protected function get() {
        $results = Database::getRows('SELECT * FROM product WHERE product_name LIKE "%"?"%" AND product_deleted=0 LIMIT 10', [$this->data['name']]);
        $resultsArray = [];
        foreach($results as $r) {
            $resultsArray[] = [
                'id'=>$r['product_id'],
                'slug'=>$r['product_slug'],
                'name'=>$r['product_name']
            ];
        }
        $this->success([
            'products'=>$resultsArray
        ]);
    }
}
