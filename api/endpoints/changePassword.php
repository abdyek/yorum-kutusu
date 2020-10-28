<?php

class ChangePassword extends Request {
    protected function post() {
        if(WHO=='admin') {
            $this->selectSql = 'SELECT admin_password_hash FROM admin WHERE admin_id=?';
            $this->selectColName = 'admin_password_hash';
            $this->updateSql = 'UPDATE admin SET admin_password_hash=? WHERE admin_id=?';
            $this->addHis = false;
        } elseif(WHO=='member') {
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
        $hash = Database::getRow($this->selectSql, [USERID])[$this->selectColName];
        return password_verify($this->data['password'], $hash);
    }
    private function setNewPassword() {
        $hash = Other::getHash($this->data['newPassword']);
        return (Database::execute($this->updateSql, [$hash, USERID]))?true:false;
    }
    private function addHistory() {
        if($this->addHis){
            Database::execute('INSERT INTO member_password_change_history (member_id) VALUES(?)', [USERID]);
        }
    }
}