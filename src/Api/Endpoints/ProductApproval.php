<?php

namespace YorumKutusu\Api\Endpoints;
use YorumKutusu\Api\Core\Request;
use YorumKutusu\Api\Core\Database;

class ProductApproval extends Request {
    protected function get() {
        $this->prepareRequest();
        $this->success(['productRequest'=> $this->reqArr]);
    }
    private function prepareRequest() {
        $this->request = Database::getRows('SELECT * FROM product_request pr INNER JOIN member m ON m.member_id=pr.member_id WHERE pr.cancelled=1 AND pr.product_request_answered=0');
        $this->reqArr = [];
        foreach($this->request as $req) {
            if($req['product_id']) {
                $this->prepareUpdateReq($req);
            } else {
                $this->prepareNewReq($req);
            }
        }
    }
    private function prepareUpdateReq($req) {
        $twp = $this->prepareTWPRequest($req['product_request_id']);
        $this->reqArr[] = [
            'request'=>[
                'type'=>'update',
                'productRequestID'=>$req['product_request_id'],
                'productRequestDateTime'=>$req['product_request_date_time'],
            ],
            'member'=>[
                'id'=>$req['member_id'],
                'username'=>$req['member_username'],
                'slug'=>$req['member_slug']
            ],
            'availableProduct'=>$this->prepareProduct($req['product_id']),
            'update'=>[
                'name'=>$req['product_name'],
                'slug'=>$req['product_slug'],
            ],
            'tagWithProduct'=>$twp
        ];
    }
    private function prepareNewReq($req) {
        $twp = $this->prepareTWPRequest($req['product_request_id']);
        $this->reqArr[] = [
            'request'=>[
                'type'=>'newProduct',
                'productRequestID'=>$req['product_request_id'],
                'productRequestDateTime'=>$req['product_request_date_time'],
            ],
            'member'=>[
                'id'=>$req['member_id'],
                'username'=>$req['member_username'],
                'slug'=>$req['member_slug'],
            ],
            'newProduct'=>[
                'name'=>$req['product_name'],
                'slug'=>$req['product_slug'],
                'tagWithProduct'=>$twp
            ]
        ];
        
    }
    private function prepareTWPRequest($productRequestID) {
        $twpR = Database::getRows('SELECT * FROM tag_with_product_request WHERE tag_with_product_request_answered=0 AND product_request_id=?', [$productRequestID]);
        $twpArr = [];
        foreach($twpR as $r) {
            if($r['tag_id']) {
                $twpArr[] = [
                    'type'=>'available',
                    'twpRequestID'=>$r['tag_with_product_request_id'],
                    'tag'=>$this->prepareTag($r['tag_id'])
                ];
            } else {
                $twpArr[] = [
                    'type'=>'new',
                    'twpRequestID'=>$r['tag_with_product_request_id'],
                    'newTag'=>[
                        'name'=>$r['tag_name'],
                        'slug'=>$r['tag_slug']
                    ]
                ];
            }
        }
        return $twpArr;
    }
    private function prepareProduct($productID) {
        $p = Database::existCheck('SELECT * FROM product WHERE product_id=?', [$productID]);
        return [
            'id'=>$p['product_id'],
            'name'=>$p['product_name'],
            'slug'=>$p['product_slug']
        ];
    }
    private function prepareTag($tagID) {
        $tag = Database::existCheck('SELECT * FROM tag WHERE tag_id=?', [$tagID]);
        return [
            'tagID'=>$tag['tag_id'],
            'tagName'=>$tag['tag_name'],
            'tagSlug'=>$tag['tag_slug'],
            'tagPassive'=>$tag['tag_passive'],
            'tagProductCount'=>$tag['tag_product_count']
        ];
    }
    private function showDBErr() {
        if(!$this->q[0]) {
            $this->responseWithMessage(5, [
                'err'=>$q[1]
            ]);
        }
    }
}
