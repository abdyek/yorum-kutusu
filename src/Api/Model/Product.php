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
}
