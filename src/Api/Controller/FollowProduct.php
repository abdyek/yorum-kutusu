<?php

namespace YorumKutusu\Api\Controller;
use YorumKutusu\Api\Core\Controller;
use YorumKutusu\Api\Core\Database;

class FollowProduct extends Controller {
    protected function post() {
        if(!$this->productCheck()) {
            $this->setHttpStatus(404);
            exit();
        }
        if($this->data['follow']) {
            $this->productFollow();
        } else {
            $this->productUnfollow();
        }
    }
    private function productCheck() {
        return Database::existCheck('SELECT * FROM product WHERE product_id=? AND product_deleted=0', [$this->data['productID']]);
    }
    private function productFollow() {
        $check = Database::existCheck('SELECT * FROM product_follow WHERE product_id=? AND member_id=?', [$this->data['productID'],$this->userId]);
        if($check) {
            $this->success();
            exit();
        }
        $query = Database::executeWithError('INSERT INTO product_follow (member_id, product_id) VALUES (?,?)', [$this->userId, $this->data['productID']]);
        $query2 = Database::executeWithError('INSERT INTO product_follow_history (member_id, product_id, follow_or_unfollow) VALUES (?,?,1)', [$this->userId, $this->data['productID']]);
        if(!$query[0] or !$query2[0]) {
            $this->setHttpStatus(500);
            exit();
        }
        $this->success();
    }
    private function productUnfollow() {
        $check = Database::existCheck('SELECT * FROM product_follow WHERE product_id=? AND member_id=?', [$this->data['productID'],$this->userId]);
        if(!$check) {
            $this->success();
            exit();
        }
        $query = Database::executeWithError('DELETE FROM product_follow WHERE member_id=? AND product_id=?', [$this->userId, $this->data['productID']]);
        $query2 = Database::executeWithError('INSERT INTO product_follow_history (member_id, product_id, follow_or_unfollow) VALUES (?,?,0)', [$this->userId, $this->data['productID']]);
        if(!$query[0] or !$query2[0]) {
            $this->setHttpStatus(500);
            exit();
        }
        $this->success();
    }
    protected function get() {
        if(!is_numeric($this->data['pageNumber'])) {
            $this->setHttpStatus(400);
            exit();
        }
        $this->fetchAllCommentCount();
        if($this->data['pageNumber']=="-1") {
            $this->success([
                'allCommentCount'=>$this->allCommentCount
            ]);
        } else {
            $lineCount = $this->data['pageNumber'] * 10;
            $followingProduct = Database::getRows('SELECT p.product_id, p.product_slug, p.product_name, pw.last_seen_date_time, pw.new_comment_count FROM product_follow pw INNER JOIN product p ON pw.product_id = p.product_id WHERE p.product_deleted=0 AND pw.member_id=? ORDER BY pw.new_comment_count DESC LIMIT '.$lineCount, [$this->userId]);
            $more = (Database::getRow('SELECT count(*) as c FROM product_follow WHERE member_id=?', [$this->userId])['c']>$lineCount)?true:false;
            $arr = [];
            foreach($followingProduct as $fp) {
                $arr[] = [
                    'productID'=>$fp['product_id'],
                    'productSlug'=>$fp['product_slug'],
                    'productName'=>$fp['product_name'],
                    'newComment'=>$fp['new_comment_count'],
                    'startingPage'=>$this->getStartingPage($fp['product_id'], $fp['last_seen_date_time'])
                ];
            }
            $this->success([
                'allCommentCount'=>$this->allCommentCount,
                'followProduct'=>$arr,
                'more'=>$more
            ]);
        }
    }
    private function getStartingPage($productID, $lastSeen) {
        //$numRow = Database::getRowWithErr(' SET @row_number = 0; SELECT num FROM (SELECT (@row_number:=@row_number + 1) AS num, comment_id, comment_text, member_id, comment_create_date_time FROM comment WHERE comment_deleted=0 AND product_id=? ORDER BY comment_create_date_time ASC) allcomments WHERE allcomments.comment_create_date_time > ? LIMIT 1', [$productID, $lastSeen]);
        //return ($numRow)?$numRow['num']:15;
        // böyle bir çözüm buldum ancak phpmyadmin'de çalışan sql kodları burada çalışmıyor. Performansı artırmaya yönelik ileride bu mantığın çalışan halini yapabilirsin

        $numRows = Database::getRows('SELECT comment_id, comment_create_date_time FROM comment WHERE comment_deleted=0 AND product_id=? ORDER BY comment_create_date_time ASC;', [$productID]);
        $num = 0;
        foreach($numRows as $row) {
            $num++;
            if($row['comment_create_date_time'] < $lastSeen) {
                break;
            }
        }
        return intval($num/10) + 1;
    }
    private function fetchAllCommentCount() {
        $this->allCommentCount = Database::getRow('SELECT sum(new_comment_count) as c FROM product_follow WHERE member_id=?', [$this->userId])['c'];
    }
}
