<?php

class ValidateEmail extends Request {
    protected function post(){
        $row = Database::getRow('SELECT member_email_history_id, code, member_confirmed_email FROM `member_email_history` WHERE member_id=? ORDER BY change_date_time DESC LIMIT 1', [USERID]);
        if($row['member_confirmed_email']) {
            $this->success();
            exit();
        }
        $codeInDB = $row['code'];
        $this->id = $row['member_email_history_id'];
        if($this->data['code']!=$codeInDB) {
            $this->setHttpStatus(401);
            exit();
        }
        $this->validate();
        $this->success();
    }
    private function validate() {
        if(!Database::execute('UPDATE member SET member_confirmed_email=1 WHERE member_id=?', [USERID])) {
            $this->responseWithError(5);
            exit();
        }
        if(!Database::execute('UPDATE member_email_history SET confirmed_email_date_time=?, member_confirmed_email=1 WHERE member_email_history_id=?', [Other::getCurrentDateTime(), $this->id])){
            $this->responseWithError(5);
            exit();
        }
        return true;
    }
    protected function get() {
        $row = Database::getRow('SELECT member_email_history_id, member_confirmed_email FROM `member_email_history` WHERE member_id=? ORDER BY change_date_time DESC LIMIT 1', [USERID]);
        $id = $row['member_email_history_id'];
        $check = $row['member_confirmed_email'];
        if($check) {
            $this->setHttpStatus(403);
            exit();
        }
        Database::execute('UPDATE member_email_history SET code=? WHERE member_email_history_id=?', [Other::generateVerificationCode(), $id]);
        Other::sendMail();
        $this->success();
    }
}