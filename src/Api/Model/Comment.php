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
    public static function removeRating($productID, $memberID) {
        $twps = Database::getRows('SELECT * FROM tag_with_product twp INNER JOIN tag_rating tr ON tr.tag_with_product_id=twp.tag_with_product_id WHERE twp.product_id=? and tr.member_id=?',
            [$productID,$memberID]);
        foreach($twps as $twp) {
            Database::execute('DELETE FROM tag_rating WHERE tag_with_product_id=? AND member_id=?', [$twp['tag_with_product_id'],$memberID]);
            //$this->updateRateValue($twp['tag_with_product_id'], $twp['tag_rating_value'], false, true);
            self::updateRateValue($twp['tag_with_product_id'], $twp['tag_rating_value'], false, true);
        }

    }
    public function removeHiddenComment($commentID) {
        Database::execute('DELETE FROM hidden_comment WHERE comment_id=?', [$commentID]);
    }
    public static function updateRateValue($twpID, $val, $check, $forDelete=false) {
        $oldRate = ($check)?$check['tag_rating_value']:null;
        if($check) {
            Database::execute('UPDATE tag_with_product SET tag_avarage_rating=((tag_avarage_rating * rating_count)-?+?)/rating_count WHERE tag_with_product_id=?', [$oldRate, $val, $twpID]);
        } else {
            $sign = ($forDelete)?' - ':' + ';
            Database::execute('UPDATE tag_with_product SET tag_avarage_rating=((tag_avarage_rating * rating_count)'.$sign.'?)/(rating_count'.$sign.'1), rating_count=rating_count'.$sign.'1 WHERE tag_with_product_id=?', [$val, $twpID]);
        }
    }
}
