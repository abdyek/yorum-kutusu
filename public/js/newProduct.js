var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NewProduct = function (_React$Component) {
    _inherits(NewProduct, _React$Component);

    function NewProduct(props) {
        _classCallCheck(this, NewProduct);

        var _this = _possibleConstructorReturn(this, (NewProduct.__proto__ || Object.getPrototypeOf(NewProduct)).call(this, props));

        _this.state = {
            bottomCommentForm: "normal",
            form: "input", // input, showInfo, loading
            topMessage: null,
            productName: "",
            productUrl: "",
            tagSearchInput: "",
            tagsInList: {
                /*
                3:{
                    passive:false,
                    text:"Batarya",
                    color:"yellow",
                    rateValue: "-"
                },
                4:{
                    passive:false,
                    text:"Kamera",
                    color:"orange",
                    rateValue: "-"
                },
                5:{
                    passive:false,
                    text:"Tasarım",
                    color:"",
                    rateValue: "-"
                },
                99:{
                    passive:true,
                    text:"Pasif Etiket",
                    color:"",
                    rateValue: "-"
                }
                */
            },
            selectedTags: {},
            newTagIndex: 0,
            createProductButtonName: "Oluştur"
        };
        _this.turkishChars = {
            "ğ": "g",
            "ü": "u",
            "ş": "s",
            "ı": "i",
            "ö": "o",
            "ç": "c"
        };
        _this.onChangeProductName = _this.onChangeProductName.bind(_this);
        _this.generateProductUrl = _this.generateProductUrl.bind(_this);
        _this.onChangeTagSearchInput = _this.onChangeTagSearchInput.bind(_this);
        _this.selectTag = _this.selectTag.bind(_this);
        _this.unselectTag = _this.unselectTag.bind(_this);
        _this.refreshTagsInList = _this.refreshTagsInList.bind(_this);
        _this.createProduct = _this.createProduct.bind(_this);
        return _this;
    }

    _createClass(NewProduct, [{
        key: "onChangeProductName",
        value: function onChangeProductName(e) {
            this.setState({
                productName: e.target.value,
                productUrl: this.generateProductUrl(e.target.value)
            });
            this.refreshTagsInList();
        }
    }, {
        key: "generateProductUrl",
        value: function generateProductUrl(productName) {
            productName = productName.toLowerCase();
            var url = "";
            for (var i = 0; i < productName.length; i++) {
                if (productName[i] == " ") {
                    url += "-";
                } else if (this.turkishChars[productName[i]]) {
                    url += this.turkishChars[productName[i]];
                } else {
                    url += productName[i];
                }
            }
            return url;
        }
    }, {
        key: "onChangeTagSearchInput",
        value: function onChangeTagSearchInput(e) {
            this.setState({
                tagSearchInput: e.target.value
            });
        }
    }, {
        key: "selectTag",
        value: function selectTag(id) {
            var selectedTag = this.state.selectedTags;
            if (id == "new") {
                var newTagName = this.state.tagSearchInput;
                var newTag = {
                    passive: false,
                    text: newTagName,
                    color: "",
                    rateValue: "?"
                };
                selectedTag[newTagName] = newTag;
            } else {
                selectedTag[id] = this.state.tagsInList[id];
            }
            this.setState({
                selectedTags: selectedTag,
                tagSearchInput: ""
            });
        }
    }, {
        key: "unselectTag",
        value: function unselectTag(e) {
            if (this.state.form == "input") {
                var selectedTag = this.state.selectedTags;
                delete selectedTag[e.target.attributes.name.value];
                this.setState({
                    selectedTags: selectedTag
                });
            }
        }
    }, {
        key: "refreshTagsInList",
        value: function refreshTagsInList() {
            // gidip etiket çekecek gelen veriyi tagsInList olarak güncelleyeceksin böylelikle tag listesi değişmiş olacak
        }
    }, {
        key: "createProduct",
        value: function createProduct() {
            if (this.state.form == "input") {
                this.setState({
                    form: "showInfo",
                    createProductButtonName: "Düzenle",
                    topMessage: {
                        type: "success",
                        text: "Başarılı bir şekilde gönderildi, yönetici onaylaması durumunda bu ürün eklenecek"
                    }
                });
            } else {
                this.setState({
                    form: "input",
                    createProductButtonName: "Oluştur"
                });
            }
        }
    }, {
        key: "render",
        value: function render() {
            document.title = "Yeni Ürün Oluştur";
            if (this.state.form == "loading") {
                return React.createElement(RowLoadingSpin, { nonSegment: true });
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
                                Row,
                                { size: "sixteen" },
                                React.createElement(WideColumn, { size: "two" }),
                                React.createElement(
                                    WideColumn,
                                    { size: "twelve" },
                                    this.state.topMessage ? React.createElement(BasicMessage, { type: this.state.topMessage.type, text: this.state.topMessage.text }) : "",
                                    React.createElement(H, { type: "1", text: "Yeni \xDCr\xFCn" }),
                                    React.createElement(
                                        "div",
                                        { className: "ui form" },
                                        React.createElement(
                                            "div",
                                            { className: "field" },
                                            React.createElement(
                                                "label",
                                                null,
                                                "yorumkutusu.com/urun/",
                                                this.state.productUrl
                                            ),
                                            this.state.form == "input" ? React.createElement("input", { type: "text", placeholder: "\xDCr\xFCn \u0130smi", onChange: this.onChangeProductName, value: this.state.productName }) : React.createElement(H, { type: "3", text: this.state.productName })
                                        )
                                    ),
                                    React.createElement(SelectedTags, { tags: this.state.selectedTags, handleOnClick: this.unselectTag, form: this.state.form }),
                                    this.state.form == "input" ? React.createElement(TagList, { labelText: "Etiket Ekle", placeholderText: "Etiket \u0130smi", tags: this.state.tagsInList, handleSelectTag: this.selectTag, tagSearchInput: this.state.tagSearchInput, handleChangeTagSearchInput: this.onChangeTagSearchInput }) : ""
                                )
                            )
                        )
                    ),
                    React.createElement(
                        Row,
                        { size: "sixteen" },
                        React.createElement(
                            WideColumn,
                            { size: "two" },
                            " "
                        ),
                        React.createElement(
                            WideColumn,
                            { size: "twelve" },
                            React.createElement(
                                FloatRight,
                                null,
                                React.createElement(
                                    "button",
                                    { "class": this.state.productName.length ? "ui green button" : "ui green disabled button", onClick: this.createProduct },
                                    this.state.createProductButtonName
                                )
                            )
                        )
                    )
                );
            }
        }
    }]);

    return NewProduct;
}(React.Component);

var SelectedTags = function (_React$Component2) {
    _inherits(SelectedTags, _React$Component2);

    function SelectedTags() {
        _classCallCheck(this, SelectedTags);

        return _possibleConstructorReturn(this, (SelectedTags.__proto__ || Object.getPrototypeOf(SelectedTags)).apply(this, arguments));
    }

    _createClass(SelectedTags, [{
        key: "render",
        value: function render() {
            if (Object.keys(this.props.tags).length) {
                return React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "div",
                        { id: "selected-tags" },
                        this.props.form == "input" ? React.createElement(H, { type: "3", text: "Etiketler" }) : ""
                    ),
                    React.createElement(Tags, { tags: this.props.tags, activeOnly: false, handleOnClick: this.props.handleOnClick, noParameter: true }),
                    this.props.form == "input" ? React.createElement(
                        "span",
                        { className: "info-span" },
                        "[se\xE7imi iptal etmek i\xE7in etikete dokunun]"
                    ) : ""
                );
            } else {
                return React.createElement("div", null);
            }
        }
    }]);

    return SelectedTags;
}(React.Component);

var TagList = function (_React$Component3) {
    _inherits(TagList, _React$Component3);

    function TagList(props) {
        _classCallCheck(this, TagList);

        var _this3 = _possibleConstructorReturn(this, (TagList.__proto__ || Object.getPrototypeOf(TagList)).call(this, props));

        _this3.state = {
            tableVisible: false
        };
        _this3.onFocusInput = _this3.onFocusInput.bind(_this3);
        _this3.onBlurInput = _this3.onBlurInput.bind(_this3);
        _this3.selectTag = _this3.selectTag.bind(_this3);
        _this3.onChangeInput = _this3.onChangeInput.bind(_this3);
        return _this3;
    }

    _createClass(TagList, [{
        key: "onFocusInput",
        value: function onFocusInput() {
            this.setState({
                tableVisible: true
            });
        }
    }, {
        key: "onBlurInput",
        value: function onBlurInput() {
            setTimeout(function () {
                this.setState({
                    tableVisible: false
                });
            }.bind(this), 30);
            // bu delay'i blur olurken etiket seçimini geçmemesi için koydum
        }
    }, {
        key: "selectTag",
        value: function selectTag(e) {
            this.props.handleSelectTag(e.target.attributes.name.value);
            this.onBlurInput();
        }
    }, {
        key: "onChangeInput",
        value: function onChangeInput(e) {
            this.props.handleChangeTagSearchInput(e);
        }
    }, {
        key: "render",
        value: function render() {
            this.tags = [];
            var keyArr = Object.keys(this.props.tags);
            for (var i = 0; i < keyArr.length; i++) {
                this.tags.push(React.createElement(
                    "div",
                    { className: "item", key: keyArr[i], name: keyArr[i], onMouseDown: this.selectTag },
                    this.props.tags[keyArr[i]].text
                ));
            }
            if (this.tags.length == 0 && this.props.tagSearchInput.length != 0) {
                this.tags = React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "span",
                        null,
                        "B\xF6yle bir etiket yok "
                    ),
                    React.createElement(
                        "a",
                        { name: "new", onMouseDown: this.selectTag },
                        "yine de ekle"
                    )
                );
            }
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    { className: "ui form" },
                    React.createElement(
                        "div",
                        { className: "field" },
                        React.createElement(
                            "label",
                            null,
                            this.props.labelText
                        ),
                        React.createElement("input", { type: "text", placeholder: this.props.placeholderText, onFocus: this.onFocusInput, onBlur: this.onBlurInput, value: this.props.tagSearchInput, onChange: this.onChangeInput })
                    )
                ),
                this.state.tableVisible ? React.createElement(
                    "div",
                    { className: "tags-in-list" },
                    React.createElement(
                        "div",
                        { className: "ui list" },
                        this.tags
                    )
                ) : ""
            );
        }
    }]);

    return TagList;
}(React.Component);