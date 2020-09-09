<?php


    class Config {
        const SITEURL = "http://localhost/yorum-kutusu/";
        const PAGEURL = [
            'urun'=>[
                'title'=>'Ürün Sayfası',
                'className'=>'product'
            ],
            'profil'=>[
                'title'=>'Profil',
                'className'=>'profile'
            ],
            'yeni-urun'=>[
                'title'=>'Yeni Ürün Oluştur',
                'className'=>'newProduct'
            ],
            'uye-ol'=>[
                'title'=>'Üye Ol',
                'className'=>'signup'
            ],
            'giris-yap'=>[
                'title'=>'Giriş Yap',
                'className'=>'login'
            ],
            'e-posta-dogrula'=>[
                'title'=>'E-Posta Doğrula',
                'className'=>'emailValidationPage'
            ],
            'filtrele'=>[
                'title'=>'Filtrele',
                'className'=>'filter'
            ]
        ];
    }

?>