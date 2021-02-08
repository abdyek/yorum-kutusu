<?php

namespace YorumKutusu\Api\Controller;
use YorumKutusu\Api\Core\Controller;
use YorumKutusu\Api\Core\Database;
use Ahc\Jwt\JWT;

class LoginAsAdmin extends Controller {
    protected function post() {
        $this->checkAdmin();
        http_response_code(401);
    }
    private function checkAdmin() {
        $query = Database::getRow('SELECT * FROM admin WHERE admin_email=? and admin_inactive=0', [$this->data['email']]);
        if($query) {
            $hash = $query['admin_password_hash'];
            if(password_verify($this->data['password'], $hash)) {
                $this->sendToken($query['admin_id'], 'admin');
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
        setcookie('jwt', $token, time() + 31557600 , NULL, NULL, NULL, TRUE); 
        $this->response(['jwt'=>$token, 'userID'=>$userid, 'who'=>'admin']);
    }
}
