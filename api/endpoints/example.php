<?php

    class Example extends Request {
        protected function get() {
            echo intval(95/10);
            http_response_code(500);
        }
        protected function post() {
            $this->response([
                'type'=>'post',
                'data'=>$this->data
            ]);
        }
        protected function put() {
            $this->response([
                'type'=>'put',
                'data'=>$this->data
            ]);
        }
        protected function patch() {
            $this->response([
                'type'=>'patch',
                'data'=>$this->data
            ]);
        }
        protected function delete() {
            $this->response([
                'type'=>'delete',
                'data'=>$this->data
            ]);
        }
    }

?>
