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
        _this.state = {
            // normal, report, edit, delete, message, loading, newComment
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
        _this.confirmDelete = _this.confirmDelete.bind(_this);
        _this.setForm = _this.setForm.bind(_this);
        return _this;
    }

    _createClass(Comment, [{
        key: 'likeToggle',
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
        key: 'openReportArea',
        value: function openReportArea() {
            this.setForm("report");
        }
    }, {
        key: 'closeReportArea',
        value: function closeReportArea() {
            this.setForm("normal");
        }
    }, {
        key: 'openEditArea',
        value: function openEditArea() {
            this.setState({
                form: "edit",
                topMessage: null
            });
        }
    }, {
        key: 'closeEditArea',
        value: function closeEditArea() {
            this.setForm("normal");
        }
    }, {
        key: 'openDeleteArea',
        value: function openDeleteArea() {
            this.setState({
                form: "delete",
                topMessage: null
            });
        }
    }, {
        key: 'closeDeleteArea',
        value: function closeDeleteArea() {
            this.setState({
                form: "normal"
            });
        }
    }, {
        key: 'confirmDelete',
        value: function confirmDelete() {
            this.setForm("loading");
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
        key: 'setForm',
        value: function setForm(formType) {
            this.setState({
                form: formType
            });
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.state.form == "normal") {
                return React.createElement(
                    'div',
                    null,
                    this.state.topMessage ? React.createElement(
                        Row,
                        { size: 'one' },
                        React.createElement(
                            Column,
                            null,
                            React.createElement(BasicMessage, { type: this.state.topMessage.type, text: this.state.topMessage.text })
                        )
                    ) : "",
                    React.createElement(
                        Row,
                        { size: 'one' },
                        React.createElement(
                            Column,
                            null,
                            React.createElement(
                                RaisedSegment,
                                { otherClass: 'comment' },
                                React.createElement(TopOfComment, { text: this.props.text, slug: this.props.slug, title: this.props.title, owner: this.props.owner, handleOpenEditArea: this.openEditArea, handleOpenDeleteArea: this.openDeleteArea, changeContent: this.props.changeContent, type: this.props.type }),
                                React.createElement(BottomOfComment, { likeCount: this.state.likeCount, liked: this.state.liked, likeButtonDisabled: this.state.likeButtonDisabled, likeToggle: this.likeToggle, date: this.props.date, handleOpenReportArea: this.openReportArea, handleCloseReportArea: this.closeReportArea, tags: this.props.tags, owner: this.props.owner, changeContent: this.props.changeContent, id: this.props.id })
                            )
                        )
                    )
                );
            } else if (this.state.form == "report") {
                return React.createElement(ReportArea, { handleCloseReportArea: this.closeReportArea });
            } else if (this.state.form == "edit") {
                return React.createElement(EditArea, { tags: this.props.tags, handleCancelButton: this.closeEditArea, commentText: this.props.text, owner: this.props.owner, reloadFunc: this.props.reloadFunc, setForm: this.setForm, productID: this.props.productID });
            } else if (this.state.form == "newComment") {
                return React.createElement(EditArea, { tags: this.props.tags, handleCancelButton: this.closeEditArea, commentText: '', owner: true, reloadFunc: this.props.reloadFunc, newComment: true, productID: this.props.productID, changeContent: this.props.changeContent });
            } else if (this.state.form == "delete") {
                return React.createElement(DeleteArea, { handleCancelButton: this.closeDeleteArea, handleConfirmButton: this.confirmDelete });
            } else if (this.state.form == "message") {
                return React.createElement(
                    Row,
                    { size: 'one' },
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

        var _this3 = _possibleConstructorReturn(this, (TopOfComment.__proto__ || Object.getPrototypeOf(TopOfComment)).call(this, props));

        _this3.minifyLimit = 750;
        _this3.slugPrefix = _this3.props.type == "profile" ? "profil" : "urun";
        // ^ comment'i iki yerde kullandığım ve 2 tür title yapısı olduğu için böyle bir çözüm buldum
        _this3.state = {
            readAll: false
        };
        _this3.openEditArea = _this3.openEditArea.bind(_this3);
        _this3.openDeleteArea = _this3.openDeleteArea.bind(_this3);
        _this3.readAll = _this3.readAll.bind(_this3);
        _this3.minifyText = _this3.minifyText.bind(_this3);
        if (_this3.props.text.length > _this3.minifyLimit) {
            _this3.minifiedText = _this3.minifyText(_this3.props.text, _this3.minifyLimit);
        } else {
            _this3.state = {
                readAll: true
            };
        }
        return _this3;
    }

    _createClass(TopOfComment, [{
        key: 'openEditArea',
        value: function openEditArea() {
            this.props.handleOpenEditArea();
        }
    }, {
        key: 'openDeleteArea',
        value: function openDeleteArea() {
            this.props.handleOpenDeleteArea();
        }
    }, {
        key: 'readAll',
        value: function readAll() {
            this.setState({
                readAll: true
            });
        }
    }, {
        key: 'minifyText',
        value: function minifyText(text, limit) {
            var minifiedText = "";
            for (var i = 0; i < limit; i++) {
                minifiedText += text[i];
            }
            return minifiedText;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            return React.createElement(
                'div',
                null,
                React.createElement(
                    Row,
                    { size: 'two', nonStackable: true },
                    React.createElement(
                        Column,
                        null,
                        React.createElement(
                            'div',
                            { className: 'comment-header-wrapper' },
                            React.createElement(H, { type: '3', text: this.props.title, optional: 'comment-header', href: SITEURL + this.slugPrefix + "/" + this.props.slug, handleOnClick: function handleOnClick(e) {
                                    e.preventDefault();_this4.props.changeContent(e.target.href);
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
                                'div',
                                null,
                                React.createElement(
                                    'button',
                                    { className: 'ui icon teal button', onClick: this.openEditArea },
                                    React.createElement(
                                        'i',
                                        { className: 'icon' },
                                        React.createElement('i', { className: 'fa fa-pencil-square-o', 'aria-hidden': 'true' })
                                    ),
                                    !isMobile() ? "Düzenle" : ""
                                ),
                                React.createElement(
                                    'button',
                                    { className: 'ui icon orange button', onClick: this.openDeleteArea },
                                    React.createElement(
                                        'i',
                                        { className: 'icon' },
                                        React.createElement('i', { className: 'fa fa-trash', 'aria-hidden': 'true' })
                                    ),
                                    !isMobile() ? "Sil" : ""
                                )
                            ) : ""
                        )
                    )
                ),
                React.createElement(
                    Row,
                    { size: 'one' },
                    React.createElement(
                        Column,
                        null,
                        React.createElement(
                            'div',
                            { className: 'comment-text' },
                            this.state.readAll ? this.props.text : this.minifiedText
                        )
                    )
                ),
                !this.state.readAll ? React.createElement(
                    Row,
                    { size: 'one' },
                    React.createElement(
                        Column,
                        null,
                        React.createElement(
                            FloatRight,
                            null,
                            React.createElement(
                                'a',
                                { className: 'read-all', onClick: this.readAll },
                                'Devam\u0131n\u0131 Oku'
                            )
                        )
                    )
                ) : ""
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
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    Row,
                    { size: 'one' },
                    React.createElement(
                        Column,
                        null,
                        React.createElement(Tags, { tags: this.props.tags, activeOnly: true, handleOnClick: this.props.changeContent })
                    )
                ),
                React.createElement(
                    Row,
                    { size: 'two', nonStackable: true },
                    React.createElement(
                        Column,
                        null,
                        React.createElement(
                            'div',
                            { className: 'comment-date' },
                            this.props.date
                        )
                    ),
                    React.createElement(
                        Column,
                        null,
                        React.createElement(
                            FloatRight,
                            null,
                            React.createElement(LikeButton, { likeCount: this.props.likeCount, liked: this.props.liked, likeButtonDisabled: this.props.likeButtonDisabled, id: this.props.id, likeToggle: this.props.likeToggle }),
                            React.createElement(ReportButton, { handleOpenReportArea: this.props.handleOpenReportArea, disabled: this.props.owner })
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

        return _possibleConstructorReturn(this, (LikeButton.__proto__ || Object.getPrototypeOf(LikeButton)).call(this, props));
    }

    _createClass(LikeButton, [{
        key: 'render',
        value: function render() {
            this.disabled = this.props.likeButtonDisabled ? " disabled" : "";
            this.buttonClass = this.props.liked ? "ui blue button" : "ui button";
            return React.createElement(
                'button',
                { className: this.buttonClass + this.disabled, onClick: this.props.likeToggle },
                React.createElement(
                    'i',
                    { className: 'icon' },
                    React.createElement('i', { className: 'fa fa-thumbs-up', 'aria-hidden': 'true' })
                ),
                this.props.likeCount
            );
        }
    }]);

    return LikeButton;
}(React.Component);

var ReportButton = function (_React$Component5) {
    _inherits(ReportButton, _React$Component5);

    function ReportButton(props) {
        _classCallCheck(this, ReportButton);

        var _this7 = _possibleConstructorReturn(this, (ReportButton.__proto__ || Object.getPrototypeOf(ReportButton)).call(this, props));

        _this7.openReportArea = _this7.openReportArea.bind(_this7);
        _this7.buttonClass = _this7.props.disabled ? "ui icon disabled button" : "ui icon button";
        return _this7;
    }

    _createClass(ReportButton, [{
        key: 'openReportArea',
        value: function openReportArea() {
            this.props.handleOpenReportArea();
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'button',
                { className: this.buttonClass, onClick: this.openReportArea },
                React.createElement(
                    'i',
                    { className: 'icon' },
                    React.createElement('i', { className: 'fa fa-exclamation-triangle', 'aria-hidden': 'true' })
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

        var _this8 = _possibleConstructorReturn(this, (ReportArea.__proto__ || Object.getPrototypeOf(ReportArea)).call(this, props));

        _this8.limitOfReportText = 200;
        _this8.state = {
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
        _this8.closeReportArea = _this8.closeReportArea.bind(_this8);
        _this8.sendReport = _this8.sendReport.bind(_this8);
        _this8.changeReason = _this8.changeReason.bind(_this8);
        _this8.changeTextarea = _this8.changeTextarea.bind(_this8);
        return _this8;
    }

    _createClass(ReportArea, [{
        key: 'closeReportArea',
        value: function closeReportArea() {
            this.props.handleCloseReportArea();
        }
    }, {
        key: 'sendReport',
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
        key: 'changeReason',
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
        key: 'changeTextarea',
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
        key: 'render',
        value: function render() {
            if (this.state.form == "normal") {
                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        Row,
                        { size: 'one' },
                        React.createElement(
                            Column,
                            null,
                            React.createElement(
                                RaisedSegment,
                                null,
                                React.createElement(
                                    Row,
                                    { size: 'two', nonStackable: true },
                                    React.createElement(
                                        Column,
                                        null,
                                        React.createElement(H, { type: '3', text: 'Geri Bildirim' })
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
                                    { size: 'one' },
                                    React.createElement(
                                        Column,
                                        null,
                                        React.createElement(
                                            'div',
                                            { className: 'ui yellow message' },
                                            React.createElement(
                                                'div',
                                                { className: 'header' },
                                                'Bu yorum hakk\u0131nda geri bildirimde bulunuyorsunuz.'
                                            ),
                                            React.createElement(
                                                'p',
                                                null,
                                                'Bildirimin as\u0131ls\u0131z olmas\u0131 durumunda size olan g\xFCvenimizin azalaca\u011F\u0131n\u0131 unutmay\u0131n.'
                                            )
                                        )
                                    )
                                ),
                                React.createElement(
                                    Row,
                                    { size: 'one' },
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
                                this.state.selectOptionWarning ? React.createElement(BasicMessage, { type: 'warning', text: '\'Neden\' bo\u015F b\u0131rak\u0131lamaz!' }) : '',
                                React.createElement(
                                    Row,
                                    { size: 'one' },
                                    React.createElement(
                                        Column,
                                        null,
                                        React.createElement(
                                            'div',
                                            { className: 'ui form' },
                                            React.createElement(
                                                'div',
                                                { className: 'field' },
                                                React.createElement(
                                                    'label',
                                                    null,
                                                    'A\xE7\u0131klama'
                                                ),
                                                React.createElement('textarea', { rows: '2', onChange: this.changeTextarea, value: this.state.reportText })
                                            )
                                        )
                                    )
                                ),
                                this.state.reportTextLimitWarning ? React.createElement(BasicMessage, { type: 'warning', text: 'A\xE7\u0131klama bu kadar uzun olamaz!' }) : '',
                                React.createElement(
                                    Row,
                                    { size: 'one' },
                                    React.createElement(
                                        Column,
                                        null,
                                        React.createElement(
                                            FloatRight,
                                            null,
                                            React.createElement(
                                                'div',
                                                null,
                                                React.createElement(
                                                    'span',
                                                    { className: 'report-text-count ' },
                                                    this.state.reportTextSize,
                                                    '/200'
                                                ),
                                                React.createElement(
                                                    'button',
                                                    { className: this.state.reportTextLimitWarning ? "ui blue disabled button" : "ui blue button", onClick: this.sendReport },
                                                    'G\xF6nder'
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
                    'div',
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

        var _this9 = _possibleConstructorReturn(this, (ReportReason.__proto__ || Object.getPrototypeOf(ReportReason)).call(this, props));

        _this9.changeReason = _this9.changeReason.bind(_this9);
        return _this9;
    }

    _createClass(ReportReason, [{
        key: 'changeReason',
        value: function changeReason(e) {
            this.props.handleChangeReason(e);
        }
    }, {
        key: 'render',
        value: function render() {
            var options = [];
            for (var i = 0; i < this.props.reasons.length; i++) {
                options.push(React.createElement(
                    'option',
                    { value: i, key: this.props.reasons[i].key },
                    this.props.reasons[i].value
                ));
            }
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'ui form' },
                    React.createElement(
                        'div',
                        { className: 'field' },
                        React.createElement(
                            'label',
                            null,
                            'Neden'
                        ),
                        React.createElement(
                            'select',
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
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    Row,
                    { size: 'one' },
                    React.createElement(
                        Column,
                        null,
                        React.createElement(
                            RaisedSegment,
                            null,
                            React.createElement(
                                Row,
                                { size: 'one' },
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

        var _this11 = _possibleConstructorReturn(this, (WriteComment.__proto__ || Object.getPrototypeOf(WriteComment)).call(this, props));

        if (_this11.props.forEdit) {
            _this11.var = {
                title: "Yorum Düzenle",
                buttonName: "Düzenle",
                buttonClassName: "ui green button"
            };
        } else {
            _this11.var = {
                title: "Yorum Yaz",
                buttonName: "Gönder",
                buttonClassName: "ui green disabled button"
            };
        }
        var propsTags = _this11.props.tags;
        var stateTags = [];
        for (var i = 0; i < propsTags.length; i++) {
            stateTags[propsTags[i].slug] = propsTags[i];
            stateTags[propsTags[i].slug]['rateValue'] = '-';
        }
        if (_this11.props.ownComment != null) {
            var oC = _this11.props.ownComment;
            var username = getUserInfo()['username'];
            _this11.state = {
                form: "sent",
                tags: normalizer('comment-rating', oC.rating),
                commentText: oC.commentText,
                date: oC.commentCreateDateTime,
                liked: oC.liked,
                likeCount: oC.commentLikeCount,
                sendButtonClassName: _this11.var.buttonClassName,
                username: username,
                topMessage: {
                    type: null,
                    text: null
                }
            };
        } else {
            var form = isMember() ? "normal" : "hidden";
            _this11.state = {
                // normal, loading, sent, hidden
                form: form,
                tags: stateTags,
                commentText: _this11.props.commentText,
                sendButtonClassName: _this11.var.buttonClassName,
                date: "Şimdi",
                liked: false,
                likeCount: 0,
                username: "Yorum Yaz",
                topMessage: {
                    type: null,
                    text: null
                }
            };
        }
        _this11.selectOption = _this11.selectOption.bind(_this11);
        _this11.sendComment = _this11.sendComment.bind(_this11);
        _this11.changeComment = _this11.changeComment.bind(_this11);
        _this11.showTopMessage = _this11.showTopMessage.bind(_this11);
        return _this11;
    }

    _createClass(WriteComment, [{
        key: 'selectOption',
        value: function selectOption(e, slug) {
            console.log("slug" + slug, " değer ", e.target.value);
            var tags = this.state.tags;
            tags[slug]['rateValue'] = e.target.value;
            this.setState({
                tags: tags
            });
        }
    }, {
        key: 'sendComment',
        value: function sendComment() {
            var _this12 = this;

            this.setState({
                form: "loading"
            });
            var values = Object.values(this.state.tags);
            var rating = {};
            for (var i = 0; i < values.length; i++) {
                rating[values['slug']] = values['rateValue'];
            }
            fetch(SITEURL + 'api/comment', {
                method: 'POST',
                header: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productID: this.props.productID,
                    commentText: this.state.commentText,
                    rating: rating
                })
            }).then(function (response) {
                if (!response.ok) throw new Error(response.status);else return response.json();
            }).then(function (json) {
                _this12.setState({
                    form: "sent"
                });
            }).catch(function (error) {
                if (error.message == 422) {
                    _this12.showTopMessage("warning", "Her ürüne sadece bir kere yorum yapabilirsiniz");
                }
            });
        }
    }, {
        key: 'changeComment',
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
        key: 'showTopMessage',
        value: function showTopMessage(type, text) {
            var topMessage = {
                type: type,
                text: text
            };
            this.setState({
                form: "normal",
                topMessage: topMessage
            });
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.state.form == "normal") {
                return React.createElement(
                    Row,
                    { size: 'one' },
                    React.createElement(
                        Column,
                        null,
                        this.state.topMessage ? React.createElement(
                            Row,
                            { size: 'one' },
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
                                { size: 'two', nonStackable: true },
                                React.createElement(
                                    Column,
                                    null,
                                    React.createElement(H, { type: '4', text: this.var.title })
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
                                { size: 'one' },
                                React.createElement(
                                    Column,
                                    null,
                                    React.createElement(
                                        'div',
                                        { className: 'ui form' },
                                        React.createElement(
                                            'div',
                                            { className: 'field' },
                                            React.createElement(
                                                'label',
                                                null,
                                                'Yorumunuz'
                                            ),
                                            React.createElement('textarea', { value: this.state.commentText, onChange: this.changeComment })
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                Row,
                                { size: 'one' },
                                React.createElement(
                                    Column,
                                    null,
                                    React.createElement(Rating, { tags: this.state.tags, forEdit: this.props.forEdit, selectOption: this.selectOption })
                                )
                            ),
                            React.createElement(
                                Row,
                                { size: 'one' },
                                React.createElement(
                                    Column,
                                    null,
                                    React.createElement(
                                        FloatRight,
                                        null,
                                        React.createElement(
                                            'button',
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
                return React.createElement(Comment, { text: this.state.commentText,
                    likeCount: this.state.likeCount,
                    liked: this.state.liked,
                    title: this.state.username,
                    date: this.state.date, tags: this.state.tags, owner: true, topMessage: {
                        type: this.state.topMessage.type,
                        text: this.state.topMessage.text
                    }
                });
            } else if (this.state.form == "hidden") {
                return React.createElement('div', null);
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
        key: 'render',
        value: function render() {
            this.ratingLines = [];
            var keyArr = Object.keys(this.props.tags);
            for (var i = 0; i < keyArr.length; i++) {
                if (!this.props.tags[keyArr[i]].passive) {
                    this.ratingLines.push(React.createElement(RatingLine, _defineProperty({ key: keyArr[i], tagKey: this.props.tags[keyArr[i]].id, tagName: this.props.tags[keyArr[i]].text, tagSlug: this.props.tags[keyArr[i]].slug, forEdit: this.props.forEdit, rateValue: this.props.tags[keyArr[i]].rateValue, selectOption: this.props.selectOption }, 'rateValue', this.props.tags[keyArr[i]].rateValue)));
                }
            }
            return React.createElement(
                Row,
                { size: 'sixteen' },
                React.createElement(WideColumn, { size: 'two' }),
                React.createElement(
                    WideColumn,
                    { size: 'twelve' },
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

        return _possibleConstructorReturn(this, (RatingLine.__proto__ || Object.getPrototypeOf(RatingLine)).call(this, props));
    }

    _createClass(RatingLine, [{
        key: 'render',
        value: function render() {
            var _this15 = this;

            this.color = getRatingColor(this.props.rateValue);
            return React.createElement(
                Row,
                { size: 'one' },
                React.createElement(
                    Column,
                    null,
                    React.createElement(
                        Row,
                        { size: 'two' },
                        React.createElement(
                            Column,
                            null,
                            React.createElement(
                                Center,
                                null,
                                React.createElement(Tag, { key: this.props.tagKey, passive: false, text: this.props.tagName, color: this.color, rateValue: this.props.rateValue })
                            )
                        ),
                        React.createElement(
                            Column,
                            null,
                            React.createElement(
                                Center,
                                null,
                                React.createElement(
                                    'div',
                                    { className: 'ui form' },
                                    React.createElement(
                                        'div',
                                        { className: 'field' },
                                        React.createElement(
                                            'select',
                                            { onChange: function onChange(e) {
                                                    return _this15.props.selectOption(e, _this15.props.tagSlug);
                                                } },
                                            React.createElement(
                                                'option',
                                                { value: '-' },
                                                'Se\xE7ilmemi\u015F'
                                            ),
                                            React.createElement(
                                                'option',
                                                { value: '1' },
                                                '1'
                                            ),
                                            React.createElement(
                                                'option',
                                                { value: '2' },
                                                '2'
                                            ),
                                            React.createElement(
                                                'option',
                                                { value: '3' },
                                                '3'
                                            ),
                                            React.createElement(
                                                'option',
                                                { value: '4' },
                                                '4'
                                            ),
                                            React.createElement(
                                                'option',
                                                { value: '5' },
                                                '5'
                                            ),
                                            React.createElement(
                                                'option',
                                                { value: '6' },
                                                '6'
                                            ),
                                            React.createElement(
                                                'option',
                                                { value: '7' },
                                                '7'
                                            ),
                                            React.createElement(
                                                'option',
                                                { value: '8' },
                                                '8'
                                            ),
                                            React.createElement(
                                                'option',
                                                { value: '9' },
                                                '9'
                                            ),
                                            React.createElement(
                                                'option',
                                                { value: '10' },
                                                '10'
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

        var _this16 = _possibleConstructorReturn(this, (EditArea.__proto__ || Object.getPrototypeOf(EditArea)).call(this, props));

        var a = React.createElement(
            'div',
            null,
            ' ',
            React.createElement(WriteComment, { tags: _this16.props.tags, forEdit: true, commentText: _this16.props.commentText, handleCancelButton: _this16.props.handleCancelButton }),
            ' '
        );
        _this16.state = {
            sent: false,
            commentText: _this16.props.commentText,
            tags: []
        };
        _this16.changeComment = _this16.changeComment.bind(_this16);
        _this16.sendComment = _this16.sendComment.bind(_this16);
        return _this16;
    }

    _createClass(EditArea, [{
        key: 'changeComment',
        value: function changeComment(e) {
            this.setState({
                commentText: e.target.value
            });
        }
    }, {
        key: 'sendComment',
        value: function sendComment() {
            var _this17 = this;

            //this.props.setForm("loading");
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
                        rating: {}
                    })
                }).then(function (response) {
                    if (!response.ok) throw new Error(response.status);else return response.json();
                }).then(function (json) {
                    _this17.setState({
                        sent: true
                    });
                    _this17.props.reloadFunc();
                }).catch(function (error) {
                    if (error.message == 422) {
                        _this17.showTopMessage("warning", "Her ürüne sadece bir kere yorum yapabilirsiniz");
                    }
                });
            } else {
                // edit comment
                console.log(this.props.productID);
                fetch(SITEURL + 'api/comment', {
                    method: 'PUT',
                    header: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        productID: this.props.productID,
                        commentText: this.state.commentText,
                        rating: {}
                    })
                }).then(function (response) {
                    if (!response.ok) throw new Error(response.status);else return response.json();
                }).then(function (json) {
                    _this17.setState({
                        sent: true
                    });
                    _this17.props.reloadFunc();
                }).catch(function (error) {
                    if (error.message == 422) {
                        _this17.showTopMessage("warning", "Her ürüne sadece bir kere yorum yapabilirsiniz");
                    }
                });
            }
            //this.props.reloadFunc();
            // ^ düzenleme isteği ya da gönderme isteği başarılıysa bunu çalıştırıp sayfadaki bütün yorumları güncelleyeceğiz
        }
    }, {
        key: 'render',
        value: function render() {
            this.title = this.props.newComment ? "Yorum Yaz" : "Düzenle";
            this.buttonName = this.props.newComment ? "Gönder" : "Düzenle";
            if (!this.state.sent) {

                return React.createElement(
                    Row,
                    { size: 'one' },
                    React.createElement(
                        Column,
                        null,
                        null ? React.createElement(
                            Row,
                            { size: 'one' },
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
                                { size: 'two', nonStackable: true },
                                React.createElement(
                                    Column,
                                    null,
                                    React.createElement(H, { type: '4', text: this.title })
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
                                { size: 'one' },
                                React.createElement(
                                    Column,
                                    null,
                                    React.createElement(
                                        'div',
                                        { className: 'ui form' },
                                        React.createElement(
                                            'div',
                                            { className: 'field' },
                                            React.createElement(
                                                'label',
                                                null,
                                                'Yorumunuz'
                                            ),
                                            React.createElement('textarea', { value: this.state.commentText, onChange: this.changeComment })
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                Row,
                                { size: 'one' },
                                React.createElement(
                                    Column,
                                    null,
                                    React.createElement(Rating, { tags: this.state.tags, forEdit: this.props.forEdit, selectOption: this.selectOption })
                                )
                            ),
                            React.createElement(
                                Row,
                                { size: 'one' },
                                React.createElement(
                                    Column,
                                    null,
                                    React.createElement(
                                        FloatRight,
                                        null,
                                        React.createElement(
                                            'button',
                                            { className: 'ui green button', onClick: this.sendComment },
                                            this.buttonName
                                        )
                                    )
                                )
                            )
                        )
                    )
                );
            } else {
                return React.createElement(Comment, {
                    productID: this.props.productID,
                    changeContent: this.props.changeContent,
                    reloadFunc: this.props.reloadFunc,
                    text: this.state.commentText //
                    , type: 'profile' //
                    , slug: getUserInfo()['slug'] //
                    , likeCount: '0' //
                    , liked: false //
                    , title: getUserInfo()['username'] //
                    , date: '\u015Eu an' //
                    , tags: [] //
                    , owner: true
                });
            }
        }
    }]);

    return EditArea;
}(React.Component);

var DeleteArea = function (_React$Component13) {
    _inherits(DeleteArea, _React$Component13);

    function DeleteArea(props) {
        _classCallCheck(this, DeleteArea);

        var _this18 = _possibleConstructorReturn(this, (DeleteArea.__proto__ || Object.getPrototypeOf(DeleteArea)).call(this, props));

        _this18.cancelFunc = _this18.cancelFunc.bind(_this18);
        _this18.confirmFunc = _this18.confirmFunc.bind(_this18);
        return _this18;
    }

    _createClass(DeleteArea, [{
        key: 'confirmFunc',
        value: function confirmFunc() {
            this.props.handleConfirmButton();
        }
    }, {
        key: 'cancelFunc',
        value: function cancelFunc() {
            this.props.handleCancelButton();
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                Row,
                { size: 'one' },
                React.createElement(
                    Column,
                    null,
                    React.createElement(
                        RaisedSegment,
                        null,
                        React.createElement(
                            Row,
                            { size: 'one' },
                            React.createElement(
                                Column,
                                null,
                                React.createElement(BasicMessage, { type: 'danger', text: 'Bu yorumu kal\u0131c\u0131 olarak silmek istedi\u011Finizden emin misiniz?' })
                            )
                        ),
                        React.createElement(
                            Row,
                            { size: 'two', nonStackable: true },
                            React.createElement(
                                Column,
                                null,
                                React.createElement(
                                    FloatRight,
                                    null,
                                    React.createElement(
                                        'button',
                                        { className: 'ui green button', onClick: this.confirmFunc },
                                        'Evet'
                                    )
                                )
                            ),
                            React.createElement(
                                Column,
                                null,
                                React.createElement(
                                    'button',
                                    { className: 'ui red button', onClick: this.cancelFunc },
                                    'Hay\u0131r'
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

var Comments = function (_React$Component14) {
    _inherits(Comments, _React$Component14);

    function Comments(props) {
        _classCallCheck(this, Comments);

        return _possibleConstructorReturn(this, (Comments.__proto__ || Object.getPrototypeOf(Comments)).call(this, props));
    }

    _createClass(Comments, [{
        key: 'render',
        value: function render() {
            if (this.props.form == "normal") {
                this.comments = [];
                for (var i = 0; i < this.props.comments.length; i++) {
                    var com = this.props.comments[i];
                    this.comments.push(React.createElement(Comment, {
                        productID: this.props.productID,
                        changeContent: this.props.changeContent,
                        reloadFunc: this.props.reloadFunc,
                        key: com.id,
                        id: com.id,
                        text: com.text,
                        type: com.type,
                        slug: com.slug,
                        likeCount: com.likeCount,
                        liked: com.liked,
                        title: com.title,
                        date: com.date,
                        tags: com.tags,
                        owner: com.owner
                    }));
                }
                return React.createElement(
                    'div',
                    null,
                    this.comments
                );
            } else if (this.props.form == "loading") {
                return React.createElement(RowLoadingSpin, { nonSegment: true });
            } else if (this.props.form == "noComment") {
                return React.createElement(
                    Row,
                    { size: 'one' },
                    React.createElement(
                        Column,
                        null,
                        React.createElement(
                            'div',
                            { 'class': 'ui big yellow message' },
                            'Yorum yok, ilk yorum senden olsun!'
                        )
                    )
                );
            }
        }
    }]);

    return Comments;
}(React.Component);