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
            form: "loading"
            // burada
        };return _this;
    }

    _createClass(Content, [{
        key: "render",
        value: function render() {
            if (this.state.form == "normal") {
                return React.createElement(ProfileInfo, null);
            } else if (this.state.form == "loading") {
                return React.createElement(RowLoadingSpin, null);
            } else if (this.state.form == "notFoundProfile") {
                return React.createElement(NotFoundProfile, null);
            }
        }
    }]);

    return Content;
}(React.Component);

owner = true;
isMobile = false;

var ProfileInfo = function (_React$Component2) {
    _inherits(ProfileInfo, _React$Component2);

    function ProfileInfo(props) {
        _classCallCheck(this, ProfileInfo);

        var _this2 = _possibleConstructorReturn(this, (ProfileInfo.__proto__ || Object.getPrototypeOf(ProfileInfo)).call(this, props));

        _this2.state = {
            settingOpened: false,
            oldPassword: "",
            newPassword: "",
            newPassword2: "",
            readyPasswordForm: true,
            message: false,
            messageText: "",
            messageType: "",
            logout: "",
            deleteOpened: false,
            emailToDelete: "",
            usernameToDelete: "",
            passwordToDelete: "",
            deleteAccount: "",
            deleteMessage: "",
            verification: false
        };
        _this2.toggleSetting = _this2.toggleSetting.bind(_this2);
        _this2.logout = _this2.logout.bind(_this2);
        _this2.changeOldPassword = _this2.changeOldPassword.bind(_this2);
        _this2.changeNewPassword = _this2.changeNewPassword.bind(_this2);
        _this2.changeNewPassword2 = _this2.changeNewPassword2.bind(_this2);
        _this2.tryChange = _this2.tryChange.bind(_this2);
        _this2.deleteAccount = _this2.deleteAccount.bind(_this2);
        _this2.changeEmailToDelete = _this2.changeEmailToDelete.bind(_this2);
        _this2.changeUsernameToDelete = _this2.changeUsernameToDelete.bind(_this2);
        _this2.changePasswordToDelete = _this2.changePasswordToDelete.bind(_this2);
        return _this2;
    }

    _createClass(ProfileInfo, [{
        key: "toggleSetting",
        value: function toggleSetting() {
            if (this.state.settingOpened) {
                this.setState({
                    settingOpened: false
                });
            } else {
                this.setState({
                    settingOpened: true
                });
            }
        }
    }, {
        key: "deleteAccount",
        value: function deleteAccount() {
            if (this.state.deleteOpened) {
                console.log("burada hesap silmek için gerekli veriler API'ye gönderilecek");
                this.setState({
                    deleteAccount: "loading"
                });
                /*
                this.setState({
                    deleteMessage: "buraya API'den gelen mesajı yazıyoruz"
                })
                ^ bununla gelen mesajı doğrudan veriyoruz
                */
            } else {
                this.setState({
                    deleteOpened: true
                });
            }
        }
    }, {
        key: "logout",
        value: function logout() {
            console.log("çıkıp yapmak için php'ye ajax ile çıkış şeyi gönderilecek");
            // butona spin ekliyoruz, başarılı çıkış sağlanırsa başarıyla çıkış yaptınız sayfasına yönlendirilebilir
            this.setState({
                logout: "loading"
            });
        }
    }, {
        key: "changeOldPassword",
        value: function changeOldPassword(e) {
            this.setState({
                oldPassword: e.target.value
            });
        }
    }, {
        key: "changeNewPassword",
        value: function changeNewPassword(e) {
            this.setState({
                newPassword: e.target.value
            });
        }
    }, {
        key: "changeNewPassword2",
        value: function changeNewPassword2(e) {
            this.setState({
                newPassword2: e.target.value
            });
        }
    }, {
        key: "tryChange",
        value: function tryChange() {
            // API tarafında yeni parola tekrarı istenmediğinden bu kısım client'a kaldı
            if (this.state.newPassword != this.state.newPassword2) {
                this.setState({
                    message: true,
                    messageText: "Yeni parola tekrarı ile uyumlu değil",
                    messageType: "red"
                });
            } else {
                this.setState({
                    message: false
                });
                console.log("burada API'ye gönderme işlemi yapıcaz");
                // burada API'ye gönderme işlemi yapıcaz bu sırada da kullanıcıya spin göstericez
                // ayrıca gelen mesaj olumlu ise messageType'ı blue yapıyoruz, ya da uygun diğer bir renk
            }
        }
    }, {
        key: "changeEmailToDelete",
        value: function changeEmailToDelete(e) {
            this.setState({
                emailToDelete: e.target.value
            });
        }
    }, {
        key: "changeUsernameToDelete",
        value: function changeUsernameToDelete(e) {
            this.setState({
                usernameToDelete: e.target.value
            });
        }
    }, {
        key: "changePasswordToDelete",
        value: function changePasswordToDelete(e) {
            this.setState({
                passwordToDelete: e.target.value
            });
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.settingOpened) {
                this.setting = React.createElement(
                    "div",
                    null,
                    React.createElement(
                        Row,
                        { size: "one" },
                        React.createElement(
                            Column,
                            null,
                            React.createElement(H, { type: "2", textAlign: "center", text: "Ayarlar" }),
                            React.createElement(
                                Row,
                                { size: "four" },
                                React.createElement(WideColumn, { size: "three" }),
                                React.createElement(
                                    WideColumn,
                                    { size: "five" },
                                    React.createElement(
                                        Segment,
                                        null,
                                        React.createElement(H, { type: "3", textAlign: "left", text: "Parola De\u011Fi\u015Ftir" }),
                                        this.state.readyPasswordForm ? React.createElement(
                                            "div",
                                            { className: "ui form" },
                                            React.createElement(
                                                "div",
                                                { className: "field" },
                                                React.createElement(
                                                    "label",
                                                    null,
                                                    "Eski Parola"
                                                ),
                                                React.createElement("input", { type: "password", value: this.state.oldPassword, onChange: this.changeOldPassword })
                                            ),
                                            React.createElement(
                                                "div",
                                                { className: "field" },
                                                React.createElement(
                                                    "label",
                                                    null,
                                                    "Yeni Parola"
                                                ),
                                                React.createElement("input", { type: "password", value: this.state.newPassword, onChange: this.changeNewPassword })
                                            ),
                                            React.createElement(
                                                "div",
                                                { className: "field" },
                                                React.createElement(
                                                    "label",
                                                    null,
                                                    "Yeni Parola Tekrar"
                                                ),
                                                React.createElement("input", { type: "password", value: this.state.newPassword2, onChange: this.changeNewPassword2 })
                                            )
                                        ) : React.createElement(RowLoading, null),
                                        this.state.message ? React.createElement(
                                            Row,
                                            { size: "one" },
                                            React.createElement(
                                                Column,
                                                null,
                                                React.createElement(
                                                    "div",
                                                    { id: "passwordChangeMessage", className: "ui " + this.state.messageType + " message" },
                                                    this.state.messageText
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
                                                    React.createElement(
                                                        "button",
                                                        { id: "passwordChangeButton", className: "ui primary button", onClick: this.tryChange },
                                                        "De\u011Fi\u015Ftir"
                                                    )
                                                )
                                            )
                                        )
                                    )
                                ),
                                React.createElement(
                                    WideColumn,
                                    { size: "five" },
                                    React.createElement(
                                        Segment,
                                        null,
                                        React.createElement(H, { type: "3", textAlign: "left", text: "Hesap Sil" }),
                                        React.createElement(
                                            "div",
                                            { className: "ui orange message" },
                                            React.createElement(
                                                "div",
                                                { className: "header" },
                                                "Dikkat!"
                                            ),
                                            React.createElement(
                                                "p",
                                                null,
                                                "Hesab\u0131n\u0131z\u0131 silerseniz b\xFCt\xFCn yorumlar\u0131n\u0131z da kal\u0131c\u0131 olarak silinir."
                                            )
                                        ),
                                        React.createElement(
                                            Row,
                                            { size: "one" },
                                            React.createElement(
                                                Column,
                                                null,
                                                this.state.deleteOpened ? React.createElement(
                                                    "div",
                                                    null,
                                                    React.createElement(
                                                        "div",
                                                        { className: "ui yellow message" },
                                                        "E-Posta, kullan\u0131c\u0131 ad\u0131 ve parolan\u0131z\u0131 girin."
                                                    ),
                                                    React.createElement(
                                                        "div",
                                                        { className: "ui form" },
                                                        React.createElement(
                                                            "div",
                                                            { className: "field" },
                                                            React.createElement(
                                                                "label",
                                                                null,
                                                                "E-Posta"
                                                            ),
                                                            React.createElement("input", { type: "text", value: this.state.emailToDelete, onChange: this.changeEmailToDelete })
                                                        ),
                                                        React.createElement(
                                                            "div",
                                                            { className: "field" },
                                                            React.createElement(
                                                                "label",
                                                                null,
                                                                "Kullan\u0131c\u0131 Ad\u0131"
                                                            ),
                                                            React.createElement("input", { type: "text", value: this.state.changeUsernameToDelete, onChange: this.changeUsernameToDelete })
                                                        ),
                                                        React.createElement(
                                                            "div",
                                                            { className: "field" },
                                                            React.createElement(
                                                                "label",
                                                                null,
                                                                "Parola"
                                                            ),
                                                            React.createElement("input", { type: "password", value: this.state.changePasswordToDelete, onChange: this.changePasswordToDelete })
                                                        )
                                                    ),
                                                    this.state.deleteMessage ? React.createElement(
                                                        "div",
                                                        { className: "ui teal message" },
                                                        this.state.deleteMessage
                                                    ) : "",
                                                    React.createElement(
                                                        FloatRight,
                                                        null,
                                                        React.createElement(
                                                            "button",
                                                            { id: "deleteAccount", className: "ui red " + this.state.deleteAccount + " button", onClick: this.deleteAccount },
                                                            "Sil"
                                                        )
                                                    )
                                                ) : React.createElement(
                                                    FloatRight,
                                                    null,
                                                    React.createElement(
                                                        "button",
                                                        { id: "deleteAccount", className: "ui red button", onClick: this.deleteAccount },
                                                        "Sil"
                                                    )
                                                )
                                            )
                                        )
                                    )
                                ),
                                React.createElement(WideColumn, { size: "three" })
                            )
                        )
                    )
                );
            } else {
                this.setting = React.createElement("div", null);
            }
            return React.createElement(
                "div",
                null,
                !this.state.verification ? React.createElement(Verification, null) : "",
                React.createElement(
                    Row,
                    { size: "one" },
                    React.createElement(
                        Column,
                        null,
                        React.createElement(
                            Center,
                            null,
                            React.createElement(
                                "i",
                                { id: "userIcon" },
                                React.createElement("i", { className: "fa fa-user-circle", "aria-hidden": "true" })
                            ),
                            React.createElement(H, { type: "1", text: "önemsiz" }),
                            owner ? React.createElement(
                                "div",
                                null,
                                React.createElement(
                                    "button",
                                    { className: "ui grey button", onClick: this.toggleSetting },
                                    React.createElement(
                                        "i",
                                        { className: "icon" },
                                        React.createElement("i", { className: "fa fa-cog", "aria-hidden": "true" })
                                    ),
                                    "Ayarlar"
                                ),
                                React.createElement(
                                    "button",
                                    { className: "ui red " + this.state.logout + " button", onClick: this.logout },
                                    React.createElement(
                                        "i",
                                        { className: "icon" },
                                        React.createElement("i", { className: "fa fa-paper-plane", "aria-hidden": "true" })
                                    ),
                                    "\xC7\u0131k\u0131\u015F Yap"
                                )
                            ) : ""
                        )
                    )
                ),
                this.setting,
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

    return ProfileInfo;
}(React.Component);

var Verification = function (_React$Component3) {
    _inherits(Verification, _React$Component3);

    function Verification(props) {
        _classCallCheck(this, Verification);

        var _this3 = _possibleConstructorReturn(this, (Verification.__proto__ || Object.getPrototypeOf(Verification)).call(this, props));

        _this3.state = {
            form: "normal",
            verification: false,
            verificationHeadMessage: true,
            verificationAPIMessage: "",
            verificationAPIMessageType: ""
        };
        _this3.sendVerification = _this3.sendVerification.bind(_this3);
        return _this3;
    }

    _createClass(Verification, [{
        key: "sendVerification",
        value: function sendVerification() {
            // burada gönderim işi yaplıacak
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.form == "normal") {
                this.body = React.createElement(
                    Row,
                    { size: "sixteen" },
                    React.createElement(WideColumn, { size: "five" }),
                    React.createElement(
                        WideColumn,
                        { size: "six" },
                        React.createElement(
                            "div",
                            { className: "ui form" },
                            React.createElement(
                                "div",
                                { className: "field" },
                                React.createElement(
                                    "label",
                                    null,
                                    "Aktivasyon Kodu"
                                ),
                                React.createElement("input", { type: "text" })
                            )
                        ),
                        React.createElement(
                            FloatRight,
                            null,
                            React.createElement(
                                "button",
                                { id: "sendActivation", className: "ui blue button", onClick: this.sendVerification },
                                "G\xF6nder"
                            )
                        )
                    )
                );
            } else if (this.state.form == "loading") {
                this.body = React.createElement(RowLoading, null);
            }
            if (this.state.verificationAPIMessage) {
                this.apiMessage = React.createElement(
                    "div",
                    null,
                    React.createElement(
                        Row,
                        { size: "one" },
                        React.createElement(
                            Column,
                            null,
                            React.createElement(
                                "div",
                                { "class": "ui " + this.state.verificationAPIMessageType + " message" },
                                this.state.verificationAPIMessage
                            )
                        )
                    )
                );
            } else {
                this.apiMessage = "";
            }
            return React.createElement(
                "div",
                null,
                this.state.verificationHeadMessage ? React.createElement(
                    Row,
                    { size: "one" },
                    React.createElement(
                        Column,
                        null,
                        React.createElement(
                            "div",
                            { className: "ui negative message" },
                            React.createElement(
                                "div",
                                { className: "header" },
                                "E-posta Aktivasyonu Ba\u015Far\u0131s\u0131z!"
                            ),
                            React.createElement(
                                "p",
                                null,
                                "L\xFCtfen E-postan\u0131za g\xF6nderdi\u011Fimiz kod ile e-posta aktivasyonunuzu yap\u0131n\u0131z"
                            )
                        )
                    )
                ) : "",
                this.apiMessage,
                this.body
            );
        }
    }]);

    return Verification;
}(React.Component);

var NotFoundProfile = function (_React$Component4) {
    _inherits(NotFoundProfile, _React$Component4);

    function NotFoundProfile(props) {
        _classCallCheck(this, NotFoundProfile);

        return _possibleConstructorReturn(this, (NotFoundProfile.__proto__ || Object.getPrototypeOf(NotFoundProfile)).call(this, props));
    }

    _createClass(NotFoundProfile, [{
        key: "render",
        value: function render() {
            return React.createElement(
                Row,
                { size: "sixteen" },
                React.createElement(WideColumn, { size: "two" }),
                React.createElement(
                    WideColumn,
                    { size: "twelve" },
                    React.createElement(
                        "div",
                        { className: "ui red message" },
                        "B\xF6yle bir profil yok!"
                    )
                )
            );
        }
    }]);

    return NotFoundProfile;
}(React.Component);

var Comments = function (_React$Component5) {
    _inherits(Comments, _React$Component5);

    function Comments(props) {
        _classCallCheck(this, Comments);

        var _this5 = _possibleConstructorReturn(this, (Comments.__proto__ || Object.getPrototypeOf(Comments)).call(this, props));

        if (!isMobile) {
            _this5.buttonText = {
                editButtonText: "Düzenle",
                deleteButtonText: "Sil",
                approveDeleteButtonText: "Sil",
                cancelDeleteButtonText: "İptal",
                cancelEditButtonText: "İptal",
                reVoteButtonText: "Yeniden Oyla",
                saveButtonText: "Kaydet"
            };
        } else {
            _this5.buttonText = {
                editButtonText: "",
                deleteButtonText: "",
                approveDeleteButtonText: "",
                cancelDeleteButtonText: "",
                cancelEditButtonText: "",
                reVoteButtonText: "",
                saveButtonText: ""
            };
        }
        return _this5;
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

var Comment = function (_React$Component6) {
    _inherits(Comment, _React$Component6);

    function Comment(props) {
        _classCallCheck(this, Comment);

        var _this6 = _possibleConstructorReturn(this, (Comment.__proto__ || Object.getPrototypeOf(Comment)).call(this, props));

        _this6.state = {
            form: "normal",
            reVote: "none",
            commentText: _this6.props.commentText,
            commentTextOld: _this6.props.commentText
        };
        _this6.inputRanges = [];
        /*
        this.editButtonText = "Düzenle";
        this.deleteButtonText = "Sil";
        this.approveDeleteButtonText = "Sil";
        this.cancelDeleteButtonText = "İptal";
        this.cancelEditButtonText = "İptal";
        */
        _this6.openEdit = _this6.openEdit.bind(_this6);
        _this6.openDelete = _this6.openDelete.bind(_this6);
        _this6.returnToNormal = _this6.returnToNormal.bind(_this6);
        _this6.commentWriting = _this6.commentWriting.bind(_this6);
        _this6.openReVote = _this6.openReVote.bind(_this6);
        return _this6;
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
                            React.createElement("i", { className: "fa fa-line-chart", "aria-hidden": "true" })
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
                                            React.createElement(DislikeButton, { value: 3, likeOrDislike: "" }),
                                            !owner ? React.createElement(ComplaintButton, null) : ""
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
                                                { className: "ui icon red button", onClick: this.returnToNormal },
                                                React.createElement(
                                                    "i",
                                                    { className: "icon" },
                                                    React.createElement("i", { className: "fa fa-times", "aria-hidden": "true" })
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
                                                                React.createElement("i", { className: "fa fa-floppy-o", "aria-hidden": "true" })
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
                                                { className: "ui icon blue button" },
                                                React.createElement(
                                                    "i",
                                                    { className: "icon" },
                                                    React.createElement("i", { className: "fa fa-check", "aria-hidden": "true" })
                                                ),
                                                this.props.buttonText.approveDeleteButtonText
                                            ),
                                            React.createElement(
                                                "button",
                                                { className: "ui icon red button", onClick: this.returnToNormal },
                                                React.createElement(
                                                    "i",
                                                    { className: "icon" },
                                                    React.createElement("i", { className: "fa fa-times", "aria-hidden": "true" })
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

var RatingBar = function (_React$Component7) {
    _inherits(RatingBar, _React$Component7);

    function RatingBar(props) {
        _classCallCheck(this, RatingBar);

        var _this7 = _possibleConstructorReturn(this, (RatingBar.__proto__ || Object.getPrototypeOf(RatingBar)).call(this, props));

        _this7.percent = _this7.props.ratingAverage * 10;
        // bu kısım drawcircle ile aynı refactor ederken buna bir çare bulabilirsin
        _this7.limitColor = {
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
        _this7.color = _this7.limitColor[0].color;
        for (var i = 0; i < Object.keys(_this7.limitColor).length; i++) {
            if (_this7.limitColor[i].min <= _this7.props.ratingAverage && _this7.props.ratingAverage < _this7.limitColor[i].max) {
                _this7.color = _this7.limitColor[i].color;
                break;
            }
        }
        // ^^^
        _this7.widthOfFill = _this7.props.ratingAverage * 15 + "px";
        return _this7;
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

var CommentText = function (_React$Component8) {
    _inherits(CommentText, _React$Component8);

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