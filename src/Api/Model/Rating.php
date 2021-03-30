<?php

namespace YorumKutusu\Api\Model;
use YorumKutusu\Api\Core\Database;
use YorumKutusu\Api\Model\TagWithProduct as TagWithProductModel;

class Rating {
    public static function delete($twpId) {
        Database::execute('DELETE FROM tag_rating WHERE tag_with_product_id=?', [$twpId]);
    }
    public static function deleteWithProductId($productId) {
        $twps = TagWithProductModel::gets($productId);
        foreach($twps as $twp) {
            self::delete($twp['tag_with_product_id']);
        }
    }
}
