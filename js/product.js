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
												form: "normal",
												commentsSortBy: "time",
												comments: [{
																id: 0,
																text: "burası yorumun text'i",
																likeCount: 13,
																liked: true,
																title: "ahmet",
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
																owner: false
												}, {
																id: 99,
																text: "olabilir mi böyle bir şey lütfen olmasın çünkü",
																likeCount: 13,
																liked: true,
																title: "ahmet",
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
																owner: false
												}]
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
								_this.changeSortBy = _this.changeSortBy.bind(_this);
								_this.refreshComments = _this.refreshComments.bind(_this);
								return _this;
				}

				_createClass(Content, [{
								key: "changeSortBy",
								value: function changeSortBy(value) {
												this.setState({
																commentsSortBy: value
												});
								}
				}, {
								key: "refreshComments",
								value: function refreshComments() {
												// yorum getirme kısmı burada olacak
								}
				}, {
								key: "render",
								value: function render() {
												if (this.state.form == "normal") {
																return React.createElement(
																				"div",
																				null,
																				React.createElement(Product, { tags: this.tagsInfo }),
																				React.createElement(PageNavigation, { sortBy: this.state.commentsSortBy, handleChangeSortBy: this.changeSortBy, handleRefreshComments: this.refreshComments }),
																				React.createElement(Comments, { comments: this.state.comments }),
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
																								React.createElement(BasicMessage, { type: "warning", text: "B\xF6yle bir \xFCr\xFCn yok" }),
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
																								React.createElement(H, { type: "1", text: "Iphone 5s" })
																				)
																),
																React.createElement(
																				Row,
																				{ size: "one" },
																				React.createElement(
																								Column,
																								null,
																								React.createElement(Tags, { tags: this.props.tags, activeOnly: false })
																				)
																)
												);
								}
				}]);

				return Product;
}(React.Component);

var Comments = function (_React$Component3) {
				_inherits(Comments, _React$Component3);

				function Comments(props) {
								_classCallCheck(this, Comments);

								var _this3 = _possibleConstructorReturn(this, (Comments.__proto__ || Object.getPrototypeOf(Comments)).call(this, props));

								_this3.state = {
												// normal, loading
												form: "normal"
								};
								return _this3;
				}

				_createClass(Comments, [{
								key: "render",
								value: function render() {
												if (this.state.form == "normal") {
																this.comments = [];
																for (var i = 0; i < this.props.comments.length; i++) {
																				var com = this.props.comments[i];
																				console.log("burası çalışıyor");
																				this.comments.push(React.createElement(Comment, {
																								key: com.id,
																								text: com.text,
																								likeCount: com.likeCount,
																								liked: com.liked,
																								title: com.title,
																								date: com.date,
																								tags: com.tags,
																								owner: com.owner
																				}));
																}
																return React.createElement(
																				"div",
																				null,
																				this.comments
																);
												} else if (this.state.form == "loading") {
																return React.createElement(RowLoadingSpin, { nonSegment: true });
												}
								}
				}]);

				return Comments;
}(React.Component);