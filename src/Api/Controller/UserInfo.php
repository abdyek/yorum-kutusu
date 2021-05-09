<?php

namespace YorumKutusu\Api\Controller;
use YorumKutusu\Api\Core\Controller;
use YorumKutusu\Api\Model\Admin as AdminModel;
use YorumKutusu\Api\Model\Member as MemberModel;

class UserInfo extends Controller {
    protected function get() {
        $info = null;
        if($this->who==='member') {
            $member = MemberModel::get($this->userId);
            $info = [
                'userId'=>$member['member_id'],
                'username'=>$member['member_username'],
                'slug'=>$member['member_slug'],
                'unreadComments'=>0     // şimdilik böyle bırakıyorum, model ve veri tabanı katmanını ayırınca daha güzel olacak buralar
            ];
        } elseif($this->who==='admin') {
            $admin = AdminModel::get($this->userId);
            $info = [
                'id'=>$admin['admin_id'],
                'username'=>$admin['admin_username'],
                'email'=>$admin['admin_email'],
                'root'=>($admin['admin_root']==='1')?true:false,
            ];
        }
        $this->success([
            'who'=>$this->who,
            'info'=>$info
        ]);
    }
}
