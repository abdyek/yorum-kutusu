<?php

class EvaluateReport extends Request {
    protected function post() {
        $reportRequest = Database::existCheck('SELECT comment_report_request_id FROM comment_report_request WHERE comment_report_request_id=?', [$this->data['reportID']]);
        if(!$reportRequest) {
            $this->setHttpStatus(404);
            exit();
        }
        $evaluated = Database::existCheck('SELECT comment_report_request_id FROM comment_report_response WHERE comment_report_request_id=?', [$this->data['reportID']]);
        if($evaluated) {
            $this->setHttpStatus(422);
            exit();
        }
        Database::execute('UPDATE comment_report_request SET report_answered=1 WHERE comment_report_request_id=?', [$this->data['reportID']]);
        Database::execute('INSERT INTO comment_report_response (admin_id, comment_report_request_id, admin_note) VALUES(?,?,?)', [USERID, $this->data['reportID'], $this->data['responseMessage']]);
        $this->success();
    }
}