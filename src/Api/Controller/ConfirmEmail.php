<?php

namespace YorumKutusu\Api\Controller;
use YorumKutusu\Api\Core\Controller;
use YorumKutusu\Api\Core\Database;
use YorumKutusu\Api\Core\Other;

class ConfirmEmail extends Controller {
    protected function post() {
        // request of new code
        if($this->checkConfirmedBefore()) {
            $this->success();
            exit();
        }
        $randStr = Other::generateRandomString(10);
        $this->deleteConfirm();
        Database::executeWithErr('INSERT INTO confirm_email (member_id, confirm_code) VALUES(?,?)', [$this->userId, $randStr]);
        Other::sendMail();
        // ^ code and front-end link is here
        $this->success();
    }
    private function checkConfirmedBefore() {
        return Database::getRow('SELECT member_confirmed_email AS c FROM member WHERE member_id=?', [$this->userId])['c']==='1';
    }
    private function deleteConfirm() {
        Database::execute('UPDATE confirm_email SET deleted=1 WHERE member_id=?', [$this->userId]);
    }
    protected function put() {
        // request to send recovery code
        if(!$this->checkCode()) {
            $this->increaseTrial();
            $this->setHttpStatus(404);
            exit();
        }
        $this->confirm();
        $this->deleteConfirm();
        $this->success();
    }
    private function checkCode() {
        return Database::existCheck('SELECT * FROM confirm_email WHERE deleted=0 AND member_id=? AND confirm_code=?', [$this->userId, $this->data['confirmCode']]);
    }
    private function increaseTrial() {
        $confirmEmail= Database::existCheck('SELECT * FROM confirm_email WHERE deleted=0 AND member_id=?', [$this->userId]);
        if($confirmEmail) {
            if($confirmEmail['trial']==2) {
                $this->setHttpStatus(401);
                $this->deleteConfirm();
                exit();
            }
            Database::executeWithErr('UPDATE confirm_email SET trial=trial+1 WHERE deleted=0 AND member_id=?', [$this->userId]);
        }
    }
    private function confirm() {
        Database::executeWithErr('UPDATE member SET member_confirmed_email=1 WHERE member_id=?', [$this->userId]);
        Database::executeWithErr('UPDATE member_email_history SET confirmed_email_date_time=?, member_confirmed_email=1 WHERE member_id=? AND confirmed_email_date_time IS NULL', [Other::getCurrentDateTime(), $this->userId]);
    } 
}
