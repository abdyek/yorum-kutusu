var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ForgotMyPassword = function (_React$Component) {
    _inherits(ForgotMyPassword, _React$Component);

    function ForgotMyPassword(props) {
        _classCallCheck(this, ForgotMyPassword);

        var _this = _possibleConstructorReturn(this, (ForgotMyPassword.__proto__ || Object.getPrototypeOf(ForgotMyPassword)).call(this, props));

        var email = fetchUrlParValue('email');
        var username = fetchUrlParValue('username');
        var recoveryCode = fetchUrlParValue('recoveryCode');
        var form = "sendEmailButton";
        _this.fromUrl = false;
        if (email != null && username != null && recoveryCode != null) {
            form = "normal";
            _this.fromUrl = true;
        }
        _this.state = {
            form: form, // sendEmailButton, normal, loading, success
            email: email ? email : "",
            username: username ? username : "",
            recoveryCode: recoveryCode ? recoveryCode : "",
            password: "",
            passwordAgain: "",
            emailPatternWarn: false,
            passwordWarn: false,
            passwordAgainWarn: false,
            responseVisible: false,
            responseColor: "",
            responseMessage: ""
        };
        _this.sendEmail = _this.sendEmail.bind(_this);
        _this.send = _this.send.bind(_this);
        _this.goLogin = _this.goLogin.bind(_this);
        _this.changeEmail = _this.changeEmail.bind(_this);
        _this.changeUsername = _this.changeUsername.bind(_this);
        _this.changeRecoveryCode = _this.changeRecoveryCode.bind(_this);
        _this.changePassword = _this.changePassword.bind(_this);
        _this.changePasswordAgain = _this.changePasswordAgain.bind(_this);
        _this.setResponseMessage = _this.setResponseMessage.bind(_this);
        _this.goBack = _this.goBack.bind(_this);
        return _this;
    }

    _createClass(ForgotMyPassword, [{
        key: 'sendEmail',
        value: function sendEmail() {
            var _this2 = this;

            if (this.state.emailPatternWarn || this.state.email.length === 0 || this.state.username.length === 0) {
                this.setState({
                    emailPatternWarn: true
                });
                return;
            }
            this.setState({
                form: "loading" // loading
            });
            fetch(SITEURL + 'api/forgotMyPassword', {
                method: 'POST',
                header: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    eMail: this.state.email,
                    username: this.state.username
                })
            }).then(function (response) {
                if (!response.ok) throw new Error(response.status);else return response.json();
            }).then(function (json) {
                _this2.setState({
                    form: "normal",
                    responseVisible: false
                });
            }).catch(function (error) {
                if (error.message == 403) {
                    _this2.setResponseMessage("red", "Bu işlem için yetkiniz yok");
                    _this2.setState({
                        form: "sendEmailButton"
                    });
                }
            });
        }
    }, {
        key: 'send',
        value: function send() {
            var _this3 = this;

            if (this.state.passwordWarn || this.state.passwordAgainWarn || this.state.password.length === 0 || this.state.passwordAgain.length === 0) {
                this.setState({
                    passwordWarn: true
                });
                return;
            }
            this.setState({
                form: "loading"
            });
            fetch(SITEURL + 'api/forgotMyPassword', {
                method: 'PUT',
                header: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    eMail: this.state.email,
                    username: this.state.username,
                    recoveryCode: this.state.recoveryCode,
                    newPassword: this.state.password
                })
            }).then(function (response) {
                if (!response.ok) throw new Error(response.status);else return response.json();
            }).then(function (json) {
                _this3.setState({
                    form: "success"
                });
            }).catch(function (error) {
                var form = void 0;
                if (error.message == 403) {
                    _this3.setResponseMessage("red", "Bu işlem için yetkiniz yok");
                    form = "normal";
                } else if (error.message == 404) {
                    _this3.setResponseMessage("red", "Geçersiz Kod");
                    form = "normal";
                } else if (error.message == 401) {
                    _this3.setResponseMessage("red", "3 defa hatalı kod girişi yaptınız. Yeni bir kurtarma e-postası isteyin");
                    form = _this3.fromUrl ? "normal" : "sendEmailButton";
                }
                _this3.setState({
                    form: form
                });
            });
        }
    }, {
        key: 'goLogin',
        value: function goLogin(e) {
            e.preventDefault();
            this.props.changeContent('giris-yap', true);
        }
    }, {
        key: 'changeEmail',
        value: function changeEmail(e) {
            this.setState({
                email: e.target.value,
                emailPatternWarn: !validateEmail(e.target.value)
            });
        }
    }, {
        key: 'changeUsername',
        value: function changeUsername(e) {
            this.setState({
                username: e.target.value
            });
        }
    }, {
        key: 'changeRecoveryCode',
        value: function changeRecoveryCode(e) {
            this.setState({
                recoveryCode: e.target.value
            });
        }
    }, {
        key: 'changePassword',
        value: function changePassword(e) {
            var len = e.target.value.length;
            var showWarn = false;
            if (len < 10 || len > 40) {
                showWarn = true;
            }
            this.setState({
                password: e.target.value,
                passwordWarn: showWarn
            });
        }
    }, {
        key: 'changePasswordAgain',
        value: function changePasswordAgain(e) {
            var password = this.state.password;
            this.setState({
                passwordAgain: e.target.value,
                passwordAgainWarn: password != e.target.value
            });
        }
    }, {
        key: 'setResponseMessage',
        value: function setResponseMessage(color, message) {
            this.setState({
                responseVisible: true,
                responseColor: color,
                responseMessage: message
            });
        }
    }, {
        key: 'goBack',
        value: function goBack() {
            this.setState({
                responseVisible: false,
                form: "sendEmailButton"
            });
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.state.form == "sendEmailButton") {
                return React.createElement(
                    Row,
                    { size: 'sixteen' },
                    React.createElement(WideColumn, { size: 'four' }),
                    React.createElement(
                        WideColumn,
                        { size: 'eight' },
                        React.createElement(ForgotMyPasswordHeader, null),
                        React.createElement(
                            Row,
                            { size: 'one' },
                            React.createElement(
                                Column,
                                null,
                                React.createElement(
                                    'form',
                                    { className: 'ui form' },
                                    React.createElement(
                                        'div',
                                        { className: 'field' },
                                        React.createElement(
                                            'label',
                                            null,
                                            'E-posta'
                                        ),
                                        React.createElement('input', { type: 'email', name: 'e-posta', placeholder: 'E-posta', value: this.state.email, onChange: this.changeEmail })
                                    ),
                                    this.state.emailPatternWarn ? React.createElement(BasicMessageWithColor, { color: 'yellow', message: 'Ge\xE7ersiz E-posta' }) : "",
                                    React.createElement(
                                        'div',
                                        { className: 'field' },
                                        React.createElement(
                                            'label',
                                            null,
                                            'Kullan\u0131c\u0131 Ad\u0131'
                                        ),
                                        React.createElement('input', { type: 'text', name: 'kullanici-adi', placeholder: 'Kullan\u0131c\u0131 Ad\u0131', value: this.state.username, onChange: this.changeUsername })
                                    )
                                )
                            )
                        ),
                        this.state.responseVisible ? React.createElement(
                            Row,
                            { size: 'one' },
                            React.createElement(
                                Column,
                                null,
                                React.createElement(BasicMessageWithColor, { color: this.state.responseColor, message: this.state.responseMessage })
                            )
                        ) : "",
                        React.createElement(
                            Row,
                            { size: 'one' },
                            React.createElement(
                                Column,
                                null,
                                React.createElement(
                                    Center,
                                    null,
                                    React.createElement(Button, { type: 'green big', name: 'Kurtarma E-postas\u0131 G\xF6nder', click: this.sendEmail })
                                )
                            )
                        )
                    ),
                    React.createElement(WideColumn, { size: 'four' })
                );
            } else if (this.state.form == "normal") {
                return React.createElement(
                    Row,
                    { size: 'sixteen' },
                    React.createElement(WideColumn, { size: 'four' }),
                    React.createElement(
                        WideColumn,
                        { size: 'eight' },
                        React.createElement(ForgotMyPasswordHeader, null),
                        React.createElement(
                            Row,
                            { size: 'one' },
                            React.createElement(
                                Column,
                                null,
                                React.createElement(
                                    'form',
                                    { className: 'ui form' },
                                    React.createElement(
                                        'div',
                                        { className: 'field' },
                                        React.createElement(
                                            'label',
                                            null,
                                            'E-posta'
                                        ),
                                        React.createElement('input', { type: 'email', name: 'e-posta', placeholder: 'E-posta', value: this.state.email, disabled: true })
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'field' },
                                        React.createElement(
                                            'label',
                                            null,
                                            'Kullan\u0131c\u0131 Ad\u0131'
                                        ),
                                        React.createElement('input', { type: 'text', name: 'kullanici-adi', placeholder: 'Kullan\u0131c\u0131 Ad\u0131', value: this.state.username, disabled: true })
                                    ),
                                    this.fromUrl === false ? React.createElement(Message, { header: 'E-posta kutunuzu kontrol edin', message: 'E-posta ve kullan\u0131c\u0131 ad\u0131n\u0131z\u0131 eksiksiz yazd\u0131ysan\u0131z kurtarma e-postas\u0131 sorunsuz bir \u015Fekilde ula\u015Facakt\u0131r' }) : "",
                                    React.createElement(
                                        'div',
                                        { className: 'field' },
                                        React.createElement(
                                            'label',
                                            null,
                                            'Kurtarma Kodu'
                                        ),
                                        React.createElement('input', { type: 'text', name: 'kurtarma-kodu', placeholder: 'Kurtarma Kodu', value: this.state.recoveryCode, onChange: this.changeRecoveryCode, disabled: this.fromUrl })
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'field' },
                                        React.createElement(
                                            'label',
                                            null,
                                            'Yeni Parola'
                                        ),
                                        React.createElement('input', { type: 'password', name: 'parola', placeholder: 'Parola', value: this.state.password, onChange: this.changePassword })
                                    ),
                                    this.state.passwordWarn ? React.createElement(BasicMessageWithColor, { color: 'yellow', message: 'Parola uzunlu\u011Fu [10-40] karakter olmal\u0131' }) : "",
                                    React.createElement(
                                        'div',
                                        { className: 'field' },
                                        React.createElement(
                                            'label',
                                            null,
                                            'Yeni Parola Tekrar'
                                        ),
                                        React.createElement('input', { type: 'password', name: 'parola-tekrar', placeholder: 'Parola Tekrar', value: this.state.passwordAgain, onChange: this.changePasswordAgain })
                                    ),
                                    this.state.passwordAgainWarn ? React.createElement(BasicMessageWithColor, { color: 'yellow', message: 'Parola tekrar\u0131 ile ayn\u0131 de\u011Fil' }) : ""
                                ),
                                this.state.responseVisible ? React.createElement(
                                    Row,
                                    { size: 'one' },
                                    React.createElement(
                                        Column,
                                        null,
                                        React.createElement(BasicMessageWithColor, { color: this.state.responseColor, message: this.state.responseMessage })
                                    )
                                ) : "",
                                React.createElement(
                                    Row,
                                    { size: 'two' },
                                    React.createElement(
                                        Column,
                                        null,
                                        this.fromUrl === false ? React.createElement(Button, { type: 'teal', name: 'D\xFCzenle', click: this.goBack }) : ""
                                    ),
                                    React.createElement(
                                        Column,
                                        null,
                                        React.createElement(
                                            FloatRight,
                                            null,
                                            React.createElement(Button, { type: 'green', name: 'De\u011Fi\u015Ftir', click: this.send })
                                        )
                                    )
                                )
                            )
                        )
                    ),
                    React.createElement(WideColumn, { size: 'four' })
                );
            } else if (this.state.form == "loading") {
                return React.createElement(RowLoadingSpin, { nonSegment: true });
            } else if (this.state.form == "success") {
                return React.createElement(
                    Row,
                    { size: 'sixteen' },
                    React.createElement(WideColumn, { size: 'four' }),
                    React.createElement(
                        WideColumn,
                        { size: 'eight' },
                        React.createElement(
                            Row,
                            { size: 'one' },
                            React.createElement(
                                Column,
                                null,
                                React.createElement(Message, { header: 'Ba\u015Far\u0131l\u0131', message: 'Ba\u015Far\u0131l\u0131 bir \u015Fekilde parola s\u0131f\u0131rland\u0131. Giri\u015F yapabilirsiniz' })
                            )
                        ),
                        React.createElement(
                            Row,
                            { size: 'one' },
                            React.createElement(
                                Column,
                                null,
                                React.createElement(
                                    Center,
                                    null,
                                    React.createElement(Button, { type: 'green', name: 'Giri\u015F Yap', click: this.goLogin })
                                )
                            )
                        )
                    ),
                    React.createElement(WideColumn, { size: 'four' })
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
        key: 'render',
        value: function render() {
            return React.createElement(
                Row,
                { size: 'one' },
                React.createElement(
                    Column,
                    null,
                    React.createElement(H, { type: '1', text: 'Parolam\u0131 Unuttum', id: "forgotMyPasswordHeader", textAlign: "center" })
                )
            );
        }
    }]);

    return ForgotMyPasswordHeader;
}(React.Component);