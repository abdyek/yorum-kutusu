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
            // user-empty-unread, user-has-unread, login
            form: "user-empty-unread",
            userName: "Yunus Emre",
            userURL: "yunus-emre",
            unreadComments: 115 /* okunmamış yorumlar */
        };
        _this.refreshUnreadComments = _this.refreshUnreadComments.bind(_this);
        _this.logout = _this.logout.bind(_this);
        _this.openUnreadComments = _this.openUnreadComments.bind(_this);
        _this.openProfile = _this.openProfile.bind(_this);
        _this.openLogin = _this.openLogin.bind(_this);
        return _this;
    }

    _createClass(Menu, [{
        key: "refreshUnreadComments",
        value: function refreshUnreadComments() {
            // burada istekle yeni okunmamış mesajları çekicez
        }
    }, {
        key: "logout",
        value: function logout(e) {
            e.preventDefault();
            this.setState({
                form: "login"
            });
        }
    }, {
        key: "openUnreadComments",
        value: function openUnreadComments(e) {
            e.preventDefault();
            this.props.changeContent("profil/" + this.state.userURL);
            // ek olarak okunmamış yorumları açacak bir mekanizma
        }
    }, {
        key: "openProfile",
        value: function openProfile(e) {
            e.preventDefault();
            this.props.changeContent("profil/" + this.state.userURL);
        }
    }, {
        key: "openLogin",
        value: function openLogin(e) {
            e.preventDefault();
            this.props.changeContent("giris-yap");
        }
    }, {
        key: "render",
        value: function render() {
            var core = void 0;
            if (this.state.form == "user-has-unread") {
                core = React.createElement(
                    FloatRight,
                    null,
                    React.createElement(
                        "a",
                        { href: this.state.href, onClick: this.openUnreadComments },
                        React.createElement(
                            "button",
                            { className: "ui blue button", onClick: this.goUserProfile },
                            React.createElement(
                                "i",
                                { className: "icon" },
                                React.createElement("i", { id: "unread-comments", className: "fa fa-comments", "aria-hidden": "true" })
                            ),
                            this.state.unreadComments
                        )
                    ),
                    React.createElement(
                        "a",
                        { onClick: this.logout },
                        React.createElement(
                            "button",
                            { "class": "ui icon blue button" },
                            React.createElement(
                                "i",
                                { "class": "icon" },
                                React.createElement("i", { id: "logout-button", "class": "fa fa-sign-out", "aria-hidden": "true" })
                            )
                        )
                    )
                );
            } else if (this.state.form == "user-empty-unread") {
                core = React.createElement(
                    FloatRight,
                    null,
                    React.createElement(
                        "a",
                        { onClick: this.openProfile },
                        React.createElement(
                            "button",
                            { "class": "ui blue button" },
                            React.createElement(
                                "i",
                                { "class": "icon" },
                                React.createElement("i", { "class": "fa fa-user", "aria-hidden": "true" })
                            ),
                            React.createElement(
                                "span",
                                null,
                                "Hesap"
                            )
                        )
                    ),
                    React.createElement(
                        "a",
                        { onClick: this.logout },
                        React.createElement(
                            "button",
                            { "class": "ui icon blue button" },
                            React.createElement(
                                "i",
                                { "class": "icon" },
                                React.createElement("i", { id: "logout-button", "class": "fa fa-sign-out", "aria-hidden": "true" })
                            )
                        )
                    )
                );
            } else if (this.state.form == "login") {
                core = React.createElement(
                    FloatRight,
                    null,
                    React.createElement(
                        "a",
                        { onClick: this.openLogin },
                        React.createElement(
                            "button",
                            { "class": "ui blue button" },
                            React.createElement(
                                "i",
                                { "class": "icon" },
                                React.createElement("i", { "class": "fa fa-user", "aria-hidden": "true" })
                            ),
                            React.createElement(
                                "span",
                                null,
                                "Giri\u015F Yap"
                            )
                        )
                    )
                );
            }
            return React.createElement(
                "div",
                { id: "menu" },
                core
            );
        }
    }]);

    return Menu;
}(React.Component);

var Logo = function (_React$Component2) {
    _inherits(Logo, _React$Component2);

    function Logo(props) {
        _classCallCheck(this, Logo);

        var _this2 = _possibleConstructorReturn(this, (Logo.__proto__ || Object.getPrototypeOf(Logo)).call(this, props));

        _this2.goHome = _this2.goHome.bind(_this2);
        return _this2;
    }

    _createClass(Logo, [{
        key: "goHome",
        value: function goHome(e) {
            this.props.changeContent(" ");
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { id: "logo", onClick: this.goHome },
                React.createElement(H, { type: "1", text: "Yorum Kutusu" })
            );
        }
    }]);

    return Logo;
}(React.Component);

var SearchBar = function (_React$Component3) {
    _inherits(SearchBar, _React$Component3);

    function SearchBar(props) {
        _classCallCheck(this, SearchBar);

        var _this3 = _possibleConstructorReturn(this, (SearchBar.__proto__ || Object.getPrototypeOf(SearchBar)).call(this, props));

        _this3.state = {
            inputValue: "",
            results: {}
        };
        _this3.refreshResults = _this3.refreshResults.bind(_this3);
        _this3.prepareATags = _this3.prepareATags.bind(_this3);
        _this3.changeInput = _this3.changeInput.bind(_this3);
        _this3.deleteResults = _this3.deleteResults.bind(_this3);
        return _this3;
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

var Header = function (_React$Component4) {
    _inherits(Header, _React$Component4);

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
                                React.createElement(Logo, { changeContent: this.props.changeContent })
                            ),
                            React.createElement(
                                WideColumn,
                                { size: "eight" },
                                React.createElement(SearchBar, null)
                            ),
                            React.createElement(
                                WideColumn,
                                { size: "four" },
                                React.createElement(Menu, { changeContent: this.props.changeContent })
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Header;
}(React.Component);

var Footer = function (_React$Component5) {
    _inherits(Footer, _React$Component5);

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

var Content = function (_React$Component6) {
    _inherits(Content, _React$Component6);

    function Content() {
        _classCallCheck(this, Content);

        return _possibleConstructorReturn(this, (Content.__proto__ || Object.getPrototypeOf(Content)).apply(this, arguments));
    }

    _createClass(Content, [{
        key: "render",
        value: function render() {
            switch (this.props.content) {
                case "index":
                    return React.createElement(Index, { changeContent: this.props.changeContent });
                    break;
                case "profile":
                    return React.createElement(Profile, { changeContent: this.props.changeContent });
                    break;
                case "product":
                    return React.createElement(Product, { changeContent: this.props.changeContent });
                    break;
                case "newProduct":
                    return React.createElement(NewProduct, { changeContent: this.props.changeContent });
                    break;
                case "login":
                    return React.createElement(Login, { changeContent: this.props.changeContent });
                    break;
                case "signup":
                    return React.createElement(Signup, { changeContent: this.props.changeContent });
                    break;
                case "filter":
                    return React.createElement(Filter, { changeContent: this.props.changeContent });
                    break;
                case "emailValidationPage":
                    return React.createElement(EmailValidationPage, { changeContent: this.props.changeContent });
                    break;
                default:
                    return React.createElement(
                        "div",
                        null,
                        "Böyle bir sayfa yok" + this.state.content,
                        " "
                    );
            }
        }
    }]);

    return Content;
}(React.Component);

var App = function (_React$Component7) {
    _inherits(App, _React$Component7);

    function App(props) {
        _classCallCheck(this, App);

        var _this7 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this7.state = {
            "content": _this7.props.content
        };
        _this7.contentFromSlug = {
            " ": "index",
            "urun": "product",
            "profil": "profile",
            "yeni-urun": "newProduct",
            "uye-ol": "signup",
            "giris-yap": "login",
            "e-posta-dogrula": "emailValidationPage",
            "filtrele": "filter"
        };
        window.onpopstate = function (event) {
            if (event) {
                if (window.history.state == null) {
                    window.history.back();
                } else {
                    this.setState({
                        content: window.history.state.content
                    });
                }
            } else {
                // Continue user action through link or button
            }
        }.bind(_this7);

        _this7.changeContent = _this7.changeContent.bind(_this7);
        return _this7;
    }

    _createClass(App, [{
        key: "changeContent",
        value: function changeContent(href) {
            firstLoading = false;
            // ^ filtrele sayfası sadece ilk yüklemede loasingSpin'e düşeceği için ihtiyaç duydum
            var foo = href.split(SITEURL);
            var bar = foo[foo.length - 1];
            slug = bar.split("/")[0];
            var content = this.contentFromSlug[slug];
            window.history.pushState({ content: content }, "Title", bar);
            this.setState({
                "content": content
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { id: "app" },
                React.createElement(Header, { changeContent: this.changeContent }),
                React.createElement(Content, { content: this.state.content, changeContent: this.changeContent }),
                React.createElement(Footer, null)
            );
        }
    }]);

    return App;
}(React.Component);

ReactDOM.render(React.createElement(App, { content: firstContent }), document.getElementById('root'));