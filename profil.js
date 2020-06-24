var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// aygıtın mobil olması ya da olmaması butonlar için önemli,
// ekran boyutunu her yorum için kontrol etmek fazladan yavaşlayacaktı o yüzden değişkene atadım

var isMobile = void 0;
if ((window.innerWidth > 0 ? window.innerWidth : screen.width) < 750) {
    isMobile = true;
} else {
    isMobile = false;
}

// profilin sahibi değil mi kontrol ediyoruz
var owner = void 0;
if (profileOwner == username) {
    owner = true;
} else {
    owner = false;
}

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
                            React.createElement(H, { type: "1", text: profileOwner }),
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

        var _this3 = _possibleConstructorReturn(this, (Comments.__proto__ || Object.getPrototypeOf(Comments)).call(this, props));

        if (!isMobile) {
            _this3.buttonText = {
                editButtonText: "Düzenle",
                deleteButtonText: "Sil",
                approveDeleteButtonText: "Sil",
                cancelDeleteButtonText: "İptal",
                cancelEditButtonText: "İptal",
                reVoteButtonText: "Yeniden Oyla",
                saveButtonText: "Kaydet"
            };
        } else {
            _this3.buttonText = {
                editButtonText: "",
                deleteButtonText: "",
                approveDeleteButtonText: "",
                cancelDeleteButtonText: "",
                cancelEditButtonText: "",
                reVoteButtonText: "",
                saveButtonText: ""
            };
        }
        return _this3;
    }

    _createClass(Comments, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(Comment, { productName: "iphone-x", commentText: "\xE7ok g\xFCzel telefon ama \xE7ok pahal\u0131", buttonText: this.buttonText }),
                React.createElement(Comment, { productName: "le-cola", commentText: "tam bir kanser yap\u0131c\u0131", buttonText: this.buttonText }),
                React.createElement(Comment, { productName: "s\xFCrahi", commentText: "Yayg\u0131n inanc\u0131n tersine, Lorem Ipsum rastgele s\xF6zc\xFCklerden olu\u015Fmaz. K\xF6kleri M.\xD6. 45 tarihinden bu yana klasik Latin edebiyat\u0131na kadar uzanan 2000 y\u0131ll\u0131k bir ge\xE7mi\u015Fi vard\u0131r. Virginiadaki Hampden-Sydney Collegedan Latince profes\xF6r\xFC Richard McClintock, bir Lorem Ipsum pasaj\u0131nda ge\xE7en ve anla\u015F\u0131lmas\u0131 en g\xFC\xE7 s\xF6zc\xFCklerden biri olan consectetur s\xF6zc\xFC\u011F\xFCn\xFCn klasik edebiyattaki \xF6rneklerini inceledi\u011Finde kesin bir kayna\u011Fa ula\u015Fm\u0131\u015Ft\u0131r. Lorm Ipsum, \xC7i\xE7ero taraf\u0131ndan M.\xD6. 45 tarihinde kaleme al\u0131nan \"de Finibus Bonorum et Malorum\" (\u0130yi ve K\xF6t\xFCn\xFCn U\xE7 S\u0131n\u0131rlar\u0131) eserinin 1.10.32 ve 1.10.33 say\u0131l\u0131 b\xF6l\xFCmlerinden gelmektedir. Bu kitap, ahlak kuram\u0131 \xFCzerine bir tezdir ve R\xF6nesans d\xF6neminde \xE7ok pop\xFCler olmu\u015Ftur. Lorem Ipsum pasaj\u0131n\u0131n ilk sat\u0131r\u0131 olan \"Lorem ipsum dolor sit amet\" 1.10.32 say\u0131l\u0131 b\xF6l\xFCmdeki bir sat\u0131rdan gelmektedir.", buttonText: this.buttonText }),
                React.createElement(Comment, { productName: "honor 9 lite", commentText: "gelebilirse yeni telefonum olacak \u015Fuan kargoda", buttonText: this.buttonText }),
                React.createElement(Comment, { productName: "\xFClker \xE7ikolatal\u0131 gofret", commentText: "eski tad\u0131 yok bunun", buttonText: this.buttonText })
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
            reVote: "none",
            commentText: _this4.props.commentText,
            commentTextOld: _this4.props.commentText
        };
        _this4.inputRanges = [];
        /*
        this.editButtonText = "Düzenle";
        this.deleteButtonText = "Sil";
        this.approveDeleteButtonText = "Sil";
        this.cancelDeleteButtonText = "İptal";
        this.cancelEditButtonText = "İptal";
        */
        _this4.openEdit = _this4.openEdit.bind(_this4);
        _this4.openDelete = _this4.openDelete.bind(_this4);
        _this4.returnToNormal = _this4.returnToNormal.bind(_this4);
        _this4.commentWriting = _this4.commentWriting.bind(_this4);
        _this4.openReVote = _this4.openReVote.bind(_this4);
        return _this4;
    }

    _createClass(Comment, [{
        key: "openEdit",
        value: function openEdit() {
            console.log("düzenleme işlemi burada yapılacak");
            this.setState({
                form: "edit"
            });
        }
    }, {
        key: "openDelete",
        value: function openDelete() {
            console.log("silme yeri");
            this.setState({
                form: "delete"
            });
        }
    }, {
        key: "returnToNormal",
        value: function returnToNormal() {
            this.setState({
                form: "normal"
            });
        }
    }, {
        key: "commentWriting",
        value: function commentWriting(e) {
            this.setState({
                commentText: e.target.value
            });
        }
    }, {
        key: "openReVote",
        value: function openReVote() {
            this.setState({
                reVote: "loading"
            });
            for (var i = 0; i < 3; i++) {
                this.inputRanges.push(React.createElement(
                    "div",
                    { className: "inputRangeWrapper", key: i },
                    React.createElement(
                        "label",
                        { className: "inputRangeLabel" },
                        "buraya isim gelecek"
                    ),
                    React.createElement("input", { className: "inputRange", type: "range", id: "", name: "", defaultValue: this.state.value, step: "1", min: "0", max: "10", onChange: this.change }),
                    React.createElement(
                        "label",
                        { className: "inputRangeValue" },
                        "5.5"
                    )
                ));
            }
            this.setState({
                reVote: "ready"
            });
        }
    }, {
        key: "render",
        value: function render() {
            if (isMobile) {
                /* ekran boyutu 750'den küçük cihazlar için (mobil) butonların textini yok ediyoruz (sadece yüklenmede kontrol ediyor) */
                this.editButtonText = "";
                this.deleteButtonText = "";
                this.approveDeleteButtonText = "";
                this.cancelDeleteButtonText = "";
                this.cancelEditButtonText = "";
            }
            if (this.state.reVote == "ready") {
                this.reVoteArea = React.createElement(
                    "div",
                    null,
                    this.inputRanges
                );
            } else if (this.state.reVote == "none") {
                this.reVoteArea = React.createElement(
                    Center,
                    null,
                    React.createElement(
                        "button",
                        { className: "ui teal button", onClick: this.openReVote },
                        React.createElement(
                            "i",
                            { className: "icon" },
                            React.createElement("i", { "class": "fa fa-line-chart", "aria-hidden": "true" })
                        ),
                        this.props.buttonText.reVoteButtonText
                    )
                );
            } else if (this.state.reVote == "loading") {
                this.reVoteArea = React.createElement(RowLoading, null);
            }
            if (owner) {
                this.onlyOwner = React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "button",
                        { className: "ui icon teal button", onClick: this.openEdit },
                        React.createElement(
                            "i",
                            { className: "icon" },
                            React.createElement("i", { className: "fa fa-pencil-square-o", "aria-hidden": "true" })
                        ),
                        this.props.buttonText.editButtonText
                    ),
                    React.createElement(
                        "button",
                        { className: "ui icon orange button", onClick: this.openDelete },
                        React.createElement(
                            "i",
                            { className: "icon" },
                            React.createElement("i", { className: "fa fa-trash", "aria-hidden": "true" })
                        ),
                        this.props.buttonText.deleteButtonText
                    )
                );
            } else {
                this.onlyOwner = null;
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
                                    { size: "one" },
                                    React.createElement(
                                        Column,
                                        null,
                                        React.createElement(
                                            FloatRight,
                                            null,
                                            React.createElement(
                                                "div",
                                                null,
                                                this.onlyOwner
                                            )
                                        )
                                    )
                                ),
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
                                            "15.14.1994"
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
                                React.createElement(CommentText, { text: this.state.commentTextOld }),
                                React.createElement(
                                    Row,
                                    { size: "two" },
                                    React.createElement(
                                        Column,
                                        null,
                                        React.createElement(
                                            "div",
                                            { className: "commentHeader" },
                                            React.createElement(H, { type: "5", text: "yunusemre" })
                                        )
                                    ),
                                    React.createElement(
                                        Column,
                                        null,
                                        React.createElement(
                                            FloatRight,
                                            null,
                                            React.createElement(LikeButton, { value: 1, likeOrDislike: "like" }),
                                            React.createElement(DislikeButton, { value: 3, likeOrDislike: "" })
                                        )
                                    )
                                )
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
                                                { "class": "ui icon red button", onClick: this.returnToNormal },
                                                React.createElement(
                                                    "i",
                                                    { "class": "icon" },
                                                    React.createElement("i", { "class": "fa fa-times", "aria-hidden": "true" })
                                                ),
                                                this.props.buttonText.cancelEditButtonText
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
                                            Row,
                                            { size: "sixteen" },
                                            React.createElement(
                                                WideColumn,
                                                { size: "ten" },
                                                React.createElement(
                                                    "div",
                                                    { className: "ui form" },
                                                    React.createElement(
                                                        "div",
                                                        { className: "field" },
                                                        React.createElement(
                                                            "label",
                                                            null,
                                                            "Yorum D\xFCzenle"
                                                        ),
                                                        React.createElement("textarea", { value: this.state.commentText, onChange: this.commentWriting })
                                                    )
                                                )
                                            ),
                                            React.createElement(
                                                WideColumn,
                                                { size: "six" },
                                                this.reVoteArea
                                            )
                                        ),
                                        React.createElement(
                                            Row,
                                            { size: "one" },
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
                                                            { className: "ui teal button" },
                                                            React.createElement(
                                                                "i",
                                                                { className: "icon" },
                                                                React.createElement("i", { "class": "fa fa-floppy-o", "aria-hidden": "true" })
                                                            ),
                                                            this.props.buttonText.saveButtonText
                                                        )
                                                    )
                                                )
                                            )
                                        )
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
                                                this.props.buttonText.approveDeleteButtonText
                                            ),
                                            React.createElement(
                                                "button",
                                                { "class": "ui icon red button", onClick: this.returnToNormal },
                                                React.createElement(
                                                    "i",
                                                    { "class": "icon" },
                                                    React.createElement("i", { "class": "fa fa-times", "aria-hidden": "true" })
                                                ),
                                                this.props.buttonText.cancelDeleteButtonText
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