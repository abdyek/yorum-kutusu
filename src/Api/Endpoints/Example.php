<?php

namespace YorumKutusu\Api\Endpoints;
use YorumKutusu\Api\Core\Request;
use YorumKutusu\Api\Core\Database;

class Example extends Request {
    protected function post() {
        //$this->method1();
        //$this->method2();
    }
    private function method1() {
        //echo 'method1 kullanıldı<br>';
        return 15;
    }
    private function method2() {
        //echo 'method2 kullanıldı<br>';
        $this->studentName = "hüseyin";
    }
    private function method3($sayi1, $sayi2) {
        return $sayi1 + $sayi2;
    }
    private function method4($sayi1, $sayi2) {
        $this->result = $sayi1 + $sayi2;
    }
    private function method5($n) {
        $arr = [];
        for($i=1;$i<=$n;$i++) {
            $arr[] = $i;
        }
        return $arr;
    }
    private function method6($a, $b) {
        return $a==$b;
    }
}

