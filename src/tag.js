class TagPicker extends React.Component {
    // newProduct'ın içindeki yapı tagPicker'a benziyor ancak değil. Onu daha önceden yazmıştım bu sebeple daha karışık.
    constructor(props) {
        super(props);
        this.items;
        this.state = {
            tags:{
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
                5:{
                    passive:false,
                    text:"Tasarım",
                    color:"",
                    rateValue: "-",
                    slug:"tasarim"
                },
                99:{
                    passive:true,
                    text:"Pasif Etiket",
                    color:"",
                    rateValue: "-",
                    slug:"pasif-etiket"
                }
            },
            selectedTags: this.props.selectedTags,
            searchInput: "",
            typing: false,
            typingTimeout: 0,
            showItems:false,
            product:this.props.product
        }
        this.refreshTags = this.refreshTags.bind(this);
        this.refreshProduct = this.refreshProduct.bind(this);
        this.deleteTag = this.deleteTag.bind(this);
        this.onFocusInput = this.onFocusInput.bind(this);
        this.onBlurInput = this.onBlurInput.bind(this);
        this.changeInput = this.changeInput.bind(this);
        this.selectTag = this.selectTag.bind(this);
        this.prepareItems = this.prepareItems.bind(this);
    }
    componentDidMount() {
        if(firstLoading==false) {
            this.slugs = getSlugs("filtrele");
            console.log(this.slugs);
            // eğer linkteki slug etiketleri varsa onları state içindeki selectedTags'a ekliyoruz burada. sonrasında da ürün yenileme isteği çekiyoruz
            this.props.filterChangeLoading(true);
            // bu kontrol esnasında kullanıcıya loading ekranını gösteriyoruz
            this.refreshProduct();
        }
    }
    refreshTags() {
        console.log("etiket yenileme isteği buraya");
    }
    refreshProduct() {
        console.log("ürün yenileme isteği buraya");
    }
    deleteTag(e) {
        let selectedTags = this.state.selectedTags;
        delete selectedTags[e.target.attributes.name.value];
        this.setState({
            'selectedTags':selectedTags
        });
        this.refreshProduct();
    }
    onFocusInput() {
        this.setState({
            "showItems":true
        });
    }
    onBlurInput() {
        this.setState({
            "showItems":false
        });
    }
    changeInput(e){
        if (this.state.typingTimeout) {
            clearTimeout(this.state.typingTimeout);
        }
        this.setState({
            searchInput:e.target.value,
            typing:false,
            typingTimeout:setTimeout(function() {
                this.refreshTags();
            }.bind(this), 500)
        });
    }
    selectTag(e) {
        //console.log(e.target.attributes.name.value);
        let value = e.target.attributes.name.value
        let selectedTags = this.state.selectedTags;
        selectedTags[value] = this.state.tags[value];
        this.setState({
            selectedTags: selectedTags
        });
        this.refreshProduct();
    }
    prepareItems() {
        if(this.state.showItems) {
            this.items = [];
            let keyArr = Object.keys(this.state.tags);
            for(let i=0;i<keyArr.length;i++) {
                this.items.push(
                    <div className="item" key={keyArr[i]} name={keyArr[i]} onMouseDown={this.selectTag}>{this.state.tags[keyArr[i]].text}</div>
                )
            }
        } else {
            this.items = [];
        }
    }
    render() {
        this.prepareItems();
        let headerText = (Object.keys(this.state.selectedTags).length)?"Etiket":"[Etiket Seçilmedi]";
        let infoSpan = (Object.keys(this.state.selectedTags).length)?<span className="info-span">[seçimi iptal etmek için etikete dokunun]</span>:""
        return(
            <div>
                <Row size="one">
                    <Column>
                        <H type="4" text={headerText} />
                        <Tags tags={this.state.selectedTags} activeOnly={false} handleOnClick={this.deleteTag} noParameter={true}/>
                        {infoSpan}
                        <div className="ui form">
                            <div className="field">
                                <label>Etiket Ekle</label>
                                <input type="text" placeholder={"Etiket İsmi"} onFocus={this.onFocusInput} onBlur={this.onBlurInput} value={this.state.searchInput} onChange={this.changeInput}/>
                            </div>
                        </div>
                        <div className="tags-in-list">
                            <div className="ui list">
                                {this.items}
                            </div>
                        </div>
                    </Column>
                </Row>
                <ProductList product={this.state.product} changeContent={this.props.changeContent}/>
            </div>
        )
    }
}


class Tag extends React.Component {
    constructor(props){
        super(props);
        this.handleOnClick = this.handleOnClick.bind(this);
    }
    handleOnClick(e) {
        e.preventDefault();
        if(this.props.noParameter) {
            this.props.handleOnClick(e);
        } else {
            this.props.handleOnClick(e.target.href,e);
        }
    }
    render() {
        if(this.props.passive) {
            return (
                <a href={this.props.slug} className="ui large label tag-abdyek" onClick={this.handleOnClick}>{this.props.text}</a>
            )
        }
        return (
            <a href={this.props.slug} name={this.props.id} className={"ui "+this.props.color+" large label tag-abdyek"} onClick={this.handleOnClick}>{this.props.text}
                <div className="detail">{this.props.rateValue}</div> 
            </a>
        )
    }
}

class Tags extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        this.tags = []
        let keyArr = Object.keys(this.props.tags);
        for(let i=0;i<keyArr.length;i++) {
            this.tags.push(
                <Tag key={keyArr[i]}
                    id={keyArr[i]} // Tag'ın içerisinde this.props.key olarak erişmeye izin vermediği için bu şekilde göndermem gerekti
                    passive={this.props.tags[keyArr[i]].passive}
                    text={this.props.tags[keyArr[i]].text}
                    color={this.props.tags[keyArr[i]].color}
                    rateValue={this.props.tags[keyArr[i]].rateValue}
                    handleOnClick={this.props.handleOnClick}
                    slug={"filtrele/"+this.props.tags[keyArr[i]].slug}
                    noParameter={this.props.noParameter}
                />
            )
        }
        return(
            <div>
                <div class="tags">
                    {this.tags}
                </div>
            </div>
        )
    }
}