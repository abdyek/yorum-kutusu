<?php

class Signup extends Request {
    protected function post() {
        $this->formatToUsername();
        if(!Other::checkUsername($this->data['username'])) {
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
        return (Database::getRow('SELECT * FROM mbmer WHERE member_slug=?', [$this->memberSlug]))?false:true;
    }
    private function create() {
        $query = Database::executeWithError('INSERT INTO member (member_username, member_slug, member_first_email, member_email, member_password_hash) VALUES (?,?,?,?,?)', [
            $this->data['username'],
            $this->memberSlug,
            $this->data['eMail'],
            $this->data['eMail'],
            Other::getHash($this->data['password'])
        ]);
        return $query;
    }
}
