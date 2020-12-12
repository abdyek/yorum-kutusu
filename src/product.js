class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form:"loading",
            specialInfo:{},
            commentType:"all",
            sortBy:"time"
        }
        this.manageOtherSlug = this.manageOtherSlug.bind(this);
        this.fetchProduct = this.fetchProduct.bind(this);
        this.fetchComment = this.fetchComment.bind(this);
        this.refreshUrl = this.refreshUrl.bind(this);
        this.load = this.load.bind(this);
        this.normalizer= this.normalizer.bind(this);
        this.changeSortBy = this.changeSortBy.bind(this);
        this.changePageNumber = this.changePageNumber.bind(this);
        this.refreshComments = this.refreshComments.bind(this);
        this.showAllComments = this.showAllComments.bind(this);
    }
    componentDidMount() {
        this.manageOtherSlug();
        this.load();
    }
    manageOtherSlug() {
        const pathNames = getPathNames();
        this.productSlug = pathNames[2];
        this.sortBy = (pathNames[3])?pathNames[3]:"time";
        this.pageNumber = (pathNames[4])?pathNames[4]:1;
        if(this.sortBy!="time" && this.sortBy!="like") {
            this.sortBy = "time";
        }
        this.setState({
            sortBy:this.sortBy
        });
        this.refreshUrl();
        let commentType = "all";  // all, spacial
        // not: buradaki değer atamalar ve değişkenlerin bir kısmı deneme amaçlı, setState içindeki hemen hemen hepsi api tarafından gelecek
    }
    fetchProduct(data) {
        fetch(SITEURL + 'api/product?' + getUrlPar(data), {method: 'GET'}).then((response)=>{
            if(!response.ok) throw new Error(response.status);
            else return response.json();
        }).then((json)=>{
            this.setState({
                form:"normal",
                productName:json['other']['product']['title'],
                comments: this.normalizer('comments', json['other']['comments']),
                commentsForm: (json['other']['comments'].length)?'normal':'noComment',
                pageNumber: json['other']['pageNumber'],
                pageCount:json['other']['pageCount'],
                tagsInfo: this.normalizer('tags', json['other']['tags'])
            });
            if(json['other']['pageNumber']!=this.pageNumber) {
                this.pageNumber = json['other']['pageNumber'];
                this.refreshUrl();
            }
        }).catch((error) => {
            console.log(error);
            if(error.message==404) {
                this.setState({form:"notFound"});
            } else {
                // ma
            }
        });
    }
    fetchComment() {
        fetch(SITEURL + 'api/product?' + getUrlPar({
            productSlug:this.productSlug,
            sortBy: this.sortBy,
            pageNumber:this.pageNumber,
            onlyComment:true
        }), {method: 'GET'}).then((response)=>{
            if(!response.ok) throw new Error(response.status);
            else return response.json();
        }).then((json)=> {
            this.setState({
                commentsForm:"normal",
                comments: this.normalizer('comments', json['other']['comments'])
            });
            this.refreshUrl();
        }).catch((error) => {
            console.log(error);
        });
    }
    refreshUrl() {
        let newUrl = SITEURL + 'urun/' + this.productSlug + '/' + this.sortBy + '/' + this.pageNumber;
        history.pushState({content: this.state}, 'Title', newUrl);
        // burası ne kadar sağlıklı oldu emin değilim
    }
    load() {
        this.fetchProduct({
            "productSlug":this.productSlug,
            "sortBy":this.sortBy,
            "pageNumber":this.pageNumber,
            "onlyComment":false
        });
    }
        normalizer(key, data) {
            if(key=='comments') {
                let comments = [];
                for(let i=0;i<data.length;i++) {
                    let com = data[i];
                    comments.push({
                        id:com.commentID,
                        text:com.commentText,
                        //commentEdited,
                        //commentLastEditDateTime,
                        likeCount:com.commentLikeCount,
                        liked:com.liked,
                        title:com.owner.username,
                        type:"profile",
                        slug:com.owner.slug,
                        date:com.commentCreateDateTime,
                        tags:this.normalizer('comment-rating', com.rating),
                        /*
                        tags:{3:{
                                        passive:false,
                                        text:"Batarya",
                                        color:"yellow",
                                        rateValue: "5",
                                        slug:"batarya"
                                },
                                4:{
                                        passive:false,
                                        text:"Kamera",
                                        color:"orange",
                                        rateValue: "4",
                                        slug:"kamera"
                                },
                                5:{
                                        passive:false,
                                        text:"Tasarım",
                                        color:"",
                                        rateValue: "-",
                                        slug:"tasarim"
                                }
                        },
                        */
                        owner:com.isOwner
                    })
                }
                return comments;
            } else if(key=="comment-rating") {
                let tags = {};
                let keys = Object.keys(data);
                for(let i=0; i<keys.length; i++) {
                    tags[keys[i]] = {
                        passive: false,
                        text:data[i].tagName,
                        color:'yellow', // bu kısım düzeltilecek
                        rateValue: data[i].ratingValue,
                        slug: data[i].slug
                    }
                }
                return tags;
            } else if(key=="tags") {
                let tags = {};
                for(let i=0; i<data.length;i++) {
                    tags[i] = {
                        passive: (data[i].tagPassive=="1")?true:false,
                        text: data[i].tagName,
                        color: getRatingColor(data[i].tagAvarageRating),
                        slug: data[i].slug,
                        rateValue: data[i].tagAvarageRating
                    }
                }
                console.log(tags);
                return tags;
            }

        }
	changeSortBy(value) {
            if(value!=this.state.sortBy && this.state.commentsForm!="loading") {
                // ^ bu ve changePageNumber metodundaki kontrolü kullanıcının aynı anda birden fazla seçim yapmasını engellemek için koydum
                this.setState({
                    sortBy:value
                });
                this.sortBy=value;
                this.refreshComments();
            }
	}
	changePageNumber(value){
		if(value!=this.state.pageNumber && this.state.commentsForm!="loading") {
                    this.setState({
                        pageNumber: value
                    });
                    this.pageNumber = value;
                    this.refreshComments();
		}
	}
	refreshComments() {
            // yorum getirme işlemi burada olacak ve yorum geleseğe kadar loading'e dönecek
            this.setState({
                commentsForm:"loading"
            });
            this.fetchComment();
	}
	showAllComments() {
		this.setState({
			commentType:"all",
			sortBy:this.sortBy,
			pageNumber:1
		});
		this.refreshComments();
	}
    render() {
        if(this.state.form=="normal") {
			document.title = this.state.productName;
            return(
                <div>
                    <ProductInfo tags={this.state.tagsInfo} productName={this.state.productName} changeContent={this.props.changeContent}/>
					{(this.state.commentType=="all")?
                    	<PageNavigation sortBy={this.state.sortBy} form={this.state.commentsForm} handleChangeSortBy={this.changeSortBy} pageCount={this.state.pageCount} currentPage={this.state.pageNumber} handleChangePageNumber={this.changePageNumber} />
					:<SpecialCommentHeader specialInfo={this.state.specialInfo} showAllComments={this.showAllComments}/>}
                    <Comments comments={this.state.comments} form={this.state.commentsForm} changeContent={this.props.changeContent}/>
					{(this.state.commentType=="all")?
                    	<PageNavigation sortBy={this.state.sortBy} form={this.state.commentsForm} handleChangeSortBy={this.changeSortBy} pageCount={this.state.pageCount} currentPage={this.state.pageNumber} handleChangePageNumber={this.changePageNumber} />
					:""
					}
                    <WriteComment tags={this.state.tagsInfo}/>
                </div>
            )
        } else if(this.state.form=="loading") {
			document.title = "Ürün";
            return(
                <RowLoadingSpin nonSegment={true}/>
            )
        } else if(this.state.form=="notFound") {
			document.title = "Ürün Bulunamadı";
            return(
                <Row size="one">
                    <Column>
                        <BasicMessage type="warning" text="Böyle bir ürün yok" />
                        <Center>
                            <a href="urun-olustur">
                                Yeni Bir Ürün Oluştur
                            </a>
                        </Center>
                    </Column>
                </Row>
            )
        }
    }
}

class ProductInfo extends React.Component {
	constructor(props) {
		super(props);
		this.followButtonAtt = {
			follow: {
				followed: false,
				buttonName: "Takip Et",
				buttonClassName: "ui teal button",
				icon: <i class="fa fa-plus" aria-hidden="true"></i>
			},
			unfollow: {
				followed: true,
				buttonName: "Takibi Bırak",
				buttonClassName: "ui olive button",
				icon: <i class="fa fa-times" aria-hidden="true"></i>
			}
		}
		this.state = {
			followed: false,
			followButtonAtt: this.followButtonAtt.follow,
		};
		this.followButton = this.followButton.bind(this);
	}
	followButton() {
		if(this.state.followed) {
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
    render() {
        return (
            <div>
                <Row size="two" nonStackable={true}>
                    <Column>
                        <H type="1" text={this.props.productName} />
                    </Column>
					<Column>
						<FloatRight>
							<button class={this.state.followButtonAtt.buttonClassName} onClick={this.followButton}>
								<i class="icon">
									{this.state.followButtonAtt.icon}
								</i>
									{this.state.followButtonAtt.buttonName}
							</button>
						</FloatRight>
					</Column>
                </Row>
                <Row size="one">
                    <Column>
                        <Tags tags={this.props.tags} activeOnly={false} handleOnClick={this.props.changeContent}/>
                    </Column>
                </Row>
            </div>
        )
    }
}

class SpecialCommentHeader extends React.Component {
	render() {
		return(
			<Row size="one">
				<Column>
					<div class="ui big message">
						<Row size="two">
							<Column>
								{this.props.specialInfo.first} - {this.props.specialInfo.last} arası gösteriliyor
							</Column>
							<Column>
								<FloatRight>
									<a onClick={(e)=>{e.preventDefault();this.props.showAllComments()}}>Tümünü Göster</a>
								</FloatRight>
							</Column>
						</Row>
					</div>
				</Column>
			</Row>
		)
	}
}
