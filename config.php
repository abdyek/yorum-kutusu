<?php


    date_default_timezone_set('Europe/Istanbul');
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
            1=>'Bu e-posta kullanımda',
            2=>'Bu kullanıcı adı kullanılamıyor',
            3=>'Geçersiz e-posta',
            4=>'Geçersiz kullanıcı adı',
            5=>'Beklenmedik veri tabanı hatası',
            6=>'success',
        ];
        const ENDPOINT = [
            'example'=>[
                'methods'=>['POST', 'GET', 'PUT', 'PATCH', 'DELETE'],
                'authorization'=>[
                    'POST'=>['admin', 'guest', 'member'],
                    'GET'=>['guest'],
                    'PUT'=>['admin', 'guest', 'member'],
                    'PATCH'=>['guest', 'member'],
                    'DELETE'=>['admin', 'guest'],
                ],
                'keys'=>[
                    'POST'=>[],
                    'GET'=>[],
                    'PUT'=>[],
                    'PATCH'=>[],
                    'DELETE'=>[]
                ],
            ],
            'login'=>[
                'methods'=>['POST'],
                'authorization'=>[
                    'POST'=>['guest']
                ],
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
                'authorization'=>[
                    'POST'=>['member', 'admin']
                ],
                'keys'=>[
                    'POST'=>[]
                ]
            ],
            'signup'=>[
                'methods'=>['POST'],
                'authorization'=>[
                    'POST'=>['guest'],
                ],
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
                'methods'=>['GET', 'POST'],
                'authorization'=>[
                    'GET'=>['guest', 'member', 'admin'],
                    'POST'=>['member']
                ],
                'keys'=>[
                    'GET'=>[
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
                        ],
                        'onlyComment'=>[
                            'min'=>0,
                            'max'=>1
                        ]
                    ],
                    'POST'=>[
                        'falan'=>[
                            'min'=>5,
                            'max'=>5
                        ]
                    ]
                ]
            ],
            'tag'=>[
                'methods'=>['GET'],
                'authorization'=>[
                    'GET'=>['guest', 'member', 'admin'],
                ],
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
                'authorization'=>[
                    'GET'=>['member', 'admin'],
                ],
                'keys'=>[
                    'GET'=>[
                        'memberID'=>[
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
                        ],
                        'onlyComment'=>[
                            'min'=>0,
                            'max'=>1
                        ]
                    ]
                ]
            ],
            'comment'=>[
                'methods'=>['POST'],
                'authorization'=>[
                    'POST'=>['member'],
                ],
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
                'methods'=>['POST', 'GET'],
                'authorization'=>[
                    'POST'=>['member'],
                    'GET'=>['member'],
                ],
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
                    ],
                    'GET'=>[
                    ],
                ]
            ],
            'likeComment'=>[
                'methods'=>['POST'],
                'authorization'=>[
                    'POST'=>['member'],
                ],
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
                'authorization'=>[
                    'POST'=>['member'],
                ],
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
            'search'=>[
                'methods'=>['GET'],
                'authorization'=>[
                    'GET'=>['guest', 'member'],
                ],
                'keys'=>[
                    'GET'=>[
                        'text'=>[
                            'min'=>1,
                            'max'=>50
                        ]
                    ]
                ]
            ],
            'validateEmail'=>[
                'methods'=>['POST', 'GET'],
                'authorization'=>[
                    'POST'=>['member'],
                    'GET'=>['member'],
                ],
                'keys'=>[
                    'POST'=>[
                        'code'=>[
                            'min'=>6,
                            'max'=>6
                        ]
                    ],
                    'GET'=>[
                    ]
                ]
            ],
            'changeEmail'=>[
                'methods'=>['POST'],
                'authorization'=>[
                    'POST'=>['member'],
                ],
                'keys'=>[
                    'POST'=>[
                        'password'=>[
                            'min'=>10,
                            'max'=>40
                        ],
                        'newEmail'=>[
                            'min'=>1,
                            'max'=>60
                        ]
                    ],
                ]
            ],
            'changePassword'=>[
                'methods'=>['POST'],
                'authorization'=>[
                    'POST'=>['member'],
                ],
                'keys'=>[
                    'POST'=>[
                        'password'=>[
                            'min'=>10,
                            'max'=>40
                        ],
                        'newPassword'=>[
                            'min'=>10,
                            'max'=>40
                        ]
                    ],
                ]
            ],
        ];
    }

?>