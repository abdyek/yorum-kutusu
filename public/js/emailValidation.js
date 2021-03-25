var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EmailValidation = function (_React$Component) {
    _inherits(EmailValidation, _React$Component);

    function EmailValidation(props) {
        _classCallCheck(this, EmailValidation);

        var _this = _possibleConstructorReturn(this, (EmailValidation.__proto__ || Object.getPrototypeOf(EmailValidation)).call(this, props));

        _this.state = {
            // normal, loading, success
            form: _this.props.validated === false ? "normal" : "none",
            topMessage: null,
            code: ""
        };
        _this.changeCode = _this.changeCode.bind(_this);
        _this.verify = _this.verify.bind(_this);
        _this.sendAgain = _this.sendAgain.bind(_this);
        _this.showTopMessage = _this.showTopMessage.bind(_this);
        _this.goHome = _this.goHome.bind(_this);
        return _this;
    }

    _createClass(EmailValidation, [{
        key: "changeCode",
        value: function changeCode(e) {
            this.setState({
                code: e.target.value
            });
        }
    }, {
        key: "verify",
        value: function verify() {
            var _this2 = this;

            // put
            this.setState({
                form: "loading"
            });
            fetch(SITEURL + 'api/confirmEmail', {
                method: 'PUT',
                header: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    confirmCode: this.state.code
                })
            }).then(function (response) {
                if (!response.ok) throw new Error(response.status);else return response.json();
            }).then(function (json) {
                _this2.setState({
                    form: "success"
                });
            }).catch(function (error) {
                _this2.setState({
                    form: "normal"
                });
                if (error.message == 404) {
                    _this2.showTopMessage('warning', 'Yanlış doğrulama kodu');
                } else if (error.message == 401) {
                    _this2.showTopMessage('warning', 'Yeni bir doğrulama e-postası isteyin. Çok fazla hatalı giriş yaptınız!');
                }
                // hatalar
            });
        }
    }, {
        key: "sendAgain",
        value: function sendAgain() {
            var _this3 = this;

            // post
            this.setState({
                form: "loading"
            });
            fetch(SITEURL + 'api/confirmEmail', {
                method: 'POST',
                header: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            }).then(function (response) {
                if (!response.ok) throw new Error(response.status);else return response.json();
            }).then(function (json) {
                _this3.showTopMessage('success', 'E-posta başarılı bir şekilde gönderildi');
                _this3.setState({
                    form: "normal"
                });
            }).catch(function (error) {
                _this3.setState({
                    form: "normal"
                });
                if (error.message == 422) {
                    _this3.showTopMessage('success', 'Hali hazırda e-posta doğrulaması yapılmış');
                }
            });
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
        key: "goHome",
        value: function goHome(e) {
            e.preventDefault();
            this.props.changeContent(" ", true);
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.form == "normal") {
                return React.createElement(
                    Row,
                    { size: "sixteen" },
                    React.createElement(WideColumn, { size: "four" }),
                    React.createElement(
                        WideColumn,
                        { size: "eight" },
                        React.createElement(
                            RaisedSegment,
                            { otherClass: "comment" },
                            React.createElement(
                                Row,
                                { size: "one" },
                                React.createElement(
                                    Column,
                                    null,
                                    React.createElement(H, { type: "3", text: "E-posta Do\u011Frula" })
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "ui negative message" },
                                React.createElement(
                                    "div",
                                    { className: "header" },
                                    "E-posta Adresiniz Do\u011Frulanmad\u0131"
                                ),
                                React.createElement(
                                    "p",
                                    null,
                                    "E-postan\u0131za g\xF6nderdi\u011Fimiz do\u011Frulama kodu ile e-postan\u0131z\u0131 do\u011Frulayabilirsiniz"
                                )
                            ),
                            this.state.topMessage ? React.createElement(
                                Row,
                                { size: "one" },
                                React.createElement(
                                    Column,
                                    null,
                                    React.createElement(BasicMessage, { type: this.state.topMessage.type, text: this.state.topMessage.text })
                                )
                            ) : "",
                            React.createElement(
                                Row,
                                { size: "one" },
                                React.createElement(
                                    Column,
                                    null,
                                    React.createElement(
                                        "form",
                                        { className: "ui form attached fluid" },
                                        React.createElement(
                                            "div",
                                            { className: "field" },
                                            React.createElement(
                                                "label",
                                                null,
                                                "Do\u011Frulama Kodu"
                                            ),
                                            React.createElement("input", { placeholder: "Do\u011Frulama Kodu", type: "text", value: this.state.code, onChange: this.changeCode })
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
                                        null,
                                        React.createElement(
                                            "button",
                                            { className: "ui teal button", onClick: this.sendAgain },
                                            "Yeniden G\xF6nder"
                                        ),
                                        React.createElement(
                                            FloatRight,
                                            null,
                                            React.createElement(
                                                "button",
                                                { className: "ui primary button", onClick: this.verify },
                                                "Do\u011Frula"
                                            )
                                        )
                                    )
                                )
                            ),
                            this.props.afterLogin ? React.createElement(
                                Row,
                                { size: "one" },
                                React.createElement(
                                    Column,
                                    null,
                                    React.createElement(
                                        Center,
                                        null,
                                        React.createElement(
                                            "a",
                                            { href: "", onClick: this.goHome },
                                            "Bu ad\u0131m\u0131 \u015Fimdilik ge\xE7"
                                        )
                                    )
                                )
                            ) : ""
                        )
                    )
                );
            } else if (this.state.form == "loading") {
                return React.createElement(
                    Row,
                    { size: "sixteen" },
                    React.createElement(WideColumn, { size: "four" }),
                    React.createElement(
                        WideColumn,
                        { size: "eight" },
                        React.createElement(RowLoadingSpin, null)
                    )
                );
            } else if (this.state.form == "success") {
                return React.createElement(
                    Row,
                    { size: "one" },
                    React.createElement(
                        Column,
                        null,
                        React.createElement(BasicMessage, { type: "success", text: "E-posta adresiniz ba\u015Far\u0131l\u0131 bir \u015Fekilde do\u011Fruland\u0131." })
                    )
                );
            } else if (this.state.form == "none") {
                return "";
            }
        }
    }]);

    return EmailValidation;
}(React.Component);