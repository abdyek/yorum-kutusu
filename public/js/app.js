var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Menu = function (_React$Component) {
    _inherits(Menu, _React$Component);

    function Menu(props) {
        _classCallCheck(this, Menu);

        var _this = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this, props));

        _this.logout = _this.logout.bind(_this);
        _this.openUnreadComments = _this.openUnreadComments.bind(_this);
        _this.openProfile = _this.openProfile.bind(_this);
        return _this;
    }

    _createClass(Menu, [{
        key: "logout",
        value: function logout(e) {
            e.preventDefault();
            this.props.logout();
        }
    }, {
        key: "openUnreadComments",
        value: function openUnreadComments(e) {
            e.preventDefault();
            this.props.changeContent(SITEURL + "profil/" + this.props.userSlug + "/takipteki-urunler");
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

            if (this.props.form === "login") {
                return React.createElement(
                    "div",
                    { id: "menu" },
                    React.createElement(
                        FloatRight,
                        null,
                        React.createElement(
                            "a",
                            { href: "giris-yap", onClick: function onClick(e) {
                                    e.preventDefault();_this2.props.changeContent("giris-yap", true);
                                } },
                            React.createElement(
                                "button",
                                { className: "ui blue button" },
                                React.createElement(
                                    "i",
                                    { className: "icon" },
                                    React.createElement("i", { className: "fa fa-user", "aria-hidden": "true" })
                                ),
                                React.createElement(
                                    "span",
                                    null,
                                    "Giri\u015F Yap"
                                )
                            )
                        )
                    )
                );
            } else if (this.props.form === "account") {
                if (this.props.unreadCommentsCount !== 0) {
                    return React.createElement(
                        "div",
                        { id: "menu" },
                        React.createElement(
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
                                    { className: "ui icon blue button" },
                                    React.createElement(
                                        "i",
                                        { className: "icon" },
                                        React.createElement("i", { id: "logout-button", className: "fa fa-sign-out", "aria-hidden": "true" })
                                    )
                                )
                            )
                        )
                    );
                } else {
                    return React.createElement(
                        "div",
                        { id: "menu" },
                        React.createElement(
                            FloatRight,
                            null,
                            React.createElement(
                                "a",
                                { onClick: this.openProfile },
                                React.createElement(
                                    "button",
                                    { className: "ui blue button" },
                                    React.createElement(
                                        "i",
                                        { className: "icon" },
                                        React.createElement("i", { className: "fa fa-user", "aria-hidden": "true" })
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
                                    { className: "ui icon blue button" },
                                    React.createElement(
                                        "i",
                                        { className: "icon" },
                                        React.createElement("i", { id: "logout-button", className: "fa fa-sign-out", "aria-hidden": "true" })
                                    )
                                )
                            )
                        )
                    );
                }
            }
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

var SearchBarForProduct = function (_React$Component3) {
    _inherits(SearchBarForProduct, _React$Component3);

    function SearchBarForProduct(props) {
        _classCallCheck(this, SearchBarForProduct);

        var _this4 = _possibleConstructorReturn(this, (SearchBarForProduct.__proto__ || Object.getPrototypeOf(SearchBarForProduct)).call(this, props));

        _this4.state = {
            results: []
        };
        _this4.refreshResults = _this4.refreshResults.bind(_this4);
        _this4.prepareATags = _this4.prepareATags.bind(_this4);
        _this4.clickFunc = _this4.clickFunc.bind(_this4);
        _this4.changeInput = _this4.changeInput.bind(_this4);
        _this4.deleteResults = _this4.deleteResults.bind(_this4);
        return _this4;
    }

    _createClass(SearchBarForProduct, [{
        key: "refreshResults",
        value: function refreshResults() {
            var _this5 = this;

            this.setState({
                results: [{
                    id: "loading",
                    name: "Yükleniyor.."
                }]
            });
            fetch(SITEURL + 'api/search?' + getUrlPar({
                name: this.props.tagSearchInput
            }), { method: 'GET' }).then(function (response) {
                if (!response.ok) throw new Error(response.status);else return response.json();
            }).then(function (json) {
                if (json.other.products.length == 0) {
                    _this5.setState({
                        results: [{
                            id: "yeni-urun",
                            name: "Ürün bulunamadı. Yeni ürün oluştur"
                        }]
                    });
                } else {
                    _this5.setState({
                        results: json.other.products
                    });
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
    }, {
        key: "prepareATags",
        value: function prepareATags() {
            this.aTags = [];
            for (var i = 0; i < this.state.results.length; i++) {
                this.aTags.push(React.createElement(SearchResult, { key: this.state.results[i].id, id: this.state.results[i].id, slug: this.state.results[i].slug, name: this.state.results[i].name, click: this.clickFunc, changeContent: this.props.changeContent }));
            }
        }
    }, {
        key: "clickFunc",
        value: function clickFunc(obj) {
            this.props.click(obj);
            this.props.changeTagSearchInput("");
        }
    }, {
        key: "changeInput",
        value: function changeInput(e) {
            this.props.changeTagSearchInput(e.target.value);
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
                React.createElement("input", { className: "prompt", type: "text", placeholder: "\xDCr\xFCn Ara..", value: this.props.tagSearchInput, onChange: this.changeInput, onBlur: this.deleteResults }),
                this.state.results.length ? React.createElement(
                    "div",
                    { id: "search-results", className: "results transition visible" },
                    this.aTags
                ) : ""
            );
        }
    }]);

    return SearchBarForProduct;
}(React.Component);

var SearchBarForTag = function (_React$Component4) {
    _inherits(SearchBarForTag, _React$Component4);

    function SearchBarForTag(props) {
        _classCallCheck(this, SearchBarForTag);

        var _this7 = _possibleConstructorReturn(this, (SearchBarForTag.__proto__ || Object.getPrototypeOf(SearchBarForTag)).call(this, props));

        _this7.state = {
            results: []
        };
        _this7.checkAvailableTag = _this7.checkAvailableTag.bind(_this7);
        _this7.refreshResults = _this7.refreshResults.bind(_this7);
        _this7.prepareATags = _this7.prepareATags.bind(_this7);
        _this7.clickFunc = _this7.clickFunc.bind(_this7);
        _this7.changeInput = _this7.changeInput.bind(_this7);
        _this7.deleteResults = _this7.deleteResults.bind(_this7);
        return _this7;
    }

    _createClass(SearchBarForTag, [{
        key: "checkAvailableTag",
        value: function checkAvailableTag(tags) {
            for (var i = 0; i < tags.length; i++) {
                if (this.props.tagSearchInput.toLowerCase() == tags[i].name.toLowerCase()) {
                    this.props.checkAvailableTag(true);
                    return;
                }
            }
            this.props.checkAvailableTag(false);
        }
    }, {
        key: "refreshResults",
        value: function refreshResults() {
            var _this8 = this;

            this.setState({
                results: [{
                    id: "loading",
                    name: "Yükleniyor.."
                }]
            });
            fetch(SITEURL + 'api/tag?' + getUrlPar({
                searchText: this.props.tagSearchInput
            }), { method: 'GET' }).then(function (response) {
                if (!response.ok) throw new Error(response.status);else return response.json();
            }).then(function (json) {
                _this8.setState({
                    results: json.other.tags
                });
                _this8.checkAvailableTag(json.other.tags);
            }).catch(function (error) {
                console.log(error);
            });
        }
    }, {
        key: "prepareATags",
        value: function prepareATags() {
            this.aTags = [];
            for (var i = 0; i < this.state.results.length; i++) {
                this.aTags.push(React.createElement(SearchResult, { key: this.state.results[i].id, id: this.state.results[i].id, slug: this.state.results[i].slug, name: this.state.results[i].name, passive: this.state.results[i].passive, href: 'urun', click: this.clickFunc }));
            }
        }
    }, {
        key: "clickFunc",
        value: function clickFunc(obj) {
            this.props.click(obj);
            this.props.changeTagSearchInput("");
        }
    }, {
        key: "changeInput",
        value: function changeInput(e) {
            this.props.changeTagSearchInput(e.target.value);
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
            var _this9 = this;

            setTimeout(function () {
                _this9.setState({
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
                React.createElement("input", { className: "prompt", type: "text", placeholder: "Etiket Ara..", value: this.props.tagSearchInput, onChange: this.changeInput, onBlur: this.deleteResults }),
                this.state.results.length ? React.createElement(
                    "div",
                    { id: "search-results", className: "results transition visible" },
                    this.aTags
                ) : ""
            );
        }
    }]);

    return SearchBarForTag;
}(React.Component);

var SearchResult = function (_React$Component5) {
    _inherits(SearchResult, _React$Component5);

    function SearchResult(props) {
        _classCallCheck(this, SearchResult);

        var _this10 = _possibleConstructorReturn(this, (SearchResult.__proto__ || Object.getPrototypeOf(SearchResult)).call(this, props));

        _this10.click = _this10.click.bind(_this10);
        return _this10;
    }

    _createClass(SearchResult, [{
        key: "click",
        value: function click(e) {
            e.preventDefault();
            if (this.props.id == "loading") return;else if (this.props.id == "yeni-urun") {
                this.props.changeContent('yeni-urun', true);
                return;
            }
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

var Header = function (_React$Component6) {
    _inherits(Header, _React$Component6);

    function Header(props) {
        _classCallCheck(this, Header);

        var _this11 = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));

        _this11.state = {
            productSearchInput: ""
        };
        _this11.changeProductSearchInput = _this11.changeProductSearchInput.bind(_this11);
        _this11.goProduct = _this11.goProduct.bind(_this11);
        return _this11;
    }

    _createClass(Header, [{
        key: "changeProductSearchInput",
        value: function changeProductSearchInput(value) {
            this.setState({
                productSearchInput: value
            });
        }
    }, {
        key: "goProduct",
        value: function goProduct(obj) {
            this.props.changeContent(SITEURL + '/urun/' + obj.slug);
        }
    }, {
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
                                React.createElement(SearchBarForProduct, {
                                    tagSearchInput: this.state.productSearchInput,
                                    changeTagSearchInput: this.changeProductSearchInput,
                                    click: this.goProduct,
                                    changeContent: this.props.changeContent
                                })
                            ),
                            React.createElement(
                                WideColumn,
                                { size: "four" },
                                React.createElement(Menu, {
                                    changeContent: this.props.changeContent,
                                    form: this.props.form,
                                    unreadCommentsCount: this.props.unreadCommentsCount,
                                    userSlug: this.props.userSlug,
                                    logout: this.props.logout
                                })
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
                    return React.createElement(Login, { changeContent: this.props.changeContent, updateMenu: this.props.updateMenu });
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
                case "forgotMyPassword":
                    return React.createElement(ForgotMyPassword, { changeContent: this.props.changeContent });
                case "none":
                    return "";
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

        var _this14 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        var userInfo = getUserInfo();
        _this14.state = {
            content: _this14.props.content,
            form: userInfo ? "account" : "login", // login, account
            userSlug: userInfo ? userInfo['slug'] : "",
            unreadCommentsCount: userInfo ? userInfo["unreadComments"] : 0
        };
        _this14.contentFromSlug = {
            " ": "index",
            "urun": "product",
            "profil": "profile",
            "yeni-urun": "newProduct",
            "uye-ol": "signup",
            "giris-yap": "login",
            "e-posta-dogrula": "emailValidationPage",
            "filtrele": "filter",
            "urun-duzenle": "editProduct",
            "parolami-unuttum": "forgotMyPassword"
        };
        window.onpopstate = function (event) {
            var pathNames = getPathNames();
            var page = pathNames[0];
            this.setState({
                "content": this.contentFromSlug[page]
            });
        }.bind(_this14);
        _this14.updateMenu = _this14.updateMenu.bind(_this14);
        _this14.updateUnreadComments = _this14.updateUnreadComments.bind(_this14);
        _this14.changeContent = _this14.changeContent.bind(_this14);
        _this14.logout = _this14.logout.bind(_this14);
        _this14.changeHeader = _this14.changeHeader.bind(_this14);
        return _this14;
    }

    _createClass(App, [{
        key: "updateMenu",
        value: function updateMenu(slug) {
            this.setState({
                form: "account",
                userSlug: slug
            });
            this.updateUnreadComments();
        }
    }, {
        key: "updateUnreadComments",
        value: function updateUnreadComments() {
            var _this15 = this;

            if (isMember()) {
                fetch(SITEURL + 'api/followProduct?' + getUrlPar({
                    pageNumber: -1
                }), { method: 'GET' }).then(function (response) {
                    if (!response.ok) throw new Error(response.status);else return response.json();
                }).then(function (json) {
                    _this15.setState({
                        unreadCommentsCount: json.other.allCommentCount
                    });
                    var userInfo = getUserInfo();
                    if (userInfo) {
                        userInfo["unreadComments"] = json.other.allCommentCount;
                        var hash = base64FromObject(userInfo);
                        setCookie("user", hash);
                    }
                }).catch(function (error) {});
            }
        }
    }, {
        key: "changeContent",
        value: function changeContent(href, direct, slugs) {
            direct = direct || false;
            slugs = slugs || [];
            if (direct) {
                var cont = this.contentFromSlug[href];
                window.history.pushState({ content: cont }, "title", SITEURL + href);
                if (this.state.content == cont) {
                    this.setState({ "content": "none" });
                    setTimeout(function () {
                        this.setState({
                            "content": cont
                        });
                    }.bind(this), 50);
                } else {
                    this.setState({
                        "content": cont
                    });
                }
            } else {
                var pathNames = getPathNames(href);
                var page = pathNames[0];
                var _cont = this.contentFromSlug[page];
                window.history.pushState({ content: _cont }, "title", href);
                if (this.state.content == _cont) {
                    this.setState({ "content": "none" });
                    setTimeout(function () {
                        this.setState({
                            "content": _cont
                        });
                    }.bind(this), 50);
                } else {
                    this.setState({
                        "content": _cont
                    });
                }
            }
            this.updateUnreadComments();
        }
    }, {
        key: "logout",
        value: function logout() {
            var _this16 = this;

            fetch(SITEURL + 'api/logout', {
                method: 'POST',
                heeader: {
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                if (!response.ok) throw new Error(response.status);else return response.json();
            }).then(function (json) {
                _this16.setState({
                    form: "login"
                });
                setCookie('user', null);
                _this16.changeContent(' ', true);
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
                React.createElement(Header, {
                    changeContent: this.changeContent,
                    form: this.state.form,
                    userSlug: this.state.userSlug,
                    unreadCommentsCount: this.state.unreadCommentsCount,
                    logout: this.logout
                }),
                React.createElement(Content, {
                    content: this.state.content,
                    changeContent: this.changeContent,
                    updateMenu: this.updateMenu
                }),
                React.createElement(Footer, null)
            );
        }
    }]);

    return App;
}(React.Component);

ReactDOM.render(React.createElement(App, { content: firstContent }), document.getElementById('root'));