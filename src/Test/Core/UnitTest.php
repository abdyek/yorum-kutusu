<?php

namespace YorumKutusu\Test\Core;
use \ReflectionClass as ReflectionClass;

class UnitTest {
    public function __construct($config, $cases) {
        $this->config = $config;
        $this->cases = $cases;
        $this->units = array_keys($this->cases);
    }
    public function testAll() {
        foreach($this->config as $key=>$value) {
            if(in_array($key, $this->units)) {
                $this->runTestClass($key);
            } else {
                $this->notFound($key);
            }
        }
    }
    private function runTestClass($unitName) {
        //echo $unitName . ' will be test<br>';
        $clsName = ucfirst($unitName);
        $cls = 'YorumKutusu\Api\Endpoints\\' . $clsName;
        //$class = new $cls($cases[$unitName]);
        foreach($this->cases[$unitName] as $case) {
            $this->runTestMethod($clsName, $cls, $case);
        }
    }
    private function runTestMethod($clsName, $cls, $case) {
        //echo $case['functionName'] . ' - ' . $case['method'] . '<br>';
        $obj = new $cls($case);
        $ref = new ReflectionClass($cls);
        $func = $ref->getMethod($case['functionName']);
        $func->setAccessible(true);
        $parameters = (isset($case['data']['parameters']))?$case['data']['parameters']:[];
        if($case['data']['type']=='return') {
            $value = $func->invokeArgs($obj, $parameters);
            
        } elseif($case['data']['type']=='attribute') {
            $func->invokeArgs($obj, $parameters);
            $attr = $case['data']['attributeName'];
            $value = $obj->$attr;
        }
        if(is_callable($case['data']['value'])) {
            $valueInCase = ($case['data']['value'])($case['data']['parameters']);
        } else {
            $valueInCase = $case['data']['value'];
        }
        if($valueInCase==$value) {
            $this->message([
                'class'=>$clsName,
                'method'=>$case['functionName'],
                'state'=>'success'
            ]);
        } else {
            $this->message([
                'class'=>$clsName,
                'method'=>$case['functionName'],
                'state'=>'fail'
            ]);
        }
    }
    private function message($obj) {
        echo 'class name: ' . $obj['class'] . ', functionName: ' . $obj['method'] . ', state: ' . $obj['state'] . '<br>';
    }
    private function notFound($unitName) {
        echo 'not found ' . $unitName . ' cases<br>';
    }
}
