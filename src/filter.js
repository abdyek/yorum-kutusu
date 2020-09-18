class Filter extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        document.title="Filtrele";
        return(
            <div>
                <Row  size="sixteen">
                    <WideColumn size="two">
                    </WideColumn>
                    <WideColumn size="twelve">
                        <H type="1" text="Filtrele" />
                        <TagPicker />
                    </WideColumn>
                </Row>
            </div>
        )
    }
}

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form:"normal",  // normal, loading, notFound
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
                <ProductListItem key={productKeys[i]} productTitle={product[i].title} tags={product[i].tags}/>
                
            )
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
                                    <H type="3" optional="productListItemHeader" text={this.props.productTitle} />
                                </Column>
                            </Row>
                            <Row size="one">
                                <Column>
                                    <Tags tags={this.props.tags} activeOnly={false} handleOnClick={null}/>
                                </Column>
                            </Row>
                        </RaisedSegment>
                    </Column>
                </Row>
            </div>
        )
    }
}