var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Comment = function (_React$Component) {
    _inherits(Comment, _React$Component);

    function Comment(props) {
        _classCallCheck(this, Comment);

        var _this = _possibleConstructorReturn(this, (Comment.__proto__ || Object.getPrototypeOf(Comment)).call(this, props));

        var form = _this.props.form ? _this.props.form : "normal";
        form = _this.props.hidden ? "hidden" : form;
        _this.state = {
            // normal, report, edit, delete, message, loading, hidden
            form: form,
            topMessage: _this.props.topMessage,
            message: _this.props.message,
            likeCount: _this.props.likeCount,
            liked: _this.props.liked,
            likeButtonDisabled: false
        };
        _this.likeToggle = _this.likeToggle.bind(_this);
        _this.openReportArea = _this.openReportArea.bind(_this);
        _this.closeReportArea = _this.closeReportArea.bind(_this);
        _this.openEditArea = _this.openEditArea.bind(_this);
        _this.closeEditArea = _this.closeEditArea.bind(_this);
        _this.openDeleteArea = _this.openDeleteArea.bind(_this);
        _this.closeDeleteArea = _this.closeDeleteArea.bind(_this);
        _this.openLoadingSpin = _this.openLoadingSpin.bind(_this);
        _this.makeNone = _this.makeNone.bind(_this);
        _this.setForm = _this.setForm.bind(_this);
        _this.justOneTime = _this.justOneTime.bind(_this);
        _this.removeHide = _this.removeHide.bind(_this);
        return _this;
    }

    _createClass(Comment, [{
        key: "likeToggle",
        value: function likeToggle() {
            var _this2 = this;

            if (isMember()) {
                this.make = this.state.liked ? false : true;
                this.setState({
                    likeButtonDisabled: true
                });
                fetch(SITEURL + 'api/likeComment', {
                    method: 'POST',
                    header: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        commentID: this.props.id,
                        like: this.make
                    })
                }).then(function (response) {
                    if (!response.ok) throw new Error(response.status);else return response.json();
                }).then(function (json) {
                    _this2.setState({
                        likeButtonDisabled: false,
                        liked: _this2.make,
                        likeCount: json['other']['count']
                    });
                }).catch(function (error) {});
            } else {
                this.props.changeContent('giris-yap', true);
            }
        }
    }, {
        key: "openReportArea",
        value: function openReportArea() {
            this.setForm("report");
        }
    }, {
        key: "closeReportArea",
        value: function closeReportArea() {
            this.setForm("normal");
        }
    }, {
        key: "openEditArea",
        value: function openEditArea() {
            this.setState({
                form: "edit",
                topMessage: null
            });
        }
    }, {
        key: "closeEditArea",
        value: function closeEditArea() {
            this.setForm("normal");
        }
    }, {
        key: "openDeleteArea",
        value: function openDeleteArea() {
            this.setState({
                form: "delete",
                topMessage: null
            });
        }
    }, {
        key: "closeDeleteArea",
        value: function closeDeleteArea() {
            this.setState({
                form: "normal"
            });
        }
    }, {
        key: "openLoadingSpin",
        value: function openLoadingSpin() {
            this.setState({
                form: "loading"
            });
        }
    }, {
        key: "makeNone",
        value: function makeNone() {
            this.setState({
                form: "none"
            });
        }
    }, {
        key: "setForm",
        value: function setForm(formType) {
            this.setState({
                form: formType
            });
        }
    }, {
        key: "justOneTime",
        value: function justOneTime() {
            this.setState({
                form: "normal"
            });
        }
    }, {
        key: "removeHide",
        value: function removeHide() {
            this.setState({
                form: "normal"
            });
            fetch(SITEURL + 'api/removeHideComment', {
                method: 'POST',
                header: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    commentID: this.props.id
                })
            }).then(function (response) {
                if (!response.ok) throw new Error(response.status);else return response.json();
            }).then(function (json) {}).catch(function (error) {});
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.form == "normal") {
                return React.createElement(
                    "div",
                    null,
                    this.state.topMessage ? React.createElement(
                        Row,
                        { size: "one" },
                        React.createElement(
                            Column,
                            null,
                            React.createElement(BasicMessage, { type: this.state.topMessage.type, text: this.state.topMessage.text })
                        )
                    ) : "",
                    React.createElement(
                        Row,
                        { size: "one" },
                        React.createElement(
                            Column,
                            null,
                            React.createElement(
                                RaisedSegment,
                                { otherClass: "comment" },
                                React.createElement(TopOfComment, {
                                    text: this.props.text,
                                    slug: this.props.slug,
                                    title: this.props.title,
                                    owner: this.props.owner,
                                    handleOpenEditArea: this.openEditArea,
                                    handleOpenDeleteArea: this.openDeleteArea,
                                    changeContent: this.props.changeContent,
                                    type: this.props.type,
                                    bottomComment: this.props.bottomComment !== undefined ? this.props.bottomComment : false,
                                    ownCommentPublished: this.props.ownCommentPublished !== undefined ? this.props.ownCommentPublished : null
                                }),
                                React.createElement(BottomOfComment, {
                                    likeCount: this.state.likeCount,
                                    liked: this.state.liked,
                                    likeButtonDisabled: this.state.likeButtonDisabled,
                                    likeToggle: this.likeToggle,
                                    date: this.props.date,
                                    lastEditDate: this.props.lastEditDate,
                                    edited: this.props.edited,
                                    handleOpenReportArea: this.openReportArea,
                                    handleCloseReportArea: this.closeReportArea,
                                    tags: this.props.rating,
                                    owner: this.props.owner,
                                    changeContent: this.props.changeContent,
                                    id: this.props.id,
                                    reported: this.props.reported
                                })
                            )
                        )
                    )
                );
            } else if (this.state.form == "report") {
                return React.createElement(ReportArea, { handleCloseReportArea: this.closeReportArea, commentID: this.props.id });
            } else if (this.state.form == "edit") {
                return React.createElement(EditArea, _defineProperty({ rating: this.props.rating, tags: this.props.tags, handleCancelButton: this.closeEditArea, commentText: this.props.text, owner: this.props.owner, reloadFunc: this.props.reloadFunc, setForm: this.setForm, productID: this.props.productID }, "setForm", this.setForm));
            } else if (this.state.form == "delete") {
                return React.createElement(DeleteArea, { handleCancelButton: this.closeDeleteArea, runBeforeDelete: this.openLoadingSpin, runAfterDelete: this.makeNone, reloadFunc: this.props.reloadFunc, id: this.props.productID });
            } else if (this.state.form == "message") {
                return React.createElement(
                    Row,
                    { size: "one" },
                    React.createElement(
                        Column,
                        null,
                        React.createElement(BasicMessage, { type: this.state.message.messageType, text: this.state.message.messageText })
                    )
                );
            } else if (this.state.form == "loading") {
                return React.createElement(RowLoadingSpin, null);
            } else if (this.state.form == "none") {
                return "";
            } else if (this.state.form == "hidden") {
                return React.createElement(HiddenArea, { justOneTime: this.justOneTime, removeHide: this.removeHide });
            }
        }
    }]);

    return Comment;
}(React.Component);

var HiddenArea = function (_React$Component2) {
    _inherits(HiddenArea, _React$Component2);

    function HiddenArea() {
        _classCallCheck(this, HiddenArea);

        return _possibleConstructorReturn(this, (HiddenArea.__proto__ || Object.getPrototypeOf(HiddenArea)).apply(this, arguments));
    }

    _createClass(HiddenArea, [{
        key: "render",
        value: function render() {
            return React.createElement(
                Row,
                { size: "one" },
                React.createElement(
                    Column,
                    null,
                    React.createElement(
                        RaisedSegment,
                        { otherClass: "comment" },
                        React.createElement(
                            Row,
                            { size: "one" },
                            React.createElement(
                                Column,
                                null,
                                React.createElement(
                                    "div",
                                    { className: "ui olive message" },
                                    "Bu yorumu gizlediniz"
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
                                    FloatRight,
                                    null,
                                    React.createElement(
                                        "button",
                                        { className: "ui yellow button", onClick: this.props.justOneTime },
                                        "\u015Eimdilik G\xF6ster"
                                    ),
                                    React.createElement(
                                        "button",
                                        { className: "ui olive button", onClick: this.props.removeHide },
                                        "G\xF6r\xFCn\xFCr Yap"
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return HiddenArea;
}(React.Component);

var TopOfComment = function (_React$Component3) {
    _inherits(TopOfComment, _React$Component3);

    function TopOfComment(props) {
        _classCallCheck(this, TopOfComment);

        var _this4 = _possibleConstructorReturn(this, (TopOfComment.__proto__ || Object.getPrototypeOf(TopOfComment)).call(this, props));

        _this4.minifyLimit = 750;
        _this4.slugPrefix = _this4.props.type == "profile" ? "profil" : "urun";
        // ^ comment'i iki yerde kullandığım ve 2 tür title yapısı olduğu için böyle bir çözüm buldum
        _this4.state = {
            readAll: false
        };
        _this4.openEditArea = _this4.openEditArea.bind(_this4);
        _this4.openDeleteArea = _this4.openDeleteArea.bind(_this4);
        _this4.readAll = _this4.readAll.bind(_this4);
        _this4.minifyText = _this4.minifyText.bind(_this4);
        if (_this4.props.text.length > _this4.minifyLimit) {
            _this4.minifiedText = _this4.minifyText(_this4.props.text, _this4.minifyLimit);
        } else {
            _this4.state = {
                readAll: true
            };
        }
        return _this4;
    }

    _createClass(TopOfComment, [{
        key: "openEditArea",
        value: function openEditArea() {
            this.props.handleOpenEditArea();
        }
    }, {
        key: "openDeleteArea",
        value: function openDeleteArea() {
            this.props.handleOpenDeleteArea();
        }
    }, {
        key: "readAll",
        value: function readAll() {
            this.setState({
                readAll: true
            });
        }
    }, {
        key: "minifyText",
        value: function minifyText(text, limit) {
            var minifiedText = "";
            for (var i = 0; i < limit; i++) {
                minifiedText += text[i];
            }
            return minifiedText;
        }
    }, {
        key: "render",
        value: function render() {
            var _this5 = this;

            this.bottomComment = this.props.bottomComment || false;
            return React.createElement(
                "div",
                null,
                React.createElement(
                    Row,
                    { size: "two", nonStackable: true },
                    React.createElement(
                        Column,
                        null,
                        React.createElement(
                            "div",
                            { className: "comment-header-wrapper" },
                            React.createElement(H, { type: "3", text: this.props.title, optional: "comment-header", href: SITEURL + this.slugPrefix + "/" + this.props.slug, handleOnClick: function handleOnClick(e) {
                                    e.preventDefault();_this5.props.changeContent(e.target.href);
                                } })
                        )
                    ),
                    React.createElement(
                        Column,
                        null,
                        React.createElement(
                            FloatRight,
                            null,
                            this.props.owner ? React.createElement(
                                "div",
                                null,
                                React.createElement(
                                    "button",
                                    { className: "ui icon teal button", onClick: this.openEditArea },
                                    React.createElement(
                                        "i",
                                        { className: "icon" },
                                        React.createElement("i", { className: "fa fa-pencil-square-o", "aria-hidden": "true" })
                                    ),
                                    !isMobile() ? "Düzenle" : ""
                                ),
                                React.createElement(
                                    "button",
                                    { className: "ui icon orange button", onClick: this.openDeleteArea },
                                    React.createElement(
                                        "i",
                                        { className: "icon" },
                                        React.createElement("i", { className: "fa fa-trash", "aria-hidden": "true" })
                                    ),
                                    !isMobile() ? "Sil" : ""
                                )
                            ) : ""
                        )
                    )
                ),
                this.bottomComment && this.props.ownCommentPublished == false ? React.createElement(
                    Row,
                    { size: "one" },
                    React.createElement(
                        Column,
                        null,
                        React.createElement(Message, { header: "Yorum Henüz Görünür Değil", type: "teal", message: "Y\xF6netici onay\u0131ndan sonra g\xF6r\xFCn\xFCr olacak" })
                    )
                ) : "",
                React.createElement(
                    Row,
                    { size: "one" },
                    React.createElement(
                        Column,
                        null,
                        React.createElement(
                            "div",
                            { className: "comment-text" },
                            this.state.readAll ? this.props.text : this.minifiedText
                        )
                    )
                ),
                !this.state.readAll ? React.createElement(
                    Row,
                    { size: "one" },
                    React.createElement(
                        Column,
                        null,
                        React.createElement(
                            FloatRight,
                            null,
                            React.createElement(
                                "a",
                                { className: "yorumkutusu-a-empty", onClick: this.readAll },
                                "Devam\u0131n\u0131 Oku"
                            )
                        )
                    )
                ) : ""
            );
        }
    }]);

    return TopOfComment;
}(React.Component);

var BottomOfComment = function (_React$Component4) {
    _inherits(BottomOfComment, _React$Component4);

    function BottomOfComment() {
        _classCallCheck(this, BottomOfComment);

        return _possibleConstructorReturn(this, (BottomOfComment.__proto__ || Object.getPrototypeOf(BottomOfComment)).apply(this, arguments));
    }

    _createClass(BottomOfComment, [{
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
                        React.createElement(Tags, { tags: this.props.tags, activeOnly: true, handleOnClick: this.props.changeContent })
                    )
                ),
                React.createElement(
                    Row,
                    { size: "two", nonStackable: true },
                    React.createElement(
                        Column,
                        null,
                        React.createElement(
                            "div",
                            { className: "comment-date" },
                            this.props.edited ? React.createElement(
                                "span",
                                null,
                                React.createElement("i", { className: "fa fa-pencil-square-o", "aria-hidden": "true" })
                            ) : "",
                            this.props.edited ? formatDate(this.props.lastEditDate) : "",
                            this.props.edited ? React.createElement("br", null) : "",
                            formatDate(this.props.date)
                        )
                    ),
                    React.createElement(
                        Column,
                        null,
                        React.createElement(
                            FloatRight,
                            null,
                            React.createElement(LikeButton, { likeCount: this.props.likeCount, liked: this.props.liked, likeButtonDisabled: this.props.likeButtonDisabled, id: this.props.id, likeToggle: this.props.likeToggle }),
                            React.createElement(ReportButton, { handleOpenReportArea: this.props.handleOpenReportArea, disabled: this.props.owner || this.props.reported, changeContent: this.props.changeContent })
                        )
                    )
                )
            );
        }
    }]);

    return BottomOfComment;
}(React.Component);

var LikeButton = function (_React$Component5) {
    _inherits(LikeButton, _React$Component5);

    function LikeButton(props) {
        _classCallCheck(this, LikeButton);

        return _possibleConstructorReturn(this, (LikeButton.__proto__ || Object.getPrototypeOf(LikeButton)).call(this, props));
    }

    _createClass(LikeButton, [{
        key: "render",
        value: function render() {
            this.disabled = this.props.likeButtonDisabled ? " disabled" : "";
            this.buttonClass = this.props.liked ? "ui blue button" : "ui button";
            return React.createElement(
                "button",
                { className: this.buttonClass + this.disabled, onClick: this.props.likeToggle },
                React.createElement(
                    "i",
                    { className: "icon" },
                    React.createElement("i", { className: "fa fa-thumbs-up", "aria-hidden": "true" })
                ),
                this.props.likeCount
            );
        }
    }]);

    return LikeButton;
}(React.Component);

var ReportButton = function (_React$Component6) {
    _inherits(ReportButton, _React$Component6);

    function ReportButton(props) {
        _classCallCheck(this, ReportButton);

        var _this8 = _possibleConstructorReturn(this, (ReportButton.__proto__ || Object.getPrototypeOf(ReportButton)).call(this, props));

        _this8.openReportArea = _this8.openReportArea.bind(_this8);
        _this8.buttonClass = _this8.props.disabled ? "ui icon disabled button" : "ui icon button";
        return _this8;
    }

    _createClass(ReportButton, [{
        key: "openReportArea",
        value: function openReportArea() {
            if (isMember()) {
                this.props.handleOpenReportArea();
            } else {
                this.props.changeContent('giris-yap', true);
            }
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "button",
                { className: this.buttonClass, onClick: this.openReportArea },
                React.createElement(
                    "i",
                    { className: "icon" },
                    React.createElement("i", { className: "fa fa-exclamation-triangle", "aria-hidden": "true" })
                )
            );
        }
    }]);

    return ReportButton;
}(React.Component);

var ReportArea = function (_React$Component7) {
    _inherits(ReportArea, _React$Component7);

    function ReportArea(props) {
        _classCallCheck(this, ReportArea);

        var _this9 = _possibleConstructorReturn(this, (ReportArea.__proto__ || Object.getPrototypeOf(ReportArea)).call(this, props));

        _this9.limitOfReportText = 200;
        _this9.state = {
            // normal, loading, message
            form: "loading",
            messageType: "", // colors
            messageHeader: "",
            messageText: "",
            hideComment: true,
            selectOptionWarning: false,
            option: "-1",
            reportText: '',
            reportTextSize: 0,
            reportTextLimitWarning: false
        };
        _this9.fetchReportOptions();
        _this9.fetchReportOptions = _this9.fetchReportOptions.bind(_this9);
        _this9.closeReportArea = _this9.closeReportArea.bind(_this9);
        _this9.sendReport = _this9.sendReport.bind(_this9);
        _this9.changeOption = _this9.changeOption.bind(_this9);
        _this9.changeTextarea = _this9.changeTextarea.bind(_this9);
        _this9.toggleHideComment = _this9.toggleHideComment.bind(_this9);
        return _this9;
    }

    _createClass(ReportArea, [{
        key: "fetchReportOptions",
        value: function fetchReportOptions() {
            var _this10 = this;

            fetch(SITEURL + 'api/reportOptions', {
                method: 'GET',
                header: {
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                if (!response.ok) throw new Error(response.status);else return response.json();
            }).then(function (json) {
                console.log(json);
                _this10.setState({
                    form: "normal",
                    options: json['other']['reportOptions']
                });
            }).catch(function (error) {});
        }
    }, {
        key: "closeReportArea",
        value: function closeReportArea() {
            this.props.handleCloseReportArea();
        }
    }, {
        key: "sendReport",
        value: function sendReport() {
            var _this11 = this;

            if (this.state.option == "-1") {
                this.setState({
                    selectOptionWarning: true
                });
            } else {
                this.setState({
                    form: "loading"
                });
                fetch(SITEURL + 'api/report', {
                    method: 'POST',
                    header: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        commentID: this.props.commentID,
                        reportOptionID: this.state.option,
                        reportText: this.state.reportText,
                        hide: this.state.hideComment
                    })
                }).then(function (response) {
                    if (!response.ok) throw new Error(response.status);else return response.json();
                }).then(function (json) {
                    _this11.setState({
                        form: "message",
                        messageType: "success", // success, warning, danger
                        messageHeader: "Geri bildirim gönderildi",
                        messageText: "Geri bildirim göndererek daha kaliteli bir ortam oluşturma konusunda bize yardımcı olduğunuz için teşekkür ederiz"
                    });
                }).catch(function (error) {
                    if (error.message == 422) {
                        _this11.setState({
                            form: "message",
                            messageType: "red",
                            messageHeader: "Zaten şikayet edilmiş",
                            messageText: "Bu yorum için zaten henüz değerlendirilmemiş bir şikayetiniz mevcut"
                        });
                    }
                });
            }
        }
    }, {
        key: "changeOption",
        value: function changeOption(e) {
            this.setState({
                option: e.target.value
            });
            if (e.target.value) {
                this.setState({
                    selectOptionWarning: false
                });
            }
        }
    }, {
        key: "changeTextarea",
        value: function changeTextarea(e) {
            this.setState({
                reportText: e.target.value,
                reportTextSize: e.target.value.length
            });
            if (e.target.value.length > this.limitOfReportText) {
                this.setState({
                    reportTextLimitWarning: true
                });
            } else {
                this.setState({
                    reportTextLimitWarning: false
                });
            }
        }
    }, {
        key: "toggleHideComment",
        value: function toggleHideComment() {
            this.setState({
                hideComment: this.state.hideComment ? false : true
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
                                        React.createElement(H, { type: "3", text: "Geri Bildirim" })
                                    ),
                                    React.createElement(
                                        Column,
                                        null,
                                        React.createElement(
                                            FloatRight,
                                            null,
                                            React.createElement(CancelButton, { handleCancelButton: this.closeReportArea })
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
                                            { className: "ui yellow message" },
                                            React.createElement(
                                                "div",
                                                { className: "header" },
                                                "Bu yorum hakk\u0131nda geri bildirimde bulunuyorsunuz."
                                            ),
                                            React.createElement(
                                                "p",
                                                null,
                                                "\xC7ok fazla yanl\u0131\u015F geri bildirim yapman\u0131z halinde, ileride yapaca\u011F\u0131n\u0131z geri bildirimler dikkate al\u0131nmayabilir."
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
                                        React.createElement(ReportOptions, { handleChangeOption: this.changeOption, options: this.state.options, selected: this.state.option })
                                    )
                                ),
                                this.state.selectOptionWarning ? React.createElement(BasicMessage, { type: "warning", text: "\"Neden\" bo\u015F b\u0131rak\u0131lamaz!" }) : '',
                                React.createElement(
                                    Row,
                                    { size: "one" },
                                    React.createElement(
                                        Column,
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
                                                    "A\xE7\u0131klama"
                                                ),
                                                React.createElement("textarea", { rows: "2", onChange: this.changeTextarea, value: this.state.reportText })
                                            )
                                        )
                                    )
                                ),
                                this.state.reportTextLimitWarning ? React.createElement(BasicMessage, { type: "warning", text: "A\xE7\u0131klama bu kadar uzun olamaz!" }) : '',
                                React.createElement(
                                    Row,
                                    { size: "one" },
                                    React.createElement(
                                        Column,
                                        null,
                                        React.createElement(
                                            "div",
                                            { className: "field" },
                                            React.createElement(
                                                "div",
                                                { className: "ui checkbox" },
                                                React.createElement("input", { type: "checkbox", id: "hiddenCommentCheckbox", checked: this.state.hideComment, onChange: this.toggleHideComment }),
                                                React.createElement(
                                                    "label",
                                                    { "for": "hiddenCommentCheckbox" },
                                                    "Ayr\u0131ca bu yorumu gizle"
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
                                        React.createElement(
                                            FloatRight,
                                            null,
                                            React.createElement(
                                                "div",
                                                null,
                                                React.createElement(
                                                    "span",
                                                    { className: "report-text-count " },
                                                    this.state.reportTextSize,
                                                    "/200"
                                                ),
                                                React.createElement(
                                                    "button",
                                                    { className: this.state.reportTextLimitWarning ? "ui blue disabled button" : "ui blue button", onClick: this.sendReport },
                                                    "G\xF6nder"
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                );
            } else if (this.state.form == "loading") {
                return React.createElement(
                    "div",
                    null,
                    React.createElement(RowLoadingSpin, null)
                );
            } else if (this.state.form == "message") {
                return React.createElement(
                    Row,
                    { size: "one" },
                    React.createElement(
                        Column,
                        null,
                        React.createElement(
                            RaisedSegment,
                            null,
                            React.createElement(
                                "div",
                                { className: "ui " + this.state.messageType + " message" },
                                React.createElement(
                                    "div",
                                    { className: "header" },
                                    this.state.messageHeader
                                ),
                                React.createElement(
                                    "p",
                                    null,
                                    this.state.messageText
                                )
                            )
                        )
                    )
                );
            }
        }
    }]);

    return ReportArea;
}(React.Component);

var ReportOptions = function (_React$Component8) {
    _inherits(ReportOptions, _React$Component8);

    function ReportOptions(props) {
        _classCallCheck(this, ReportOptions);

        return _possibleConstructorReturn(this, (ReportOptions.__proto__ || Object.getPrototypeOf(ReportOptions)).call(this, props));
    }

    _createClass(ReportOptions, [{
        key: "render",
        value: function render() {
            var options = [];
            options.push(React.createElement(
                "option",
                { value: "-1", key: "-1" },
                "-- L\xFCtfen Se\xE7iniz --"
            ));
            for (var i = 0; i < this.props.options.length; i++) {
                options.push(React.createElement(
                    "option",
                    { value: this.props.options[i].id, key: this.props.options[i].id },
                    this.props.options[i].optionName
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
                            "Neden"
                        ),
                        React.createElement(
                            "select",
                            { onChange: this.props.handleChangeOption, value: this.props.option },
                            options
                        )
                    )
                )
            );
        }
    }]);

    return ReportOptions;
}(React.Component);

var Rating = function (_React$Component9) {
    _inherits(Rating, _React$Component9);

    function Rating(props) {
        _classCallCheck(this, Rating);

        return _possibleConstructorReturn(this, (Rating.__proto__ || Object.getPrototypeOf(Rating)).call(this, props));
    }

    _createClass(Rating, [{
        key: "render",
        value: function render() {
            this.ratingLines = [];
            var keys = Object.keys(this.props.tags);
            for (var i = 0; i < keys.length; i++) {
                var j = keys[i];
                this.ratingLines.push(React.createElement(RatingLine, {
                    key: j,
                    tagKey: this.props.tags[j].id,
                    tagName: this.props.tags[j].text,
                    tagSlug: this.props.tags[j].slug,
                    value: this.props.tags[j].value,
                    color: this.props.tags[j].color,
                    selectOption: this.props.selectOption
                }));
            }
            return React.createElement(
                Row,
                { size: "sixteen" },
                React.createElement(WideColumn, { size: "two" }),
                React.createElement(
                    WideColumn,
                    { size: "twelve" },
                    this.ratingLines
                )
            );
        }
    }]);

    return Rating;
}(React.Component);

var RatingLine = function (_React$Component10) {
    _inherits(RatingLine, _React$Component10);

    function RatingLine(props) {
        _classCallCheck(this, RatingLine);

        return _possibleConstructorReturn(this, (RatingLine.__proto__ || Object.getPrototypeOf(RatingLine)).call(this, props));
    }

    _createClass(RatingLine, [{
        key: "render",
        value: function render() {
            var _this15 = this;

            return React.createElement(
                Row,
                { size: "one" },
                React.createElement(
                    Column,
                    null,
                    React.createElement(
                        Row,
                        { size: "two" },
                        React.createElement(
                            Column,
                            null,
                            React.createElement(
                                Center,
                                null,
                                React.createElement(Tag, { key: this.props.tagKey, passive: false, text: this.props.tagName, color: this.props.color, rateValue: this.props.value })
                            )
                        ),
                        React.createElement(
                            Column,
                            null,
                            React.createElement(
                                Center,
                                null,
                                React.createElement(
                                    "div",
                                    { className: "ui form" },
                                    React.createElement(
                                        "div",
                                        { className: "field" },
                                        React.createElement(
                                            "select",
                                            { onChange: function onChange(e) {
                                                    return _this15.props.selectOption(e, _this15.props.tagSlug);
                                                }, value: this.props.value },
                                            React.createElement(
                                                "option",
                                                { value: "-" },
                                                "Se\xE7ilmemi\u015F"
                                            ),
                                            React.createElement(
                                                "option",
                                                { value: "1" },
                                                "1"
                                            ),
                                            React.createElement(
                                                "option",
                                                { value: "2" },
                                                "2"
                                            ),
                                            React.createElement(
                                                "option",
                                                { value: "3" },
                                                "3"
                                            ),
                                            React.createElement(
                                                "option",
                                                { value: "4" },
                                                "4"
                                            ),
                                            React.createElement(
                                                "option",
                                                { value: "5" },
                                                "5"
                                            ),
                                            React.createElement(
                                                "option",
                                                { value: "6" },
                                                "6"
                                            ),
                                            React.createElement(
                                                "option",
                                                { value: "7" },
                                                "7"
                                            ),
                                            React.createElement(
                                                "option",
                                                { value: "8" },
                                                "8"
                                            ),
                                            React.createElement(
                                                "option",
                                                { value: "9" },
                                                "9"
                                            ),
                                            React.createElement(
                                                "option",
                                                { value: "10" },
                                                "10"
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return RatingLine;
}(React.Component);

var EditArea = function (_React$Component11) {
    _inherits(EditArea, _React$Component11);

    function EditArea(props) {
        _classCallCheck(this, EditArea);

        var _this16 = _possibleConstructorReturn(this, (EditArea.__proto__ || Object.getPrototypeOf(EditArea)).call(this, props));

        _this16.state = {
            commentText: _this16.props.commentText,
            rating: _this16.props.rating,
            tags: _this16.mergeTagAndRating(),
            sendButtonState: _this16.props.commentText.length ? "" : "disabled",
            commentLimitWarning: false,
            messageVisible: false,
            messageType: "",
            messageHeader: "header",
            messageText: ""
        };
        _this16.showResponseMessage = _this16.showResponseMessage.bind(_this16);
        _this16.mergeTagAndRating = _this16.mergeTagAndRating.bind(_this16);
        _this16.changeComment = _this16.changeComment.bind(_this16);
        _this16.sendComment = _this16.sendComment.bind(_this16);
        _this16.selectOption = _this16.selectOption.bind(_this16);
        return _this16;
    }

    _createClass(EditArea, [{
        key: "showResponseMessage",
        value: function showResponseMessage(type, header, text) {
            this.setState({
                messageVisible: true,
                messageType: type,
                messageHeader: header,
                messageText: text
            });
        }
    }, {
        key: "mergeTagAndRating",
        value: function mergeTagAndRating() {
            var tags = {};
            for (var i = 0; i < this.props.tags.length; i++) {
                if (!this.props.tags[i].passive) {
                    tags[this.props.tags[i].slug] = {
                        slug: this.props.tags[i].slug,
                        text: this.props.tags[i].text,
                        color: getRatingColor('-'),
                        value: '-'
                    };
                }
            }
            // overwriting
            for (var _i = 0; _i < this.props.rating.length; _i++) {
                tags[this.props.rating[_i].slug].value = this.props.rating[_i].rateValue;
                tags[this.props.rating[_i].slug].color = getRatingColor(this.props.rating[_i].rateValue);
            }
            return tags;
        }
    }, {
        key: "changeComment",
        value: function changeComment(e) {
            var len = e.target.value.length;
            this.setState({
                commentText: e.target.value,
                sendButtonState: len > 0 && len <= 10000 ? "" : "disabled",
                commentLimitWarning: len > 10000 ? true : false
            });
        }
    }, {
        key: "sendComment",
        value: function sendComment() {
            var _this17 = this;

            if (this.props.newComment) {
                // new comment
                fetch(SITEURL + 'api/comment', {
                    method: 'POST',
                    header: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        productID: this.props.productID,
                        commentText: this.state.commentText,
                        rating: normalizer("rating", this.state.tags)
                    })
                }).then(function (response) {
                    if (!response.ok) throw new Error(response.status);else return response.json();
                }).then(function (json) {
                    _this17.props.reloadFunc();
                }).catch(function (error) {
                    if (error.message == 422) {
                        _this17.showResponseMessage("yellow", "422", "Her ürüne sadece bir kere yorum yapabilirsiniz");
                    } else if (error.message == 400) {
                        _this17.showResponseMessage("red", "400", "Geçersiz istek");
                    } else if (error.message = 403) {
                        _this17.showResponseMessage("red", "403", "Bu işlem için yetkiniz yok");
                    }
                });
            } else {
                if (this.props.setForm) {
                    this.props.setForm('loading');
                }
                // edit comment
                fetch(SITEURL + 'api/comment', {
                    method: 'PUT',
                    header: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        productID: this.props.productID,
                        commentText: this.state.commentText,
                        rating: normalizer("rating", this.state.tags)
                    })
                }).then(function (response) {
                    if (!response.ok) throw new Error(response.status);else return response.json();
                }).then(function (json) {
                    if (_this17.props.setForm) {
                        _this17.props.setForm('normal');
                    }
                    _this17.props.reloadFunc();
                }).catch(function (error) {
                    if (error.message == 422) {
                        _this17.showResponseMessage("yellow", "422", "Her ürüne sadece bir kere yorum yapabilirsiniz");
                    } else if (error.message == 400) {
                        _this17.showResponseMessage("red", "400", "Geçersiz istek");
                    } else if (error.message = 403) {
                        _this17.showResponseMessage("red", "403", "Bu işlem için yetkiniz yok");
                    }
                });
            }
        }
    }, {
        key: "selectOption",
        value: function selectOption(e, slug) {
            console.log(slug + " - " + e.target.value);
            var temp = this.state.tags;
            temp[slug].value = e.target.value;
            temp[slug].color = getRatingColor(e.target.value);
            this.setState({
                tags: temp
            });
        }
    }, {
        key: "render",
        value: function render() {
            this.title = this.props.newComment ? "Yorum Yaz" : "Düzenle";
            this.buttonName = this.props.newComment ? "Gönder" : "Düzenle";
            return React.createElement(
                Row,
                { size: "one" },
                React.createElement(
                    Column,
                    null,
                    null ? React.createElement(
                        Row,
                        { size: "one" },
                        React.createElement(
                            Column,
                            null,
                            React.createElement(BasicMessage, { type: this.state.topMessage.type, text: this.state.topMessage.text })
                        )
                    ) : "",
                    React.createElement(
                        RaisedSegment,
                        { otherClass: "comment" },
                        React.createElement(
                            Row,
                            { size: "two", nonStackable: true },
                            React.createElement(
                                Column,
                                null,
                                React.createElement(H, { type: "4", text: this.title, aOptional: "commentTitles" })
                            ),
                            React.createElement(
                                Column,
                                null,
                                !this.props.newComment ? React.createElement(
                                    FloatRight,
                                    null,
                                    React.createElement(CancelButton, { handleCancelButton: this.props.handleCancelButton })
                                ) : ""
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
                                    { className: "ui form" },
                                    React.createElement(
                                        "div",
                                        { className: "field" },
                                        React.createElement(
                                            "label",
                                            { className: "commentTitles" },
                                            "Yorumunuz"
                                        ),
                                        React.createElement("textarea", { value: this.state.commentText, onChange: this.changeComment, className: "editAreaTextarea" })
                                    )
                                )
                            )
                        ),
                        this.state.commentLimitWarning ? React.createElement(
                            Row,
                            { size: "one" },
                            React.createElement(
                                Column,
                                null,
                                React.createElement(BasicMessageWithColor, { color: "yellow", message: "Yorum bu kadar uzun olamaz" })
                            )
                        ) : "",
                        this.state.messageVisible ? React.createElement(
                            Row,
                            { size: "one" },
                            React.createElement(
                                Column,
                                null,
                                React.createElement(Message, { header: this.state.messageHeader, type: this.state.messageType, message: this.state.messageText })
                            )
                        ) : "",
                        React.createElement(
                            Row,
                            { size: "one" },
                            React.createElement(
                                Column,
                                null,
                                React.createElement(Rating, { tags: this.state.tags, selectOption: this.selectOption })
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
                                        "button",
                                        { className: "ui green " + this.state.sendButtonState + " button", onClick: this.sendComment },
                                        this.buttonName
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return EditArea;
}(React.Component);

var DeleteArea = function (_React$Component12) {
    _inherits(DeleteArea, _React$Component12);

    function DeleteArea(props) {
        _classCallCheck(this, DeleteArea);

        var _this18 = _possibleConstructorReturn(this, (DeleteArea.__proto__ || Object.getPrototypeOf(DeleteArea)).call(this, props));

        _this18.state = {
            form: "normal"
        };
        _this18.deleteComment = _this18.deleteComment.bind(_this18);
        return _this18;
    }

    _createClass(DeleteArea, [{
        key: "deleteComment",
        value: function deleteComment() {
            var _this19 = this;

            this.props.runBeforeDelete();
            fetch(SITEURL + 'api/comment', {
                method: 'DELETE',
                header: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productID: this.props.id
                })
            }).then(function (response) {
                if (!response.ok) throw new Error(response.status);else return response.json();
            }).then(function (json) {
                _this19.props.runAfterDelete();
                _this19.props.reloadFunc();
            }).catch(function (error) {
                if (error.message == 404) {
                    _this19.props.runAfterDelete();
                    _this19.props.reloadFunc();
                } else {
                    _this19.props.runAfterDelete();
                    _this19.props.reloadFunc();
                }
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                Row,
                { size: "one" },
                React.createElement(
                    Column,
                    null,
                    React.createElement(
                        RaisedSegment,
                        { otherClass: "comment" },
                        React.createElement(
                            Row,
                            { size: "one" },
                            React.createElement(
                                Column,
                                null,
                                React.createElement(BasicMessage, { type: "danger", text: "Yorumu kal\u0131c\u0131 olarak silmek istedi\u011Finizden emin misiniz?" })
                            )
                        ),
                        React.createElement(
                            Row,
                            { size: "two", nonStackable: true },
                            React.createElement(
                                Column,
                                null,
                                React.createElement(
                                    FloatRight,
                                    null,
                                    React.createElement(
                                        "button",
                                        { className: "ui green button", onClick: this.deleteComment },
                                        "Evet"
                                    )
                                )
                            ),
                            React.createElement(
                                Column,
                                null,
                                React.createElement(
                                    "button",
                                    { className: "ui red button", onClick: this.props.handleCancelButton },
                                    "Hay\u0131r"
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return DeleteArea;
}(React.Component);

var BottomComment = function (_React$Component13) {
    _inherits(BottomComment, _React$Component13);

    function BottomComment(props) {
        _classCallCheck(this, BottomComment);

        var _this20 = _possibleConstructorReturn(this, (BottomComment.__proto__ || Object.getPrototypeOf(BottomComment)).call(this, props));

        _this20.state = {
            topMessage: null,
            likeButtonDisabled: false,
            likeCount: _this20.props.ownComment ? _this20.props.ownComment.commentLikeCount : 0,
            liked: _this20.props.ownComment ? _this20.props.ownComment.liked : false
        };
        _this20.likeToggle = _this20.likeToggle.bind(_this20);
        return _this20;
    }

    _createClass(BottomComment, [{
        key: "likeToggle",
        value: function likeToggle() {
            var _this21 = this;

            if (isMember()) {
                this.make = this.state.liked ? false : true;
                this.setState({
                    likeButtonDisabled: true
                });
                fetch(SITEURL + 'api/likeComment', {
                    method: 'POST',
                    header: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        commentID: this.props.ownComment.commentID,
                        like: this.make
                    })
                }).then(function (response) {
                    if (!response.ok) throw new Error(response.status);else return response.json();
                }).then(function (json) {
                    _this21.setState({
                        likeButtonDisabled: false,
                        liked: _this21.make,
                        likeCount: json['other']['count']
                    });
                }).catch(function (error) {});
            } else {
                this.props.changeContent('giris-yap', true);
            }
        }
    }, {
        key: "render",
        value: function render() {
            if (this.props.form == "normal") {
                return React.createElement(
                    "div",
                    null,
                    this.state.topMessage ? React.createElement(
                        Row,
                        { size: "one" },
                        React.createElement(
                            Column,
                            null,
                            React.createElement(BasicMessage, { type: this.state.topMessage.type, text: this.state.topMessage.text })
                        )
                    ) : "",
                    React.createElement(
                        Row,
                        { size: "one" },
                        React.createElement(
                            Column,
                            null,
                            React.createElement(
                                RaisedSegment,
                                { otherClass: "comment" },
                                React.createElement(TopOfComment, {
                                    text: this.props.ownComment.commentText,
                                    slug: this.props.ownComment.owner.slug,
                                    title: this.props.ownComment.owner.username,
                                    owner: true,
                                    handleOpenEditArea: this.props.openEdit,
                                    handleOpenDeleteArea: this.props.openDelete,
                                    changeContent: this.props.changeContent,
                                    type: "profile",
                                    bottomComment: true,
                                    ownCommentPublished: this.props.ownCommentPublished
                                }),
                                React.createElement(BottomOfComment, {
                                    likeCount: this.state.likeCount,
                                    liked: this.state.liked,
                                    likeButtonDisabled: this.state.likeButtonDisabled,
                                    likeToggle: this.likeToggle,
                                    date: this.props.ownComment.commentCreateDateTime,
                                    lastEditDate: this.props.ownComment.commentLastEditDateTime,
                                    edited: this.props.ownComment.commentEdited,
                                    handleOpenReportArea: this.openReportArea,
                                    handleCloseReportArea: this.closeReportArea,
                                    tags: normalizer('comment-rating', this.props.ownComment.rating),
                                    owner: true,
                                    changeContent: this.props.changeContent,
                                    id: this.props.ownComment.id
                                })
                            )
                        )
                    )
                );
            } else if (this.props.form == "edit") {
                return React.createElement(EditArea, {
                    rating: normalizer('comment-rating', this.props.ownComment.rating),
                    tags: this.props.tags,
                    handleCancelButton: this.props.openNormal,
                    commentText: this.props.ownComment.commentText,
                    owner: true,
                    reloadFunc: this.props.reloadFunc,
                    productID: this.props.productID
                });
            } else if (this.props.form == "newComment") {
                return React.createElement(EditArea, {
                    tags: this.props.tags,
                    rating: [],
                    handleCancelButton: this.props.openNormal,
                    commentText: "",
                    owner: true,
                    reloadFunc: this.props.reloadFunc,
                    newComment: true,
                    productID: this.props.productID,
                    changeContent: this.props.changeContent
                });
            } else if (this.props.form == "hidden") {
                return "";
            } else if (this.props.form == "delete") {
                return React.createElement(DeleteArea, { handleCancelButton: this.props.openNormal, runBeforeDelete: this.props.openLoadingSpin, runAfterDelete: this.props.hide, reloadFunc: this.props.reloadFunc, id: this.props.productID });
            } else if (this.props.form == "loading") {
                return React.createElement(RowLoadingSpin, null);
            }
        }
    }]);

    return BottomComment;
}(React.Component);

var Comments = function (_React$Component14) {
    _inherits(Comments, _React$Component14);

    function Comments(props) {
        _classCallCheck(this, Comments);

        return _possibleConstructorReturn(this, (Comments.__proto__ || Object.getPrototypeOf(Comments)).call(this, props));
    }

    _createClass(Comments, [{
        key: "render",
        value: function render() {
            if (this.props.form == "normal") {
                this.comments = [];
                for (var i = 0; i < this.props.comments.length; i++) {
                    var com = this.props.comments[i];
                    this.comments.push(React.createElement(Comment, {
                        productID: this.props.productID,
                        changeContent: this.props.changeContent,
                        reloadFunc: this.props.reloadFunc,
                        tags: this.props.tags,
                        key: com.id,
                        id: com.id,
                        text: com.text,
                        type: com.type,
                        slug: com.slug,
                        likeCount: com.likeCount,
                        liked: com.liked,
                        title: com.title,
                        date: com.date,
                        lastEditDate: com.lastEditDate,
                        edited: com.edited,
                        rating: com.rating,
                        owner: com.owner,
                        reported: com.reported,
                        hidden: com.hidden
                    }));
                }
                return React.createElement(
                    "div",
                    null,
                    this.comments
                );
            } else if (this.props.form == "loading") {
                return React.createElement(RowLoadingSpin, { nonSegment: true });
            } else if (this.props.form == "noComment") {
                return React.createElement(
                    Row,
                    { size: "one" },
                    React.createElement(
                        Column,
                        null,
                        React.createElement(
                            "div",
                            { "class": "ui big yellow message" },
                            "Yorum yok, ilk yorum senden olsun!"
                        )
                    )
                );
            }
        }
    }]);

    return Comments;
}(React.Component);