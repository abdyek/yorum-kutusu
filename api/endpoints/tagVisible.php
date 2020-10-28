<?php

class TagVisible extends Request {
    protected function post() {
        $tag = Database::existCheck('SELECT tag_id, tag_visible FROM tag WHERE tag_id=?', [$this->data['tagID']]);
        if(!$tag) {
            $this->setHttpStatus(404);
            exit();
        }
        if($tag['tag_visible']==$this->data['tagVisible']) {
            $this->success();
            exit();
        }
        if(!Database::execute('UPDATE tag SET tag_visible=? WHERE tag_id=?', [($this->data['tagVisible'])?1:0, $this->data['tagID']])){
            $this->setHttpStatus(500);
            exit();
        }
        if(!Database::executeWithError('INSERT INTO tag_visible_history (tag_id, admin_id, visible_or_invisible, admin_note) VALUES(?,?,?,?)',[
            $tag['tag_id'],
            USERID,
            ($this->data['tagVisible'])?1:0,
            $this->data['adminNote']
        ])[0]){
            $this->setHttpStatus(500);
            exit();
        }
        $this->success();
    }
}