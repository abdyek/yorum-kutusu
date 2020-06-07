var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* bu bütün sayfalarda kullanılabilecek bir bileşendir */
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

/* bu bütün sayfalarda kullanılabilecek bir bileşendir */


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

/* bu bütün sayfalarda kullanılabilecek bir bileşendir */


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

/* bu bütün sayfalarda kullanılabilecek bir bileşendir */


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

/* bu bütün sayfalarda kullanılabilecek bir bileşendir */


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

/* bu bütün sayfalarda kullanılabilecek bir bileşendir */


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

/* bu bütün sayfalarda kullanılabilecek bir bileşendir */


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

/* bu bütün sayfalarda kullanılabilecek bir bileşendir */


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

/* bu bütün sayfalarda kullanılabilecek bir bileşendir */


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
                { className: "ui " + this.props.size + " header" },
                this.props.text
            );
        }
    }]);

    return Hx;
}(React.Component);

/* bu bütün sayfalarda kullanılabilecek bir bileşendir */


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

/* bu bütün sayfalarda kullanılabilecek bir bileşendir */


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

/* bu bütün sayfalarda kullanılabilecek bir bileşendir */


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

/* bu bütün sayfalarda kullanılabilecek bir bileşendir */


var Menu = function (_React$Component13) {
    _inherits(Menu, _React$Component13);

    function Menu() {
        _classCallCheck(this, Menu);

        return _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).apply(this, arguments));
    }

    _createClass(Menu, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { id: "menu", className: "ui secondary  menu" },
                React.createElement(
                    "div",
                    { id: "hesap", className: "ui button" },
                    React.createElement("i", { className: "user icon" }),
                    " Hesap"
                )
            );
        }
    }]);

    return Menu;
}(React.Component);

/* bu bütün sayfalarda kullanılabilecek bir bileşendir */


var Logo = function (_React$Component14) {
    _inherits(Logo, _React$Component14);

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

/* bu bütün sayfalarda kullanılabilecek bir bileşendir */


var SearchBar = function (_React$Component15) {
    _inherits(SearchBar, _React$Component15);

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

/* bu bütün sayfalarda kullanılabilecek bir bileşendir */


var Categories = function (_React$Component16) {
    _inherits(Categories, _React$Component16);

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
                    { className: " big ui button" },
                    "Elektronik"
                ),
                React.createElement(
                    "button",
                    { className: " big ui  button" },
                    "Giyim"
                ),
                React.createElement(
                    "button",
                    { className: " big ui  button" },
                    "Mobilya"
                ),
                React.createElement(
                    "button",
                    { className: " big ui  button" },
                    "G\u0131da"
                ),
                React.createElement(
                    "button",
                    { className: " big ui  button" },
                    "Ofis"
                ),
                React.createElement(
                    "button",
                    { className: " big ui  button" },
                    "Kozmetik"
                ),
                React.createElement(
                    "button",
                    { className: " big ui  button" },
                    "Kitap"
                )
            );
        }
    }]);

    return Categories;
}(React.Component);

/* bu bütün sayfalarda kullanılabilecek bir bileşendir */


var Header = function (_React$Component17) {
    _inherits(Header, _React$Component17);

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
                                    React.createElement(Menu, null)
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

/* bu bütün sayfalarda kullanılabilecek bir bileşendir */


var Footer = function (_React$Component18) {
    _inherits(Footer, _React$Component18);

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