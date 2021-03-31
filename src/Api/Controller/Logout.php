<?php

namespace YorumKutusu\Api\Controller;
use YorumKutusu\Api\Core\Controller;
use YorumKutusu\Api\Core\Database;

use Ahc\Jwt\JWT;
$jwt = new JWT('secret', 'HS512', 3600, 10);

class Logout extends Controller {
    protected function post() {
        if(isset($_COOKIE['jwt'])){
            unset($_COOKIE['jwt']);
            setcookie('jwt', null, [
                'expires' => -1 ,
                'secure' => false,
                'httponly' => true,
                'samesite' => 'Strict',
            ]);
        }
        $this->success();
    }
}
