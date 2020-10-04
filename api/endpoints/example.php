<?php

    class Example extends Request {
        protected function get() {
            $this->response($this->data);
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