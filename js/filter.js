var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Filter = function (_React$Component) {
    _inherits(Filter, _React$Component);

    function Filter(props) {
        _classCallCheck(this, Filter);

        return _possibleConstructorReturn(this, (Filter.__proto__ || Object.getPrototypeOf(Filter)).call(this, props));
    }

    _createClass(Filter, [{
        key: "render",
        value: function render() {
            document.title = "Filtrele";
            return React.createElement(
                "div",
                null,
                React.createElement(
                    Row,
                    { size: "sixteen" },
                    React.createElement(WideColumn, { size: "two" }),
                    React.createElement(
                        WideColumn,
                        { size: "twelve" },
                        React.createElement(H, { type: "1", text: "Filtrele" }),
                        React.createElement(TagPicker, null)
                    )
                )
            );
        }
    }]);

    return Filter;
}(React.Component);

var ProductList = function (_React$Component2) {
    _inherits(ProductList, _React$Component2);

    function ProductList(props) {
        _classCallCheck(this, ProductList);

        var _this2 = _possibleConstructorReturn(this, (ProductList.__proto__ || Object.getPrototypeOf(ProductList)).call(this, props));

        _this2.state = {
            form: "normal" // normal, loading, notFound
        };
        _this2.prepareProductListItems = _this2.prepareProductListItems.bind(_this2);
        return _this2;
    }

    _createClass(ProductList, [{
        key: "prepareProductListItems",
        value: function prepareProductListItems() {
            this.items = [];
            var product = this.props.product;
            var productKeys = Object.keys(product);
            var count = productKeys.length;
            for (var i = 0; i < count; i++) {
                this.items.push(React.createElement(ProductListItem, { key: productKeys[i], productTitle: product[i].title, tags: product[i].tags }));
            }
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.form == "normal") {
                this.prepareProductListItems();
                return React.createElement(
                    "div",
                    null,
                    React.createElement(
                        Row,
                        { size: "one" },
                        React.createElement(
                            Column,
                            null,
                            React.createElement(H, { type: "2", text: "\xDCr\xFCnler" }),
                            this.items
                        )
                    )
                );
            } else if (this.state.form == "loading") {
                return React.createElement(
                    "div",
                    null,
                    React.createElement(RowLoadingSpin, { nonSegment: true })
                );
            } else if (this.state.form == "notFound") {
                return React.createElement(
                    "div",
                    { className: "notFoundInProductList" },
                    React.createElement(H, { type: "3", text: "Arad\u0131\u011F\u0131n\u0131z kriterde \xFCr\xFCn yok", textAlign: "center" })
                );
            }
        }
    }]);

    return ProductList;
}(React.Component);

var ProductListItem = function (_React$Component3) {
    _inherits(ProductListItem, _React$Component3);

    function ProductListItem(props) {
        _classCallCheck(this, ProductListItem);

        return _possibleConstructorReturn(this, (ProductListItem.__proto__ || Object.getPrototypeOf(ProductListItem)).call(this, props));
    }

    _createClass(ProductListItem, [{
        key: "render",
        value: function render() {
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
                            RaisedSegment,
                            null,
                            React.createElement(
                                Row,
                                { size: "one" },
                                React.createElement(
                                    Column,
                                    null,
                                    React.createElement(H, { type: "3", optional: "productListItemHeader", text: this.props.productTitle })
                                )
                            ),
                            React.createElement(
                                Row,
                                { size: "one" },
                                React.createElement(
                                    Column,
                                    null,
                                    React.createElement(Tags, { tags: this.props.tags, activeOnly: false, handleOnClick: null })
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return ProductListItem;
}(React.Component);