<?php

namespace YorumKutusu\Api\Model;
use YorumKutusu\Api\Core\Database;

class Member {
    public static function get($memberId) {
        return Database::existCheck('SELECT * FROM member WHERE member_id=?', [$memberId]);
    }
}
