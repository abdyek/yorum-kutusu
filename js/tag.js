var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tag = function (_React$Component) {
    _inherits(Tag, _React$Component);

    function Tag(props) {
        _classCallCheck(this, Tag);

        return _possibleConstructorReturn(this, (Tag.__proto__ || Object.getPrototypeOf(Tag)).call(this, props));
    }

    _createClass(Tag, [{
        key: "render",
        value: function render() {
            if (this.props.passive) {
                return React.createElement(
                    "a",
                    { className: "ui large label tag-abdyek" },
                    this.props.text
                );
            }
            return React.createElement(
                "a",
                { className: "ui " + this.props.color + " large label tag-abdyek" },
                this.props.text,
                React.createElement(
                    "div",
                    { className: "detail" },
                    this.props.rateValue
                )
            );
        }
    }]);

    return Tag;
}(React.Component);

var Tags = function (_React$Component2) {
    _inherits(Tags, _React$Component2);

    function Tags(props) {
        _classCallCheck(this, Tags);

        return _possibleConstructorReturn(this, (Tags.__proto__ || Object.getPrototypeOf(Tags)).call(this, props));
    }

    _createClass(Tags, [{
        key: "render",
        value: function render() {
            this.tags = [];
            var keyArr = Object.keys(this.props.tags);
            for (var i = 0; i < keyArr.length; i++) {
                this.tags.push(React.createElement(Tag, { key: keyArr[i],
                    passive: this.props.tags[keyArr[i]].passive,
                    text: this.props.tags[keyArr[i]].text,
                    color: this.props.tags[keyArr[i]].color,
                    rateValue: this.props.tags[keyArr[i]].rateValue
                }));
            }
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    null,
                    this.tags
                )
            );
        }
    }]);

    return Tags;
}(React.Component);