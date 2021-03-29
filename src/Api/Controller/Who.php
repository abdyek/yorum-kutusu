<?php

namespace YorumKutusu\Api\Controller;
use YorumKutusu\Api\Core\Controller;
use YorumKutusu\Api\Core\Database;
use YorumKutusu\Api\Model\Admin as AdminModel;

class Who extends Controller {
    protected function post() {
        if($this->who==='guest' or $this->who==='member') {
            $this->success([
                'who'=>$this->who
            ]);
        } elseif($this->who==='admin') {
            $admin = AdminModel::get($this->userId);
            if(!$admin) {
                $this->setHttpStatus(500);
                exit();
            }
            $this->success([
                'who'=>$this->who,
                'admin'=>[
                    'id'=>$admin['admin_id'],
                    'username'=>$admin['admin_username'],
                    'email'=>$admin['admin_email'],
                    'root'=>($admin['admin_root']==='1')?true:false,
                ]
            ]);
        }
    }
}
