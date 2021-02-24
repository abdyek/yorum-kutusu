<?php

namespace YorumKutusu\Api\Controller;
use YorumKutusu\Api\Core\Controller;
use YorumKutusu\Api\Core\Other;
use YorumKutusu\Api\Core\Database;

class NewProductChecker extends Controller {
    protected function get() {
        $this->slug = Other::generateSlug($this->data['productName']);
        $this->checkProductSlug();
        $response = [
            'available'=>false,
            'slug'=>$this->slug,
            'product'=>null
        ];
        if($this->product) {
            $response['available'] = true;
            $response['product'] = [
                'id'=>$this->product['product_id'],
                'title'=>$this->product['product_name'],
                'slug'=>$this->product['product_slug']
            ];
        }
        $this->response($response);
    }
    private function checkProductSlug() {
        $this->product = Database::existCheck('SELECT * FROM product WHERE product_deleted=0 AND product_slug=?', [$this->slug]);
    }
}
