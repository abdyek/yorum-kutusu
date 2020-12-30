<?php

class RemoveHideComment extends Request {
    protected function post() {
        $this->availableCheck();
        $this->removeIt();
        $this->success();
    }
    private function availableCheck() {
        $this->row = Database::existCheck('SELECT * FROM hidden_comment WHERE member_id=? and comment_id=?', [USERID, $this->data['commentID']]);
        if(!$this->row) {
            $this->setHttpStatus(404);
            exit();
        }
    }
    private function removeIt() {
        Database::existCheck('DELETE FROM hidden_comment WHERE member_id=? and comment_id=?', [USERID, $this->data['commentID']]);
    }
}
