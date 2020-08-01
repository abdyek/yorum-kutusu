var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Content = function (_React$Component) {
    _inherits(Content, _React$Component);

    function Content(props) {
        _classCallCheck(this, Content);

        var _this = _possibleConstructorReturn(this, (Content.__proto__ || Object.getPrototypeOf(Content)).call(this, props));

        _this.state = {
            productName: "",
            productUrl: "",
            tagsInList: [{
                id: 3,
                passive: false,
                text: "Batarya",
                color: "yellow",
                rateValue: "5"
            }, {
                id: 4,
                passive: false,
                text: "Kamera",
                color: "orange",
                rateValue: "4"
            }, {
                id: 5,
                passive: false,
                text: "Tasarım",
                color: "",
                rateValue: "-"
            }],
            selectedTags: [{
                id: 5,
                passive: false,
                text: "Tasarım",
                color: "",
                rateValue: "-"
            }]
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
        _this.selectTag = _this.selectTag.bind(_this);
        return _this;
    }

    _createClass(Content, [{
        key: "onChangeProductName",
        value: function onChangeProductName(e) {
            this.setState({
                productName: e.target.value,
                productUrl: this.generateProductUrl(e.target.value)
            });
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
                    console.log("burası çalışmıyor");
                    url += this.turkishChars[productName[i]];
                } else {
                    url += productName[i];
                }
            }
            return url;
        }
    }, {
        key: "selectTag",
        value: function selectTag(id) {}
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
                        React.createElement(
                            Row,
                            { size: "sixteen" },
                            React.createElement(WideColumn, { size: "two" }),
                            React.createElement(
                                WideColumn,
                                { size: "twelve" },
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
                                        React.createElement("input", { type: "text", placeholder: "\xDCr\xFCn \u0130smi", onChange: this.onChangeProductName, value: this.state.productName })
                                    )
                                ),
                                React.createElement(SelectedTags, { tags: this.state.selectedTags }),
                                React.createElement(TagList, { labelText: "Etiket Ekle", placeholderText: "Etiket \u0130smi", tags: this.state.tagsInList, handleSelectTag: this.selectTag })
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Content;
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
            return React.createElement(
                "div",
                null,
                React.createElement(Tags, { tags: this.props.tags, activeOnly: false })
            );
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
            //console.log(e.target.innerHTML);
            this.onBlurInput();
        }
    }, {
        key: "render",
        value: function render() {
            this.tags = [];
            for (var i = 0; i < this.props.tags.length; i++) {
                this.tags.push(React.createElement(
                    "div",
                    { className: "item", key: this.props.tags[i].key, name: this.props.tags[i].id, onClick: this.selectTag },
                    this.props.tags[i].text
                ));
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
                        React.createElement("input", { type: "text", placeholder: this.props.placeholderText, onFocus: this.onFocusInput, onBlur: this.onBlurInput })
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