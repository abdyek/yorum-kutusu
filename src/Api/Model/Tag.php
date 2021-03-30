<?php

namespace YorumKutusu\Api\Model;
use YorumKutusu\Api\Core\Database;

class Tag {
    public static function create($obj) {
        $memberId = isset($obj['memberId'])?$obj['memberId']:null;
        $createdFor = isset($obj['createdFor'])?$obj['createdFor']:null;
        Database::execute('INSERT INTO tag (creater_member_id, admin_id, created_for, tag_name, tag_slug, tag_passive) VALUES(?,?,?,?,?,?)', [
            $memberId, $obj['adminId'], $createdFor, $obj['tagName'], $obj['tagSlug'], $obj['tagPassive']]);
    }
    public static function get($slug) {
        return Database::existCheck('SELECT * FROM tag WHERE tag_slug=?', [$slug]);
    }
}
