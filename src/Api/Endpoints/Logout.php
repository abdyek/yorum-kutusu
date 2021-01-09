<?php

namespace YorumKutusu\Api\Endpoints;
use YorumKutusu\Api\Core\Request;
use YorumKutusu\Api\Core\Database;

use Ahc\Jwt\JWT;
$jwt = new JWT('secret', 'HS512', 3600, 10);

class Logout extends Request {
    protected function post() {
        if(isset($_COOKIE['jwt'])){
            unset($_COOKIE['jwt']);
            setcookie('jwt',null, -1);
        }
        $this->success();
    }
}
