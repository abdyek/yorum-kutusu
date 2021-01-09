<?php

namespace YorumKutusu\Test;
use YorumKutusu\Test\Core\UnitTest;
use YorumKutusu\Api\Config\Config;
use YorumKutusu\Test\Config\Cases;

class Main {
    public function __construct() {
        $cases = new Cases;
        //print_r($cases->obj);
        //exit();
        $unit = new UnitTest(Config::ENDPOINT, $cases->obj);
        $unit->testAll();
    }
}
