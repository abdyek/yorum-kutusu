<?php

use Ahc\Jwt\JWT;

if(isset($_COOKIE['jwt'])) {
    $payload = (new JWT('secret', 'HS512', 3600, 10))->decode($_COOKIE['jwt']);
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