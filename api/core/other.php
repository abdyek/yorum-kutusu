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
}