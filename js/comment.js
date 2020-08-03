var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Comment = function (_React$Component) {
    _inherits(Comment, _React$Component);

    function Comment(props) {
        _classCallCheck(this, Comment);

        var _this = _possibleConstructorReturn(this, (Comment.__proto__ || Object.getPrototypeOf(Comment)).call(this, props));

        _this.state = {
            // normal, report, edit, delete, message, loading
            form: "normal",
            topMessage: _this.props.topMessage,
            message: _this.props.message
        };
        _this.openReportArea = _this.openReportArea.bind(_this);
        _this.closeReportArea = _this.closeReportArea.bind(_this);
        _this.openEditArea = _this.openEditArea.bind(_this);
        _this.closeEditArea = _this.closeEditArea.bind(_this);
        _this.openDeleteArea = _this.openDeleteArea.bind(_this);
        _this.closeDeleteArea = _this.closeDeleteArea.bind(_this);
        _this.confirmDelete = _this.confirmDelete.bind(_this);
        return _this;
    }

    _createClass(Comment, [{
        key: "openReportArea",
        value: function openReportArea() {
            this.setState({
                form: "report"
            });
        }
    }, {
        key: "closeReportArea",
        value: function closeReportArea() {
            this.setState({
                form: "normal"
            });
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
            this.setState({
                form: "normal"
            });
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
        key: "confirmDelete",
        value: function confirmDelete() {
            this.setState({
                form: "loading"
            });
            setTimeout(function () {
                this.setState({
                    form: "message",
                    message: {
                        messageType: "success",
                        messageText: "Başarılı bir şekilde yorumunuz kaldırıldı"
                    }
                });
            }.bind(this), 1000);
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
                                null,
                                React.createElement(TopOfComment, { text: this.props.text, title: this.props.title, owner: this.props.owner, handleOpenEditArea: this.openEditArea, handleOpenDeleteArea: this.openDeleteArea }),
                                React.createElement(BottomOfComment, { likeCount: this.props.likeCount, liked: this.props.liked, date: this.props.date, handleOpenReportArea: this.openReportArea, handleCloseReportArea: this.closeReportArea, tags: this.props.tags, owner: this.props.owner })
                            )
                        )
                    )
                );
            } else if (this.state.form == "report") {
                return React.createElement(ReportArea, { handleCloseReportArea: this.closeReportArea });
            } else if (this.state.form == "edit") {
                return React.createElement(EditArea, { tags: this.props.tags, handleCancelButton: this.closeEditArea, commentText: this.props.text, owner: this.props.owner });
            } else if (this.state.form == "delete") {
                return React.createElement(DeleteArea, { handleCancelButton: this.closeDeleteArea, handleConfirmButton: this.confirmDelete });
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
            }
        }
    }]);

    return Comment;
}(React.Component);

var TopOfComment = function (_React$Component2) {
    _inherits(TopOfComment, _React$Component2);

    function TopOfComment(props) {
        _classCallCheck(this, TopOfComment);

        var _this2 = _possibleConstructorReturn(this, (TopOfComment.__proto__ || Object.getPrototypeOf(TopOfComment)).call(this, props));

        _this2.openEditArea = _this2.openEditArea.bind(_this2);
        _this2.openDeleteArea = _this2.openDeleteArea.bind(_this2);
        return _this2;
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
        key: "render",
        value: function render() {
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
                            { className: "user-name" },
                            React.createElement(H, { type: "3", text: this.props.title })
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
                                    "D\xFCzenle"
                                ),
                                React.createElement(
                                    "button",
                                    { className: "ui icon orange button", onClick: this.openDeleteArea },
                                    React.createElement(
                                        "i",
                                        { className: "icon" },
                                        React.createElement("i", { className: "fa fa-trash", "aria-hidden": "true" })
                                    ),
                                    "Sil"
                                )
                            ) : ""
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
                            { className: "comment-text" },
                            this.props.text
                        )
                    )
                )
            );
        }
    }]);

    return TopOfComment;
}(React.Component);

var BottomOfComment = function (_React$Component3) {
    _inherits(BottomOfComment, _React$Component3);

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
                        React.createElement(Tags, { tags: this.props.tags, activeOnly: true })
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
                                { className: "comment-date" },
                                this.props.date
                            )
                        )
                    )
                ),
                React.createElement(
                    Row,
                    { size: "one", nonStackable: true },
                    React.createElement(
                        Column,
                        null,
                        React.createElement(
                            FloatRight,
                            null,
                            React.createElement(
                                "div",
                                null,
                                React.createElement(LikeButton, { likeCount: this.props.likeCount, liked: this.props.liked }),
                                React.createElement(ReportButton, { handleOpenReportArea: this.props.handleOpenReportArea, disabled: this.props.owner })
                            )
                        )
                    )
                )
            );
        }
    }]);

    return BottomOfComment;
}(React.Component);

var LikeButton = function (_React$Component4) {
    _inherits(LikeButton, _React$Component4);

    function LikeButton(props) {
        _classCallCheck(this, LikeButton);

        var _this4 = _possibleConstructorReturn(this, (LikeButton.__proto__ || Object.getPrototypeOf(LikeButton)).call(this, props));

        _this4.state = {
            liked: _this4.props.liked,
            likeCount: _this4.props.likeCount
        };
        _this4.like = _this4.like.bind(_this4);
        return _this4;
    }

    _createClass(LikeButton, [{
        key: "like",
        value: function like() {
            var likeCount = this.state.likeCount;
            if (this.state.liked) {
                likeCount--;
                this.setState({
                    liked: false,
                    likeCount: likeCount
                });
            } else {
                likeCount++;
                this.setState({
                    liked: true,
                    likeCount: likeCount
                });
            }
        }
    }, {
        key: "render",
        value: function render() {
            this.buttonClass = this.state.liked ? "ui blue button" : "ui button";
            return React.createElement(
                "button",
                { className: this.buttonClass, onClick: this.like },
                React.createElement(
                    "i",
                    { className: "icon" },
                    React.createElement("i", { className: "fa fa-thumbs-up", "aria-hidden": "true" })
                ),
                this.state.likeCount
            );
        }
    }]);

    return LikeButton;
}(React.Component);

var ReportButton = function (_React$Component5) {
    _inherits(ReportButton, _React$Component5);

    function ReportButton(props) {
        _classCallCheck(this, ReportButton);

        var _this5 = _possibleConstructorReturn(this, (ReportButton.__proto__ || Object.getPrototypeOf(ReportButton)).call(this, props));

        _this5.openReportArea = _this5.openReportArea.bind(_this5);
        _this5.buttonClass = _this5.props.disabled ? "ui icon disabled button" : "ui icon button";
        return _this5;
    }

    _createClass(ReportButton, [{
        key: "openReportArea",
        value: function openReportArea() {
            this.props.handleOpenReportArea();
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

var ReportArea = function (_React$Component6) {
    _inherits(ReportArea, _React$Component6);

    function ReportArea(props) {
        _classCallCheck(this, ReportArea);

        var _this6 = _possibleConstructorReturn(this, (ReportArea.__proto__ || Object.getPrototypeOf(ReportArea)).call(this, props));

        _this6.limitOfReportText = 200;
        _this6.state = {
            // normal, loading, reported
            form: "normal",
            messageType: "success", // success, warning, danger
            messageText: "",
            selectOptionWarning: false,
            reason: 0,
            reportText: '',
            reportTextSize: 0,
            reportTextLimitWarning: false
        };
        _this6.closeReportArea = _this6.closeReportArea.bind(_this6);
        _this6.sendReport = _this6.sendReport.bind(_this6);
        _this6.changeReason = _this6.changeReason.bind(_this6);
        _this6.changeTextarea = _this6.changeTextarea.bind(_this6);
        return _this6;
    }

    _createClass(ReportArea, [{
        key: "closeReportArea",
        value: function closeReportArea() {
            this.props.handleCloseReportArea();
        }
    }, {
        key: "sendReport",
        value: function sendReport() {
            if (this.state.reason == 0) {
                this.setState({
                    selectOptionWarning: true
                });
            } else {
                this.setState({
                    form: "loading"
                });
            }
            // burada API'ye gönderme şeyleri de olacak
        }
    }, {
        key: "changeReason",
        value: function changeReason(e) {
            this.setState({
                reason: e.target.value
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
                                                "Bildirimin as\u0131ls\u0131z olmas\u0131 durumunda size olan g\xFCvenimizin azalaca\u011F\u0131n\u0131 unutmay\u0131n."
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
                                        React.createElement(ReportReason, { handleChangeReason: this.changeReason, reasons: [{
                                                key: 0,
                                                value: " -- Lütfen birini seçin -- "
                                            }, {
                                                key: 1,
                                                value: "Hakaret"
                                            }, {
                                                key: 2,
                                                value: "Siyasi içerik"
                                            }, {
                                                key: 3,
                                                value: "Uygunsuz Kullanıcı Adı"
                                            }] })
                                    )
                                ),
                                this.state.selectOptionWarning ? React.createElement(BasicMessage, { type: "warning", text: "'Neden' bo\u015F b\u0131rak\u0131lamaz!" }) : '',
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
            } else if (this.state.form == "reported") {
                return React.createElement(Reported, { messageType: this.state.messageType, text: this.state.messageText });
            }
        }
    }]);

    return ReportArea;
}(React.Component);

var ReportReason = function (_React$Component7) {
    _inherits(ReportReason, _React$Component7);

    function ReportReason(props) {
        _classCallCheck(this, ReportReason);

        var _this7 = _possibleConstructorReturn(this, (ReportReason.__proto__ || Object.getPrototypeOf(ReportReason)).call(this, props));

        _this7.changeReason = _this7.changeReason.bind(_this7);
        return _this7;
    }

    _createClass(ReportReason, [{
        key: "changeReason",
        value: function changeReason(e) {
            this.props.handleChangeReason(e);
        }
    }, {
        key: "render",
        value: function render() {
            var options = [];
            for (var i = 0; i < this.props.reasons.length; i++) {
                options.push(React.createElement(
                    "option",
                    { value: i, key: this.props.reasons[i].key },
                    this.props.reasons[i].value
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
                            { onChange: this.changeReason },
                            options
                        )
                    )
                )
            );
        }
    }]);

    return ReportReason;
}(React.Component);

var Reported = function (_React$Component8) {
    _inherits(Reported, _React$Component8);

    function Reported() {
        _classCallCheck(this, Reported);

        return _possibleConstructorReturn(this, (Reported.__proto__ || Object.getPrototypeOf(Reported)).apply(this, arguments));
    }

    _createClass(Reported, [{
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
                            RaisedSegment,
                            null,
                            React.createElement(
                                Row,
                                { size: "one" },
                                React.createElement(
                                    Column,
                                    null,
                                    React.createElement(BasicMessage, { type: this.props.messageType, text: this.props.text })
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Reported;
}(React.Component);

var WriteComment = function (_React$Component9) {
    _inherits(WriteComment, _React$Component9);

    function WriteComment(props) {
        _classCallCheck(this, WriteComment);

        var _this9 = _possibleConstructorReturn(this, (WriteComment.__proto__ || Object.getPrototypeOf(WriteComment)).call(this, props));

        if (_this9.props.forEdit) {
            _this9.var = {
                title: "Yorum Düzenle",
                buttonName: "Düzenle",
                buttonClassName: "ui green button"
            };
        } else {
            _this9.var = {
                title: "Yorum Yaz",
                buttonName: "Gönder",
                buttonClassName: "ui green disabled button"
            };
        }
        _this9.state = {
            // normal, loading, sent
            form: "normal",
            messageType: "success", // success, warning, danger
            messageText: "bu neyin mesajı bilmiyorum",
            message: {
                type: "success",
                text: "başarılı bir message"
            },
            commentText: _this9.props.commentText,
            sendButtonClassName: _this9.var.buttonClassName,
            topMessage: {
                type: null,
                text: null
            }
        };
        _this9.sendComment = _this9.sendComment.bind(_this9);
        _this9.changeComment = _this9.changeComment.bind(_this9);
        _this9.showTopMessage = _this9.showTopMessage.bind(_this9);
        return _this9;
    }

    _createClass(WriteComment, [{
        key: "sendComment",
        value: function sendComment() {
            //this.setState({
            //form:"loading"
            //});
            // gerekli API işlemleri buraya yapılacak
            // yorum düzenleme de buradan gönderileceği için, düzenleme mi yoksa yeni yorum gönderme mi kontrolleri burada yaparım
            //if(this.props.forEdit) {
            // başarılı olması durumunda edited 'e çeviricez
            //setTimeout(function() {
            //this.setState({
            //form:"edited"
            //})
            //}.bind(this), 1000);
            //}
            // başarısız olma durumunda kullanılabilecek bir üst mesaj
            this.showTopMessage("success", "başarılı bir şekilde yorumunuz gönderildi");
            this.setState({
                form: "sent"
            });
            /*
            this.setState({
                form:"sent",
                message: {
                    type:"warning",
                    text:"hata hata!!"
                }
            });
            */
        }
    }, {
        key: "changeComment",
        value: function changeComment(e) {
            if (!e.target.value.length) {
                this.setState({
                    sendButtonClassName: "ui green disabled button"
                });
            } else {
                this.setState({
                    sendButtonClassName: "ui green button"
                });
            }
            this.setState({
                commentText: e.target.value
            });
        }
    }, {
        key: "showTopMessage",
        value: function showTopMessage(type, text) {
            var topMessage = {
                type: type,
                text: text
            };
            this.setState({
                topMessage: topMessage
            });
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.form == "normal") {
                return React.createElement(
                    Row,
                    { size: "one" },
                    React.createElement(
                        Column,
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
                            RaisedSegment,
                            null,
                            React.createElement(
                                Row,
                                { size: "two", nonStackable: true },
                                React.createElement(
                                    Column,
                                    null,
                                    React.createElement(H, { type: "4", text: this.var.title })
                                ),
                                React.createElement(
                                    Column,
                                    null,
                                    this.props.forEdit ? React.createElement(
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
                                                null,
                                                "Yorumunuz"
                                            ),
                                            React.createElement("textarea", { value: this.state.commentText, onChange: this.changeComment })
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
                                    React.createElement(Rating, { tags: this.props.tags, forEdit: this.props.forEdit })
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
                                            { className: this.state.sendButtonClassName, onClick: this.sendComment },
                                            this.var.buttonName
                                        )
                                    )
                                )
                            )
                        )
                    )
                );
            } else if (this.state.form == "loading") {
                return React.createElement(RowLoadingSpin, null);
            } else if (this.state.form == "sent") {
                return (
                    // bu kısım başarılı olması durumunda gösterilecek
                    // API ile konuşturan yunus emre'ye not: buradaki Comment componentinin özelliklerini WriteComment'in state'i üzerinde tuttuğun API reponse'u değerleri
                    // üzerinden dolduracaksın
                    React.createElement(Comment, { text: this.state.commentText,
                        likeCount: "0",
                        liked: false,
                        title: "Buraya kullan\u0131c\u0131 ad\u0131 gelecek",
                        date: "19 Temmuz - 21:45",
                        tags: [{
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
                        owner: true,
                        topMessage: {
                            type: this.state.topMessage.type,
                            text: this.state.topMessage.text
                        }
                    })
                );
            }
        }
    }]);

    return WriteComment;
}(React.Component);

var Rating = function (_React$Component10) {
    _inherits(Rating, _React$Component10);

    function Rating(props) {
        _classCallCheck(this, Rating);

        return _possibleConstructorReturn(this, (Rating.__proto__ || Object.getPrototypeOf(Rating)).call(this, props));
    }

    _createClass(Rating, [{
        key: "render",
        value: function render() {
            this.ratingLines = [];
            var keyArr = Object.keys(this.props.tags);
            for (var i = 0; i < keyArr.length; i++) {
                if (!this.props.tags[keyArr[i]].passive) {
                    this.ratingLines.push(React.createElement(RatingLine, { key: keyArr[i], tagKey: this.props.tags[keyArr[i]].id, tagName: this.props.tags[keyArr[i]].text, forEdit: this.props.forEdit, rateValue: this.props.tags[keyArr[i]].rateValue }));
                }
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

var RatingLine = function (_React$Component11) {
    _inherits(RatingLine, _React$Component11);

    function RatingLine(props) {
        _classCallCheck(this, RatingLine);

        var _this11 = _possibleConstructorReturn(this, (RatingLine.__proto__ || Object.getPrototypeOf(RatingLine)).call(this, props));

        _this11.rateValue = _this11.props.forEdit ? _this11.props.rateValue : "-";
        _this11.colors = {
            "-": "",
            1: "red",
            2: "red",
            3: "orange",
            4: "orange",
            5: "yellow",
            6: "yellow",
            7: "teal",
            8: "teal",
            9: "blue",
            10: "blue"
        };
        _this11.state = {
            rateValue: _this11.rateValue,
            color: _this11.colors[_this11.rateValue]
        };
        _this11.selectOption = _this11.selectOption.bind(_this11);
        return _this11;
    }

    _createClass(RatingLine, [{
        key: "selectOption",
        value: function selectOption(e) {
            this.setState({
                rateValue: e.target.value,
                color: this.colors[e.target.value]
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
                        Row,
                        { size: "two" },
                        React.createElement(
                            Column,
                            null,
                            React.createElement(
                                Center,
                                null,
                                React.createElement(Tag, { key: this.props.tagKey, passive: false, text: this.props.tagName, color: this.state.color, rateValue: this.state.rateValue })
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
                                            { onChange: this.selectOption },
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

var EditArea = function (_React$Component12) {
    _inherits(EditArea, _React$Component12);

    function EditArea(props) {
        _classCallCheck(this, EditArea);

        return _possibleConstructorReturn(this, (EditArea.__proto__ || Object.getPrototypeOf(EditArea)).call(this, props));
    }

    _createClass(EditArea, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(WriteComment, { tags: this.props.tags, forEdit: true, commentText: this.props.commentText, handleCancelButton: this.props.handleCancelButton })
            );
        }
    }]);

    return EditArea;
}(React.Component);

var DeleteArea = function (_React$Component13) {
    _inherits(DeleteArea, _React$Component13);

    function DeleteArea(props) {
        _classCallCheck(this, DeleteArea);

        var _this13 = _possibleConstructorReturn(this, (DeleteArea.__proto__ || Object.getPrototypeOf(DeleteArea)).call(this, props));

        _this13.cancelFunc = _this13.cancelFunc.bind(_this13);
        _this13.confirmFunc = _this13.confirmFunc.bind(_this13);
        return _this13;
    }

    _createClass(DeleteArea, [{
        key: "confirmFunc",
        value: function confirmFunc() {
            this.props.handleConfirmButton();
        }
    }, {
        key: "cancelFunc",
        value: function cancelFunc() {
            this.props.handleCancelButton();
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
                        null,
                        React.createElement(
                            Row,
                            { size: "one" },
                            React.createElement(
                                Column,
                                null,
                                React.createElement(BasicMessage, { type: "danger", text: "Bu yorumu kal\u0131c\u0131 olarak silmek istedi\u011Finizden emin misiniz?" })
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
                                        { className: "ui green button", onClick: this.confirmFunc },
                                        "Evet"
                                    )
                                )
                            ),
                            React.createElement(
                                Column,
                                null,
                                React.createElement(
                                    "button",
                                    { className: "ui red button", onClick: this.cancelFunc },
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