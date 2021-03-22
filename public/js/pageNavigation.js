var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PageNavigation = function (_React$Component) {
    _inherits(PageNavigation, _React$Component);

    function PageNavigation(props) {
        _classCallCheck(this, PageNavigation);

        var _this = _possibleConstructorReturn(this, (PageNavigation.__proto__ || Object.getPrototypeOf(PageNavigation)).call(this, props));

        _this.sortByLike = _this.sortByLike.bind(_this);
        _this.sortByTime = _this.sortByTime.bind(_this);
        _this.selectOption = _this.selectOption.bind(_this);
        _this.nextPage = _this.nextPage.bind(_this);
        _this.prevPage = _this.prevPage.bind(_this);
        return _this;
    }

    _createClass(PageNavigation, [{
        key: "sortByLike",
        value: function sortByLike() {
            this.props.handleChangeSortBy("like");
        }
    }, {
        key: "sortByTime",
        value: function sortByTime() {
            this.props.handleChangeSortBy("time");
        }
    }, {
        key: "selectOption",
        value: function selectOption(e) {
            var value = (typeof e === "undefined" ? "undefined" : _typeof(e)) == "object" ? e.target.value : e;
            this.props.handleChangePageNumber(value);
        }
    }, {
        key: "nextPage",
        value: function nextPage() {
            if (this.props.currentPage < this.props.pageCount) {
                this.selectOption(parseInt(this.props.currentPage) + 1);
            }
        }
    }, {
        key: "prevPage",
        value: function prevPage() {
            if (this.props.currentPage > 1) {
                this.selectOption(parseInt(this.props.currentPage) - 1);
            }
        }
    }, {
        key: "render",
        value: function render() {
            this.options = [];
            for (var i = 1; i <= this.props.pageCount; i++) {
                this.options.push(React.createElement(
                    "option",
                    { key: i, value: i },
                    i
                ));
            }
            if (this.props.form == "noComment") {
                return React.createElement("div", null);
            } else {
                return React.createElement(
                    "div",
                    null,
                    React.createElement(
                        Row,
                        { size: "one" },
                        React.createElement(
                            Column,
                            null,
                            React.createElement(
                                "button",
                                { className: this.props.sortBy == "like" ? "ui blue icon button" : "ui icon button", onClick: this.sortByLike },
                                React.createElement(
                                    "i",
                                    { className: "icon" },
                                    React.createElement("i", { className: "fa fa-thumbs-up", "aria-hidden": "true" })
                                )
                            ),
                            React.createElement(
                                "button",
                                { className: this.props.sortBy == "time" ? "ui blue icon button" : "ui icon button", onClick: this.sortByTime },
                                React.createElement(
                                    "i",
                                    { className: "icon" },
                                    React.createElement("i", { className: "fa fa-clock-o", "aria-hidden": "true" })
                                )
                            ),
                            React.createElement(
                                FloatRight,
                                null,
                                React.createElement(
                                    "button",
                                    { className: "ui icon button", onClick: this.prevPage },
                                    React.createElement(
                                        "i",
                                        { className: "icon" },
                                        React.createElement("i", { className: "fa fa-angle-left", "aria-hidden": "true" })
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { className: "ui form" },
                                    React.createElement(
                                        "div",
                                        { className: "field" },
                                        React.createElement(
                                            "select",
                                            { onChange: this.selectOption, value: this.props.currentPage },
                                            this.options
                                        )
                                    )
                                ),
                                React.createElement(
                                    "button",
                                    { className: "ui icon button", style: { "marginLeft": "0.25em" }, onClick: this.nextPage },
                                    React.createElement(
                                        "i",
                                        { className: "icon" },
                                        React.createElement("i", { className: "fa fa-angle-right", "aria-hidden": "true" })
                                    )
                                )
                            )
                        )
                    )
                );
            }
        }
    }]);

    return PageNavigation;
}(React.Component);