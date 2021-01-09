<?php

namespace YorumKutusu\Api\Endpoints;
use YorumKutusu\Api\Core\Request;
use YorumKutusu\Api\Core\Database;

class ChangePassword extends Request {
    protected function post() {
        if($this->who=='admin') {
            $this->selectSql = 'SELECT admin_password_hash FROM admin WHERE admin_id=?';
            $this->selectColName = 'admin_password_hash';
            $this->updateSql = 'UPDATE admin SET admin_password_hash=? WHERE admin_id=?';
            $this->addHis = false;
        } elseif($this->who=='member') {
            $this->selectSql = 'SELECT member_password_hash FROM member WHERE member_id=?';
            $this->selectColName= 'member_password_hash';
            $this->updateSql = 'UPDATE member SET member_password_hash=? WHERE member_id=?';
            $this->addHis = true;
        }
        if(!$this->checkPassword()) {
            http_response_code(401);
            exit();
        }
        if(!$this->setNewPassword()) {
            $this->setHttpStatus(500);
            $this->responseWithMessage(5);
            exit();
        }
        $this->addHistory();
        $this->success();
    }
    private function checkPassword() {
        $hash = Database::getRow($this->selectSql, [$this->userId])[$this->selectColName];
        return password_verify($this->data['password'], $hash);
    }
    private function setNewPassword() {
        $hash = Other::getHash($this->data['newPassword']);
        return (Database::execute($this->updateSql, [$hash,$this->userId]))?true:false;
    }
    private function addHistory() {
        if($this->addHis){
            Database::execute('INSERT INTO member_password_change_history (member_id) VALUES(?)', [$this->userId]);
        }
    }
}
