var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Profile = function (_React$Component) {
    _inherits(Profile, _React$Component);

    function Profile(props) {
        _classCallCheck(this, Profile);

        var _this = _possibleConstructorReturn(this, (Profile.__proto__ || Object.getPrototypeOf(Profile)).call(this, props));

        _this.state = {
            form: "normal", // normal, loading, notFound
            settingAreaVisible: false,
            followedProductsVisible: false,
            username: "",
            slug: "",
            owner: false,
            email: "",
            comments: []
        };
        _this.load = _this.load.bind(_this);
        // setting elementary funcs
        _this.openSetting = _this.openSetting.bind(_this);
        _this.closeSetting = _this.closeSetting.bind(_this);
        _this.toggleSetting = _this.toggleSetting.bind(_this);
        // followedProducts elementary funcs
        _this.openFollowedProducts = _this.openFollowedProducts.bind(_this);
        _this.closeFollowedProducts = _this.closeFollowedProducts.bind(_this);
        _this.toggleFollowedProducts = _this.toggleFollowedProducts.bind(_this);
        _this.reloadFunc = _this.reloadFunc.bind(_this);
        return _this;
    }

    _createClass(Profile, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.setState({
                form: "loading"
            });
            this.load();
        }
    }, {
        key: "load",
        value: function load() {
            var _this2 = this;

            var userslug = getPathNames()[1];
            fetch(SITEURL + 'api/member?' + getUrlPar({
                slug: userslug,
                sortBy: "like", // !! only now
                pageNumber: 1 // !! only now
            }), { method: 'GET' }).then(function (response) {
                if (!response.ok) throw new Error(response.status);else return response.json();
            }).then(function (json) {
                _this2.setState({
                    form: "normal",
                    username: json.other.member.username,
                    slug: json.other.member.slug,
                    owner: json.other.member.owner,
                    email: json.other.member.email,
                    comments: normalizer('comment-in-profile', json['other']['comments'])
                });
            }).catch(function (error) {
                if (error.message == 404) {
                    _this2.setState({ form: "notFound" });
                }
            });
        }
    }, {
        key: "openSetting",
        value: function openSetting() {
            this.closeFollowedProducts();
            this.setState({ settingAreaVisible: true });
        }
    }, {
        key: "closeSetting",
        value: function closeSetting() {
            this.setState({ settingAreaVisible: false });
        }
    }, {
        key: "toggleSetting",
        value: function toggleSetting() {
            if (this.state.settingAreaVisible) this.closeSetting();else this.openSetting();
        }
    }, {
        key: "openFollowedProducts",
        value: function openFollowedProducts() {
            this.closeSetting();
            this.setState({ followedProductsVisible: true });
        }
    }, {
        key: "closeFollowedProducts",
        value: function closeFollowedProducts() {
            this.setState({ followedProductsVisible: false });
        }
    }, {
        key: "toggleFollowedProducts",
        value: function toggleFollowedProducts() {
            if (this.state.followedProductsVisible) this.closeFollowedProducts();else this.openFollowedProducts();
        }
    }, {
        key: "reloadFunc",
        value: function reloadFunc() {
            this.load();
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.form == "normal") {
                return React.createElement(
                    "div",
                    null,
                    React.createElement(EmailValidation, { validated: true }),
                    React.createElement(ProfileHeader, {
                        changeContent: this.props.changeContent,
                        memberUsername: this.state.username
                    }),
                    React.createElement(OwnerButtons, {
                        owner: this.state.owner,
                        settingButton: this.toggleSetting,
                        followedProductsButton: this.toggleFollowedProducts
                    }),
                    React.createElement(SettingArea, {
                        visible: this.state.settingAreaVisible,
                        close: this.closeSetting,
                        email: this.state.email
                    }),
                    React.createElement(FollowedProductsArea, {
                        visible: this.state.followedProductsVisible,
                        close: this.closeFollowedProducts,
                        changeContent: this.props.changeContent
                    }),
                    React.createElement(ProfileComments, {
                        form: this.state.form,
                        comments: this.state.comments,
                        changeContent: this.props.changeContent,
                        reloadFunc: this.reloadFunc
                    })
                );
            } else if (this.state.form == "loading") {
                return React.createElement(RowLoadingSpin, { nonSegment: true });
            } else if (this.state.form == "notFound") {
                return React.createElement(
                    Row,
                    { size: "one" },
                    React.createElement(
                        Column,
                        null,
                        React.createElement(
                            "div",
                            { className: "ui negative huge message" },
                            React.createElement(
                                "div",
                                { className: "header" },
                                "404"
                            ),
                            React.createElement(
                                "p",
                                null,
                                "B\xF6yle bir profil yok"
                            )
                        )
                    )
                );
            }
        }
    }]);

    return Profile;
}(React.Component);

var FollowedProductsArea = function (_React$Component2) {
    _inherits(FollowedProductsArea, _React$Component2);

    function FollowedProductsArea(props) {
        _classCallCheck(this, FollowedProductsArea);

        var _this3 = _possibleConstructorReturn(this, (FollowedProductsArea.__proto__ || Object.getPrototypeOf(FollowedProductsArea)).call(this, props));

        _this3.state = {
            form: "loading",
            loadMoreHidden: true,
            pageNumber: 1,
            followProduct: [
                /*
                {
                    productID:0,
                    productSlug:"iphone-5s", 
                    productName:"Iphone 5s",
                    newComment: "5"
                },
                {
                    productID:2,
                    productSlug:"mahmut-efendi-kahveleri", 
                    productName:"Mahmut Efendi Kahveleri",
                    newComment: "5"
                },
                {
                    productID:12,
                    productSlug:"starBucks-sumatra", 
                    productName:"StarBucks Sumatra",
                    newComment: "99"
                }
                */
            ]
        };
        _this3.load = _this3.load.bind(_this3);
        return _this3;
    }

    _createClass(FollowedProductsArea, [{
        key: "load",
        value: function load() {
            var _this4 = this;

            var pageNumber = this.state.pageNumber;
            fetch(SITEURL + 'api/followProduct?' + getUrlPar({
                pageNumber: pageNumber
            }), { method: 'GET' }).then(function (response) {
                if (!response.ok) throw new Error(response.status);else return response.json();
            }).then(function (json) {
                _this4.setState({
                    followProduct: json.other.followProduct,
                    pageNumber: pageNumber + 1,
                    loadMoreHidden: !json.other.more,
                    form: "normal"
                });
            }).catch(function (error) {});
        }
    }, {
        key: "render",
        value: function render() {
            if (this.props.visible) {
                if (this.state.form == "normal") {
                    return React.createElement(
                        "div",
                        null,
                        React.createElement(
                            Row,
                            { size: "two", nonStackable: true },
                            React.createElement(
                                Column,
                                null,
                                React.createElement(
                                    "h3",
                                    { className: "ui header yorumkutusu-header" },
                                    "Takipteki \xDCr\xFCnler"
                                )
                            ),
                            React.createElement(
                                Column,
                                null,
                                React.createElement(
                                    FloatRight,
                                    null,
                                    React.createElement(CancelButton, { handleCancelButton: this.props.close })
                                )
                            )
                        ),
                        React.createElement(
                            Row,
                            null,
                            React.createElement(
                                Column,
                                null,
                                React.createElement(FollowedProductsTable, {
                                    changeContent: this.props.changeContent,
                                    info: this.state.followProduct
                                }),
                                React.createElement(FollowedProductsLoadMore, {
                                    hidden: this.state.loadMoreHidden,
                                    load: this.load
                                })
                            )
                        )
                    );
                } else if (this.state.form == "loading") {
                    this.load();
                    return React.createElement(RowLoadingSpin, { nonSegment: true });
                }
            } else {
                return "";
            }
        }
    }]);

    return FollowedProductsArea;
}(React.Component);

var FollowedProductsTable = function (_React$Component3) {
    _inherits(FollowedProductsTable, _React$Component3);

    function FollowedProductsTable(props) {
        _classCallCheck(this, FollowedProductsTable);

        return _possibleConstructorReturn(this, (FollowedProductsTable.__proto__ || Object.getPrototypeOf(FollowedProductsTable)).call(this, props));
    }

    _createClass(FollowedProductsTable, [{
        key: "render",
        value: function render() {
            this.tr = [];
            for (var i = 0; i < this.props.info.length; i++) {
                this.tr.push(React.createElement(
                    "tr",
                    { key: this.props.info[i].productID },
                    React.createElement(
                        "td",
                        { "data-label": this.props.info[i].productSlug },
                        React.createElement(FollowedProductsCell, {
                            changeContent: this.props.changeContent,
                            slug: this.props.info[i].productSlug,
                            name: this.props.info[i].productName
                        })
                    ),
                    React.createElement(
                        "td",
                        null,
                        this.props.info[i].newComment
                    )
                ));
            }
            return React.createElement(
                "table",
                { className: "ui inverted table" },
                React.createElement(
                    "thead",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            "Takipteki \xDCr\xFCn"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Yeni Yorum"
                        )
                    )
                ),
                React.createElement(
                    "tbody",
                    null,
                    this.tr
                )
            );
        }
    }]);

    return FollowedProductsTable;
}(React.Component);

var FollowedProductsCell = function (_React$Component4) {
    _inherits(FollowedProductsCell, _React$Component4);

    function FollowedProductsCell(props) {
        _classCallCheck(this, FollowedProductsCell);

        var _this6 = _possibleConstructorReturn(this, (FollowedProductsCell.__proto__ || Object.getPrototypeOf(FollowedProductsCell)).call(this, props));

        _this6.goProduct = _this6.goProduct.bind(_this6);
        return _this6;
    }

    _createClass(FollowedProductsCell, [{
        key: "goProduct",
        value: function goProduct(e) {
            e.preventDefault();
            this.props.changeContent(SITEURL + 'urun/' + this.props.slug);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "a",
                    { className: "yorumkutusu-a", href: SITEURL + 'urun/' + this.props.slug, onClick: this.goProduct },
                    this.props.name
                )
            );
        }
    }]);

    return FollowedProductsCell;
}(React.Component);

var FollowedProductsLabels = function (_React$Component5) {
    _inherits(FollowedProductsLabels, _React$Component5);

    function FollowedProductsLabels() {
        _classCallCheck(this, FollowedProductsLabels);

        return _possibleConstructorReturn(this, (FollowedProductsLabels.__proto__ || Object.getPrototypeOf(FollowedProductsLabels)).apply(this, arguments));
    }

    _createClass(FollowedProductsLabels, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    Row,
                    { size: "one" },
                    React.createElement(
                        Column,
                        null,
                        React.createElement(
                            "div",
                            { className: "ui label" },
                            "IPhone 5s",
                            React.createElement(
                                "div",
                                { className: "detail" },
                                "99"
                            )
                        )
                    )
                ),
                React.createElement(
                    Row,
                    { size: "one" },
                    React.createElement(
                        Column,
                        null,
                        React.createElement(
                            "div",
                            { className: "ui label" },
                            "Mahmut Efendi Kahveleri",
                            React.createElement(
                                "div",
                                { className: "detail" },
                                "12"
                            )
                        )
                    )
                ),
                React.createElement(
                    Row,
                    { size: "one" },
                    React.createElement(
                        Column,
                        null,
                        React.createElement(
                            "div",
                            { className: "ui label" },
                            "Startbucks Sumatra",
                            React.createElement(
                                "div",
                                { className: "detail" },
                                "0"
                            )
                        )
                    )
                )
            );
        }
    }]);

    return FollowedProductsLabels;
}(React.Component);

var FollowedProductsLoadMore = function (_React$Component6) {
    _inherits(FollowedProductsLoadMore, _React$Component6);

    function FollowedProductsLoadMore() {
        _classCallCheck(this, FollowedProductsLoadMore);

        return _possibleConstructorReturn(this, (FollowedProductsLoadMore.__proto__ || Object.getPrototypeOf(FollowedProductsLoadMore)).apply(this, arguments));
    }

    _createClass(FollowedProductsLoadMore, [{
        key: "render",
        value: function render() {
            if (!this.props.hidden) {
                return React.createElement(
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
                                { className: "yorumkutusu-a-empty", onClick: this.props.load },
                                "Daha Fazla G\xF6ster"
                            )
                        )
                    )
                );
            } else {
                return "";
            }
        }
    }]);

    return FollowedProductsLoadMore;
}(React.Component);

var ProfileHeader = function (_React$Component7) {
    _inherits(ProfileHeader, _React$Component7);

    function ProfileHeader() {
        _classCallCheck(this, ProfileHeader);

        return _possibleConstructorReturn(this, (ProfileHeader.__proto__ || Object.getPrototypeOf(ProfileHeader)).apply(this, arguments));
    }

    _createClass(ProfileHeader, [{
        key: "render",
        value: function render() {
            return React.createElement(
                Row,
                { size: "one" },
                React.createElement(
                    Column,
                    null,
                    React.createElement(
                        Row,
                        null,
                        React.createElement(
                            Column,
                            null,
                            React.createElement(
                                Center,
                                null,
                                React.createElement(
                                    "h1",
                                    { className: "ui header yorumkutusu-header" },
                                    this.props.memberUsername
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return ProfileHeader;
}(React.Component);

var ProfileComments = function (_React$Component8) {
    _inherits(ProfileComments, _React$Component8);

    function ProfileComments(props) {
        _classCallCheck(this, ProfileComments);

        return _possibleConstructorReturn(this, (ProfileComments.__proto__ || Object.getPrototypeOf(ProfileComments)).call(this, props));
    }

    _createClass(ProfileComments, [{
        key: "render",
        value: function render() {
            this.comments = [];
            for (var i = 0; i < this.props.comments.length; i++) {
                var com = this.props.comments[i];
                this.comments.push(React.createElement(Comment, {
                    productID: com.productID,
                    changeContent: this.props.changeContent,
                    reloadFunc: this.props.reloadFunc,
                    tags: com.tags,
                    key: com.id,
                    id: com.id,
                    text: com.text,
                    type: "product",
                    slug: com.slug,
                    likeCount: com.likeCount,
                    liked: com.liked,
                    title: com.title,
                    date: com.date,
                    lastEditDate: com.lastEditDate,
                    edited: com.edited,
                    rating: com.rating,
                    owner: com.owner,
                    reported: com.reported,
                    hidden: com.hidden
                }));
            }
            this.comments = this.comments.length ? this.comments : React.createElement(
                Row,
                { size: "one" },
                React.createElement(
                    Column,
                    null,
                    React.createElement(BasicMessageWithColor, { color: "yellow", message: "Yorum yok" })
                )
            );
            return React.createElement(
                "div",
                null,
                React.createElement(
                    Row,
                    { size: "one" },
                    React.createElement(
                        Column,
                        null,
                        React.createElement(H, { type: "1", text: "Yorumlar" })
                    )
                ),
                this.comments
            );
        }
    }]);

    return ProfileComments;
}(React.Component);

var OwnerButtons = function (_React$Component9) {
    _inherits(OwnerButtons, _React$Component9);

    function OwnerButtons() {
        _classCallCheck(this, OwnerButtons);

        return _possibleConstructorReturn(this, (OwnerButtons.__proto__ || Object.getPrototypeOf(OwnerButtons)).apply(this, arguments));
    }

    _createClass(OwnerButtons, [{
        key: "render",
        value: function render() {
            if (this.props.owner) {
                return React.createElement(
                    "div",
                    null,
                    React.createElement(
                        Center,
                        null,
                        React.createElement(
                            "button",
                            { className: "ui small teal button", onClick: this.props.followedProductsButton },
                            React.createElement(
                                "i",
                                { className: "icon" },
                                React.createElement("i", { className: "fa fa-cube", "aria-hidden": "true" })
                            ),
                            "Takipteki \xDCr\xFCnler"
                        ),
                        React.createElement(
                            "button",
                            { className: "ui small teal button", onClick: this.props.settingButton },
                            React.createElement(
                                "i",
                                { className: "icon" },
                                React.createElement("i", { className: "fa fa-cog", "aria-hidden": "true" })
                            ),
                            "Ayarlar"
                        )
                    )
                );
            } else {
                return "";
            }
        }
    }]);

    return OwnerButtons;
}(React.Component);

var SettingArea = function (_React$Component10) {
    _inherits(SettingArea, _React$Component10);

    function SettingArea() {
        _classCallCheck(this, SettingArea);

        return _possibleConstructorReturn(this, (SettingArea.__proto__ || Object.getPrototypeOf(SettingArea)).apply(this, arguments));
    }

    _createClass(SettingArea, [{
        key: "render",
        value: function render() {
            if (this.props.visible) {
                return React.createElement(
                    Row,
                    { size: "one" },
                    React.createElement(
                        Column,
                        null,
                        React.createElement(
                            Row,
                            { size: "two", nonStackable: true },
                            React.createElement(
                                Column,
                                null,
                                React.createElement(
                                    "h2",
                                    { className: "ui header yorumkutusu-header" },
                                    "Ayarlar"
                                )
                            ),
                            React.createElement(
                                Column,
                                null,
                                React.createElement(
                                    FloatRight,
                                    null,
                                    React.createElement(CancelButton, { handleCancelButton: this.props.close })
                                )
                            )
                        ),
                        React.createElement(
                            Row,
                            { size: "sixteen" },
                            React.createElement(WideColumn, { size: "one" }),
                            React.createElement(
                                WideColumn,
                                { size: "fourteen" },
                                React.createElement(
                                    "h3",
                                    { className: "ui header yorumkutusu-header" },
                                    "Hesap"
                                ),
                                React.createElement(ProfileSettings, { email: this.props.email })
                            )
                        )
                    )
                );
            } else {
                return "";
            }
        }
    }]);

    return SettingArea;
}(React.Component);

var ProfileSettings = function (_React$Component11) {
    _inherits(ProfileSettings, _React$Component11);

    function ProfileSettings() {
        _classCallCheck(this, ProfileSettings);

        return _possibleConstructorReturn(this, (ProfileSettings.__proto__ || Object.getPrototypeOf(ProfileSettings)).apply(this, arguments));
    }

    _createClass(ProfileSettings, [{
        key: "render",
        value: function render() {
            return React.createElement(
                Row,
                { size: "one" },
                React.createElement(
                    Column,
                    null,
                    React.createElement(
                        Row,
                        { size: "two" },
                        React.createElement(
                            Column,
                            null,
                            React.createElement(ChangeEmail, { email: this.props.email })
                        ),
                        React.createElement(
                            Column,
                            null,
                            React.createElement(ChangePassword, null)
                        )
                    )
                )
            );
        }
    }]);

    return ProfileSettings;
}(React.Component);

var ChangeEmail = function (_React$Component12) {
    _inherits(ChangeEmail, _React$Component12);

    function ChangeEmail(props) {
        _classCallCheck(this, ChangeEmail);

        var _this14 = _possibleConstructorReturn(this, (ChangeEmail.__proto__ || Object.getPrototypeOf(ChangeEmail)).call(this, props));

        _this14.emailInputs = [{
            name: "Yeni E-posta",
            state: "newEmail1"
        }, {
            name: "Yeni E-posta Tekrar",
            state: "newEmail2"
        }];
        _this14.state = {
            form: "normal",
            email: _this14.props.email,
            newEmail1: "",
            newEmail2: "",
            password: "",
            formMessageOnlyText: false,
            formMessageType: "",
            formMessageHeader: "",
            formMessageTextArr: []
        };
        _this14.send = _this14.send.bind(_this14);
        _this14.changedSuccessfully = _this14.changedSuccessfully.bind(_this14);
        _this14.checkInputs = _this14.checkInputs.bind(_this14);
        _this14.changeEmailInput = _this14.changeEmailInput.bind(_this14);
        _this14.changePassword = _this14.changePassword.bind(_this14);
        _this14.setFormMessageList = _this14.setFormMessageList.bind(_this14);
        _this14.setFormMessageText = _this14.setFormMessageText.bind(_this14);
        _this14.setLoading = _this14.setLoading.bind(_this14);
        _this14.setNormal = _this14.setNormal.bind(_this14);
        return _this14;
    }

    _createClass(ChangeEmail, [{
        key: "send",
        value: function send() {
            var _this15 = this;

            if (this.checkInputs()) {
                this.setLoading();
                fetch(SITEURL + 'api/changeEmail', {
                    method: 'POST',
                    header: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        password: this.state.password,
                        newEmail: this.state.newEmail1
                    })
                }).then(function (response) {
                    if (!response.ok) throw new Error(response.status);else return response.json();
                }).then(function (json) {
                    _this15.changedSuccessfully();
                    var newEmail = _this15.state.newEmail1;
                    _this15.setState({
                        form: "normal",
                        email: newEmail,
                        newEmail1: "",
                        newEmail2: "",
                        password: ""
                    });
                }).catch(function (error) {
                    _this15.failed(error.message);
                    _this15.setState({
                        form: "normal"
                    });
                });
            }
        }
    }, {
        key: "changedSuccessfully",
        value: function changedSuccessfully() {
            this.setFormMessageText("success", "Başarılı!", "Onay için yeni e-postanızı kontrol ediniz");
        }
    }, {
        key: "failed",
        value: function failed(type) {
            if (type == 401) {
                this.setFormMessageText("error", "Başarısız!", "Parolanız doğru değil");
            } else if (type == 500) {
                this.setFormMessageText("error", "Başarısız!", "Beklenmedik bir hata oldu");
            } else if (type == 422) {
                this.setFormMessageText("error", "Başarısız!", "Bu e-posta kullanılamıyor");
            } else if (type == 403) {
                this.setFormMessageText("error", "Başarısız!", "Bu işlem için yetkiniz yok");
            } else if (type == 400) {
                this.setFormMessageText("error", "Başarısız!", "Bu istek geçersiz");
            }
        }
    }, {
        key: "checkInputs",
        value: function checkInputs() {
            var errors = [];
            // email
            for (var i = 0; i < this.emailInputs.length; i++) {
                if (!validateEmail(this.state[this.emailInputs[i].state])) {
                    errors.push(this.emailInputs[i].name + " geçersiz");
                }
            }
            if (this.state.newEmail1 != this.state.newEmail2) {
                errors.push("Yeni e-posta tekrarı ile aynı değil");
            }
            if (this.state.password.length < 10 || this.state.password.length > 40) {
                errors.push("Geçersiz parola");
            }
            if (errors.length) {
                this.setFormMessageList("error", "Başarısız", errors);
                return false;
            }
            return true;
        }
    }, {
        key: "changeEmailInput",
        value: function changeEmailInput(e) {
            if (e.target.name == "email") {
                this.setState({
                    email: e.target.value
                });
            } else if (e.target.name == "newEmail1") {
                this.setState({
                    newEmail1: e.target.value
                });
            } else if (e.target.name == "newEmail2") {
                this.setState({
                    newEmail2: e.target.value
                });
            }
        }
    }, {
        key: "changePassword",
        value: function changePassword(e) {
            this.setState({
                password: e.target.value
            });
        }
    }, {
        key: "setFormMessageList",
        value: function setFormMessageList(type, header, arr) {
            this.setState({
                formMessageOnlyText: false,
                formMessageType: type,
                formMessageHeader: header,
                formMessageTextArr: arr
            });
        }
    }, {
        key: "setFormMessageText",
        value: function setFormMessageText(type, header, text) {
            this.setState({
                formMessageOnlyText: true,
                formMessageType: type,
                formMessageHeader: header,
                formMessageTextArr: text
            });
        }
    }, {
        key: "setLoading",
        value: function setLoading() {
            this.setState({
                form: "loading"
            });
        }
    }, {
        key: "setNormal",
        value: function setNormal() {
            this.setState({
                form: "normal"
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
                        "h4",
                        { className: "ui header yorumkutusu-header" },
                        "E-posta De\u011Fi\u015Ftir"
                    ),
                    React.createElement(
                        "form",
                        { className: "ui form" },
                        React.createElement(FormField, {
                            labelText: "E-posta",
                            inputType: "email",
                            inputName: "E-posta",
                            inputValue: this.state.email,
                            disabled: true
                        }),
                        React.createElement(FormField, {
                            labelText: this.emailInputs[0].name,
                            inputType: "email",
                            inputName: this.emailInputs[0].state,
                            inputValue: this.state.newEmail1,
                            inputChange: this.changeEmailInput,
                            inputPlaceholder: this.emailInputs[0].name
                        }),
                        React.createElement(FormField, {
                            labelText: this.emailInputs[1].name,
                            inputType: "email",
                            inputName: this.emailInputs[1].state,
                            inputValue: this.state.newEmail2,
                            inputChange: this.changeEmailInput,
                            inputPlaceholder: this.emailInputs[1].name
                        }),
                        React.createElement(FormField, {
                            labelText: "Parola",
                            inputType: "password",
                            inputName: "password",
                            inputValue: this.state.password,
                            inputChange: this.changePassword,
                            inputPlaceholder: "Parola"
                        }),
                        this.state.formMessageType ? React.createElement(FormMessageList, {
                            onlyText: this.state.formMessageOnlyText,
                            header: this.state.formMessageHeader,
                            mix: this.state.formMessageTextArr,
                            type: this.state.formMessageType
                        }) : "",
                        React.createElement(
                            FloatRight,
                            null,
                            React.createElement(FormButton, { text: "De\u011Fi\u015Ftir", onClickHandler: this.send })
                        )
                    )
                );
            } else if (this.state.form == "loading") {
                return React.createElement(RowLoadingSpin, { nonSegment: true });
            }
        }
    }]);

    return ChangeEmail;
}(React.Component);

var FormField = function (_React$Component13) {
    _inherits(FormField, _React$Component13);

    function FormField(props) {
        _classCallCheck(this, FormField);

        return _possibleConstructorReturn(this, (FormField.__proto__ || Object.getPrototypeOf(FormField)).call(this, props));
    }

    _createClass(FormField, [{
        key: "render",
        value: function render() {
            this.disabled = this.props.disabled ? "disabled" : false;
            return React.createElement(
                "div",
                { className: "field" },
                React.createElement(
                    "label",
                    { className: "yorumkutusu-label" },
                    this.props.labelText
                ),
                React.createElement("input", { className: "yorumkutusu-input", name: this.props.inputName, type: this.props.inputType, value: this.props.inputValue, onChange: this.props.inputChange, placeholder: this.props.inputPlaceholder, disabled: this.disabled })
            );
        }
    }]);

    return FormField;
}(React.Component);

var ChangePassword = function (_React$Component14) {
    _inherits(ChangePassword, _React$Component14);

    function ChangePassword(props) {
        _classCallCheck(this, ChangePassword);

        var _this17 = _possibleConstructorReturn(this, (ChangePassword.__proto__ || Object.getPrototypeOf(ChangePassword)).call(this, props));

        _this17.state = {
            form: "normal", // normal, loading
            password: "",
            newPassword1: "",
            newPassword2: "",
            formMessageOnlyText: false,
            formMessageType: "",
            formMessageHeader: "",
            formMessageTextArr: []
        };
        _this17.changedSuccessfully = _this17.changedSuccessfully.bind(_this17);
        _this17.failed = _this17.failed.bind(_this17);
        _this17.setFormMessageList = _this17.setFormMessageList.bind(_this17);
        _this17.setFormMessageText = _this17.setFormMessageText.bind(_this17);
        _this17.setLoading = _this17.setLoading.bind(_this17);
        _this17.send = _this17.send.bind(_this17);
        _this17.checkInputs = _this17.checkInputs.bind(_this17);
        _this17.changeInput = _this17.changeInput.bind(_this17);
        return _this17;
    }

    _createClass(ChangePassword, [{
        key: "changedSuccessfully",
        value: function changedSuccessfully() {
            this.setFormMessageText("success", "Başarılı!", "Parolanız başarılı bir şekilde değiştirildi");
        }
    }, {
        key: "failed",
        value: function failed(type) {
            if (type == 401) {
                this.setFormMessageText("error", "Başarısız!", "Parolanız doğru değil");
            } else if (type == 500) {
                this.setFormMessageText("error", "Başarısız!", "Beklenmedik bir hata oldu");
            } else if (type == 403) {
                this.setFormMessageText("error", "Başarısız!", "Bu işlem için yetkiniz yok");
            } else if (type == 400) {
                this.setFormMessageText("error", "Başarısız!", "Bu istek geçersiz");
            }
        }
    }, {
        key: "setFormMessageList",
        value: function setFormMessageList(type, header, arr) {
            this.setState({
                formMessageOnlyText: false,
                formMessageType: type,
                formMessageHeader: header,
                formMessageTextArr: arr
            });
        }
    }, {
        key: "setFormMessageText",
        value: function setFormMessageText(type, header, text) {
            this.setState({
                formMessageOnlyText: true,
                formMessageType: type,
                formMessageHeader: header,
                formMessageTextArr: text
            });
        }
    }, {
        key: "setLoading",
        value: function setLoading() {
            this.setState({ form: "loading" });
        }
    }, {
        key: "send",
        value: function send() {
            var _this18 = this;

            if (this.checkInputs()) {
                this.setLoading();
                fetch(SITEURL + 'api/changePassword', {
                    method: 'POST',
                    header: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        password: this.state.password,
                        newPassword: this.state.newPassword1
                    })
                }).then(function (response) {
                    if (!response.ok) throw new Error(response.status);else return response.json();
                }).then(function (json) {
                    _this18.changedSuccessfully();
                    _this18.setState({
                        form: "normal",
                        password: "",
                        newPassword1: "",
                        newPassword2: ""
                    });
                }).catch(function (error) {
                    _this18.failed(error.message);
                    _this18.setState({
                        form: "normal"
                    });
                });
                this.changedSuccessfully();
            }
        }
    }, {
        key: "checkInputs",
        value: function checkInputs() {
            var inputsInfo = ["password", "newPassword1", "newPassword2"];
            var errors = [];
            for (var i = 0; i < inputsInfo.length; i++) {
                if (this.state[inputsInfo[i]].length < 10 || this.state[inputsInfo[i]].length > 40) {
                    errors.push("Parolanın uzunluğu 10 ile 40 karakter arasında olmalı");
                    break;
                }
            }
            if (this.state.newPassword1 != this.state.newPassword2) {
                errors.push("Yeni parola tekrarı ile aynı değil");
            }
            if (errors.length) {
                this.setFormMessageList("error", "Başarısız!", errors);
                return false;
            }
            return true;
        }
    }, {
        key: "changeInput",
        value: function changeInput(e) {
            if (e.target.name == "password") {
                this.setState({ password: e.target.value });
            } else if (e.target.name == "newPassword1") {
                this.setState({ newPassword1: e.target.value });
            } else if (e.target.name == "newPassword2") {
                this.setState({ newPassword2: e.target.value });
            }
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.form == "normal") {
                return React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "h4",
                        { className: "ui header yorumkutusu-header" },
                        "Parola De\u011Fi\u015Ftir"
                    ),
                    React.createElement(
                        "form",
                        { className: "ui form" },
                        React.createElement(FormField, {
                            labelText: "Parola",
                            inputType: "password",
                            inputName: "password",
                            inputValue: this.state.password,
                            inputChange: this.changeInput,
                            inputPlaceholder: "Parola"
                        }),
                        React.createElement(FormField, {
                            labelText: "Yeni Parola",
                            inputType: "password",
                            inputName: "newPassword1",
                            inputValue: this.state.newPassword1,
                            inputChange: this.changeInput,
                            inputPlaceholder: "Yeni Parola"
                        }),
                        React.createElement(FormField, {
                            labelText: "Yeni Parola Tekrar",
                            inputType: "password",
                            inputName: "newPassword2",
                            inputValue: this.state.newPassword2,
                            inputChange: this.changeInput,
                            inputPlaceholder: "Yeni Parola Tekrar"
                        }),
                        this.state.formMessageType ? React.createElement(FormMessageList, {
                            onlyText: this.state.formMessageOnlyText,
                            header: this.state.formMessageHeader,
                            mix: this.state.formMessageTextArr,
                            type: this.state.formMessageType
                        }) : "",
                        React.createElement(
                            FloatRight,
                            null,
                            React.createElement(FormButton, { text: "De\u011Fi\u015Ftir", onClickHandler: this.send })
                        )
                    )
                );
            } else if (this.state.form = "loading") {
                return React.createElement(RowLoadingSpin, { nonSegment: true });
            }
        }
    }]);

    return ChangePassword;
}(React.Component);

var FormMessageList = function (_React$Component15) {
    _inherits(FormMessageList, _React$Component15);

    function FormMessageList() {
        _classCallCheck(this, FormMessageList);

        return _possibleConstructorReturn(this, (FormMessageList.__proto__ || Object.getPrototypeOf(FormMessageList)).apply(this, arguments));
    }

    _createClass(FormMessageList, [{
        key: "render",

        // this.props.type = info, error, success, warning
        value: function render() {
            if (!this.props.onlyText) {
                this.li = [];
                for (var i = 0; i < this.props.mix.length; i++) {
                    this.li.push(React.createElement(
                        "li",
                        { key: i },
                        this.props.mix[i]
                    ));
                }
            }
            return React.createElement(
                "div",
                { className: "ui " + this.props.type + " message yorumkutusu-form-message" },
                React.createElement(
                    "div",
                    { className: "header" },
                    this.props.header
                ),
                this.props.onlyText ? React.createElement(
                    "p",
                    null,
                    this.props.mix
                ) : React.createElement(
                    "ul",
                    { className: "list" },
                    this.li
                )
            );
        }
    }]);

    return FormMessageList;
}(React.Component);

var FormButton = function (_React$Component16) {
    _inherits(FormButton, _React$Component16);

    function FormButton(props) {
        _classCallCheck(this, FormButton);

        var _this20 = _possibleConstructorReturn(this, (FormButton.__proto__ || Object.getPrototypeOf(FormButton)).call(this, props));

        _this20.click = _this20.click.bind(_this20);
        return _this20;
    }

    _createClass(FormButton, [{
        key: "click",
        value: function click(e) {
            e.preventDefault();
            this.props.onClickHandler();
        }
    }, {
        key: "render",
        value: function render() {
            this.buttonColor = this.props.color ? this.props.color : "green";
            this.disabled = this.props.disabled ? "disabled" : "";
            return React.createElement(
                "button",
                { className: "ui " + this.buttonColor + " button " + this.disabled, onClick: this.click },
                this.props.text
            );
        }
    }]);

    return FormButton;
}(React.Component);