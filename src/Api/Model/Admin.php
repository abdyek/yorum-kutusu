<?php

namespace YorumKutusu\Api\Model;
use YorumKutusu\Api\Core\Database;

class Admin {
    public static function get($adminId) {
        return Database::existCheck('SELECT * FROM admin WHERE admin_id=?', [$adminId]);
    }
}
