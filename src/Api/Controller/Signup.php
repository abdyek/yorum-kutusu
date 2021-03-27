<?php

namespace YorumKutusu\Api\Controller;
use YorumKutusu\Api\Core\Controller;
use YorumKutusu\Api\Core\Database;
use YorumKutusu\Api\Core\Other as Other;
use YorumKutusu\Api\Controller\ConfirmEmail;

class Signup extends Controller {
    protected function post() {
        $this->formatToUsername();
        if(!Other::checkUsername($this->data['username'])) {
            $this->setHttpStatus(422);
            $this->responseWithMessage(4);
            exit();
        }
        if(!$this->emailPatternCheck()) {
            $this->setHttpStatus(422);
            $this->responseWithMessage(3);
            exit();
        }
        if(!$this->uniqueEmailCheck()) {
            $this->setHttpStatus(422);
            $this->responseWithMessage(1);
            exit();
        }
        if(!$this->uniqueUsernameCheck()) {
            $this->setHttpStatus(422);
            $this->responseWithMessage(2);
            exit();
        }
        $this->generateSlug();
        if(!$this->uniqueSlugCheck()) {
            $this->setHttpStatus(422);
            $this->responseWithMessage(2);
            exit();
        }
        if(!$this->create()[0]) {
            $this->setHttpStatus(500);
            $this->responseWithMessage(5);
            exit();
        }
        if(!$this->addEmailHistory()) {
            $this->setHttpStatus(500);
            $this->responseWithMessage(5);
            exit();
        }
        $code = ConfirmEmail::insertConfirm($this->member['member_id']);
        $htmlBody = '<h1>Yorum Kutusu\'na Hoş Geldiniz</h1>Doğrulama Kodu: <b>'.$code.'</b><br/>Bağlantıyı kullanarak e-posta doğrulama alanına geçebilirsiniz <a href="http://www.yorumkutusu.com/e-posta-dogrula/'.$code.'">Tıklayınız</a>';
        $altBody = 'Doğrulama kodu: ' . $code . 'Bağlantıyı kullanarak e-posta doğrulama alanına geçebilirsiniz http://www.yorumkutusu.com/e-posta-dogrula/'.$code;
        Other::sendMail($this->member['member_email'], $this->member['member_username'], 'Hoş Geldiniz', $htmlBody, $altBody);
        $this->success();
    }
    private function formatToUsername() {
        $this->data['username'] = trim($this->data['username']);
    }
    private function emailPatternCheck() {
        return filter_var($this->data['eMail'], FILTER_VALIDATE_EMAIL);
    }
    private function uniqueEmailCheck() {
        return (Database::getRow('SELECT * FROM member WHERE member_email=? and member_deleted=0', [$this->data['eMail']]))?false:true;
    }
    private function uniqueUsernameCheck() {
        $usernameLower = Other::toLower($this->data['username']);
        return (Database::getRow('SELECT * FROM member WHERE member_username=? and member_deleted=0', [$usernameLower]))?false:true;
    }
    private function generateSlug() {
        $string = Other::toLower($this->data['username']);
        $this->memberSlug = str_replace(array_merge(array_keys(Other::DICT_TO_ASCII), [' ']),array_merge(array_values(Other::DICT_TO_ASCII), ['-']), $string);
    }
    private function uniqueSlugCheck() {
        return (Database::getRow('SELECT * FROM member WHERE member_slug=?', [$this->memberSlug]))?false:true;
    }
    private function create() {
        $query = Database::executeWithError('INSERT INTO member (member_username, member_slug, member_first_email, member_email, member_password_hash, member_restricted) VALUES (?,?,?,?,?,1)', [
            $this->data['username'],
            $this->memberSlug,
            $this->data['eMail'],
            $this->data['eMail'],
            Other::getHash($this->data['password'])
        ]);
        return $query;
    }
    private function addEmailHistory() {
        $this->member = Database::getRow('SELECT * FROM member WHERE member_username=?', [$this->data['username']]);
        $this->code = Other::generateVerificationCode();
        $query = Database::executeWithError('INSERT INTO member_email_history (member_id, member_email, code, member_confirmed_email) VALUES(?,?,?,?)', [$this->member['member_id'] ,$this->data['eMail'], $this->code, 0]);
        if(!$query[0]) {
            Database::execute('DELETE FROM member WHERE member_username=?', [$this->data['username']]);
        }
        return $query[0]?true:false;
    }
}
