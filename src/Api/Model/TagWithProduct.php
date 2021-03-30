<?php

namespace YorumKutusu\Api\Model;
use YorumKutusu\Api\Core\Database;

class TagWithProduct {
    public static function free($productId) {
        Database::executeWithErr('DELETE FROM tag_with_product WHERE product_id=?', [$productId]);
    }
    public static function attach($obj) {
        $memberId = (isset($obj['memberId']))?$obj['memberId']:null;
        Database::execute('INSERT INTO tag_with_product (tag_id, product_id, admin_id, member_id) VALUES(?,?,?,?)', [
            $obj['tagId'],
            $obj['productId'],
            $obj['adminId'],
            $memberId,
        ]);
    }
    public static function gets($productId) {
        return Database::getRows('SELECT * FROM tag_with_product WHERE product_id=?', [$productId]);
    }
}
