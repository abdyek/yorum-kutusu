<?php

namespace YorumKutusu\Api\Controller;
use YorumKutusu\Api\Core\Controller;
use YorumKutusu\Api\Core\Database;
use YorumKutusu\Api\Model\Product as ProductModel;
use YorumKutusu\Api\Model\Comment as CommentModel;

class CommentCRUD extends Controller {
    protected function delete() {
        $this->comment = Database::existCheck('SELECT * FROM comment WHERE comment_deleted=0 AND comment_id=?', [$this->data['commentID']]);
        if(!$this->comment) {
            $this->setHttpStatus(404);
            exit();
        }
        $this->deleteComment();
        $this->addHistory();
        $this->removeCommentRequest();
        CommentModel::removeRating($this->comment['product_id'], $this->comment['member_id']);
        CommentModel::removeHiddenComment($this->comment['comment_id']);
        ProductModel::decreaseCommentCount($this->comment['product_id']);
        CommentModel::decreaseNewCommentCount($this->comment['product_id'], $this->comment['comment_last_edit_date_time']);
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
}
