var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NewProduct = function (_React$Component) {
    _inherits(NewProduct, _React$Component);

    function NewProduct() {
        _classCallCheck(this, NewProduct);

        return _possibleConstructorReturn(this, (NewProduct.__proto__ || Object.getPrototypeOf(NewProduct)).apply(this, arguments));
    }

    _createClass(NewProduct, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(ProductEditor, { changeContent: this.props.changeContent })
            );
        }
    }]);

    return NewProduct;
}(React.Component);

var ProductEditor = function (_React$Component2) {
    _inherits(ProductEditor, _React$Component2);

    function ProductEditor(props) {
        _classCallCheck(this, ProductEditor);

        var _this2 = _possibleConstructorReturn(this, (ProductEditor.__proto__ || Object.getPrototypeOf(ProductEditor)).call(this, props));

        _this2.state = {
            form: "normal", // normal, created
            productName: "",
            productSlug: "",
            productInputLoading: "",
            productAvailable: false,
            emptyProductNameWarn: false,
            tags: [/*
                   {
                     id:1,
                     slug: "ekran",
                     name: "Ekran",
                     passive: false
                   },
                   {
                     id:2,
                     slug: "batarya",
                     name: "Batarya",
                     passive: false
                   },
                   {
                     id:3,
                     slug: "motorola",
                     name: "Motorola",
                     passive: true
                   },*/
            ]
        };
        _this2.updateProductName = _this2.updateProductName.bind(_this2);
        _this2.setProductInputLoading = _this2.setProductInputLoading.bind(_this2);
        _this2.loadInfo = _this2.loadInfo.bind(_this2);
        _this2.clickSearchResult = _this2.clickSearchResult.bind(_this2);
        _this2.goProduct = _this2.goProduct.bind(_this2);
        _this2.addTag = _this2.addTag.bind(_this2);
        _this2.addNewTag = _this2.addNewTag.bind(_this2);
        _this2.sortTags = _this2.sortTags.bind(_this2);
        _this2.closeTag = _this2.closeTag.bind(_this2);
        _this2.createProduct = _this2.createProduct.bind(_this2);
        return _this2;
    }

    _createClass(ProductEditor, [{
        key: "updateProductName",
        value: function updateProductName(e) {
            this.setState({
                productName: e.target.value,
                productSlug: generateProductSlug(e.target.value)
            });
            clearTimeout(this.setTime);
            if (e.target.value.length) {
                this.setTime = setTimeout(function () {
                    this.setProductInputLoading(true);
                    this.loadInfo();
                }.bind(this), 1000);
            }
        }
    }, {
        key: "setProductInputLoading",
        value: function setProductInputLoading(value) {
            var str = value ? "loading" : "";
            this.setState({
                productInputLoading: str
            });
        }
    }, {
        key: "loadInfo",
        value: function loadInfo() {
            var _this3 = this;

            fetch(SITEURL + 'api/newProductChecker?' + getUrlPar({
                'productName': this.state.productName
            }), { method: 'GET' }).then(function (response) {
                if (!response.ok) throw new Error(response.status);else return response.json();
            }).then(function (json) {
                var available = void 0;
                if (json.available) {
                    available = true;
                } else {
                    available = false;
                }
                _this3.setState({
                    productAvailable: available,
                    productSlug: json.slug,
                    productInputLoading: ""
                });
            }).catch(function (error) {
                if (error.message == 404) {}
            });
        }
    }, {
        key: "goProduct",
        value: function goProduct() {
            this.props.changeContent(SITEURL + "urun/" + this.state.productSlug);
        }
    }, {
        key: "clickSearchResult",
        value: function clickSearchResult(obj) {
            this.addTag(obj);
        }
    }, {
        key: "addTag",
        value: function addTag(obj) {
            var tags = [].concat(_toConsumableArray(this.state.tags));
            for (var i = 0; i < tags.length; i++) {
                if (obj.id == tags[i].id) return;
            }
            tags.push({
                id: obj.id,
                slug: obj.slug,
                name: obj.name,
                passive: obj.passive,
                newTag: obj.newTag == undefined ? false : true
            });
            this.setState({
                tags: this.sortTags(tags)
            });
        }
    }, {
        key: "addNewTag",
        value: function addNewTag(name, index) {
            this.addTag({
                id: "n" + index,
                slug: generateProductSlug(name),
                name: name,
                newTag: true
            });
        }
    }, {
        key: "sortTags",
        value: function sortTags(tags) {
            var sortedTags = [];
            for (var type = 0; type < 3; type++) {
                for (var i = 0; i < tags.length; i++) {
                    if (type == 0) {
                        if (tags[i].passive == true) {
                            sortedTags.push(tags[i]);
                        }
                    } else if (type == 1) {
                        if (tags[i].passive == false) {
                            sortedTags.push(tags[i]);
                        }
                    } else if (type == 2) {
                        if (tags[i].passive == undefined) {
                            sortedTags.push(tags[i]);
                        }
                    }
                }
            }
            return sortedTags;
        }
    }, {
        key: "closeTag",
        value: function closeTag(id) {
            var tags = this.state.tags.filter(function (tag) {
                if (tag.id != id) return tag;
            });
            this.setState({
                tags: tags
            });
        }
    }, {
        key: "createProduct",
        value: function createProduct() {
            if (this.state.productName.length == 0) {
                this.setState({
                    emptyProductNameWarn: true
                });
                return;
            }
            this.setState({
                form: "loading"
            });
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.form == "normal") {
                return React.createElement(
                    "div",
                    null,
                    React.createElement(
                        Row,
                        { size: "sixteen" },
                        React.createElement(WideColumn, { size: "one" }),
                        React.createElement(
                            WideColumn,
                            { size: "fourteen" },
                            React.createElement(
                                Row,
                                { size: "one" },
                                React.createElement(
                                    Column,
                                    null,
                                    React.createElement(H, { type: "1", text: "Yeni \xDCr\xFCn", id: "newProductHeader", textAlign: "center" })
                                )
                            ),
                            React.createElement(
                                Row,
                                { size: "one" },
                                React.createElement(
                                    Column,
                                    null,
                                    React.createElement(
                                        "h3",
                                        { className: "hStandart" },
                                        "\xDCr\xFCn Ad\u0131"
                                    ),
                                    React.createElement(
                                        "div",
                                        { className: "ui form " + this.state.productInputLoading + " newProductForm" },
                                        React.createElement(
                                            "div",
                                            { className: "field" },
                                            React.createElement(
                                                "label",
                                                { id: "productSlugLabel" },
                                                "urun/",
                                                this.state.productSlug
                                            ),
                                            React.createElement("input", { type: "text", onChange: this.updateProductName, value: this.state.productName, placeholder: "\xDCr\xFCn \u0130simi" })
                                        )
                                    )
                                )
                            ),
                            this.state.productAvailable ? React.createElement(
                                "div",
                                null,
                                React.createElement(
                                    Row,
                                    { size: "one" },
                                    React.createElement(
                                        Column,
                                        null,
                                        React.createElement(BasicMessageWithColor, { color: "yellow", message: "Bu \xFCr\xFCn mevcut" })
                                    )
                                ),
                                React.createElement(
                                    Row,
                                    { size: "one" },
                                    React.createElement(
                                        Column,
                                        null,
                                        React.createElement(
                                            Center,
                                            null,
                                            React.createElement(Button, { type: "huge green", name: "\xDCr\xFCn Sayfas\u0131na Git", click: this.goProduct })
                                        )
                                    )
                                )
                            ) : React.createElement(
                                "div",
                                null,
                                React.createElement(
                                    Row,
                                    { size: "one" },
                                    React.createElement(
                                        Column,
                                        null,
                                        React.createElement(
                                            "h1",
                                            { id: "newProductPreviewHeader" },
                                            " ",
                                            this.state.productName,
                                            " "
                                        )
                                    )
                                ),
                                React.createElement(TagSelector, {
                                    tags: this.state.tags,
                                    closeFunc: this.closeTag,
                                    tagSearchInput: this.state.tagSearchInput,
                                    clickSearchResult: this.clickSearchResult,
                                    addNewTag: this.addNewTag
                                }),
                                this.state.emptyProductNameWarn ? React.createElement(
                                    "div",
                                    null,
                                    React.createElement(
                                        Row,
                                        null,
                                        React.createElement(
                                            Column,
                                            null,
                                            React.createElement(BasicMessageWithColor, { color: "yellow", message: "İsimsiz ürün oluşturamazsınız!" })
                                        )
                                    )
                                ) : "",
                                React.createElement(
                                    Row,
                                    { size: "one" },
                                    React.createElement(
                                        Column,
                                        null,
                                        React.createElement(
                                            FloatRight,
                                            null,
                                            React.createElement(Button, { type: "large green", name: "Olu\u015Ftur", click: this.createProduct })
                                        )
                                    )
                                )
                            )
                        ),
                        React.createElement(WideColumn, { size: "/one" })
                    )
                );
            } else if (this.state.form == "created") {
                return React.createElement(
                    Row,
                    { size: "sixteen" },
                    React.createElement(WideColumn, { size: "one" }),
                    React.createElement(
                        WideColumn,
                        { size: "fourteen" },
                        React.createElement(Message, { header: "Te\u015Fekk\xFCrler", message: "Ba\u015Far\u0131l\u0131 bir \u015Fekilde g\xF6nderildi. Y\xF6netici onay\u0131s\u0131ndan sonra \xFCr\xFCne yorum ekleyebilirsiniz" })
                    ),
                    React.createElement(WideColumn, { size: "one" })
                );
            } else if (this.state.form == "loading") {
                return React.createElement(
                    Row,
                    { size: "one" },
                    React.createElement(
                        Column,
                        null,
                        React.createElement(RowLoadingSpin, { nonSegment: true })
                    )
                );
            }
        }
    }]);

    return ProductEditor;
}(React.Component);

var TagSelector = function (_React$Component3) {
    _inherits(TagSelector, _React$Component3);

    function TagSelector(props) {
        _classCallCheck(this, TagSelector);

        var _this4 = _possibleConstructorReturn(this, (TagSelector.__proto__ || Object.getPrototypeOf(TagSelector)).call(this, props));

        _this4.state = {
            tagSearchInput: "",
            addNewTagButtonVisible: false
        };
        _this4.newTagIndex = 0;
        _this4.changeTagSearchInput = _this4.changeTagSearchInput.bind(_this4);
        _this4.prepareTags = _this4.prepareTags.bind(_this4);
        _this4.checkAvailableTag = _this4.checkAvailableTag.bind(_this4);
        _this4.addNewTag = _this4.addNewTag.bind(_this4);
        return _this4;
    }

    _createClass(TagSelector, [{
        key: "changeTagSearchInput",
        value: function changeTagSearchInput(value) {
            this.setState({
                tagSearchInput: value,
                addNewTagButtonVisible: false
            });
        }
    }, {
        key: "prepareTags",
        value: function prepareTags() {
            var color = void 0;
            this.tags = [];
            for (var i = 0; i < this.props.tags.length; i++) {
                color = this.props.tags[i].passive ? "grey" : "orange";
                if (this.props.tags[i].newTag) {
                    color = "teal";
                }
                this.tags.push(React.createElement(TagWithClose, { key: this.props.tags[i].id, id: this.props.tags[i].id, color: color, name: this.props.tags[i].name, closeFunc: this.props.closeFunc }));
            }
        }
    }, {
        key: "checkAvailableTag",
        value: function checkAvailableTag(available) {
            var notAvailable = !available;
            var visible = true;
            if (available) {
                visible = false;
            } else {
                for (var i = 0; i < this.props.tags.length; i++) {
                    if (this.props.tags[i].name.toLowerCase() == this.state.tagSearchInput.toLowerCase()) {
                        visible = false;
                        break;
                    }
                }
            }
            this.setState({
                addNewTagButtonVisible: visible
            });
        }
    }, {
        key: "addNewTag",
        value: function addNewTag() {
            this.props.addNewTag(this.state.tagSearchInput, this.newTagIndex);
            this.newTagIndex++;
            this.setState({
                addNewTagButtonVisible: false,
                tagSearchInput: ""
            });
        }
    }, {
        key: "render",
        value: function render() {
            this.prepareTags();
            return React.createElement(
                "div",
                null,
                React.createElement(
                    Row,
                    { size: "one" },
                    React.createElement(
                        Column,
                        null,
                        React.createElement(SearchBar, {
                            tagSearchInput: this.state.tagSearchInput,
                            changeTagSearchInput: this.changeTagSearchInput,
                            inputPlaceholder: "Etiket Ara..",
                            click: this.props.clickSearchResult,
                            checkAvailableTag: this.checkAvailableTag
                        })
                    )
                ),
                React.createElement(
                    Row,
                    { size: "one" },
                    React.createElement(
                        Column,
                        null,
                        this.tags
                    )
                ),
                this.state.addNewTagButtonVisible ? React.createElement(
                    "div",
                    null,
                    React.createElement(
                        Row,
                        { size: "one" },
                        React.createElement(
                            Column,
                            null,
                            React.createElement(BasicMessageWithColor, { message: "B\xF6yle bir etiket yok", color: "yellow" })
                        )
                    ),
                    React.createElement(
                        Row,
                        { size: "one" },
                        React.createElement(
                            Column,
                            null,
                            React.createElement(
                                Center,
                                null,
                                React.createElement(Button, { name: "Yeni Etiket Olarak Ekle", type: "teal", click: this.addNewTag })
                            )
                        )
                    )
                ) : ""
            );
        }
    }]);

    return TagSelector;
}(React.Component);

var TagWithClose = function (_React$Component4) {
    _inherits(TagWithClose, _React$Component4);

    function TagWithClose(props) {
        _classCallCheck(this, TagWithClose);

        var _this5 = _possibleConstructorReturn(this, (TagWithClose.__proto__ || Object.getPrototypeOf(TagWithClose)).call(this, props));

        _this5.close = _this5.close.bind(_this5);
        return _this5;
    }

    _createClass(TagWithClose, [{
        key: "close",
        value: function close() {
            this.props.closeFunc(this.props.id);
        }
    }, {
        key: "render",
        value: function render() {
            this.color = this.props.color || "";
            return React.createElement(
                "div",
                { className: "TagWithClose" },
                React.createElement(
                    "a",
                    { className: "ui " + this.color + " large label" },
                    this.props.name
                ),
                React.createElement(
                    "i",
                    { className: "icon", onClick: this.close },
                    React.createElement("i", { className: "fa fa-times", "aria-hidden": "true" })
                )
            );
        }
    }]);

    return TagWithClose;
}(React.Component);

var NewProduct2 = function (_React$Component5) {
    _inherits(NewProduct2, _React$Component5);

    function NewProduct2(props) {
        _classCallCheck(this, NewProduct2);

        var _this6 = _possibleConstructorReturn(this, (NewProduct2.__proto__ || Object.getPrototypeOf(NewProduct2)).call(this, props));

        _this6.state = {
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
        _this6.turkishChars = {
            "ğ": "g",
            "ü": "u",
            "ş": "s",
            "ı": "i",
            "ö": "o",
            "ç": "c"
        };
        _this6.onChangeProductName = _this6.onChangeProductName.bind(_this6);
        _this6.generateProductUrl = _this6.generateProductUrl.bind(_this6);
        _this6.onChangeTagSearchInput = _this6.onChangeTagSearchInput.bind(_this6);
        _this6.selectTag = _this6.selectTag.bind(_this6);
        _this6.unselectTag = _this6.unselectTag.bind(_this6);
        _this6.refreshTagsInList = _this6.refreshTagsInList.bind(_this6);
        _this6.createProduct = _this6.createProduct.bind(_this6);
        return _this6;
    }

    _createClass(NewProduct2, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            if (!isMember()) {
                this.props.changeContent('giris-yap', true);
            }
        }
    }, {
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

    return NewProduct2;
}(React.Component);

var SelectedTags = function (_React$Component6) {
    _inherits(SelectedTags, _React$Component6);

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

var TagList = function (_React$Component7) {
    _inherits(TagList, _React$Component7);

    function TagList(props) {
        _classCallCheck(this, TagList);

        var _this8 = _possibleConstructorReturn(this, (TagList.__proto__ || Object.getPrototypeOf(TagList)).call(this, props));

        _this8.state = {
            tableVisible: false
        };
        _this8.onFocusInput = _this8.onFocusInput.bind(_this8);
        _this8.onBlurInput = _this8.onBlurInput.bind(_this8);
        _this8.selectTag = _this8.selectTag.bind(_this8);
        _this8.onChangeInput = _this8.onChangeInput.bind(_this8);
        return _this8;
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