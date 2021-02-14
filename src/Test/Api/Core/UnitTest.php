<?php

namespace YorumKutusu\Test\Api\Core;
use \ReflectionClass as ReflectionClass;
use \ReflectionMethod as ReflectionMethod;

class UnitTest {
    public function __construct() {
        $this->setConfigEtc();
    }
    private function setConfigEtc() {
        $this->setClassName();
        $this->generateControlClass();
        $this->detectControllerMethods();
        $this->detectMethods();
        $this->setTestMethods();
    }
    private function setClassName() {
        $raw = get_class($this);
        $raw = explode('\\', $raw);
        $raw = end($raw);
        $this->className = substr($raw, 0, -4);
    }
    private function generateControlClass() {
        $cls = 'YorumKutusu\Api\Controller\\' . $this->className;
        $this->ref = new ReflectionClass($cls);
    }
    private function detectControllerMethods() {
        $this->controllerMethods = ['post', 'get', 'put', 'patch', 'delete'];
        $cls = 'YorumKutusu\Api\Core\Controller';
        $ref = new ReflectionClass($cls);
        foreach($ref->getMethods() as $met) {
            $this->controllerMethods[] = $met->name;
        }
    }
    private function detectMethods() {
        $this->methods = [];
        foreach($this->ref->getMethods() as $met) {
            if(!in_array($met->name, $this->controllerMethods)) {
                $this->methods[] = $met->name;
            }
        }
    }
    private function setTestMethods() {
        $this->testMethods = get_class_methods($this);
    }
    // ** public ** //
    public function testUnit($unitName) {
        $this->unitName = $unitName;
        if(in_array($unitName . 'Test', $this->testMethods)) {
            $func = $this->unitName . 'Test';
            $this->$func();
        } else {
            $this->notFound();
        }
    }
    public function testAllUnit() {
        foreach($this->methods as $met) {
            $this->testUnit($met);
        }
    }
    // ^^ public ^^ //
    protected function runMethod($args=[]) {
        $cls = 'YorumKutusu\Api\Controller\\'.$this->className;
        $refMet = $this->ref->getMethod($this->unitName);
        $refMet->setAccessible(true);
        return $refMet->invokeArgs(new $cls($requestMethod='GET', $who='admin', $data=['a'=>'b']), $args);
    }
    protected function message($obj) {
        echo '<p style="color:#eee; background-color:'.$obj['color'].'">' . $obj['message'] . '</p>';
    }
    protected function success() {
        $messageText = $this->unitName . ' - success';
        $this->message(['color'=>'green', 'message'=>$messageText]);
    }
    protected function fail($detail='') {
        $messageText = $this->unitName . ' - fail - ' . $detail;
        $this->message(['color'=>'red', 'message'=>$messageText]);
    }
    protected function notFound() {
        $messageText = $this->unitName.'Test'. ' - not found';
        $this->message(['color'=>'orange', 'message'=>$messageText]);
    }
}
