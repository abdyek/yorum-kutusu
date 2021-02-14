<?php

namespace YorumKutusu\Test;
use YorumKutusu\Test\Api\Controller\ExampleTest;

class Main {
    public function __construct() {
        $e = new ExampleTest();
        //$e->testUnit('sum');
        //$e->testUnit('multiply');
        $e->testAllUnit();
    }
}
