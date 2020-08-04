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
			// normal, loading, noComment
			commentsForm: "normal",
			sortBy: "time",
			pageNumber: 3,
			comments: [{
				id: 0,
				text: "burası yorumun text'i",
				likeCount: 13,
				liked: true,
				title: "ahmet",
				date: "19 Temmuz - 21:45",
				tags: { 3: {
						passive: false,
						text: "Batarya",
						color: "yellow",
						rateValue: "5"
					},
					4: {
						passive: false,
						text: "Kamera",
						color: "orange",
						rateValue: "4"
					},
					5: {
						passive: false,
						text: "Tasarım",
						color: "",
						rateValue: "-"
					}
				},
				owner: false
			}, {
				id: 99,
				text: "olabilir mi böyle bir şey lütfen olmasın çünkü",
				likeCount: 13,
				liked: true,
				title: "ahmet",
				date: "19 Temmuz - 21:45",
				tags: {
					3: {
						passive: false,
						text: "Batarya",
						color: "yellow",
						rateValue: "5"
					},
					4: {
						passive: false,
						text: "Kamera",
						color: "orange",
						rateValue: "4"
					},
					5: {
						passive: false,
						text: "Tasarım",
						color: "",
						rateValue: "-"
					}
				},
				owner: false
			}]
		};
		_this.tagsInfo = {
			0: {
				passive: true,
				text: "Akıllı Telefon"
			},
			1: {
				passive: true,
				text: "Apple"
			},
			2: {
				passive: true,
				text: "Ipone"
			},
			3: {
				passive: false,
				text: "Batarya",
				color: "yellow",
				rateValue: "5.5"
			},
			4: {
				passive: false,
				text: "Kamera",
				color: "orange",
				rateValue: "4.2"
			},
			5: {
				passive: false,
				text: "Ekran",
				color: "green",
				rateValue: "9.3"
			}
		};
		_this.changeSortBy = _this.changeSortBy.bind(_this);
		_this.changePageNumber = _this.changePageNumber.bind(_this);
		_this.refreshComments = _this.refreshComments.bind(_this);
		return _this;
	}

	_createClass(Content, [{
		key: "changeSortBy",
		value: function changeSortBy(value) {
			if (value != this.state.sortBy && this.state.commentsForm != "loading") {
				// ^ bu ve changePageNumber metodundaki kontrolü kullanıcının aynı anda birden fazla seçim yapmasını engellemek için koydum
				this.setState({
					sortBy: value
				});
				this.refreshComments();
			}
		}
	}, {
		key: "changePageNumber",
		value: function changePageNumber(value) {
			if (value != this.state.pageNumber && this.state.commentsForm != "loading") {
				this.setState({
					pageNumber: value
				});
				this.refreshComments();
			}
		}
	}, {
		key: "refreshComments",
		value: function refreshComments() {
			// yorum getirme işlemi burada olacak ve yorum geleseğe kadar loading'e dönecek
			this.setState({
				commentsForm: "loading"
			});
		}
	}, {
		key: "render",
		value: function render() {
			if (this.state.form == "normal") {
				return React.createElement(
					"div",
					null,
					React.createElement(Product, { tags: this.tagsInfo }),
					React.createElement(PageNavigation, { sortBy: this.state.sortBy, handleChangeSortBy: this.changeSortBy, pageCount: "6", currentPage: this.state.pageNumber, handleChangePageNumber: this.changePageNumber }),
					React.createElement(Comments, { comments: this.state.comments, form: this.state.commentsForm }),
					React.createElement(PageNavigation, { sortBy: this.state.sortBy, handleChangeSortBy: this.changeSortBy, pageCount: "6", currentPage: this.state.pageNumber, handleChangePageNumber: this.changePageNumber }),
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

	function Product(props) {
		_classCallCheck(this, Product);

		var _this2 = _possibleConstructorReturn(this, (Product.__proto__ || Object.getPrototypeOf(Product)).call(this, props));

		_this2.followButtonAtt = {
			follow: {
				followed: false,
				buttonName: "Takip Et",
				buttonClassName: "ui teal button",
				icon: React.createElement("i", { "class": "fa fa-plus", "aria-hidden": "true" })
			},
			unfollow: {
				followed: true,
				buttonName: "Takibi Bırak",
				buttonClassName: "ui gray button",
				icon: React.createElement("i", { "class": "fa fa-times", "aria-hidden": "true" })
			}
		};
		_this2.state = {
			followed: false,
			followButtonAtt: _this2.followButtonAtt.follow
		};
		_this2.followButton = _this2.followButton.bind(_this2);
		return _this2;
	}

	_createClass(Product, [{
		key: "followButton",
		value: function followButton() {
			if (this.state.followed) {
				this.setState({
					followed: false,
					followButtonAtt: this.followButtonAtt.follow
				});
			} else {
				this.setState({
					followed: true,
					followButtonAtt: this.followButtonAtt.unfollow
				});
			}
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
						React.createElement(H, { type: "1", text: "Mahmut Efendi Kahveleri" })
					),
					React.createElement(
						Column,
						null,
						React.createElement(
							FloatRight,
							null,
							React.createElement(
								"button",
								{ "class": this.state.followButtonAtt.buttonClassName, onClick: this.followButton },
								React.createElement(
									"i",
									{ "class": "icon" },
									this.state.followButtonAtt.icon
								),
								this.state.followButtonAtt.buttonName
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

	function Comments() {
		_classCallCheck(this, Comments);

		return _possibleConstructorReturn(this, (Comments.__proto__ || Object.getPrototypeOf(Comments)).apply(this, arguments));
	}

	_createClass(Comments, [{
		key: "render",
		value: function render() {
			if (this.props.form == "normal") {
				this.comments = [];
				for (var i = 0; i < this.props.comments.length; i++) {
					var com = this.props.comments[i];
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
							{ "class": "ui massive green message" },
							"Bu \xFCr\xFCn hen\xFCz yorumlanmam\u0131\u015F. \u0130lk yorumu sen yap!"
						)
					)
				);
			}
		}
	}]);

	return Comments;
}(React.Component);