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
            settingAreaVisible: false,
            followedProductsVisible: false
            // setting elementary funcs
        };_this.openSetting = _this.openSetting.bind(_this);
        _this.closeSetting = _this.closeSetting.bind(_this);
        _this.toggleSetting = _this.toggleSetting.bind(_this);
        // followedProducts elementary funcs
        _this.openFollowedProducts = _this.openFollowedProducts.bind(_this);
        _this.closeFollowedProducts = _this.closeFollowedProducts.bind(_this);
        _this.toggleFollowedProducts = _this.toggleFollowedProducts.bind(_this);
        return _this;
    }

    _createClass(Profile, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            console.log("yükleme kodları burada olacak");
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
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(EmailValidation, { validated: true }),
                React.createElement(ProfileHeader, {
                    changeContent: this.props.changeContent,
                    memberUsername: "Hamam B\xF6ce\u011Fine Kafa Atan Adam"
                }),
                React.createElement(OwnerButtons, {
                    settingButton: this.toggleSetting,
                    followedProductsButton: this.toggleFollowedProducts
                }),
                React.createElement(SettingArea, {
                    visible: this.state.settingAreaVisible,
                    close: this.closeSetting
                }),
                React.createElement(FollowedProductsArea, {
                    visible: this.state.followedProductsVisible,
                    close: this.closeFollowedProducts,
                    changeContent: this.props.changeContent
                }),
                React.createElement(ProfileComments, null)
            );
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

        var _this3 = _possibleConstructorReturn(this, (FollowedProductsTable.__proto__ || Object.getPrototypeOf(FollowedProductsTable)).call(this, props));

        _this3.state = {
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
        return _this3;
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
                    { "class": "ui inverted table" },
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

        var _this4 = _possibleConstructorReturn(this, (FollowedProductsCell.__proto__ || Object.getPrototypeOf(FollowedProductsCell)).call(this, props));

        _this4.goProduct = _this4.goProduct.bind(_this4);
        return _this4;
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
                            React.createElement("i", { "class": "fa fa-cube", "aria-hidden": "true" })
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
                                React.createElement(ProfileSettings, null)
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
                            React.createElement(ChangeEmail, null)
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

        var _this11 = _possibleConstructorReturn(this, (ChangeEmail.__proto__ || Object.getPrototypeOf(ChangeEmail)).call(this, props));

        _this11.emailInputs = [{
            name: "E-posta",
            state: "email"
        }, {
            name: "Yeni E-posta",
            state: "newEmail1"
        }, {
            name: "Yeni E-posta Tekrar",
            state: "newEmail2"
        }];
        _this11.state = {
            form: "normal",
            email: "",
            newEmail1: "",
            newEmail2: "",
            password: "",
            buttonDisabled: true,
            formMessageOnlyText: false,
            formMessageType: "",
            formMessageHeader: "",
            formMessageTextArr: []
        };
        _this11.send = _this11.send.bind(_this11);
        _this11.changedSuccessfully = _this11.changedSuccessfully.bind(_this11);
        _this11.checkInputs = _this11.checkInputs.bind(_this11);
        _this11.changeEmailInput = _this11.changeEmailInput.bind(_this11);
        _this11.changePassword = _this11.changePassword.bind(_this11);
        _this11.setFormMessageList = _this11.setFormMessageList.bind(_this11);
        _this11.setFormMessageText = _this11.setFormMessageText.bind(_this11);
        _this11.setLoading = _this11.setLoading.bind(_this11);
        _this11.setNormal = _this11.setNormal.bind(_this11);
        return _this11;
    }

    _createClass(ChangeEmail, [{
        key: "send",
        value: function send() {
            if (this.checkInputs()) {
                this.setLoading();
                //this.changedSuccessfully();
                //this.failed(401);
                //this.failed(400);
                //this.failed(422, 3);
                //this.failed(422, 1);
                console.log("gönderme işlemi burada");
            }
        }
    }, {
        key: "changedSuccessfully",
        value: function changedSuccessfully() {
            this.setFormMessageText("success", "Başarılı!", "Onay için yeni e-postanızı kontrol ediniz");
        }
    }, {
        key: "failed",
        value: function failed(type, subType) {
            if (type == 401) {
                this.setFormMessageText("error", "Başarısız!", "Parolanız doğru değil");
            } else if (type == 500) {
                this.setFormMessageText("error", "Başarısız!", "Beklenmedik bir hata oldu");
            } else if (type == 422 && subType == 3) {
                this.setFormMessageText("error", "Başarısız!", "Bu e-posta geçersiz");
            } else if (type = 422 && subType == 1) {
                this.setFormMessageText("error", "Başarısız!", "Bu e-posta kullanımda");
            }
        }
    }, {
        key: "checkInputs",
        value: function checkInputs() {
            var errors = [];
            // email
            for (var i = 0; i < this.emailInputs.length; i++) {
                console.log(this.state[this.emailInputs[i].state]);
                if (!validateEmail(this.state[this.emailInputs[i].state])) {
                    errors.push(this.emailInputs[i].name + " geçersiz");
                }
            }
            if (this.state.newEmail1 != this.state.newEmail2) {
                errors.push("Yeni e-posta tekrarı ile aynı değil");
            }
            if (errors.length) {
                this.setFormMessageList("error", "Geçersiz alan değerleri", errors);
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
            if (e.target.value.length >= 10 && e.target.value.length <= 40) this.setButtonDisabledFalse();else this.setButtonDisabledTrue();
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
        key: "setButtonDisabledFalse",
        value: function setButtonDisabledFalse() {
            this.setState({
                buttonDisabled: false
            });
        }
    }, {
        key: "setButtonDisabledTrue",
        value: function setButtonDisabledTrue() {
            this.setState({
                buttonDisabled: true
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
                        React.createElement(
                            "div",
                            { className: "field" },
                            React.createElement(
                                "label",
                                { className: "yorumkutusu-label" },
                                this.emailInputs[0].name
                            ),
                            React.createElement("input", { className: "yorumkutusu-input", type: "email", name: "email", placeholder: this.emailInputs[0].name, value: this.state.email, onChange: this.changeEmailInput })
                        ),
                        React.createElement(
                            "div",
                            { className: "field" },
                            React.createElement(
                                "label",
                                { className: "yorumkutusu-label" },
                                this.emailInputs[1].name
                            ),
                            React.createElement("input", { className: "yorumkutusu-input", type: "email", name: "newEmail1", placeholder: this.emailInputs[1].name, value: this.state.newEmail1, onChange: this.changeEmailInput })
                        ),
                        React.createElement(
                            "div",
                            { className: "field" },
                            React.createElement(
                                "label",
                                { className: "yorumkutusu-label" },
                                this.emailInputs[2].name
                            ),
                            React.createElement("input", { className: "yorumkutusu-input", type: "email", name: "newEmail2", placeholder: this.emailInputs[2].name, value: this.state.newEmail2, onChange: this.changeEmailInput })
                        ),
                        React.createElement(
                            "div",
                            { className: "field" },
                            React.createElement(
                                "label",
                                { className: "yorumkutusu-label" },
                                "Parola"
                            ),
                            React.createElement("input", { className: "yorumkutusu-input", type: "password", value: this.state.password, onChange: this.changePassword, placeholder: "Parola" })
                        ),
                        this.state.formMessageType ? React.createElement(FormMessageList, {
                            onlyText: this.state.formMessageOnlyText,
                            header: this.state.formMessageHeader,
                            mix: this.state.formMessageTextArr,
                            type: this.state.formMessageType
                        }) : "",
                        React.createElement(
                            FloatRight,
                            null,
                            React.createElement(FormButton, { text: "De\u011Fi\u015Ftir", disabled: this.state.buttonDisabled, onClickHandler: this.send })
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

var ChangePassword = function (_React$Component12) {
    _inherits(ChangePassword, _React$Component12);

    function ChangePassword(props) {
        _classCallCheck(this, ChangePassword);

        var _this12 = _possibleConstructorReturn(this, (ChangePassword.__proto__ || Object.getPrototypeOf(ChangePassword)).call(this, props));

        _this12.send = _this12.send.bind(_this12);
        return _this12;
    }

    _createClass(ChangePassword, [{
        key: "send",
        value: function send(e) {
            e.preventDefault();
            console.log("istek buraya");
        }
    }, {
        key: "render",
        value: function render() {
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
                    React.createElement(
                        "div",
                        { className: "field" },
                        React.createElement(
                            "label",
                            { className: "yorumkutusu-label" },
                            "Parola"
                        ),
                        React.createElement("input", { className: "yorumkutusu-input", type: "password", placeholder: "Parola" })
                    ),
                    React.createElement(
                        "div",
                        { className: "field" },
                        React.createElement(
                            "label",
                            { className: "yorumkutusu-label" },
                            "Yeni Parola"
                        ),
                        React.createElement("input", { className: "yorumkutusu-input", type: "password", placeholder: "Yeni Parola" })
                    ),
                    React.createElement(
                        "div",
                        { className: "field" },
                        React.createElement(
                            "label",
                            { className: "yorumkutusu-label" },
                            "Yeni Parola Tekrar"
                        ),
                        React.createElement("input", { className: "yorumkutusu-input", type: "password", placeholder: "Yeni Parola Tekrar" })
                    ),
                    React.createElement(
                        FloatRight,
                        null,
                        React.createElement(
                            "button",
                            { className: "ui green button", onClick: this.send },
                            "De\u011Fi\u015Ftir"
                        )
                    )
                )
            );
        }
    }]);

    return ChangePassword;
}(React.Component);

var FormMessageList = function (_React$Component13) {
    _inherits(FormMessageList, _React$Component13);

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
                        null,
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

var FormButton = function (_React$Component14) {
    _inherits(FormButton, _React$Component14);

    function FormButton(props) {
        _classCallCheck(this, FormButton);

        var _this14 = _possibleConstructorReturn(this, (FormButton.__proto__ || Object.getPrototypeOf(FormButton)).call(this, props));

        _this14.click = _this14.click.bind(_this14);
        return _this14;
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