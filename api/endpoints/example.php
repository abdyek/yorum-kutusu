<?php

    class Example extends Request {
        protected function get() {
            //$this->response($this->data);
            $code = random_int(100000,999999);
            echo $code;
        }
        protected function post() {
            $this->response($this->data);
        }
        protected function put() {
            $this->response($this->data);
        }
        protected function patch() {
            $this->response($this->data);
        }
        protected function delete() {
            $this->response($this->data);
        }
    }

?>