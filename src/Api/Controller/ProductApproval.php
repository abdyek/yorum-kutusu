<?php

namespace YorumKutusu\Api\Controller;
use YorumKutusu\Api\Core\Controller;
use YorumKutusu\Api\Core\Database;
use YorumKutusu\Api\Config\Config;
use YorumKutusu\Api\Model\ProductApproval as ProductApprovalModel;
use YorumKutusu\Api\Model\Product as ProductModel;
use YorumKutusu\Api\Model\TagWithProductRequest as TagWithProductRequestModel;
use YorumKutusu\Api\Model\TagWithProduct as TagWithProductModel;
use YorumKutusu\Api\Model\Tag as TagModel;
use YorumKutusu\Api\Model\Rating as RatingModel;

class ProductApproval extends Controller {
    protected function get() {
        $this->prepareRequest();
        $this->success(['productRequest'=> $this->reqArr]);
    }
    private function prepareRequest() {
        $this->request = Database::getRows('SELECT * FROM product_request pr INNER JOIN member m ON m.member_id=pr.member_id WHERE pr.cancelled=0 AND pr.product_request_answered=0');
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
    protected function post() {
        $this->checkRequest();
        if($this->request['product_id']) {
            // update;
            ProductModel::update([
                'productName'=>$this->request['product_name'],
                'productSlug'=>$this->request['product_slug'],
                'productId'=>$this->request['product_id'],
            ]);
            $this->productId = $this->request['product_id'];
        } else {
            ProductModel::create([
                'adminId'=>$this->userId,
                'productName'=>$this->request['product_name'],
                'productSlug'=>$this->request['product_slug'],
                'memberId'=>$this->request['member_id'],
            ]);
            $product = ProductModel::get($this->request['product_slug']);
            $this->productId = $product['product_id'];
        }
        $this->manageTWP();
        $this->deleteProductRequest(1);
        $this->deleteTWPRequest(1);
        $this->success();
    }
    private function checkRequest() {
        $this->request = ProductApprovalModel::getRequest($this->data['productRequestID']);
        if(!$this->request) {
            $this->setHttpStatus(404);
            exit();
        }
    }
    private function manageTWP() {
        RatingModel::deleteWithProductId($this->productId);
        TagWithProductModel::free($this->productId);
        $twpR = TagWithProductRequestModel::gets($this->data['productRequestID']);
        foreach($twpR as $twpr) {
            $tagId = $twpr['tag_id'];
            if($tagId==null) {
                // ilk önce tag oluşturulup sonra eklecek
                TagModel::create([
                    'memberId'=>$this->request['member_id'],
                    'adminId'=>$this->userId,
                    'createdFor'=>$this->productId,
                    'tagName'=>$twpr['tag_name'],
                    'tagSlug'=>$twpr['tag_slug'],
                    'tagPassive'=>true  // bu şimdilik, bunun bilgisini adminden almam gerekiyor
                ]);
                $newTag = TagModel::get($twpr['tag_slug']);
                $tagId = $newTag['tag_id'];
            }
            TagWithProductModel::attach([
                'tagId'=>$tagId,
                'productId'=>$this->productId,
                'adminId'=>$this->userId,
                'memberId'=>$this->request['member_id'],
            ]);
        }
    }
    protected function delete() {
        $this->checkRequest();
        $this->deleteProductRequest(0);
        $this->deleteTWPRequest(0);
        $this->success();
    }
    private function deleteProductRequest($accepted) {
        $this->adminNote = (isset($this->data['adminNote']))?$this->data['adminNote']:Config::ADMIN_NOTES['newProductRequestDeleteNote'];
        Database::executeWithErr('UPDATE product_request SET product_request_answered=1, admin_note=? WHERE product_request_id=?', [
            $this->adminNote,
            $this->data['productRequestID']
        ]);
        Database::executeWithErr('INSERT INTO product_request_response (product_request_id, admin_id, accepted, admin_note) VALUES(?,?,?,?)', [
            $this->data['productRequestID'],
            $this->userId,
            $accepted,
            $this->adminNote
        ]);
    }
    private function deleteTWPRequest($allowed) {
        Database::executeWithErr('UPDATE tag_with_product_request SET tag_with_product_request_answered=1, admin_note=? WHERE product_request_id=?', [
            $this->adminNote,
            $this->data['productRequestID']
        ]);
        $TWPRequest = Database::getRows('SELECT tag_with_product_request_id FROM tag_with_product_request WHERE product_request_id=?', [
            $this->data['productRequestID']
        ]);
        foreach($TWPRequest as $twp) {
            Database::executeWithErr('INSERT INTO tag_with_product_request_response (tag_with_product_request_id, admin_id, allowed_or_denied, admin_note) VALUES(?,?,?,?)', [
                $twp['tag_with_product_request_id'],
                $this->userId,
                $allowed,
                $this->adminNote
            ]);
        }
    }
}
