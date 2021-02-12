<?php

namespace YorumKutusu\Api\Controller;
use YorumKutusu\Api\Core\Controller;
use YorumKutusu\Api\Core\Database;

class Example extends Controller {
    private function sum(/*$sayi1, $sayi2*/) {
        //return $sayi1+$sayi2;
        echo 'sum ';
    }
    protected function get() {
        echo 'get \'in de çalışması lazım';
    }
}

