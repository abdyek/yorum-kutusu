<?php

namespace YorumKutusu\Api\Endpoints;
use YorumKutusu\Api\Core\Request;
use YorumKutusu\Api\Core\Database;

class ForgotMyPassword extends Request {
    protected function post() {
        $this->memberCheck();
        if($this->member) {
            $this->saveAccount();
        }
        $this->success();
    }
    private function memberCheck() {
        $this->member = Database::existCheck('SELECT member_id FROM member WHERE member_deleted=0 AND member_email=? AND member_username=?', [$this->data['eMail'], $this->data['username']]);
    }
    private function saveAccount() {
        $randStr = Other::generateRandomString(30);
        Database::execute('DELETE FROM reset_password WHERE member_id=?', [$this->member['member_id']]);
        Database::execute('INSERT INTO reset_password (member_id, recovery_code) VALUES(?,?)', [$this->member['member_id'], $randStr]);
        Other::sendMail();
    }
    protected function put() {
        $this->memberCheck();
        if(!$this->member or !$this->checkCode()){
            $this->setHttpStatus(404);
            exit();
        }
        $hash = Other::getHash($this->data['newPassword']);
        Database::execute('UPDATE member SET member_password_hash=? WHERE member_id=?', [$hash ,$this->member['member_id']]);
        Database::execute('DELETE FROM reset_password WHERE member_id=?', [$this->member['member_id']]);
        $this->success();
    }
    private function checkCode() {
        return Database::existCheck('SELECT * FROM reset_password WHERE member_id=? AND recovery_code=?', [$this->member['member_id'], $this->data['recoveryCode']]);
    }
}
