class Content extends React.Component {
    constructor(props) {
        super(props);
        // normal, loading, notFound
        this.state = {
            form:"normal"
        }
    }
    render() {
        if(this.state.form=="normal") {
            return(
                <ProfileInfo />
            )
        } else if(this.state.form=="loading") {
            return(
                <RowLoadingSpin nonSegment={true} />
            )
        } else if(this.state.form=="notFound") {
            return <NotFound />
        }
    }
}

owner = true;
isMobile = false;

class ProfileInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            settingOpened: false,
            oldPassword: "",
            newPassword: "",
            newPassword2: "",
            readyPasswordForm: true,
            message: false,
            messageText: "",
            messageType: "",
            logout:"",
            deleteOpened: false,
            emailToDelete: "",
            usernameToDelete: "",
            passwordToDelete: "",
            deleteAccount:"",
            deleteMessage:"",
            verification: false
        }
        this.toggleSetting = this.toggleSetting.bind(this);
        this.logout = this.logout.bind(this);
        this.changeOldPassword= this.changeOldPassword.bind(this);
        this.changeNewPassword = this.changeNewPassword.bind(this);
        this.changeNewPassword2= this.changeNewPassword2.bind(this);
        this.tryChange = this.tryChange.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
        this.changeEmailToDelete = this.changeEmailToDelete.bind(this);
        this.changeUsernameToDelete = this.changeUsernameToDelete.bind(this);
        this.changePasswordToDelete= this.changePasswordToDelete.bind(this);
    }
    toggleSetting() {
        if(this.state.settingOpened) {
            this.setState({
                settingOpened: false
            })
        } else {
            this.setState({
                settingOpened: true
            })
        }
    }
    deleteAccount() {
        if(this.state.deleteOpened) {
            console.log("burada hesap silmek için gerekli veriler API'ye gönderilecek");
            this.setState({
                deleteAccount: "loading"
            })
            /*
            this.setState({
                deleteMessage: "buraya API'den gelen mesajı yazıyoruz"
            })
            ^ bununla gelen mesajı doğrudan veriyoruz
            */
        } else {
            this.setState({
                deleteOpened: true
            })
        }
    }
    logout() {
        console.log("çıkıp yapmak için php'ye ajax ile çıkış şeyi gönderilecek")
        // butona spin ekliyoruz, başarılı çıkış sağlanırsa başarıyla çıkış yaptınız sayfasına yönlendirilebilir
        this.setState({
            logout:"loading"
        })
    }
    changeOldPassword(e) {
        this.setState({
            oldPassword: e.target.value
        })
    }
    changeNewPassword(e) {
        this.setState({
            newPassword: e.target.value
        })
    }
    changeNewPassword2(e) {
        this.setState({
            newPassword2: e.target.value
        })
    }
    tryChange() {
        // API tarafında yeni parola tekrarı istenmediğinden bu kısım client'a kaldı
        if(this.state.newPassword!=this.state.newPassword2) {
            this.setState({
                message:true,
                messageText: "Yeni parola tekrarı ile uyumlu değil",
                messageType:"red"
            })
        } else {
            this.setState({
                message:false
            })
            console.log("burada API'ye gönderme işlemi yapıcaz");
            // burada API'ye gönderme işlemi yapıcaz bu sırada da kullanıcıya spin göstericez
            // ayrıca gelen mesaj olumlu ise messageType'ı blue yapıyoruz, ya da uygun diğer bir renk
        }
    }
    changeEmailToDelete(e) {
        this.setState({
            emailToDelete: e.target.value
        })
    }
    changeUsernameToDelete(e) {
        this.setState({
            usernameToDelete:e.target.value
        })
    }
    changePasswordToDelete(e) {
        this.setState({
            passwordToDelete:e.target.value
        })
    }
    render() {
        if(this.state.settingOpened) {
            this.setting = (
                <div>
                    <Row size="one">
                        <Column>
                            <H type="2" textAlign="center" text="Ayarlar" />
                            <Row size="four">
                                <WideColumn size="three"></WideColumn>
                                <WideColumn size="five">
                                    <Segment>
                                        <H type="3" textAlign="left" text="Parola Değiştir" />
                                        { this.state.readyPasswordForm ? 
                                            <div className="ui form">
                                                <div className="field">
                                                    <label>Eski Parola</label>
                                                    <input type="password" value={this.state.oldPassword} onChange={this.changeOldPassword} />
                                                </div>
                                                <div className="field">
                                                    <label>Yeni Parola</label>
                                                    <input type="password" value={this.state.newPassword} onChange={this.changeNewPassword}/>
                                                </div>
                                                <div className="field">
                                                    <label>Yeni Parola Tekrar</label>
                                                    <input type="password" value={this.state.newPassword2} onChange={this.changeNewPassword2}/>
                                                </div>
                                            </div>
                                        :
                                            <RowLoading />
                                        }
                                        { this.state.message ?
                                            <Row size="one">
                                                <Column>
                                                    <div id="passwordChangeMessage" className={"ui "+this.state.messageType+" message"}>{this.state.messageText}</div>
                                                </Column>
                                            </Row>
                                            : ""
                                        }
                                        <Row size="one">
                                            <Column>
                                                <FloatRight>
                                                    <button id="passwordChangeButton" className="ui primary button" onClick={this.tryChange}>
                                                        Değiştir
                                                    </button>
                                                </FloatRight>
                                            </Column>
                                        </Row>
                                    </Segment>
                                </WideColumn>
                                <WideColumn size="five">
                                    <Segment>
                                        <H type="3" textAlign="left" text="Hesap Sil" />
                                        <div className="ui orange message">
                                            <div className="header">
                                                Dikkat!
                                            </div>
                                            <p>Hesabınızı silerseniz bütün yorumlarınız da kalıcı olarak silinir.</p>
                                        </div>
                                        <Row size="one">
                                            <Column>
                                                {this.state.deleteOpened?
                                                    <div>
                                                        <div className="ui yellow message">E-Posta, kullanıcı adı ve parolanızı girin.</div>
                                                        <div className="ui form">
                                                            <div className="field">
                                                                <label>E-Posta</label>
                                                                <input type="text" value={this.state.emailToDelete} onChange={this.changeEmailToDelete} />
                                                            </div>
                                                            <div className="field">
                                                                <label>Kullanıcı Adı</label>
                                                                <input type="text" value={this.state.changeUsernameToDelete} onChange={this.changeUsernameToDelete}/>
                                                            </div>
                                                            <div className="field">
                                                                <label>Parola</label>
                                                                <input type="password" value={this.state.changePasswordToDelete} onChange={this.changePasswordToDelete}/>
                                                            </div>
                                                        </div>
                                                        { this.state.deleteMessage? <div className="ui teal message">{this.state.deleteMessage}</div> :   "" }
                                                        <FloatRight>
                                                            <button id="deleteAccount" className={"ui red "+this.state.deleteAccount+" button"} onClick={this.deleteAccount}>
                                                                Sil
                                                            </button>
                                                        </FloatRight>
                                                    </div>
                                                :
                                                    <FloatRight>
                                                        <button id="deleteAccount" className="ui red button" onClick={this.deleteAccount}>
                                                            Sil
                                                        </button>
                                                    </FloatRight>
                                            }
                                            </Column>
                                        </Row>
                                    </Segment>
                                </WideColumn>
                                <WideColumn size="three"></WideColumn>
                            </Row>
                        </Column>
                    </Row>
                </div>

            )
        } else {
            this.setting = <div></div>
        }
        return(
            <div>
                {   !this.state.verification? 
                    <Verification />:
                    ""
                }
                <Row size="one">
                    <Column>
                        <Center>
                            <i id="userIcon">
                                <i className="fa fa-user-circle" aria-hidden="true"></i>
                            </i>
                            <H type="1" text={"önemsiz"}/>
                            {
                                owner ?
                                    <div>
                                        <button className="ui grey button" onClick={this.toggleSetting} >
                                            <i className="icon">
                                                <i className="fa fa-cog" aria-hidden="true"></i>
                                            </i>
                                            Ayarlar
                                        </button>
                                        <button className={"ui red "+this.state.logout+" button"} onClick={this.logout}>
                                            <i className="icon">
                                                <i className="fa fa-paper-plane" aria-hidden="true"></i>
                                            </i>
                                            Çıkış Yap
                                        </button>
                                    </div>
                                : ""
                            }
                        </Center>
                    </Column>
                </Row>
                    {this.setting}
                <Row size="one">
                    <Column>
                        <div className="yorumlarHeader">
                            <H  type="1" textAlign="center" text="Yorumlar" />
                        </div>
                    </Column>
                </Row>
                <Comments />
            </div>
        )
    }
}

class Verification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form:"normal",
            verification:false,
            verificationHeadMessage: true,
            verificationAPIMessage: "",
            verificationAPIMessageType: ""
        }
        this.sendVerification = this.sendVerification.bind(this);
    }
    sendVerification() {
        // burada gönderim işi yaplıacak
    }
    render() {
        if(this.state.form=="normal") {
            this.body = 
                <Row size="sixteen">
                    <WideColumn size="five"></WideColumn>
                    <WideColumn size="six">
                        <div className="ui form">
                            <div className="field">
                                <label>Aktivasyon Kodu</label>
                                <input type="text" />
                            </div>
                        </div>
                        <FloatRight>
                            <button id="sendActivation" className="ui blue button" onClick={this.sendVerification}>
                                Gönder
                            </button>
                        </FloatRight>
                    </WideColumn>
                </Row>
        } else if(this.state.form=="loading") {
            this.body = <RowLoading />
        }
        if(this.state.verificationAPIMessage) {
            this.apiMessage =
                <div>
                    <Row size="one">
                        <Column>
                            <div class={"ui "+this.state.verificationAPIMessageType+" message"}>{this.state.verificationAPIMessage}</div>
                        </Column>
                    </Row>
                </div>
        } else {
            this.apiMessage = "";
        }
        return (
            <div>
                {
                    this.state.verificationHeadMessage?
                    <Row size="one">
                        <Column>
                        <div className="ui negative message">
                            <div className="header">
                                E-posta Aktivasyonu Başarısız!
                            </div>
                            <p>Lütfen E-postanıza gönderdiğimiz kod ile e-posta aktivasyonunuzu yapınız
                            </p>
                        </div>
                        </Column>
                    </Row>:
                    ""
                }
                {this.apiMessage}
                {this.body}
            </div>
        )
    }
}

class NotFound extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <Row size="one">
                <Column>
                    <BasicMessage messageType="danger" text="Böyle bir hesap yok!" />
                </Column>
            </Row>
        )
    }
}

class Comments extends React.Component {
    constructor(props) {
        super(props);
        if(!isMobile) {
            this.buttonText = {
                editButtonText : "Düzenle",
                deleteButtonText : "Sil",
                approveDeleteButtonText : "Sil",
                cancelDeleteButtonText : "İptal",
                cancelEditButtonText : "İptal",
                reVoteButtonText : "Yeniden Oyla",
                saveButtonText : "Kaydet"
            }
        } else {
            this.buttonText = {
                editButtonText : "",
                deleteButtonText : "",
                approveDeleteButtonText : "",
                cancelDeleteButtonText : "",
                cancelEditButtonText : "",
                reVoteButtonText: "",
                saveButtonText : ""
            }
        }
    }
    render() {
        return(
            <div>
                <Comment productName="iphone-x" commentText="çok güzel telefon ama çok pahalı" buttonText={this.buttonText}/>
                <Comment productName="le-cola" commentText="tam bir kanser yapıcı" buttonText={this.buttonText}/>
                <Comment productName="sürahi" commentText='Yaygın inancın tersine, Lorem Ipsum rastgele sözcüklerden oluşmaz. Kökleri M.Ö. 45 tarihinden bu yana klasik Latin edebiyatına kadar uzanan 2000 yıllık bir geçmişi vardır. Virginiadaki Hampden-Sydney Collegedan Latince profesörü Richard McClintock, bir Lorem Ipsum pasajında geçen ve anlaşılması en güç sözcüklerden biri olan consectetur sözcüğünün klasik edebiyattaki örneklerini incelediğinde kesin bir kaynağa ulaşmıştır. Lorm Ipsum, Çiçero tarafından M.Ö. 45 tarihinde kaleme alınan "de Finibus Bonorum et Malorum" (İyi ve Kötünün Uç Sınırları) eserinin 1.10.32 ve 1.10.33 sayılı bölümlerinden gelmektedir. Bu kitap, ahlak kuramı üzerine bir tezdir ve Rönesans döneminde çok popüler olmuştur. Lorem Ipsum pasajının ilk satırı olan "Lorem ipsum dolor sit amet" 1.10.32 sayılı bölümdeki bir satırdan gelmektedir.' buttonText={this.buttonText} />
                <Comment productName="honor 9 lite" commentText="gelebilirse yeni telefonum olacak şuan kargoda" buttonText={this.buttonText}/>
                <Comment productName="ülker çikolatalı gofret" commentText="eski tadı yok bunun" buttonText={this.buttonText}/>
            </div>
        )
    }
}

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form:"normal",
            reVote:"none",
            commentText: this.props.commentText,
            commentTextOld: this.props.commentText
        }
        this.inputRanges = [];
        this.openEdit = this.openEdit.bind(this);
        this.openDelete = this.openDelete.bind(this);
        this.returnToNormal = this.returnToNormal.bind(this);
        this.commentWriting = this.commentWriting.bind(this);
        this.openReVote = this.openReVote.bind(this);
    }
    openEdit() {
        console.log("düzenleme işlemi burada yapılacak");
        this.setState({
            form:"edit"
        })
    }
    openDelete() {
        this.setState({
            form:"delete"
        })
    }
    returnToNormal() {
        this.setState({
            form: "normal"
        })
    }
    commentWriting(e) {
        this.setState({
            commentText:e.target.value
        })
    }
    openReVote() {
        this.setState({
            reVote:"loading"
        })
        for(let i=0;i<3;i++) {
            this.inputRanges.push(
                <div className="inputRangeWrapper" key={i}>
                    <label className="inputRangeLabel">
                        {"buraya isim gelecek"}
                    </label>
                    <input className="inputRange" type="range" id="" name="" defaultValue={this.state.value} step="1" min="0" max="10" onChange={this.change}></input>
                    <label className="inputRangeValue">
                        {"5.5"}
                    </label>
                </div>
            )
        }
        this.setState({
            reVote:"ready"
        })
    }
    render() {
        if(isMobile) {
            /* ekran boyutu 750'den küçük cihazlar için (mobil) butonların textini yok ediyoruz (sadece yüklenmede kontrol ediyor) */
            this.editButtonText = "";
            this.deleteButtonText = "";
            this.approveDeleteButtonText = "";
            this.cancelDeleteButtonText = "";
            this.cancelEditButtonText = "";
        }
        if(this.state.reVote=="ready") {
            this.reVoteArea = (
                <div>
                    {this.inputRanges}
                </div>
            )
        } else if(this.state.reVote=="none") {
            this.reVoteArea = (
                <Center>
                    <button className="ui teal button" onClick={this.openReVote}>
                        <i className="icon">
                            <i className="fa fa-line-chart" aria-hidden="true"></i>
                        </i>
                        {this.props.buttonText.reVoteButtonText}
                    </button>
                </Center>
            )
        } else if(this.state.reVote=="loading") {
            this.reVoteArea = (
                <RowLoading />
            )
        }
        if(owner){
            this.onlyOwner = (
                <div>
                    <button className="ui icon teal button" onClick={this.openEdit}>
                            <i className="icon">
                                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                        </i>
                        {this.props.buttonText.editButtonText}
                    </button>
                    <button className="ui icon orange button" onClick={this.openDelete}>
                        <i className="icon">
                            <i className="fa fa-trash" aria-hidden="true"></i>
                        </i>
                        {this.props.buttonText.deleteButtonText}
                    </button>
                </div>
            )
        } else {
            this.onlyOwner = null;
        }
        if(this.state.form=="normal") {
            return(
                <div>
                    <Row size="one">
                        <Column>
                            <RaisedSegment>
                                <Row size="two">
                                    <Column>
                                        <div className="product-name">
                                            <H type="3" text="Iphone 5s" />
                                        </div>
                                    </Column>
                                    <Column>
                                        <FloatRight>
                                            <div>
                                                {this.onlyOwner}
                                            </div>
                                        </FloatRight>
                                    </Column>
                                </Row>
                                <Row size="one">
                                    <Column>
                                        <div className="comment-text">
                                            {this.state.commentTextOld}
                                        </div>
                                    </Column>
                                </Row>
                                <Row size="one">
                                    <Column>
                                        <FloatRight>
                                            <LikeButton value={1} likeOrDislike={"like"}/>
                                            {!owner?<ComplaintButton />: "" }
                                        </FloatRight>
                                    </Column>
                                </Row>
                            </RaisedSegment>
                        </Column>
                    </Row>
                </div>
            )
        } else if(this.state.form=="edit") {
            return(
                <div>
                    <Row size="one">
                        <Column>
                            <RaisedSegment>
                                <Row size="two" nonStackable={true}>
                                    <Column>
                                        <H type="3" text={this.props.productName} />
                                    </Column>
                                    <Column>
                                        <FloatRight>
                                            <button className="ui icon red button" onClick={this.returnToNormal}>
                                                <i className="icon">
                                                    <i className="fa fa-times" aria-hidden="true"></i>
                                                </i>
                                                {this.props.buttonText.cancelEditButtonText}
                                            </button>
                                        </FloatRight>
                                    </Column>
                                </Row>
                                <Row size="one">
                                    <Column>
                                            <Row size="sixteen">
                                                <WideColumn size="ten">
                                                    <div className="ui form">
                                                        <div className="field">
                                                            <label>Yorum Düzenle</label>
                                                            <textarea value={this.state.commentText} onChange={this.commentWriting}></textarea>
                                                        </div>
                                                    </div>
                                                </WideColumn>
                                                <WideColumn size="six">
                                                    {this.reVoteArea}
                                                </WideColumn>
                                            </Row>
                                            <Row size="one">
                                                <Column>
                                                    <FloatRight>
                                                        <div>
                                                            <button className="ui teal button">
                                                                <i className="icon">
                                                                    <i className="fa fa-floppy-o" aria-hidden="true"></i>
                                                                </i>
                                                                {this.props.buttonText.saveButtonText}
                                                            </button>
                                                        </div>
                                                    </FloatRight>
                                                </Column>
                                            </Row>
                                    </Column>
                                </Row>
                            </RaisedSegment>
                        </Column>
                    </Row>
                </div>
            )
        } else if(this.state.form=="delete") {
            return(
                <div>
                    <Row size="one">
                        <Column>
                            <RaisedSegment>
                                <Row size="two">
                                    <Column>
                                        Yorumunuzu kalıcı olarak silmek ister misiniz?
                                    </Column>
                                    <Column>
                                        <FloatRight>
                                            <button className="ui icon blue button">
                                                <i className="icon">
                                                    <i className="fa fa-check" aria-hidden="true"></i>
                                                </i>
                                                {this.props.buttonText.approveDeleteButtonText}
                                            </button>
                                            <button className="ui icon red button" onClick={this.returnToNormal}>
                                                <i className="icon">
                                                    <i className="fa fa-times" aria-hidden="true"></i>
                                                </i>
                                                {this.props.buttonText.cancelDeleteButtonText}
                                            </button>
                                        </FloatRight>
                                    </Column>
                                </Row>
                            </RaisedSegment>
                        </Column>
                    </Row>
                </div>
            )
        }
    }
}

class RatingBar extends React.Component {
    constructor(props) {
        super(props);
        this.percent = this.props.ratingAverage * 10;
        // bu kısım drawcircle ile aynı refactor ederken buna bir çare bulabilirsin
        this.limitColor = {
            0: {
                min: 0,
                max: 5,
                color: "#db2828"
            },
            1: {
                min: 5,
                max: 7,
                color: "#f2711c"
            },
            2: {
                min: 7,
                max: 10,
                color: "#21ba45"
            }
        }
        this.color = this.limitColor[0].color;
        for(let i=0; i<Object.keys(this.limitColor).length; i++) {
            if(this.limitColor[i].min <= this.props.ratingAverage && this.props.ratingAverage< this.limitColor[i].max) {
                this.color = this.limitColor[i].color;
                break;
            }
        }
        // ^^^
        this.widthOfFill = this.props.ratingAverage * 15 + "px";
    }
    render() {
        return(
            <div className="ratingBar">
                <span className="barValue">
                    {this.props.ratingAverage}
                </span>
                <div className="barStickWrapper">
                    <div className="barStick barStickFull">
                    </div>
                    <div className="barStick barStickFill" style={{backgroundColor:this.color, width:this.widthOfFill}}>
                    </div>
                </div>
            </div>
        )
    }
}
