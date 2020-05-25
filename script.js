var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Container = function (_React$Component) {
    _inherits(Container, _React$Component);

    function Container() {
        _classCallCheck(this, Container);

        return _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).apply(this, arguments));
    }

    _createClass(Container, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "ui container" },
                this.props.children
            );
        }
    }]);

    return Container;
}(React.Component);

var Segment = function (_React$Component2) {
    _inherits(Segment, _React$Component2);

    function Segment() {
        _classCallCheck(this, Segment);

        return _possibleConstructorReturn(this, (Segment.__proto__ || Object.getPrototypeOf(Segment)).apply(this, arguments));
    }

    _createClass(Segment, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "ui segment" },
                this.props.children
            );
        }
    }]);

    return Segment;
}(React.Component);

var RaisedSegment = function (_React$Component3) {
    _inherits(RaisedSegment, _React$Component3);

    function RaisedSegment() {
        _classCallCheck(this, RaisedSegment);

        return _possibleConstructorReturn(this, (RaisedSegment.__proto__ || Object.getPrototypeOf(RaisedSegment)).apply(this, arguments));
    }

    _createClass(RaisedSegment, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "ui raised segment" },
                this.props.children
            );
        }
    }]);

    return RaisedSegment;
}(React.Component);

var Row = function (_React$Component4) {
    _inherits(Row, _React$Component4);

    function Row(props) {
        _classCallCheck(this, Row);

        var _this4 = _possibleConstructorReturn(this, (Row.__proto__ || Object.getPrototypeOf(Row)).call(this, props));

        _this4.stackable = "stackable";
        if (_this4.props.nonStackable) {
            _this4.stackable = "";
        }
        return _this4;
    }

    _createClass(Row, [{
        key: "render",
        value: function render() {
            if (this.props.withoutContainer) {
                return React.createElement(
                    "div",
                    { className: "ui " + this.stackable + " " + this.props.size + " column grid" },
                    this.props.children
                );
            } else {
                return React.createElement(
                    Container,
                    null,
                    React.createElement(
                        "div",
                        { className: "ui " + this.stackable + " " + this.props.size + " column grid" },
                        this.props.children
                    )
                );
            }
        }
    }]);

    return Row;
}(React.Component);

var Column = function (_React$Component5) {
    _inherits(Column, _React$Component5);

    function Column() {
        _classCallCheck(this, Column);

        return _possibleConstructorReturn(this, (Column.__proto__ || Object.getPrototypeOf(Column)).apply(this, arguments));
    }

    _createClass(Column, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "column" },
                this.props.children
            );
        }
    }]);

    return Column;
}(React.Component);

var WideColumn = function (_React$Component6) {
    _inherits(WideColumn, _React$Component6);

    function WideColumn() {
        _classCallCheck(this, WideColumn);

        return _possibleConstructorReturn(this, (WideColumn.__proto__ || Object.getPrototypeOf(WideColumn)).apply(this, arguments));
    }

    _createClass(WideColumn, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: this.props.size + " wide column" },
                this.props.children
            );
        }
    }]);

    return WideColumn;
}(React.Component);

var H = function (_React$Component7) {
    _inherits(H, _React$Component7);

    function H(props) {
        _classCallCheck(this, H);

        var _this7 = _possibleConstructorReturn(this, (H.__proto__ || Object.getPrototypeOf(H)).call(this, props));

        _this7.textAlign = "";
        if (_this7.props.textAlign == "center") {
            _this7.textAlign = " center aligned ";
        }
        if (!_this7.props.optional) {
            _this7.optional = "";
        } else {
            _this7.optional = _this7.props.optional;
        }
        return _this7;
    }

    _createClass(H, [{
        key: "render",
        value: function render() {
            if (this.props.type == "1") {
                return React.createElement(
                    "h1",
                    { className: "ui " + this.textAlign + " header " + this.optional },
                    this.props.text
                );
            } else if (this.props.type == "2") {
                return React.createElement(
                    "h2",
                    { className: "ui " + this.textAlign + " header " + this.optional },
                    this.props.text
                );
            } else if (this.props.type == "3") {
                return React.createElement(
                    "h3",
                    { className: "ui " + this.textAlign + " header " + this.optional },
                    this.props.text
                );
            } else if (this.props.type == "4") {
                return React.createElement(
                    "h4",
                    { className: "ui " + this.textAlign + "header " + this.optional },
                    this.props.text
                );
            } else if (this.props.type == "5") {
                return React.createElement(
                    "h5",
                    { className: "ui " + this.textAlign + "header " + this.optional },
                    this.props.text
                );
            }
        }
    }]);

    return H;
}(React.Component);

var Center = function (_React$Component8) {
    _inherits(Center, _React$Component8);

    function Center() {
        _classCallCheck(this, Center);

        return _possibleConstructorReturn(this, (Center.__proto__ || Object.getPrototypeOf(Center)).apply(this, arguments));
    }

    _createClass(Center, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "ui one column stackable center aligned page grid" },
                React.createElement(
                    "div",
                    { className: "column " + this.props.size + " wide" },
                    this.props.children
                )
            );
        }
    }]);

    return Center;
}(React.Component);

var Hx = function (_React$Component9) {
    _inherits(Hx, _React$Component9);

    function Hx() {
        _classCallCheck(this, Hx);

        return _possibleConstructorReturn(this, (Hx.__proto__ || Object.getPrototypeOf(Hx)).apply(this, arguments));
    }

    _createClass(Hx, [{
        key: "render",

        // size -> huge, large, medium, small, tiny
        value: function render() {
            return React.createElement(
                "div",
                { "class": "ui " + this.props.size + " header" },
                this.props.text
            );
        }
    }]);

    return Hx;
}(React.Component);

var FloatRight = function (_React$Component10) {
    _inherits(FloatRight, _React$Component10);

    function FloatRight() {
        _classCallCheck(this, FloatRight);

        return _possibleConstructorReturn(this, (FloatRight.__proto__ || Object.getPrototypeOf(FloatRight)).apply(this, arguments));
    }

    _createClass(FloatRight, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "floatRight" },
                this.props.children
            );
        }
    }]);

    return FloatRight;
}(React.Component);

var Button = function (_React$Component11) {
    _inherits(Button, _React$Component11);

    function Button() {
        _classCallCheck(this, Button);

        return _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).apply(this, arguments));
    }

    _createClass(Button, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "button",
                { className: "ui " + this.props.type + " button" },
                this.props.text
            );
        }
    }]);

    return Button;
}(React.Component);

var Buttons = function (_React$Component12) {
    _inherits(Buttons, _React$Component12);

    function Buttons() {
        _classCallCheck(this, Buttons);

        return _possibleConstructorReturn(this, (Buttons.__proto__ || Object.getPrototypeOf(Buttons)).apply(this, arguments));
    }

    _createClass(Buttons, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "ui buttons" },
                this.props.children
            );
        }
    }]);

    return Buttons;
}(React.Component);

// şimdilik bu kısım component tarzı değil, sonradan düzeltirim


var Img = function (_React$Component13) {
    _inherits(Img, _React$Component13);

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

var MiniImage = function (_React$Component14) {
    _inherits(MiniImage, _React$Component14);

    function MiniImage() {
        _classCallCheck(this, MiniImage);

        return _possibleConstructorReturn(this, (MiniImage.__proto__ || Object.getPrototypeOf(MiniImage)).apply(this, arguments));
    }

    _createClass(MiniImage, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "ui small image" },
                React.createElement("img", { src: this.props.src })
            );
        }
    }]);

    return MiniImage;
}(React.Component);

var MiniImagesWrapper = function (_React$Component15) {
    _inherits(MiniImagesWrapper, _React$Component15);

    function MiniImagesWrapper() {
        _classCallCheck(this, MiniImagesWrapper);

        return _possibleConstructorReturn(this, (MiniImagesWrapper.__proto__ || Object.getPrototypeOf(MiniImagesWrapper)).apply(this, arguments));
    }

    _createClass(MiniImagesWrapper, [{
        key: "render",
        value: function render() {
            return React.createElement(
                Center,
                null,
                React.createElement(MiniImage, { src: "https://cdn.shoplightspeed.com/shops/613622/files/8420157/image.jpg" }),
                React.createElement(MiniImage, { src: "http://3.bp.blogspot.com/-uC4SEk9v07I/UyVCeORCsdI/AAAAAAAAA-k/6xZx0EVnCMc/s1600/iphone+5s+rep.jpg" }),
                React.createElement(MiniImage, { src: "https://i.ytimg.com/vi/2jDd8iPIuEc/maxresdefault.jpg" }),
                React.createElement(MiniImage, { src: "https://i.ytimg.com/vi/kLg__oZYfG8/maxresdefault.jpg" }),
                React.createElement(MiniImage, { src: "http://3.bp.blogspot.com/-uC4SEk9v07I/UyVCeORCsdI/AAAAAAAAA-k/6xZx0EVnCMc/s1600/iphone+5s+rep.jpg" })
            );
        }
    }]);

    return MiniImagesWrapper;
}(React.Component);

var Menu = function (_React$Component16) {
    _inherits(Menu, _React$Component16);

    function Menu() {
        _classCallCheck(this, Menu);

        return _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).apply(this, arguments));
    }

    _createClass(Menu, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { id: "menu", className: "ui teal inverted menu" },
                React.createElement(
                    "a",
                    { className: "active item" },
                    "Ana Sayfa"
                ),
                React.createElement(
                    "a",
                    { className: "item" },
                    "Takip"
                ),
                React.createElement(
                    "a",
                    { className: "item" },
                    "Hesap"
                )
            );
        }
    }]);

    return Menu;
}(React.Component);

var Menu2 = function (_React$Component17) {
    _inherits(Menu2, _React$Component17);

    function Menu2() {
        _classCallCheck(this, Menu2);

        return _possibleConstructorReturn(this, (Menu2.__proto__ || Object.getPrototypeOf(Menu2)).apply(this, arguments));
    }

    _createClass(Menu2, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { id: "menu", "class": "ui icon inverted menu" },
                React.createElement(
                    "a",
                    { "class": "item" },
                    React.createElement(
                        "i",
                        { "class": "icon" },
                        React.createElement("i", { "class": "fa fa-home", "aria-hidden": "true" })
                    )
                ),
                React.createElement(
                    "a",
                    { "class": "item" },
                    React.createElement(
                        "i",
                        { "class": "icon" },
                        React.createElement("i", { "class": "fa fa-user", "aria-hidden": "true" })
                    )
                ),
                React.createElement(
                    "a",
                    { "class": "item" },
                    React.createElement(
                        "i",
                        { "class": "icon" },
                        React.createElement("i", { "class": "fa fa-bug", "aria-hidden": "true" })
                    )
                )
            );
        }
    }]);

    return Menu2;
}(React.Component);

var Menu3 = function (_React$Component18) {
    _inherits(Menu3, _React$Component18);

    function Menu3() {
        _classCallCheck(this, Menu3);

        return _possibleConstructorReturn(this, (Menu3.__proto__ || Object.getPrototypeOf(Menu3)).apply(this, arguments));
    }

    _createClass(Menu3, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { id: "menu", className: "ui secondary  menu" },
                React.createElement(
                    "div",
                    { id: "hesap", "class": "ui button" },
                    React.createElement("i", { "class": "user icon" }),
                    " Hesap"
                )
            );
        }
    }]);

    return Menu3;
}(React.Component);

var Logo = function (_React$Component19) {
    _inherits(Logo, _React$Component19);

    function Logo() {
        _classCallCheck(this, Logo);

        return _possibleConstructorReturn(this, (Logo.__proto__ || Object.getPrototypeOf(Logo)).apply(this, arguments));
    }

    _createClass(Logo, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { id: "logo" },
                React.createElement(H, { type: "1", text: "Yorumlaa" })
            );
        }
    }]);

    return Logo;
}(React.Component);

var SearchBar = function (_React$Component20) {
    _inherits(SearchBar, _React$Component20);

    function SearchBar() {
        _classCallCheck(this, SearchBar);

        return _possibleConstructorReturn(this, (SearchBar.__proto__ || Object.getPrototypeOf(SearchBar)).apply(this, arguments));
    }

    _createClass(SearchBar, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { id: "search", className: "ui search" },
                React.createElement("input", { className: "prompt", type: "text", placeholder: "Ara..." })
            );
        }
    }]);

    return SearchBar;
}(React.Component);

var BreadCrumb = function (_React$Component21) {
    _inherits(BreadCrumb, _React$Component21);

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

var ProductHeader = function (_React$Component22) {
    _inherits(ProductHeader, _React$Component22);

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

var FollowButton = function (_React$Component23) {
    _inherits(FollowButton, _React$Component23);

    function FollowButton() {
        _classCallCheck(this, FollowButton);

        return _possibleConstructorReturn(this, (FollowButton.__proto__ || Object.getPrototypeOf(FollowButton)).apply(this, arguments));
    }

    _createClass(FollowButton, [{
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
                            { id: "followButton" },
                            React.createElement(
                                "div",
                                { className: "ui labeled button", tabindex: "0" },
                                React.createElement(
                                    "div",
                                    { className: "ui red button" },
                                    React.createElement("i", { className: "heart icon" }),
                                    " Takip Et"
                                ),
                                React.createElement(
                                    "a",
                                    { className: "ui basic red left pointing label" },
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
//<div className="ui right floated button">Butoncuk</div>

var Example = function (_React$Component24) {
    _inherits(Example, _React$Component24);

    function Example() {
        _classCallCheck(this, Example);

        return _possibleConstructorReturn(this, (Example.__proto__ || Object.getPrototypeOf(Example)).apply(this, arguments));
    }

    _createClass(Example, [{
        key: "render",
        value: function render() {
            return React.createElement(
                Row,
                { size: "" },
                React.createElement(
                    Column,
                    null,
                    React.createElement(
                        "div",
                        { className: "overflowX" },
                        "Lorem Ipsum, dizgi ve bask\u0131 end\xFCstrisinde kullan\u0131lan m\u0131g\u0131r metinlerdir. Lorem Ipsum, ad\u0131 bilinmeyen bir matbaac\u0131n\u0131n bir hurufat numune kitab\u0131 olu\u015Fturmak \xFCzere bir yaz\u0131 galerisini alarak kar\u0131\u015Ft\u0131rd\u0131\u011F\u0131 1500'lerden beri end\xFCstri standard\u0131 sahte metinler olarak kullan\u0131lm\u0131\u015Ft\u0131r. Be\u015Fy\xFCz y\u0131l boyunca varl\u0131\u011F\u0131n\u0131 s\xFCrd\xFCrmekle kalmam\u0131\u015F, ayn\u0131 zamanda pek de\u011Fi\u015Fmeden elektronik dizgiye de s\u0131\xE7ram\u0131\u015Ft\u0131r. 1960'larda Lorem Ipsum pasajlar\u0131 da i\xE7eren Letraset yapraklar\u0131n\u0131n yay\u0131nlanmas\u0131 ile ve yak\u0131n zamanda Aldus PageMaker gibi Lorem Ipsum s\xFCr\xFCmleri i\xE7eren masa\xFCst\xFC yay\u0131nc\u0131l\u0131k yaz\u0131l\u0131mlar\u0131 ile pop\xFCler olmu\u015Ftur."
                    )
                )
            );
        }
    }]);

    return Example;
}(React.Component);

var OverfloX = function (_React$Component25) {
    _inherits(OverfloX, _React$Component25);

    function OverfloX() {
        _classCallCheck(this, OverfloX);

        return _possibleConstructorReturn(this, (OverfloX.__proto__ || Object.getPrototypeOf(OverfloX)).apply(this, arguments));
    }

    _createClass(OverfloX, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "overflowX" },
                this.props.children
            );
        }
    }]);

    return OverfloX;
}(React.Component);

var CommentDate = function (_React$Component26) {
    _inherits(CommentDate, _React$Component26);

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
                " 12/12/1994"
            );
        }
    }]);

    return CommentDate;
}(React.Component);

var LikeButton = function (_React$Component27) {
    _inherits(LikeButton, _React$Component27);

    function LikeButton(props) {
        _classCallCheck(this, LikeButton);

        var _this27 = _possibleConstructorReturn(this, (LikeButton.__proto__ || Object.getPrototypeOf(LikeButton)).call(this, props));

        if (_this27.props.likeOrDislike == "like") {
            _this27.liked = " likedComment";
        } else {
            _this27.liked = " ";
        }
        return _this27;
    }

    _createClass(LikeButton, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "button",
                { "class": "ui basic button" },
                React.createElement(
                    "i",
                    { "class": "icon" },
                    React.createElement("i", { "class": "fa fa-thumbs-up" + this.liked, "aria-hidden": "true" })
                ),
                this.props.value
            );
        }
    }]);

    return LikeButton;
}(React.Component);

var DislikeButton = function (_React$Component28) {
    _inherits(DislikeButton, _React$Component28);

    function DislikeButton(props) {
        _classCallCheck(this, DislikeButton);

        var _this28 = _possibleConstructorReturn(this, (DislikeButton.__proto__ || Object.getPrototypeOf(DislikeButton)).call(this, props));

        if (_this28.props.likeOrDislike == "dislike") {
            _this28.liked = " dislikedComment";
        } else {
            _this28.liked = " ";
        }
        return _this28;
    }

    _createClass(DislikeButton, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "button",
                { "class": "ui basic button" },
                React.createElement(
                    "i",
                    { "class": "icon" },
                    React.createElement("i", { "class": "fa fa-thumbs-down" + this.liked, "aria-hidden": "true" })
                ),
                this.props.value
            );
        }
    }]);

    return DislikeButton;
}(React.Component);

var ComplaintButton = function (_React$Component29) {
    _inherits(ComplaintButton, _React$Component29);

    function ComplaintButton() {
        _classCallCheck(this, ComplaintButton);

        return _possibleConstructorReturn(this, (ComplaintButton.__proto__ || Object.getPrototypeOf(ComplaintButton)).apply(this, arguments));
    }

    _createClass(ComplaintButton, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "button",
                { "class": "ui basic button" },
                React.createElement("i", { id: "exclamation", "class": "fa fa-exclamation", "aria-hidden": "true" })
            );
        }
    }]);

    return ComplaintButton;
}(React.Component);

var Categories = function (_React$Component30) {
    _inherits(Categories, _React$Component30);

    function Categories() {
        _classCallCheck(this, Categories);

        return _possibleConstructorReturn(this, (Categories.__proto__ || Object.getPrototypeOf(Categories)).apply(this, arguments));
    }

    _createClass(Categories, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { id: "categories" },
                React.createElement(
                    "button",
                    { "class": " big ui button" },
                    "Elektronik"
                ),
                React.createElement(
                    "button",
                    { "class": " big ui  button" },
                    "Giyim"
                ),
                React.createElement(
                    "button",
                    { "class": " big ui  button" },
                    "Mobilya"
                ),
                React.createElement(
                    "button",
                    { "class": " big ui  button" },
                    "G\u0131da"
                ),
                React.createElement(
                    "button",
                    { "class": " big ui  button" },
                    "Ofis"
                ),
                React.createElement(
                    "button",
                    { "class": " big ui  button" },
                    "Kozmetik"
                ),
                React.createElement(
                    "button",
                    { "class": " big ui  button" },
                    "Kitap"
                )
            );
        }
    }]);

    return Categories;
}(React.Component);

var App = function (_React$Component31) {
    _inherits(App, _React$Component31);

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
                React.createElement(Content, null),
                React.createElement(Footer, null)
            );
        }
    }]);

    return App;
}(React.Component);

var Header = function (_React$Component32) {
    _inherits(Header, _React$Component32);

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
                                React.createElement(
                                    FloatRight,
                                    null,
                                    React.createElement(Menu3, null)
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    Row,
                    { withoutContainer: true, size: "one" },
                    React.createElement(
                        Column,
                        null,
                        React.createElement(
                            Center,
                            { size: "sixteen" },
                            React.createElement(Categories, null)
                        )
                    )
                )
            );
        }
    }]);

    return Header;
}(React.Component);

var Content = function (_React$Component33) {
    _inherits(Content, _React$Component33);

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
                React.createElement(FollowButton, null),
                React.createElement(Product, null),
                React.createElement(Comments, null)
            );
        }
    }]);

    return Content;
}(React.Component);

var DirectlyButtons = function (_React$Component34) {
    _inherits(DirectlyButtons, _React$Component34);

    function DirectlyButtons(props) {
        _classCallCheck(this, DirectlyButtons);

        var _this34 = _possibleConstructorReturn(this, (DirectlyButtons.__proto__ || Object.getPrototypeOf(DirectlyButtons)).call(this, props));

        _this34.buttons = [];
        _this34.state = {
            selectedIndex: 0
        };
        for (var i = 0; i < 4; i++) {
            if (_this34.props.selectedIndex == i + 1) {
                _this34.buttons.push(React.createElement(
                    "button",
                    { "class": "disabled ui button" },
                    i + 1
                ));
            } else {
                _this34.buttons.push(React.createElement(
                    "button",
                    { "class": "ui button" },
                    i + 1
                ));
            }
        }
        return _this34;
    }

    _createClass(DirectlyButtons, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { "class": "small blue ui buttons" },
                this.buttons
            );
        }
    }]);

    return DirectlyButtons;
}(React.Component);

var ImageSlider = function (_React$Component35) {
    _inherits(ImageSlider, _React$Component35);

    function ImageSlider(props) {
        _classCallCheck(this, ImageSlider);

        var _this35 = _possibleConstructorReturn(this, (ImageSlider.__proto__ || Object.getPrototypeOf(ImageSlider)).call(this, props));

        _this35.nextIndex = 0;
        _this35.state = {
            src: _this35.props.srcs[0],
            index: 0
        };
        _this35.change = _this35.change.bind(_this35);
        return _this35;
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
            var _this36 = this;

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
                                        return _this36.change(-1);
                                    } },
                                React.createElement("i", { className: "left arrow icon" })
                            ),
                            React.createElement(
                                "button",
                                { className: "mini ui icon button", onClick: function onClick() {
                                        return _this36.change(+1);
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

var DrawCircle = function (_React$Component36) {
    _inherits(DrawCircle, _React$Component36);

    function DrawCircle(props) {
        _classCallCheck(this, DrawCircle);

        var _this37 = _possibleConstructorReturn(this, (DrawCircle.__proto__ || Object.getPrototypeOf(DrawCircle)).call(this, props));

        _this37.percent = _this37.props.percentValue * 10;
        _this37.limitColor = {
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
        _this37.color = _this37.limitColor[0].color;
        for (var i = 0; i < Object.keys(_this37.limitColor).length; i++) {
            if (_this37.limitColor[i].min <= _this37.props.percentValue && _this37.props.percentValue < _this37.limitColor[i].max) {
                _this37.color = _this37.limitColor[i].color;
                break;
            }
        }
        return _this37;
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

var ProductAttributeName = function (_React$Component37) {
    _inherits(ProductAttributeName, _React$Component37);

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

var ProductAttribute = function (_React$Component38) {
    _inherits(ProductAttribute, _React$Component38);

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

var Rating = function (_React$Component39) {
    _inherits(Rating, _React$Component39);

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

var Product = function (_React$Component40) {
    _inherits(Product, _React$Component40);

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

var YorumlarHeader = function (_React$Component41) {
    _inherits(YorumlarHeader, _React$Component41);

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

var PageNumber = function (_React$Component42) {
    _inherits(PageNumber, _React$Component42);

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

var RatingBar = function (_React$Component43) {
    _inherits(RatingBar, _React$Component43);

    function RatingBar(props) {
        _classCallCheck(this, RatingBar);

        var _this44 = _possibleConstructorReturn(this, (RatingBar.__proto__ || Object.getPrototypeOf(RatingBar)).call(this, props));

        _this44.percent = _this44.props.ratingAverage * 10;
        // bu kısım drawcircle ile aynı refactor ederken buna bir çare bulabilirsin
        _this44.limitColor = {
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
        _this44.color = _this44.limitColor[0].color;
        for (var i = 0; i < Object.keys(_this44.limitColor).length; i++) {
            if (_this44.limitColor[i].min <= _this44.props.ratingAverage && _this44.props.ratingAverage < _this44.limitColor[i].max) {
                _this44.color = _this44.limitColor[i].color;
                break;
            }
        }
        // ^^^
        _this44.widthOfFill = _this44.props.ratingAverage * 15 + "px";
        return _this44;
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

var Comment = function (_React$Component44) {
    _inherits(Comment, _React$Component44);

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
                                    React.createElement(CommentDate, null)
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

var Comments = function (_React$Component45) {
    _inherits(Comments, _React$Component45);

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
                    ratingAverage: "7.2"
                }),
                React.createElement(Comment, {
                    commentOwner: "RTE_53",
                    commentText: "Eyyy k\u0131l\u0131\xE7dar sen kimsin yaa!!",
                    likeValue: "9912312312",
                    dislikeValue: "912",
                    likeOrDislike: "dislike",
                    ratingAverage: "4.2"
                }),
                React.createElement(Comment, {
                    commentOwner: "ByKemal31",
                    commentText: "Derhal buray\u0131 terket karde\u015Fim",
                    likeValue: "321312412",
                    dislikeValue: "91",
                    ratingAverage: "6.8"
                }),
                React.createElement(Comment, {
                    commentOwner: "Deniz_Baykal_07",
                    commentText: "Benim ne i\u015Fim var burda amq",
                    likeValue: "999999999999",
                    dislikeValue: "-1231",
                    ratingAverage: "1.0"
                }),
                React.createElement(PageNumber, null),
                React.createElement(WriteComment, null)
            );
        }
    }]);

    return Comments;
}(React.Component);

var SendButton = function (_React$Component46) {
    _inherits(SendButton, _React$Component46);

    function SendButton() {
        _classCallCheck(this, SendButton);

        return _possibleConstructorReturn(this, (SendButton.__proto__ || Object.getPrototypeOf(SendButton)).apply(this, arguments));
    }

    _createClass(SendButton, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "button",
                { "class": "ui primary button" },
                "G\xF6nder"
            );
        }
    }]);

    return SendButton;
}(React.Component);

var WriteComment = function (_React$Component47) {
    _inherits(WriteComment, _React$Component47);

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
                            null,
                            React.createElement(
                                Column,
                                null,
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
                                        React.createElement("textarea", { rows: "5" })
                                    )
                                )
                            )
                        ),
                        React.createElement(
                            Row,
                            null,
                            React.createElement(
                                Column,
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

var Footer = function (_React$Component48) {
    _inherits(Footer, _React$Component48);

    function Footer() {
        _classCallCheck(this, Footer);

        return _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).apply(this, arguments));
    }

    _createClass(Footer, [{
        key: "render",
        value: function render() {
            return React.createElement("div", null);
        }
    }]);

    return Footer;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));