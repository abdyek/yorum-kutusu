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
            reportArea: false
        };
        _this.openReportArea = _this.openReportArea.bind(_this);;
        _this.closeReportArea = _this.closeReportArea.bind(_this);;
        return _this;
    }

    _createClass(Comment, [{
        key: "openReportArea",
        value: function openReportArea() {
            this.setState({
                reportArea: true
            });
        }
    }, {
        key: "closeReportArea",
        value: function closeReportArea() {
            this.setState({
                reportArea: false
            });
        }
    }, {
        key: "render",
        value: function render() {
            if (!this.state.reportArea) {
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
                                Segment,
                                null,
                                React.createElement(TopOfComment, { text: this.props.text, title: this.props.title, owner: this.props.owner }),
                                React.createElement(BottomOfComment, { likeCount: this.props.likeCount, liked: this.props.liked, date: this.props.date, handleOpenReportArea: this.openReportArea, handleCloseReportArea: this.closeReportArea, tags: this.props.tags })
                            )
                        )
                    )
                );
            } else {
                return React.createElement(ReportArea, { handleCloseReportArea: this.closeReportArea });
            }
        }
    }]);

    return Comment;
}(React.Component);

var TopOfComment = function (_React$Component2) {
    _inherits(TopOfComment, _React$Component2);

    function TopOfComment() {
        _classCallCheck(this, TopOfComment);

        return _possibleConstructorReturn(this, (TopOfComment.__proto__ || Object.getPrototypeOf(TopOfComment)).apply(this, arguments));
    }

    _createClass(TopOfComment, [{
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
                                    { className: "ui icon teal button" },
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
                                React.createElement(ReportButton, { handleOpenReportArea: this.props.handleOpenReportArea })
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
                { className: "ui icon button", onClick: this.openReportArea },
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
                                            React.createElement(
                                                "button",
                                                { className: "ui icon red button", onClick: this.closeReportArea },
                                                React.createElement(
                                                    "i",
                                                    { className: "icon" },
                                                    React.createElement("i", { className: "fa fa-times", "aria-hidden": "true" })
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