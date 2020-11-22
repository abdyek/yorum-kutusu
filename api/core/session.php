<?php

use Ahc\Jwt\JWT;

if(isset($_COOKIE['jwt'])) {
    try {
        $payload = (new JWT('secret', 'HS512',Config::JWT_EXP))->decode($_COOKIE['jwt']);
    } catch(Exception $e) {
        if(isset($_COOKIE['jwt'])){
            unset($_COOKIE['jwt']);
            setcookie('jwt',null, -1);
        }
    }
    if(isset($payload['userid'])) {
        define('USERID', $payload['userid']);
    }
    if(isset($payload['who'])) {
        define('WHO', $payload['who']);
    } else {
        define('WHO', 'guest');
    }
} else {
    define('WHO', 'guest');
}
