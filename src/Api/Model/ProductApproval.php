<?php

namespace YorumKutusu\Api\Model;
use YorumKutusu\Api\Core\Database;

class ProductApproval {
    public static function getRequest($requestId, $answered=false, $cancelled=false) {
        return Database::existCheck('SELECT * FROM product_request WHERE cancelled=? and product_request_answered=? and product_request_id=?', [$cancelled, $answered, $requestId]);
    }
};         
