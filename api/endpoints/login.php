<?php

use Ahc\Jwt\JWT;

class Login extends Request {
    protected function post() {
        $this->checkMember();
        http_response_code(401);
    }
    private function checkMember() {
        $query = Database::getRow('SELECT * FROM member WHERE member_email=?', [$this->data['email']]);
        if($query) {
            $hash = $query['member_password_hash'];
            if(password_verify($this->data['password'], $hash)) {
                $this->sendToken($query['member_id']);
                exit();
            }
        }
    }
    private function sendToken($userid) {
        $jwt = new JWT('secret', 'HS512', Config::JWT_EXP);
        $token = $jwt->encode([
            'userid'    => $userid,
            'aud'    => 'http://www.yorumkutusu.com',
            'who' => 'member',
            'remote_addr'=>$_SERVER['REMOTE_ADDR'],
            'iss'    => 'http://www.yorumkutusu.com/api',
        ]); 
        setcookie('jwt', $token, time() + 31557600 , NULL, NULL, NULL, TRUE); 
        $this->response(['jwt'=>$token, 'userID'=>$userid, 'who'=>'member']);
    }

}
