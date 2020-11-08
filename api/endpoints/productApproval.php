<?php
class ProductApproval extends Request {
    protected function post() {
        $this->productRequest = Database::existCheck('SELECT * FROM product_request WHERE product_request_id=? AND product_request_answered=0', [$this->data['productRequestID']]);
        if(!$this->productRequest) {
            $this->setHttpStatus(404);
            exit();
        }
        $this->twpRequest = Database::getRows('SELECT * FROM tag_with_product_request WHERE product_request_id=?', [$this->productRequest['product_request_id']]);
        $this->warning = [];
        $this->prepareTags();
        $this->manageProduct();
        if($this->data['accept']) {
            if($this->productID) {
                $this->update();
            } else {
                $this->newProduct();
            }
        } else {
            // onaylamama işlemleri
            $this->success();
            exit();
        }
        $this->insertProductRequestResponse();
        $this->markAsAnswered();
        $this->manageTagWithProduct();
        $this->markAsAnsweredTWP();
        $this->insertTWPRequestResponse();
        $this->success();
    }
    private function prepareTags() {
        $this->tags = [];
        foreach($this->twpRequest as $t) {
            if($t['tag_id']) {
                $tag = Database::existCheck('SELECT * FROM tag WHERE tag_id=?', [$t['tag_id']]);
                if(!$tag) {
                    $this->setHttpStatus(404);
                    $this->addWarning('not found', 'böyle bir etiket yok');
                } elseif($tag['tag_visible']==0) {
                    $this->addWarning('hidden tag', 'bu etiket gizli');
                } else {
                    $this->tags[] = [
                        'tagID'=>$tag['tag_id'],
                    ];
                }
            }
            if($t['tag_name'] or $t['tag_slug']) {
                $tag = Database::existCheck('SELECT * FROM tag WHERE tag_name=? or tag_slug=?', [$t['tag_name'], $t['tag_slug']]);
                if(!$tag) {
                    $this->tags[] = [
                        'newTag'=>[
                            'tagName'=>$t['tag_name'],
                            'tagSlug'=>$t['tag_slug']
                        ]
                    ];
                } elseif($tag['tag_name']!=$t['tag_name'] or $tag['tag_slug']!=$t['tag_slug']) {
                    $this->addWarning('incompatible', 'istekteki etiket isim-slug veri tabanındaki isim-slug ile uyumsuz ya da çakışma var');
                }
            }
        }
        if(count($this->warning)) {
            $this->setHttpStatus(422);
            $this->responseWithMessage(9, ['warning'=>$this->warning]);
            exit();
        }
    }
    private function addWarning($title, $message, $other=null) {
        $this->warning[] = [
            'title'=>$title,
            'message'=>$message,
            'other'=>$other
        ];
    }
    private function manageProduct() {
        if($this->productRequest['product_id']) {
            $this->productID = $this->productRequest['product_id'];
        } else {
            $availableProduct = Database::existCheck('SELECT * FROM product WHERE product_name=? AND product_slug=?', [$this->productRequest['product_name'], $this->productRequest['product_slug']]);
            $this->productID = ($availableProduct)?$availableProduct['product_id']:null;
        }
    }
    private function update() {
        $product = Database::getRow('SELECT product_id, admin_id, member_id, product_name, product_slug, history_pointer FROM product WHERE product_id=?', [$this->productID]);
        $this->historyPointer = $product['history_pointer'];
        $this->q = Database::executeWithError('INSERT INTO product_history (product_id, admin_id, member_id, product_old_name, product_old_slug, product_request_date_time, history_id) VALUES (?,?,?,?,?,?,?)',[
            $product['product_id'],
            $product['admin_id'],
            $product['member_id'],
            $product['product_name'],
            $product['product_slug'],
            $this->productRequest['product_request_date_time'],
            $product['history_pointer']
        ]);
        $this->showDBErr();
        $this->q = Database::executeWithError('UPDATE product SET admin_id=?, member_id=?, product_name=?, product_slug=?, history_pointer=history_pointer+1 WHERE product_id=?', [
            USERID,
            $this->productRequest['member_id'],
            $this->productRequest['product_name'],
            $this->productRequest['product_slug'],
            $this->productID
        ]);
        $this->showDBErr();
    }
    private function newProduct() {
        $this->q = Database::executeWithError('INSERT INTO product (admin_id, member_id, product_name, product_slug, product_created_by_member) VALUES(?,?,?,?,1)', [
            USERID,
            $this->productRequest['member_id'],
            $this->productRequest['product_name'],
            $this->productRequest['product_slug']
        ]);
        $this->showDBErr();
        $this->productID = Database::getRow('SELECT product_id FROM product WHERE product_slug=?', [$this->productRequest['product_slug']])['product_id'];
        $this->historyPointer = 1;
    }
    private function insertProductRequestResponse() {
        $this->q = Database::executeWithError('INSERT INTO product_request_response (product_request_id, admin_id, accepted, admin_note) VALUES(?,?,?,?)', [ $this->productRequest['product_request_id'], USERID, ($this->data['accept'])?1:0, $this->data['adminNote']]);
        $this->showDBErr();
    }
    private function markAsAnswered() {
        $this->q = Database::executeWithError('UPDATE product_request SET product_request_answered=1, admin_note=? WHERE product_request_id=?', [$this->data['adminNote'], $this->productRequest['product_request_id']]);
        $this->showDBErr();
    }
    private function manageTagWithProduct() {
        $this->addHistory();
        $tagsIDs = [];
        $this->tagsTemp = $this->tags;
        foreach($this->tagsTemp as $t) {
            if(isset($t['newTag'])) {
                $this->q = Database::executeWithError('INSERT INTO tag (creater_member_id, admin_id, created_for, tag_name, tag_slug, tag_passive) VALUES(?,?,?,?,?,?)',[
                    $this->productRequest['member_id'],
                    USERID,
                    $this->productID,
                    $t['newTag']['tagName'],
                    $t['newTag']['tagSlug'],
                    0
                ]);
                $this->showDBErr();
                $this->tags[] = ['tagID'=>Database::getRow('SELECT tag_id FROM tag WHERE tag_name=? and tag_slug=?', [$t['newTag']['tagName'], $t['newTag']['tagSlug']])['tag_id']];
            }
        }
        foreach($this->tags as $t) {
            if(isset($t['tagID'])) {
                $this->attachTagIDWithProduct($t['tagID']);
            }
        }
    }
    private function addHistory() {
        // history
        $old = Database::getRows('SELECT * FROM tag_with_product WHERE product_id=?', [$this->productID]);
        foreach($old as $h) {
            $this->q = Database::executeWithError('INSERT INTO tag_with_product_history (tag_id, product_id, admin_id, member_id, history_id) VALUES(?,?,?,?,?)', [
                $h['tag_id'],
                $this->productID,
                $h['admin_id'],
                $h['member_id'],
                $this->historyPointer
            ]);
            $this->showDBErr();
        }
        $this->q = Database::executeWithError('DELETE FROM tag_with_product WHERE product_id=?', [$this->productID]);
        $this->showDBErr();
    }
    private function attachTagIDWithProduct($tagID) {
        $this->q = Database::executeWithError('INSERT INTO tag_with_product (tag_id, product_id, admin_id, member_id) VALUES(?,?,?,?)', [
            $tagID,
            $this->productID,
            USERID,
            $this->productRequest['member_id']
        ]);
        $this->showDBErr();
    }
    private function markAsAnsweredTWP() {
        foreach($this->twpRequest as $req) {
            $this->q = Database::executeWithError('UPDATE tag_with_product_request SET tag_with_product_request_answered=1, admin_note=? WHERE tag_with_product_request_id=?', [
                $this->data['adminNote'],
                $req['tag_with_product_request_id']
            ]);
            $this->showDBErr();
        }
    }
    private function insertTWPRequestResponse() {
        foreach($this->twpRequest as $req) {
            $this->q = Database::executeWithError('INSERT INTO tag_with_product_request_response (tag_with_product_request_id, admin_id, allowed_or_denied, admin_note) VALUES(?,?,?,?)',[
                $req['tag_with_product_request_id'],
                USERID,
                $this->data['accept'],
                $this->data['adminNote']
            ]);
            $this->showDBErr();
        }
    }
    protected function get() {
        $this->prepareRequest();
        $this->success(['productRequest'=> $this->reqArr]);
    }
    private function prepareRequest() {
        $this->request = Database::getRows('SELECT * FROM product_request pr INNER JOIN member m ON m.member_id=pr.member_id WHERE pr.product_request_answered=0');
        $this->reqArr = [];
        foreach($this->request as $req) {
            $twp = $this->prepareTWPRequest($req['product_request_id']);
            $this->reqArr[] = [
                'product'=>$this->prepareProduct($req['product_id']),
                'memberID'=>$req['member_id'],
                'memberUsername'=>$req['member_username'],
                'memberSlug'=>$req['member_slug'],
                'productRequestID'=>$req['product_request_id'],
                'productRequestDateTime'=>$req['product_request_date_time'],
                'productName'=>$req['product_name'],
                'productSlug'=>$req['product_slug'],
                'tagWithProduct'=>$twp
            ];
        }
    }
    private function prepareTWPRequest($productRequestID) {
        $twpR = Database::getRows('SELECT * FROM tag_with_product_request WHERE tag_with_product_request_answered=0 AND product_request_id=?', [$productRequestID]);
        $twpArr = [];
        foreach($twpR as $r) {
            $tag = $this->prepareTag($r['tag_id']);
            $twpArr[] = [
                'twpRequestID'=>$r['tag_with_product_request_id'],
                'tag'=>$this->prepareTag($r['tag_id']),
                'tagName'=>$r['tag_name'],
                'tagSlug'=>$r['tag_slug']
            ];
        }
        return $twpArr;
    }
    private function prepareProduct($productID) {
        $p = Database::existCheck('SELECT * FROM product WHERE product_id=?', [$productID]);
        if(!$p) {
            return null;
        }
        return [
            'productID'=>$p['product_id'],
            'productName'=>$p['product_name'],
            'productSlug'=>$p['product_slug'],
            'productVisible'=>$p['product_visible']
        ];
    }
    private function prepareTag($tagID) {
        $tag = Database::existCheck('SELECT * FROM tag WHERE tag_id=?', [$tagID]);
        if(!$tag) {
            return null;
        }
        return [
            'tagID'=>$tag['tag_id'],
            'tagName'=>$tag['tag_name'],
            'tagSlug'=>$tag['tag_slug'],
            'tagVisible'=>$tag['tag_visible'],
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
