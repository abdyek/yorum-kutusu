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
            // normal, loading, notFound
            form: "normal"
        };
        _this.tagsInfo = [{
            id: 0,
            passive: true,
            text: "Akıllı Telefon"
        }, {
            id: 1,
            passive: true,
            text: "Apple"
        }, {
            id: 2,
            passive: true,
            text: "Ipone"
        }, {
            id: 3,
            passive: false,
            text: "Batarya",
            color: "yellow",
            rateValue: "5.5"
        }, {
            id: 4,
            passive: false,
            text: "Kamera",
            color: "orange",
            rateValue: "4.2"
        }, {
            id: 5,
            passive: false,
            text: "Ekran",
            color: "green",
            rateValue: "9.3"
        }];
        return _this;
    }

    _createClass(Content, [{
        key: "render",
        value: function render() {
            if (this.state.form == "normal") {
                return React.createElement(
                    "div",
                    null,
                    React.createElement(Product, { tags: this.tagsInfo }),
                    React.createElement(Comments, null),
                    React.createElement(WriteComment, { tags: this.tagsInfo })
                );
            } else if (this.state.form == "loading") {
                return React.createElement(RowLoadingSpin, { nonSegment: true });
            } else if (this.state.form == "notFound") {
                return React.createElement(
                    Row,
                    { size: "one" },
                    React.createElement(
                        Column,
                        null,
                        React.createElement(BasicMessage, { messageType: "warning", text: "B\xF6yle bir \xFCr\xFCn yok" }),
                        React.createElement(
                            Center,
                            null,
                            React.createElement(
                                "a",
                                { href: "urun-olustur" },
                                "Yeni Bir \xDCr\xFCn Olu\u015Ftur"
                            )
                        )
                    )
                );
            }
        }
    }]);

    return Content;
}(React.Component);

var Product = function (_React$Component2) {
    _inherits(Product, _React$Component2);

    function Product() {
        _classCallCheck(this, Product);

        return _possibleConstructorReturn(this, (Product.__proto__ || Object.getPrototypeOf(Product)).apply(this, arguments));
    }

    _createClass(Product, [{
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
                        React.createElement(Tags, { tags: this.props.tags, activeOnly: false })
                    )
                ),
                React.createElement(
                    Row,
                    { size: "one" },
                    React.createElement(
                        Column,
                        null,
                        React.createElement(H, { type: "1", text: "Iphone 5s" })
                    )
                )
            );
        }
    }]);

    return Product;
}(React.Component);

var Comments = function (_React$Component3) {
    _inherits(Comments, _React$Component3);

    function Comments() {
        _classCallCheck(this, Comments);

        return _possibleConstructorReturn(this, (Comments.__proto__ || Object.getPrototypeOf(Comments)).apply(this, arguments));
    }

    _createClass(Comments, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(Comment, { text: " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus condimentum elementum est, eget condimentum purus venenatis id. Aliquam ultrices lacinia lacus vitae congue. Fusce id elit sapien. Etiam velit diam, hendrerit vitae tincidunt vel, tempor sed leo. Quisque iaculis dolor non ultrices suscipit. Donec consectetur, lorem vel molestie blandit, mi mi sagittis nisl, ac pretium nibh nulla ut odio. Proin vitae auctor dolor, vitae ultricies lectus. Fusce a lectus sodales, tincidunt libero imperdiet, vulputate est. Vestibulum euismod, ante at malesuada finibus, quam urna aliquam leo, at tristique orci nunc sit amet tellus. Donec nibh tellus, suscipit ac euismod nec, scelerisque sed dui. Aliquam pellentesque tincidunt felis et sollicitudin. Quisque molestie consequat tellus, commodo pharetra lacus. Etiam scelerisque dui non leo feugiat, ut ornare nibh accumsan. Cras eget ex cursus, tristique dolor non, molestie libero. Duis dolor felis, hendrerit eu ligula ut, iaculis semper mi. Maecenas venenatis quis turpis nec sodales. Duis consequat nulla sed efficitur consequat. Integer suscipit blandit mollis. Proin posuere, lacus sed posuere lacinia, tortor est tristique augue, sed consectetur augue eros et augue. Quisque mauris diam, rhoncus sed vulputate quis, gravida in massa. Praesent purus leo, porta in elit ut, porta blandit risus. Integer ipsum dolor, luctus sed tincidunt ac, ullamcorper ornare libero. Curabitur porta arcu elit, sit amet varius orci rutrum vitae. Pellentesque luctus dolor tortor. Nulla fringilla odio massa, vitae laoreet felis fringilla in. Vestibulum maximus condimentum velit vel ultrices. Maecenas commodo, lorem et mollis maximus, felis elit tempus arcu, a volutpat ex justo eu urna. Sed aliquet semper feugiat. Ut ornare ipsum at posuere faucibus. Nullam vitae massa blandit, tristique lectus in, volutpat dolor. Curabitur non nisi et erat maximus eleifend vitae quis dui. Cras at ultrices nulla. Maecenas viverra dapibus tortor, ac commodo risus finibus ac. Nullam ultrices tortor nec posuere luctus. Vivamus viverra, tellus suscipit dignissim euismod, tellus dolor pulvinar tellus, vitae placerat libero enim aliquet libero. Aenean gravida sem at odio dapibus, quis aliquet sem malesuada. Vestibulum dictum metus ac orci mattis egestas. Suspendisse vel auctor elit, et suscipit nulla. Aliquam feugiat neque nisl, ac convallis metus dignissim non. Morbi dapibus vitae est sed egestas. Integer laoreet ac elit vitae facilisis. Quisque fermentum ipsum eu sagittis mattis. Duis pellentesque ante quis aliquam volutpat. Proin eget arcu quis orci sagittis fringilla. Cras elementum tempus quam. Nulla non mollis risus. Fusce cursus quam nec est suscipit accumsan. Sed sit amet nisi lacus. Etiam a libero in nisi vehicula efficitur. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas in velit vitae eros consequat feugiat. Sed vitae sapien et turpis egestas tempor sit amet vel purus. Duis non arcu dolor. Nam eget accumsan elit, sit amet ultrices nunc. Proin eget lacinia nunc. Sed tortor ex, vehicula ut interdum nec, aliquam eget risus. Phasellus ligula lorem, dapibus quis diam in, iaculis volutpat orci. Nulla facilisi. In dignissim viverra elit sit amet accumsan. ",
                    likeCount: "145",
                    liked: false,
                    title: "Mahmut",
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
                    owner: true
                }),
                React.createElement(Comment, { text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
                    likeCount: "13",
                    liked: false,
                    title: "abdyek",
                    date: "13 Temmuz - 08:12",
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
                    owner: false
                }),
                React.createElement(Comment, { text: "bu \xE7ok ho\u015F bir yorumcuk",
                    likeCount: "99",
                    liked: false,
                    title: "at h\u0131rs\u0131z\u0131 12",
                    date: "02 Haziran - 13:51",
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
                    owner: false
                }),
                React.createElement(Comment, { text: "yorumsuz",
                    likeCount: "103",
                    liked: true,
                    title: "liseli_detected91",
                    date: "21 Ocak - 17:29",
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
                    owner: false
                }),
                React.createElement(Comment, { text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                    likeCount: "0",
                    liked: false,
                    title: "crazy_mahmut",
                    date: "14 Aral\u0131k 2019- 18:49",
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
                    owner: true
                })
            );
        }
    }]);

    return Comments;
}(React.Component);

var WriteComment = function (_React$Component4) {
    _inherits(WriteComment, _React$Component4);

    function WriteComment(props) {
        _classCallCheck(this, WriteComment);

        var _this4 = _possibleConstructorReturn(this, (WriteComment.__proto__ || Object.getPrototypeOf(WriteComment)).call(this, props));

        _this4.state = {
            // normal, loading, sent
            form: "normal",
            messageType: "success", // success, warning, danger
            messageText: "mahmutcan",
            commentText: "",
            sendButtonDisabled: true,
            sendButtonClassName: "ui green disabled button"
        };
        _this4.sendComment = _this4.sendComment.bind(_this4);
        _this4.changeComment = _this4.changeComment.bind(_this4);
        return _this4;
    }

    _createClass(WriteComment, [{
        key: "sendComment",
        value: function sendComment() {
            this.setState({
                form: "loading"
            });
            // gerekli API işlemleri buraya yapılacak
        }
    }, {
        key: "changeComment",
        value: function changeComment(e) {
            if (!e.target.value.length) {
                this.setState({
                    sendButtonClassName: "ui green disabled button",
                    sendButtonDisabled: true
                });
            } else {
                this.setState({
                    sendButtonClassName: "ui green button",
                    sendButtonDisabled: false
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
                            Segment,
                            null,
                            React.createElement(H, { type: "4", text: "Yorum Yaz" }),
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
                                    React.createElement(Rating, { tags: this.props.tags })
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
                                            "G\xF6nder"
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

var Rating = function (_React$Component5) {
    _inherits(Rating, _React$Component5);

    function Rating(props) {
        _classCallCheck(this, Rating);

        var _this5 = _possibleConstructorReturn(this, (Rating.__proto__ || Object.getPrototypeOf(Rating)).call(this, props));

        _this5.ratingLines = [];
        for (var i = 0; i < _this5.props.tags.length; i++) {
            if (!_this5.props.tags[i].passive) {
                _this5.ratingLines.push(React.createElement(RatingLine, { key: _this5.props.tags[i].id, tagKey: _this5.props.tags[i].id, tagName: _this5.props.tags[i].text }));
            }
        }
        return _this5;
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

var RatingLine = function (_React$Component6) {
    _inherits(RatingLine, _React$Component6);

    function RatingLine(props) {
        _classCallCheck(this, RatingLine);

        var _this6 = _possibleConstructorReturn(this, (RatingLine.__proto__ || Object.getPrototypeOf(RatingLine)).call(this, props));

        _this6.state = {
            rateValue: "-",
            color: ""
        };
        _this6.selectOption = _this6.selectOption.bind(_this6);
        _this6.colors = {
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
        return _this6;
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