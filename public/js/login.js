var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// eğer kullanıcı giriş yapmadıysa burayı göstericez
var LogIn = function (_React$Component) {
    _inherits(LogIn, _React$Component);

    function LogIn(props) {
        _classCallCheck(this, LogIn);

        // bind
        var _this = _possibleConstructorReturn(this, (LogIn.__proto__ || Object.getPrototypeOf(LogIn)).call(this, props));

        _this.changeContent = _this.changeContent.bind(_this);
        _this.login = _this.login.bind(_this);
        _this.logInClick = _this.logInClick.bind(_this);
        _this.idChange = _this.idChange.bind(_this);
        _this.passwordChange = _this.passwordChange.bind(_this);
        // ^ bind
        _this.state = {
            id: "",
            password: "",
            success: false,
            loading: false,
            message: "",
            messageColor: ""
        };
        return _this;
    }

    _createClass(LogIn, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            if (isMember()) {
                this.props.changeContent(' ', true);
            }
        }
    }, {
        key: "changeContent",
        value: function changeContent(e) {
            e.preventDefault();
            this.props.changeContent(e.target.href);
        }
    }, {
        key: "login",
        value: function login() {
            var _this2 = this;

            fetch(SITEURL + 'api/login', {
                method: 'POST',
                header: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: this.state.id,
                    password: this.state.password
                })
            }).then(function (response) {
                if (!response.ok) throw new Error(response.status);else return response.json();
            }).then(function (json) {
                _this2.setState({
                    loading: false,
                    success: true
                });
                var hash = btoa({
                    'userID': json.userID,
                    'unreadComments': 0
                });
                setCookie('user', hash);
                _this2.props.changeHeader("user-empty-unread");
                setTimeout(function () {
                    _this2.props.changeContent(' ', true);
                }, 2000);
            }).catch(function (error) {
                if (error.message == 401) {
                    _this2.setState({
                        loading: false,
                        message: "E-posta ile parola uyumsuz",
                        messageColor: "red"
                    });
                } else if (error.message == 403) {
                    _this2.setState({
                        loading: false,
                        message: "Zaten giriş yapılmış!",
                        messageColor: "red"
                    });
                }
            });
        }
    }, {
        key: "logInClick",
        value: function logInClick(event) {
            this.setState({
                loading: true
            });
            this.login();
            event.preventDefault();
        }
    }, {
        key: "idChange",
        value: function idChange(event) {
            this.setState({
                id: event.target.value
            });
        }
    }, {
        key: "passwordChange",
        value: function passwordChange(event) {
            this.setState({
                password: event.target.value
            });
        }
    }, {
        key: "render",
        value: function render() {
            document.title = "Giriş Yap";
            if (this.state.success) {
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
                            React.createElement(
                                "div",
                                { "class": "ui blue message" },
                                React.createElement(
                                    "div",
                                    { "class": "header" },
                                    "Ba\u015Far\u0131l\u0131 bir \u015Fekilde giri\u015F yapt\u0131n\u0131z"
                                ),
                                "Bir ka\xE7 saniye i\xE7erisinde ana sayfaya y\xF6nlendirileceksiniz"
                            )
                        )
                    )
                );
            }
            if (this.state.loading) {
                return React.createElement(RowLoadingSpin, { nonSegment: true });
            } else {
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
                            this.state.message ? React.createElement(
                                "div",
                                { "class": "ui " + this.state.messageColor + " message" },
                                this.state.message
                            ) : "",
                            React.createElement(
                                "form",
                                { className: "ui form" },
                                React.createElement(
                                    "div",
                                    { className: "field loginInput" },
                                    React.createElement(
                                        "label",
                                        null,
                                        "E-posta"
                                    ),
                                    React.createElement("input", { type: "text", name: "id", value: this.state.id, onChange: this.idChange, placeholder: "E-posta" })
                                ),
                                React.createElement(
                                    "div",
                                    { className: "field loginInput" },
                                    React.createElement(
                                        "label",
                                        null,
                                        "Parola"
                                    ),
                                    React.createElement("input", { type: "password", name: "password", value: this.state.password, onChange: this.passwordChange, placeholder: "Parola" })
                                ),
                                React.createElement(
                                    FloatRight,
                                    null,
                                    React.createElement(
                                        "button",
                                        { className: "ui teal button", type: "submit", onClick: this.logInClick },
                                        "Giri\u015F Yap"
                                    )
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
                                React.createElement(
                                    "div",
                                    { className: "haveAccount" },
                                    "Hesab\u0131n m\u0131 yok?",
                                    React.createElement("br", null),
                                    React.createElement(
                                        "a",
                                        { href: "uye-ol", onClick: this.changeContent },
                                        "\u015Eimdi \xDCye ol"
                                    )
                                )
                            )
                        )
                    )
                );
            }
        }
    }]);

    return LogIn;
}(React.Component);

var SignUp = function (_React$Component2) {
    _inherits(SignUp, _React$Component2);

    function SignUp(props) {
        _classCallCheck(this, SignUp);

        var _this3 = _possibleConstructorReturn(this, (SignUp.__proto__ || Object.getPrototypeOf(SignUp)).call(this, props));

        _this3.changeContent = _this3.changeContent.bind(_this3);
        return _this3;
    }

    _createClass(SignUp, [{
        key: "changeContent",
        value: function changeContent(e) {
            e.preventDefault();
            this.props.changeContent(e.target.href);
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
                        React.createElement(
                            Center,
                            null,
                            React.createElement(
                                "div",
                                { className: "haveAccount" },
                                "Hesab\u0131n m\u0131 yok?",
                                React.createElement("br", null),
                                React.createElement(
                                    "a",
                                    { href: "uye-ol", onClick: this.changeContent },
                                    "\u015Eimdi \xDCye ol"
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return SignUp;
}(React.Component);

var ErrorMessageBox = function (_React$Component3) {
    _inherits(ErrorMessageBox, _React$Component3);

    function ErrorMessageBox() {
        _classCallCheck(this, ErrorMessageBox);

        return _possibleConstructorReturn(this, (ErrorMessageBox.__proto__ || Object.getPrototypeOf(ErrorMessageBox)).apply(this, arguments));
    }

    _createClass(ErrorMessageBox, [{
        key: "render",
        value: function render() {
            if (this.props.text == undefined) {
                return React.createElement("div", null);
            }
            return React.createElement(
                "div",
                { className: "ui red message" },
                this.props.text
            );
        }
    }]);

    return ErrorMessageBox;
}(React.Component);

var UserArea = function (_React$Component4) {
    _inherits(UserArea, _React$Component4);

    function UserArea() {
        _classCallCheck(this, UserArea);

        return _possibleConstructorReturn(this, (UserArea.__proto__ || Object.getPrototypeOf(UserArea)).apply(this, arguments));
    }

    _createClass(UserArea, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                "Kullan\u0131c\u0131 ayarlar\u0131 ve di\u011Fer \u015Feyler"
            );
        }
    }]);

    return UserArea;
}(React.Component);

var Head = function (_React$Component5) {
    _inherits(Head, _React$Component5);

    function Head() {
        _classCallCheck(this, Head);

        return _possibleConstructorReturn(this, (Head.__proto__ || Object.getPrototypeOf(Head)).apply(this, arguments));
    }

    _createClass(Head, [{
        key: "render",
        value: function render() {
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
                        React.createElement(
                            "h1",
                            { className: "girisYapHeader textAlignCenter" },
                            "Giri\u015F Yap"
                        )
                    )
                )
            );
        }
    }]);

    return Head;
}(React.Component);

var Login = function (_React$Component6) {
    _inherits(Login, _React$Component6);

    function Login(props) {
        _classCallCheck(this, Login);

        return _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this, props));
    }

    _createClass(Login, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(Head, null),
                React.createElement(LogIn, { changeContent: this.props.changeContent, changeHeader: this.props.changeHeader })
            );
        }
    }]);

    return Login;
}(React.Component);