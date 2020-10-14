<?php

class Report extends Request {
    protected function post() {
        if(!Database::existCheck('SELECT * FROM comment WHERE comment_id=? AND comment_deleted=0', [$this->data['commentID']])){
            $this->setHttpStatus(404);
            exit();
        }
        if(!Database::existCheck('SELECT * FROM report_option WHERE report_option_id=?', [$this->data['reportOptionID']])) {
            $this->setHttpStatus(422);
            exit();
        }
        if(Database::existCheck('SELECT * FROM comment_report_request WHERE member_id=? AND comment_id=?', [USERID, $this->data['commentID']])) {
            $this->success();
            exit();
        }
        $this->reportFunc();
    }
    private function reportFunc() {
        $query = Database::executeWithError('INSERT INTO comment_report_request (member_id, comment_id, report_option_id, report_text) VALUES (?,?,?,?)', [USERID, $this->data['commentID'], $this->data['reportOptionID'], $this->data['reportText']]);
        if(!$query[0]) {
            $this->setHttpStatus(500);
            $this->responseWithMessage(5, ['error'=>$query[1]]);
            exit();
        }
        $this->success();
    }
}