<?php

class ChangePassword extends Request {
    protected function post() {
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
        $hash = Database::getRow('SELECT member_password_hash FROM member WHERE member_id=?', [USERID])['member_password_hash'];
        return password_verify($this->data['password'], $hash);
    }
    private function setNewPassword() {
        $hash = Other::getHash($this->data['newPassword']);
        return (Database::execute('UPDATE member SET member_password_hash=? WHERE member_id=?', [$hash, USERID]))?true:false;
    }
    private function addHistory() {
        Database::execute('INSERT INTO member_password_change_history (member_id) VALUES(?)', [USERID]);
    }
}