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
        key: "componentDidMount",
        value: function componentDidMount() {
            if (!isMember()) {
                this.props.changeContent('giris-yap', true);
            }
        }
    }, {
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
                        React.createElement(H, { type: "1", text: "Yeni \xDCr\xFCn Olu\u015Ftur", id: "newProductHeader", textAlign: "center" })
                    )
                ),
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

        var productName = _this2.props.productName || "";
        var productSlug = _this2.constProductSlug = generateProductSlug(productName) || "";
        var tags = _this2.props.tags || [];
        _this2.state = {
            form: "normal", // normal, created, loading, updated
            productName: productName,
            productSlug: productSlug,
            productInputLoading: "",
            productAvailable: false,
            emptyProductNameWarn: false,
            tags: tags,
            reponseVisible: false,
            responseHeader: "",
            responseMessage: "",
            responseType: ""
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
        _this2.createEditButton = _this2.createEditButton.bind(_this2);
        _this2.createProduct = _this2.createProduct.bind(_this2);
        _this2.editProduct = _this2.editProduct.bind(_this2);
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

            if (this.props.editMode === true) {
                this.apiPar = {
                    'productName': this.state.productName,
                    'exception': this.constProductSlug
                };
            } else {
                this.apiPar = {
                    'productName': this.state.productName
                };
            }
            fetch(SITEURL + 'api/newProductChecker?' + getUrlPar(this.apiPar), { method: 'GET' }).then(function (response) {
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
        key: "createEditButton",
        value: function createEditButton() {
            if (this.state.productName.length == 0) {
                this.setState({
                    emptyProductNameWarn: true
                });
                return;
            }
            if (this.props.editMode === true) {
                this.editProduct();
            } else {
                this.createProduct();
            }
        }
    }, {
        key: "createProduct",
        value: function createProduct() {
            var _this4 = this;

            this.setState({
                form: "loading"
            });
            fetch(SITEURL + 'api/newProduct', {
                method: 'POST',
                header: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productName: this.state.productName,
                    tags: normalizer('tags-for-product-changing', this.state.tags)
                })
            }).then(function (response) {
                if (!response.ok) throw new Error(response.status);else return response.json();
            }).then(function (json) {
                _this4.setState({
                    form: "created"
                });
            }).catch(function (error) {
                if (error.message == 400) {
                    _this4.setState({
                        form: "normal",
                        responseVisible: true,
                        responseHeader: error.message,
                        responseMessage: "Geçersiz istek..",
                        responseType: "negative"
                    });
                } else if (error.message == 422) {
                    _this4.setState({
                        form: "normal",
                        responseVisible: true,
                        responseHeader: error.message,
                        responseMessage: "Böyle bir ürün ya da etiket zaten mevcut",
                        responseType: "negative"
                    });
                } else if (error.message == 404) {
                    _this4.setState({
                        form: "normal",
                        responseVisible: true,
                        responseHeader: error.message,
                        responseMessage: "Eklemeye çalıştığınız etiket mevcut değil",
                        responseType: "negative"
                    });
                } else if (error.message == 403) {
                    _this4.setState({
                        form: "normal",
                        responseVisible: true,
                        responseHeader: error.message,
                        responseMessage: "Yetkiniz yok! Başka bir sekmede çıkış yapmış olabilirsiniz. Lütfen giriş yapmayı deneyin.",
                        responseType: "negative"
                    });
                }
            });
        }
    }, {
        key: "editProduct",
        value: function editProduct() {
            var _this5 = this;

            this.setState({
                form: "loading"
            });
            fetch(SITEURL + 'api/updateProduct', {
                method: 'PATCH',
                header: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productID: this.props.productID,
                    productNewName: this.state.productName,
                    tags: normalizer('tags-for-product-changing', this.state.tags)
                })
            }).then(function (response) {
                if (!response.ok) throw new Error(response.status);else return response.json();
            }).then(function (json) {
                _this5.setState({
                    form: "updated"
                });
            }).catch(function (error) {
                if (error.message == 400) {
                    _this5.setState({
                        form: "normal",
                        responseVisible: true,
                        responseHeader: error.message,
                        responseMessage: "Geçersiz istek..",
                        responseType: "negative"
                    });
                } else if (error.message == 422) {
                    _this5.setState({
                        form: "normal",
                        responseVisible: true,
                        responseHeader: error.message,
                        responseMessage: "Böyle bir ürün ya da etiket zaten mevcut",
                        responseType: "negative"
                    });
                } else if (error.message == 404) {
                    _this5.setState({
                        form: "normal",
                        responseVisible: true,
                        responseHeader: error.message,
                        responseMessage: "Eklemeye çalıştığınız etiket ya da ürün mevcut değil",
                        responseType: "negative"
                    });
                } else if (error.message == 403) {
                    _this5.setState({
                        form: "normal",
                        responseVisible: true,
                        responseHeader: error.message,
                        responseMessage: "Yetkiniz yok! Başka bir sekmede çıkış yapmış olabilirsiniz. Lütfen giriş yapmayı deneyin.",
                        responseType: "negative"
                    });
                }
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
                                this.state.responseVisible ? React.createElement(
                                    "div",
                                    null,
                                    React.createElement(
                                        Row,
                                        null,
                                        React.createElement(
                                            Column,
                                            null,
                                            React.createElement(Message, { header: this.state.responseHeader, message: this.state.responseMessage, type: this.state.responseType })
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
                                            React.createElement(Button, { type: "large green", name: this.props.editMode === true ? "Düzenle" : "Oluştur", click: this.createEditButton })
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
                    { size: "one" },
                    React.createElement(
                        Column,
                        null,
                        React.createElement(Message, { header: "Katk\u0131 Sa\u011Flad\u0131\u011F\u0131n\u0131z \u0130\xE7in Te\u015Fekk\xFCrler", message: "Ba\u015Far\u0131l\u0131 bir \u015Fekilde g\xF6nderildi. Y\xF6netici onay\u0131ndan sonra \xFCr\xFCn g\xF6r\xFCnt\xFClenebilir olacak." })
                    )
                );
            } else if (this.state.form == "loading") {
                document.title = "Teşekkürler";
                return React.createElement(
                    Row,
                    { size: "one" },
                    React.createElement(
                        Column,
                        null,
                        React.createElement(RowLoadingSpin, { nonSegment: true })
                    )
                );
            } else if (this.state.form == "updated") {
                document.title = "Teşekkürler";
                return React.createElement(
                    Row,
                    { size: "one" },
                    React.createElement(
                        Column,
                        null,
                        React.createElement(Message, { header: "D\xFCzenleme Yaparak Katk\u0131 Sa\u011Flad\u0131\u011F\u0131n\u0131z \u0130\xE7in Te\u015Fekk\xFCrler", message: "Ba\u015Far\u0131l\u0131 bir \u015Fekilde g\xF6nderildi. Y\xF6netici onay\u0131ndan sonra \xFCr\xFCn g\xFCncellenecektir." })
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

        var _this6 = _possibleConstructorReturn(this, (TagSelector.__proto__ || Object.getPrototypeOf(TagSelector)).call(this, props));

        _this6.state = {
            tagSearchInput: "",
            addNewTagButtonVisible: false
        };
        _this6.newTagIndex = 0;
        _this6.changeTagSearchInput = _this6.changeTagSearchInput.bind(_this6);
        _this6.prepareTags = _this6.prepareTags.bind(_this6);
        _this6.checkAvailableTag = _this6.checkAvailableTag.bind(_this6);
        _this6.addNewTag = _this6.addNewTag.bind(_this6);
        return _this6;
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
                        React.createElement(SearchBarForTag, {
                            tagSearchInput: this.state.tagSearchInput,
                            changeTagSearchInput: this.changeTagSearchInput,
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

        var _this7 = _possibleConstructorReturn(this, (TagWithClose.__proto__ || Object.getPrototypeOf(TagWithClose)).call(this, props));

        _this7.close = _this7.close.bind(_this7);
        return _this7;
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
                { className: "tag-with-close" },
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