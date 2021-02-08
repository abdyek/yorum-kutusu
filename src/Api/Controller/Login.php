<?php

namespace YorumKutusu\Api\Controller;
use YorumKutusu\Api\Core\Controller;
use YorumKutusu\Api\Core\Database;
use YorumKutusu\Api\Config\Config;
use Ahc\Jwt\JWT;

class Login extends Controller {
    protected function post() {
        $this->checkMember();
        http_response_code(401);
    }
    private function checkMember() {
        $this->member= Database::getRow('SELECT * FROM member WHERE member_email=?', [$this->data['email']]);
        if($this->member) {
            $hash = $this->member['member_password_hash'];
            if(password_verify($this->data['password'], $hash)) {
                $this->sendToken();
                exit();
            }
        }
    }
    private function sendToken() {
        $jwt = new JWT('secret', 'HS512', Config::JWT_EXP);
        $token = $jwt->encode([
            'userid'    => $this->member['member_id'],
            'aud'    => 'http://www.yorumkutusu.com',
            'who' => 'member',
            'remote_addr'=>$_SERVER['REMOTE_ADDR'],
            'iss'    => 'http://www.yorumkutusu.com/api',
        ]); 
        setcookie('jwt', $token, time() + 31557600 , NULL, NULL, NULL, TRUE); 
        $this->response([
            'jwt'=>$token,
            'userID'=>$this->member['member_id'],
            'username'=>$this->member['member_username'],
            'slug'=>$this->member['member_slug'],
            'who'=>'member'
        ]);
    }

}
