var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EmailValidation = function (_React$Component) {
    _inherits(EmailValidation, _React$Component);

    function EmailValidation(props) {
        _classCallCheck(this, EmailValidation);

        var _this = _possibleConstructorReturn(this, (EmailValidation.__proto__ || Object.getPrototypeOf(EmailValidation)).call(this, props));

        _this.state = {
            // normal, loading, success
            form: _this.props.validated ? "none" : "normal",
            topMessage: null,
            code: ""
        };
        _this.changeCode = _this.changeCode.bind(_this);
        _this.verify = _this.verify.bind(_this);
        _this.sendAgain = _this.sendAgain.bind(_this);
        _this.showTopMessage = _this.showTopMessage.bind(_this);
        return _this;
    }

    _createClass(EmailValidation, [{
        key: "changeCode",
        value: function changeCode(e) {
            this.setState({
                code: e.target.value
            });
        }
    }, {
        key: "verify",
        value: function verify() {
            console.log("doğrulama işlemleri");
            this.showTopMessage("warning", "hata mesajları falan 2");
        }
    }, {
        key: "sendAgain",
        value: function sendAgain() {
            this.showTopMessage("warning", "hata mesajları falan");
        }
    }, {
        key: "showTopMessage",
        value: function showTopMessage(type, text) {
            this.setState({
                topMessage: {
                    type: type,
                    text: text
                }
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
                            Segment,
                            null,
                            this.props.newUser ? React.createElement(
                                "div",
                                { className: "ui success message" },
                                React.createElement(
                                    "div",
                                    { className: "header" },
                                    "Ba\u015Far\u0131l\u0131 bir \u015Fekilde \xFCye oldunuz!"
                                ),
                                React.createElement(
                                    "p",
                                    null,
                                    "L\xFCtfen e-posta kutunuzu kontrol ediniz. Size g\xF6nderdi\u011Fimiz mail'deki kodu a\u015Fa\u011F\u0131daki kutucu\u011Fa giriniz:"
                                )
                            ) : React.createElement(
                                "div",
                                { className: "ui negative message" },
                                React.createElement(
                                    "div",
                                    { className: "header" },
                                    "E-Posta Do\u011Frulama Ba\u015Far\u0131s\u0131z"
                                ),
                                React.createElement(
                                    "p",
                                    null,
                                    "L\xFCtfen e-posta kutunuzu kontrol ediniz. Size g\xF6nderdi\u011Fimiz mail'deki kodu a\u015Fa\u011F\u0131daki kutucu\u011Fa giriniz:"
                                )
                            ),
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
                                { size: "three" },
                                React.createElement(Column, null),
                                React.createElement(
                                    Column,
                                    null,
                                    React.createElement(
                                        "form",
                                        { className: "ui form attached fluid" },
                                        React.createElement(
                                            "div",
                                            { className: "field" },
                                            React.createElement(
                                                "label",
                                                null,
                                                "Kod"
                                            ),
                                            React.createElement("input", { placeholder: "Kod", type: "text", value: this.state.code, onChange: this.changeCode })
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                Row,
                                { size: "three" },
                                React.createElement(Column, null),
                                React.createElement(
                                    Column,
                                    null,
                                    React.createElement(
                                        "div",
                                        null,
                                        React.createElement(
                                            "button",
                                            { className: "ui teal button", onClick: this.sendAgain },
                                            "Yeniden G\xF6nder"
                                        ),
                                        React.createElement(
                                            FloatRight,
                                            null,
                                            React.createElement(
                                                "button",
                                                { className: "ui primary button", onClick: this.verify },
                                                "Do\u011Frula"
                                            )
                                        )
                                    )
                                )
                            ),
                            this.props.newUser ? React.createElement(
                                Row,
                                { size: "one" },
                                React.createElement(
                                    Column,
                                    null,
                                    React.createElement(
                                        Center,
                                        null,
                                        React.createElement(
                                            "a",
                                            { href: "index" },
                                            "Bu ad\u0131m\u0131 \u015Fimdilik ge\xE7"
                                        )
                                    )
                                )
                            ) : ""
                        )
                    )
                );
            } else if (this.state.form == "loading") {
                return React.createElement(
                    "div",
                    null,
                    React.createElement(RowLoadingSpin, null)
                );
            } else if (this.state.form == "success") {
                return React.createElement(
                    Row,
                    { size: "one" },
                    React.createElement(
                        Column,
                        null,
                        React.createElement(BasicMessage, { type: "success", text: "E-posta do\u011Frulama ba\u015Far\u0131l\u0131 bir \u015Fekilde ger\xE7ekle\u015Fti." })
                    )
                );
            } else if (this.state.form == "none") {
                return "";
            }
        }
    }]);

    return EmailValidation;
}(React.Component);