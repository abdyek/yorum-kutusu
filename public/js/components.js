var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RowLoading = function (_React$Component) {
    _inherits(RowLoading, _React$Component);

    function RowLoading() {
        _classCallCheck(this, RowLoading);

        return _possibleConstructorReturn(this, (RowLoading.__proto__ || Object.getPrototypeOf(RowLoading)).apply(this, arguments));
    }

    _createClass(RowLoading, [{
        key: "render",
        value: function render() {
            return React.createElement(
                Row,
                { size: "one" },
                React.createElement(
                    Column,
                    null,
                    React.createElement(
                        Center,
                        null,
                        React.createElement(Loading, null)
                    )
                )
            );
        }
    }]);

    return RowLoading;
}(React.Component);

var Loading = function (_React$Component2) {
    _inherits(Loading, _React$Component2);

    function Loading() {
        _classCallCheck(this, Loading);

        return _possibleConstructorReturn(this, (Loading.__proto__ || Object.getPrototypeOf(Loading)).apply(this, arguments));
    }

    _createClass(Loading, [{
        key: "render",
        value: function render() {
            return React.createElement("div", { className: "lds-dual-ring" });
        }
    }]);

    return Loading;
}(React.Component);

/* bu bütün sayfalarda kullanılabilecek bir bileşendir */


var Container = function (_React$Component3) {
    _inherits(Container, _React$Component3);

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


var Segment = function (_React$Component4) {
    _inherits(Segment, _React$Component4);

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


var RaisedSegment = function (_React$Component5) {
    _inherits(RaisedSegment, _React$Component5);

    function RaisedSegment() {
        _classCallCheck(this, RaisedSegment);

        return _possibleConstructorReturn(this, (RaisedSegment.__proto__ || Object.getPrototypeOf(RaisedSegment)).apply(this, arguments));
    }

    _createClass(RaisedSegment, [{
        key: "render",
        value: function render() {
            this.otherClass = this.props.otherClass ? this.props.otherClass : "";
            return React.createElement(
                "div",
                { className: "ui raised segment " + this.otherClass },
                this.props.children
            );
        }
    }]);

    return RaisedSegment;
}(React.Component);

/* bu bütün sayfalarda kullanılabilecek bir bileşendir */


var Row = function (_React$Component6) {
    _inherits(Row, _React$Component6);

    function Row(props) {
        _classCallCheck(this, Row);

        var _this6 = _possibleConstructorReturn(this, (Row.__proto__ || Object.getPrototypeOf(Row)).call(this, props));

        _this6.stackable = "stackable";
        if (_this6.props.nonStackable) {
            _this6.stackable = "";
        }
        return _this6;
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


var Column = function (_React$Component7) {
    _inherits(Column, _React$Component7);

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


var WideColumn = function (_React$Component8) {
    _inherits(WideColumn, _React$Component8);

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


var H = function (_React$Component9) {
    _inherits(H, _React$Component9);

    function H(props) {
        _classCallCheck(this, H);

        var _this9 = _possibleConstructorReturn(this, (H.__proto__ || Object.getPrototypeOf(H)).call(this, props));

        _this9.textAlign = "";
        if (_this9.props.textAlign == "center") {
            _this9.textAlign = " center aligned ";
        }
        if (!_this9.props.optional) {
            _this9.optional = "";
        } else {
            _this9.optional = _this9.props.optional;
        }
        _this9.a = React.createElement(
            "a",
            { href: _this9.props.href, onClick: _this9.props.handleOnClick },
            _this9.props.text
        );
        if (_this9.props.type == "1") {
            _this9.h = React.createElement(
                "h1",
                { className: "ui " + _this9.textAlign + " header h-title " + _this9.optional },
                _this9.a
            );
        } else if (_this9.props.type == "2") {
            _this9.h = React.createElement(
                "h2",
                { className: "ui " + _this9.textAlign + " header h-title " + _this9.optional },
                _this9.a
            );
        } else if (_this9.props.type == "3") {
            _this9.h = React.createElement(
                "h3",
                { className: "ui " + _this9.textAlign + " header h-title " + _this9.optional },
                _this9.a
            );
        } else if (_this9.props.type == "4") {
            _this9.h = React.createElement(
                "h4",
                { className: "ui " + _this9.textAlign + "header h-title " + _this9.optional },
                _this9.a
            );
        } else if (_this9.props.type == "5") {
            _this9.h = React.createElement(
                "h5",
                { className: "ui " + _this9.textAlign + "header h-title " + _this9.optional },
                _this9.a
            );
        }
        return _this9;
    }

    _createClass(H, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                this.h
            );
        }
    }]);

    return H;
}(React.Component);

/* bu bütün sayfalarda kullanılabilecek bir bileşendir */


var Center = function (_React$Component10) {
    _inherits(Center, _React$Component10);

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


var Hx = function (_React$Component11) {
    _inherits(Hx, _React$Component11);

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


var FloatRight = function (_React$Component12) {
    _inherits(FloatRight, _React$Component12);

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


var Button = function (_React$Component13) {
    _inherits(Button, _React$Component13);

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


var Buttons = function (_React$Component14) {
    _inherits(Buttons, _React$Component14);

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

// bunlar 2 sayfada bulunduğu için componentJS'ye taşınmasını uygun buldum


var LikeButton = function (_React$Component15) {
    _inherits(LikeButton, _React$Component15);

    function LikeButton(props) {
        _classCallCheck(this, LikeButton);

        var _this15 = _possibleConstructorReturn(this, (LikeButton.__proto__ || Object.getPrototypeOf(LikeButton)).call(this, props));

        if (_this15.props.likeOrDislike == "like") {
            _this15.liked = " likedComment";
        } else {
            _this15.liked = " ";
        }
        return _this15;
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

var ComplaintButton = function (_React$Component16) {
    _inherits(ComplaintButton, _React$Component16);

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
// ^ bunlar 2 sayfada bulunduğu için componentJS'ye taşınmasını uygun buldum

var LoadingSpin = function (_React$Component17) {
    _inherits(LoadingSpin, _React$Component17);

    function LoadingSpin() {
        _classCallCheck(this, LoadingSpin);

        return _possibleConstructorReturn(this, (LoadingSpin.__proto__ || Object.getPrototypeOf(LoadingSpin)).apply(this, arguments));
    }

    _createClass(LoadingSpin, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    { className: "lds-ellipsis" },
                    React.createElement("div", null),
                    React.createElement("div", null),
                    React.createElement("div", null),
                    React.createElement("div", null)
                )
            );
        }
    }]);

    return LoadingSpin;
}(React.Component);

var RowLoadingSpin = function (_React$Component18) {
    _inherits(RowLoadingSpin, _React$Component18);

    function RowLoadingSpin() {
        _classCallCheck(this, RowLoadingSpin);

        return _possibleConstructorReturn(this, (RowLoadingSpin.__proto__ || Object.getPrototypeOf(RowLoadingSpin)).apply(this, arguments));
    }

    _createClass(RowLoadingSpin, [{
        key: "render",
        value: function render() {
            if (this.props.nonSegment) {
                return React.createElement(
                    Row,
                    { size: "one" },
                    React.createElement(
                        Column,
                        null,
                        React.createElement(
                            Center,
                            null,
                            React.createElement(LoadingSpin, null)
                        )
                    )
                );
            } else {
                return React.createElement(
                    Row,
                    { size: "one" },
                    React.createElement(
                        Column,
                        null,
                        React.createElement(
                            RaisedSegment,
                            null,
                            React.createElement(
                                Center,
                                null,
                                React.createElement(LoadingSpin, null)
                            )
                        )
                    )
                );
            }
        }
    }]);

    return RowLoadingSpin;
}(React.Component);

var BasicMessage = function (_React$Component19) {
    _inherits(BasicMessage, _React$Component19);

    function BasicMessage(props) {
        _classCallCheck(this, BasicMessage);

        var _this19 = _possibleConstructorReturn(this, (BasicMessage.__proto__ || Object.getPrototypeOf(BasicMessage)).call(this, props));

        if (_this19.props.type == "success") {
            _this19.className = "ui blue message";
        } else if (_this19.props.type == "warning") {
            _this19.className = "ui yellow message";
        } else if (_this19.props.type == "danger") {
            _this19.className = "ui red message";
        }
        return _this19;
    }

    _createClass(BasicMessage, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: this.className },
                this.props.text
            );
        }
    }]);

    return BasicMessage;
}(React.Component);