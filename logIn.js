var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// bu kısmı nereden kontrol edeceğime henüz karar vermedim

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));
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

// eğer kullanıcı giriş yapmadıysa burayı göstericez


var LogIn = function (_React$Component2) {
    _inherits(LogIn, _React$Component2);

    function LogIn(props) {
        _classCallCheck(this, LogIn);

        // bind
        var _this2 = _possibleConstructorReturn(this, (LogIn.__proto__ || Object.getPrototypeOf(LogIn)).call(this, props));

        _this2.logInClick = _this2.logInClick.bind(_this2);
        _this2.idChange = _this2.idChange.bind(_this2);
        _this2.passwordChange = _this2.passwordChange.bind(_this2);
        // ^ bind
        _this2.state = {
            id: "",
            password: "",
            loading: false,
            message: ""
        };
        return _this2;
    }

    _createClass(LogIn, [{
        key: "logInClick",
        value: function logInClick(event) {
            this.setState({
                loading: true
            });
            $.ajax({
                type: 'POST',
                url: 'ajax-login',
                data: {
                    "user": {
                        "email_or_username": this.state.id,
                        "password": this.state.password
                    }
                },
                success: function (response) {
                    // başarılı olması durumunda çalışacak fonki
                    // setCookie("jwt",response.jwt,365);
                    console.log(response);
                    this.setState({
                        loading: false
                    });
                    if (response.jwt) {
                        console.log(response);
                        // setCookie("userName", response.username, 365); -> buna ihtiyaç kalmadı artık kullanıcı ismini back-endden çekiyorum
                        window.location.href = 'index';
                    }
                    if (response.message != "") {
                        this.setState({
                            message: React.createElement(ErrorMessageBox, { text: response.message })
                        });
                    }
                }.bind(this),
                dataType: 'json'
            });
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
            if (this.state.loading) {
                return React.createElement(Loading, null);
            }
            return React.createElement(
                Row,
                { size: "sixteen" },
                React.createElement(WideColumn, { size: "four" }),
                React.createElement(
                    WideColumn,
                    { size: "eight" },
                    React.createElement(H, { type: "1", textAlign: "center", text: "Giri\u015F Yap" }),
                    this.state.message,
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
                            React.createElement("input", { type: "text", name: "id", value: this.state.id, onChange: this.idChange, placeholder: "veya Kullan\u0131c\u0131 Ad\u0131" })
                        ),
                        React.createElement(
                            "div",
                            { className: "field" },
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
                                { className: "ui primary button", type: "submit", onClick: this.logInClick },
                                "Giri\u015F Yap"
                            )
                        )
                    )
                )
            );
        }
    }]);

    return LogIn;
}(React.Component);

var SignUp = function (_React$Component3) {
    _inherits(SignUp, _React$Component3);

    function SignUp() {
        _classCallCheck(this, SignUp);

        return _possibleConstructorReturn(this, (SignUp.__proto__ || Object.getPrototypeOf(SignUp)).apply(this, arguments));
    }

    _createClass(SignUp, [{
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
                            "Hesab\u0131n m\u0131 yok?",
                            React.createElement("br", null),
                            React.createElement(
                                "a",
                                { href: "uyeOl" },
                                "\u015Eimdi \xDCye ol"
                            )
                        )
                    )
                )
            );
        }
    }]);

    return SignUp;
}(React.Component);

var ErrorMessageBox = function (_React$Component4) {
    _inherits(ErrorMessageBox, _React$Component4);

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

var UserArea = function (_React$Component5) {
    _inherits(UserArea, _React$Component5);

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

var Content = function (_React$Component6) {
    _inherits(Content, _React$Component6);

    function Content(props) {
        _classCallCheck(this, Content);

        return _possibleConstructorReturn(this, (Content.__proto__ || Object.getPrototypeOf(Content)).call(this, props));
    }

    _createClass(Content, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(LogIn, null),
                React.createElement(SignUp, null)
            );
        }
    }]);

    return Content;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));