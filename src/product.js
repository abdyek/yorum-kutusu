class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form:"loading",
            specialInfo:{},
            commentType:"all",
            sortBy:"time",
            followButtonDisabled:false,
            followed:false
        }
        this.manageOtherSlug = this.manageOtherSlug.bind(this);
        this.fetchProduct = this.fetchProduct.bind(this);
        this.fetchComment = this.fetchComment.bind(this);
        this.refreshUrl = this.refreshUrl.bind(this);
        this.load = this.load.bind(this);
        this.reloadComment = this.reloadComment.bind(this);
        this.changeSortBy = this.changeSortBy.bind(this);
        this.changePageNumber = this.changePageNumber.bind(this);
        this.refreshComments = this.refreshComments.bind(this);
        this.showAllComments = this.showAllComments.bind(this);
        this.followToggle = this.followToggle.bind(this);
    }
    componentDidMount() {
        this.manageOtherSlug();
        this.load();
    }
    manageOtherSlug() {
        const pathNames = getPathNames();
        this.productSlug = pathNames[1];
        this.sortBy = (pathNames[2])?pathNames[2]:"time";
        this.pageNumber = (pathNames[3])?pathNames[3]:1;
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
            let ownComment = (isMember())?json['other']['ownComment']:null;
            this.setState({
                form:"normal",
                productName:json['other']['product']['title'],
                productID:json['other']['product']['id'],
                comments: normalizer('comments', json['other']['comments']),
                ownComment:ownComment,
                commentsForm: (json['other']['comments'].length)?'normal':'noComment',
                pageNumber: json['other']['pageNumber'],
                pageCount:json['other']['pageCount'],
                tagsInfo: normalizer('tags', json['other']['tags']),
                followed: json['other']['followed']
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
            let ownComment = (isMember())?json['other']['ownComment']:null;
            this.setState({
                commentsForm:"normal",
                comments: normalizer('comments', json['other']['comments']),
                ownComment:ownComment
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
    reloadComment() {
        this.fetchComment();
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
    followToggle() {
        if(isMember()) {
            let make = (this.state.followed)?false:true;
            this.setState({
                followButtonDisabled:true
            });
            fetch(SITEURL + 'api/followProduct', {
                method: 'POST',
                header: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productID: this.state.productID,
                    follow:make
                })
            }).then((response)=>{
                if(!response.ok) throw new Error(response.status);
                else return response.json();
            }).then((json)=>{
                this.setState({
                    followButtonDisabled:false,
                    followed:make
                });
            }).catch((error)=>{
            });
        } else {
            this.props.changeContent('giris-yap', true);
        }
    }
    render() {
        if(this.state.form=="normal") {
	        document.title = this.state.productName;
            return(
                <div>
                    <ProductInfo tags={this.state.tagsInfo} productName={this.state.productName} changeContent={this.props.changeContent} followToggle={this.followToggle} followed={this.state.followed} followButtonDisabled={this.state.followButtonDisabled}/>
					{(this.state.commentType=="all")?
                    	<PageNavigation sortBy={this.state.sortBy} form={this.state.commentsForm} handleChangeSortBy={this.changeSortBy} pageCount={this.state.pageCount} currentPage={this.state.pageNumber} handleChangePageNumber={this.changePageNumber} />
					:<SpecialCommentHeader specialInfo={this.state.specialInfo} showAllComments={this.showAllComments}/>}
                    <Comments comments={this.state.comments} form={this.state.commentsForm} changeContent={this.props.changeContent} reloadFunc={this.reloadComment} productID={this.state.productID}/>
					{(this.state.commentType=="all")?
                    	<PageNavigation sortBy={this.state.sortBy} form={this.state.commentsForm} handleChangeSortBy={this.changeSortBy} pageCount={this.state.pageCount} currentPage={this.state.pageNumber} handleChangePageNumber={this.changePageNumber} />
					:""
					}
                {
                    (this.state.ownComment)?
                        <Comment
                            productID={this.state.productID}
                            changeContent={this.props.changeContent}
                            reloadFunc={this.reloadComment}
                            id={this.state.ownComment.commentID}                //
                            text={this.state.ownComment.commentText}            //
                            type="profile"                                      //
                            slug={this.state.ownComment.owner.slug}                                 //
                            likeCount={this.state.ownComment.commentLikeCount}  //
                            liked={this.state.ownComment.liked}                 //
                            title={this.state.ownComment.owner.username}        //
                            date={this.state.ownComment.commentCreateDateTime}  //
                            tags={[]}                                           //
                            owner={true}
                        />:
                        <Comment
                            form="newComment"
                            productID={this.state.productID}
                            reloadFunc={this.reloadComment}
                            tags={[]}
                        />
                }
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
	    this.followButton = this.followButton.bind(this);
	}
	followButton() {
            this.props.followToggle();
	}
    render() {
        this.disabled = (this.props.followButtonDisabled)?"disabled":"";
        return (
            <div>
                <Row size="two" nonStackable={true}>
                    <Column>
                        <H type="1" text={this.props.productName} />
                    </Column>
		<Column>
            <FloatRight>
            {
                (!this.props.followed)?
                    <button className={"ui teal button " + this.disabled} onClick={this.followButton}>
                            <i className="icon">
                                <i className="fa fa-plus" aria-hidden="true"></i> 
                            </i>
                            Takip Et
                    </button>:
                    <button className={"ui olive button " + this.disabled} onClick={this.followButton}>
                            <i className="icon">
                                <i className="fa fa-times" aria-hidden="true"></i>
                            </i>
                            Takibi Bırak
                    </button>
            }
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
					<div className="ui big message">
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
