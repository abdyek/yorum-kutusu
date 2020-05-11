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
        return _this7;
    }

    _createClass(H, [{
        key: "render",
        value: function render() {
            if (this.props.type == "1") {
                return React.createElement(
                    "h1",
                    { className: "ui " + this.textAlign + " header" },
                    this.props.text
                );
            } else if (this.props.type == "2") {
                return React.createElement(
                    "h2",
                    { className: "ui " + this.textAlign + " header" },
                    this.props.text
                );
            } else if (this.props.type == "3") {
                return React.createElement(
                    "h3",
                    { className: "ui " + this.textAlign + " header" },
                    this.props.text
                );
            } else if (this.props.type == "4") {
                return React.createElement(
                    "h4",
                    { className: "ui " + this.textAlign + "header" },
                    this.props.text
                );
            } else if (this.props.type == "5") {
                return React.createElement(
                    "h5",
                    { className: "ui " + this.textAlign + "header" },
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


var Image = function (_React$Component13) {
    _inherits(Image, _React$Component13);

    function Image() {
        _classCallCheck(this, Image);

        return _possibleConstructorReturn(this, (Image.__proto__ || Object.getPrototypeOf(Image)).apply(this, arguments));
    }

    _createClass(Image, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement("img", { id: "productImg", className: " ui image", src: "https://gigaom.com/wp-content/uploads/sites/1/2013/09/iphone5s_3color_ios7_print-2.jpg" })
            );
        }
    }]);

    return Image;
}(React.Component);

var Menu = function (_React$Component14) {
    _inherits(Menu, _React$Component14);

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

var Menu2 = function (_React$Component15) {
    _inherits(Menu2, _React$Component15);

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

var Menu3 = function (_React$Component16) {
    _inherits(Menu3, _React$Component16);

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

var Logo = function (_React$Component17) {
    _inherits(Logo, _React$Component17);

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

var SearchBar = function (_React$Component18) {
    _inherits(SearchBar, _React$Component18);

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

var BreadCrumb = function (_React$Component19) {
    _inherits(BreadCrumb, _React$Component19);

    function BreadCrumb() {
        _classCallCheck(this, BreadCrumb);

        return _possibleConstructorReturn(this, (BreadCrumb.__proto__ || Object.getPrototypeOf(BreadCrumb)).apply(this, arguments));
    }

    _createClass(BreadCrumb, [{
        key: "render",
        value: function render() {
            return React.createElement(
                Row,
                null,
                React.createElement(WideColumn, { size: "one" }),
                React.createElement(
                    WideColumn,
                    { size: "fourteen" },
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
//<div className="ui right floated button">Butoncuk</div>

var Example = function (_React$Component20) {
    _inherits(Example, _React$Component20);

    function Example() {
        _classCallCheck(this, Example);

        return _possibleConstructorReturn(this, (Example.__proto__ || Object.getPrototypeOf(Example)).apply(this, arguments));
    }

    _createClass(Example, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "floatRight" },
                "Butoncuk"
            );
        }
    }]);

    return Example;
}(React.Component);

var LikeButton = function (_React$Component21) {
    _inherits(LikeButton, _React$Component21);

    function LikeButton() {
        _classCallCheck(this, LikeButton);

        return _possibleConstructorReturn(this, (LikeButton.__proto__ || Object.getPrototypeOf(LikeButton)).apply(this, arguments));
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
                    React.createElement("i", { "class": "fa fa-thumbs-up", "aria-hidden": "true" })
                ),
                this.props.value
            );
        }
    }]);

    return LikeButton;
}(React.Component);

var DislikeButton = function (_React$Component22) {
    _inherits(DislikeButton, _React$Component22);

    function DislikeButton() {
        _classCallCheck(this, DislikeButton);

        return _possibleConstructorReturn(this, (DislikeButton.__proto__ || Object.getPrototypeOf(DislikeButton)).apply(this, arguments));
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
                    React.createElement("i", { "class": "fa fa-thumbs-down", "aria-hidden": "true" })
                ),
                this.props.value
            );
        }
    }]);

    return DislikeButton;
}(React.Component);

var Categories = function (_React$Component23) {
    _inherits(Categories, _React$Component23);

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