<?php

namespace YorumKutusu\Api\Controller;
use YorumKutusu\Api\Core\Controller;
use YorumKutusu\Api\Core\Database;

class Admin extends Controller{
    protected function post() {
        if(!$this->checkRoot()) {
            $this->setHttpStatus(403);
            exit();
        }
        if($this->data['memberID']==null and $this->data['adminUsername'] and $this->data['adminEMail']) {
            if(!Other::emailPatternCheck($this->data['adminEMail']) or !Other::checkUsername($this->data['adminUsername'])) {
                $this->setHttpStatus(400);
                exit();
            }
            if(!$this->uniqueCheck($this->data['adminUsername'], $this->data['adminEMail'])) {
                $this->setHttpStatus(422);
                exit();
            }
            $args = [
                'adminUsername'=> $this->data['adminUsername'],
                'adminEMail'=>$this->data['adminEMail'],
                'historySql'=>'INSERT INTO admin_making_history (maker_admin_id, admin_note, admin_id) VALUES(?,?,?)',
                'historyArg'=>[$this->userId, $this->data['adminNote']]
            ];
        } elseif($this->data['memberID'] and $this->data['adminUsername']==null and $this->data['adminEMail']==null) {
            $this->member = Database::existCheck('SELECT * FROM member WHERE member_id=?', [$this->data['memberID']]);
            if(!$this->member) {
                $this->setHttpStatus(404);
                exit();
            }
            if(!$this->uniqueCheck($this->member['member_username'], $this->member['member_email'], true)) {
                $this->setHttpStatus(422);
                exit();
            }
            $args = [
                'adminUsername'=>$this->member['member_username'],
                'adminEMail'=>$this->member['member_email'],
                'historySql'=>'INSERT INTO admin_making_history (maker_admin_id, member_id, admin_note, admin_id) VALUES(?,?,?,?)',
                'historyArg'=>[$this->userId, $this->member['member_id'], $this->data['adminNote']]
            ];
        } else {
            $this->setHttpStatus(400);
            exit();
        }
        $this->writeDB($args);
        Other::sendMail();
        $this->success();
    }
    private function checkRoot() {
        return (Database::execute('SELECT admin_id FROM admin WHERE admin_id=? AND admin_root=1', [$this->userId]))?true:false;
    }
    private function uniqueCheck($username, $eMail, $fromMember=false) {
        if($fromMember==false) {
            $inMember = (Database::getRow('SELECT member_id FROM member WHERE member_username=? or member_email=?', [$username, $eMail]))?false:true;
        } else {
            $inMember = true;
        }
        return $inMember and (Database::getRow('SELECT admin_id FROM admin WHERE admin_username=? or admin_email=?', [$username, $eMail]))?false:true;
    }
    private function writeDB($arr){
        $this->randomPassword =  Other::generateRandomString(10);
        Database::execute('INSERT INTO admin (admin_username, admin_email, admin_password_hash) VALUES (?,?,?)', [$arr['adminUsername'], $arr['adminEMail'], Other::getHash($this->randomPassword)]);
        $arr['historyArg'][] = Database::getRow('SELECT admin_id FROM admin WHERE admin_username=?',[$arr['adminUsername']])['admin_id'];
        Database::execute($arr['historySql'], $arr['historyArg']);
    }
    protected function patch() {
        if(!$this->checkRoot()) {
            $this->setHttpStatus(403);
            exit();
        }
        $admin = Database::existCheck('SELECT admin_id, admin_inactive FROM admin WHERE admin_id=? AND admin_root=0', [$this->data['adminID']]);
        if(!$admin) {
            $this->setHttpStatus(404);
            exit();
        }
        $inactive = ($this->data['active'])?0:1;
        $active = ($inactive)?0:1;
        if($admin['admin_inactive']==$inactive) {
            $this->success();
            exit();
        }
        Database::execute('UPDATE admin SET admin_inactive=? WHERE admin_id=?', [$inactive, $this->data['adminID']]);
        Database::execute('INSERT INTO admin_inactive_history (subject_admin_id, admin_id, active, admin_note) VALUES(?,?,?,?)', [$this->userId, $this->data['adminID'], $active, $this->data['adminNote']]);
        $this->success();
    }
}
