var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));
    }

    _createClass(App, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(Header, null),
                React.createElement(Content, null),
                React.createElement(Footer, null)
            );
        }
    }]);

    return App;
}(React.Component);

var Content = function (_React$Component2) {
    _inherits(Content, _React$Component2);

    function Content(props) {
        _classCallCheck(this, Content);

        return _possibleConstructorReturn(this, (Content.__proto__ || Object.getPrototypeOf(Content)).call(this, props));
    }

    _createClass(Content, [{
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
                            Center,
                            null,
                            React.createElement("i", { id: "userIcon", className: "user huge circle icon" }),
                            React.createElement(H, { type: "1", text: username }),
                            React.createElement(
                                "button",
                                { className: "ui grey button" },
                                React.createElement(
                                    "i",
                                    { className: "icon" },
                                    React.createElement("i", { className: "fa fa-cog", "aria-hidden": "true" })
                                ),
                                "Ayarlar"
                            ),
                            React.createElement(
                                "button",
                                { className: "ui red button" },
                                React.createElement(
                                    "i",
                                    { className: "icon" },
                                    React.createElement("i", { className: "fa fa-paper-plane", "aria-hidden": "true" })
                                ),
                                "\xC7\u0131k\u0131\u015F Yap"
                            )
                        )
                    )
                ),
                React.createElement(
                    Row,
                    { size: "one" },
                    React.createElement(
                        Column,
                        null,
                        React.createElement(
                            "div",
                            { className: "yorumlarHeader" },
                            React.createElement(H, { type: "1", textAlign: "center", text: "Yorumlar" })
                        )
                    )
                ),
                React.createElement(Comments, null)
            );
        }
    }]);

    return Content;
}(React.Component);

var Comments = function (_React$Component3) {
    _inherits(Comments, _React$Component3);

    function Comments(props) {
        _classCallCheck(this, Comments);

        return _possibleConstructorReturn(this, (Comments.__proto__ || Object.getPrototypeOf(Comments)).call(this, props));
    }

    _createClass(Comments, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(Comment, { productName: "iphone-x", commentText: "\xE7ok g\xFCzel telefon ama \xE7ok pahal\u0131" }),
                React.createElement(Comment, { productName: "le-cola", commentText: "tam bir kanser yap\u0131c\u0131" }),
                React.createElement(Comment, { productName: "s\xFCrahi", commentText: "Yayg\u0131n inanc\u0131n tersine, Lorem Ipsum rastgele s\xF6zc\xFCklerden olu\u015Fmaz. K\xF6kleri M.\xD6. 45 tarihinden bu yana klasik Latin edebiyat\u0131na kadar uzanan 2000 y\u0131ll\u0131k bir ge\xE7mi\u015Fi vard\u0131r. Virginiadaki Hampden-Sydney Collegedan Latince profes\xF6r\xFC Richard McClintock, bir Lorem Ipsum pasaj\u0131nda ge\xE7en ve anla\u015F\u0131lmas\u0131 en g\xFC\xE7 s\xF6zc\xFCklerden biri olan consectetur s\xF6zc\xFC\u011F\xFCn\xFCn klasik edebiyattaki \xF6rneklerini inceledi\u011Finde kesin bir kayna\u011Fa ula\u015Fm\u0131\u015Ft\u0131r. Lorm Ipsum, \xC7i\xE7ero taraf\u0131ndan M.\xD6. 45 tarihinde kaleme al\u0131nan \"de Finibus Bonorum et Malorum\" (\u0130yi ve K\xF6t\xFCn\xFCn U\xE7 S\u0131n\u0131rlar\u0131) eserinin 1.10.32 ve 1.10.33 say\u0131l\u0131 b\xF6l\xFCmlerinden gelmektedir. Bu kitap, ahlak kuram\u0131 \xFCzerine bir tezdir ve R\xF6nesans d\xF6neminde \xE7ok pop\xFCler olmu\u015Ftur. Lorem Ipsum pasaj\u0131n\u0131n ilk sat\u0131r\u0131 olan \"Lorem ipsum dolor sit amet\" 1.10.32 say\u0131l\u0131 b\xF6l\xFCmdeki bir sat\u0131rdan gelmektedir." }),
                React.createElement(Comment, { productName: "honor 9 lite", commentText: "gelebilirse yeni telefonum olacak \u015Fuan kargoda" }),
                React.createElement(Comment, { productName: "\xFClker \xE7ikolatal\u0131 gofret", commentText: "eski tad\u0131 yok bunun" })
            );
        }
    }]);

    return Comments;
}(React.Component);

var Comment = function (_React$Component4) {
    _inherits(Comment, _React$Component4);

    function Comment(props) {
        _classCallCheck(this, Comment);

        var _this4 = _possibleConstructorReturn(this, (Comment.__proto__ || Object.getPrototypeOf(Comment)).call(this, props));

        _this4.state = {
            form: "normal",
            commentText: _this4.props.commentText
        };
        _this4.editButtonText = "Düzenle";
        _this4.deleteButtonText = "Sil";
        _this4.approveDeleteButtonText = "Sil";
        _this4.cancelDeleteButtonText = "İptal";
        _this4.cancelEditDeleteButtonText = "iptal";
        _this4.edit = _this4.edit.bind(_this4);
        _this4.delete = _this4.delete.bind(_this4);
        _this4.cancel = _this4.cancel.bind(_this4);
        return _this4;
    }

    _createClass(Comment, [{
        key: "edit",
        value: function edit() {
            console.log("düzenleme işlemi burada yapılacak");
            this.setState({
                form: "edit"
            });
        }
    }, {
        key: "delete",
        value: function _delete() {
            console.log("silme yeri");
            this.setState({
                form: "delete"
            });
        }
    }, {
        key: "cancel",
        value: function cancel() {
            this.setState({
                form: "normal"
            });
        }
    }, {
        key: "render",
        value: function render() {
            if ((window.innerWidth > 0 ? window.innerWidth : screen.width) < 750) {
                /* ekran boyutu 750'den küçük cihazlar için (mobil) butonların textini yok ediyoruz (sadece yüklenmede kontrol ediyor) */
                this.editButtonText = "";
                this.deleteButtonText = "";
                this.approveDeleteButtonText = "";
                this.cancelDeleteButtonText = "";
                this.cancelEditButtonText = "";
            }
            if (this.state.form == "normal") {
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
                                    { size: "two", nonStackable: true },
                                    React.createElement(
                                        Column,
                                        null,
                                        React.createElement(H, { type: "3", text: this.props.productName })
                                    ),
                                    React.createElement(
                                        Column,
                                        null,
                                        React.createElement(
                                            FloatRight,
                                            null,
                                            React.createElement(
                                                "div",
                                                null,
                                                React.createElement(
                                                    "button",
                                                    { className: "ui icon teal button", onClick: this.edit },
                                                    React.createElement(
                                                        "i",
                                                        { className: "icon" },
                                                        React.createElement("i", { className: "fa fa-pencil-square-o", "aria-hidden": "true" })
                                                    ),
                                                    this.editButtonText
                                                ),
                                                React.createElement(
                                                    "button",
                                                    { className: "ui icon orange button", onClick: this.delete },
                                                    React.createElement(
                                                        "i",
                                                        { className: "icon" },
                                                        React.createElement("i", { className: "fa fa-trash", "aria-hidden": "true" })
                                                    ),
                                                    this.deleteButtonText
                                                )
                                            )
                                        )
                                    )
                                ),
                                React.createElement(
                                    Row,
                                    { size: "one" },
                                    React.createElement(
                                        Column,
                                        null,
                                        React.createElement(RatingBar, { ratingAverage: 5.5 })
                                    )
                                ),
                                React.createElement(CommentText, { text: this.props.commentText })
                            )
                        )
                    )
                );
            } else if (this.state.form == "edit") {
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
                                    { size: "two", nonStackable: true },
                                    React.createElement(
                                        Column,
                                        null,
                                        React.createElement(H, { type: "3", text: this.props.productName })
                                    ),
                                    React.createElement(
                                        Column,
                                        null,
                                        React.createElement(
                                            FloatRight,
                                            null,
                                            React.createElement(
                                                "button",
                                                { "class": "ui icon red button", onClick: this.cancel },
                                                React.createElement(
                                                    "i",
                                                    { "class": "icon" },
                                                    React.createElement("i", { "class": "fa fa-times", "aria-hidden": "true" })
                                                ),
                                                this.cancelEditButtonText
                                            )
                                        )
                                    )
                                ),
                                React.createElement(
                                    Row,
                                    { size: "one" },
                                    React.createElement(
                                        Column,
                                        null,
                                        "buraya d\xFCzenleme \u015Feyi gelecek"
                                    )
                                )
                            )
                        )
                    )
                );
            } else if (this.state.form == "delete") {
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
                                    { size: "two" },
                                    React.createElement(
                                        Column,
                                        null,
                                        "Yorumunuzu kal\u0131c\u0131 olarak silmek ister misiniz?"
                                    ),
                                    React.createElement(
                                        Column,
                                        null,
                                        React.createElement(
                                            FloatRight,
                                            null,
                                            React.createElement(
                                                "button",
                                                { "class": "ui icon blue button" },
                                                React.createElement(
                                                    "i",
                                                    { "class": "icon" },
                                                    React.createElement("i", { "class": "fa fa-check", "aria-hidden": "true" })
                                                ),
                                                this.approveDeleteButtonText
                                            ),
                                            React.createElement(
                                                "button",
                                                { "class": "ui icon red button", onClick: this.cancel },
                                                React.createElement(
                                                    "i",
                                                    { "class": "icon" },
                                                    React.createElement("i", { "class": "fa fa-times", "aria-hidden": "true" })
                                                ),
                                                this.cancelDeleteButtonText
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                );
            }
        }
    }]);

    return Comment;
}(React.Component);

var RatingBar = function (_React$Component5) {
    _inherits(RatingBar, _React$Component5);

    function RatingBar(props) {
        _classCallCheck(this, RatingBar);

        var _this5 = _possibleConstructorReturn(this, (RatingBar.__proto__ || Object.getPrototypeOf(RatingBar)).call(this, props));

        _this5.percent = _this5.props.ratingAverage * 10;
        // bu kısım drawcircle ile aynı refactor ederken buna bir çare bulabilirsin
        _this5.limitColor = {
            0: {
                min: 0,
                max: 5,
                color: "#db2828"
            },
            1: {
                min: 5,
                max: 7,
                color: "#f2711c"
            },
            2: {
                min: 7,
                max: 10,
                color: "#21ba45"
            }
        };
        _this5.color = _this5.limitColor[0].color;
        for (var i = 0; i < Object.keys(_this5.limitColor).length; i++) {
            if (_this5.limitColor[i].min <= _this5.props.ratingAverage && _this5.props.ratingAverage < _this5.limitColor[i].max) {
                _this5.color = _this5.limitColor[i].color;
                break;
            }
        }
        // ^^^
        _this5.widthOfFill = _this5.props.ratingAverage * 15 + "px";
        return _this5;
    }

    _createClass(RatingBar, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "ratingBar" },
                React.createElement(
                    "span",
                    { className: "barValue" },
                    this.props.ratingAverage
                ),
                React.createElement(
                    "div",
                    { className: "barStickWrapper" },
                    React.createElement("div", { className: "barStick barStickFull" }),
                    React.createElement("div", { className: "barStick barStickFill", style: { backgroundColor: this.color, width: this.widthOfFill } })
                )
            );
        }
    }]);

    return RatingBar;
}(React.Component);

var CommentText = function (_React$Component6) {
    _inherits(CommentText, _React$Component6);

    function CommentText(props) {
        _classCallCheck(this, CommentText);

        return _possibleConstructorReturn(this, (CommentText.__proto__ || Object.getPrototypeOf(CommentText)).call(this, props));
    }

    _createClass(CommentText, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "commentText" },
                this.props.text
            );
        }
    }]);

    return CommentText;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));