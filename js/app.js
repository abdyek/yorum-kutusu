var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Menu = function (_React$Component) {
    _inherits(Menu, _React$Component);

    function Menu(props) {
        _classCallCheck(this, Menu);

        var _this = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this, props));

        _this.userName = "Yunus Emre";
        return _this;
    }

    _createClass(Menu, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { id: "menu" },
                React.createElement(
                    FloatRight,
                    null,
                    React.createElement(AccountButton, { userName: this.userName }),
                    React.createElement(LogoutButton, { userName: this.userName })
                )
            );
        }
    }]);

    return Menu;
}(React.Component);

var AccountButton = function (_React$Component2) {
    _inherits(AccountButton, _React$Component2);

    function AccountButton(props) {
        _classCallCheck(this, AccountButton);

        var _this2 = _possibleConstructorReturn(this, (AccountButton.__proto__ || Object.getPrototypeOf(AccountButton)).call(this, props));

        _this2.click = _this2.click.bind(_this2);
        return _this2;
    }

    _createClass(AccountButton, [{
        key: "click",
        value: function click() {
            if (this.props.userName) {
                // kullanıcının hesabına yönlendirme yapılacak
            } else {
                    // Giriş yap sayfasına yönledirme yapılacak
                }
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "button",
                { "class": "ui blue button", onClick: this.click },
                React.createElement(
                    "i",
                    { "class": "icon" },
                    React.createElement("i", { "class": "fa fa-user", "aria-hidden": "true" })
                ),
                this.props.userName == undefined ? React.createElement(
                    "span",
                    null,
                    "Giri\u015F Yap"
                ) : React.createElement(
                    "span",
                    null,
                    "Hesap"
                )
            );
        }
    }]);

    return AccountButton;
}(React.Component);

var LogoutButton = function (_React$Component3) {
    _inherits(LogoutButton, _React$Component3);

    function LogoutButton(props) {
        _classCallCheck(this, LogoutButton);

        return _possibleConstructorReturn(this, (LogoutButton.__proto__ || Object.getPrototypeOf(LogoutButton)).call(this, props));
    }

    _createClass(LogoutButton, [{
        key: "render",
        value: function render() {
            if (this.props.userName) {
                return React.createElement(
                    "button",
                    { "class": "ui icon brown button" },
                    React.createElement(
                        "i",
                        { "class": "icon" },
                        React.createElement("i", { "class": "fa fa-sign-out", "aria-hidden": "true" })
                    )
                );
            } else {
                return React.createElement("span", null);
            }
        }
    }]);

    return LogoutButton;
}(React.Component);

var SearchBar = function (_React$Component4) {
    _inherits(SearchBar, _React$Component4);

    function SearchBar() {
        _classCallCheck(this, SearchBar);

        return _possibleConstructorReturn(this, (SearchBar.__proto__ || Object.getPrototypeOf(SearchBar)).apply(this, arguments));
    }

    _createClass(SearchBar, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { id: "search", className: "ui search" },
                React.createElement("input", { className: "prompt", type: "text", placeholder: "Ara..." })
            );
        }
    }]);

    return SearchBar;
}(React.Component);

var Header = function (_React$Component5) {
    _inherits(Header, _React$Component5);

    function Header() {
        _classCallCheck(this, Header);

        return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
    }

    _createClass(Header, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "header",
                null,
                React.createElement(
                    Row,
                    { withoutContainer: true, size: "one" },
                    React.createElement(
                        Column,
                        null,
                        React.createElement(
                            Row,
                            null,
                            React.createElement(
                                WideColumn,
                                { size: "four" },
                                React.createElement(Logo, null)
                            ),
                            React.createElement(
                                WideColumn,
                                { size: "eight" },
                                React.createElement(SearchBar, null)
                            ),
                            React.createElement(
                                WideColumn,
                                { size: "four" },
                                React.createElement(Menu, null)
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Header;
}(React.Component);

var Footer = function (_React$Component6) {
    _inherits(Footer, _React$Component6);

    function Footer() {
        _classCallCheck(this, Footer);

        return _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).apply(this, arguments));
    }

    _createClass(Footer, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "footer",
                null,
                React.createElement(
                    "div",
                    { className: "ui inverted vertical footer segment" },
                    React.createElement(
                        "div",
                        { className: "ui container" },
                        React.createElement(
                            "div",
                            null,
                            "yorumkutusu.com",
                            React.createElement(
                                FloatRight,
                                null,
                                "\xA9 T\xFCm haklar\u0131 sakl\u0131d\u0131r | 2020"
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Footer;
}(React.Component);

var App = function (_React$Component7) {
    _inherits(App, _React$Component7);

    function App(props) {
        _classCallCheck(this, App);

        return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));
    }

    _createClass(App, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { id: "app" },
                React.createElement(Header, null),
                React.createElement(Content, null),
                React.createElement(Footer, null)
            );
        }
    }]);

    return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));