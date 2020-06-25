var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        var currentUrl = window.location.href;
        var productName = currentUrl.split("urun/")[1];
        _this.state = {
            ready: false,
            productName: productName,
            productTitle: "",
            images: [],
            productRating: [],
            comments: [],
            LoadingOrNotFoundProduct: "loading"
        };
        return _this;
    }

    _createClass(App, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            $.ajax({
                type: 'GET',
                url: 'https://yorumlaa.herokuapp.com/api/products/' + this.state.productName,
                data: {
                    "": ""
                },
                statusCode: {
                    404: function () {
                        this.setState({
                            LoadingOrNotFoundProduct: "notFoundProduct"
                            /* kodları çok spagetti yazdım, ilerleyen zamanlarda ihtiyacım olursa buraları refactor ederim */
                        });
                    }.bind(this)
                },
                success: function (response) {
                    // bradcrumb
                    var breadCrumb = [];
                    breadCrumb.push(response.breadcrumb[0].name);
                    curCate = response.breadcrumb[0].children;
                    // breadcrumb kısmını şimdilik bırakıyorum
                    /*
                    while(curCate.length!=0) {
                        breadCrumb.push(response.breadcrumb[0].name);
                        curCate = response.breadcrumb[0].children;
                    }
                    */
                    // images
                    // image linklerinde bir sıkıntı var o yüzden görünmüyor
                    var images = [];
                    for (var i = 0; i < response.images.length; i++) {
                        images.push(response.images[i].image);
                    }
                    //productRating
                    var productRating = [];
                    for (var _i = 0; _i < Object.keys(response.ratings.particularly).length; _i++) {
                        //Object.keys(myObj).length
                        productRating.push({
                            key: _i,
                            name: Object.keys(response.ratings.particularly)[_i],
                            percentValue: Object.values(response.ratings.particularly)[_i].toFixed(1)
                        });
                    }
                    //comments
                    var comments = [];
                    for (var _i2 = 0; _i2 < response.comments.length; _i2++) {
                        // like or dislike kontrolü
                        var likeOrDislike = void 0;
                        if (response.comments[_i2].like) {
                            likeOrDislike = "like";
                        } else if (response.comments[_i2].like == false) {
                            likeOrDislike = "dislike";
                        } else {
                            likeOrDislike = "";
                        }
                        comments.push({
                            key: _i2,
                            commentOwner: response.comments[_i2].comment.username,
                            commentText: response.comments[_i2].comment.body,
                            likeValue: response.comments[_i2].comment.like,
                            dislikeValue: response.comments[_i2].comment.dislike,
                            likeOrDislike: likeOrDislike,
                            ratingAverage: response.comments[_i2].rating.toFixed(1),
                            date: response.comments[_i2].comment.created_at
                        });
                    }
                    /*
                    {
                        key:"1",
                        commentOwner:"Yunus Emre Bulut",
                        commentText:"Çok güzel bir telefon. Yapanlardan Allah razı olsun.",
                        likeValue:"455",
                        dislikeValue:"75",
                        likeOrDislike:"like",
                        ratingAverage:"9.8",
                        date:"07.06"
                    },*/
                    this.setState({
                        ready: true,
                        productRating: productRating,
                        productTitle: response.product.title,
                        images: images,
                        comments: comments
                    });
                }.bind(this),
                dataType: 'json'
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(Header, null),
                " ",
                this.state.ready ? React.createElement(Content, {
                    comments: this.state.comments,
                    productName: this.state.productTitle,
                    mainCategory: {
                        name: "Elektronik"
                    },
                    categoryChildren: [{
                        id: "2",
                        name: "Telefon"
                    }, {
                        id: "4",
                        name: "Akıllı Telefon"
                    }],
                    followers: 315,
                    followed: false,
                    attributes: this.state.productRating /*[
                                                         {
                                                         key:1,
                                                         name:"Tasarım",
                                                         percentValue: 7.8
                                                         },
                                                         {
                                                         key:2,
                                                         name:"Kullanışlılık",
                                                         percentValue: 6.9
                                                         },
                                                         {
                                                         key:3,
                                                         name:"Pil Ömrü",
                                                         percentValue: 4.6
                                                         },
                                                         {
                                                         key:4,
                                                         name:"Taşınabilirlik",
                                                         percentValue: 7.5
                                                         },
                                                         {
                                                         key:5,
                                                         name:"Fiyat-Performans",
                                                         percentValue: 6.4
                                                         }
                                                         ]*/,
                    imagesSrcs: this.state.images
                }) : React.createElement(LoadingOrNotFoundProduct, { form: this.state.LoadingOrNotFoundProduct }),
                React.createElement(Footer, null),
                " "
            );
        }
    }]);

    return App;
}(React.Component);

var LoadingOrNotFoundProduct = function (_React$Component2) {
    _inherits(LoadingOrNotFoundProduct, _React$Component2);

    function LoadingOrNotFoundProduct() {
        _classCallCheck(this, LoadingOrNotFoundProduct);

        return _possibleConstructorReturn(this, (LoadingOrNotFoundProduct.__proto__ || Object.getPrototypeOf(LoadingOrNotFoundProduct)).apply(this, arguments));
    }

    _createClass(LoadingOrNotFoundProduct, [{
        key: "render",
        value: function render() {
            if (this.props.form == "loading") {
                return React.createElement(RowLoading, null);
            } else if (this.props.form == "notFoundProduct") {
                return React.createElement(
                    Row,
                    { size: "sixteen" },
                    React.createElement(WideColumn, { size: "two" }),
                    React.createElement(
                        WideColumn,
                        { size: "twelve" },
                        React.createElement(
                            "div",
                            { className: "ui red message" },
                            "B\xF6yle bir \xFCr\xFCn yok!"
                        )
                    )
                );
            }
        }
    }]);

    return LoadingOrNotFoundProduct;
}(React.Component);

var Content = function (_React$Component3) {
    _inherits(Content, _React$Component3);

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
                React.createElement(BreadCrumb, {
                    mainCategory: this.props.mainCategory,
                    categoryChildren: this.props.categoryChildren,
                    productName: this.props.productName
                }),
                React.createElement(ProductHeader, { productName: this.props.productName }),
                React.createElement(FollowButton, { followers: this.props.followers, followed: this.props.followed }),
                React.createElement(Product, { attributes: this.props.attributes, imagesSrcs: this.props.imagesSrcs }),
                React.createElement(Comments, { comments: this.props.comments, attributes: this.props.attributes })
            );
        }
    }]);

    return Content;
}(React.Component);

var BreadCrumb = function (_React$Component4) {
    _inherits(BreadCrumb, _React$Component4);

    function BreadCrumb(props) {
        _classCallCheck(this, BreadCrumb);

        var _this4 = _possibleConstructorReturn(this, (BreadCrumb.__proto__ || Object.getPrototypeOf(BreadCrumb)).call(this, props));

        _this4.categoryChildren = [];
        for (var i = 0; i < _this4.props.categoryChildren.length; i++) {
            _this4.categoryChildren.push(React.createElement(
                "span",
                { key: _this4.props.categoryChildren[i].id },
                React.createElement("i", { className: "right angle icon divider" }),
                React.createElement(
                    "a",
                    { className: "section" },
                    _this4.props.categoryChildren[i].name
                )
            ));
        }
        return _this4;
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
                            this.props.mainCategory.name
                        ),
                        this.categoryChildren,
                        React.createElement("i", { className: "right angle icon divider" }),
                        React.createElement(
                            "div",
                            { className: "active section" },
                            this.props.productName
                        )
                    )
                )
            );
        }
    }]);

    return BreadCrumb;
}(React.Component);

var ProductHeader = function (_React$Component5) {
    _inherits(ProductHeader, _React$Component5);

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
                        React.createElement(H, { type: "1", textAlign: "center", text: this.props.productName })
                    )
                )
            );
        }
    }]);

    return ProductHeader;
}(React.Component);

var FollowButton = function (_React$Component6) {
    _inherits(FollowButton, _React$Component6);

    function FollowButton(props) {
        _classCallCheck(this, FollowButton);

        var _this6 = _possibleConstructorReturn(this, (FollowButton.__proto__ || Object.getPrototypeOf(FollowButton)).call(this, props));

        _this6.followToggle = _this6.followToggle.bind(_this6);
        if (_this6.props.followed) {
            _this6.state = {
                followed: true,
                class: " red "
            };
        } else {
            _this6.state = {
                followed: false,
                class: " "
            };
        }
        return _this6;
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
                                    this.props.followers
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

var Product = function (_React$Component7) {
    _inherits(Product, _React$Component7);

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
                                React.createElement(ImageSlider, { srcs: this.props.imagesSrcs })
                            )
                        )
                    )
                ),
                React.createElement(
                    WideColumn,
                    { size: "eight" },
                    React.createElement(Rating, { attributes: this.props.attributes })
                )
            );
        }
    }]);

    return Product;
}(React.Component);

var ImageSlider = function (_React$Component8) {
    _inherits(ImageSlider, _React$Component8);

    function ImageSlider(props) {
        _classCallCheck(this, ImageSlider);

        var _this8 = _possibleConstructorReturn(this, (ImageSlider.__proto__ || Object.getPrototypeOf(ImageSlider)).call(this, props));

        _this8.nextIndex = 0;
        _this8.state = {
            src: _this8.props.srcs[0],
            index: 0
        };
        _this8.change = _this8.change.bind(_this8);
        return _this8;
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
            var _this9 = this;

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
                                        return _this9.change(-1);
                                    } },
                                React.createElement("i", { className: "left arrow icon" })
                            ),
                            React.createElement(
                                "button",
                                { className: "mini ui icon button", onClick: function onClick() {
                                        return _this9.change(+1);
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

var Img = function (_React$Component9) {
    _inherits(Img, _React$Component9);

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

var DirectlyButtons = function (_React$Component10) {
    _inherits(DirectlyButtons, _React$Component10);

    function DirectlyButtons(props) {
        _classCallCheck(this, DirectlyButtons);

        var _this11 = _possibleConstructorReturn(this, (DirectlyButtons.__proto__ || Object.getPrototypeOf(DirectlyButtons)).call(this, props));

        _this11.buttons = [];
        _this11.state = {
            selectedIndex: 0
        };
        for (var i = 0; i < 4; i++) {
            if (_this11.props.selectedIndex == i + 1) {
                _this11.buttons.push(React.createElement(
                    "button",
                    { key: i, className: "disabled ui button" },
                    i + 1
                ));
            } else {
                _this11.buttons.push(React.createElement(
                    "button",
                    { key: i, className: "ui button" },
                    i + 1
                ));
            }
        }
        return _this11;
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

var Rating = function (_React$Component11) {
    _inherits(Rating, _React$Component11);

    function Rating(props) {
        _classCallCheck(this, Rating);

        var _this12 = _possibleConstructorReturn(this, (Rating.__proto__ || Object.getPrototypeOf(Rating)).call(this, props));

        _this12.attributes = [];
        for (var i = 0; i < _this12.props.attributes.length; i++) {
            _this12.attributes.push(React.createElement(ProductAttribute, {
                key: _this12.props.attributes[i].key,
                name: _this12.props.attributes[i].name,
                percentValue: _this12.props.attributes[i].percentValue
            }));
        }

        return _this12;
    }

    _createClass(Rating, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                this.attributes
            );
        }
    }]);

    return Rating;
}(React.Component);

var ProductAttribute = function (_React$Component12) {
    _inherits(ProductAttribute, _React$Component12);

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

var ProductAttributeName = function (_React$Component13) {
    _inherits(ProductAttributeName, _React$Component13);

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

var DrawCircle = function (_React$Component14) {
    _inherits(DrawCircle, _React$Component14);

    function DrawCircle(props) {
        _classCallCheck(this, DrawCircle);

        var _this15 = _possibleConstructorReturn(this, (DrawCircle.__proto__ || Object.getPrototypeOf(DrawCircle)).call(this, props));

        _this15.percent = _this15.props.percentValue * 10;
        _this15.limitColor = {
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
        _this15.color = _this15.limitColor[0].color;
        for (var i = 0; i < Object.keys(_this15.limitColor).length; i++) {
            if (_this15.limitColor[i].min <= _this15.props.percentValue && _this15.props.percentValue < _this15.limitColor[i].max) {
                _this15.color = _this15.limitColor[i].color;
                break;
            }
        }
        return _this15;
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

var Comments = function (_React$Component15) {
    _inherits(Comments, _React$Component15);

    function Comments(props) {
        _classCallCheck(this, Comments);

        var _this16 = _possibleConstructorReturn(this, (Comments.__proto__ || Object.getPrototypeOf(Comments)).call(this, props));

        _this16.comments = [];
        _this16.numberOfComments = 0;
        for (var i = 0; i < _this16.props.comments.length; i++) {
            _this16.comments.push(React.createElement(Comment, {
                key: _this16.props.comments[i].key,
                commentOwner: _this16.props.comments[i].commentOwner,
                commentText: _this16.props.comments[i].commentText,
                likeValue: _this16.props.comments[i].likeValue,
                dislikeValue: _this16.props.comments[i].dislikeValue,
                likeOrDislike: _this16.props.comments[i].likeOrDislike,
                ratingAverage: _this16.props.comments[i].ratingAverage,
                date: _this16.props.comments[i].date
            }));
            _this16.numberOfComments++;
        }
        return _this16;
    }

    _createClass(Comments, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(YorumlarHeader, null),
                this.comments,
                React.createElement(WriteComment, { attributes: this.props.attributes })
            );
        }
    }]);

    return Comments;
}(React.Component);

var YorumlarHeader = function (_React$Component16) {
    _inherits(YorumlarHeader, _React$Component16);

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

var PageNumber = function (_React$Component17) {
    _inherits(PageNumber, _React$Component17);

    function PageNumber(props) {
        _classCallCheck(this, PageNumber);

        var _this18 = _possibleConstructorReturn(this, (PageNumber.__proto__ || Object.getPrototypeOf(PageNumber)).call(this, props));

        _this18.pages = [];
        for (var i = 1; i <= _this18.props.pageLen; i++) {
            _this18.pages.push(React.createElement(
                "option",
                { key: i, value: i },
                i
            ));
        }
        return _this18;
    }
    /*
        ortadaki html select'i masaüstü ve tabletlerde görünümünü daha küçük yapmak için size'ını 'two', ilk ve sonrakini de 'seven'
        yapabiliriz. ancak mobil (iphone 6s) görünümünde html select sığmıyor. Bu durumu kurtarmak için mobilde şöyle görün normalde
        şöyle görün diyebiliriz. şimdilik buraya not düşüyorum. ileride bu kısmı yaparım.
    */


    _createClass(PageNumber, [{
        key: "render",
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
                                this.pages
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

var Comment = function (_React$Component18) {
    _inherits(Comment, _React$Component18);

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

var RatingBar = function (_React$Component19) {
    _inherits(RatingBar, _React$Component19);

    function RatingBar(props) {
        _classCallCheck(this, RatingBar);

        var _this20 = _possibleConstructorReturn(this, (RatingBar.__proto__ || Object.getPrototypeOf(RatingBar)).call(this, props));

        _this20.percent = _this20.props.ratingAverage * 10;
        // bu kısım drawcircle ile aynı refactor ederken buna bir çare bulabilirsin
        _this20.limitColor = {
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
        _this20.color = _this20.limitColor[0].color;
        for (var i = 0; i < Object.keys(_this20.limitColor).length; i++) {
            if (_this20.limitColor[i].min <= _this20.props.ratingAverage && _this20.props.ratingAverage < _this20.limitColor[i].max) {
                _this20.color = _this20.limitColor[i].color;
                break;
            }
        }
        // ^^^
        _this20.widthOfFill = _this20.props.ratingAverage * 15 + "px";
        return _this20;
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

var CommentDate = function (_React$Component20) {
    _inherits(CommentDate, _React$Component20);

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

var WriteComment = function (_React$Component21) {
    _inherits(WriteComment, _React$Component21);

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
                                React.createElement(InputRating, { attributes: this.props.attributes })
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

var InputRating = function (_React$Component22) {
    _inherits(InputRating, _React$Component22);

    function InputRating(props) {
        _classCallCheck(this, InputRating);

        var _this23 = _possibleConstructorReturn(this, (InputRating.__proto__ || Object.getPrototypeOf(InputRating)).call(this, props));

        _this23.inputRanges = [];
        for (var i = 0; i < _this23.props.attributes.length; i++) {
            _this23.inputRanges.push(React.createElement(InputRange, { key: _this23.props.attributes[i].key, name: _this23.props.attributes[i].name }));
        }
        return _this23;
    }

    _createClass(InputRating, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { id: "inputRating" },
                this.inputRanges
            );
        }
    }]);

    return InputRating;
}(React.Component);

var InputRange = function (_React$Component23) {
    _inherits(InputRange, _React$Component23);

    function InputRange(props) {
        _classCallCheck(this, InputRange);

        var _this24 = _possibleConstructorReturn(this, (InputRange.__proto__ || Object.getPrototypeOf(InputRange)).call(this, props));

        _this24.state = {
            value: "5"
        };
        _this24.change = _this24.change.bind(_this24);
        return _this24;
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

var SendButton = function (_React$Component24) {
    _inherits(SendButton, _React$Component24);

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