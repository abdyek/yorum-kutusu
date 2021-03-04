var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Product = function (_React$Component) {
    _inherits(Product, _React$Component);

    function Product(props) {
        _classCallCheck(this, Product);

        var _this = _possibleConstructorReturn(this, (Product.__proto__ || Object.getPrototypeOf(Product)).call(this, props));

        _this.state = {
            form: "loading",
            specialInfo: {},
            navigationType: "all",
            navigationOptions: [],
            sortBy: "time",
            followButtonDisabled: false,
            followed: false,
            bottomCommentForm: "newComment",
            ownCommentPublished: true
        };
        _this.manageSlugs = _this.manageSlugs.bind(_this);
        _this.fetchProduct = _this.fetchProduct.bind(_this);
        _this.fetchComment = _this.fetchComment.bind(_this);
        _this.refreshUrl = _this.refreshUrl.bind(_this);
        _this.load = _this.load.bind(_this);
        _this.reloadComment = _this.reloadComment.bind(_this);
        _this.reloadAllComment = _this.reloadAllComment.bind(_this);
        _this.changeSortBy = _this.changeSortBy.bind(_this);
        _this.changePageNumber = _this.changePageNumber.bind(_this);
        _this.refreshComments = _this.refreshComments.bind(_this);
        _this.showAllComments = _this.showAllComments.bind(_this);
        _this.followToggle = _this.followToggle.bind(_this);
        _this.openEditOfBottomComment = _this.openEditOfBottomComment.bind(_this);
        _this.openDeleteOfBottomComment = _this.openDeleteOfBottomComment.bind(_this);
        _this.openNormalOfBottomComment = _this.openNormalOfBottomComment.bind(_this);
        _this.hideBottomComment = _this.hideBottomComment.bind(_this);
        _this.openLoadingSpinOfBottomComment = _this.openLoadingSpinOfBottomComment.bind(_this);
        return _this;
    }

    _createClass(Product, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.manageSlugs();
            this.load();
        }
    }, {
        key: "manageSlugs",
        value: function manageSlugs() {
            var pathNames = getPathNames();
            this.productSlug = pathNames[1];
            if (pathNames[2] == "unread") {
                this.pageType = "unread";
                this.setState({
                    navigationType: "unread"
                });
            } else {
                this.pageType = "all";
                this.sortBy = pathNames[2] ? pathNames[2] : "time";
                this.pageNumber = pathNames[3] ? pathNames[3] : 1;
                if (this.sortBy != "time" && this.sortBy != "like") {
                    this.sortBy = "time";
                }
                this.setState({
                    sortBy: this.sortBy
                });
                this.refreshUrl();
            }
            var navigationType = "all"; // all, spacial
            // not: buradaki değer atamalar ve değişkenlerin bir kısmı deneme amaçlı, setState içindeki hemen hemen hepsi api tarafından gelecek
        }
    }, {
        key: "detectBottomCommentForm",
        value: function detectBottomCommentForm(ownComment) {
            if (isMember()) {
                if (ownComment) {
                    return "normal";
                } else {
                    return "newComment";
                }
            } else {
                return "hidden";
            }
        }
    }, {
        key: "fetchProduct",
        value: function fetchProduct(data) {
            var _this2 = this;

            fetch(SITEURL + 'api/product?' + getUrlPar(data), { method: 'GET' }).then(function (response) {
                if (!response.ok) throw new Error(response.status);else return response.json();
            }).then(function (json) {
                var ownComment = isMember() ? json['other']['ownComment'] : null;
                _this2.setState({
                    form: "normal",
                    productName: json['other']['product']['title'],
                    productSlug: json.other.product.slug,
                    productID: json['other']['product']['id'],
                    comments: normalizer('comments', json['other']['comments']),
                    ownComment: ownComment,
                    ownCommentPublished: json.other.ownCommentPublished,
                    bottomCommentForm: _this2.detectBottomCommentForm(json['other']['ownComment']),
                    commentsForm: json['other']['comments'].length ? 'normal' : 'noComment',
                    pageNumber: json['other']['pageNumber'],
                    pageCount: json['other']['pageCount'],
                    tagsInfo: normalizer('tags', json['other']['tags']),
                    followed: json['other']['followed']
                });
                if (json['other']['pageNumber'] != _this2.pageNumber) {
                    _this2.pageNumber = json['other']['pageNumber'];
                    _this2.refreshUrl();
                }
            }).catch(function (error) {
                console.log(error);
                if (error.message == 404) {
                    _this2.setState({ form: "notFound" });
                } else {}
            });
        }
    }, {
        key: "fetchComment",
        value: function fetchComment() {
            var _this3 = this;

            fetch(SITEURL + 'api/product?' + getUrlPar({
                productSlug: this.productSlug,
                type: this.sortBy,
                pageNumber: this.pageNumber,
                onlyComment: true
            }), { method: 'GET' }).then(function (response) {
                if (!response.ok) throw new Error(response.status);else return response.json();
            }).then(function (json) {
                var ownComment = isMember() ? json['other']['ownComment'] : null;
                _this3.setState({
                    commentsForm: "normal",
                    comments: normalizer('comments', json['other']['comments']),
                    ownComment: ownComment,
                    ownCommentPublished: json.other.ownCommentPublished,
                    pageNumber: json['other']['pageNumber'],
                    pageCount: json['other']['pageCount']
                });
                _this3.refreshUrl();
            }).catch(function (error) {
                console.log(error);
            });
        }
    }, {
        key: "refreshUrl",
        value: function refreshUrl() {
            var newUrl = SITEURL + 'urun/' + this.productSlug + '/' + this.sortBy + '/' + this.pageNumber;
            history.pushState({ content: this.state }, 'Title', newUrl);
            // burası ne kadar sağlıklı oldu emin değilim
        }
    }, {
        key: "load",
        value: function load() {
            if (this.pageType == "all") {
                this.fetchProduct({
                    "productSlug": this.productSlug,
                    "type": this.sortBy,
                    "pageNumber": this.pageNumber,
                    "onlyComment": false
                });
            } else if (this.pageType == "unread") {
                this.fetchProduct({
                    "productSlug": this.productSlug,
                    "type": "unread",
                    "pageNumber": 1,
                    "onlyComment": false
                });
            }
        }
    }, {
        key: "reloadComment",
        value: function reloadComment() {
            this.fetchComment();
        }
    }, {
        key: "reloadAllComment",
        value: function reloadAllComment() {
            var _this4 = this;

            this.setState({
                bottomCommentForm: "loading"
            });
            fetch(SITEURL + 'api/product?' + getUrlPar({
                productSlug: this.productSlug,
                type: this.sortBy,
                pageNumber: this.pageNumber,
                onlyComment: false
            }), { method: 'GET' }).then(function (response) {
                if (!response.ok) throw new Error(response.status);else return response.json();
            }).then(function (json) {
                var ownComment = isMember() ? json['other']['ownComment'] : null;
                _this4.setState({
                    commentsForm: json['other']['comments'].length ? 'normal' : 'noComment',
                    comments: normalizer('comments', json['other']['comments']),
                    ownComment: ownComment,
                    ownCommentPublished: json.other.ownCommentPublished,
                    bottomCommentForm: _this4.detectBottomCommentForm(json['other']['ownComment']),
                    tagsInfo: normalizer('tags', json['other']['tags']),
                    pageNumber: json['other']['pageNumber'],
                    pageCount: json['other']['pageCount']
                });
                _this4.refreshUrl();
            }).catch(function (error) {
                console.log(error);
            });
        }
    }, {
        key: "changeSortBy",
        value: function changeSortBy(value) {
            if (value != this.state.sortBy && this.state.commentsForm != "loading") {
                // ^ bu ve changePageNumber metodundaki kontrolü kullanıcının aynı anda birden fazla seçim yapmasını engellemek için koydum
                this.setState({
                    sortBy: value
                });
                this.sortBy = value;
                this.refreshComments();
            }
        }
    }, {
        key: "changePageNumber",
        value: function changePageNumber(value) {
            if (value != this.state.pageNumber && this.state.commentsForm != "loading") {
                this.setState({
                    pageNumber: value
                });
                this.pageNumber = value;
                this.refreshComments();
            }
        }
    }, {
        key: "refreshComments",
        value: function refreshComments() {
            // yorum getirme işlemi burada olacak ve yorum geleseğe kadar loading'e dönecek
            this.setState({
                commentsForm: "loading"
            });
            this.fetchComment();
        }
    }, {
        key: "showAllComments",
        value: function showAllComments() {
            this.setState({
                navigationType: "all",
                sortBy: this.sortBy,
                pageNumber: 1
            });
            this.refreshComments();
        }
    }, {
        key: "followToggle",
        value: function followToggle() {
            var _this5 = this;

            if (isMember()) {
                var make = this.state.followed ? false : true;
                this.setState({
                    followButtonDisabled: true
                });
                fetch(SITEURL + 'api/followProduct', {
                    method: 'POST',
                    header: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        productID: this.state.productID,
                        follow: make
                    })
                }).then(function (response) {
                    if (!response.ok) throw new Error(response.status);else return response.json();
                }).then(function (json) {
                    _this5.setState({
                        followButtonDisabled: false,
                        followed: make
                    });
                }).catch(function (error) {});
            } else {
                this.props.changeContent('giris-yap', true);
            }
        }
    }, {
        key: "openEditOfBottomComment",
        value: function openEditOfBottomComment() {
            this.setState({
                bottomCommentForm: "edit"
            });
        }
    }, {
        key: "openDeleteOfBottomComment",
        value: function openDeleteOfBottomComment() {
            this.setState({
                bottomCommentForm: "delete"
            });
        }
    }, {
        key: "openNormalOfBottomComment",
        value: function openNormalOfBottomComment() {
            this.setState({
                bottomCommentForm: "normal"
            });
        }
    }, {
        key: "hideBottomComment",
        value: function hideBottomComment() {
            this.setState({
                bottomCommentForm: "hidden"
            });
        }
    }, {
        key: "openLoadingSpinOfBottomComment",
        value: function openLoadingSpinOfBottomComment() {
            this.setState({
                bottomCommentForm: "loading"
            });
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.form == "normal") {
                document.title = this.state.productName;
                return React.createElement(
                    "div",
                    null,
                    React.createElement(ProductInfo, { tags: this.state.tagsInfo, productName: this.state.productName, changeContent: this.props.changeContent, followToggle: this.followToggle, followed: this.state.followed, followButtonDisabled: this.state.followButtonDisabled }),
                    React.createElement(Navigation, {
                        type: this.state.navigationType,
                        sortBy: this.state.sortBy,
                        navigationOptions: this.state.navigationOptions,
                        form: this.state.commentsForm,
                        handleChangeSortBy: this.changeSortBy,
                        pageCount: this.state.pageCount,
                        currentPage: this.state.pageNumber,
                        handleChangePageNumber: this.changePageNumber,
                        showAllComments: this.showAllComments
                    }),
                    React.createElement(Comments, {
                        comments: this.state.comments,
                        tags: this.state.tagsInfo,
                        form: this.state.commentsForm,
                        changeContent: this.props.changeContent,
                        reloadFunc: this.reloadAllComment,
                        productID: this.state.productID
                    }),
                    React.createElement(Navigation, {
                        type: this.state.navigationType,
                        sortBy: this.state.sortBy,
                        navigationOptions: this.state.navigationOptions,
                        form: this.state.commentsForm,
                        handleChangeSortBy: this.changeSortBy,
                        pageCount: this.state.pageCount,
                        currentPage: this.state.pageNumber,
                        handleChangePageNumber: this.changePageNumber,
                        showAllComments: this.showAllComments
                    }),
                    React.createElement(BottomComment, {
                        form: this.state.bottomCommentForm,
                        reloadFunc: this.reloadAllComment,
                        productID: this.state.productID,
                        tags: this.state.tagsInfo,
                        ownComment: this.state.ownComment,
                        ownCommentPublished: this.state.ownCommentPublished,
                        changeContent: this.props.changeContent,
                        openEdit: this.openEditOfBottomComment,
                        openDelete: this.openDeleteOfBottomComment,
                        openNormal: this.openNormalOfBottomComment,
                        hide: this.hideBottomComment,
                        openLoadingSpin: this.openLoadingSpinOfBottomComment
                    }),
                    React.createElement(EditProductButton, { changeContent: this.props.changeContent, productSlug: this.state.productSlug })
                );
            } else if (this.state.form == "loading") {
                document.title = "Ürün";
                return React.createElement(RowLoadingSpin, { nonSegment: true });
            } else if (this.state.form == "notFound") {
                return React.createElement(ProductNotFound, { changeContent: this.props.changeContent });
            }
        }
    }]);

    return Product;
}(React.Component);

var Navigation = function (_React$Component2) {
    _inherits(Navigation, _React$Component2);

    function Navigation() {
        _classCallCheck(this, Navigation);

        return _possibleConstructorReturn(this, (Navigation.__proto__ || Object.getPrototypeOf(Navigation)).apply(this, arguments));
    }

    _createClass(Navigation, [{
        key: "render",
        value: function render() {
            if (this.props.type == "all") {
                return React.createElement(PageNavigation, {
                    sortBy: this.props.sortBy,
                    options: this.props.navigationOptions,
                    form: this.props.form,
                    handleChangeSortBy: this.props.handleChangeSortBy,
                    pageCount: this.props.pageCount,
                    currentPage: this.props.currentPage,
                    handleChangePageNumber: this.props.handleChangePageNumber
                });
            } else if (this.props.type == "unread") {
                return React.createElement(UnreadNavigation, {
                    showAllComments: this.props.showAllComments
                });
            }
        }
    }]);

    return Navigation;
}(React.Component);

var ProductInfo = function (_React$Component3) {
    _inherits(ProductInfo, _React$Component3);

    function ProductInfo(props) {
        _classCallCheck(this, ProductInfo);

        var _this7 = _possibleConstructorReturn(this, (ProductInfo.__proto__ || Object.getPrototypeOf(ProductInfo)).call(this, props));

        _this7.followButton = _this7.followButton.bind(_this7);
        return _this7;
    }

    _createClass(ProductInfo, [{
        key: "followButton",
        value: function followButton() {
            this.props.followToggle();
        }
    }, {
        key: "render",
        value: function render() {
            this.disabled = this.props.followButtonDisabled ? "disabled" : "";
            return React.createElement(
                "div",
                null,
                React.createElement(
                    Row,
                    { size: "two", nonStackable: true },
                    React.createElement(
                        Column,
                        null,
                        React.createElement(H, { type: "1", text: this.props.productName, id: "productHeader" })
                    ),
                    React.createElement(
                        Column,
                        null,
                        React.createElement(
                            FloatRight,
                            null,
                            !this.props.followed ? React.createElement(
                                "button",
                                { className: "ui teal button " + this.disabled, onClick: this.followButton },
                                React.createElement(
                                    "i",
                                    { className: "icon" },
                                    React.createElement("i", { className: "fa fa-plus", "aria-hidden": "true" })
                                ),
                                "Takip Et"
                            ) : React.createElement(
                                "button",
                                { className: "ui olive button " + this.disabled, onClick: this.followButton },
                                React.createElement(
                                    "i",
                                    { className: "icon" },
                                    React.createElement("i", { className: "fa fa-times", "aria-hidden": "true" })
                                ),
                                "Takibi B\u0131rak"
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
                        React.createElement(Tags, { tags: this.props.tags, activeOnly: false, handleOnClick: this.props.changeContent })
                    )
                )
            );
        }
    }]);

    return ProductInfo;
}(React.Component);

var UnreadNavigation = function (_React$Component4) {
    _inherits(UnreadNavigation, _React$Component4);

    function UnreadNavigation() {
        _classCallCheck(this, UnreadNavigation);

        return _possibleConstructorReturn(this, (UnreadNavigation.__proto__ || Object.getPrototypeOf(UnreadNavigation)).apply(this, arguments));
    }

    _createClass(UnreadNavigation, [{
        key: "render",
        value: function render() {
            return React.createElement(
                Row,
                { size: "one" },
                React.createElement(
                    Column,
                    null,
                    React.createElement(
                        "div",
                        { className: "ui big message" },
                        React.createElement(
                            Row,
                            { size: "two" },
                            React.createElement(
                                Column,
                                null,
                                "Okunmam\u0131\u015F 127 yorumunuzdan ilk 10'u g\xF6steriliyor"
                            ),
                            React.createElement(
                                Column,
                                null,
                                React.createElement(
                                    FloatRight,
                                    null,
                                    React.createElement(
                                        "button",
                                        { className: "ui olive small button", onClick: this.props.showAllComments },
                                        "Sonraki"
                                    ),
                                    React.createElement(
                                        "button",
                                        { className: "ui olive small button", onClick: this.props.showAllComments },
                                        "B\xFCt\xFCn Yorumlar\u0131 G\xF6ster"
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return UnreadNavigation;
}(React.Component);

var EditProductButton = function (_React$Component5) {
    _inherits(EditProductButton, _React$Component5);

    function EditProductButton(props) {
        _classCallCheck(this, EditProductButton);

        var _this9 = _possibleConstructorReturn(this, (EditProductButton.__proto__ || Object.getPrototypeOf(EditProductButton)).call(this, props));

        _this9.goEditProduct = _this9.goEditProduct.bind(_this9);
        return _this9;
    }

    _createClass(EditProductButton, [{
        key: "goEditProduct",
        value: function goEditProduct() {
            if (isMember()) {
                this.props.changeContent(SITEURL + 'urun-duzenle/' + this.props.productSlug);
            } else {
                this.props.changeContent('giris-yap', true);
            }
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                Row,
                { size: "one" },
                React.createElement(
                    Column,
                    null,
                    React.createElement(
                        "button",
                        { "class": "ui teal button", onClick: this.goEditProduct },
                        React.createElement(
                            "i",
                            { "class": "icon" },
                            React.createElement("i", { "class": "fa fa-pencil-square-o", "aria-hidden": "true" })
                        ),
                        "D\xFCzenle"
                    )
                )
            );
        }
    }]);

    return EditProductButton;
}(React.Component);