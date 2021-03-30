<?php

namespace YorumKutusu\Api\Model;
use YorumKutusu\Api\Core\Database;

class TagWithProductRequest {
    public static function gets($productRequestId) {
        return Database::getRows('SELECT * FROM tag_with_product_request WHERE product_request_id=?', [$productRequestId]);
    }
}
