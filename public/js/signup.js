var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Signup = function (_React$Component) {
    _inherits(Signup, _React$Component);

    function Signup(props) {
        _classCallCheck(this, Signup);

        var _this = _possibleConstructorReturn(this, (Signup.__proto__ || Object.getPrototypeOf(Signup)).call(this, props));

        _this.state = {
            form: "normal", // normal, loading, success
            emailText: "",
            usernameText: "",
            passwordText: "",
            passwordVerificationText: "",
            message: "",
            messageColor: "",
            emailPatternWarn: false,
            usernamePatternWarn: false,
            passwordPatternWarn: false,
            passwordVerificationWarn: false
        };
        _this.signUpClick = _this.signUpClick.bind(_this);
        _this.changeEmail = _this.changeEmail.bind(_this);
        _this.changeUsername = _this.changeUsername.bind(_this);
        _this.changePassword = _this.changePassword.bind(_this);
        _this.changePasswordVerification = _this.changePasswordVerification.bind(_this);
        _this.setMessage = _this.setMessage.bind(_this);
        _this.checkEmailValidation = _this.checkEmailValidation.bind(_this);
        _this.checkUsernamePattern = _this.checkUsernamePattern.bind(_this);
        _this.checkPasswordPattern = _this.checkPasswordPattern.bind(_this);
        _this.checkPasswordVerification = _this.checkPasswordVerification.bind(_this);
        _this.setForm = _this.setForm.bind(_this);
        return _this;
    }

    _createClass(Signup, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            if (isMember()) {
                this.props.changeContent(' ', true);
            }
        }
    }, {
        key: "signUpClick",
        value: function signUpClick(e) {
            var _this2 = this;

            e.preventDefault();
            this.checkEmailValidation(this.state.emailText);
            this.checkUsernamePattern(this.state.usernameText);
            this.checkPasswordPattern(this.state.passwordText);
            this.checkPasswordVerification();
            if (this.state.emailPatternWarn || this.state.usernamePatternWarn || this.state.passwordPatternWarn || this.state.passwordVerificationWarn) {
                return;
            }
            this.setForm('loading');
            fetch(SITEURL + 'api/signup', {
                method: 'POST',
                header: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    eMail: this.state.emailText,
                    username: this.state.usernameText,
                    password: this.state.passwordText
                })
            }).then(function (response) {
                if (!response.ok) throw new Error(response.status);else return response.json();
            }).then(function (json) {
                _this2.setForm('success');
            }).catch(function (error) {
                if (error.message == 422) {
                    _this2.setState({
                        form: "normal",
                        message: "Bu e-posta ya da kullanıcı adı kullanılamıyor",
                        messageColor: "red"
                    });
                } else if (error.message == 403) {
                    _this2.setState({
                        form: "normal",
                        message: "Bu işlem için yetkiniz yok, halihazırda giriş yapmış olmadığınızdan emin olun",
                        messageColor: "red"
                    });
                } else if (error.message == 500) {
                    _this2.setState({
                        form: "normal",
                        message: "500 - Sunucu hatası",
                        messageColor: "red"
                    });
                } else if (error.message == 400) {
                    _this2.setState({
                        form: "normal",
                        message: "400 - Geçersiz istek",
                        messageColor: "red"
                    });
                }
            });
        }
    }, {
        key: "changeEmail",
        value: function changeEmail(e) {
            this.setState({
                emailText: e.target.value
            });
            this.checkEmailValidation(e.target.value);
        }
    }, {
        key: "changeUsername",
        value: function changeUsername(e) {
            this.setState({
                usernameText: e.target.value
            });
            this.checkUsernamePattern(e.target.value);
        }
    }, {
        key: "changePassword",
        value: function changePassword(e) {
            this.setState({
                passwordText: e.target.value
            });
            this.checkPasswordPattern(e.target.value);
            this.checkPasswordVerification();
        }
    }, {
        key: "changePasswordVerification",
        value: function changePasswordVerification(e) {
            this.setState({
                passwordVerificationText: e.target.value
            });
            this.checkPasswordVerification();
        }
    }, {
        key: "setMessage",
        value: function setMessage(message, color) {
            this.setState({
                message: message,
                messageColor: color
            });
        }
    }, {
        key: "checkEmailValidation",
        value: function checkEmailValidation(value) {
            var enabled = !validateEmail(value);
            this.setState({
                emailPatternWarn: enabled
            });
        }
    }, {
        key: "checkUsernamePattern",
        value: function checkUsernamePattern(value) {
            var len = value.length;
            var letter = "qwertyuıopğüasdfghjklşizxcvbnmöç";
            var number = "1234567890";
            var space = " ";
            var allChars = letter + letter.toUpperCase() + number + space;
            var enabled = void 0;
            if (len > 60 || len < 1) {
                enabled = true;
            } else {
                enabled = false;
            }
            // I will change it with regex
            for (var i = 0; i < len; i++) {
                if (allChars.indexOf(value[i]) === -1) {
                    enabled = true;
                    break;
                }
            }
            this.setState({
                usernamePatternWarn: enabled
            });
        }
    }, {
        key: "checkPasswordPattern",
        value: function checkPasswordPattern(value) {
            var len = value.length;
            var enabled = void 0;
            if (len < 10 || len > 40) {
                enabled = true;
            } else {
                enabled = false;
            }
            this.setState({
                passwordPatternWarn: enabled
            });
        }
    }, {
        key: "checkPasswordVerification",
        value: function checkPasswordVerification() {
            var _this3 = this;

            setTimeout(function () {
                var enabled = void 0;
                if (_this3.state.passwordText != _this3.state.passwordVerificationText) {
                    enabled = true;
                } else {
                    enabled = false;
                }
                _this3.setState({
                    passwordVerificationWarn: enabled
                });
            }, 150);
        }
    }, {
        key: "setForm",
        value: function setForm(type) {
            this.setState({
                form: type
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
                        { size: "sixteen" },
                        React.createElement(WideColumn, { size: "four" }),
                        React.createElement(
                            WideColumn,
                            { size: "eight" },
                            React.createElement(H, { type: "1", text: "\xDCye Ol", id: "signupHeader", textAlign: "center" }),
                            React.createElement(
                                "form",
                                { className: "ui form" },
                                React.createElement(
                                    "div",
                                    { className: "field signupInput" },
                                    React.createElement(
                                        "label",
                                        null,
                                        "E-posta"
                                    ),
                                    React.createElement("input", { type: "text", name: "id", placeholder: "e-posta", value: this.state.emailText, onChange: this.changeEmail })
                                ),
                                this.state.emailPatternWarn ? React.createElement(BasicMessageWithColor, { color: "yellow", message: "Geçersiz E-posta" }) : "",
                                React.createElement(
                                    "div",
                                    { className: "field signupInput" },
                                    React.createElement(
                                        "label",
                                        null,
                                        "Kullan\u0131c\u0131 Ad\u0131"
                                    ),
                                    React.createElement("input", { type: "text", name: "id", placeholder: "kullan\u0131c\u0131 ad\u0131", value: this.state.usernameText, onChange: this.changeUsername })
                                ),
                                this.state.usernamePatternWarn ?
                                //<BasicMessageWithColor color={"yellow"} message={"Geçersiz Kullanıcı Adı"}/>:""
                                React.createElement(
                                    "div",
                                    { className: "ui yellow message" },
                                    React.createElement(
                                        "div",
                                        { className: "header" },
                                        "Ge\xE7ersiz kullan\u0131c\u0131 ad\u0131"
                                    ),
                                    React.createElement(
                                        "ul",
                                        { className: "list" },
                                        React.createElement(
                                            "li",
                                            null,
                                            "Kullan\u0131c\u0131 ad\u0131 uzunlu\u011Fu [1-60] karakter olmal\u0131"
                                        ),
                                        React.createElement(
                                            "li",
                                            null,
                                            "Kullan\u0131c\u0131 ad\u0131 sadece b\xFCy\xFCk-k\xFC\xE7\xFCk harflerden, bo\u015Fluktan ve rakamlardan olu\u015Fmal\u0131"
                                        )
                                    )
                                ) : "",
                                React.createElement(
                                    "div",
                                    { className: "field signupInput" },
                                    React.createElement(
                                        "label",
                                        null,
                                        "Parola"
                                    ),
                                    React.createElement("input", { type: "password", name: "password", placeholder: "parola", value: this.state.passwordText, onChange: this.changePassword })
                                ),
                                this.state.passwordPatternWarn ? React.createElement(BasicMessageWithColor, { color: "yellow", message: "Parola uzunluğu [10-40] karakter olmalı" }) : "",
                                React.createElement(
                                    "div",
                                    { className: "field signupInput" },
                                    React.createElement(
                                        "label",
                                        null,
                                        "Parola Tekrar"
                                    ),
                                    React.createElement("input", { type: "password", name: "password", placeholder: "parola tekrar", value: this.state.passwordVerificationText, onChange: this.changePasswordVerification })
                                ),
                                this.state.passwordVerificationWarn ? React.createElement(BasicMessageWithColor, { color: "yellow", message: "Parola Tekrarı İle Aynı Değil" }) : "",
                                this.state.message ? React.createElement(BasicMessageWithColor, { color: this.state.messageColor, message: this.state.message }) : ""
                            )
                        )
                    ),
                    React.createElement(
                        Row,
                        { size: "sixteen" },
                        React.createElement(WideColumn, { size: "four" }),
                        React.createElement(
                            WideColumn,
                            { size: "eight" },
                            React.createElement(
                                FloatRight,
                                null,
                                React.createElement(
                                    "button",
                                    { className: "ui primary button", type: "submit", onClick: this.signUpClick },
                                    "\xDCye Ol"
                                )
                            )
                        )
                    )
                );
            } else if (this.state.form == "loading") {
                return React.createElement(
                    Row,
                    { size: "one" },
                    React.createElement(
                        Column,
                        null,
                        React.createElement(RowLoadingSpin, { nonSegment: true })
                    )
                );
            } else if (this.state.form == "success") {
                return React.createElement(
                    Row,
                    { size: "one" },
                    React.createElement(
                        Column,
                        null,
                        React.createElement(
                            "div",
                            { className: "ui positive message" },
                            React.createElement(
                                "div",
                                { className: "header" },
                                "Ba\u015Far\u0131l\u0131"
                            ),
                            React.createElement(
                                "p",
                                null,
                                "Ba\u015Far\u0131l\u0131 bir \u015Fekilde \xFCye oldunuz, giri\u015F yapabilirsiniz"
                            )
                        )
                    )
                );
            }
        }
    }]);

    return Signup;
}(React.Component);