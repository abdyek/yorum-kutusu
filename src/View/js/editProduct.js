class EditProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form:"loading", // normal, loading, notFound
            productID:null,
            productName:"",
            productSlug:"",
            tags:[],
        };
        this.loadProductInfo = this.loadProductInfo.bind(this);
    }
    componentDidMount() {
        if(!isMember()) {
            this.props.changeContent('giris-yap', true);
        }
        this.loadProductInfo();
    }
    loadProductInfo() {
        const pathNames = getPathNames();
        this.productSlug = pathNames[1];
        fetch(SITEURL + 'api/product?' + getUrlPar({
            productSlug:this.productSlug,
            type:"time",
            pageNumber:1,
            onlyComment:false
        }), {method: 'GET'}).then((response)=>{
            if(!response.ok) throw new Error(response.status);
            else return response.json();
        }).then((json)=>{
            this.setState({
                form:"normal",
                productID:json.other.product.id,
                productName:json.other.product.title,
                productSlug:json.other.product.slug,
                tags:normalizer('tags-for-product-changing-from-api', json.other.tags)
            });
        }).catch((error) => {
            if(error.message==404) {
                this.setState({form:"notFound"});
            }
        });
    }
    render() {
        if(this.state.form=="loading") {
            return (
                <Row size="one">
                    <Column>
                        <RowLoadingSpin nonSegment={true} />
                    </Column>
                </Row>
            )
        } else if(this.state.form=="normal") {
            return (
                <div>
                    <Row size="one">
                        <Column>
                            <H type="1" text="Ürün Düzenle" id={"newProductHeader"} textAlign={"center"}/>
                        </Column>
                    </Row>
                    <Row size="one">
                        <Column>
                            <ProductEditor
                                changeContent={this.props.changeContent}
                                productName={this.state.productName}
                                productSlug={this.state.productName}
                                tags={this.state.tags}
                                editMode={true}
                                productID={this.state.productID}
                            />
                        </Column>
                    </Row>
                </div>
            )
        } else if(this.state.form=="notFound") {
            return (
                <ProductNotFound changeContent={this.props.changeContent} />
            )
        }
    }
}

class ProductNotFound extends React.Component {
    constructor(props) {
        super(props);
        this.goNewProduct = this.goNewProduct.bind(this);
    }
    goNewProduct(e) {
        e.preventDefault();
        this.props.changeContent('yeni-urun', true);
    }
    render() {
	document.title = "Ürün Bulunamadı";
        return(
            <Row size="one">
                <Column>
                    <Message header="404" message="Böyle bir ürün yok" type="yellow" />
                    <Center>
                        <a href="yeni-urun" onClick={this.goNewProduct}>
                            Yeni Bir Ürün Oluştur
                        </a>
                    </Center>
                </Column>
            </Row>
        )
    }
}
