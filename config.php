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
            ],
            'urun-duzenle'=>[
                'title'=>'Ürün Düzenle',
                'content'=>'editProduct'
            ]
        ];
        const MESSAGE = [
            1=>'Bu e-posta kullanımda',
            2=>'Bu kullanıcı adı kullanılamıyor',
            3=>'Geçersiz e-posta',
            4=>'Geçersiz kullanıcı adı',
            5=>'Beklenmedik veri tabanı hatası',
            6=>'success',
            7=>'Bu isim ya da slug\'a sahip bir ürün zaten var!',
            8=>'BU isim ya da slug\'a sahip bir etiket zaten var! Bu istek onaylansaydı çakışma olurdu.',
            9=>'Bir sorun var',
            10=>'Bu ID\'ye sahip yorum yok',
            11=>'Bu ID\'ye sahip şikayet seçeneği yok'
        ];
        const ADMIN_NOTES = [
            'newProductRequestDeleteNote'=>'Yeni ürün ekleme istediğiniz kabul edilmedi'
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
            'loginAsAdmin'=>[
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
                'methods'=>['GET'],
                'authorization'=>[
                    'GET'=>['guest', 'member', 'admin']
                ],
                'keys'=>[
                    'GET'=>[
                        'productSlug'=>[
                            'min'=>0,
                            'max'=>60
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
            'tag'=>[
                'methods'=>['GET', 'POST', 'PUT'],
                'authorization'=>[
                    'GET'=>['guest', 'member', 'admin'],
                    'POST'=>['admin'],
                    'PUT'=>['admin']
                ],
                'keys'=>[
                    'GET'=>[
                        'searchText'=>[
                            'min'=>0,
                            'max'=>100
                        ]
                    ],
                    'POST'=>[
                        'tagName'=>[
                            'min'=>1,
                            'max'=>25,
                        ],
                        'tagSlug'=>[
                            'min'=>1,
                            'max'=>25
                        ],
                        'passive'=>[
                            'min'=>0,
                            'max'=>1
                        ]
                    ],
                    'PUT'=>[
                        'tagID'=>[
                            'min'=>1,
                            'max'=>11
                        ],
                        'tagName'=>[
                            'min'=>1,
                            'max'=>25
                        ],
                        'tagSlug'=>[
                            'min'=>1,
                            'max'=>25
                        ],
                        'passive'=>[
                            'min'=>0,
                            'max'=>1
                        ]
                    ]
                ]
            ],
            'member'=>[
                'methods'=>['GET', 'DELETE', 'PATCH'],
                'authorization'=>[
                    'GET'=>['member', 'admin'],
                    'DELETE'=>['member','admin'],
                    'PATCH'=>['admin']
                ],
                'keys'=>[
                    'GET'=>[
                        'slug'=>[
                            'min'=>1,
                            'max'=>60
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
                    'DELETE'=>[
                        'memberID'=>[
                            'min'=>0,
                            'max'=>11
                        ],
                        'password'=>[
                            'min'=>0,
                            'max'=>40
                        ]
                    ],
                    'PATCH'=>[
                        'memberID'=>[
                            'min'=>1,
                            'max'=>11
                        ],
                        'restrict'=>[
                            'min'=>0,
                            'max'=>1
                        ],
                        'adminNote'=>[
                            'min'=>0,
                            'max'=>200
                        ]
                    ]
                ]
            ],
            'comment'=>[
                'methods'=>['POST', 'PUT', 'DELETE'],
                'authorization'=>[
                    'POST'=>['member'],
                    'PUT'=>['member'],
                    'DELETE'=>['member', 'admin']
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
                    ],
                    'PUT'=>[
                        'productID'=>[
                            'min'=>1,
                            'max'=>11
                        ],
                        'commentText'=>[
                            'min'=>1,
                            'max'=>10000
                        ]
                    ],
                    'DELETE'=>[
                        'commentID'=>[
                            'min'=>1,
                            'max'=>11
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
                        'pageNumber'=>[
                            'min'=>1,
                            'max'=>11
                        ]
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
                'methods'=>['POST', 'GET'],
                'authorization'=>[
                    'POST'=>['member'],
                    'GET'=>['admin'],
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
                        ],
                        'hide'=>[
                            'min'=>0,
                            'max'=>1
                        ]
                    ],
                    'GET'=>[]
                ]
            ],
            'reportOptions'=>[
                'methods'=>['POST', 'GET'],
                'authorization'=>[
                    'POST'=>['admin'],
                    'GET'=>['member']
                ],
                'keys'=>[
                    'POST'=>[],
                    'GET'=>[]
                ]
            ],
            'removeHideComment'=>[
                'methods'=>['POST'],
                'authorization'=>[
                    'POST'=>['member']
                ],
                'keys'=>[
                    'POST'=>[
                        'commentID'=>[
                            'min'=>1,
                            'max'=>11
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
                    'POST'=>['member', 'admin'],
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
            'checkProductSlug'=>[
                'methods'=>['GET'],
                'authorization'=>[
                    'GET'=>['member'],
                ],
                'keys'=>[
                    'GET'=>[
                        'slug'=>[
                            'min'=>1,
                            'max'=>60
                        ],
                    ],
                ]
            ],
            'forgotMyPassword'=>[
                'methods'=>['POST', 'PUT'],
                'authorization'=>[
                    'POST'=>['guest'],
                    'PUT'=>['guest']
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
                    ],
                    'PUT'=>[
                        'eMail'=>[
                            'min'=>1,
                            'max'=>60
                        ],
                        'username'=>[
                            'min'=>1,
                            'max'=>60
                        ],
                        'recoveryCode'=>[
                            'min'=>30,
                            'max'=>30
                        ],
                        'newPassword'=>[
                            'min'=>10,
                            'max'=>40
                        ]
                    ]
                ]
            ],
            'admin'=>[
                'methods'=>['POST', 'PATCH'],
                'authorization'=>[
                    'POST'=>['admin'],
                    'PATCH'=>['admin']
                ],
                'keys'=>[
                    'POST'=>[
                        'memberID'=>[
                            'min'=>0,
                            'max'=>11
                        ],
                        'adminUsername'=>[
                            'min'=>0,
                            'max'=>60
                        ],
                        'adminEMail'=>[
                            'min'=>0,
                            'max'=>60
                        ],
                        'adminNote'=>[
                            'min'=>0,
                            'max'=>200
                        ]
                    ],
                    'PATCH'=>[
                        'adminID'=>[
                            'min'=>1,
                            'max'=>11
                        ],
                        'active'=>[
                            'min'=>0,
                            'max'=>1
                        ],
                        'adminNote'=>[
                            'min'=>0,
                            'max'=>200
                        ]
                    ]
                ]
            ],
            'evaluateReport'=>[
                'methods'=>['POST'],
                'authorization'=>[
                    'POST'=>['admin']
                ],
                'keys'=>[
                    'POST'=>[
                        'reportID'=>[
                            'min'=>1,
                            'max'=>11
                        ],
                        'responseMessage'=>[
                            'min'=>0,
                            'max'=>200
                        ]
                    ]
                ]
            ],
            'commentRequest'=>[
                'methods'=>['GET', 'POST'],
                'authorization'=>[
                    'GET'=>['admin'],
                    'POST'=>['admin']
                ],
                'keys'=>[
                    'GET'=>[
                    ],
                    'POST'=>[
                        'commentRequestID'=>[
                            'min'=>1,
                            'max'=>11
                        ],
                        'allow'=>[
                            'min'=>0,
                            'max'=>1
                        ],
                        'adminNote'=>[
                            'min'=>0,
                            'max'=>200
                        ]
                    ]
                ]
            ],
            'productApproval'=>[
                'methods'=>['GET'],
                'authorization'=>[
                    'GET'=>['admin']
                ],
                'keys'=>[
                    'GET'=>[
                    ]
                ]
            ],
            'productCRUD'=>[
                'methods'=>['POST', 'PUT', 'DELETE'],
                'authorization'=>[
                    'POST'=>['admin'],
                    'PUT'=>['admin'],
                    'DELETE'=>['admin']
                ],
                'keys'=>[
                    'POST'=>[
                        'productName'=>[
                            'min'=>0,
                            'max'=>60
                        ],
                        'productSlug'=>[
                            'min'=>0,
                            'max'=>60
                        ],
                        'tagIDs'=>[
                            'min'=>0,
                            'max'=>10
                        ]
                    ],
                    'PUT'=>[
                        'productID'=>[
                            'min'=>0,
                            'max'=>11
                        ],
                        'productName'=>[
                            'min'=>0,
                            'max'=>60
                        ],
                        'productSlug'=>[
                            'min'=>0,
                            'max'=>60
                        ],
                        'tagIDs'=>[
                            'min'=>0,
                            'max'=>10
                        ]
                    ],
                    'DELETE'=>[
                        'productID'=>[
                            'min'=>0,
                            'max'=>11
                        ],
                        'password'=>[
                            'min'=>6,
                            'max'=>40
                        ],
                        'adminNote'=>[
                            'min'=>0,
                            'max'=>200
                        ]
                    ]
                ]
            ],
            'newProduct'=>[
                'methods'=>['POST'],
                'authorization'=>[
                    'POST'=>['member']
                ],
                'keys'=>[
                    'POST'=>[
                        'productName'=>[
                            'min'=>1,
                            'max'=>60
                        ],
                        'productSlug'=>[
                            'min'=>1,
                            'max'=>60
                        ],
                        'tags'=>[
                            'min'=>0,
                            'max'=>10
                        ]
                    ]
                ]
            ],
            'updateProduct'=>[
                'methods'=>['POST'],
                'authorization'=>[
                    'POST'=>['member']
                ],
                'keys'=>[
                    'POST'=>[
                        'productID'=>[
                            'min'=>1,
                            'max'=>11
                        ],
                        'productNewName'=>[
                            'min'=>1,
                            'max'=>60
                        ],
                        'productNewSlug'=>[
                            'min'=>1,
                            'max'=>60
                        ],
                        'tags'=>[
                            'min'=>0,
                            'max'=>10
                        ]
                    ]
                ]
            ],
            'newProductApproval'=>[
                'methods'=>['POST', 'DELETE'],
                'authorization'=>[
                    'POST'=>['admin'],
                    'DELETE'=>['admin']
                ],
                'keys'=>[
                    'POST'=>[
                        'productRequestID'=>[
                            'min'=>1,
                            'max'=>11
                        ]
                    ],
                    'DELETE'=>[
                        'productRequestID'=>[
                            'min'=>1,
                            'max'=>11
                        ]
                    ]
                ]
            ],
        ];
    }

?>
