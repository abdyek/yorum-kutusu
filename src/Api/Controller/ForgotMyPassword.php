<?php

namespace YorumKutusu\Api\Controller;
use YorumKutusu\Api\Core\Controller;
use YorumKutusu\Api\Core\Database;
use YorumKutusu\Api\Core\Other;

class ForgotMyPassword extends Controller {
    protected function post() {
        $this->memberCheck();
        if($this->member) {
            $this->saveAccount();
        }
        $this->success();
    }
    private function memberCheck() {
        $this->member = Database::existCheck('SELECT * FROM member WHERE member_deleted=0 AND member_email=? AND member_username=?', [$this->data['eMail'], $this->data['username']]);
    }
    private function saveAccount() {
        $randStr = Other::generateRandomString(10);
        $this->deleteRecovery();
        Database::execute('INSERT INTO reset_password (member_id, recovery_code) VALUES(?,?)', [$this->member['member_id'], $randStr]);
        $htmlBody = 'Kurtarma Kodu: <b>' . $randStr . '</b><br/>'. 'Bağlantıyı kullanarak kurtarma alanına gidebilirsiniz <a href="http://yorumkutusu.com/parolami-unuttum?email='.$this->member['member_email'].'&recoveryCode='.$randStr.'&username='.$this->member['member_username'].'">Tıklayın</a>';
        $altBody = 'Kurtarma Kodu: ' . $randStr;
        Other::sendMail($this->member['member_email'], $this->member['member_username'], 'Parolamı Unuttum', $htmlBody, $altBody);
        // here is an example to send url from user http://localhost/yorum-kutusu/parolami-unuttum?email=yunusemrebulut123@gmail.com&recoveryCode=123212121&username=mahmut
        // all is completed for front-end, only send url as this
    }
    protected function put() {
        $this->memberCheck();
        if(!$this->member or !$this->checkCode()){
            $this->increaseTrial();
            $this->setHttpStatus(404);
            exit();
        }
        $hash = Other::getHash($this->data['newPassword']);
        Database::execute('UPDATE member SET member_password_hash=? WHERE member_id=?', [$hash ,$this->member['member_id']]);
        $this->deleteRecovery();
        $this->success();
    }
    private function checkCode() {
        return Database::existCheck('SELECT * FROM reset_password WHERE deleted=0 AND member_id=? AND recovery_code=?', [$this->member['member_id'], $this->data['recoveryCode']]);
    }
    private function increaseTrial() {
        $resetPassword = Database::existCheck('SELECT * FROM reset_password WHERE deleted=0 AND member_id=?', [$this->member['member_id']]);
        if($resetPassword) {
            if($resetPassword['trial']==2) {
                $this->setHttpStatus(401);
                $this->deleteRecovery();
                exit();
            }
            Database::execute('UPDATE reset_password SET trial=trial+1 WHERE deleted=0 AND member_id=?', [$this->member['member_id']]);
        }
    }
    private function deleteRecovery() {
        Database::execute('UPDATE reset_password SET deleted=1 WHERE member_id=?', [$this->member['member_id']]);
    }
}
