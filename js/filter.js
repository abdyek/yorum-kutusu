var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Filter = function (_React$Component) {
    _inherits(Filter, _React$Component);

    function Filter(props) {
        _classCallCheck(this, Filter);

        var _this = _possibleConstructorReturn(this, (Filter.__proto__ || Object.getPrototypeOf(Filter)).call(this, props));

        _this.state = {
            loading: firstLoading,
            selectedTags: {},
            product: {}
        };
        _this.changeLoading = _this.changeLoading.bind(_this);
        return _this;
    }

    _createClass(Filter, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (firstLoading) {
                this.load();
            }
        }
    }, {
        key: 'changeLoading',
        value: function changeLoading(trueOrFalse) {
            this.setState({
                loading: trueOrFalse
            });
        }
    }, {
        key: 'load',
        value: function load() {
            var _this2 = this;

            $.ajax({
                method: 'GET',
                url: 'http://localhost/yorum-kutusu/api/endpoints/example.php',
                data: {
                    'veri': "veri" // şimdilik yaptım
                },
                success: function success(response) {
                    _this2.setState({
                        'loading': false,
                        'selectedTags': response['selectedTags']
                    });
                }
            });
            this.slugs = getSlugs("filtrele");
            console.log(this.slugs);
            // yüklenecek olası ürün
            // ^ buradaki slug'lardan ürün ve etiket bilgisi döndüren endpoint'e istek atacaksın, gelen değerlerle state'i güncelleyeceksin
            /*
            // genel yapısını görmek için bırakıyorum bu kısım sonradan silinecek
            this.product = {
                0:{
                    title:"Mahmut Efendi Kahveleri",
                    slug:"mahmut-efendi-kahveleri",
                    tags: {
                        0:{
                            passive:true,
                            text:"Akıllı Telefon",
                            slug:"akilli-telefon"
                        },
                        1:{
                            passive:true,
                            text:"Apple",
                            slug:"apple"
                        },
                        2:{
                            passive:true,
                            text:"IPhone",
                            slug:"iphone"
                        },
                        3:{
                            passive:false,
                            text:"Batarya",
                            color:"yellow",
                            rateValue: "5.5",
                            slug:"batarya"
                        },
                        4:{
                            passive:false,
                            text:"Kamera",
                            color:"orange",
                            rateValue: "4.2",
                            slug:"kamera"
                        },
                        5:{
                            passive:false,
                            text:"Ekran",
                            color:"green",
                            rateValue: "9.3",
                            slug:"ekran"
                        }
                    }
                },
                1:{
                    title:"IPhone 5s",
                    slug:"iphone-5s",
                    tags: {
                        0:{
                            passive:true,
                            text:"Akıllı Telefon",
                            slug:"akilli-telefon"
                        },
                        3:{
                            passive:false,
                            text:"Batarya",
                            color:"yellow",
                            rateValue: "5.5",
                            slug:"batarya"
                        },
                        4:{
                            passive:false,
                            text:"Kamera",
                            color:"orange",
                            rateValue: "4.2",
                            slug:"kamera"
                        },
                        5:{
                            passive:false,
                            text:"Ekran",
                            color:"green",
                            rateValue: "9.3",
                            slug:"ekran"
                        }
                    }
                },
            }
            this.selectedTags = {
                3:{
                    passive:false,
                    text:"Batarya",
                    color:"yellow",
                    rateValue: "-",
                    slug:"batarya"
                },
                4:{
                    passive:false,
                    text:"Kamera",
                    color:"orange",
                    rateValue: "-",
                    slug:"kamera"
                },
            }
            */
        }
    }, {
        key: 'render',
        value: function render() {
            document.title = "Filtrele";
            if (this.state.loading) {
                return React.createElement(RowLoadingSpin, { nonSegment: true });
            } else {
                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        Row,
                        { size: 'sixteen' },
                        React.createElement(WideColumn, { size: 'two' }),
                        React.createElement(
                            WideColumn,
                            { size: 'twelve' },
                            React.createElement(H, { type: '1', text: 'Filtrele' }),
                            React.createElement(TagPicker, { changeContent: this.props.changeContent, product: this.state.product, selectedTags: this.state.selectedTags, filterChangeLoading: this.changeLoading })
                        )
                    )
                );
            }
        }
    }]);

    return Filter;
}(React.Component);

var ProductList = function (_React$Component2) {
    _inherits(ProductList, _React$Component2);

    function ProductList(props) {
        _classCallCheck(this, ProductList);

        var _this3 = _possibleConstructorReturn(this, (ProductList.__proto__ || Object.getPrototypeOf(ProductList)).call(this, props));

        _this3.state = {
            form: firstLoading ? "normal" : "loading" // normal, loading, notFound
        };
        _this3.prepareProductListItems = _this3.prepareProductListItems.bind(_this3);
        return _this3;
    }

    _createClass(ProductList, [{
        key: 'prepareProductListItems',
        value: function prepareProductListItems() {
            this.items = [];
            var product = this.props.product;
            var productKeys = Object.keys(product);
            var count = productKeys.length;
            for (var i = 0; i < count; i++) {
                this.items.push(React.createElement(ProductListItem, { key: productKeys[i], productTitle: product[i].title, productSlug: product[i].slug, tags: product[i].tags, changeContent: this.props.changeContent }));
            }
            if (this.items.length == 0) {
                this.setState({
                    form: "notFound"
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.state.form == "normal") {
                this.prepareProductListItems();
                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        Row,
                        { size: 'one' },
                        React.createElement(
                            Column,
                            null,
                            React.createElement(H, { type: '2', text: '\xDCr\xFCnler' }),
                            this.items
                        )
                    )
                );
            } else if (this.state.form == "loading") {
                return React.createElement(
                    'div',
                    null,
                    React.createElement(RowLoadingSpin, { nonSegment: true })
                );
            } else if (this.state.form == "notFound") {
                return React.createElement(
                    'div',
                    { className: 'notFoundInProductList' },
                    React.createElement(H, { type: '3', text: 'Arad\u0131\u011F\u0131n\u0131z kriterde \xFCr\xFCn yok', textAlign: 'center' })
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
        key: 'render',
        value: function render() {
            var _this5 = this;

            return React.createElement(
                'div',
                null,
                React.createElement(
                    Row,
                    { size: 'one' },
                    React.createElement(
                        Column,
                        null,
                        React.createElement(
                            RaisedSegment,
                            null,
                            React.createElement(
                                Row,
                                { size: 'one' },
                                React.createElement(
                                    Column,
                                    null,
                                    React.createElement(H, { type: '3', optional: 'productListItemHeader', text: this.props.productTitle, href: "urun/" + this.props.productSlug, handleOnClick: function handleOnClick(e) {
                                            e.preventDefault();_this5.props.changeContent(e.target.href);
                                        } })
                                )
                            ),
                            React.createElement(
                                Row,
                                { size: 'one' },
                                React.createElement(
                                    Column,
                                    null,
                                    React.createElement(Tags, { tags: this.props.tags, activeOnly: false, handleOnClick: this.props.changeContent })
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