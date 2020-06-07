var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));
    }

    _createClass(App, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(Header, null),
                " ",
                React.createElement(Content, null),
                React.createElement(Footer, null),
                " "
            );
        }
    }]);

    return App;
}(React.Component);

var Content = function (_React$Component2) {
    _inherits(Content, _React$Component2);

    function Content() {
        _classCallCheck(this, Content);

        return _possibleConstructorReturn(this, (Content.__proto__ || Object.getPrototypeOf(Content)).apply(this, arguments));
    }

    _createClass(Content, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { id: "content" },
                React.createElement(BreadCrumb, null),
                React.createElement(ProductHeader, null),
                React.createElement(FollowButton, { followed: true }),
                React.createElement(Product, null),
                React.createElement(Comments, null)
            );
        }
    }]);

    return Content;
}(React.Component);

var BreadCrumb = function (_React$Component3) {
    _inherits(BreadCrumb, _React$Component3);

    function BreadCrumb() {
        _classCallCheck(this, BreadCrumb);

        return _possibleConstructorReturn(this, (BreadCrumb.__proto__ || Object.getPrototypeOf(BreadCrumb)).apply(this, arguments));
    }

    _createClass(BreadCrumb, [{
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
                        { className: "ui breadcrumb" },
                        React.createElement(
                            "a",
                            { className: "section" },
                            "Elektronik"
                        ),
                        React.createElement("i", { className: "right angle icon divider" }),
                        React.createElement(
                            "a",
                            { className: "section" },
                            "Mobil Cihazlar"
                        ),
                        React.createElement("i", { className: "right angle icon divider" }),
                        React.createElement(
                            "div",
                            { className: "active section" },
                            "Iphone"
                        )
                    )
                )
            );
        }
    }]);

    return BreadCrumb;
}(React.Component);

var ProductHeader = function (_React$Component4) {
    _inherits(ProductHeader, _React$Component4);

    function ProductHeader() {
        _classCallCheck(this, ProductHeader);

        return _possibleConstructorReturn(this, (ProductHeader.__proto__ || Object.getPrototypeOf(ProductHeader)).apply(this, arguments));
    }

    _createClass(ProductHeader, [{
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
                        { id: "productHeader" },
                        React.createElement(H, { type: "1", textAlign: "center", text: "iphone 5s" })
                    )
                )
            );
        }
    }]);

    return ProductHeader;
}(React.Component);

var FollowButton = function (_React$Component5) {
    _inherits(FollowButton, _React$Component5);

    function FollowButton(props) {
        _classCallCheck(this, FollowButton);

        var _this5 = _possibleConstructorReturn(this, (FollowButton.__proto__ || Object.getPrototypeOf(FollowButton)).call(this, props));

        _this5.followToggle = _this5.followToggle.bind(_this5);
        if (_this5.props.followed) {
            _this5.state = {
                followed: true,
                class: " red "
            };
        } else {
            _this5.state = {
                followed: false,
                class: " "
            };
        }
        return _this5;
    }

    _createClass(FollowButton, [{
        key: "followToggle",
        value: function followToggle() {
            if (this.state.followed) {
                // takipten çıkma kodları buraya gelecek
                this.setState({
                    followed: false,
                    class: " "
                });
            } else {
                // takip etme kodları buraya gelecek
                this.setState({
                    followed: true,
                    class: " red "
                });
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
                        FloatRight,
                        null,
                        React.createElement(
                            "div",
                            { id: "followButton", onClick: this.followToggle },
                            React.createElement(
                                "div",
                                { className: "ui labeled button", tabIndex: "0" },
                                React.createElement(
                                    "div",
                                    { className: "ui" + this.state.class + "button" },
                                    React.createElement("i", { className: "heart icon" }),
                                    " Takip Et"
                                ),
                                React.createElement(
                                    "a",
                                    { className: "ui basic" + this.state.class + "left pointing label" },
                                    "1,048"
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return FollowButton;
}(React.Component);

var Product = function (_React$Component6) {
    _inherits(Product, _React$Component6);

    function Product() {
        _classCallCheck(this, Product);

        return _possibleConstructorReturn(this, (Product.__proto__ || Object.getPrototypeOf(Product)).apply(this, arguments));
    }

    _createClass(Product, [{
        key: "render",
        value: function render() {
            return React.createElement(
                Row,
                { size: "sixteen" },
                React.createElement(
                    WideColumn,
                    { size: "eight" },
                    React.createElement(
                        Row,
                        { size: "one" },
                        React.createElement(
                            Column,
                            null,
                            React.createElement(
                                Center,
                                null,
                                React.createElement(ImageSlider, { srcs: ["https://cdn.shoplightspeed.com/shops/613622/files/8420157/image.jpg", "http://3.bp.blogspot.com/-uC4SEk9v07I/UyVCeORCsdI/AAAAAAAAA-k/6xZx0EVnCMc/s1600/iphone+5s+rep.jpg", "https://i.ytimg.com/vi/2jDd8iPIuEc/maxresdefault.jpg", "https://i.ytimg.com/vi/kLg__oZYfG8/maxresdefault.jpg", "http://3.bp.blogspot.com/-uC4SEk9v07I/UyVCeORCsdI/AAAAAAAAA-k/6xZx0EVnCMc/s1600/iphone+5s+rep.jpg"] })
                            )
                        )
                    )
                ),
                React.createElement(
                    WideColumn,
                    { size: "eight" },
                    React.createElement(Rating, null)
                )
            );
        }
    }]);

    return Product;
}(React.Component);

var ImageSlider = function (_React$Component7) {
    _inherits(ImageSlider, _React$Component7);

    function ImageSlider(props) {
        _classCallCheck(this, ImageSlider);

        var _this7 = _possibleConstructorReturn(this, (ImageSlider.__proto__ || Object.getPrototypeOf(ImageSlider)).call(this, props));

        _this7.nextIndex = 0;
        _this7.state = {
            src: _this7.props.srcs[0],
            index: 0
        };
        _this7.change = _this7.change.bind(_this7);
        return _this7;
    }

    _createClass(ImageSlider, [{
        key: "change",
        value: function change(id) {
            this.nextIndex = this.state.index + id;
            if (this.nextIndex == this.props.srcs.length) {
                this.nextIndex = 0;
            } else if (this.nextIndex == -1) {
                this.nextIndex = this.props.srcs.length - 1;
            }
            this.setState({
                index: this.nextIndex,
                src: this.props.srcs[this.nextIndex]
            });
            console.log(this.nextIndex);
        }
    }, {
        key: "render",
        value: function render() {
            var _this8 = this;

            return React.createElement(
                "div",
                { id: "imageSlider" },
                React.createElement(
                    "div",
                    { id: "imageSliderImg" },
                    React.createElement(Img, { src: this.state.src })
                ),
                React.createElement(
                    "div",
                    { id: "imageSliderButtons" },
                    React.createElement(
                        Row,
                        { size: "one" },
                        React.createElement(
                            Column,
                            null,
                            React.createElement(DirectlyButtons, { selectedIndex: this.state.index + 1 })
                        )
                    ),
                    React.createElement(
                        Row,
                        { size: "one", nonStackable: true },
                        React.createElement(
                            Column,
                            null,
                            React.createElement(
                                "button",
                                { className: "mini ui icon button", onClick: function onClick() {
                                        return _this8.change(-1);
                                    } },
                                React.createElement("i", { className: "left arrow icon" })
                            ),
                            React.createElement(
                                "button",
                                { className: "mini ui icon button", onClick: function onClick() {
                                        return _this8.change(+1);
                                    } },
                                React.createElement("i", { className: "right arrow icon" })
                            )
                        )
                    )
                )
            );
        }
    }]);

    return ImageSlider;
}(React.Component);

var Img = function (_React$Component8) {
    _inherits(Img, _React$Component8);

    function Img() {
        _classCallCheck(this, Img);

        return _possibleConstructorReturn(this, (Img.__proto__ || Object.getPrototypeOf(Img)).apply(this, arguments));
    }

    _createClass(Img, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement("img", { id: "productImg", className: "ui image", src: this.props.src })
            );
        }
    }]);

    return Img;
}(React.Component);

var DirectlyButtons = function (_React$Component9) {
    _inherits(DirectlyButtons, _React$Component9);

    function DirectlyButtons(props) {
        _classCallCheck(this, DirectlyButtons);

        var _this10 = _possibleConstructorReturn(this, (DirectlyButtons.__proto__ || Object.getPrototypeOf(DirectlyButtons)).call(this, props));

        _this10.buttons = [];
        _this10.state = {
            selectedIndex: 0
        };
        for (var i = 0; i < 4; i++) {
            if (_this10.props.selectedIndex == i + 1) {
                _this10.buttons.push(React.createElement(
                    "button",
                    { key: i, className: "disabled ui button" },
                    i + 1
                ));
            } else {
                _this10.buttons.push(React.createElement(
                    "button",
                    { key: i, className: "ui button" },
                    i + 1
                ));
            }
        }
        return _this10;
    }

    _createClass(DirectlyButtons, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "small blue ui buttons" },
                this.buttons
            );
        }
    }]);

    return DirectlyButtons;
}(React.Component);

var Rating = function (_React$Component10) {
    _inherits(Rating, _React$Component10);

    function Rating() {
        _classCallCheck(this, Rating);

        return _possibleConstructorReturn(this, (Rating.__proto__ || Object.getPrototypeOf(Rating)).apply(this, arguments));
    }

    _createClass(Rating, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(ProductAttribute, { name: "Sa\u011Flaml\u0131k", percentValue: "4.9" }),
                React.createElement(ProductAttribute, { name: "Kullan\u0131\u015Fl\u0131l\u0131k", percentValue: "5.2" }),
                React.createElement(ProductAttribute, { name: "Pil \xD6mr\xFC", percentValue: "7.2" })
            );
        }
    }]);

    return Rating;
}(React.Component);

var ProductAttribute = function (_React$Component11) {
    _inherits(ProductAttribute, _React$Component11);

    function ProductAttribute() {
        _classCallCheck(this, ProductAttribute);

        return _possibleConstructorReturn(this, (ProductAttribute.__proto__ || Object.getPrototypeOf(ProductAttribute)).apply(this, arguments));
    }

    _createClass(ProductAttribute, [{
        key: "render",
        value: function render() {
            return React.createElement(
                Row,
                { size: "two", nonStackable: true },
                React.createElement(
                    Column,
                    null,
                    React.createElement(ProductAttributeName, { name: this.props.name })
                ),
                React.createElement(
                    Column,
                    null,
                    React.createElement(
                        Center,
                        null,
                        React.createElement(DrawCircle, { percentValue: this.props.percentValue })
                    )
                )
            );
        }
    }]);

    return ProductAttribute;
}(React.Component);

var ProductAttributeName = function (_React$Component12) {
    _inherits(ProductAttributeName, _React$Component12);

    function ProductAttributeName() {
        _classCallCheck(this, ProductAttributeName);

        return _possibleConstructorReturn(this, (ProductAttributeName.__proto__ || Object.getPrototypeOf(ProductAttributeName)).apply(this, arguments));
    }

    _createClass(ProductAttributeName, [{
        key: "render",
        value: function render() {
            return React.createElement(H, { type: "3", textAlign: "center", text: this.props.name, optional: "lineHeight80px" });
        }
    }]);

    return ProductAttributeName;
}(React.Component);

var DrawCircle = function (_React$Component13) {
    _inherits(DrawCircle, _React$Component13);

    function DrawCircle(props) {
        _classCallCheck(this, DrawCircle);

        var _this14 = _possibleConstructorReturn(this, (DrawCircle.__proto__ || Object.getPrototypeOf(DrawCircle)).call(this, props));

        _this14.percent = _this14.props.percentValue * 10;
        _this14.limitColor = {
            0: {
                min: 0,
                max: 5,
                color: "#db2828"
            },
            1: {
                min: 5,
                max: 7,
                color: "#f2711c"
            },
            2: {
                min: 7,
                max: 10,
                color: "#21ba45"
            }
        };
        _this14.color = _this14.limitColor[0].color;
        for (var i = 0; i < Object.keys(_this14.limitColor).length; i++) {
            if (_this14.limitColor[i].min <= _this14.props.percentValue && _this14.props.percentValue < _this14.limitColor[i].max) {
                _this14.color = _this14.limitColor[i].color;
                break;
            }
        }
        return _this14;
    }

    _createClass(DrawCircle, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "c100 p" + this.percent + " small" },
                React.createElement(
                    "span",
                    null,
                    this.props.percentValue
                ),
                React.createElement(
                    "div",
                    { className: "slice" },
                    React.createElement("div", { className: "bar", style: { borderColor: this.color } }),
                    React.createElement("div", { className: "fill", style: { borderColor: this.color } })
                )
            );
        }
    }]);

    return DrawCircle;
}(React.Component);

var Comments = function (_React$Component14) {
    _inherits(Comments, _React$Component14);

    function Comments(props) {
        _classCallCheck(this, Comments);

        return _possibleConstructorReturn(this, (Comments.__proto__ || Object.getPrototypeOf(Comments)).call(this, props));
    }

    _createClass(Comments, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(YorumlarHeader, null),
                React.createElement(PageNumber, null),
                React.createElement(Comment, {
                    commentOwner: "R\u0131dvan T\xFClemen",
                    commentText: "Yinelenen bir sayfa i\xE7eri\u011Finin okuyucunun dikkatini da\u011F\u0131tt\u0131\u011F\u0131 bilinen bir ger\xE7ektir. Lorem Ipsum kullanman\u0131n amac\u0131, s\xFCrekli 'buraya metin gelecek, buraya metin gelecek' yazmaya k\u0131yasla daha dengeli bir harf da\u011F\u0131l\u0131m\u0131 sa\u011Flayarak okunurlu\u011Fu art\u0131rmas\u0131d\u0131r. \u015Eu anda bir\xE7ok masa\xFCst\xFC yay\u0131nc\u0131l\u0131k paketi ve web sayfa d\xFCzenleyicisi, varsay\u0131lan m\u0131g\u0131r metinler olarak Lorem Ipsum kullanmaktad\u0131r. Ayr\u0131ca arama motorlar\u0131nda 'lorem ipsum' anahtar s\xF6zc\xFCkleri ile arama yap\u0131ld\u0131\u011F\u0131nda hen\xFCz tasar\u0131m a\u015Famas\u0131nda olan \xE7ok say\u0131da site listelenir. Y\u0131llar i\xE7inde, bazen kazara, bazen bilin\xE7li olarak (\xF6rne\u011Fin mizah kat\u0131larak), \xE7e\u015Fitli s\xFCr\xFCmleri geli\u015Ftirilmi\u015Ftir.",
                    likeValue: "312",
                    dislikeValue: "31",
                    likeOrDislike: "like",
                    ratingAverage: "7.2",
                    date: "15/05/2020"
                }),
                React.createElement(Comment, {
                    commentOwner: "RTE_53",
                    commentText: "Eyyy k\u0131l\u0131\xE7dar sen kimsin yaa!!",
                    likeValue: "9912312312",
                    dislikeValue: "912",
                    likeOrDislike: "dislike",
                    ratingAverage: "4.2",
                    date: "15-05"
                }),
                React.createElement(Comment, {
                    commentOwner: "ByKemal31",
                    commentText: "Derhal buray\u0131 terket karde\u015Fim",
                    likeValue: "321312412",
                    dislikeValue: "91",
                    ratingAverage: "6.8",
                    date: "15-05-12"
                }),
                React.createElement(Comment, {
                    commentOwner: "Deniz_Baykal_07",
                    commentText: "Benim ne i\u015Fim var burda amq",
                    likeValue: "999999999999",
                    dislikeValue: "-1231",
                    ratingAverage: "1.0",
                    date: "01-05 12:15"
                }),
                React.createElement(PageNumber, null),
                React.createElement(WriteComment, null)
            );
        }
    }]);

    return Comments;
}(React.Component);

var YorumlarHeader = function (_React$Component15) {
    _inherits(YorumlarHeader, _React$Component15);

    function YorumlarHeader() {
        _classCallCheck(this, YorumlarHeader);

        return _possibleConstructorReturn(this, (YorumlarHeader.__proto__ || Object.getPrototypeOf(YorumlarHeader)).apply(this, arguments));
    }

    _createClass(YorumlarHeader, [{
        key: "render",
        value: function render() {
            return React.createElement(
                Row,
                null,
                React.createElement(
                    Column,
                    null,
                    React.createElement(H, { type: "1", textAlign: "center", text: "Yorumlar" })
                )
            );
        }
    }]);

    return YorumlarHeader;
}(React.Component);

var PageNumber = function (_React$Component16) {
    _inherits(PageNumber, _React$Component16);

    function PageNumber() {
        _classCallCheck(this, PageNumber);

        return _possibleConstructorReturn(this, (PageNumber.__proto__ || Object.getPrototypeOf(PageNumber)).apply(this, arguments));
    }

    _createClass(PageNumber, [{
        key: "render",

        /*
            ortadaki html select'i masaüstü ve tabletlerde görünümünü daha küçük yapmak için size'ını 'two', ilk ve sonrakini de 'seven'
            yapabiliriz. ancak mobil (iphone 6s) görünümünde html select sığmıyor. Bu durumu kurtarmak için mobilde şöyle görün normalde
            şöyle görün diyebiliriz. şimdilik buraya not düşüyorum. ileride bu kısmı yaparım.
        */
        value: function render() {
            return React.createElement(
                Row,
                { size: "sixteen", nonStackable: true },
                React.createElement(
                    WideColumn,
                    { size: "seven" },
                    React.createElement(
                        "button",
                        { className: "ui disabled labeled icon button" },
                        React.createElement("i", { className: "left arrow icon" }),
                        "\xD6nceki Sayfa"
                    )
                ),
                React.createElement(
                    WideColumn,
                    { size: "two" },
                    React.createElement(
                        "div",
                        { className: "ui form" },
                        React.createElement(
                            "div",
                            { className: "field" },
                            React.createElement(
                                "select",
                                null,
                                React.createElement(
                                    "option",
                                    { value: "1" },
                                    "1"
                                ),
                                React.createElement(
                                    "option",
                                    { value: "2" },
                                    "2"
                                ),
                                React.createElement(
                                    "option",
                                    { value: "3" },
                                    "3"
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    WideColumn,
                    { size: "seven" },
                    React.createElement(
                        FloatRight,
                        null,
                        React.createElement(
                            "button",
                            { className: "ui right labeled icon button" },
                            React.createElement("i", { className: "right arrow icon" }),
                            "Sonraki Sayfa"
                        )
                    )
                )
            );
        }
    }]);

    return PageNumber;
}(React.Component);

var Comment = function (_React$Component17) {
    _inherits(Comment, _React$Component17);

    function Comment(props) {
        _classCallCheck(this, Comment);

        return _possibleConstructorReturn(this, (Comment.__proto__ || Object.getPrototypeOf(Comment)).call(this, props));
    }

    _createClass(Comment, [{
        key: "render",
        value: function render() {
            return React.createElement(
                Row,
                null,
                React.createElement(
                    Column,
                    null,
                    React.createElement(
                        RaisedSegment,
                        null,
                        React.createElement(
                            Row,
                            { size: "two", nonStackable: true },
                            React.createElement(
                                Column,
                                null,
                                React.createElement(RatingBar, { ratingAverage: this.props.ratingAverage })
                            ),
                            React.createElement(
                                Column,
                                null,
                                React.createElement(
                                    FloatRight,
                                    null,
                                    React.createElement(CommentDate, { date: this.props.date })
                                )
                            )
                        ),
                        React.createElement(
                            Row,
                            { size: "one" },
                            React.createElement(
                                Column,
                                null,
                                React.createElement(
                                    "div",
                                    { className: "commentText" },
                                    React.createElement(
                                        "p",
                                        null,
                                        this.props.commentText
                                    )
                                )
                            )
                        ),
                        React.createElement(
                            Row,
                            { size: "two" },
                            React.createElement(
                                Column,
                                null,
                                React.createElement(
                                    "div",
                                    { className: "commentHeader" },
                                    React.createElement(H, { type: "5", text: this.props.commentOwner })
                                )
                            ),
                            React.createElement(
                                Column,
                                null,
                                React.createElement(
                                    FloatRight,
                                    null,
                                    React.createElement(LikeButton, { value: this.props.likeValue, likeOrDislike: this.props.likeOrDislike }),
                                    React.createElement(DislikeButton, { value: this.props.dislikeValue, likeOrDislike: this.props.likeOrDislike }),
                                    React.createElement(ComplaintButton, null)
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Comment;
}(React.Component);

var RatingBar = function (_React$Component18) {
    _inherits(RatingBar, _React$Component18);

    function RatingBar(props) {
        _classCallCheck(this, RatingBar);

        var _this19 = _possibleConstructorReturn(this, (RatingBar.__proto__ || Object.getPrototypeOf(RatingBar)).call(this, props));

        _this19.percent = _this19.props.ratingAverage * 10;
        // bu kısım drawcircle ile aynı refactor ederken buna bir çare bulabilirsin
        _this19.limitColor = {
            0: {
                min: 0,
                max: 5,
                color: "#db2828"
            },
            1: {
                min: 5,
                max: 7,
                color: "#f2711c"
            },
            2: {
                min: 7,
                max: 10,
                color: "#21ba45"
            }
        };
        _this19.color = _this19.limitColor[0].color;
        for (var i = 0; i < Object.keys(_this19.limitColor).length; i++) {
            if (_this19.limitColor[i].min <= _this19.props.ratingAverage && _this19.props.ratingAverage < _this19.limitColor[i].max) {
                _this19.color = _this19.limitColor[i].color;
                break;
            }
        }
        // ^^^
        _this19.widthOfFill = _this19.props.ratingAverage * 15 + "px";
        return _this19;
    }

    _createClass(RatingBar, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "ratingBar" },
                React.createElement(
                    "span",
                    { className: "barValue" },
                    this.props.ratingAverage
                ),
                React.createElement(
                    "div",
                    { className: "barStickWrapper" },
                    React.createElement("div", { className: "barStick barStickFull" }),
                    React.createElement("div", { className: "barStick barStickFill", style: { backgroundColor: this.color, width: this.widthOfFill } })
                )
            );
        }
    }]);

    return RatingBar;
}(React.Component);

var CommentDate = function (_React$Component19) {
    _inherits(CommentDate, _React$Component19);

    function CommentDate() {
        _classCallCheck(this, CommentDate);

        return _possibleConstructorReturn(this, (CommentDate.__proto__ || Object.getPrototypeOf(CommentDate)).apply(this, arguments));
    }

    _createClass(CommentDate, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "span",
                { className: "commentDate" },
                this.props.date
            );
        }
    }]);

    return CommentDate;
}(React.Component);

var LikeButton = function (_React$Component20) {
    _inherits(LikeButton, _React$Component20);

    function LikeButton(props) {
        _classCallCheck(this, LikeButton);

        var _this21 = _possibleConstructorReturn(this, (LikeButton.__proto__ || Object.getPrototypeOf(LikeButton)).call(this, props));

        if (_this21.props.likeOrDislike == "like") {
            _this21.liked = " likedComment";
        } else {
            _this21.liked = " ";
        }
        return _this21;
    }

    _createClass(LikeButton, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "button",
                { className: "ui basic button" },
                React.createElement(
                    "i",
                    { className: "icon" },
                    React.createElement("i", { className: "fa fa-thumbs-up" + this.liked, "aria-hidden": "true" })
                ),
                this.props.value
            );
        }
    }]);

    return LikeButton;
}(React.Component);

var DislikeButton = function (_React$Component21) {
    _inherits(DislikeButton, _React$Component21);

    function DislikeButton(props) {
        _classCallCheck(this, DislikeButton);

        var _this22 = _possibleConstructorReturn(this, (DislikeButton.__proto__ || Object.getPrototypeOf(DislikeButton)).call(this, props));

        if (_this22.props.likeOrDislike == "dislike") {
            _this22.liked = " dislikedComment";
        } else {
            _this22.liked = " ";
        }
        return _this22;
    }

    _createClass(DislikeButton, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "button",
                { className: "ui basic button" },
                React.createElement(
                    "i",
                    { className: "icon" },
                    React.createElement("i", { className: "fa fa-thumbs-down" + this.liked, "aria-hidden": "true" })
                ),
                this.props.value
            );
        }
    }]);

    return DislikeButton;
}(React.Component);

var ComplaintButton = function (_React$Component22) {
    _inherits(ComplaintButton, _React$Component22);

    function ComplaintButton() {
        _classCallCheck(this, ComplaintButton);

        return _possibleConstructorReturn(this, (ComplaintButton.__proto__ || Object.getPrototypeOf(ComplaintButton)).apply(this, arguments));
    }

    _createClass(ComplaintButton, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "button",
                { className: "ui basic button" },
                React.createElement("i", { id: "exclamation", className: "fa fa-exclamation", "aria-hidden": "true" })
            );
        }
    }]);

    return ComplaintButton;
}(React.Component);

var WriteComment = function (_React$Component23) {
    _inherits(WriteComment, _React$Component23);

    function WriteComment() {
        _classCallCheck(this, WriteComment);

        return _possibleConstructorReturn(this, (WriteComment.__proto__ || Object.getPrototypeOf(WriteComment)).apply(this, arguments));
    }

    _createClass(WriteComment, [{
        key: "render",
        value: function render() {
            return React.createElement(
                Row,
                null,
                React.createElement(
                    Column,
                    null,
                    React.createElement(
                        Segment,
                        null,
                        React.createElement(
                            Row,
                            { size: "sixteen" },
                            React.createElement(
                                WideColumn,
                                { size: "ten" },
                                React.createElement(
                                    "div",
                                    { className: "ui form" },
                                    React.createElement(
                                        "div",
                                        { className: "field" },
                                        React.createElement(
                                            "label",
                                            null,
                                            "Yorum Yaz"
                                        ),
                                        React.createElement("textarea", { rows: "10" })
                                    )
                                )
                            ),
                            React.createElement(
                                WideColumn,
                                { size: "six" },
                                React.createElement(InputRating, null)
                            )
                        ),
                        React.createElement(
                            Row,
                            null,
                            React.createElement(
                                WideColumn,
                                null,
                                React.createElement(
                                    FloatRight,
                                    null,
                                    React.createElement(SendButton, null)
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return WriteComment;
}(React.Component);

var InputRating = function (_React$Component24) {
    _inherits(InputRating, _React$Component24);

    function InputRating() {
        _classCallCheck(this, InputRating);

        return _possibleConstructorReturn(this, (InputRating.__proto__ || Object.getPrototypeOf(InputRating)).apply(this, arguments));
    }

    _createClass(InputRating, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { id: "inputRating" },
                React.createElement(InputRange, { name: "Sa\u011Flaml\u0131k" }),
                React.createElement(InputRange, { name: "Kullan\u0131\u015Fl\u0131l\u0131k" }),
                React.createElement(InputRange, { name: "Pil \xD6mr\xFC" }),
                React.createElement(InputRange, { name: "falan1" }),
                React.createElement(InputRange, { name: "falan2" }),
                React.createElement(InputRange, { name: "falan3" }),
                React.createElement(InputRange, { name: "falan4" }),
                React.createElement(InputRange, { name: "falan5" })
            );
        }
    }]);

    return InputRating;
}(React.Component);

var InputRange = function (_React$Component25) {
    _inherits(InputRange, _React$Component25);

    function InputRange(props) {
        _classCallCheck(this, InputRange);

        var _this26 = _possibleConstructorReturn(this, (InputRange.__proto__ || Object.getPrototypeOf(InputRange)).call(this, props));

        _this26.state = {
            value: "5"
        };
        _this26.change = _this26.change.bind(_this26);
        return _this26;
    }

    _createClass(InputRange, [{
        key: "change",
        value: function change(event) {
            this.setState({
                value: event.target.value
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "inputRangeWrapper" },
                React.createElement(
                    "label",
                    { className: "inputRangeLabel" },
                    this.props.name
                ),
                React.createElement("input", { className: "inputRange", type: "range", id: "", name: "", defaultValue: this.state.value, step: "1", min: "0", max: "10", onChange: this.change }),
                React.createElement(
                    "label",
                    { className: "inputRangeValue" },
                    this.state.value
                )
            );
        }
    }]);

    return InputRange;
}(React.Component);

var SendButton = function (_React$Component26) {
    _inherits(SendButton, _React$Component26);

    function SendButton() {
        _classCallCheck(this, SendButton);

        return _possibleConstructorReturn(this, (SendButton.__proto__ || Object.getPrototypeOf(SendButton)).apply(this, arguments));
    }

    _createClass(SendButton, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "button",
                { className: "ui primary button" },
                "G\xF6nder"
            );
        }
    }]);

    return SendButton;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));