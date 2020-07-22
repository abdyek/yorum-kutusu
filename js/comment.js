var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CancelButton = function (_React$Component) {
    _inherits(CancelButton, _React$Component);

    function CancelButton(props) {
        _classCallCheck(this, CancelButton);

        var _this = _possibleConstructorReturn(this, (CancelButton.__proto__ || Object.getPrototypeOf(CancelButton)).call(this, props));

        _this.closeFunc = _this.closeFunc.bind(_this);
        return _this;
    }

    _createClass(CancelButton, [{
        key: "closeFunc",
        value: function closeFunc() {
            this.props.handleCancelButton();
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "button",
                { className: "ui icon red button", onClick: this.closeFunc },
                React.createElement(
                    "i",
                    { className: "icon" },
                    React.createElement("i", { className: "fa fa-times", "aria-hidden": "true" })
                )
            );
        }
    }]);

    return CancelButton;
}(React.Component);

var Comment = function (_React$Component2) {
    _inherits(Comment, _React$Component2);

    function Comment(props) {
        _classCallCheck(this, Comment);

        var _this2 = _possibleConstructorReturn(this, (Comment.__proto__ || Object.getPrototypeOf(Comment)).call(this, props));

        _this2.state = {
            // normal, report, edit, delete
            form: "normal"
        };
        _this2.openReportArea = _this2.openReportArea.bind(_this2);
        _this2.closeReportArea = _this2.closeReportArea.bind(_this2);
        _this2.openEditArea = _this2.openEditArea.bind(_this2);
        _this2.closeEditArea = _this2.closeEditArea.bind(_this2);
        return _this2;
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
                form: "edit"
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
                                React.createElement(TopOfComment, { text: this.props.text, title: this.props.title, owner: this.props.owner, handleOpenEditArea: this.openEditArea }),
                                React.createElement(BottomOfComment, { likeCount: this.props.likeCount, liked: this.props.liked, date: this.props.date, handleOpenReportArea: this.openReportArea, handleCloseReportArea: this.closeReportArea, tags: this.props.tags, owner: this.props.owner })
                            )
                        )
                    )
                );
            } else if (this.state.form == "report") {
                return React.createElement(ReportArea, { handleCloseReportArea: this.closeReportArea });
            } else if (this.state.form == "edit") {
                return React.createElement(EditArea, { tags: this.props.tags, handleCancelButton: this.closeEditArea, commentText: this.props.text, owner: this.props.owner });
            }
        }
    }]);

    return Comment;
}(React.Component);

var TopOfComment = function (_React$Component3) {
    _inherits(TopOfComment, _React$Component3);

    function TopOfComment(props) {
        _classCallCheck(this, TopOfComment);

        var _this3 = _possibleConstructorReturn(this, (TopOfComment.__proto__ || Object.getPrototypeOf(TopOfComment)).call(this, props));

        _this3.openEditArea = _this3.openEditArea.bind(_this3);
        return _this3;
    }

    _createClass(TopOfComment, [{
        key: "openEditArea",
        value: function openEditArea() {
            this.props.handleOpenEditArea();
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
                                    { className: "ui icon orange button" },
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
                        React.createElement(
                            Center,
                            null,
                            React.createElement(Tags, { tags: this.props.tags, activeOnly: true })
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

var LikeButton = function (_React$Component5) {
    _inherits(LikeButton, _React$Component5);

    function LikeButton(props) {
        _classCallCheck(this, LikeButton);

        var _this5 = _possibleConstructorReturn(this, (LikeButton.__proto__ || Object.getPrototypeOf(LikeButton)).call(this, props));

        _this5.state = {
            liked: _this5.props.liked,
            likeCount: _this5.props.likeCount
        };
        _this5.like = _this5.like.bind(_this5);
        return _this5;
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

var ReportButton = function (_React$Component6) {
    _inherits(ReportButton, _React$Component6);

    function ReportButton(props) {
        _classCallCheck(this, ReportButton);

        var _this6 = _possibleConstructorReturn(this, (ReportButton.__proto__ || Object.getPrototypeOf(ReportButton)).call(this, props));

        _this6.openReportArea = _this6.openReportArea.bind(_this6);
        _this6.buttonClass = _this6.props.disabled ? "ui icon disabled button" : "ui icon button";
        return _this6;
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

var ReportArea = function (_React$Component7) {
    _inherits(ReportArea, _React$Component7);

    function ReportArea(props) {
        _classCallCheck(this, ReportArea);

        var _this7 = _possibleConstructorReturn(this, (ReportArea.__proto__ || Object.getPrototypeOf(ReportArea)).call(this, props));

        _this7.limitOfReportText = 200;
        _this7.state = {
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
        _this7.closeReportArea = _this7.closeReportArea.bind(_this7);
        _this7.sendReport = _this7.sendReport.bind(_this7);
        _this7.changeReason = _this7.changeReason.bind(_this7);
        _this7.changeTextarea = _this7.changeTextarea.bind(_this7);
        return _this7;
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
                                this.state.selectOptionWarning ? React.createElement(BasicMessage, { messageType: "warning", text: "'Neden' bo\u015F b\u0131rak\u0131lamaz!" }) : '',
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
                                this.state.reportTextLimitWarning ? React.createElement(BasicMessage, { messageType: "warning", text: "A\xE7\u0131klama bu kadar uzun olamaz!" }) : '',
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

var ReportReason = function (_React$Component8) {
    _inherits(ReportReason, _React$Component8);

    function ReportReason(props) {
        _classCallCheck(this, ReportReason);

        var _this8 = _possibleConstructorReturn(this, (ReportReason.__proto__ || Object.getPrototypeOf(ReportReason)).call(this, props));

        _this8.changeReason = _this8.changeReason.bind(_this8);
        return _this8;
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

var Reported = function (_React$Component9) {
    _inherits(Reported, _React$Component9);

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
                                    React.createElement(BasicMessage, { messageType: this.props.messageType, text: this.props.text })
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

var WriteComment = function (_React$Component10) {
    _inherits(WriteComment, _React$Component10);

    function WriteComment(props) {
        _classCallCheck(this, WriteComment);

        var _this10 = _possibleConstructorReturn(this, (WriteComment.__proto__ || Object.getPrototypeOf(WriteComment)).call(this, props));

        if (_this10.props.forEdit) {
            _this10.var = {
                title: "Yorum Düzenle",
                buttonName: "Düzenle",
                buttonClassName: "ui green button"
            };
        } else {
            _this10.var = {
                title: "Yorum Yaz",
                buttonName: "Gönder",
                buttonClassName: "ui green disabled button"
            };
        }
        _this10.state = {
            // normal, loading, sent
            form: "normal",
            messageType: "success", // success, warning, danger
            messageText: "mahmutcan",
            commentText: _this10.props.commentText,
            sendButtonClassName: _this10.var.buttonClassName
        };
        _this10.sendComment = _this10.sendComment.bind(_this10);
        _this10.changeComment = _this10.changeComment.bind(_this10);
        return _this10;
    }

    _createClass(WriteComment, [{
        key: "sendComment",
        value: function sendComment() {
            this.setState({
                form: "loading"
            });
            // gerekli API işlemleri buraya yapılacak
            // yorum düzenleme de buradan gönderileceği için, düzenleme mi yoksa yeni yorum gönderme mi kontrolleri burada yaparım
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
        key: "render",
        value: function render() {
            if (this.state.form == "normal") {
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
                return React.createElement(
                    Row,
                    { size: "one" },
                    React.createElement(
                        Column,
                        null,
                        React.createElement(BasicMessage, { messageType: this.state.messageType, text: this.state.messageText })
                    )
                );
            }
        }
    }]);

    return WriteComment;
}(React.Component);

var Rating = function (_React$Component11) {
    _inherits(Rating, _React$Component11);

    function Rating(props) {
        _classCallCheck(this, Rating);

        var _this11 = _possibleConstructorReturn(this, (Rating.__proto__ || Object.getPrototypeOf(Rating)).call(this, props));

        _this11.ratingLines = [];
        for (var i = 0; i < _this11.props.tags.length; i++) {
            if (!_this11.props.tags[i].passive) {
                _this11.ratingLines.push(React.createElement(RatingLine, { key: _this11.props.tags[i].id, tagKey: _this11.props.tags[i].id, tagName: _this11.props.tags[i].text, forEdit: _this11.props.forEdit, rateValue: _this11.props.tags[i].rateValue }));
            }
        }
        return _this11;
    }

    _createClass(Rating, [{
        key: "render",
        value: function render() {
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

var RatingLine = function (_React$Component12) {
    _inherits(RatingLine, _React$Component12);

    function RatingLine(props) {
        _classCallCheck(this, RatingLine);

        var _this12 = _possibleConstructorReturn(this, (RatingLine.__proto__ || Object.getPrototypeOf(RatingLine)).call(this, props));

        _this12.rateValue = _this12.props.forEdit ? _this12.props.rateValue : "-";
        _this12.colors = {
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
        _this12.state = {
            rateValue: _this12.rateValue,
            color: _this12.colors[_this12.rateValue]
        };
        _this12.selectOption = _this12.selectOption.bind(_this12);
        return _this12;
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

var EditArea = function (_React$Component13) {
    _inherits(EditArea, _React$Component13);

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