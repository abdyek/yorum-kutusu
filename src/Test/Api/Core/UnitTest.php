<?php

namespace YorumKutusu\Test\Api\Core;
use \ReflectionClass as ReflectionClass;
use \ReflectionMethod as ReflectionMethod;

class UnitTest {
    public function __construct() {
        $this->setClassName();
        $this->generateControlClass();
        $this->detectControllerMethods();
        $this->detectMethods();
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
        $this->controllerMethods = [];
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
    public function testUnit($unitName) {
        $func = $unitName . 'Test';
        $cls = 'YorumKutusu\Api\Controller\\'.$this->className;
        $refMet = $this->ref->getMethod($unitName);
        $refMet->setAccessible(true);
        $refMet->invoke(new $cls($requestMethod='GET', $who='admin', $data=['a'=>'b']));
    }
}
