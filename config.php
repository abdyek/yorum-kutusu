<?php


    class Config {
        const DBNAME = 'yorum-kutusu';
        const DBID = 'root';
        const DBPW = '';
        const SITEURL = "http://localhost/yorum-kutusu/";
        const JWT_EXP = 31536000; // 1 yıllık token geçerliliği
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
        const MESSAGE = [
            1=>'Bu e-posta ile daha önceden hesap alınmış',
            2=>'Bu kullanıcı adı kullanılamıyor',
            3=>'Geçersiz e-posta',
            4=>'Geçersiz kullanıcı adı',
            5=>'Beklenmedik veri tabanı hatası',
            6=>'success',
        ];
        const ENDPOINT = [
            'example'=>[
                'methods'=>['POST', 'GET', 'PUT', 'PATCH', 'DELETE'],
                'authorization'=>['admin', 'guest', 'member'],
                'keys'=>[
                    'POST'=>[
                        'a'=>[
                            'b'=>[
                                'min'=>3,
                                'max'=>4
                            ],
                            'c'=>[
                                'c_1'=>[
                                    'min'=>0,
                                    'max'=>10
                                ],
                                'c_2'=>[
                                    'min'=>0,
                                    'max'=>10
                                ],
                            ],
                            'd'=>[
                                'min'=>3,
                                'max'=>3
                            ],
                        ],
                        'g'=>[
                            'min'=>0,
                            'max'=>11
                        ]
                    ],
                    'GET'=>[],
                    'PUT'=>[],
                    'PATCH'=>[],
                    'DELETE'=>[]
                ],
            ],
            'login'=>[
                'methods'=>['POST'],
                'authorization'=>['guest'],
                'keys'=>[
                    'POST'=>[
                        'email'=>[
                            'min'=>0,
                            'max'=>1000
                        ],
                        'password'=>[
                            'min'=>0,
                            'max'=>1000
                        ]
                    ]
                ]
            ],
            'logout'=>[
                'methods'=>['POST'],
                'authorization'=>['member', 'admin'],
                'keys'=>[
                    'POST'=>[]
                ]
            ],
            'signup'=>[
                'methods'=>['POST'],
                'authorization'=>['guest'],
                'keys'=>[
                    'POST'=>[
                        'eMail'=>[
                            'min'=>1,
                            'max'=>60
                        ],
                        'username'=>[
                            'min'=>1,
                            'max'=>60
                        ],
                        'password'=>[
                            'min'=>10,
                            'max'=>40
                        ]
                    ]
                ]
            ],
            'product'=>[
                'methods'=>['GET'],
                'authorization'=>['guest', 'member', 'admin'],
                'keys'=>[
                    'GET'=>[
                        /* bunu zorunlu yapmıyorum çünkü kullanıcı üye olmayabilir de
                        'memberID'=>[
                            'min'=>1,
                            'max'=>11
                        ],
                        */
                        'productID'=>[
                            'min'=>1,
                            'max'=>11
                        ],
                        'sortBy'=>[
                            'min'=>4,
                            'max'=>4
                        ],
                        'pageNumber'=>[
                            'min'=>1,
                            'max'=>11
                        ]
                    ]
                ]
            ],
            'tag'=>[
                'methods'=>['GET'],
                'authorization'=>['guest', 'member', 'admin'],
                'keys'=>[
                    'GET'=>[
                        'searchText'=>[
                            'min'=>0,
                            'max'=>100
                        ]
                    ]
                ]
            ],
            'member'=>[
                'methods'=>['GET'],
                'authorization'=>['member', 'admin'],
                'keys'=>[
                    'GET'=>[
                        'memberID'=>[
                            'min'=>1,
                            'max'=>11
                        ]
                    ]
                ]
            ],
            'comment'=>[
                'methods'=>['POST'],
                'authorization'=>['member'],
                'keys'=>[
                    'POST'=>[
                        'productID'=>[
                            'min'=>1,
                            'max'=>11
                        ],
                        'commentText'=>[
                            'min'=>1,
                            'max'=>10000
                        ]
                    ]
                ]
            ],
            'followProduct'=>[
                'methods'=>['POST'],
                'authorization'=>['member'],
                'keys'=>[
                    'POST'=>[
                        'productID'=>[
                            'min'=>1,
                            'max'=>11
                        ],
                        'follow'=>[
                            'min'=>0,
                            'max'=>1
                        ]
                    ]
                ]
            ],
            'likeComment'=>[
                'methods'=>['POST'],
                'authorization'=>['member'],
                'keys'=>[
                    'POST'=>[
                        'commentID'=>[
                            'min'=>1,
                            'max'=>11
                        ],
                        'like'=>[
                            'min'=>0,
                            'max'=>1
                        ]
                    ]
                ]
            ],
            'report'=>[
                'methods'=>['POST'],
                'authorization'=>['member'],
                'keys'=>[
                    'POST'=>[
                        'commentID'=>[
                            'min'=>1,
                            'max'=>11
                        ],
                        'reportOptionID'=>[
                            'min'=>1,
                            'max'=>11
                        ],
                        'reportText'=>[
                            'min'=>0,
                            'max'=>200
                        ]
                    ]
                ]
            ],
        ];
    }

?>