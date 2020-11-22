const DATA = {
    product: {
        id: "1",
        title: "Başlık",
        slug: "slug'ı"
    },
    tags: [
        {
            slug:"apple",
            tagName:"Apple",
            tagAvarageRating: null
        },
        {
            slug:"ekran",
            tagName:"Ekran",
            tagAvarageRating: null
        }
    ],
    comments: [
        {
            id: "1",
            text: "bu bir yorumdur",
            dateTime: "2020-11-22 13:23:08",
            edited: "0",
            lastEditDateTime: null,
            likeCount: "0",
            liked: false,
            isOwner: true,
            owner: {
                id: "1",
                username:"MahmuT",
                slug: "mahmut",
            },
            rating: [
                {
                    slug: "ekran",
                    tagName: "Ekran",
                    ratingValue: "5"
                }
            ]
        }
    ]
}
class Product extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
		    form:"loading"
		}
		this.changeSortBy = this.changeSortBy.bind(this);
		this.changePageNumber = this.changePageNumber.bind(this);
		this.refreshComments = this.refreshComments.bind(this);
		this.showAllComments = this.showAllComments.bind(this);
	}
	componentDidMount() {
		let slugs = getSlugsExtra("urun");
		let productSlugs = slugs[0];
		let specialInfo = {};
		//let sortBy = "like";
		let pageNumber = 1;
		if(slugs[1]=="arasi") {
		    specialInfo = {
		            first:slugs[2].split("-")[0],
		            last:slugs[2].split("-")[1]
		    }
		} else {
		    sortBy = slugs[1];
		    pageNumber = slugs[2];
		}
		let commentType = "all";  // all, spacial
		// not: buradaki değer atamalar ve değişkenlerin bir kısmı deneme amaçlı, setState içindeki hemen hemen hepsi api tarafından gelecek
		
		// yüklenme komutları burada olacak
        this.setState({
            // normal, loading, notFound
			form:"normal",
			// normal, loading, noComment
			productName:"Iphone 5s",
			commentsForm: "normal",
			commentType: commentType,	// all, special
			specialInfo: specialInfo,
			/*
			specialInfo:{
				first:"15",
				last:"30"
			},
			*/
			sortBy: "time",
			pageNumber: 3,
			comments: [
				{
					id:0,
					text:"burası yorumun text'i",
					likeCount:13,
					liked:true,
					title:"ahmet",
					type:"profile",
					slug:"ahmet",
					date:"19 Temmuz - 21:45",
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
					owner:true
				},
				{
					id:99,
					text:"Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı 1500'lerden beri endüstri standardı sahte metinler olarak kullanılmıştır. Beşyüz yıl boyunca varlığını sürdürmekle kalmamış, aynı zamanda pek değişmeden elektronik dizgiye de sıçramıştır. 1960'larda Lorem Ipsum pasajları da içeren Letraset yapraklarının yayınlanması ile ve yakın zamanda Aldus PageMaker gibi Lorem Ipsum sürümleri içeren masaüstü yayıncılık yazılımları ile popüler olmuştur.Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı 1500'lerden beri endüstri standardı sahte metinler olarak kullanılmıştır. Beşyüz yıl boyunca varlığını sürdürmekle kalmamış, aynı zamanda pek değişmeden elektronik dizgiye de sıçramıştır. 1960'larda Lorem Ipsum pasajları da içeren Letraset yapraklarının yayınlanması ile ve yakın zamanda Aldus PageMaker gibi Lorem Ipsum sürümleri içeren masaüstü yayıncılık yazılımları ile popüler olmuştuLorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı 1500'lerden beri endüstri standardı sahte metinler olarak kullanılmıştır. Beşyüz yıl boyunca varlığını sürdürmekle kalmamış, aynı zamanda pek değişmeden elektronik dizgiye de sıçramıştır. 1960'larda Lorem Ipsum pasajları da içeren Letraset yapraklarının yayınlanması ile ve yakın zamanda Aldus PageMaker gibi Lorem Ipsum sürümleri içeren masaüstü yayıncılık yazılımları ile popüler olmuştur.Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı 1500'lerden beri endüstri standardı sahte metinler olarak kullanılmıştır. Beşyüz yıl boyunca varlığını sürdürmekle kalmamış, aynı zamanda pek değişmeden elektronik dizgiye de sıçramıştır. 1960'larda Lorem Ipsum pasajları da içeren Letraset yapraklarının yayınlanması ile ve yakın zamanda Aldus PageMaker gibi Lorem Ipsum sürümleri içeren masaüstü yayıncılık yazılımları ile popüler olmuştur.Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı 1500'lerden beri endüstri standardı sahte metinler olarak kullanılmıştır. Beşyüz yıl boyunca varlığını sürdürmekle kalmamış, aynı zamanda pek değişmeden elektronik dizgiye de sıçramıştır. 1960'larda Lorem Ipsum pasajları da içeren Letraset yapraklarının yayınlanması ile ve yakın zamanda Aldus PageMaker gibi Lorem Ipsum sürümleri içeren masaüstü yayıncılık yazılımları ile popüler olmuştur.r.",
					likeCount:13,
					liked:true,
					title:"Yunus Emre",
					type:"profile",
					slug:"yunus-emre",
					date:"19 Temmuz - 21:45",
					tags:{
						3:{
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
					owner:false
				},
			],
			tagsInfo : {
				0:{
					passive:true,
					text:"Akıllı Telefon",
					slug:"akilli-telefon"
				},
				1:{
					passive:true,
					text:"Apple",
					slug:"apple"
				},
				2:{
					passive:true,
					text:"IPhone",
					slug:"iphone"
				},
				3:{
					passive:false,
					text:"Batarya",
					color:"yellow",
					rateValue: "5.5",
					slug:"batarya"
				},
				4:{
					passive:false,
					text:"Kamera",
					color:"orange",
					rateValue: "4.2",
					slug:"kamera"
				},
				5:{
					passive:false,
					text:"Ekran",
					color:"green",
					rateValue: "9.3",
					slug:"ekran"
				},
			}
		});
	}
	changeSortBy(value) {
		if(value!=this.state.sortBy && this.state.commentsForm!="loading") {
			// ^ bu ve changePageNumber metodundaki kontrolü kullanıcının aynı anda birden fazla seçim yapmasını engellemek için koydum
			this.setState({
				sortBy:value
			});
			this.refreshComments();
		}
	}
	changePageNumber(value){
		if(value!=this.state.pageNumber && this.state.commentsForm!="loading") {
			this.setState({
				pageNumber: value
			});
			this.refreshComments();
		}
	}
	refreshComments() {
		// yorum getirme işlemi burada olacak ve yorum geleseğe kadar loading'e dönecek
		this.setState({
			commentsForm:"loading"
		});
	}
	showAllComments() {
		this.setState({
			commentType:"all",
			sortBy:"time",
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
                    	<PageNavigation sortBy={this.state.sortBy} handleChangeSortBy={this.changeSortBy} pageCount="6" currentPage={this.state.pageNumber} handleChangePageNumber={this.changePageNumber} />
					:<SpecialCommentHeader specialInfo={this.state.specialInfo} showAllComments={this.showAllComments}/>}
                    <Comments comments={this.state.comments} form={this.state.commentsForm} changeContent={this.props.changeContent}/>
					{(this.state.commentType=="all")?
                    	<PageNavigation sortBy={this.state.sortBy} handleChangeSortBy={this.changeSortBy} pageCount="6" currentPage={this.state.pageNumber} handleChangePageNumber={this.changePageNumber} />
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
				buttonClassName: "ui gray button",
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
