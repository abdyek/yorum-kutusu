class NewProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // input, showInfo, loading
            form:"input",
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
            createProductButtonName: "Oluştur"
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
                    <Row size="sixteen">
                        <WideColumn size="two"></WideColumn>
                        <WideColumn size="twelve">
                            <WriteComment tags={this.state.selectedTags}/>
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
                    <Tags tags={this.props.tags} activeOnly={false} handleOnClick={this.props.handleOnClick}/>
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