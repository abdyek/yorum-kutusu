class Filter extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading:firstLoading,
            selectedTags:{},
            product:{}
        }
        this.changeLoading = this.changeLoading.bind(this);
    }
    componentDidMount(){
        if(firstLoading) {
            this.load();
        }
    }
    changeLoading(trueOrFalse) {
        this.setState({
            loading:trueOrFalse
        });
    }
    load() {
        $.ajax({
            method:'GET',
            url:'http://localhost/yorum-kutusu/api/endpoints/example.php',
            data: {
                'veri': "veri" // şimdilik yaptım
            },
            success: (response)=>{
                this.setState({
                    'loading':false,
                    'selectedTags':response['selectedTags']
                });
            }
        })
        this.slugs = getSlugs("filtrele");
        console.log(this.slugs);
        // yüklenecek olası ürün
        // ^ buradaki slug'lardan ürün ve etiket bilgisi döndüren endpoint'e istek atacaksın, gelen değerlerle state'i güncelleyeceksin
        /*
        // genel yapısını görmek için bırakıyorum bu kısım sonradan silinecek
        this.product = {
            0:{
                title:"Mahmut Efendi Kahveleri",
                slug:"mahmut-efendi-kahveleri",
                tags: {
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
                    }
                }
            },
            1:{
                title:"IPhone 5s",
                slug:"iphone-5s",
                tags: {
                    0:{
                        passive:true,
                        text:"Akıllı Telefon",
                        slug:"akilli-telefon"
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
                    }
                }
            },
        }
        this.selectedTags = {
            3:{
                passive:false,
                text:"Batarya",
                color:"yellow",
                rateValue: "-",
                slug:"batarya"
            },
            4:{
                passive:false,
                text:"Kamera",
                color:"orange",
                rateValue: "-",
                slug:"kamera"
            },
        }
        */
    }
    render() {
        document.title="Filtrele";
        if(this.state.loading) {
            return (
                <RowLoadingSpin nonSegment={true} />
            )
        } else {
            return(
                <div>
                    <Row  size="sixteen">
                        <WideColumn size="two">
                        </WideColumn>
                        <WideColumn size="twelve">
                            <H type="1" text="Filtrele" />
                            <TagPicker changeContent={this.props.changeContent} product={this.state.product} selectedTags={this.state.selectedTags} filterChangeLoading={this.changeLoading} />
                        </WideColumn>
                    </Row>
                </div>
            )
        }
    }
}

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form:(firstLoading)?"normal":"loading",  // normal, loading, notFound
        }
        this.prepareProductListItems = this.prepareProductListItems.bind(this);
    }
    prepareProductListItems() {
        this.items = [];
        let product = this.props.product;
        let productKeys = Object.keys(product);
        let count = productKeys.length;
        for(let i=0; i<count;i++) {
            this.items.push(
                <ProductListItem key={productKeys[i]} productTitle={product[i].title} productSlug={product[i].slug} tags={product[i].tags} changeContent={this.props.changeContent}/>
            )
        }
        if(this.items.length==0) {
            this.setState({
                form:"notFound"
            });
        }
    }
    render() {
        if(this.state.form=="normal") {
            this.prepareProductListItems();
            return(
                <div>
                    <Row size="one">
                        <Column>
                            <H type="2" text="Ürünler" />
                            {this.items}
                        </Column>
                    </Row>
                </div>
            )
        } else if(this.state.form=="loading") {
            return(
                <div>
                    <RowLoadingSpin nonSegment={true}/>
                </div>
            )
        } else if(this.state.form=="notFound") {
            return(
                <div className="notFoundInProductList">
                    <H type="3" text="Aradığınız kriterde ürün yok" textAlign="center"/>
                </div>
            )
        }
    }
}

class ProductListItem extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                <Row size="one">
                    <Column>
                        <RaisedSegment>
                            <Row size="one">
                                <Column>
                                    <H type="3" optional="productListItemHeader" text={this.props.productTitle} href={"urun/"+this.props.productSlug} handleOnClick={(e)=>{e.preventDefault();this.props.changeContent(e.target.href)}} />
                                </Column>
                            </Row>
                            <Row size="one">
                                <Column>
                                    <Tags tags={this.props.tags} activeOnly={false} handleOnClick={this.props.changeContent} />
                                </Column>
                            </Row>
                        </RaisedSegment>
                    </Column>
                </Row>
            </div>
        )
    }
}