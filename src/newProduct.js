class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productName: "",
            productUrl: "",
            tagsInList:[{
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
            selectedTags: [
                {
                    id:5,
                    passive:false,
                    text:"Tasarım",
                    color:"",
                    rateValue: "-"
                }
            ]
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
        this.selectTag = this.selectTag.bind(this);
    }
    onChangeProductName(e) {
        this.setState({
            productName: e.target.value,
            productUrl: this.generateProductUrl(e.target.value)
        });
    }
    generateProductUrl(productName) {
        productName = productName.toLowerCase();
        let url = "";
        for(let i=0;i<productName.length;i++) {
            if(productName[i]==" ") {
                url += "-";
            } else if(this.turkishChars[productName[i]]){
                console.log("burası çalışmıyor");
                url += this.turkishChars[productName[i]];
            } else {
                url += productName[i];
            }
        }
        return url;
    }
    selectTag(id) {

    }
    render() {
        return(
            <div>
                <Row size="one">
                    <Column>
                        <Row size="sixteen">
                            <WideColumn size="two"></WideColumn>
                            <WideColumn size="twelve">
                                <H type="1" text="Yeni Ürün" />
                                <div className="ui form">
                                    <div className="field">
                                        <label>yorumkutusu.com/urun/{this.state.productUrl}</label>
                                        <input type="text" placeholder="Ürün İsmi" onChange={this.onChangeProductName} value={this.state.productName}/>
                                    </div>
                                </div>
                                <SelectedTags tags={this.state.selectedTags}/>
                                <TagList labelText="Etiket Ekle" placeholderText="Etiket İsmi" tags={this.state.tagsInList} handleSelectTag={this.selectTag}/>
                            </WideColumn>
                        </Row>
                    </Column>
                </Row>
            </div>
        )
    }
}

class SelectedTags extends React.Component {
    render() {
        return(
            <div>
                <Tags tags={this.props.tags} activeOnly={false}/>
            </div>
        )
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
        //console.log(e.target.innerHTML);
        this.onBlurInput();
    }
    render() {
        this.tags = [];
        for(let i=0;i<this.props.tags.length; i++) {
            this.tags.push(
                <div className="item" key={this.props.tags[i].key} name={this.props.tags[i].id} onClick={this.selectTag}>{this.props.tags[i].text}</div>
            );
        }
        return(
            <div>
                <div className="ui form">
                    <div className="field">
                        <label>{this.props.labelText}</label>
                        <input type="text" placeholder={this.props.placeholderText} onFocus={this.onFocusInput} onBlur={this.onBlurInput}/>
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