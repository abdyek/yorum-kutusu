<?php

namespace YorumKutusu\Api\Controller;
use YorumKutusu\Api\Core\Controller;
use YorumKutusu\Api\Core\Database;
use YorumKutusu\Api\Config\Config;
use Ahc\Jwt\JWT;

class LoginAsAdmin extends Controller {
    protected function post() {
        $this->checkAdmin();
        http_response_code(401);
    }
    private function checkAdmin() {
        $this->query = Database::existCheck('SELECT * FROM admin WHERE admin_email=? and admin_inactive=0', [$this->data['email']]);
        if($this->query) {
            $hash = $this->query['admin_password_hash'];
            if(password_verify($this->data['password'], $hash)) {
                $this->sendToken($this->query['admin_id'], 'admin');
                exit();
            }
        }
    }
    private function sendToken($userid) {
        $jwt = new JWT('secret', 'HS512', Config::JWT_EXP);
        $token = $jwt->encode([
            'userid'    => $userid,
            'aud'    => 'http://www.yorumkutusu.com',
            'who' => 'admin',
            'remote_addr'=>$_SERVER['REMOTE_ADDR'],
            'iss'    => 'http://www.yorumkutusu.com/api',
        ]); 
        setcookie('jwt', $token, [
            'expires' => time() + 31557600 ,
            /* 'path' => '/',
            'domain' => 'domain.com', */
            'secure' => false,
            'httponly' => true,
            'samesite' => 'Strict',
        ]);
        $this->response([
            'jwt'=>$token,
            'id'=>$userid,
            'username'=>$this->query['admin_username'],
            'email'=>$this->query['admin_email'],
            'who'=>'admin'
        ]);
    }
}
