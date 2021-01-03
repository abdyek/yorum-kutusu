var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var yorumkutusuError = void 0;

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
            email: ""
            // setting elementary funcs
        };_this.openSetting = _this.openSetting.bind(_this);
        _this.closeSetting = _this.closeSetting.bind(_this);
        _this.toggleSetting = _this.toggleSetting.bind(_this);
        // followedProducts elementary funcs
        _this.openFollowedProducts = _this.openFollowedProducts.bind(_this);
        _this.closeFollowedProducts = _this.closeFollowedProducts.bind(_this);
        _this.toggleFollowedProducts = _this.toggleFollowedProducts.bind(_this);
        // set form loading / normal
        _this.setFormLoading = _this.setFormLoading.bind(_this);
        _this.setFormNormal = _this.setFormNormal.bind(_this);
        return _this;
    }

    _createClass(Profile, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            this.setFormLoading();
            var userslug = getPathNames()[1];
            fetch(SITEURL + 'api/member?' + getUrlPar({
                slug: userslug,
                sortBy: "like", // !! only now
                pageNumber: 1, // !! only now
                onlyComment: false
            }), { method: 'GET' }).then(function (response) {
                if (!response.ok) throw new Error(response.status);else return response.json();
            }).then(function (json) {
                _this2.setState({
                    username: json.other.member.username,
                    slug: json.other.member.slug,
                    owner: json.other.member.owner,
                    email: json.other.member.email
                });
                _this2.setFormNormal();
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
        key: "setFormLoading",
        value: function setFormLoading() {
            this.setState({ form: "loading" });
        }
    }, {
        key: "setFormNormal",
        value: function setFormNormal() {
            this.setState({ form: "normal" });
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
                    React.createElement(ProfileComments, null)
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

    function FollowedProductsArea() {
        _classCallCheck(this, FollowedProductsArea);

        return _possibleConstructorReturn(this, (FollowedProductsArea.__proto__ || Object.getPrototypeOf(FollowedProductsArea)).apply(this, arguments));
    }

    _createClass(FollowedProductsArea, [{
        key: "render",
        value: function render() {
            if (this.props.visible) {
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
                                changeContent: this.props.changeContent
                            })
                        )
                    )
                );
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

        var _this4 = _possibleConstructorReturn(this, (FollowedProductsTable.__proto__ || Object.getPrototypeOf(FollowedProductsTable)).call(this, props));

        _this4.state = {
            form: "normal", // normal, loading
            info: [{
                productID: 0,
                productSlug: "iphone-5s",
                productName: "Iphone 5s",
                newComment: "5"
            }, {
                productID: 2,
                productSlug: "mahmut-efendi-kahveleri",
                productName: "Mahmut Efendi Kahveleri",
                newComment: "5"
            }, {
                productID: 0,
                productSlug: "starBucks-sumatra",
                productName: "StarBucks Sumatra",
                newComment: "99"
            }]
        };
        return _this4;
    }

    _createClass(FollowedProductsTable, [{
        key: "render",
        value: function render() {
            if (this.state.form == "normal") {
                this.tr = [];
                for (var i = 0; i < this.state.info.length; i++) {
                    this.tr.push(React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "td",
                            { "data-label": this.state.info[i].productSlug },
                            React.createElement(FollowedProductsCell, {
                                changeContent: this.state.changeContent,
                                slug: this.state.info[i].productSlug,
                                name: this.state.info[i].productName
                            })
                        ),
                        React.createElement(
                            "td",
                            null,
                            this.state.info[i].newComment
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
            } else if (this.state.form == "loading") {
                return React.createElement(RowLoadingSpin, { nonSegment: true });
            }
        }
    }]);

    return FollowedProductsTable;
}(React.Component);

var FollowedProductsCell = function (_React$Component4) {
    _inherits(FollowedProductsCell, _React$Component4);

    function FollowedProductsCell(props) {
        _classCallCheck(this, FollowedProductsCell);

        var _this5 = _possibleConstructorReturn(this, (FollowedProductsCell.__proto__ || Object.getPrototypeOf(FollowedProductsCell)).call(this, props));

        _this5.goProduct = _this5.goProduct.bind(_this5);
        return _this5;
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

var ProfileHeader = function (_React$Component6) {
    _inherits(ProfileHeader, _React$Component6);

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

var ProfileComments = function (_React$Component7) {
    _inherits(ProfileComments, _React$Component7);

    function ProfileComments() {
        _classCallCheck(this, ProfileComments);

        return _possibleConstructorReturn(this, (ProfileComments.__proto__ || Object.getPrototypeOf(ProfileComments)).apply(this, arguments));
    }

    _createClass(ProfileComments, [{
        key: "render",
        value: function render() {
            return React.createElement("div", null);
        }
    }]);

    return ProfileComments;
}(React.Component);

var OwnerButtons = function (_React$Component8) {
    _inherits(OwnerButtons, _React$Component8);

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

var SettingArea = function (_React$Component9) {
    _inherits(SettingArea, _React$Component9);

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

var ProfileSettings = function (_React$Component10) {
    _inherits(ProfileSettings, _React$Component10);

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

var ChangeEmail = function (_React$Component11) {
    _inherits(ChangeEmail, _React$Component11);

    function ChangeEmail(props) {
        _classCallCheck(this, ChangeEmail);

        var _this12 = _possibleConstructorReturn(this, (ChangeEmail.__proto__ || Object.getPrototypeOf(ChangeEmail)).call(this, props));

        _this12.emailInputs = [{
            name: "Yeni E-posta",
            state: "newEmail1"
        }, {
            name: "Yeni E-posta Tekrar",
            state: "newEmail2"
        }];
        _this12.state = {
            form: "normal",
            email: _this12.props.email,
            newEmail1: "",
            newEmail2: "",
            password: "",
            formMessageOnlyText: false,
            formMessageType: "",
            formMessageHeader: "",
            formMessageTextArr: []
        };
        _this12.send = _this12.send.bind(_this12);
        _this12.changedSuccessfully = _this12.changedSuccessfully.bind(_this12);
        _this12.checkInputs = _this12.checkInputs.bind(_this12);
        _this12.changeEmailInput = _this12.changeEmailInput.bind(_this12);
        _this12.changePassword = _this12.changePassword.bind(_this12);
        _this12.setFormMessageList = _this12.setFormMessageList.bind(_this12);
        _this12.setFormMessageText = _this12.setFormMessageText.bind(_this12);
        _this12.setLoading = _this12.setLoading.bind(_this12);
        _this12.setNormal = _this12.setNormal.bind(_this12);
        return _this12;
    }

    _createClass(ChangeEmail, [{
        key: "send",
        value: function send() {
            var _this13 = this;

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
                    yorumkutusuError = response;
                    if (!response.ok) throw new Error(response.status);else return response.json();
                }).then(function (json) {
                    _this13.changedSuccessfully();
                    var newEmail = _this13.state.newEmail1;
                    _this13.setState({
                        form: "normal",
                        email: newEmail,
                        newEmail1: "",
                        newEmail2: "",
                        password: ""
                    });
                }).catch(function (error) {
                    _this13.failed(error.message);
                    _this13.setState({
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

var FormField = function (_React$Component12) {
    _inherits(FormField, _React$Component12);

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

var ChangePassword = function (_React$Component13) {
    _inherits(ChangePassword, _React$Component13);

    function ChangePassword(props) {
        _classCallCheck(this, ChangePassword);

        var _this15 = _possibleConstructorReturn(this, (ChangePassword.__proto__ || Object.getPrototypeOf(ChangePassword)).call(this, props));

        _this15.state = {
            form: "normal", // normal, loading
            password: "",
            newPassword1: "",
            newPassword2: "",
            formMessageOnlyText: false,
            formMessageType: "",
            formMessageHeader: "",
            formMessageTextArr: []
        };
        _this15.changedSuccessfully = _this15.changedSuccessfully.bind(_this15);
        _this15.failed = _this15.failed.bind(_this15);
        _this15.setFormMessageList = _this15.setFormMessageList.bind(_this15);
        _this15.setFormMessageText = _this15.setFormMessageText.bind(_this15);
        _this15.setLoading = _this15.setLoading.bind(_this15);
        _this15.send = _this15.send.bind(_this15);
        _this15.checkInputs = _this15.checkInputs.bind(_this15);
        _this15.changeInput = _this15.changeInput.bind(_this15);
        return _this15;
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
            var _this16 = this;

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
                    yorumkutusuError = response;
                    if (!response.ok) throw new Error(response.status);else return response.json();
                }).then(function (json) {
                    _this16.changedSuccessfully();
                    _this16.setState({
                        form: "normal",
                        password: "",
                        newPassword1: "",
                        newPassword2: ""
                    });
                }).catch(function (error) {
                    _this16.failed(error.message);
                    _this16.setState({
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

var FormMessageList = function (_React$Component14) {
    _inherits(FormMessageList, _React$Component14);

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

var FormButton = function (_React$Component15) {
    _inherits(FormButton, _React$Component15);

    function FormButton(props) {
        _classCallCheck(this, FormButton);

        var _this18 = _possibleConstructorReturn(this, (FormButton.__proto__ || Object.getPrototypeOf(FormButton)).call(this, props));

        _this18.click = _this18.click.bind(_this18);
        return _this18;
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