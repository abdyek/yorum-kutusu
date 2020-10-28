<?php

class Tag extends RequestForAdmin {
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

}