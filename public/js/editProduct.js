var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditProduct = function (_React$Component) {
    _inherits(EditProduct, _React$Component);

    function EditProduct(props) {
        _classCallCheck(this, EditProduct);

        var _this = _possibleConstructorReturn(this, (EditProduct.__proto__ || Object.getPrototypeOf(EditProduct)).call(this, props));

        _this.state = {
            form: "loading", // normal, loading, notFound
            productID: null,
            productName: "",
            productSlug: "",
            tags: []
        };
        _this.loadProductInfo = _this.loadProductInfo.bind(_this);
        return _this;
    }

    _createClass(EditProduct, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            if (!isMember()) {
                this.props.changeContent('giris-yap', true);
            }
            this.loadProductInfo();
        }
    }, {
        key: "loadProductInfo",
        value: function loadProductInfo() {
            var _this2 = this;

            var pathNames = getPathNames();
            this.productSlug = pathNames[1];
            fetch(SITEURL + 'api/product?' + getUrlPar({
                productSlug: this.productSlug,
                type: "time",
                pageNumber: 1,
                onlyComment: false
            }), { method: 'GET' }).then(function (response) {
                if (!response.ok) throw new Error(response.status);else return response.json();
            }).then(function (json) {
                _this2.setState({
                    form: "normal",
                    productID: json.other.product.id,
                    productName: json.other.product.title,
                    productSlug: json.other.product.slug,
                    tags: normalizer('tags-for-product-changing-from-api', json.other.tags)
                });
            }).catch(function (error) {
                if (error.message == 404) {
                    _this2.setState({ form: "notFound" });
                }
            });
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.form == "loading") {
                return React.createElement(
                    Row,
                    { size: "one" },
                    React.createElement(
                        Column,
                        null,
                        React.createElement(RowLoadingSpin, { nonSegment: true })
                    )
                );
            } else if (this.state.form == "normal") {
                return React.createElement(
                    "div",
                    null,
                    React.createElement(
                        Row,
                        { size: "one" },
                        React.createElement(
                            Column,
                            null,
                            React.createElement(H, { type: "1", text: "\xDCr\xFCn D\xFCzenle", id: "newProductHeader", textAlign: "center" })
                        )
                    ),
                    React.createElement(
                        Row,
                        { size: "one" },
                        React.createElement(
                            Column,
                            null,
                            React.createElement(ProductEditor, {
                                changeContent: this.props.changeContent,
                                productName: this.state.productName,
                                productSlug: this.state.productName,
                                tags: this.state.tags,
                                editMode: true,
                                productID: this.state.productID
                            })
                        )
                    )
                );
            } else if (this.state.form == "notFound") {
                return React.createElement(ProductNotFound, { changeContent: this.props.changeContent });
            }
        }
    }]);

    return EditProduct;
}(React.Component);

var ProductNotFound = function (_React$Component2) {
    _inherits(ProductNotFound, _React$Component2);

    function ProductNotFound(props) {
        _classCallCheck(this, ProductNotFound);

        var _this3 = _possibleConstructorReturn(this, (ProductNotFound.__proto__ || Object.getPrototypeOf(ProductNotFound)).call(this, props));

        _this3.goNewProduct = _this3.goNewProduct.bind(_this3);
        return _this3;
    }

    _createClass(ProductNotFound, [{
        key: "goNewProduct",
        value: function goNewProduct(e) {
            e.preventDefault();
            this.props.changeContent('yeni-urun', true);
        }
    }, {
        key: "render",
        value: function render() {
            document.title = "Ürün Bulunamadı";
            return React.createElement(
                Row,
                { size: "one" },
                React.createElement(
                    Column,
                    null,
                    React.createElement(Message, { header: "404", message: "B\xF6yle bir \xFCr\xFCn yok", type: "yellow" }),
                    React.createElement(
                        Center,
                        null,
                        React.createElement(
                            "a",
                            { href: "yeni-urun", onClick: this.goNewProduct },
                            "Yeni Bir \xDCr\xFCn Olu\u015Ftur"
                        )
                    )
                )
            );
        }
    }]);

    return ProductNotFound;
}(React.Component);