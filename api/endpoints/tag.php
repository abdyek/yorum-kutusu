<?php

class Tag extends Request {
    protected function get() {
        if(strlen($this->data['searchText'])) {
            $this->search();
        } else {
            $this->getAll();
        }
    }
    private function search() {
        $tags = Database::getRows('SELECT tag_id, tag_slug, tag_name FROM tag WHERE tag_name LIKE "%"?"%" AND tag_visible=1', [$this->data['searchText']]);
        $tagsInfo = [];
        foreach($tags as $tag) {
            $tagsInfo[] = [
                'tagID'=>$tag['tag_id'],
                'slug'=>$tag['tag_slug'],
                'tagName'=>$tag['tag_name'],
            ];
        }
        $this->success([
            'tags'=>$tagsInfo
        ]);
    }
    private function getAll() {
        // şimdilik bu kısım gereksiz göründü gözüme, ihtiyacım olursa doldururum
        $this->success();
    }
    protected function post() {
        // doğrudan etiket oluşturma
        if(Database::existCheck('SELECT tag_id FROM tag WHERE tag_slug=? or tag_name=?', [$this->data['tagSlug'], $this->data['tagName']])){
            $this->setHttpStatus(422);
            exit();
        }
        if(!Database::execute('INSERT INTO tag (admin_id, tag_name, tag_slug, tag_passive) VALUES(?,?,?,?)', [USERID, $this->data['tagName'], $this->data['tagSlug'], ($this->data['passive'])?1:0])){
            $this->setHttpStatus(500);
            exit();
        }
        $this->success();
    }
    protected function put() {
        $tag = Database::existCheck('SELECT tag_id, admin_id, tag_name, tag_slug, tag_passive FROM tag WHERE tag_id=?', [$this->data['tagID']]);
        if(!$tag) {
            $this->setHttpStatus(404);
            exit();
        }
        if(Database::existCheck('SELECT tag_id FROM tag WHERE tag_name=? AND tag_slug=? AND tag_passive=?', [$this->data['tagName'], $this->data['tagSlug'], ($this->data['passive'])?1:0])){
            // aynıysa success ver geç
            $this->success();
            exit();
        }
        if(!Database::execute('INSERT INTO tag_change_history (tag_id, admin_id, tag_old_name, tag_old_slug, tag_passive) VALUES(?,?,?,?,?)',[
            $tag['tag_id'],
            $tag['admin_id'],
            $tag['tag_name'],
            $tag['tag_slug'],
            $tag['tag_passive']
        ])) {
            $this->setHttpStatus(500);
            exit();
        }
        if(!Database::execute('UPDATE tag SET tag_name=?, tag_slug=?, tag_passive=? WHERE tag_id=?', [
            $this->data['tagName'],
            $this->data['tagSlug'],
            ($this->data['passive'])?1:0,
            $this->data['tagID']
        ])) {
            $this->setHttpStatus(500);
            exit();
        }
        $this->success();
    }

}