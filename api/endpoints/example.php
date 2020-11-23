<?php

    class Example extends Request {
        protected function get() {
            $this->response([
                'type'=>'get',
                'data'=>$this->data
            ]);
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
