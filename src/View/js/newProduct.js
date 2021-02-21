class NewProduct extends React.Component {
    render() {
        return (
            <div>
                <ProductEditor changeContent={this.props.changeContent}/>
            </div>
        )
    }
}

class ProductEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form:"normal", // normal, created
            productName:"",
            productSlug:"",
            productInputLoading:"",
            productAvailable: false,
            emptyProductNameWarn: false,
            tags:[
                {
                    id:1,
                    slug: "ekran",
                    name: "Ekran",
                    passive: false
                },
                {
                    id:2,
                    slug: "batarya",
                    name: "Batarya",
                    passive: false
                },
                {
                    id:3,
                    slug: "motorola",
                    name: "Motorola",
                    passive: true
                },
            ]
        };
        this.updateProductName = this.updateProductName.bind(this);
        this.setProductInputLoading = this.setProductInputLoading.bind(this);
        this.loadInfo = this.loadInfo.bind(this);
        this.goProduct = this.goProduct.bind(this);
        this.closeTag = this.closeTag.bind(this);
        this.createProduct = this.createProduct.bind(this);
    }
    updateProductName(e) {
        this.setState({
            productName:e.target.value,
            productSlug:generateProductSlug(e.target.value)
        });
        clearTimeout(this.setTime);
        if(e.target.value.length) {
            this.setTime = setTimeout(function() {
                this.setProductInputLoading(true);
                this.loadInfo();
            }.bind(this), 1000);
        }
    }
    setProductInputLoading(value) {
        const str = (value)?"loading":"";
        this.setState({
            productInputLoading: str
        });
    }
    loadInfo() {
        fetch(SITEURL + 'api/newProductChecker?' + getUrlPar({
            'productName':this.state.productName
        }), {method: 'GET'}).then((response)=>{
            if(!response.ok) throw new Error(response.status);
            else return response.json();
        }).then((json)=>{
            let available;
            if(json.available) {
                available=true;
            } else {
                available=false;
            }
            this.setState({
                productAvailable:available,
                productSlug:json.slug,
                productInputLoading:"",
            });
        }).catch((error) => {
            if(error.message==404) {
                
            }
        });
    }
    goProduct() {
        this.props.changeContent(SITEURL+"urun/"+this.state.productSlug);
    }
    closeTag(id) {
        const tags = this.state.tags.filter(function(tag) {
            if(tag.id!=id) 
                return tag
        });
        this.setState({
            tags:tags
        });
    }
    createProduct() {
        console.log("product will be created");
        if(this.state.productName.length == 0) {
            this.setState({
                emptyProductNameWarn:true
            });
            return;
        }
        this.setState({
            form:"loading"
        });
    }
    render() {
        if(this.state.form=="normal") {
            return(
                <div>
                    <Row size="sixteen">
                        <WideColumn size="one"></WideColumn>
                        <WideColumn size="fourteen">
                            <Row size="one">
                                <Column>
                                    <H type="1" text="Yeni Ürün" id={"newProductHeader"} textAlign={"center"}/>
                                </Column>
                            </Row>
                            <Row size="one">
                                <Column>
                                    <h3 className="hStandart">Ürün Adı</h3>
                                    <div className={"ui form "+this.state.productInputLoading+" newProductForm"}>
                                        <div className="field">
                                            <label id="productSlugLabel">urun/{this.state.productSlug}</label>
                                            <input type="text" onChange={this.updateProductName} value={this.state.productName} placeholder="Ürün İsimi" />
                                        </div>
                                    </div>
                                </Column>
                            </Row>
                            {(this.state.productAvailable)?
                                <div>
                                    <Row size="one">
                                        <Column>
                                            <BasicMessageWithColor color={"yellow"} message="Bu ürün mevcut" />
                                        </Column>
                                    </Row>
                                    <Row size="one">
                                        <Column>
                                            <Center>
                                                <Button type="huge green" name="Ürün Sayfasına Git" click={this.goProduct}/>
                                            </Center>
                                        </Column>
                                    </Row>
                                </div>:
                                <div>
                                    <Row size="one">
                                        <Column>
                                            <h1 id="newProductPreviewHeader"> {this.state.productName} </h1>
                                        </Column>
                                    </Row>
                                    <TagSelector tags={this.state.tags} closeFunc={this.closeTag}/>
                                    {(this.state.emptyProductNameWarn)?
                                        <div>
                                            <Row>
                                                <Column>
                                                    <BasicMessageWithColor color="yellow" message={"İsimsiz ürün oluşturamazsınız!"}/>
                                                </Column>
                                            </Row>
                                        </div>:""
                                    }
                                    <Row size="one">
                                        <Column>
                                            <FloatRight>
                                                <Button type="large green" name="Oluştur" click={this.createProduct}/>
                                            </FloatRight>
                                        </Column>
                                    </Row>
                                </div>
                            }
                        </WideColumn>
                        <WideColumn size="/one"></WideColumn>
                    </Row>
                </div>
            )
        } else if(this.state.form=="created") {
            return (
                <Row size="sixteen">
                    <WideColumn size="one"></WideColumn>
                    <WideColumn size="fourteen">
                        <Message header="Teşekkürler" message="Başarılı bir şekilde gönderildi. Yönetici onayısından sonra ürüne yorum ekleyebilirsiniz"/>
                    </WideColumn>
                    <WideColumn size="one"></WideColumn>
                </Row>
            )
        } else if(this.state.form=="loading") {
            return (
                <Row size="one">
                    <Column>
                        <RowLoadingSpin nonSegment={true} />
                    </Column>
                </Row>
            )
        }
    }
}

class TagSelector extends React.Component {
    constructor(props) {
        super(props);
        this.prepareTags = this.prepareTags.bind(this);
    }
    prepareTags() {
        let color;
        this.tags = [];
        for(let i=0;i<this.props.tags.length;i++) {
            color = (this.props.tags[i].passive)?"grey":"orange";
            this.tags.push(
                <TagWithClose key={this.props.tags[i].id} id={this.props.tags[i].id} color={color} name={this.props.tags[i].name} closeFunc={this.props.closeFunc} />
            )
        }
    }
    render() {
        this.prepareTags();
        return (
            <div>
                <Row size="one">
                    <Column>
                        <SearchBar inputPlaceholder={"Etiket Ara.."}/>
                        {/*
                        <div className="ui input">
                            <input type="text" placeholder="Etiket" />
                        </div>
                        */}
                    </Column>
                </Row>
                <Row size="one">
                    <Column>
                        {this.tags}
                    </Column>
                </Row>
            </div>
        )
    }
}

class TagWithClose extends React.Component {
    constructor(props) {
        super(props);
        this.close = this.close.bind(this);
    }
    close() {
        this.props.closeFunc(this.props.id);
    }
    render() {
        this.color = this.props.color || "";
        return (
            <div className="TagWithClose">
                <a className={"ui "+this.color+" large label"}>{this.props.name}</a>
                <i className="icon" onClick={this.close} >
                    <i className="fa fa-times" aria-hidden="true"></i>
                </i>
            </div>
        )
    }
}


class NewProduct2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form:"input", // input, showInfo, loading
            topMessage: null,
            productName: "",
            productUrl: "",
            tagSearchInput:"",
            tagsInList:{
                /*
                3:{
                    passive:false,
                    text:"Batarya",
                    color:"yellow",
                    rateValue: "-"
                },
                4:{
                    passive:false,
                    text:"Kamera",
                    color:"orange",
                    rateValue: "-"
                },
                5:{
                    passive:false,
                    text:"Tasarım",
                    color:"",
                    rateValue: "-"
                },
                99:{
                    passive:true,
                    text:"Pasif Etiket",
                    color:"",
                    rateValue: "-"
                }
                */
            },
            selectedTags: {},
            newTagIndex:0,
            createProductButtonName: "Oluştur",
        };
        this.turkishChars = {
            "ğ": "g",
            "ü": "u",
            "ş": "s",
            "ı": "i",
            "ö": "o",
            "ç": "c"
        };
        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.generateProductUrl = this.generateProductUrl.bind(this);
        this.onChangeTagSearchInput = this.onChangeTagSearchInput.bind(this);
        this.selectTag = this.selectTag.bind(this);
        this.unselectTag = this.unselectTag.bind(this);
        this.refreshTagsInList = this.refreshTagsInList.bind(this);
        this.createProduct = this.createProduct.bind(this);
    }
    componentDidMount() {
        if(!isMember()) {
            this.props.changeContent('giris-yap', true);
        }
    }
    onChangeProductName(e) {
        this.setState({
            productName: e.target.value,
            productUrl: this.generateProductUrl(e.target.value)
        });
        this.refreshTagsInList();
    }
    generateProductUrl(productName) {
        productName = productName.toLowerCase();
        let url = "";
        for(let i=0;i<productName.length;i++) {
            if(productName[i]==" ") {
                url += "-";
            } else if(this.turkishChars[productName[i]]){
                url += this.turkishChars[productName[i]];
            } else {
                url += productName[i];
            }
        }
        return url;
    }
    onChangeTagSearchInput(e) {
        this.setState({
            tagSearchInput: e.target.value
        });
    }
    selectTag(id) {
        let selectedTag = this.state.selectedTags;
        if(id=="new") {
            const newTagName = this.state.tagSearchInput;
            const newTag = {
                passive:false,
                text:newTagName,
                color:"",
                rateValue: "?"
            };
            selectedTag[newTagName] = newTag;
        } else {
            selectedTag[id] = this.state.tagsInList[id];
        }
        this.setState({
            selectedTags: selectedTag,
            tagSearchInput:""
        });
    }
    unselectTag(e) {
        if(this.state.form=="input") {
            let selectedTag = this.state.selectedTags;
            delete selectedTag[e.target.attributes.name.value];
            this.setState({
                selectedTags: selectedTag,
            });
        }
    }
    refreshTagsInList() {
        // gidip etiket çekecek gelen veriyi tagsInList olarak güncelleyeceksin böylelikle tag listesi değişmiş olacak
    }
    createProduct() {
        if(this.state.form=="input") {
            this.setState({
                form:"showInfo",
                createProductButtonName: "Düzenle",
                topMessage: {
                    type:"success",
                    text:"Başarılı bir şekilde gönderildi, yönetici onaylaması durumunda bu ürün eklenecek"
                }
            });
        } else {
            this.setState({
                form:"input",
                createProductButtonName: "Oluştur"
            });
        }
    }
    render() {
        document.title = "Yeni Ürün Oluştur";
        if(this.state.form=="loading") {
            return(
                <RowLoadingSpin nonSegment={true}/>
            )
        } else {
            return(
                <div>
                    <Row size="one">
                        <Column>
                            <Row size="sixteen">
                                <WideColumn size="two"></WideColumn>
                                <WideColumn size="twelve">
                                    {(this.state.topMessage)?
                                        <BasicMessage type={this.state.topMessage.type} text={this.state.topMessage.text} />
                                    :""}
                                    <H type="1" text="Yeni Ürün" />
                                    <div className="ui form">
                                        <div className="field">
                                            <label>yorumkutusu.com/urun/{this.state.productUrl}</label>
                                            {(this.state.form=="input")?
                                                <input type="text" placeholder="Ürün İsmi" onChange={this.onChangeProductName} value={this.state.productName}/>
                                            :
                                                <H type="3" text={this.state.productName} /> 
                                            }
                                        </div>
                                    </div>
                                    <SelectedTags tags={this.state.selectedTags} handleOnClick={this.unselectTag} form={this.state.form}/>
                                    {(this.state.form=="input")?
                                        <TagList labelText="Etiket Ekle" placeholderText="Etiket İsmi" tags={this.state.tagsInList} handleSelectTag={this.selectTag} tagSearchInput={this.state.tagSearchInput} handleChangeTagSearchInput={this.onChangeTagSearchInput}/>
                                    :""}
                                </WideColumn>
                            </Row>
                        </Column>
                    </Row>
                    <Row size="sixteen">
                        <WideColumn size="two"> </WideColumn>
                        <WideColumn size="twelve">
                            <FloatRight>
                                <button class={(this.state.productName.length)?"ui green button":"ui green disabled button"} onClick={this.createProduct}>
                                    {this.state.createProductButtonName}
                                </button>
                            </FloatRight>
                        </WideColumn>
                    </Row>
                </div>
            )
        }
    }
}

class SelectedTags extends React.Component {
    render() {
        if(Object.keys(this.props.tags).length) {
            return(
                <div>
                    <div id="selected-tags">
                        {(this.props.form=="input")?
                            <H type="3" text="Etiketler" />
                        :""}
                    </div>
                    <Tags tags={this.props.tags} activeOnly={false} handleOnClick={this.props.handleOnClick} noParameter={true}/>
                    {(this.props.form=="input")?
                        <span className="info-span">[seçimi iptal etmek için etikete dokunun]</span>
                    :""}
                </div>
            )
        } else {
            return(
                <div></div>
            )
        }
    }
}

class TagList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableVisible: false
        };
        this.onFocusInput = this.onFocusInput.bind(this);
        this.onBlurInput = this.onBlurInput.bind(this);
        this.selectTag = this.selectTag.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
    }
    onFocusInput() {
        this.setState({
            tableVisible: true
        });
    }
    onBlurInput() {
        setTimeout(function() {
            this.setState({
                tableVisible: false
            });
        }.bind(this),30);
        // bu delay'i blur olurken etiket seçimini geçmemesi için koydum
    }
    selectTag(e) {
        this.props.handleSelectTag(e.target.attributes.name.value);
        this.onBlurInput();
    }
    onChangeInput(e) {
        this.props.handleChangeTagSearchInput(e);
    }
    render() {
        this.tags = [];
        let keyArr = Object.keys(this.props.tags);
        for(let i=0;i<keyArr.length;i++) {
            this.tags.push(
                <div className="item" key={keyArr[i]} name={keyArr[i]} onMouseDown={this.selectTag}>{this.props.tags[keyArr[i]].text}</div>
            )
        }
        if(this.tags.length==0 && this.props.tagSearchInput.length!=0) {
            this.tags =
            <div>
                <span>Böyle bir etiket yok </span><a name="new" onMouseDown={this.selectTag}>yine de ekle</a>
            </div>
        }
        return(
            <div>
                <div className="ui form">
                    <div className="field">
                        <label>{this.props.labelText}</label>
                        <input type="text" placeholder={this.props.placeholderText} onFocus={this.onFocusInput} onBlur={this.onBlurInput} value={this.props.tagSearchInput} onChange={this.onChangeInput}/>
                    </div>
                </div>
                {
                    (this.state.tableVisible)?
                    <div className="tags-in-list">
                        <div className="ui list">
                            {this.tags}
                        </div>
                    </div>
                :""}
            </div>
        )
    }
}
