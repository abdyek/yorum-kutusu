var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TagPicker = function (_React$Component) {
    _inherits(TagPicker, _React$Component);

    // newProduct'ın içindeki yapı tagPicker'a benziyor ancak değil. Onu daha önceden yazmıştım bu sebeple daha karışık.
    function TagPicker(props) {
        _classCallCheck(this, TagPicker);

        var _this = _possibleConstructorReturn(this, (TagPicker.__proto__ || Object.getPrototypeOf(TagPicker)).call(this, props));

        _this.items;
        _this.state = {
            tags: {/*
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
                   5:{
                     passive:false,
                     text:"Tasarım",
                     color:"",
                     rateValue: "-",
                     slug:"tasarim"
                   },
                   99:{
                     passive:true,
                     text:"Pasif Etiket",
                     color:"",
                     rateValue: "-",
                     slug:"pasif-etiket"
                   }*/
            },
            selectedTags: _this.props.selectedTags,
            searchInput: "",
            typing: false,
            typingTimeout: 0,
            showItems: false,
            product: _this.props.product
        };
        _this.refreshTags = _this.refreshTags.bind(_this);
        _this.refreshProduct = _this.refreshProduct.bind(_this);
        _this.deleteTag = _this.deleteTag.bind(_this);
        _this.onFocusInput = _this.onFocusInput.bind(_this);
        _this.onBlurInput = _this.onBlurInput.bind(_this);
        _this.changeInput = _this.changeInput.bind(_this);
        _this.selectTag = _this.selectTag.bind(_this);
        _this.prepareItems = _this.prepareItems.bind(_this);
        return _this;
    }

    _createClass(TagPicker, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            if (firstLoading == false) {
                this.slugs = getSlugs("filtrele");
                console.log(this.slugs);
                // eğer linkteki slug etiketleri varsa onları state içindeki selectedTags'a ekliyoruz burada. sonrasında da ürün yenileme isteği çekiyoruz
                this.props.filterChangeLoading(true);
                // bu kontrol esnasında kullanıcıya loading ekranını gösteriyoruz
                this.refreshProduct();
            }
        }
    }, {
        key: "refreshTags",
        value: function refreshTags() {
            console.log("etiket yenileme isteği buraya");
        }
    }, {
        key: "refreshProduct",
        value: function refreshProduct() {
            console.log("ürün yenileme isteği buraya");
        }
    }, {
        key: "deleteTag",
        value: function deleteTag(e) {
            var selectedTags = this.state.selectedTags;
            delete selectedTags[e.target.attributes.name.value];
            this.setState({
                'selectedTags': selectedTags
            });
            this.refreshProduct();
        }
    }, {
        key: "onFocusInput",
        value: function onFocusInput() {
            this.setState({
                "showItems": true
            });
        }
    }, {
        key: "onBlurInput",
        value: function onBlurInput() {
            this.setState({
                "showItems": false
            });
        }
    }, {
        key: "changeInput",
        value: function changeInput(e) {
            if (this.state.typingTimeout) {
                clearTimeout(this.state.typingTimeout);
            }
            this.setState({
                searchInput: e.target.value,
                typing: false,
                typingTimeout: setTimeout(function () {
                    this.refreshTags();
                }.bind(this), 500)
            });
        }
    }, {
        key: "selectTag",
        value: function selectTag(e) {
            //console.log(e.target.attributes.name.value);
            var value = e.target.attributes.name.value;
            var selectedTags = this.state.selectedTags;
            selectedTags[value] = this.state.tags[value];
            this.setState({
                selectedTags: selectedTags
            });
            this.refreshProduct();
        }
    }, {
        key: "prepareItems",
        value: function prepareItems() {
            if (this.state.showItems) {
                this.items = [];
                var keyArr = Object.keys(this.state.tags);
                for (var i = 0; i < keyArr.length; i++) {
                    this.items.push(React.createElement(
                        "div",
                        { className: "item", key: keyArr[i], name: keyArr[i], onMouseDown: this.selectTag },
                        this.state.tags[keyArr[i]].text
                    ));
                }
            } else {
                this.items = [];
            }
        }
    }, {
        key: "render",
        value: function render() {
            this.prepareItems();
            var headerText = Object.keys(this.state.selectedTags).length ? "Etiket" : "[Etiket Seçilmedi]";
            var infoSpan = Object.keys(this.state.selectedTags).length ? React.createElement(
                "span",
                { className: "info-span" },
                "[se\xE7imi iptal etmek i\xE7in etikete dokunun]"
            ) : "";
            return React.createElement(
                "div",
                null,
                React.createElement(
                    Row,
                    { size: "one" },
                    React.createElement(
                        Column,
                        null,
                        React.createElement(H, { type: "4", text: headerText }),
                        React.createElement(Tags, { tags: this.state.selectedTags, activeOnly: false, handleOnClick: this.deleteTag, noParameter: true }),
                        infoSpan,
                        React.createElement(
                            "div",
                            { className: "ui form" },
                            React.createElement(
                                "div",
                                { className: "field" },
                                React.createElement(
                                    "label",
                                    null,
                                    "Etiket Ekle"
                                ),
                                React.createElement("input", { type: "text", placeholder: "Etiket İsmi", onFocus: this.onFocusInput, onBlur: this.onBlurInput, value: this.state.searchInput, onChange: this.changeInput })
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "tags-in-list" },
                            React.createElement(
                                "div",
                                { className: "ui list" },
                                this.items
                            )
                        )
                    )
                ),
                React.createElement(ProductList, { product: this.state.product, changeContent: this.props.changeContent })
            );
        }
    }]);

    return TagPicker;
}(React.Component);

var Tag = function (_React$Component2) {
    _inherits(Tag, _React$Component2);

    function Tag(props) {
        _classCallCheck(this, Tag);

        var _this2 = _possibleConstructorReturn(this, (Tag.__proto__ || Object.getPrototypeOf(Tag)).call(this, props));

        _this2.handleOnClick = _this2.handleOnClick.bind(_this2);
        return _this2;
    }

    _createClass(Tag, [{
        key: "handleOnClick",
        value: function handleOnClick(e) {
            e.preventDefault();
            /* if(this.props.noParameter) {
                this.props.handleOnClick(e);
            } else {
                this.props.handleOnClick(e.target.href,e);
            } */
        }
    }, {
        key: "render",
        value: function render() {
            if (this.props.passive) {
                return React.createElement(
                    "a",
                    { href: this.props.slug, className: "ui large label tag-abdyek", onClick: this.handleOnClick },
                    this.props.text
                );
            }
            return React.createElement(
                "a",
                { href: this.props.slug, name: this.props.id, className: "ui " + this.props.color + " large label tag-abdyek", onClick: this.handleOnClick },
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

var Tags = function (_React$Component3) {
    _inherits(Tags, _React$Component3);

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
                    id: keyArr[i] // Tag'ın içerisinde this.props.key olarak erişmeye izin vermediği için bu şekilde göndermem gerekti
                    , passive: this.props.tags[keyArr[i]].passive,
                    text: this.props.tags[keyArr[i]].text,
                    color: this.props.tags[keyArr[i]].color,
                    rateValue: this.props.tags[keyArr[i]].rateValue,
                    handleOnClick: this.props.handleOnClick,
                    slug: "filtrele/" + this.props.tags[keyArr[i]].slug,
                    noParameter: this.props.noParameter
                }));
            }
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    { "class": "tags" },
                    this.tags
                )
            );
        }
    }]);

    return Tags;
}(React.Component);