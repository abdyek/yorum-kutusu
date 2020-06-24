var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

var Loading = function (_React$Component) {
    _inherits(Loading, _React$Component);

    function Loading() {
        _classCallCheck(this, Loading);

        return _possibleConstructorReturn(this, (Loading.__proto__ || Object.getPrototypeOf(Loading)).apply(this, arguments));
    }

    _createClass(Loading, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                "loading!"
            );
        }
    }]);

    return Loading;
}(React.Component);

/* bu bütün sayfalarda kullanılabilecek bir bileşendir */


var Container = function (_React$Component2) {
    _inherits(Container, _React$Component2);

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


var Segment = function (_React$Component3) {
    _inherits(Segment, _React$Component3);

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


var RaisedSegment = function (_React$Component4) {
    _inherits(RaisedSegment, _React$Component4);

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


var Row = function (_React$Component5) {
    _inherits(Row, _React$Component5);

    function Row(props) {
        _classCallCheck(this, Row);

        var _this5 = _possibleConstructorReturn(this, (Row.__proto__ || Object.getPrototypeOf(Row)).call(this, props));

        _this5.stackable = "stackable";
        if (_this5.props.nonStackable) {
            _this5.stackable = "";
        }
        return _this5;
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


var Column = function (_React$Component6) {
    _inherits(Column, _React$Component6);

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


var WideColumn = function (_React$Component7) {
    _inherits(WideColumn, _React$Component7);

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


var H = function (_React$Component8) {
    _inherits(H, _React$Component8);

    function H(props) {
        _classCallCheck(this, H);

        var _this8 = _possibleConstructorReturn(this, (H.__proto__ || Object.getPrototypeOf(H)).call(this, props));

        _this8.textAlign = "";
        if (_this8.props.textAlign == "center") {
            _this8.textAlign = " center aligned ";
        }
        if (!_this8.props.optional) {
            _this8.optional = "";
        } else {
            _this8.optional = _this8.props.optional;
        }
        return _this8;
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


var Center = function (_React$Component9) {
    _inherits(Center, _React$Component9);

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


var Hx = function (_React$Component10) {
    _inherits(Hx, _React$Component10);

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


var FloatRight = function (_React$Component11) {
    _inherits(FloatRight, _React$Component11);

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


var Button = function (_React$Component12) {
    _inherits(Button, _React$Component12);

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


var Buttons = function (_React$Component13) {
    _inherits(Buttons, _React$Component13);

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


var Menu = function (_React$Component14) {
    _inherits(Menu, _React$Component14);

    function Menu(props) {
        _classCallCheck(this, Menu);

        return _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this, props));
    }

    _createClass(Menu, [{
        key: "render",
        value: function render() {
            if (username == undefined) {
                return React.createElement(LogInButton, null);
            }
            return React.createElement(AccountButton, { userName: username });
        }
    }]);

    return Menu;
}(React.Component);

var LogInButton = function (_React$Component15) {
    _inherits(LogInButton, _React$Component15);

    function LogInButton(props) {
        _classCallCheck(this, LogInButton);

        return _possibleConstructorReturn(this, (LogInButton.__proto__ || Object.getPrototypeOf(LogInButton)).call(this, props));
    }

    _createClass(LogInButton, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "a",
                { href: "girisYap" },
                React.createElement(
                    "div",
                    { id: "menu", className: "ui secondary  menu" },
                    React.createElement(
                        "div",
                        { id: "hesap", className: "ui button" },
                        React.createElement("i", { className: "user icon" }),
                        " Giri\u015F Yap"
                    )
                )
            );
        }
    }]);

    return LogInButton;
}(React.Component);

var AccountButton = function (_React$Component16) {
    _inherits(AccountButton, _React$Component16);

    function AccountButton(props) {
        _classCallCheck(this, AccountButton);

        return _possibleConstructorReturn(this, (AccountButton.__proto__ || Object.getPrototypeOf(AccountButton)).call(this, props));
    }

    _createClass(AccountButton, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "a",
                { href: "profil/" + this.props.userName },
                React.createElement(
                    "div",
                    { id: "menu", className: "ui secondary  menu" },
                    React.createElement(
                        "div",
                        { id: "hesap", className: "ui button" },
                        React.createElement("i", { className: "user icon" }),
                        this.props.userName
                    )
                )
            );
        }
    }]);

    return AccountButton;
}(React.Component);

/* bu bütün sayfalarda kullanılabilecek bir bileşendir */


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

/* bu bütün sayfalarda kullanılabilecek bir bileşendir */


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

/* bu bütün sayfalarda kullanılabilecek bir bileşendir */


var Categories = function (_React$Component19) {
    _inherits(Categories, _React$Component19);

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


var Header = function (_React$Component20) {
    _inherits(Header, _React$Component20);

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


var Footer = function (_React$Component21) {
    _inherits(Footer, _React$Component21);

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

// bunlar 2 sayfada bulunduğu için componentJS'ye taşınmasını uygun buldum


var LikeButton = function (_React$Component22) {
    _inherits(LikeButton, _React$Component22);

    function LikeButton(props) {
        _classCallCheck(this, LikeButton);

        var _this22 = _possibleConstructorReturn(this, (LikeButton.__proto__ || Object.getPrototypeOf(LikeButton)).call(this, props));

        if (_this22.props.likeOrDislike == "like") {
            _this22.liked = " likedComment";
        } else {
            _this22.liked = " ";
        }
        return _this22;
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

var DislikeButton = function (_React$Component23) {
    _inherits(DislikeButton, _React$Component23);

    function DislikeButton(props) {
        _classCallCheck(this, DislikeButton);

        var _this23 = _possibleConstructorReturn(this, (DislikeButton.__proto__ || Object.getPrototypeOf(DislikeButton)).call(this, props));

        if (_this23.props.likeOrDislike == "dislike") {
            _this23.liked = " dislikedComment";
        } else {
            _this23.liked = " ";
        }
        return _this23;
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
// ^ bunlar 2 sayfada bulunduğu için componentJS'ye taşınmasını uygun buldum