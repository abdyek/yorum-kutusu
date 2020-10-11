<?php

class LikeComment extends Request {
    protected function post() {
        if(!$this->checkComment()) {
            $this->setHttpStatus(404);
            exit();
        }
        if($this->data['like']) {
            $this->commentLike();
        } else {
            $this->commentDislike();
        }
    }
    private function checkComment() {
        return Database::existCheck('SELECT * FROM comment WHERE comment_id=? AND comment_deleted=0', [$this->data['commentID']]);
    }
    private function commentLike() {
        if(Database::existCheck('SELECT * FROM comment_like WHERE member_id=? AND comment_id=?', [USERID, $this->data['commentID']])) {
            $this->success();
            exit();
        }
        $query = Database::executeWithError('INSERT INTO comment_like (member_id, comment_id) VALUES (?,?)', [USERID, $this->data['commentID']]);
        $query2 = Database::executeWithError('INSERT INTO comment_like_history (member_id, comment_id, liked_or_dislike) VALUES (?,?,1)', [USERID, $this->data['commentID']]);
        if(!$query[0] or !$query2[0]){
            $this->setHttpStatus(500);
            exit();
        }
        $this->success();
    }
    private function commentDislike() {
        if(!Database::existCheck('SELECT * FROM comment_like WHERE member_id=? AND comment_id=?', [USERID, $this->data['commentID']])) {
            $this->success();
            exit();
        }
        $query = Database::executeWithError('DELETE FROM comment_like WHERE member_id=? AND comment_id=?', [USERID, $this->data['commentID']]);
        $query2 = Database::executeWithError('INSERT INTO comment_like_history (member_id, comment_id, liked_or_dislike) VALUES (?,?,0)', [USERID, $this->data['commentID']]);
        if(!$query[0] or !$query2[0]){
            $this->setHttpStatus(500);
            exit();
        }
        $this->success();
    }
}