<?php

namespace YorumKutusu\Api\Core;
use YorumKutusu\Api\Core\Session;
use YorumKutusu\Api\Config\Config;
use Ahc\Jwt\JWT;

abstract class Controller {
    public function __construct($requestMethod=null, $who=null, $data=null) {
        $this->setConfig($requestMethod);
        $this->detectUser($who);
        $this->checkMethod();
        $this->checkAuthorization();
        $this->setData($data);
        $this->checkAdminActive($who);
        $this->checkKeys();
        ($this->run)();
    }
    private function setConfig($requestMethod) {
        $this->requestMethod = ($requestMethod)?$requestMethod: $_SERVER['REQUEST_METHOD'];
        $cls = explode('\\', get_class($this));
        $this->className = lcfirst(end($cls));
        $this->methods = Config::ENDPOINT[$this->className]['methods'];
        $this->authorization = Config::ENDPOINT[$this->className]['authorization'];
        $this->keys = Config::ENDPOINT[$this->className]['keys'];
    }
    private function setData($data) {
        if($data) {
            $this->data = $data;
            $this->run = function() {};
            return true;
        }
        switch($this->requestMethod) {
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
    private function detectUser($who) {
        if($who) {
            $this->who = $who;
            return true;
        }
        if(isset($_COOKIE['jwt'])) {
            try {
                $payload = (new JWT('secret', 'HS512',Config::JWT_EXP))->decode($_COOKIE['jwt']);
            } catch(Exception $e) {
                if(isset($_COOKIE['jwt'])){
                    unset($_COOKIE['jwt']);
                    setcookie('jwt',null, -1);
                }
            }
            if(isset($payload['userid'])) {
                $this->userId = $payload['userid'];
            }
            if(isset($payload['who'])) {
                $this->who = $payload['who'];
            } else {
                $this->who = 'guest';
            }
        } else {
            $this->who = 'guest';
        }
    }
    private function checkAuthorization() {
        if(!in_array($this->who, $this->authorization[$this->requestMethod])) {
            http_response_code(403);
            exit();
        }
    }
    private function checkMethod() {
        if(!in_array($this->requestMethod, $this->methods)) {
            http_response_code(405);
            exit();
        }
    }
    private function checkAdminActive($who) {
        if($who=='admin') {
            return true;
        }
        if($this->who=='admin' and Database::getRow('SELECT admin_inactive FROM admin WHERE admin_id=?', [$this->userId])['admin_inactive']) {
            $this->setHttpStatus(403);
            if(isset($_COOKIE['jwt'])){
                unset($_COOKIE['jwt']);
                setcookie('jwt',null, -1);
            }
            exit();
        }
    }
    private function checkKeys() {
        $this->checkKey($this->keys[$this->requestMethod], $this->data);
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
                if(is_array($data[$key])) {
                    $len = function($p) {
                        return count($p);
                    };
                } else {
                    $len = function($p) {
                        return strlen($p);
                    };
                }
                if(($len)($data[$key]) < $value['min'] or ($len)($data[$key]) > $value['max']){
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
