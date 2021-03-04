class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form:"loading",
            specialInfo:{},
            navigationType:"all",
            navigationOptions: [],
            sortBy:"time",
            followButtonDisabled:false,
            followed:false,
            bottomCommentForm:"newComment",
            ownCommentPublished:true
        }
        this.manageSlugs = this.manageSlugs.bind(this);
        this.fetchProduct = this.fetchProduct.bind(this);
        this.fetchComment = this.fetchComment.bind(this);
        this.refreshUrl = this.refreshUrl.bind(this);
        this.load = this.load.bind(this);
        this.reloadComment = this.reloadComment.bind(this);
        this.reloadAllComment = this.reloadAllComment.bind(this);
        this.changeSortBy = this.changeSortBy.bind(this);
        this.changePageNumber = this.changePageNumber.bind(this);
        this.refreshComments = this.refreshComments.bind(this);
        this.showAllComments = this.showAllComments.bind(this);
        this.followToggle = this.followToggle.bind(this);
        this.openEditOfBottomComment = this.openEditOfBottomComment.bind(this);
        this.openDeleteOfBottomComment = this.openDeleteOfBottomComment.bind(this);
        this.openNormalOfBottomComment = this.openNormalOfBottomComment.bind(this);
        this.hideBottomComment = this.hideBottomComment.bind(this);
        this.openLoadingSpinOfBottomComment = this.openLoadingSpinOfBottomComment.bind(this);
    }
    componentDidMount() {
        this.manageSlugs();
        this.load();
    }
    manageSlugs() {
        const pathNames = getPathNames();
        this.productSlug = pathNames[1];
        if(pathNames[2]=="unread") {
            this.pageType = "unread";
            this.setState({
                navigationType:"unread"
            });
        } else {
            this.pageType = "all";
            this.sortBy = (pathNames[2])?pathNames[2]:"time";
            this.pageNumber = (pathNames[3])?pathNames[3]:1;
            if(this.sortBy!="time" && this.sortBy!="like") {
                this.sortBy = "time";
            }
            this.setState({
                sortBy:this.sortBy
            });
            this.refreshUrl();
        }
        let navigationType= "all";  // all, spacial
        // not: buradaki değer atamalar ve değişkenlerin bir kısmı deneme amaçlı, setState içindeki hemen hemen hepsi api tarafından gelecek
    }
    detectBottomCommentForm(ownComment) {
        if(isMember()) {
            if(ownComment){
                return "normal";
            } else {
                return "newComment";
            }
        } else {
            return "hidden";
        }
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
                productSlug:json.other.product.slug,
                productID:json['other']['product']['id'],
                comments: normalizer('comments', json['other']['comments']),
                ownComment:ownComment,
                ownCommentPublished:json.other.ownCommentPublished,
                bottomCommentForm: this.detectBottomCommentForm(json['other']['ownComment']),
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
            type: this.sortBy,
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
                ownComment:ownComment,
                ownCommentPublished:json.other.ownCommentPublished,
                pageNumber: json['other']['pageNumber'],
                pageCount:json['other']['pageCount']
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
        if(this.pageType=="all") {
            this.fetchProduct({
                "productSlug":this.productSlug,
                "type":this.sortBy,
                "pageNumber":this.pageNumber,
                "onlyComment":false
            });
        } else if(this.pageType=="unread") {
            this.fetchProduct({
                "productSlug":this.productSlug,
                "type":"unread",
                "pageNumber":1,
                "onlyComment":false
            });
        }
    }
    reloadComment() {
        this.fetchComment();
    }
    reloadAllComment() {
        this.setState({
            bottomCommentForm:"loading"
        });
        fetch(SITEURL + 'api/product?' + getUrlPar({
            productSlug:this.productSlug,
            type: this.sortBy,
            pageNumber:this.pageNumber,
            onlyComment:false
        }), {method: 'GET'}).then((response)=>{
            if(!response.ok) throw new Error(response.status);
            else return response.json();
        }).then((json)=> {
            let ownComment = (isMember())?json['other']['ownComment']:null;
            this.setState({
                commentsForm: (json['other']['comments'].length)?'normal':'noComment',
                comments: normalizer('comments', json['other']['comments']),
                ownComment:ownComment,
                ownCommentPublished:json.other.ownCommentPublished,
                bottomCommentForm: this.detectBottomCommentForm(json['other']['ownComment']),
                tagsInfo: normalizer('tags', json['other']['tags']),
                pageNumber: json['other']['pageNumber'],
                pageCount:json['other']['pageCount']
            });
            this.refreshUrl();
        }).catch((error) => {
            console.log(error);
        });
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
			navigationType:"all",
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
    openEditOfBottomComment() {
        this.setState({
            bottomCommentForm:"edit"
        });
    }
    openDeleteOfBottomComment() {
        this.setState({
            bottomCommentForm:"delete"
        });
    }
    openNormalOfBottomComment() {
        this.setState({
            bottomCommentForm:"normal"
        })
    }
    hideBottomComment() {
        this.setState({
            bottomCommentForm:"hidden"
        });
    }
    openLoadingSpinOfBottomComment() {
        this.setState({
            bottomCommentForm:"loading"
        });
    }
    render() {
        if(this.state.form=="normal") {
	        document.title = this.state.productName;
            return(
                <div>
                    <ProductInfo tags={this.state.tagsInfo} productName={this.state.productName} changeContent={this.props.changeContent} followToggle={this.followToggle} followed={this.state.followed} followButtonDisabled={this.state.followButtonDisabled}/>

                    <Navigation
                        type={this.state.navigationType}
                        sortBy={this.state.sortBy}
                        navigationOptions={this.state.navigationOptions}
                        form={this.state.commentsForm}
                        handleChangeSortBy={this.changeSortBy}
                        pageCount={this.state.pageCount}
                        currentPage={this.state.pageNumber}
                        handleChangePageNumber={this.changePageNumber}
                        showAllComments={this.showAllComments}
                    />
                    <Comments
                        comments={this.state.comments}
                        tags={this.state.tagsInfo}
                        form={this.state.commentsForm}
                        changeContent={this.props.changeContent}
                        reloadFunc={this.reloadAllComment}
                        productID={this.state.productID}
                    />
                    <Navigation
                        type={this.state.navigationType}
                        sortBy={this.state.sortBy}
                        navigationOptions={this.state.navigationOptions}
                        form={this.state.commentsForm}
                        handleChangeSortBy={this.changeSortBy}
                        pageCount={this.state.pageCount}
                        currentPage={this.state.pageNumber}
                        handleChangePageNumber={this.changePageNumber}
                        showAllComments={this.showAllComments}
                    />
                    <BottomComment
                        form={this.state.bottomCommentForm}
                        reloadFunc={this.reloadAllComment}
                        productID={this.state.productID}
                        tags={this.state.tagsInfo}
                        ownComment={this.state.ownComment}
                        ownCommentPublished={this.state.ownCommentPublished}
                        changeContent={this.props.changeContent}
                        openEdit={this.openEditOfBottomComment}
                        openDelete={this.openDeleteOfBottomComment}
                        openNormal={this.openNormalOfBottomComment}
                        hide={this.hideBottomComment}
                        openLoadingSpin={this.openLoadingSpinOfBottomComment}
                    />
                    <EditProductButton changeContent={this.props.changeContent} productSlug={this.state.productSlug} />
                </div>
            )
        } else if(this.state.form=="loading") {
	    document.title = "Ürün";
            return(
                <RowLoadingSpin nonSegment={true}/>
            )
        } else if(this.state.form=="notFound") {
            return (
                <ProductNotFound changeContent={this.props.changeContent}/>
            )
        }
    }
}

class Navigation extends React.Component {
    render() {
        if(this.props.type=="all") {
            return (
                <PageNavigation
                    sortBy={this.props.sortBy}
                    options={this.props.navigationOptions}
                    form={this.props.form}
                    handleChangeSortBy={this.props.handleChangeSortBy}
                    pageCount={this.props.pageCount}
                    currentPage={this.props.currentPage}
                    handleChangePageNumber={this.props.handleChangePageNumber}
                />
            )
        } else if(this.props.type=="unread") {
            return (
                <UnreadNavigation
                    showAllComments={this.props.showAllComments}
                />
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
                        <H type="1" text={this.props.productName} id={"productHeader"}/>
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

class UnreadNavigation extends React.Component {
    render() {
        return(
            <Row size="one">
                <Column>
                    <div className="ui big message">
                        <Row size="two">
                            <Column>
                                Okunmamış 127 yorumunuzdan ilk 10'u gösteriliyor
                            </Column>
                            <Column>
                                <FloatRight>
                                    <button className="ui olive small button" onClick={this.props.showAllComments}>Sonraki</button>
                                    <button className="ui olive small button" onClick={this.props.showAllComments}>Bütün Yorumları Göster</button>
                                </FloatRight>
                            </Column>
                        </Row>
                    </div>
                </Column>
            </Row>
        )
    }
}

class EditProductButton extends React.Component {
    constructor(props){
        super(props);
        this.goEditProduct = this.goEditProduct.bind(this);
    }
    goEditProduct() {
        if(isMember()) {
            this.props.changeContent(SITEURL+'urun-duzenle/'+this.props.productSlug);
        } else {
            this.props.changeContent('giris-yap', true);
        }
    }
    render() {
        return(
            <Row size="one">
                <Column>
                    <button class="ui teal button" onClick={this.goEditProduct}>
                        <i class="icon">
                            <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                        </i>
                        Düzenle
                    </button>
                </Column>
            </Row>
        )
    }
}
