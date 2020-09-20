var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Profile = function (_React$Component) {
    _inherits(Profile, _React$Component);

    function Profile() {
        _classCallCheck(this, Profile);

        return _possibleConstructorReturn(this, (Profile.__proto__ || Object.getPrototypeOf(Profile)).apply(this, arguments));
    }

    _createClass(Profile, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(Account, { changeContent: this.props.changeContent })
            );
        }
    }]);

    return Profile;
}(React.Component);

var Account = function (_React$Component2) {
    _inherits(Account, _React$Component2);

    function Account(props) {
        _classCallCheck(this, Account);

        var _this2 = _possibleConstructorReturn(this, (Account.__proto__ || Object.getPrototypeOf(Account)).call(this, props));

        var form = "info";
        /*
        let firstSlug=getSlugs("profil")[0];
        console.log(firstSlug);
        if(firstSlug=="takipteki-urunler"){
            form = "followedProducts";
        }
        // ^ bu kısım bazı durumlarda takipteki ürünlerin hemen açılması için, şimdilik aslıya aldım
        */
        _this2.state = {
            // info, setting, followedProducts
            form: form,
            loading: false,
            openedSetting: false,
            info: {
                userName: "Yunus Emre",
                owner: true
            },
            followedProductsInfo: {
                0: {
                    url: "iphone-5s",
                    productName: "Iphone 5s",
                    newCommentCount: "5"
                },
                1: {
                    url: "le-cola",
                    productName: "Le-Cola",
                    newCommentCount: "9312"
                },
                9: {
                    url: "mahmut-efendi-kahveleri",
                    productName: "Mahmut Efendi Kahveleri",
                    newCommentCount: "0"
                }
            },
            isThereMoreProduct: true,
            comments: [{
                title: "IPhone 5s",
                slug: "iphone-5s",
                text: "burası yorum text alanı",
                likeCount: 15,
                liked: false,
                date: "14 Aralık 2019 - 18:49",
                tags: [{
                    id: 3,
                    passive: false,
                    text: "Batarya",
                    color: "yellow",
                    rateValue: "5",
                    slug: "batarya"
                }, {
                    id: 4,
                    passive: false,
                    text: "Kamera",
                    color: "orange",
                    rateValue: "4",
                    slug: "kamera"
                }, {
                    id: 5,
                    passive: false,
                    text: "Tasarım",
                    color: "",
                    rateValue: "-",
                    slug: "tasarim"
                }],
                owner: false
            }, {
                title: "Le Cola Zero",
                slug: "le-cola-zero",
                text: "burası yorum text alanı",
                likeCount: 15,
                liked: true,
                date: "14 Aralık 1999- 00:01",
                tags: [{
                    id: 3,
                    passive: false,
                    text: "Batarya",
                    color: "yellow",
                    rateValue: "5"
                }, {
                    id: 4,
                    passive: false,
                    text: "Kamera",
                    color: "orange",
                    rateValue: "4"
                }, {
                    id: 5,
                    passive: false,
                    text: "Tasarım",
                    color: "",
                    rateValue: "-"
                }],
                owner: false
            }]
        };
        _this2.openSettingArea = _this2.openSettingArea.bind(_this2);
        _this2.closeSettingArea = _this2.closeSettingArea.bind(_this2);
        _this2.openFollowedProducts = _this2.openFollowedProducts.bind(_this2);
        _this2.closeFollowedProducts = _this2.closeFollowedProducts.bind(_this2);
        _this2.changeForm = _this2.changeForm.bind(_this2);
        _this2.addMoreFollowed = _this2.addMoreFollowed.bind(_this2);
        return _this2;
    }

    _createClass(Account, [{
        key: "load",
        value: function load() {
            // yüklenme kodları buraya gelecek
        }
    }, {
        key: "openSettingArea",
        value: function openSettingArea() {
            this.changeForm("setting");
        }
    }, {
        key: "closeSettingArea",
        value: function closeSettingArea() {
            this.changeForm("info");
        }
    }, {
        key: "openFollowedProducts",
        value: function openFollowedProducts() {
            this.changeForm("followedProducts");
        }
    }, {
        key: "closeFollowedProducts",
        value: function closeFollowedProducts() {
            this.changeForm("info");
        }
    }, {
        key: "changeForm",
        value: function changeForm(form) {
            this.setState({
                form: form
            });
        }
    }, {
        key: "addMoreFollowed",
        value: function addMoreFollowed() {
            // buradaki more ve isThereMore JSON'ı ajax ile gelen şey olacak
            var more = {
                0: {
                    url: "iphone-5s",
                    productName: "Iphone 5s",
                    newCommentCount: "5"
                },
                1: {
                    url: "le-cola",
                    productName: "Le-Cola",
                    newCommentCount: "9312"
                },
                9: {
                    url: "mahmut-efendi-kahveleri",
                    productName: "Mahmut Efendi Kahveleri",
                    newCommentCount: "0"
                },
                99: {
                    url: "yeni-gelen",
                    productName: "Falan filen",
                    newCommentCount: "19"
                }
            };
            var isThereMore = false;
            this.setState({
                followedProductsInfo: more,
                isThereMoreProduct: isThereMore
            });
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.loading) {
                return React.createElement(RowLoadingSpin, { nonSegment: true });
            } else {
                this.form;
                if (this.state.form == "info") {
                    document.title = this.state.info.userName;
                    this.form = React.createElement(AccountInfo, { handleOpenSettingArea: this.openSettingArea, handleOpenFollowedProducts: this.openFollowedProducts, info: this.state.info });
                } else if (this.state.form == "setting") {
                    document.title = "Ayarlar";
                    this.form = React.createElement(SettingArea, { closeSettingArea: this.closeSettingArea });
                } else if (this.state.form == "followedProducts") {
                    document.title = "Takip Edilen Ürünler";
                    this.form = React.createElement(FollowedProducts, { closeFollowedProducts: this.closeFollowedProducts, followedProductsInfo: this.state.followedProductsInfo, isThereMoreProduct: this.state.isThereMoreProduct, addMoreFollowed: this.addMoreFollowed, changeContent: this.props.changeContent });
                }
                return React.createElement(
                    "div",
                    null,
                    React.createElement(EmailValidation, { validated: false }),
                    React.createElement(
                        Row,
                        { size: "one" },
                        React.createElement(
                            Column,
                            null,
                            this.form
                        )
                    ),
                    React.createElement(Comments, { comments: this.state.comments, form: "normal", changeContent: this.props.changeContent, type: "product" })
                );
            }
        }
    }]);

    return Account;
}(React.Component);

var AccountInfo = function (_React$Component3) {
    _inherits(AccountInfo, _React$Component3);

    function AccountInfo(props) {
        _classCallCheck(this, AccountInfo);

        var _this3 = _possibleConstructorReturn(this, (AccountInfo.__proto__ || Object.getPrototypeOf(AccountInfo)).call(this, props));

        _this3.openSettingArea = _this3.openSettingArea.bind(_this3);
        _this3.openFollowedProducts = _this3.openFollowedProducts.bind(_this3);
        return _this3;
    }

    _createClass(AccountInfo, [{
        key: "openSettingArea",
        value: function openSettingArea() {
            this.props.handleOpenSettingArea();
        }
    }, {
        key: "openFollowedProducts",
        value: function openFollowedProducts() {
            this.props.handleOpenFollowedProducts();
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                Center,
                null,
                React.createElement("i", { id: "account-icon", className: "fa fa-user-circle", "aria-hidden": "true" }),
                React.createElement(H, { type: "1", text: this.props.info.userName }),
                this.props.info.owner ? React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "button",
                        { className: "compact ui teal button", onClick: this.openSettingArea },
                        React.createElement(
                            "i",
                            { className: "icon" },
                            React.createElement("i", { className: "fa fa-cog", "aria-hidden": "true" })
                        ),
                        "Ayarlar"
                    ),
                    React.createElement(
                        "button",
                        { className: "compact ui teal button", onClick: this.openFollowedProducts },
                        React.createElement(
                            "i",
                            { className: "icon" },
                            React.createElement("i", { "class": "fa fa-cube", "aria-hidden": "true" })
                        ),
                        "Takipteki \xDCr\xFCnler"
                    )
                ) : ""
            );
        }
    }]);

    return AccountInfo;
}(React.Component);

var SettingArea = function (_React$Component4) {
    _inherits(SettingArea, _React$Component4);

    function SettingArea() {
        _classCallCheck(this, SettingArea);

        return _possibleConstructorReturn(this, (SettingArea.__proto__ || Object.getPrototypeOf(SettingArea)).apply(this, arguments));
    }

    _createClass(SettingArea, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    Row,
                    { size: "two", nonStackable: true },
                    React.createElement(
                        Column,
                        null,
                        React.createElement(H, { type: "3", text: "Ayarlar" })
                    ),
                    React.createElement(
                        Column,
                        null,
                        React.createElement(
                            FloatRight,
                            null,
                            React.createElement(CancelButton, { handleCancelButton: this.props.closeSettingArea })
                        )
                    )
                ),
                React.createElement(
                    Row,
                    { size: "sixteen" },
                    React.createElement(WideColumn, { size: "three" }),
                    React.createElement(
                        WideColumn,
                        { size: "ten" },
                        React.createElement(ChangeItems, null)
                    )
                )
            );
        }
    }]);

    return SettingArea;
}(React.Component);

var FollowedProducts = function (_React$Component5) {
    _inherits(FollowedProducts, _React$Component5);

    function FollowedProducts(props) {
        _classCallCheck(this, FollowedProducts);

        var _this5 = _possibleConstructorReturn(this, (FollowedProducts.__proto__ || Object.getPrototypeOf(FollowedProducts)).call(this, props));

        _this5.addMoreFollowed = _this5.addMoreFollowed.bind(_this5);
        return _this5;
    }

    _createClass(FollowedProducts, [{
        key: "addMoreFollowed",
        value: function addMoreFollowed() {
            this.props.addMoreFollowed();
        }
    }, {
        key: "render",
        value: function render() {
            var _this6 = this;

            this.trs = [];
            var info = this.props.followedProductsInfo;
            var keys = Object.keys(info);
            for (var i = 0; i < keys.length; i++) {
                this.trs.push(React.createElement(
                    "tr",
                    { key: keys[i] },
                    React.createElement(
                        "td",
                        null,
                        React.createElement(
                            Center,
                            null,
                            React.createElement(
                                "a",
                                { href: "urun/" + info[keys[i]].url, onClick: function onClick(e) {
                                        e.preventDefault();_this6.props.changeContent(e.target.href, e);
                                    } },
                                info[keys[i]].productName
                            )
                        )
                    ),
                    React.createElement(
                        "td",
                        null,
                        React.createElement(
                            Center,
                            null,
                            info[keys[i]].newCommentCount
                        )
                    )
                ));
            }
            return React.createElement(
                "div",
                null,
                React.createElement(
                    Row,
                    { size: "two", nonStackable: true },
                    React.createElement(
                        Column,
                        null,
                        React.createElement(H, { type: "3", text: "Takip Edilen \xDCr\xFCnler" })
                    ),
                    React.createElement(
                        Column,
                        null,
                        React.createElement(
                            FloatRight,
                            null,
                            React.createElement(CancelButton, { handleCancelButton: this.props.closeFollowedProducts })
                        )
                    )
                ),
                React.createElement(
                    Row,
                    { size: "sixteen" },
                    React.createElement(WideColumn, { size: "three" }),
                    React.createElement(
                        WideColumn,
                        { size: "ten" },
                        React.createElement(
                            "table",
                            { className: "ui striped table" },
                            React.createElement(
                                "thead",
                                null,
                                React.createElement(
                                    "tr",
                                    null,
                                    React.createElement(
                                        "th",
                                        null,
                                        React.createElement(
                                            Center,
                                            null,
                                            "\xDCr\xFCn"
                                        )
                                    ),
                                    React.createElement(
                                        "th",
                                        null,
                                        React.createElement(
                                            Center,
                                            null,
                                            "Yeni Yorum"
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                "tbody",
                                null,
                                this.trs
                            )
                        ),
                        this.props.isThereMoreProduct ? React.createElement(
                            Row,
                            { size: "one" },
                            React.createElement(
                                Column,
                                null,
                                React.createElement(
                                    FloatRight,
                                    null,
                                    React.createElement(
                                        "a",
                                        { onClick: this.addMoreFollowed },
                                        "Daha Fazla"
                                    )
                                )
                            )
                        ) : ""
                    )
                )
            );
        }
    }]);

    return FollowedProducts;
}(React.Component);

var ChangeItems = function (_React$Component6) {
    _inherits(ChangeItems, _React$Component6);

    function ChangeItems(props) {
        _classCallCheck(this, ChangeItems);

        var _this7 = _possibleConstructorReturn(this, (ChangeItems.__proto__ || Object.getPrototypeOf(ChangeItems)).call(this, props));

        _this7.state = {
            form: "normal",
            topMessage: null,
            passwordSelected: true,
            passwordButtonClass: "mini ui blue button",
            emailSelected: false,
            emailButtonClass: "mini ui button",
            input1: "",
            input2: "",
            input3: ""
        };
        _this7.selectEmail = _this7.selectEmail.bind(_this7);
        _this7.selectPassword = _this7.selectPassword.bind(_this7);
        _this7.changeInput1 = _this7.changeInput1.bind(_this7);
        _this7.changeInput2 = _this7.changeInput2.bind(_this7);
        _this7.changeInput3 = _this7.changeInput3.bind(_this7);
        _this7.send = _this7.send.bind(_this7);
        _this7.showTopMessage = _this7.showTopMessage.bind(_this7);
        return _this7;
    }

    _createClass(ChangeItems, [{
        key: "selectEmail",
        value: function selectEmail() {
            this.setState({
                passwordSelected: false,
                passwordButtonClass: "mini ui button",
                emailButtonClass: "mini ui blue button",
                input1: "",
                input2: "",
                input3: "",
                topMessage: null
            });
        }
    }, {
        key: "selectPassword",
        value: function selectPassword() {
            this.setState({
                passwordSelected: true,
                passwordButtonClass: "mini ui blue button",
                emailButtonClass: "mini ui button",
                input1: "",
                input2: "",
                input3: "",
                topMessage: null
            });
        }
    }, {
        key: "changeInput1",
        value: function changeInput1(e) {
            this.setState({
                input1: e.target.value
            });
        }
    }, {
        key: "changeInput2",
        value: function changeInput2(e) {
            this.setState({
                input2: e.target.value
            });
        }
    }, {
        key: "changeInput3",
        value: function changeInput3(e) {
            this.setState({
                input3: e.target.value
            });
        }
    }, {
        key: "send",
        value: function send() {
            if (this.state.passwordSelected) {
                // parola
                if (this.state.input2 != this.state.input3) {
                    this.showTopMessage("warning", "Parola tekrarı ile eşleşmiyor!");
                } else {
                    // burada gönderim yapılacak
                }
            } else {
                // e-posta
                if (!validateEmail(this.state.input1)) {
                    this.showTopMessage("warning", "Yeni E-posta geçersiz!");
                } else if (!validateEmail(this.state.input2)) {
                    this.showTopMessage("warning", "Yeni E-posta Tekrarı geçersiz!");
                } else {
                    // burada gönderim yapılacak
                }
            }
        }
    }, {
        key: "showTopMessage",
        value: function showTopMessage(type, text) {
            this.setState({
                topMessage: {
                    type: type,
                    text: text
                }
            });
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.form == "normal") {
                return React.createElement(
                    "div",
                    null,
                    React.createElement(
                        Row,
                        { size: "one" },
                        React.createElement(
                            Column,
                            null,
                            React.createElement(H, { type: "3", text: "De\u011Fi\u015Ftir", textAlign: "center" }),
                            React.createElement(
                                Center,
                                null,
                                React.createElement(
                                    "div",
                                    { id: "password-email-change" },
                                    React.createElement(
                                        "button",
                                        { className: this.state.passwordButtonClass, onClick: this.selectPassword },
                                        "Parola"
                                    ),
                                    React.createElement(
                                        "button",
                                        { className: this.state.emailButtonClass, onClick: this.selectEmail },
                                        "E-posta"
                                    )
                                )
                            )
                        )
                    ),
                    this.state.topMessage ? React.createElement(
                        Row,
                        { size: "one" },
                        React.createElement(
                            Column,
                            null,
                            React.createElement(
                                "div",
                                { id: "change-top-message" },
                                React.createElement(BasicMessage, { type: this.state.topMessage.type, text: this.state.topMessage.text })
                            )
                        )
                    ) : "",
                    React.createElement(
                        "div",
                        { className: "ui form" },
                        React.createElement(
                            "h4",
                            { className: "ui dividing header" },
                            this.state.passwordSelected ? "Parola" : "E-posta",
                            " De\u011Fi\u015Ftir"
                        ),
                        React.createElement(
                            "div",
                            { className: "field" },
                            React.createElement(
                                "label",
                                null,
                                this.state.passwordSelected ? "Mevcut Parola" : "Yeni E-posta"
                            ),
                            React.createElement("input", { type: this.state.passwordSelected ? "password" : "text", value: this.state.input1, onChange: this.changeInput1 })
                        ),
                        React.createElement(
                            "div",
                            { className: "field" },
                            React.createElement(
                                "label",
                                null,
                                this.state.passwordSelected ? "Yeni Parola" : "Yeni E-posta Tekrar"
                            ),
                            React.createElement("input", { type: this.state.passwordSelected ? "password" : "text", value: this.state.input2, onChange: this.changeInput2 })
                        ),
                        React.createElement(
                            "div",
                            { className: "field" },
                            React.createElement(
                                "label",
                                null,
                                this.state.passwordSelected ? "Yeni Parola Tekrar" : "Parola"
                            ),
                            React.createElement("input", { type: "password", value: this.state.input3, onChange: this.changeInput3 })
                        ),
                        React.createElement(
                            FloatRight,
                            null,
                            React.createElement(
                                "button",
                                { className: "ui blue button", onClick: this.send },
                                this.state.passwordSelected ? "Parola" : "E-posta",
                                " De\u011Fi\u015Ftir"
                            )
                        )
                    )
                );
            } else if (this.state.form == "loading") {
                return React.createElement(RowLoadingSpin, { nonSegment: true });
            }
        }
    }]);

    return ChangeItems;
}(React.Component);