class Profile extends React.Component {
    render() {
        return(
            <div>
                <Account changeContent={this.props.changeContent}/>
            </div>
        )
    }
}

class Account extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading:true,
            form:"info"
        }
        //this.load();
        this.openSettingArea = this.openSettingArea.bind(this);
        this.closeSettingArea = this.closeSettingArea.bind(this);
        this.openFollowedProducts = this.openFollowedProducts.bind(this);
        this.closeFollowedProducts = this.closeFollowedProducts.bind(this);
        this.changeForm = this.changeForm.bind(this);
        this.changeLoading = this.changeLoading.bind(this);
        this.addMoreFollowed = this.addMoreFollowed.bind(this);
    }
    componentDidMount() {
        let form = "info";
        let slugs = getSlugsExtra("profil");
        let userSlug = slugs[0];
        let extra = slugs[1];
        let owner = true;
        if(extra=="takipteki-urunler" && owner) {
            // owner'ı burada kontrol ediyorum bu şu anlama geliyor: bu if ve else bloğunu api'den veri çektinten sonraaya koymam gerekiyor.
            form="followedProducts";
        } else if(extra=="ayarlar") {
            form="setting";
        }
        console.log("yükleme komutları buraya " + userSlug);
        this.setState({
            // info, setting, followedProducts
            form:form,
            openedSetting: false,
            info: {
                userName:"Yunus Emre",
                owner:owner
            },
            followedProductsInfo: {
                0:{
                    url:"iphone-5s", 
                    productName:"Iphone 5s",
                    newCommentCount: "5"
                },
                1: {
                    url:"le-cola",
                    productName:"Le-Cola",
                    newCommentCount: "9312"
                },
                9: {
                    url:"mahmut-efendi-kahveleri",
                    productName:"Mahmut Efendi Kahveleri",
                    newCommentCount: "0"
                }
            },
            isThereMoreProduct: true,
            comments: [
                {
                    title:"IPhone 5s",
                    slug:"iphone-5s",
                    text:"burası yorum text alanı",
                    likeCount:15,
                    liked:false,
                    date:"14 Aralık 2019 - 18:49",
                    tags: [
                        {
                            id:3,
                            passive:false,
                            text:"Batarya",
                            color:"yellow",
                            rateValue: "5",
                            slug:"batarya"
                        },
                        {
                            id:4,
                            passive:false,
                            text:"Kamera",
                            color:"orange",
                            rateValue: "4",
                            slug:"kamera"
                        },
                        {
                            id:5,
                            passive:false,
                            text:"Tasarım",
                            color:"",
                            rateValue: "-",
                            slug:"tasarim"
                        }
                    ],
                    owner:false
                },
                {
                    title:"Le Cola Zero",
                    slug:"le-cola-zero",
                    text:"burası yorum text alanı",
                    likeCount:15,
                    liked:true,
                    date:"14 Aralık 1999- 00:01",
                    tags: [
                        {
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
            ],
        });
        this.changeLoading(false);
    }
    openSettingArea() {
        this.changeForm("setting");
    }
    closeSettingArea() {
        this.changeForm("info");
    }
    openFollowedProducts() {
        this.changeForm("followedProducts");
    }
    closeFollowedProducts() {
        this.changeForm("info");
    }
    changeForm(form) {
        this.setState({
            form:form
        });
    }
    changeLoading(trueOrFalse) {
        this.setState({
            loading:trueOrFalse
        });
    }
    addMoreFollowed() {
        // buradaki more ve isThereMore JSON'ı ajax ile gelen şey olacak
        let more = {
            0:{
                url:"iphone-5s", 
                productName:"Iphone 5s",
                newCommentCount: "5"
            },
            1: {
                url:"le-cola",
                productName:"Le-Cola",
                newCommentCount: "9312"
            },
            9: {
                url:"mahmut-efendi-kahveleri",
                productName:"Mahmut Efendi Kahveleri",
                newCommentCount: "0"
            },
            99: {
                url:"yeni-gelen",
                productName:"Falan filen",
                newCommentCount: "19"
            }
        }
        let isThereMore = false;
        this.setState({
            followedProductsInfo: more,
            isThereMoreProduct: isThereMore
        });
    }
    render() {
        if(this.state.loading) {
            return(
                <RowLoadingSpin nonSegment={true}/>
            )
        } else {
            this.form;
            if(this.state.form=="info") {
			    document.title = this.state.info.userName;
                this.form = <AccountInfo handleOpenSettingArea={this.openSettingArea} handleOpenFollowedProducts={this.openFollowedProducts} info={this.state.info}/>
            } else if(this.state.form=="setting") {
			    document.title = "Ayarlar";
                this.form = <SettingArea closeSettingArea={this.closeSettingArea} />
            } else if(this.state.form=="followedProducts") {
			    document.title = "Takip Edilen Ürünler";
                this.form = <FollowedProducts closeFollowedProducts={this.closeFollowedProducts} followedProductsInfo={this.state.followedProductsInfo} isThereMoreProduct={this.state.isThereMoreProduct} addMoreFollowed={this.addMoreFollowed} changeContent={this.props.changeContent}/>
            }
            return(
                <div>
                    <EmailValidation validated={false}/>
                    <Row size="one">
                        <Column>
                            {this.form}
                        </Column>
                    </Row>
                    <Comments comments={this.state.comments} form={"normal"} changeContent={this.props.changeContent} type="product" />
                </div>
            )
        }
    }
}

class AccountInfo extends React.Component {
    constructor(props) {
        super(props);
        this.openSettingArea = this.openSettingArea.bind(this);
        this.openFollowedProducts = this.openFollowedProducts.bind(this);
    }
    openSettingArea() {
        this.props.handleOpenSettingArea();
    }
    openFollowedProducts() {
        this.props.handleOpenFollowedProducts();
    }
    render() {
        return (
            <Center>
                <i id="account-icon" className="fa fa-user-circle" aria-hidden="true"></i>
                <H type="1" text={this.props.info.userName} />
                {(this.props.info.owner)?
                    <div>
                        <button className="compact ui teal button" onClick={this.openSettingArea}>
                            <i className="icon">
                                <i className="fa fa-cog" aria-hidden="true"></i>
                            </i>
                            Ayarlar
                        </button> 
                        <button className="compact ui teal button" onClick={this.openFollowedProducts}>
                            <i className="icon">
                                <i class="fa fa-cube" aria-hidden="true"></i>
                            </i>
                            Takipteki Ürünler
                        </button> 
                    </div>
                :""}
            </Center>
        )
    }
}

class SettingArea extends React.Component {
    render() {
        return(
            <div>
                <Row size="two" nonStackable={true}>
                    <Column>
                        <H type="3" text="Ayarlar" />
                    </Column>
                    <Column>
                        <FloatRight>
                            <CancelButton handleCancelButton={this.props.closeSettingArea}/>
                        </FloatRight>
                    </Column>
                </Row>
                <Row size="sixteen">
                    <WideColumn size="three"></WideColumn>
                    <WideColumn size="ten">
                        <ChangeItems />
                    </WideColumn>
                </Row>
            </div>
        )
    }
}

class FollowedProducts extends React.Component {
    constructor(props) {
        super(props);
        this.addMoreFollowed = this.addMoreFollowed.bind(this);
    }
    addMoreFollowed() {
        this.props.addMoreFollowed();
    }
    render() {
        this.trs = [];
        let info = this.props.followedProductsInfo;
        let keys = Object.keys(info);
        for(let i=0;i<keys.length;i++) {
            this.trs.push(
                <tr key={keys[i]}>
                    <td>
                        <Center>
                            <a href={"urun/" + info[keys[i]].url} onClick={(e)=>{e.preventDefault();this.props.changeContent(e.target.href, e)}}>
                                {info[keys[i]].productName}
                            </a>
                        </Center>
                    </td>
                    <td>
                        <Center>
                            {info[keys[i]].newCommentCount}
                        </Center>
                    </td>
                </tr>
            );
        }
        return(
            <div>
                <Row size="two" nonStackable={true}>
                    <Column>
                        <H type="3" text="Takip Edilen Ürünler" />
                    </Column>
                    <Column>
                        <FloatRight>
                            <CancelButton handleCancelButton={this.props.closeFollowedProducts} />
                        </FloatRight>
                    </Column>
                </Row>
                <Row size="sixteen">
                    <WideColumn size="three"></WideColumn>
                    <WideColumn size="ten" >
                        <table className="ui striped table">
                            <thead>
                                <tr>
                                    <th>
                                        <Center>
                                            Ürün
                                        </Center>
                                    </th>
                                    <th>
                                        <Center>Yeni Yorum</Center>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.trs}
                            </tbody>
                        </table>
                        {(this.props.isThereMoreProduct)?
                            <Row size="one">
                                <Column>
                                    <FloatRight>
                                        <a onClick={this.addMoreFollowed}>
                                            Daha Fazla
                                        </a>
                                    </FloatRight>
                                </Column>
                            </Row>
                        :""}
                    </WideColumn>
                </Row>
            </div>
        )
    }
}

class ChangeItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form:"normal",
            topMessage:null,
            passwordSelected: true,
            passwordButtonClass:"mini ui blue button",
            emailSelected: false,
            emailButtonClass: "mini ui button",
            input1:"",
            input2:"",
            input3:""
        };
        this.selectEmail = this.selectEmail.bind(this);
        this.selectPassword = this.selectPassword.bind(this);
        this.changeInput1 = this.changeInput1.bind(this);
        this.changeInput2 = this.changeInput2.bind(this);
        this.changeInput3 = this.changeInput3.bind(this);
        this.send = this.send.bind(this);
        this.showTopMessage = this.showTopMessage.bind(this);
    }
    selectEmail() {
        this.setState({
            passwordSelected: false,
            passwordButtonClass:"mini ui button",
            emailButtonClass: "mini ui blue button",
            input1:"",
            input2:"",
            input3:"",
            topMessage: null
        });
    }
    selectPassword() {
        this.setState({
            passwordSelected: true,
            passwordButtonClass:"mini ui blue button",
            emailButtonClass: "mini ui button",
            input1:"",
            input2:"",
            input3:"",
            topMessage: null
        })
    }
    changeInput1(e) {
        this.setState({
            input1:e.target.value
        });
    }
    changeInput2(e) {
        this.setState({
            input2:e.target.value
        });
    }
    changeInput3(e) {
        this.setState({
            input3:e.target.value
        });
    }
    send() {
        if(this.state.passwordSelected) {
            // parola
            if(this.state.input2!=this.state.input3) {
                this.showTopMessage("warning", "Parola tekrarı ile eşleşmiyor!");
            } else {
                // burada gönderim yapılacak
            }
        } else {
            // e-posta
            if(!validateEmail(this.state.input1)) {
                this.showTopMessage("warning", "Yeni E-posta geçersiz!");
            } else if(!validateEmail(this.state.input2)) {
                this.showTopMessage("warning", "Yeni E-posta Tekrarı geçersiz!");
            } else {
                // burada gönderim yapılacak
            }
        }
    }

    showTopMessage(type, text) {
        this.setState({
            topMessage: {
                type: type,
                text: text
            }
        });
    }

    render() {
        if(this.state.form=="normal") {
            return(
                <div>
                    <Row size="one">
                        <Column>
                            <H type="3" text="Değiştir" textAlign="center" />
                            <Center>
                                <div id="password-email-change">
                                    <button className={this.state.passwordButtonClass} onClick={this.selectPassword}>
                                        Parola
                                    </button>
                                    <button className={this.state.emailButtonClass} onClick={this.selectEmail}>
                                        E-posta
                                    </button>
                                </div>
                            </Center>
                        </Column>
                    </Row>
                    {(this.state.topMessage)?
                        <Row size="one">
                            <Column>
                                <div id="change-top-message">
                                    <BasicMessage type={this.state.topMessage.type} text={this.state.topMessage.text} />
                                </div>
                            </Column>
                        </Row>
                    :""}
                    <div className="ui form">
                        <h4 className="ui dividing header">{(this.state.passwordSelected)?"Parola":"E-posta"} Değiştir</h4>
                        <div className="field">
                            <label>{(this.state.passwordSelected)?"Mevcut Parola": "Yeni E-posta"}</label>
                            <input type={(this.state.passwordSelected)?"password": "text"} value={this.state.input1} onChange={this.changeInput1}/>
                        </div>
                        <div className="field">
                            <label>
                                {(this.state.passwordSelected)?"Yeni Parola": "Yeni E-posta Tekrar"}
                            </label>
                            <input type={(this.state.passwordSelected)?"password": "text"} value={this.state.input2} onChange={this.changeInput2}/>
                        </div>
                        <div className="field">
                            <label>
                                {(this.state.passwordSelected)?"Yeni Parola Tekrar": "Parola"}
                            </label>
                            <input type="password" value={this.state.input3} onChange={this.changeInput3}/>
                        </div>
                        <FloatRight>
                            <button className="ui blue button" onClick={this.send}>
                                {(this.state.passwordSelected)?"Parola": "E-posta"} Değiştir
                            </button>
                        </FloatRight>
                    </div> 
                </div>
            )
        } else if(this.state.form=="loading") {
            return(
                <RowLoadingSpin nonSegment={true} />
            )
        }
    }
}