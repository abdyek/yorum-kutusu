var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ForgotMyPassword = function (_React$Component) {
    _inherits(ForgotMyPassword, _React$Component);

    function ForgotMyPassword(props) {
        _classCallCheck(this, ForgotMyPassword);

        var _this = _possibleConstructorReturn(this, (ForgotMyPassword.__proto__ || Object.getPrototypeOf(ForgotMyPassword)).call(this, props));

        _this.state = {
            form: "sendEmailButton", // sendEmailButton, normal, loading, success
            email: "",
            username: "",
            emailPatterWarn: false,
            responseVisible: false
        };
        _this.sendEmail = _this.sendEmail.bind(_this);
        _this.sendRecoveryCode = _this.sendRecoveryCode.bind(_this);
        _this.goLogin = _this.goLogin.bind(_this);
        _this.changeEmail = _this.changeEmail.bind(_this);
        _this.changeUsername = _this.changeUsername.bind(_this);
        return _this;
    }

    _createClass(ForgotMyPassword, [{
        key: "sendEmail",
        value: function sendEmail() {
            this.setState({
                form: "loading"
            });
            // sending request
        }
    }, {
        key: "sendRecoveryCode",
        value: function sendRecoveryCode() {
            this.setState({
                form: "loading"
            });
            // sending request
        }
    }, {
        key: "goLogin",
        value: function goLogin(e) {
            e.preventDefault();
            this.props.changeContent('giris-yap', true);
        }
    }, {
        key: "changeEmail",
        value: function changeEmail(e) {
            this.setState({
                email: e.target.value,
                emailPatterWarn: !validateEmail(e.target.value)
            });
        }
    }, {
        key: "changeUsername",
        value: function changeUsername(e) {
            this.setState({
                username: e.target.value
            });
        }
    }, {
        key: "render",
        value: function render() {
            document.title = "Parolami Unuttum";
            if (this.state.form == "sendEmailButton") {
                return React.createElement(
                    Row,
                    { size: "sixteen" },
                    React.createElement(WideColumn, { size: "four" }),
                    React.createElement(
                        WideColumn,
                        { size: "eight" },
                        React.createElement(ForgotMyPasswordHeader, null),
                        React.createElement(
                            Row,
                            { size: "one" },
                            React.createElement(
                                Column,
                                null,
                                React.createElement(
                                    "form",
                                    { className: "ui form" },
                                    React.createElement(
                                        "div",
                                        { className: "field" },
                                        React.createElement(
                                            "label",
                                            null,
                                            "E-posta"
                                        ),
                                        React.createElement("input", { type: "email", name: "e-posta", placeholder: "E-posta", value: this.state.email, onChange: this.changeEmail })
                                    ),
                                    this.state.emailPatterWarn ? React.createElement(BasicMessageWithColor, { color: "yellow", message: "Ge\xE7ersiz E-posta" }) : "",
                                    React.createElement(
                                        "div",
                                        { className: "field" },
                                        React.createElement(
                                            "label",
                                            null,
                                            "Kullan\u0131c\u0131 Ad\u0131"
                                        ),
                                        React.createElement("input", { type: "text", name: "kullanici-adi", placeholder: "Kullan\u0131c\u0131 Ad\u0131", value: this.state.username, onChange: this.changeUsername })
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
                                    Center,
                                    null,
                                    React.createElement(Button, { type: "green big", name: "Kurtarma E-postas\u0131 G\xF6nder", click: this.sendEmail })
                                )
                            )
                        )
                    ),
                    React.createElement(WideColumn, { size: "four" })
                );
            } else if (this.state.form == "normal") {
                return React.createElement(
                    Row,
                    { size: "sixteen" },
                    React.createElement(WideColumn, { size: "four" }),
                    React.createElement(
                        WideColumn,
                        { size: "eight" },
                        React.createElement(
                            Row,
                            { size: "one" },
                            React.createElement(
                                Column,
                                null,
                                React.createElement(
                                    "form",
                                    { className: "ui form" },
                                    React.createElement(
                                        "div",
                                        { className: "field" },
                                        React.createElement(
                                            "label",
                                            null,
                                            "First Name"
                                        ),
                                        React.createElement("input", { type: "text", name: "first-name", placeholder: "First Name" })
                                    ),
                                    React.createElement(
                                        "div",
                                        { className: "field" },
                                        React.createElement(
                                            "label",
                                            null,
                                            "Last Name"
                                        ),
                                        React.createElement("input", { type: "text", name: "last-name", placeholder: "Last Name" })
                                    ),
                                    React.createElement(
                                        "button",
                                        { className: "ui button", type: "submit" },
                                        "Submit"
                                    )
                                )
                            )
                        )
                    ),
                    React.createElement(WideColumn, { size: "four" })
                );
            } else if (this.state.form == "loading") {
                return React.createElement(RowLoadingSpin, { nonSegment: true });
            } else if (this.state.form == "success") {
                return React.createElement(
                    Row,
                    { size: "sixteen" },
                    React.createElement(WideColumn, { size: "four" }),
                    React.createElement(
                        WideColumn,
                        { size: "eight" },
                        React.createElement(
                            Row,
                            { size: "one" },
                            React.createElement(
                                Column,
                                null,
                                React.createElement(Message, { header: "Ba\u015Far\u0131l\u0131", message: "Ba\u015Far\u0131l\u0131 bir \u015Fekilde parola s\u0131f\u0131rland\u0131. Giri\u015F yapabilirsiniz" })
                            )
                        ),
                        React.createElement(
                            Row,
                            { size: "one" },
                            React.createElement(
                                Column,
                                null,
                                React.createElement(
                                    Center,
                                    null,
                                    React.createElement(Button, { type: "green", name: "Giri\u015F Yap", click: this.goLogin })
                                )
                            )
                        )
                    ),
                    React.createElement(WideColumn, { size: "four" })
                );
            }
        }
    }]);

    return ForgotMyPassword;
}(React.Component);

var ForgotMyPasswordHeader = function (_React$Component2) {
    _inherits(ForgotMyPasswordHeader, _React$Component2);

    function ForgotMyPasswordHeader() {
        _classCallCheck(this, ForgotMyPasswordHeader);

        return _possibleConstructorReturn(this, (ForgotMyPasswordHeader.__proto__ || Object.getPrototypeOf(ForgotMyPasswordHeader)).apply(this, arguments));
    }

    _createClass(ForgotMyPasswordHeader, [{
        key: "render",
        value: function render() {
            return React.createElement(
                Row,
                { size: "one" },
                React.createElement(
                    Column,
                    null,
                    React.createElement(H, { type: "1", text: "Parolam\u0131 Unuttum", id: "forgotMyPasswordHeader", textAlign: "center" })
                )
            );
        }
    }]);

    return ForgotMyPasswordHeader;
}(React.Component);