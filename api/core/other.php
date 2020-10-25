<?php

class Other {
    const TURKISH_LOW = ['ö', 'ç', 'ş', 'ı', 'ğ', 'ü'];
    const TURKISH_UPP = ['Ö', 'Ç', 'Ş', 'İ', 'Ğ', 'Ü'];
    const DICT_TO_ASCII = [
        'ö'=>'o',
        'ç'=>'c',
        'ş'=>'s',
        'ı'=>'i',
        'ğ'=>'g',
        'ü'=>'u'
    ];
    public function checkUsername($username) {
        preg_match_all("/[a-zA-Z0-9öçşığüÖÇŞİĞÜ ]+/", $username, $out, PREG_PATTERN_ORDER);
        if(count($out[0])!=1){
            return false;
        }
        // yanyana iki tane boşluk karakteri gelmemesi için şimdilik böyle bir kontrol yapıyorum
        $counter = 0;
        $chars = str_split($username);
        foreach($chars as $charr) {
            if($charr===" ") {
                $counter += 1;
            } else {
                $counter = 0;
            }
            if($counter==2) {
                return false;
            }
        }
        return true;
    }
    public function toLower($str) {
        return strtolower(str_replace(self::TURKISH_UPP, self::TURKISH_LOW, $str));
    }
    public function getHash($str) {
        return password_hash($str, PASSWORD_DEFAULT);
    }
    public function getCurrentDateTime() {
        return date('Y-m-d H:i:s', time());
    }
    public function generateVerificationCode() {
        return random_int(100000,999999);
    }
    public function generateRandomString($size) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $randomString = '';
      
        for ($i = 0; $i < $size; $i++) {
            $index = rand(0, strlen($characters) - 1);
            $randomString .= $characters[$index];
        }
      
        return $randomString;
    }
    public function sendMail(){
        // mail gönderme fonksiyonu buraya yazılacak
    }
    public function generateSlug($string) {
        $arr = explode(' ', $string);
        $string = '';
        foreach($arr as $str){
            if(empty($str)) {
                continue;
            }
            $string .= ' '.trim($str);
        }
        $string = trim($string);
        $string = self::toLower($string);
        return str_replace(array_merge(array_keys(Other::DICT_TO_ASCII), [' ']),array_merge(array_values(Other::DICT_TO_ASCII), ['-']), $string);
    }
}