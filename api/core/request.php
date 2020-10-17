<?php

abstract class Request {
    public function __construct() {
        $this->setConfig();
        $this->checkAuthorization();
        $this->checkMethod();
        $this->setData();
        $this->checkKeys();
        //$this->checkKey($this->keys, $this->data);
        ($this->run)();
    }
    private function setData() {
        switch($_SERVER['REQUEST_METHOD']) {
            case 'POST':
                $this->data = (empty($_POST))?json_decode(file_get_contents('php://input'), true):$_POST;
                $this->run = function() { $this->post(); };
                break;
            case 'GET':
                $this->data = (empty($_GET))?json_decode(file_get_contents('php://input'), true):$_GET;
                $this->run = function() { $this->get(); };
                break;
            case 'PUT':
                $this->data = (empty($_PUT))?json_decode(file_get_contents('php://input'), true):$_PUT;
                $this->run = function() { $this->put(); };
                break;
            case 'PATCH':
                $this->data = (empty($_PATCH))?json_decode(file_get_contents('php://input'), true):$_PUT;
                $this->run = function() { $this->patch(); };
                break;
            case 'DELETE':
                $this->data = (empty($_DELETE))?json_decode(file_get_contents('php://input'), true):$_DELETE;
                $this->run = function() { $this->delete(); };
                break;
            default:
                break;
        }
    }
    private function setConfig() {
        //$this->className = Config::ENDPOINT[lcfirst(get_class($this))];
        $this->className = lcfirst(get_class($this));
        $this->methods = Config::ENDPOINT[$this->className]['methods'];
        $this->authorization = Config::ENDPOINT[$this->className]['authorization'];
        $this->keys = Config::ENDPOINT[$this->className]['keys'];
    }
    private function checkAuthorization() {
        if(!in_array(WHO, $this->authorization[$_SERVER['REQUEST_METHOD']])) {
            http_response_code(403);
            exit();
        }
    }
    private function checkMethod() {
        if(!in_array($_SERVER['REQUEST_METHOD'], $this->methods)) {
            http_response_code(405);
            exit();
        }
    }
    private function checkKeys() {
        $this->checkKey($this->keys[$_SERVER['REQUEST_METHOD']], $this->data);
    }
    private function checkKey($keys,$data) {
        if($data==null and $keys!=null) {
            // datanın hiç gelmeme ihtimaline karşı
            http_response_code(400);
            exit();
        }
        foreach($keys as $key=>$value) {
            if(!array_key_exists($key, $data)) {
                // ^ bu kontrol key'in gelen data içerisinde hiç olmama ihtimaline karşı
                http_response_code(400);
                exit();
            }
            if(isset($value['min']) and isset($value['max'])) {
                if(strlen($data[$key]) < $value['min'] or strlen($data[$key]) > $value['max']){
                    http_response_code(400);
                    exit();
                }
            } else {
                $this->checkKey($value, $data[$key]);
            }
        }
    }
    protected function response($data) {
        header("Access-Control-Allow-Origin: *");
        header("Content-Type: application/json; charset=UTF-8");
        echo json_encode($data);
    }
    protected function responseWithMessage($messageCode, $other=null) {
        $response = [
            'code'=>$messageCode,
            'message'=>Config::MESSAGE[$messageCode]
        ];
        if($other) {
            $response['other']=$other;
        }
        $this->response($response);
    }
    protected function setHttpStatus($code) {
        http_response_code($code);
    }
    protected function success($other=null) {
        http_response_code(200);
        $this->responseWithMessage(6, $other);
    }
}