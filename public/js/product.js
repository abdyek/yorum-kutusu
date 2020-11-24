var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DATA = {
    product: {
        id: "1",
        title: "Başlık",
        slug: "slug'ı"
    },
    tags: [{
        slug: "apple",
        tagName: "Apple",
        tagAvarageRating: null
    }, {
        slug: "ekran",
        tagName: "Ekran",
        tagAvarageRating: null
    }],
    comments: [{
        id: "1",
        text: "bu bir yorumdur",
        dateTime: "2020-11-22 13:23:08",
        edited: "0",
        lastEditDateTime: null,
        likeCount: "0",
        liked: false,
        isOwner: true,
        owner: {
            id: "1",
            username: "MahmuT",
            slug: "mahmut"
        },
        rating: [{
            slug: "ekran",
            tagName: "Ekran",
            ratingValue: "5"
        }]
    }]
};

var Product = function (_React$Component) {
    _inherits(Product, _React$Component);

    function Product(props) {
        _classCallCheck(this, Product);

        var _this = _possibleConstructorReturn(this, (Product.__proto__ || Object.getPrototypeOf(Product)).call(this, props));

        _this.state = {
            form: "loading"
        };
        _this.manageOtherSlug = _this.manageOtherSlug.bind(_this);
        _this.fetchProduct = _this.fetchProduct.bind(_this);
        _this.fetchComment = _this.fetchComment.bind(_this);
        _this.refreshUrl = _this.refreshUrl.bind(_this);
        _this.load = _this.load.bind(_this);
        _this.normalizer = _this.normalizer.bind(_this);
        _this.changeSortBy = _this.changeSortBy.bind(_this);
        _this.changePageNumber = _this.changePageNumber.bind(_this);
        _this.refreshComments = _this.refreshComments.bind(_this);
        _this.showAllComments = _this.showAllComments.bind(_this);
        return _this;
    }

    _createClass(Product, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.manageOtherSlug();
            this.load();
            this.setState({
                // normal, loading, notFound
                form: "loading",
                // normal, loading, noComment
                productName: "Iphone 5s",
                commentsForm: "normal",
                commentType: "all", // all, special
                specialInfo: {},
                /*
                       specialInfo:{
                	first:"15",
                	last:"30"
                },
                */
                sortBy: this.sortBy,
                pageNumber: this.pageNumber,
                comments: [{
                    id: 0,
                    text: "burası yorumun text'i",
                    likeCount: 13,
                    liked: true,
                    title: "ahmet",
                    type: "profile",
                    slug: "ahmet",
                    date: "19 Temmuz - 21:45",
                    tags: { 3: {
                            passive: false,
                            text: "Batarya",
                            color: "yellow",
                            rateValue: "5",
                            slug: "batarya"
                        },
                        4: {
                            passive: false,
                            text: "Kamera",
                            color: "orange",
                            rateValue: "4",
                            slug: "kamera"
                        },
                        5: {
                            passive: false,
                            text: "Tasarım",
                            color: "",
                            rateValue: "-",
                            slug: "tasarim"
                        }
                    },
                    owner: true
                }, {
                    id: 99,
                    text: "Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı 1500'lerden beri endüstri standardı sahte metinler olarak kullanılmıştır. Beşyüz yıl boyunca varlığını sürdürmekle kalmamış, aynı zamanda pek değişmeden elektronik dizgiye de sıçramıştır. 1960'larda Lorem Ipsum pasajları da içeren Letraset yapraklarının yayınlanması ile ve yakın zamanda Aldus PageMaker gibi Lorem Ipsum sürümleri içeren masaüstü yayıncılık yazılımları ile popüler olmuştur.Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı 1500'lerden beri endüstri standardı sahte metinler olarak kullanılmıştır. Beşyüz yıl boyunca varlığını sürdürmekle kalmamış, aynı zamanda pek değişmeden elektronik dizgiye de sıçramıştır. 1960'larda Lorem Ipsum pasajları da içeren Letraset yapraklarının yayınlanması ile ve yakın zamanda Aldus PageMaker gibi Lorem Ipsum sürümleri içeren masaüstü yayıncılık yazılımları ile popüler olmuştuLorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı 1500'lerden beri endüstri standardı sahte metinler olarak kullanılmıştır. Beşyüz yıl boyunca varlığını sürdürmekle kalmamış, aynı zamanda pek değişmeden elektronik dizgiye de sıçramıştır. 1960'larda Lorem Ipsum pasajları da içeren Letraset yapraklarının yayınlanması ile ve yakın zamanda Aldus PageMaker gibi Lorem Ipsum sürümleri içeren masaüstü yayıncılık yazılımları ile popüler olmuştur.Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı 1500'lerden beri endüstri standardı sahte metinler olarak kullanılmıştır. Beşyüz yıl boyunca varlığını sürdürmekle kalmamış, aynı zamanda pek değişmeden elektronik dizgiye de sıçramıştır. 1960'larda Lorem Ipsum pasajları da içeren Letraset yapraklarının yayınlanması ile ve yakın zamanda Aldus PageMaker gibi Lorem Ipsum sürümleri içeren masaüstü yayıncılık yazılımları ile popüler olmuştur.Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı 1500'lerden beri endüstri standardı sahte metinler olarak kullanılmıştır. Beşyüz yıl boyunca varlığını sürdürmekle kalmamış, aynı zamanda pek değişmeden elektronik dizgiye de sıçramıştır. 1960'larda Lorem Ipsum pasajları da içeren Letraset yapraklarının yayınlanması ile ve yakın zamanda Aldus PageMaker gibi Lorem Ipsum sürümleri içeren masaüstü yayıncılık yazılımları ile popüler olmuştur.r.",
                    likeCount: 13,
                    liked: true,
                    title: "Yunus Emre",
                    type: "profile",
                    slug: "yunus-emre",
                    date: "19 Temmuz - 21:45",
                    tags: {
                        3: {
                            passive: false,
                            text: "Batarya",
                            color: "yellow",
                            rateValue: "5",
                            slug: "batarya"
                        },
                        4: {
                            passive: false,
                            text: "Kamera",
                            color: "orange",
                            rateValue: "4",
                            slug: "kamera"
                        },
                        5: {
                            passive: false,
                            text: "Tasarım",
                            color: "",
                            rateValue: "-",
                            slug: "tasarim"
                        }
                    },
                    owner: false
                }],
                tagsInfo: {
                    0: {
                        passive: true,
                        text: "Akıllı Telefon",
                        slug: "akilli-telefon"
                    },
                    1: {
                        passive: true,
                        text: "Apple",
                        slug: "apple"
                    },
                    2: {
                        passive: true,
                        text: "IPhone",
                        slug: "iphone"
                    },
                    3: {
                        passive: false,
                        text: "Batarya",
                        color: "yellow",
                        rateValue: "5.5",
                        slug: "batarya"
                    },
                    4: {
                        passive: false,
                        text: "Kamera",
                        color: "orange",
                        rateValue: "4.2",
                        slug: "kamera"
                    },
                    5: {
                        passive: false,
                        text: "Ekran",
                        color: "green",
                        rateValue: "9.3",
                        slug: "ekran"
                    }
                }
            });
        }
    }, {
        key: "manageOtherSlug",
        value: function manageOtherSlug() {
            this.slugs = getSlugsExtra("urun");
            this.productSlug = this.slugs[0];
            this.commentType = this.slugs[1];
            if (this.commentType == "arasi") {
                var specialInfo = {};
                specialInfo = {
                    first: slugs[2].split("-")[0],
                    last: slugs[2].split("-")[1]
                };
            } else if (this.commentType == "time" || this.commentType == "like") {
                this.sortBy = this.commentType;
                this.pageNumber = this.slugs[2] ? this.slugs[2] : 1;
            } else {
                this.sortBy = "time";
                this.pageNumber = 1;
                this.refreshUrl();
            }
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
                if (!json['other']['comments'].length && _this2.pageNumber != 1) {
                    console.log("ilk sayfaya yönlendirmeli");
                    data['pageNumber'] = _this2.pageNumber = 1;
                    _this2.fetchProduct(data);
                    _this2.refreshUrl();
                } else {
                    _this2.setState({
                        form: "normal",
                        productName: json['other']['product']['title'],
                        comments: _this2.normalizer('comments', json['other']['comments']),
                        commentsForm: json['other']['comments'].length ? 'normal' : 'noComment',
                        pageNumber: _this2.pageNumber,
                        pageCount: json['other']['pageCount'],
                        tagsInfo: _this2.normalizer('tags', json['other']['tags'])
                    });
                }
            }).catch(function (error) {
                console.log(error);
                if (error.message == 404) {
                    _this2.setState({ form: "notFound" });
                } else {
                    console.log("bilinmeyen bir hata");
                }
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
                    comments: _this3.normalizer('comments', json['other']['comments'])
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
        key: "normalizer",
        value: function normalizer(key, data) {
            if (key == 'comments') {
                var comments = [];
                for (var i = 0; i < data.length; i++) {
                    var com = data[i];
                    comments.push({
                        id: com.commentID,
                        text: com.commentText,
                        //commentEdited,
                        //commentLastEditDateTime,
                        likeCount: com.commentLikeCount,
                        liked: com.liked,
                        title: com.owner.username,
                        type: "profile",
                        slug: com.owner.slug,
                        date: com.commentCreateDateTime,
                        tags: this.normalizer('comment-rating', com.rating),
                        /*
                        tags:{3:{
                                        passive:false,
                                        text:"Batarya",
                                        color:"yellow",
                                        rateValue: "5",
                                        slug:"batarya"
                                },
                                4:{
                                        passive:false,
                                        text:"Kamera",
                                        color:"orange",
                                        rateValue: "4",
                                        slug:"kamera"
                                },
                                5:{
                                        passive:false,
                                        text:"Tasarım",
                                        color:"",
                                        rateValue: "-",
                                        slug:"tasarim"
                                }
                        },
                        */
                        owner: com.isOwner
                    });
                }
                return comments;
            } else if (key == "comment-rating") {
                var tags = {};
                var keys = Object.keys(data);
                for (var _i = 0; _i < keys.length; _i++) {
                    tags[keys[_i]] = {
                        passive: false,
                        text: data[_i].tagName,
                        color: 'yellow', // bu kısım düzeltilecek
                        rateValue: data[_i].ratingValue,
                        slug: data[_i].slug
                    };
                }
                return tags;
            } else if (key == "tags") {
                var _tags = {};
                for (var _i2 = 0; _i2 < data.length; _i2++) {
                    _tags[_i2] = {
                        passive: data[_i2].tagPassive == "1" ? true : false,
                        text: data[_i2].tagName,
                        color: getRatingColor(data[_i2].tagAvarageRating),
                        slug: data[_i2].slug,
                        rateValue: data[_i2].tagAvarageRating
                    };
                }
                console.log(_tags);
                return _tags;
            }
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
        key: "render",
        value: function render() {
            if (this.state.form == "normal") {
                document.title = this.state.productName;
                return React.createElement(
                    "div",
                    null,
                    React.createElement(ProductInfo, { tags: this.state.tagsInfo, productName: this.state.productName, changeContent: this.props.changeContent }),
                    this.state.commentType == "all" ? React.createElement(PageNavigation, { sortBy: this.state.sortBy, form: this.state.commentsForm, handleChangeSortBy: this.changeSortBy, pageCount: this.state.pageCount, currentPage: this.state.pageNumber, handleChangePageNumber: this.changePageNumber }) : React.createElement(SpecialCommentHeader, { specialInfo: this.state.specialInfo, showAllComments: this.showAllComments }),
                    React.createElement(Comments, { comments: this.state.comments, form: this.state.commentsForm, changeContent: this.props.changeContent }),
                    this.state.commentType == "all" ? React.createElement(PageNavigation, { sortBy: this.state.sortBy, form: this.state.commentsForm, handleChangeSortBy: this.changeSortBy, pageCount: this.state.pageCount, currentPage: this.state.pageNumber, handleChangePageNumber: this.changePageNumber }) : "",
                    React.createElement(WriteComment, { tags: this.state.tagsInfo })
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

        var _this4 = _possibleConstructorReturn(this, (ProductInfo.__proto__ || Object.getPrototypeOf(ProductInfo)).call(this, props));

        _this4.followButtonAtt = {
            follow: {
                followed: false,
                buttonName: "Takip Et",
                buttonClassName: "ui teal button",
                icon: React.createElement("i", { "class": "fa fa-plus", "aria-hidden": "true" })
            },
            unfollow: {
                followed: true,
                buttonName: "Takibi Bırak",
                buttonClassName: "ui olive button",
                icon: React.createElement("i", { "class": "fa fa-times", "aria-hidden": "true" })
            }
        };
        _this4.state = {
            followed: false,
            followButtonAtt: _this4.followButtonAtt.follow
        };
        _this4.followButton = _this4.followButton.bind(_this4);
        return _this4;
    }

    _createClass(ProductInfo, [{
        key: "followButton",
        value: function followButton() {
            if (this.state.followed) {
                this.setState({
                    followed: false,
                    followButtonAtt: this.followButtonAtt.follow
                });
            } else {
                this.setState({
                    followed: true,
                    followButtonAtt: this.followButtonAtt.unfollow
                });
            }
        }
    }, {
        key: "render",
        value: function render() {
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
                            React.createElement(
                                "button",
                                { "class": this.state.followButtonAtt.buttonClassName, onClick: this.followButton },
                                React.createElement(
                                    "i",
                                    { "class": "icon" },
                                    this.state.followButtonAtt.icon
                                ),
                                this.state.followButtonAtt.buttonName
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
            var _this6 = this;

            return React.createElement(
                Row,
                { size: "one" },
                React.createElement(
                    Column,
                    null,
                    React.createElement(
                        "div",
                        { "class": "ui big message" },
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
                                                e.preventDefault();_this6.props.showAllComments();
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