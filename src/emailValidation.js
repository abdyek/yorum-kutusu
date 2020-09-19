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
        this.goHome = this.goHome.bind(this);
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
    goHome(e) {
        e.preventDefault();
        this.props.changeContent(" ");
    }
    render() {
        if(this.state.form=="normal") {
            return(
                <Row size="one">
                    <Column>
                        <Segment>
                            {(this.props.newUser)?
                                <div className="ui success message">
                                    <div className="header">
                                        Başarılı bir şekilde üye oldunuz!
                                    </div>
                                    <p>Lütfen e-posta kutunuzu kontrol ediniz. Size gönderdiğimiz mail'deki kodu aşağıdaki kutucuğa giriniz:</p>
                                </div>
                            :
                                <div className="ui negative message">
                                    <div className="header">
                                        E-Posta Doğrulama Başarısız
                                    </div>
                                    <p>Lütfen e-posta kutunuzu kontrol ediniz. Size gönderdiğimiz mail'deki kodu aşağıdaki kutucuğa giriniz:</p>
                                </div>
                            }
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
                                    <form className="ui form attached fluid">
                                        <div className="field">
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
                                        <button className="ui teal button" onClick={this.sendAgain}>
                                            Yeniden Gönder
                                        </button>
                                        <FloatRight>
                                            <button className="ui primary button" onClick={this.verify}>
                                                Doğrula
                                            </button>
                                        </FloatRight>
                                    </div>
                                </Column>
                            </Row>
                            {(this.props.newUser)?
                                <Row size="one">
                                    <Column>
                                        <Center>
                                            <a href="" onClick={this.goHome}>
                                                Bu adımı şimdilik geç
                                            </a>
                                        </Center>
                                    </Column>
                                </Row>
                            :""}
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