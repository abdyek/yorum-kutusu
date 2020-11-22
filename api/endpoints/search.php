<?php

class Search extends Request {
    protected function get() {
        $results = Database::getRows('SELECT * FROM product WHERE product_name LIKE "%"?"%" AND product_deleted=0', [$this->data['text']]);
        $resultsArray = [];
        foreach($results as $r) {
            $resultsArray[] = [
                'productID'=>$r['product_id'],
                'productSlug'=>$r['product_slug'],
                'productName'=>$r['product_name']
            ];
        }
        $this->success([
            'results'=>$resultsArray
        ]);
    }
}
