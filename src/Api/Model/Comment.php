<?php

namespace YorumKutusu\Api\Model;
use YorumKutusu\Api\Core\Database;

class Comment {
    public static function increaseNewCommentCount($productID) {
        Database::execute('UPDATE product_follow SET new_comment_count = new_comment_count + 1 WHERE product_id=?', [$productID]);
    }
    public static function decreaseNewCommentCount($productID, $commentCreateDateTime) {
        Database::executeWithErr('UPDATE product_follow SET new_comment_count = new_comment_count - 1 WHERE product_id=? and new_comment_count>0 and ?>last_seen_date_time', [$productID, $commentCreateDateTime]);
    }
}
