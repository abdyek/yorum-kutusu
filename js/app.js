var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Menu = function (_React$Component) {
    _inherits(Menu, _React$Component);

    function Menu(props) {
        _classCallCheck(this, Menu);

        var _this = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this, props));

        _this.state = {
            userName: "Yunus Emre",
            userUrl: "yunus-emre",
            unreadComments: 123 /* okunmamış yorumlar */
        };
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
                    this.state.unreadComments ? React.createElement(UnreadComments, { unreadComments: this.state.unreadComments, userUrl: this.state.userUrl }) : React.createElement(AccountButton, { userName: this.state.userName, userUrl: this.state.userUrl }),
                    React.createElement(LogoutButton, { userName: this.state.userName })
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
                this.props.userUrl; // url bir üstten geliyor yönlendirmede kullanırım
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

var UnreadComments = function (_React$Component3) {
    _inherits(UnreadComments, _React$Component3);

    function UnreadComments(props) {
        _classCallCheck(this, UnreadComments);

        var _this3 = _possibleConstructorReturn(this, (UnreadComments.__proto__ || Object.getPrototypeOf(UnreadComments)).call(this, props));

        _this3.goUserProfile = _this3.goUserProfile.bind(_this3);
        return _this3;
    }

    _createClass(UnreadComments, [{
        key: "goUserProfile",
        value: function goUserProfile() {
            // profile takip edilen ürünleri açacak şekilde yönlendirmesi lazım
            this.props.userUrl; // url bir üstten geliyor yönlendirmede kullanırım
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "button",
                { className: "ui blue button", onClick: this.goUserProfile },
                React.createElement(
                    "i",
                    { className: "icon" },
                    React.createElement("i", { id: "unread-comments", className: "fa fa-comments", "aria-hidden": "true" })
                ),
                this.props.unreadComments
            );
        }
    }]);

    return UnreadComments;
}(React.Component);

var LogoutButton = function (_React$Component4) {
    _inherits(LogoutButton, _React$Component4);

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
                    { "class": "ui icon blue button" },
                    React.createElement(
                        "i",
                        { "class": "icon" },
                        React.createElement("i", { id: "logout-button", "class": "fa fa-sign-out", "aria-hidden": "true" })
                    )
                );
            } else {
                return React.createElement("span", null);
            }
        }
    }]);

    return LogoutButton;
}(React.Component);

var SearchBar = function (_React$Component5) {
    _inherits(SearchBar, _React$Component5);

    function SearchBar(props) {
        _classCallCheck(this, SearchBar);

        var _this5 = _possibleConstructorReturn(this, (SearchBar.__proto__ || Object.getPrototypeOf(SearchBar)).call(this, props));

        _this5.state = {
            inputValue: "",
            results: {}
        };
        _this5.refreshResults = _this5.refreshResults.bind(_this5);
        _this5.prepareATags = _this5.prepareATags.bind(_this5);
        _this5.changeInput = _this5.changeInput.bind(_this5);
        _this5.deleteResults = _this5.deleteResults.bind(_this5);
        return _this5;
    }

    _createClass(SearchBar, [{
        key: "refreshResults",
        value: function refreshResults() {
            // burada sunucu ile konuşucaz gelen veriyi results'a atıyoruz ve işlem tamamdır
            this.setState({
                results: {
                    88: {
                        productName: "Le-Cola",
                        productUrl: "le-cola"
                    }
                }
            });
        }
    }, {
        key: "prepareATags",
        value: function prepareATags() {
            this.aTags = [];
            var keys = Object.keys(this.state.results);
            for (var i = 0; i < keys.length; i++) {
                this.aTags.push(React.createElement(
                    "a",
                    { key: keys[i], className: "result", href: "urun/" + this.state.results[keys[i]].productUrl },
                    this.state.results[keys[i]].productName
                ));
            }
        }
    }, {
        key: "changeInput",
        value: function changeInput(e) {
            this.setState({
                inputValue: e.target.value
            });
            // bu kısımda bir delay'a ihtiyacım olabilir çünkü her harfte yenileme yaparsam back-end sıkıntı çekebilir
            this.refreshResults();
        }
    }, {
        key: "deleteResults",
        value: function deleteResults() {
            this.setState({
                results: {}
            });
        }
    }, {
        key: "render",
        value: function render() {
            if (Object.keys(this.state.results).length) {
                this.prepareATags();
            }
            return React.createElement(
                "div",
                { id: "search", className: "ui search" },
                React.createElement("input", { className: "prompt", type: "text", placeholder: "Ara...", value: this.state.inputValue, onChange: this.changeInput, onBlur: this.deleteResults }),
                Object.keys(this.state.results).length ? React.createElement(
                    "div",
                    { id: "search-results", className: "results transition visible" },
                    this.aTags
                ) : ""
            );
        }
    }]);

    return SearchBar;
}(React.Component);

var Header = function (_React$Component6) {
    _inherits(Header, _React$Component6);

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

var Footer = function (_React$Component7) {
    _inherits(Footer, _React$Component7);

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

var App = function (_React$Component8) {
    _inherits(App, _React$Component8);

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