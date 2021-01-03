var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CancelButton = function (_React$Component) {
    _inherits(CancelButton, _React$Component);

    function CancelButton(props) {
        _classCallCheck(this, CancelButton);

        var _this = _possibleConstructorReturn(this, (CancelButton.__proto__ || Object.getPrototypeOf(CancelButton)).call(this, props));

        _this.closeFunc = _this.closeFunc.bind(_this);
        return _this;
    }

    _createClass(CancelButton, [{
        key: "closeFunc",
        value: function closeFunc() {
            this.props.handleCancelButton();
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "button",
                { className: "ui mini icon red button", onClick: this.closeFunc },
                React.createElement(
                    "i",
                    { className: "icon" },
                    React.createElement("i", { className: "fa fa-times", "aria-hidden": "true" })
                )
            );
        }
    }]);

    return CancelButton;
}(React.Component);