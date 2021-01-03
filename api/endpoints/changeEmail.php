<?php

class ChangeEmail extends Request {
    protected function post() {
        if(!$this->checkPassword()) {
            http_response_code(401);
            exit();
        }
        if(!$this->emailPatternCheck()){
            $this->setHttpStatus(422);
            //$this->responseWithMessage(3);
            exit();
        }
        if(!$this->uniqueEmail()) {
            $this->setHttpStatus(422);
            //$this->responseWithMessage(1);
            exit();
        }
        if($this->existCheck()) {
            $this->success();
            exit();
        }
        if(!$this->makeUnconfirmed()) {
            $this->setHttpStatus(500);
            $this->responseWithMessage(5);
            exit();
        }
        if(!$this->addEmailHistory()) {
            $this->setHttpStatus(500);
            $this->responseWithMessage(5);
            exit();
        }
        $this->success();
    }
    private function checkPassword() {
        $hash = Database::getRow('SELECT member_password_hash FROM member WHERE member_id=?', [USERID])['member_password_hash'];
        return password_verify($this->data['password'], $hash);
    }
    private function emailPatternCheck() {
        return filter_var($this->data['newEmail'], FILTER_VALIDATE_EMAIL);
    }
    private function uniqueEmail() {
        return (Database::getRow('SELECT * FROM member WHERE member_email=? AND member_deleted=0 AND member_id!=?', [$this->data['newEmail'], USERID]))?false:true;
    }
    private function existCheck() {
        return Database::existCheck('SELECT * FROM member WHERE member_email=? AND member_id=?', [$this->data['newEmail'], USERID]);
    }
    private function makeUnconfirmed() {
        return (Database::execute('UPDATE member SET member_confirmed_email=0, member_email=? WHERE member_id=?', [$this->data['newEmail'], USERID]))?true:false;
    }
    private function addEmailHistory() {
        $code = random_int(100000,999999);
        $query = Database::execute('INSERT INTO member_email_history (member_id, member_email, code, member_confirmed_email) VALUES(?,?,?,?)', [USERID, $this->data['newEmail'], $code, 0]);
        return $query;
    }
}
