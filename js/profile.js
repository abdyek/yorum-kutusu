var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Content = function (_React$Component) {
    _inherits(Content, _React$Component);

    function Content() {
        _classCallCheck(this, Content);

        return _possibleConstructorReturn(this, (Content.__proto__ || Object.getPrototypeOf(Content)).apply(this, arguments));
    }

    _createClass(Content, [{
        key: "render",
        value: function render() {
            /* 
                EmailValidation componentine validated={true} vermen yeterli görünmemesini sağlamak için
            */
            return React.createElement(
                "div",
                null,
                React.createElement(EmailValidation, null),
                React.createElement(Account, { owner: false })
            );
        }
    }]);

    return Content;
}(React.Component);

var Account = function (_React$Component2) {
    _inherits(Account, _React$Component2);

    function Account(props) {
        _classCallCheck(this, Account);

        var _this2 = _possibleConstructorReturn(this, (Account.__proto__ || Object.getPrototypeOf(Account)).call(this, props));

        _this2.state = {
            openedSetting: false
        };
        _this2.openSettingArea = _this2.openSettingArea.bind(_this2);
        _this2.closeSettingArea = _this2.closeSettingArea.bind(_this2);
        return _this2;
    }

    _createClass(Account, [{
        key: "openSettingArea",
        value: function openSettingArea() {
            this.setState({
                openedSetting: true
            });
        }
    }, {
        key: "closeSettingArea",
        value: function closeSettingArea() {
            this.setState({
                openedSetting: false
            });
        }
    }, {
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
                        this.state.openedSetting ? React.createElement(SettingArea, { closeSettingArea: this.closeSettingArea }) : React.createElement(AccountInfo, { handleOpenSettingArea: this.openSettingArea, owner: this.props.owner })
                    )
                ),
                React.createElement(Comments, null)
            );
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
        return _this3;
    }

    _createClass(AccountInfo, [{
        key: "openSettingArea",
        value: function openSettingArea() {
            this.props.handleOpenSettingArea();
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                Center,
                null,
                React.createElement("i", { id: "account-icon", className: "fa fa-user-circle", "aria-hidden": "true" }),
                React.createElement(H, { type: "1", text: "abdyek" }),
                this.props.owner ? React.createElement(
                    "button",
                    { className: "compact ui teal button", onClick: this.openSettingArea },
                    React.createElement(
                        "i",
                        { className: "icon" },
                        React.createElement("i", { className: "fa fa-cog", "aria-hidden": "true" })
                    ),
                    "Ayarlar"
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

var ChangeItems = function (_React$Component5) {
    _inherits(ChangeItems, _React$Component5);

    function ChangeItems(props) {
        _classCallCheck(this, ChangeItems);

        var _this5 = _possibleConstructorReturn(this, (ChangeItems.__proto__ || Object.getPrototypeOf(ChangeItems)).call(this, props));

        _this5.state = {
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
        _this5.selectEmail = _this5.selectEmail.bind(_this5);
        _this5.selectPassword = _this5.selectPassword.bind(_this5);
        _this5.changeInput1 = _this5.changeInput1.bind(_this5);
        _this5.changeInput2 = _this5.changeInput2.bind(_this5);
        _this5.changeInput3 = _this5.changeInput3.bind(_this5);
        _this5.send = _this5.send.bind(_this5);
        _this5.showTopMessage = _this5.showTopMessage.bind(_this5);
        return _this5;
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

var Comments = function (_React$Component6) {
    _inherits(Comments, _React$Component6);

    function Comments() {
        _classCallCheck(this, Comments);

        return _possibleConstructorReturn(this, (Comments.__proto__ || Object.getPrototypeOf(Comments)).apply(this, arguments));
    }

    _createClass(Comments, [{
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
                        React.createElement(H, { type: "2", text: "Yorumlar" })
                    )
                ),
                React.createElement(Comment, { text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                    likeCount: "0",
                    liked: false,
                    title: "Iphone",
                    date: "14 Aral\u0131k 2019- 18:49",
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
                }),
                React.createElement(Comment, { text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                    likeCount: "0",
                    liked: false,
                    title: "Le-cola",
                    date: "14 Aral\u0131k 2019- 18:49",
                    tags: [{
                        id: 3,
                        passive: false,
                        text: "Tad",
                        color: "yellow",
                        rateValue: "5"
                    }, {
                        id: 4,
                        passive: false,
                        text: "Fiyat/Performans",
                        color: "red",
                        rateValue: "1"
                    }],
                    owner: false
                })
            );
        }
    }]);

    return Comments;
}(React.Component);