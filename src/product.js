class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // normal, loading, notFound
			form:"normal",
			// normal, loading, noComment
			commentsForm: "normal",
			sortBy: "time",
			pageNumber: 3,
			comments: [
				{
					id:0,
					text:"burası yorumun text'i",
					likeCount:13,
					liked:true,
					title:"ahmet",
					date:"19 Temmuz - 21:45",
					tags:{3:{
							passive:false,
							text:"Batarya",
							color:"yellow",
							rateValue: "5"
						},
						4:{
							passive:false,
							text:"Kamera",
							color:"orange",
							rateValue: "4"
						},
						5:{
							passive:false,
							text:"Tasarım",
							color:"",
							rateValue: "-"
						}
					},
					owner:false
				},
				{
					id:99,
					text:"olabilir mi böyle bir şey lütfen olmasın çünkü",
					likeCount:13,
					liked:true,
					title:"ahmet",
					date:"19 Temmuz - 21:45",
					tags:[{
							id:3,
							passive:false,
							text:"Batarya",
							color:"yellow",
							rateValue: "5"
						},
						{
							id:4,
							passive:false,
							text:"Kamera",
							color:"orange",
							rateValue: "4"
						},
						{
							id:5,
							passive:false,
							text:"Tasarım",
							color:"",
							rateValue: "-"
						}
					],
					owner:false
				},
			]
		};
        this.tagsInfo = [
            {
                id:0,
                passive:true,
                text:"Akıllı Telefon",
            },
            {
                id:1,
                passive:true,
                text:"Apple"
            },
            {
                id:2,
                passive:true,
                text:"Ipone"
            },
            {
                id:3,
                passive:false,
                text:"Batarya",
                color:"yellow",
                rateValue: "5.5"
            },
            {
                id:4,
                passive:false,
                text:"Kamera",
                color:"orange",
                rateValue: "4.2"
            },
            {
                id:5,
                passive:false,
                text:"Ekran",
                color:"green",
                rateValue: "9.3"
            },
        ];
		this.changeSortBy = this.changeSortBy.bind(this);
		this.changePageNumber = this.changePageNumber.bind(this);
		this.refreshComments = this.refreshComments.bind(this);
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
    render() {
        if(this.state.form=="normal") {
            return(
                <div>
                    <Product tags={this.tagsInfo}/>
                    <PageNavigation sortBy={this.state.sortBy} handleChangeSortBy={this.changeSortBy} pageCount="6" currentPage={this.state.pageNumber} handleChangePageNumber={this.changePageNumber} />
                    <Comments comments={this.state.comments} form={this.state.commentsForm}/>
                    <PageNavigation sortBy={this.state.sortBy} handleChangeSortBy={this.changeSortBy} pageCount="6" currentPage={this.state.pageNumber} handleChangePageNumber={this.changePageNumber} />
                    <WriteComment tags={this.tagsInfo}/>
                </div>
            )
        } else if(this.state.form=="loading") {
            return(
                <RowLoadingSpin nonSegment={true}/>
            )
        } else if(this.state.form=="notFound") {
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

class Product extends React.Component {
    render() {
        return (
            <div>
                <Row size="one">
                    <Column>
                        <H type="1" text="Iphone 5s" />
                    </Column>
                </Row>
                <Row size="one">
                    <Column>
                        <Tags tags={this.props.tags} activeOnly={false}/>
                    </Column>
                </Row>
            </div>
        )
    }
}


class Comments extends React.Component {
    render() {
		if(this.props.form=="normal") {
			this.comments = [];
			for(let i=0;i<this.props.comments.length;i++) {
				let com = this.props.comments[i];
				this.comments.push(
					<Comment
						key={com.id}
						text={com.text}
						likeCount={com.likeCount}
						liked={com.liked}
						title={com.title}
						date={com.date}
						tags={com.tags}
						owner={com.owner}
					/>
				)
			}
			return (
				<div>
					{this.comments}
				</div>
			)
		} else if(this.props.form=="loading"){
			return(
				<RowLoadingSpin nonSegment={true} />
			)
		} else if(this.props.form=="noComment") {
			return(
				<Row size="one">
					<Column>
						<div class="ui massive green message">
							Bu ürün henüz yorumlanmamış. İlk yorumu sen yap!
						</div>
					</Column>
				</Row>
			)
		}
    }
}
