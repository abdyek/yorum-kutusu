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
                        { onClick: this.click },
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
            {/*
                return(
                  <div id="menu">
                      <FloatRight>
                          {(this.state.unreadComments)?
                              <UnreadComments unreadComments={this.state.unreadComments} userUrl={this.state.userUrl} />
                              :<AccountButton userName={this.state.userName} userUrl={this.state.userUrl} changeContent={this.props.changeContent} />
                          }
                          <LogoutButton userName={this.state.userName}/>
                      </FloatRight>
                  </div>
                )
                      */}
        }
    }]);

    return Menu;
}(React.Component);

var AccountButton = function (_React$Component2) {
    _inherits(AccountButton, _React$Component2);

    function AccountButton(props) {
        _classCallCheck(this, AccountButton);

        var _this2 = _possibleConstructorReturn(this, (AccountButton.__proto__ || Object.getPrototypeOf(AccountButton)).call(this, props));

        _this2.state = {
            form: "profile", // profile, login
            href: "profil/" + _this2.props.userUrl
        };
        _this2.click = _this2.click.bind(_this2);
        return _this2;
    }

    _createClass(AccountButton, [{
        key: "click",
        value: function click(e) {
            e.preventDefault();
            var href = this.state.href;
            this.props.changeContent(href);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "a",
                { href: this.state.href, onClick: this.click },
                React.createElement(
                    "button",
                    { "class": "ui blue button" },
                    React.createElement(
                        "i",
                        { "class": "icon" },
                        React.createElement("i", { "class": "fa fa-user", "aria-hidden": "true" })
                    ),
                    this.state.form == "login" ? React.createElement(
                        "span",
                        null,
                        "Giri\u015F Yap"
                    ) : React.createElement(
                        "span",
                        null,
                        "Hesap"
                    )
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

var Content = function (_React$Component8) {
    _inherits(Content, _React$Component8);

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
                    return React.createElement(EmailValidationPage, { changeContent: this.changeContent });
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

var App = function (_React$Component9) {
    _inherits(App, _React$Component9);

    function App(props) {
        _classCallCheck(this, App);

        var _this9 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this9.state = {
            "content": _this9.props.content
        };
        _this9.contentFromSlug = {
            "": "index",
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
        }.bind(_this9);

        _this9.changeContent = _this9.changeContent.bind(_this9);
        return _this9;
    }

    _createClass(App, [{
        key: "changeContent",
        value: function changeContent(href) {
            //console.log(event.target.href);
            //window.history.pushState({content:content}, "Title", SITEURL+ this.slug[content]);
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