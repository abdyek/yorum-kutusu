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
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
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
        _this2.rememberMeToggle = _this2.rememberMeToggle.bind(_this2);
        _this2.onChangeHandler = _this2.onChangeHandler.bind(_this2);
        _this2.idChange = _this2.idChange.bind(_this2);
        _this2.passwordChange = _this2.passwordChange.bind(_this2);
        // ^ bind
        _this2.state = {
            rememberMeCheched: true,
            message: ""
        };
        return _this2;
    }

    _createClass(LogIn, [{
        key: 'logInClick',
        value: function logInClick(event) {
            $.ajax({
                type: 'POST',
                url: 'ajax-login',
                data: {
                    "user": {
                        "email_or_username": this.props.id,
                        "password": this.props.password
                    }
                },
                success: function (response) {
                    if (response["message"]) {
                        console.log("işte şimdi bittiniz");
                        alert(response["message"]);
                        this.setState({
                            message: response["message"]
                        });
                    } else {
                        console.log("helal olsun kanka giriş yaptın");
                    }
                    this.props.came();
                }.bind(this),
                dataType: 'json'
            });
            this.props.sent();
            event.preventDefault();
        }
    }, {
        key: 'rememberMeToggle',
        value: function rememberMeToggle() {
            if (this.state.rememberMeCheched) {
                this.setState({
                    rememberMeCheched: false
                });
            } else {
                this.setState({
                    rememberMeCheched: true
                });
            }
        }
    }, {
        key: 'onChangeHandler',
        value: function onChangeHandler() {
            /*
                bu fonksiyonun bütün olayı react'ın "bilader checked'i state e bağladın ama onChange 'e bir şey bağlamadın" uyarısına karşılık
                "yaa react kardeş çok rahat konuşuyordun" demektir
            */
        }
    }, {
        key: 'idChange',
        value: function idChange(event) {
            this.props.idChangeHandler(event.target.value);
        }
    }, {
        key: 'passwordChange',
        value: function passwordChange(event) {
            this.props.passwordChangeHandler(event.target.value);
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                Row,
                { size: 'sixteen' },
                React.createElement(WideColumn, { size: 'four' }),
                React.createElement(
                    WideColumn,
                    { size: 'eight' },
                    React.createElement(H, { type: '1', textAlign: 'center', text: 'Giri\u015F Yap' }),
                    this.props.message,
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
                            React.createElement('input', { type: 'text', name: 'id', value: this.props.id, onChange: this.idChange, placeholder: 'veya Kullan\u0131c\u0131 Ad\u0131' })
                        ),
                        React.createElement(
                            'div',
                            { className: 'field' },
                            React.createElement(
                                'label',
                                null,
                                'Parola'
                            ),
                            React.createElement('input', { type: 'password', name: 'password', value: this.props.password, onChange: this.passwordChange, placeholder: 'Parola' })
                        ),
                        React.createElement(
                            'div',
                            { className: 'field' },
                            React.createElement(
                                'div',
                                { className: 'ui checkbox', onClick: this.rememberMeToggle },
                                React.createElement('input', { type: 'checkbox', onChange: this.onChangeHandler, checked: this.state.rememberMeCheched, tabIndex: '0', className: 'hidden' }),
                                React.createElement(
                                    'label',
                                    null,
                                    'Beni Hat\u0131rla'
                                )
                            )
                        ),
                        React.createElement(
                            FloatRight,
                            null,
                            React.createElement(
                                'button',
                                { className: 'ui primary button', type: 'submit', onClick: this.logInClick },
                                'Giri\u015F Yap'
                            )
                        )
                    )
                )
            );
        }
    }]);

    return LogIn;
}(React.Component);

var UserArea = function (_React$Component3) {
    _inherits(UserArea, _React$Component3);

    function UserArea() {
        _classCallCheck(this, UserArea);

        return _possibleConstructorReturn(this, (UserArea.__proto__ || Object.getPrototypeOf(UserArea)).apply(this, arguments));
    }

    _createClass(UserArea, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                'Kullan\u0131c\u0131 ayarlar\u0131 ve di\u011Fer \u015Feyler'
            );
        }
    }]);

    return UserArea;
}(React.Component);

var Content = function (_React$Component4) {
    _inherits(Content, _React$Component4);

    function Content(props) {
        _classCallCheck(this, Content);

        var _this4 = _possibleConstructorReturn(this, (Content.__proto__ || Object.getPrototypeOf(Content)).call(this, props));

        _this4.state = {
            id: "",
            password: "",
            sent: false
        };
        _this4.showLoading = _this4.showLoading.bind(_this4);
        _this4.showLogin = _this4.showLogin.bind(_this4);
        _this4.changeId = _this4.changeId.bind(_this4);
        _this4.changePassword = _this4.changePassword.bind(_this4);
        return _this4;
    }

    _createClass(Content, [{
        key: 'showLoading',
        value: function showLoading() {
            this.setState({
                sent: true
            });
        }
    }, {
        key: 'showLogin',
        value: function showLogin() {
            this.setState({
                sent: false
            });
        }
    }, {
        key: 'changeId',
        value: function changeId(value) {
            this.setState({
                id: value
            });
        }
    }, {
        key: 'changePassword',
        value: function changePassword(value) {
            this.setState({
                password: value
            });
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.state.sent) {
                this.page = React.createElement(Loading, null);
            } else {
                this.page = React.createElement(LogIn, {
                    sent: this.showLoading,
                    came: this.showLogin,
                    id: this.state.id,
                    password: this.state.password,
                    idChangeHandler: this.changeId,
                    passwordChangeHandler: this.changePassword,
                    message: "falan"
                });
            }
            return React.createElement(
                'div',
                null,
                this.page
            );
        }
    }]);

    return Content;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));