var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App() {
        _classCallCheck(this, App);

        return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
    }

    _createClass(App, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(Header, null),
                React.createElement(Content, null),
                React.createElement(Footer, null)
            );
        }
    }]);

    return App;
}(React.Component);

var Content = function (_React$Component2) {
    _inherits(Content, _React$Component2);

    function Content(props) {
        _classCallCheck(this, Content);

        var _this2 = _possibleConstructorReturn(this, (Content.__proto__ || Object.getPrototypeOf(Content)).call(this, props));

        _this2.state = {
            form: "normal",
            emailText: "",
            usernameText: "",
            passwordText: "",
            passwordVerificationText: "",
            /*
            error:[
                "Kullanıcı adı hali hazırda kullanılmakta",
                "E-mail hali hazırda kullanılmakta",
                "Şifre çok kısa (en az 6 karakter)",
                "Şifre en az 1 rakam ve 1 harf içermelidir"
            ]
            */
            error: null
        };
        _this2.signUpClick = _this2.signUpClick.bind(_this2);
        _this2.changeEmail = _this2.changeEmail.bind(_this2);
        _this2.changeUsername = _this2.changeUsername.bind(_this2);
        _this2.changePassword = _this2.changePassword.bind(_this2);
        _this2.changePasswordVerification = _this2.changePasswordVerification.bind(_this2);
        return _this2;
    }

    _createClass(Content, [{
        key: "signUpClick",
        value: function signUpClick(e) {
            if (this.state.passwordText != this.state.passwordVerificationText) {
                this.setState({
                    error: ["Parola tekrarı ile uyumlu değil!"]
                });
            } else {
                // API'ye gönderme işini buraya yapıyoruz
                // this.state.error 'u null a eşitleyince hata mesajı görünmüyor,
                // API'den gelen error'un valuesunu doğrudan this.state.error'a eşitle
                // eğer başarılı bir şekilde hesap oluşturulmuşsa giriş sayfasına yönlendirip orada "üyelik işleminiz başarılı" diye bir mesaj verilebilir
            }
            e.preventDefault();
        }
    }, {
        key: "changeEmail",
        value: function changeEmail(e) {
            this.setState({
                emailText: e.target.value
            });
        }
    }, {
        key: "changeUsername",
        value: function changeUsername(e) {
            this.setState({
                usernameText: e.target.value
            });
        }
    }, {
        key: "changePassword",
        value: function changePassword(e) {
            this.setState({
                passwordText: e.target.value
            });
        }
    }, {
        key: "changePasswordVerification",
        value: function changePasswordVerification(e) {
            this.setState({
                passwordVerificationText: e.target.value
            });
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.error) {
                this.errorMessageContent = [];
                for (var i = 0; i < this.state.error.length; i++) {
                    this.errorMessageContent.push(React.createElement(
                        "li",
                        { key: i },
                        this.state.error[i]
                    ));
                }
            }
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
                        React.createElement(H, { type: "1", textAlign: "center", text: "\xDCye Ol" }),
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
                                React.createElement("input", { type: "text", name: "id", placeholder: "e-posta", value: this.state.emailText, onChange: this.changeEmail })
                            ),
                            React.createElement(
                                "div",
                                { className: "field" },
                                React.createElement(
                                    "label",
                                    null,
                                    "Kullan\u0131c\u0131 Ad\u0131"
                                ),
                                React.createElement("input", { type: "text", name: "id", placeholder: "kullan\u0131c\u0131 ad\u0131", value: this.state.usernameText, onChange: this.changeUsername })
                            ),
                            React.createElement(
                                "div",
                                { className: "field" },
                                React.createElement(
                                    "label",
                                    null,
                                    "Parola"
                                ),
                                React.createElement("input", { type: "password", name: "password", placeholder: "parola", value: this.state.passwordText, onChange: this.changePassword })
                            ),
                            React.createElement(
                                "div",
                                { className: "field" },
                                React.createElement(
                                    "label",
                                    null,
                                    "Parola Tekrar"
                                ),
                                React.createElement("input", { type: "password", name: "password", placeholder: "parola tekrar", value: this.state.passwordVerificationText, onChange: this.changePasswordVerification })
                            )
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
                        this.state.error ? React.createElement(
                            "div",
                            { className: "ui error message" },
                            React.createElement(
                                "div",
                                { className: "header" },
                                "\xDCyelik i\xE7in bu ko\u015Fullar\u0131 sa\u011Flaman\u0131z gerekiyor"
                            ),
                            React.createElement(
                                "ul",
                                { className: "list" },
                                this.errorMessageContent
                            )
                        ) : ""
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
        }
    }]);

    return Content;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));