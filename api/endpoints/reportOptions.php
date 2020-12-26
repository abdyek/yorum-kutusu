<?php

class ReportOptions extends Request {
    protected function get() {
        $reports = Database::getRows('SELECT * FROM report_option');
        $reportsArr = [];
        foreach($reports as $rep) {
            $reportsArr[] = [
                'id'=>$rep['report_option_id'],
                'optionName'=>$rep['report_option_name']
            ];
        }
        $this->success(['reportOptions'=>$reportsArr]);
    }
}
