<?php

class ForgotMyPassword extends Request {
    protected function post() {
        if(Database::existCheck('SELECT member_id FROM member WHERE member_deleted=0 AND member_email=? AND member_username=?', [$this->data['eMail'], $this->data['username']])) {
            Other::sendMail();
        }
        $this->success();
    }
}