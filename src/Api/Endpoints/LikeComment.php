<?php

namespace YorumKutusu\Api\Endpoints;
use YorumKutusu\Api\Core\Request;
use YorumKutusu\Api\Core\Database;

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
    private function successWithCount() {
        $count = Database::getRow('SELECT comment_like_count FROM comment WHERE comment_id=?', [$this->data['commentID']])['comment_like_count'];
        $this->success([
            'count'=> $count
        ]);
    }
    private function commentLike() {
        if(Database::existCheck('SELECT * FROM comment_like WHERE member_id=? AND comment_id=?', [$this->userId, $this->data['commentID']])) {
            $this->successWithCount();
            exit();
        }
        $query = Database::executeWithError('INSERT INTO comment_like (member_id, comment_id) VALUES (?,?)', [$this->userId, $this->data['commentID']]);
        $query2 = Database::executeWithError('INSERT INTO comment_like_history (member_id, comment_id, liked_or_dislike) VALUES (?,?,1)', [$this->userId, $this->data['commentID']]);
        $query3 = Database::executeWithError('UPDATE comment SET comment_like_count=comment_like_count+1 WHERE comment_id=?', [$this->data['commentID']]);
        if(!$query[0] or !$query2[0] or !$query3[0]){
            $this->setHttpStatus(500);
            exit();
        }
        $this->successWithCount();
    }
    private function commentDislike() {
        if(!Database::existCheck('SELECT * FROM comment_like WHERE member_id=? AND comment_id=?', [$this->userId, $this->data['commentID']])) {
            $this->successWithCount();
            exit();
        }
        $query = Database::executeWithError('DELETE FROM comment_like WHERE member_id=? AND comment_id=?', [$this->userId, $this->data['commentID']]);
        $query2 = Database::executeWithError('INSERT INTO comment_like_history (member_id, comment_id, liked_or_dislike) VALUES (?,?,0)', [$this->userId, $this->data['commentID']]);
        $query3 = Database::executeWithError('UPDATE comment SET comment_like_count=comment_like_count-1 WHERE comment_id=?', [$this->data['commentID']]);
        if(!$query[0] or !$query2[0] or !$query3[0]){
            $this->setHttpStatus(500);
            exit();
        }
        $this->successWithCount();
    }
}
