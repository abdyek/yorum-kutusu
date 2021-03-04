<?php

namespace YorumKutusu\Api\Controller;
use YorumKutusu\Api\Core\Controller;
use YorumKutusu\Api\Core\Database;
use YorumKutusu\Api\Model\Product;

class CommentCRUD extends Controller {
    protected function delete() {
        // ^ NOT COMPLETED
        $this->comment = Database::existCheck('SELECT comment_id, product_id, member_id FROM comment WHERE comment_deleted=0 AND comment_id=?', [$this->data['commentID']]);
        if(!$this->comment) {
            $this->setHttpStatus(404);
            exit();
        }
        $this->deleteComment();
        $this->addHistory();
        $this->removeCommentRequest();
        $this->removeRating();
        $this->removeHiddenComment();
        $this->decreaseNewCommentCount();
        Product::decreaseCommentCount($this->comment['product_id']);
        $this->success();
    }
    private function deleteComment() {
        Database::executeWithErr('UPDATE comment SET comment_deleted=1 WHERE comment_id=?', [$this->data['commentID']]);
    }
    private function addHistory() {
        Database::executeWithErr('INSERT INTO comment_delete_history (comment_id, admin_id) VALUES(?,?)', [$this->data['commentID'],$this->userId]);
    }
    private function removeCommentRequest() {
        Database::executeWithErr('UPDATE comment_request SET cancelled=1 WHERE member_id=? AND product_id=?', [$this->comment['member_id'], $this->comment['product_id']]);
    }
    private function removeRating() {
        // not completed
    }
    private function removeHiddenComment() {
        // not completed
    }
    private function decreaseNewCommentCount() {
        // not completed
    }
}
