<?php

namespace YorumKutusu\Api\Model;
use YorumKutusu\Api\Core\Database;

class Product {
    public static function increaseCommentCount($productID) {
        Database::executeWithErr('UPDATE product SET product_comment_count=product_comment_count+1 WHERE product_id=?', [$productID]);
    }
    public static function decreaseCommentCount($productID) {
        Database::executeWithErr('UPDATE product SET product_comment_count=product_comment_count-1 WHERE product_id=?', [$productID]);
    }
    public static function create($object) {
        $memberId = isset($object['memberId'])?$object['memberId']:null;
        $productCreatedByMember = isset($object['productCreatedByMember'])?$object['productCreatedByMember']:0;
        Database::execute('INSERT INTO product (admin_id, member_id, product_name,product_slug, product_created_by_member) VALUES (?,?,?,?,?)', [
            $object['adminId'],
            $memberId,
            $object['productName'],
            $object['productSlug'],
            $productCreatedByMember,
        ]);
    }
}
