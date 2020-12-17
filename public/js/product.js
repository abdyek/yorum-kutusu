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
            commentType: "all",
            sortBy: "time",
            followButtonDisabled: false,
            followed: false
        };
        _this.manageOtherSlug = _this.manageOtherSlug.bind(_this);
        _this.fetchProduct = _this.fetchProduct.bind(_this);
        _this.fetchComment = _this.fetchComment.bind(_this);
        _this.refreshUrl = _this.refreshUrl.bind(_this);
        _this.load = _this.load.bind(_this);
        _this.changeSortBy = _this.changeSortBy.bind(_this);
        _this.changePageNumber = _this.changePageNumber.bind(_this);
        _this.refreshComments = _this.refreshComments.bind(_this);
        _this.showAllComments = _this.showAllComments.bind(_this);
        _this.followToggle = _this.followToggle.bind(_this);
        return _this;
    }

    _createClass(Product, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.manageOtherSlug();
            this.load();
        }
    }, {
        key: "manageOtherSlug",
        value: function manageOtherSlug() {
            var pathNames = getPathNames();
            this.productSlug = pathNames[1];
            this.sortBy = pathNames[2] ? pathNames[2] : "time";
            this.pageNumber = pathNames[3] ? pathNames[3] : 1;
            if (this.sortBy != "time" && this.sortBy != "like") {
                this.sortBy = "time";
            }
            this.setState({
                sortBy: this.sortBy
            });
            this.refreshUrl();
            var commentType = "all"; // all, spacial
            // not: buradaki değer atamalar ve değişkenlerin bir kısmı deneme amaçlı, setState içindeki hemen hemen hepsi api tarafından gelecek
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
                    productID: json['other']['product']['id'],
                    comments: normalizer('comments', json['other']['comments']),
                    ownComment: ownComment,
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
                sortBy: this.sortBy,
                pageNumber: this.pageNumber,
                onlyComment: true
            }), { method: 'GET' }).then(function (response) {
                if (!response.ok) throw new Error(response.status);else return response.json();
            }).then(function (json) {
                _this3.setState({
                    commentsForm: "normal",
                    comments: normalizer('comments', json['other']['comments'])
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
            this.fetchProduct({
                "productSlug": this.productSlug,
                "sortBy": this.sortBy,
                "pageNumber": this.pageNumber,
                "onlyComment": false
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
                commentType: "all",
                sortBy: this.sortBy,
                pageNumber: 1
            });
            this.refreshComments();
        }
    }, {
        key: "followToggle",
        value: function followToggle() {
            var _this4 = this;

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
                    _this4.setState({
                        followButtonDisabled: false,
                        followed: make
                    });
                }).catch(function (error) {});
            } else {
                this.props.changeContent('giris-yap', true);
            }
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
                    this.state.commentType == "all" ? React.createElement(PageNavigation, { sortBy: this.state.sortBy, form: this.state.commentsForm, handleChangeSortBy: this.changeSortBy, pageCount: this.state.pageCount, currentPage: this.state.pageNumber, handleChangePageNumber: this.changePageNumber }) : React.createElement(SpecialCommentHeader, { specialInfo: this.state.specialInfo, showAllComments: this.showAllComments }),
                    React.createElement(Comments, { comments: this.state.comments, form: this.state.commentsForm, changeContent: this.props.changeContent }),
                    this.state.commentType == "all" ? React.createElement(PageNavigation, { sortBy: this.state.sortBy, form: this.state.commentsForm, handleChangeSortBy: this.changeSortBy, pageCount: this.state.pageCount, currentPage: this.state.pageNumber, handleChangePageNumber: this.changePageNumber }) : "",
                    React.createElement(WriteComment, { tags: this.state.tagsInfo, productID: this.state.productID, ownComment: this.state.ownComment })
                );
            } else if (this.state.form == "loading") {
                document.title = "Ürün";
                return React.createElement(RowLoadingSpin, { nonSegment: true });
            } else if (this.state.form == "notFound") {
                document.title = "Ürün Bulunamadı";
                return React.createElement(
                    Row,
                    { size: "one" },
                    React.createElement(
                        Column,
                        null,
                        React.createElement(BasicMessage, { type: "warning", text: "B\xF6yle bir \xFCr\xFCn yok" }),
                        React.createElement(
                            Center,
                            null,
                            React.createElement(
                                "a",
                                { href: "urun-olustur" },
                                "Yeni Bir \xDCr\xFCn Olu\u015Ftur"
                            )
                        )
                    )
                );
            }
        }
    }]);

    return Product;
}(React.Component);

var ProductInfo = function (_React$Component2) {
    _inherits(ProductInfo, _React$Component2);

    function ProductInfo(props) {
        _classCallCheck(this, ProductInfo);

        var _this5 = _possibleConstructorReturn(this, (ProductInfo.__proto__ || Object.getPrototypeOf(ProductInfo)).call(this, props));

        _this5.followButton = _this5.followButton.bind(_this5);
        return _this5;
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
                        React.createElement(H, { type: "1", text: this.props.productName })
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

var SpecialCommentHeader = function (_React$Component3) {
    _inherits(SpecialCommentHeader, _React$Component3);

    function SpecialCommentHeader() {
        _classCallCheck(this, SpecialCommentHeader);

        return _possibleConstructorReturn(this, (SpecialCommentHeader.__proto__ || Object.getPrototypeOf(SpecialCommentHeader)).apply(this, arguments));
    }

    _createClass(SpecialCommentHeader, [{
        key: "render",
        value: function render() {
            var _this7 = this;

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
                                this.props.specialInfo.first,
                                " - ",
                                this.props.specialInfo.last,
                                " aras\u0131 g\xF6steriliyor"
                            ),
                            React.createElement(
                                Column,
                                null,
                                React.createElement(
                                    FloatRight,
                                    null,
                                    React.createElement(
                                        "a",
                                        { onClick: function onClick(e) {
                                                e.preventDefault();_this7.props.showAllComments();
                                            } },
                                        "T\xFCm\xFCn\xFC G\xF6ster"
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return SpecialCommentHeader;
}(React.Component);