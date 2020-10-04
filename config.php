<?php


    class Config {
        const DBNAME = 'yorum-kutusu-2';
        const DBID = 'root';
        const DBPW = '';
        const SITEURL = "http://localhost/yorum-kutusu/";
        const PAGEURL = [
            'ana-sayfa'=>[
                'title'=>'Ana Sayfa',
                'content'=>'index'
            ],
            'urun'=>[
                'title'=>'Ürün',
                'content'=>'product'
            ],
            'profil'=>[
                'title'=>'Profil',
                'content'=>'profile'
            ],
            'yeni-urun'=>[
                'title'=>'Yeni Ürün Oluştur',
                'content'=>'newProduct'
            ],
            'uye-ol'=>[
                'title'=>'Üye Ol',
                'content'=>'signup'
            ],
            'giris-yap'=>[
                'title'=>'Giriş Yap',
                'content'=>'login'
            ],
            'e-posta-dogrula'=>[
                'title'=>'E-Posta Doğrula',
                'content'=>'emailValidationPage'
            ],
            'filtrele'=>[
                'title'=>'Filtrele',
                'content'=>'filter'
            ]
        ];
        const ENDPOINT = [
            'example'=>[
                'methods'=>['POST', 'GET', 'PUT', 'PATCH', 'DELETE'],
                'authorization'=>['admin', 'guest', 'member'],
                'keys'=>[
                    'member_id'=>[
                        'falan'=>[
                            'min'=>3,
                            'max'=>4
                        ]
                    ],
                    'product_id'=>[
                        'min'=>0,
                        'max'=>11
                    ]
                ]
            ]
        ];
    }

?>