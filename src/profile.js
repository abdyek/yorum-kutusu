class Content extends React.Component {
    render() {
        /* 
            EmailValidation componentine validated={true} vermen yeterli görünmemesini sağlamak için
        */
        return(
            <div>
                <EmailValidation />
                <Account  owner={true}/>
            </div>
        )
    }
}

class EmailValidation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // normal, loading, success
            form:(this.props.validated)?"none":"normal",
            topMessage: null,
            code:"",
        };
        this.changeCode = this.changeCode.bind(this);
        this.verify = this.verify.bind(this);
        this.sendAgain = this.sendAgain.bind(this);
        this.showTopMessage = this.showTopMessage.bind(this);
    }
    changeCode(e) {
        this.setState({
            code:e.target.value
        });
    }
    verify() {
        console.log("doğrulama işlemleri");
        this.showTopMessage("warning", "hata mesajları falan 2");
    }
    sendAgain() {
        this.showTopMessage("warning", "hata mesajları falan");
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
                <Row size="one">
                    <Column>
                        <Segment>
                            <div class="ui negative message">
                                <div class="header">
                                    E-Posta Doğrulama Başarısız
                                </div>
                                <p>Lütfen e-posta kutunuzu kontrol ediniz. Size gönderdiğimiz mail'deki kodu aşağıdaki kutucuğa giriniz:</p>
                            </div>
                            {(this.state.topMessage)?
                                <Row size="one">
                                    <Column>
                                        <BasicMessage type={this.state.topMessage.type} text={this.state.topMessage.text} />
                                    </Column>
                                </Row>
                            :""}
                            <Row size="three">
                                <Column>
                                </Column>
                                <Column>
                                    <form class="ui form attached fluid">
                                        <div class="field">
                                        <label>Kod</label>
                                        <input placeholder="Kod" type="text" value={this.state.code} onChange={this.changeCode} />
                                        </div>
                                    </form>
                                </Column>
                            </Row>
                            <Row size="three">
                                <Column></Column>
                                <Column>
                                    <div>
                                        <button class="ui teal button" onClick={this.sendAgain}>
                                            Yeniden Gönder
                                        </button>
                                        <FloatRight>
                                            <button class="ui primary button" onClick={this.verify}>
                                                Doğrula
                                            </button>
                                        </FloatRight>
                                    </div>
                                </Column>
                            </Row>
                        </Segment>
                    </Column>
                </Row>
            )
        } else if(this.state.form=="loading") {
            return(
                <div>
                    <RowLoadingSpin />
                </div>
            )
        } else if(this.state.form=="success") {
            return(
                <Row size="one">
                    <Column>
                        <BasicMessage type="success" text="E-posta doğrulama başarılı bir şekilde gerçekleşti." />
                    </Column>
                </Row>
            )
        } else if(this.state.form=="none"){
            return ""
        }
    }
}

class Account extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            openedSetting: false
        };
        this.openSettingArea = this.openSettingArea.bind(this);
        this.closeSettingArea = this.closeSettingArea.bind(this);
    }
    openSettingArea() {
        this.setState({
            openedSetting:true
        });
    }
    closeSettingArea() {
        this.setState({
            openedSetting:false
        });
    }
    render() {
        return(
            <div>
                <Row size="one">
                    <Column>
                        {(this.state.openedSetting)?
                        <SettingArea closeSettingArea={this.closeSettingArea} />
                        : <AccountInfo handleOpenSettingArea={this.openSettingArea} owner={this.props.owner} /> }
                    </Column>
                </Row>
                <Comments />
            </div>
        )
    }
}

class AccountInfo extends React.Component {
    constructor(props) {
        super(props);
        this.openSettingArea = this.openSettingArea.bind(this);
    }
    openSettingArea() {
        this.props.handleOpenSettingArea();
    }
    render() {
        return (
            <Center>
                <i id="account-icon" className="fa fa-user-circle" aria-hidden="true"></i>
                <H type="1" text="abdyek" />
                {(this.props.owner)?
                    <button className="compact ui teal button" onClick={this.openSettingArea}>
                        <i className="icon">
                            <i className="fa fa-cog" aria-hidden="true"></i>
                        </i>
                        Ayarlar
                    </button> 
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


class Comments extends React.Component {
    render() {
        return(
            <div>
                <Row size="one">
                    <Column>
                        <H type="2" text="Yorumlar" />
                    </Column>
                </Row>
                <Comment text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                    likeCount="0"
                    liked={false}
                    title="Iphone"
                    date="14 Aralık 2019- 18:49"
                    tags={[{
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
                        ]
                    }
                    owner={true}
                />
                <Comment text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                    likeCount="0"
                    liked={false}
                    title="Le-cola"
                    date="14 Aralık 2019- 18:49"
                    tags={[{
                            id:3,
                            passive:false,
                            text:"Tad",
                            color:"yellow",
                            rateValue: "5"
                        },
                        {
                            id:4,
                            passive:false,
                            text:"Fiyat/Performans",
                            color:"red",
                            rateValue: "1"
                        },
                        ]
                    }
                    owner={true}
                />
            </div>
        )
    }
}