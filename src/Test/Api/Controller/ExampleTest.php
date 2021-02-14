<?php

namespace YorumKutusu\Test\Api\Controller;
use YorumKutusu\Test\Api\Core\UnitTest;

class ExampleTest extends UnitTest {
    public function sumTest() {
        $num1 = 12;
        $num2 = 13;
        if($this->runMethod([$num1, $num2])==25) {
            $this->success();
        } else {
            $this->fail('toplamlari ayni değil');
        }
    }
}


