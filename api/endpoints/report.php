<?php

class Report extends Request {
    protected function post() {
        if(!Database::existCheck('SELECT * FROM comment WHERE comment_id=? AND comment_deleted=0', [$this->data['commentID']])){
            $this->setHttpStatus(404);
            $this->responseWithMessage(10);
            exit();
        }
        if(!Database::existCheck('SELECT * FROM report_option WHERE report_option_id=?', [$this->data['reportOptionID']])) {
            $this->setHttpStatus(404);
            $this->responseWithMessage(11);
            exit();
        }
        if(Database::existCheck('SELECT * FROM comment_report_request WHERE member_id=? AND comment_id=? AND report_answered=0', [USERID, $this->data['commentID']])) {
            $this->setHttpStatus(422);
            exit();
        }
        $this->reportFunc();
        $this->hideComment();
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
    private function hideComment() {
        if(!$this->data['hide']){
            return;
        }
        $crrID = Database::getRow('SELECT comment_report_request_id FROM comment_report_request WHERE comment_id=? AND member_id=?', [$this->data['commentID'], USERID])['comment_report_request_id'];
        Database::execute('INSERT INTO hidden_comment (comment_id, member_id, comment_report_request_id) VALUES(?,?,?)', [$this->data['commentID'], USERID, $crrID]);
    }
    protected function get() {
        $request = Database::getRows('SELECT * FROM comment_report_request crr INNER JOIN comment c ON crr.comment_id=c.comment_id INNER JOIN report_option ro ON crr.report_option_id = ro.report_option_id WHERE report_answered=0');
        $this->reports = [];
        foreach($request as $req) {
            $this->reports[] = [
                'memberID'=>$req['member_id'],
                'commentID'=>$req['comment_id'],
                'commentText'=>$req['comment_text'],
                'reportOptionID'=>$req['report_option_id'],
                'reportOption'=>$req['report_option_name'],
                'reportText'=>$req['report_text'],
                'reportDateTime'=>$req['report_date_time']
            ];
        }
        $this->success(['reports'=>$this->reports]);
    }
}
