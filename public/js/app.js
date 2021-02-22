var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Menu = function (_React$Component) {
    _inherits(Menu, _React$Component);

    function Menu(props) {
        _classCallCheck(this, Menu);

        var _this = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this, props));

        _this.refreshUnreadComments = _this.refreshUnreadComments.bind(_this);
        _this.logout = _this.logout.bind(_this);
        _this.openUnreadComments = _this.openUnreadComments.bind(_this);
        _this.openProfile = _this.openProfile.bind(_this);
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
            this.props.logout();
        }
    }, {
        key: "openUnreadComments",
        value: function openUnreadComments(e) {
            e.preventDefault();
            this.props.changeContent("profil/" + this.props.userSlug + "/takipteki-urunler");
            // ek olarak okunmamış yorumları açacak bir mekanizma
        }
    }, {
        key: "openProfile",
        value: function openProfile(e) {
            e.preventDefault();
            this.props.changeContent(SITEURL + "profil/" + this.props.userSlug);
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var core = void 0;
            if (this.props.form == "user-has-unread") {
                core = React.createElement(
                    FloatRight,
                    null,
                    React.createElement(
                        "a",
                        { onClick: this.openUnreadComments },
                        React.createElement(
                            "button",
                            { className: "ui blue button" },
                            React.createElement(
                                "i",
                                { className: "icon" },
                                React.createElement("i", { id: "unread-comments", className: "fa fa-comments", "aria-hidden": "true" })
                            ),
                            this.props.unreadCommentsCount
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
            } else if (this.props.form == "user-empty-unread") {
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
            } else if (this.props.form == "login") {
                core = React.createElement(
                    FloatRight,
                    null,
                    React.createElement(
                        "a",
                        { href: "giris-yap", onClick: function onClick(e) {
                                e.preventDefault();_this2.props.changeContent("giris-yap", true);
                            } },
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

        var _this3 = _possibleConstructorReturn(this, (Logo.__proto__ || Object.getPrototypeOf(Logo)).call(this, props));

        _this3.goHome = _this3.goHome.bind(_this3);
        return _this3;
    }

    _createClass(Logo, [{
        key: "goHome",
        value: function goHome(e) {
            this.props.changeContent(" ", true);
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

        var _this4 = _possibleConstructorReturn(this, (SearchBar.__proto__ || Object.getPrototypeOf(SearchBar)).call(this, props));

        _this4.state = {
            inputValue: "",
            results: []
        };
        _this4.refreshResults = _this4.refreshResults.bind(_this4);
        _this4.prepareATags = _this4.prepareATags.bind(_this4);
        _this4.clickFunc = _this4.clickFunc.bind(_this4);
        _this4.changeInput = _this4.changeInput.bind(_this4);
        _this4.deleteResults = _this4.deleteResults.bind(_this4);
        return _this4;
    }

    _createClass(SearchBar, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.inputPlaceholder = this.props.inputPlaceholder || 'Ara..';
        }
    }, {
        key: "refreshResults",
        value: function refreshResults() {
            var _this5 = this;

            // burada sunucu ile konuşucaz gelen veriyi results'a atıyoruz ve işlem tamamdır
            this.setState({
                results: [{
                    id: "loading",
                    name: "Yükleniyor.."
                }]
            });
            fetch(SITEURL + 'api/tag?' + getUrlPar({
                searchText: this.state.inputValue
            }), { method: 'GET' }).then(function (response) {
                if (!response.ok) throw new Error(response.status);else return response.json();
            }).then(function (json) {
                _this5.setState({
                    results: json.other.tags
                });
            }).catch(function (error) {
                console.log(error);
            });
        }
    }, {
        key: "prepareATags",
        value: function prepareATags() {
            this.aTags = [];
            //let keys = Object.keys(this.state.results);
            for (var i = 0; i < this.state.results.length; i++) {
                this.aTags.push(React.createElement(SearchResult, { key: this.state.results[i].id, id: this.state.results[i].id, slug: this.state.results[i].slug, name: this.state.results[i].name, passive: this.state.results[i].passive, href: 'urun', click: this.clickFunc })
                /* <a key={this.state.results[i].id} className="result" href={"urun/" + this.state.results[i].productUrl} onClick={this.clickFunc}>{this.state.results[i].productName}</a> */
                );
            }
        }
    }, {
        key: "clickFunc",
        value: function clickFunc(obj) {
            this.setState({
                inputValue: ""
            });
            this.props.click(obj);
        }
    }, {
        key: "changeInput",
        value: function changeInput(e) {
            this.setState({
                inputValue: e.target.value
            });
            clearTimeout(this.setTime);
            if (e.target.value.length) {
                this.setTime = setTimeout(function () {
                    this.refreshResults();
                }.bind(this), 1000);
            }
        }
    }, {
        key: "deleteResults",
        value: function deleteResults() {
            var _this6 = this;

            setTimeout(function () {
                _this6.setState({
                    results: []
                });
            }, 200);
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.results.length) {
                this.prepareATags();
            }
            return React.createElement(
                "div",
                { id: "search", className: "ui search" },
                React.createElement("input", { className: "prompt", type: "text", placeholder: this.inputPlaceholder, value: this.state.inputValue, onChange: this.changeInput, onBlur: this.deleteResults }),
                this.state.results.length ? React.createElement(
                    "div",
                    { id: "search-results", className: "results transition visible" },
                    this.aTags
                ) : ""
            );
        }
    }]);

    return SearchBar;
}(React.Component);

var SearchResult = function (_React$Component4) {
    _inherits(SearchResult, _React$Component4);

    function SearchResult(props) {
        _classCallCheck(this, SearchResult);

        var _this7 = _possibleConstructorReturn(this, (SearchResult.__proto__ || Object.getPrototypeOf(SearchResult)).call(this, props));

        _this7.click = _this7.click.bind(_this7);
        return _this7;
    }

    _createClass(SearchResult, [{
        key: "click",
        value: function click(e) {
            e.preventDefault();
            if (this.props.id == "loading") return;
            this.props.click({
                id: this.props.id,
                slug: this.props.slug,
                name: this.props.name,
                passive: this.props.passive
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "a",
                { key: this.props.id, className: "result", href: this.props.href, onClick: this.click },
                this.props.name
            );
        }
    }]);

    return SearchResult;
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
                                React.createElement(Menu, { changeContent: this.props.changeContent, form: this.props.form, unreadCommentsCount: this.props.unreadCommentsCount, userSlug: this.props.userSlug, logout: this.props.logout })
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
                                "\xA9 T\xFCm haklar\u0131 sakl\u0131d\u0131r | 2021"
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Footer;
}(React.Component);

var Content = function (_React$Component7) {
    _inherits(Content, _React$Component7);

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
                    return React.createElement(Login, { changeContent: this.props.changeContent, changeHeader: this.props.changeHeader });
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
                case "editProduct":
                    return React.createElement(EditProduct, { changeContent: this.props.changeContent });
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

var App = function (_React$Component8) {
    _inherits(App, _React$Component8);

    function App(props) {
        _classCallCheck(this, App);

        var _this11 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this11.state = {
            content: _this11.props.content,
            form: "login", // user-empty-unread, user-has-unread, login
            userSlug: "yunus-emre",
            unreadCommentsCount: 115
        };
        _this11.contentFromSlug = {
            " ": "index",
            "urun": "product",
            "profil": "profile",
            "yeni-urun": "newProduct",
            "uye-ol": "signup",
            "giris-yap": "login",
            "e-posta-dogrula": "emailValidationPage",
            "filtrele": "filter",
            "urun-duzenle": "editProduct"
        };
        window.onpopstate = function (event) {
            var pathNames = getPathNames();
            var page = pathNames[0];
            this.setState({
                "content": this.contentFromSlug[page]
            });
        }.bind(_this11);

        _this11.changeContent = _this11.changeContent.bind(_this11);
        _this11.logout = _this11.logout.bind(_this11);
        _this11.changeHeader = _this11.changeHeader.bind(_this11);
        return _this11;
    }

    _createClass(App, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var form = "login";
            var unread = 0;
            if (getCookie('user') && getCookie('user') != "null") {
                var json = atob(getCookie('user'));
                if (json['unreadComments'] > 0) {
                    form = "user-has-unread";
                    unread = json['unreadComments'];
                } else {
                    form = "user-empty-unread";
                    unread = 0;
                }
            }
            this.setState({
                "form": form,
                "unreadCommentsCount": unread
            });
        }
    }, {
        key: "changeContent",
        value: function changeContent(href, direct, slugs) {
            direct = direct || false;
            slugs = slugs || [];
            if (direct) {
                var cont = this.contentFromSlug[href];
                window.history.pushState({ content: cont }, "title", SITEURL + href);
                this.setState({
                    "content": this.contentFromSlug[href]
                });
            } else {
                var pathNames = getPathNames(href);
                var page = pathNames[0];
                var _cont = this.contentFromSlug[page];
                window.history.pushState({ content: _cont }, "title", href);
                console.log(_cont);
                this.setState({
                    "content": _cont
                });
            }
        }
    }, {
        key: "logout",
        value: function logout() {
            var _this12 = this;

            fetch(SITEURL + 'api/logout', {
                method: 'POST',
                heeader: {
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                if (!response.ok) throw new Error(response.status);else return response.json();
            }).then(function (json) {
                _this12.setState({
                    form: "login"
                });
                setCookie('user', null);
                _this12.changeContent(' ', true);
            }).catch(function (error) {});
        }
    }, {
        key: "changeHeader",
        value: function changeHeader(value) {
            this.setState({
                form: value
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { id: "app" },
                React.createElement(Header, { changeContent: this.changeContent, form: this.state.form, userSlug: this.state.userSlug, unreadCommentsCount: this.state.unreadCommentsCount, logout: this.logout }),
                React.createElement(Content, { content: this.state.content, changeContent: this.changeContent, changeHeader: this.changeHeader }),
                React.createElement(Footer, null)
            );
        }
    }]);

    return App;
}(React.Component);

ReactDOM.render(React.createElement(App, { content: firstContent }), document.getElementById('root'));