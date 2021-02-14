<?php

namespace YorumKutusu\Api\Controller;
use YorumKutusu\Api\Core\Controller;
use YorumKutusu\Api\Core\Database;

class Example extends Controller {
    protected function post() {
        $this->success();
    }
    private function sum($sayi1, $sayi2) {
        return $sayi1+$sayi2;
    }
    private function multiply($sayi1, $sayi2) {
        return $sayi1 * $sayi2;
    }
}

