class EmailValidation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // normal, loading, success
            form:(this.props.validated===false)?"normal":"none",
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
        // put
        this.setState({
            form:"loading"
        });
        fetch(SITEURL + 'api/confirmEmail', {
            method: 'PUT',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                confirmCode:this.state.code
            })
        }).then((response)=>{
            if(!response.ok) throw new Error(response.status);
            else return response.json();
        }).then((json)=>{
            this.setState({
                form:"success"
            });
        }).catch((error)=>{
            this.setState({
                form:"normal"
            });
            if(error.message==404) {
                this.showTopMessage('warning', 'Yanlış doğrulama kodu');
            } else if(error.message==401) {
                this.showTopMessage('warning', 'Yeni bir doğrulama e-postası isteyin. Çok fazla hatalı giriş yaptınız!');
            }
            // hatalar
        });
    }
    sendAgain() {
        // post
        this.setState({
            form:"loading"
        });
        fetch(SITEURL + 'api/confirmEmail', {
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            })
        }).then((response)=>{
            if(!response.ok) throw new Error(response.status);
            else return response.json();
        }).then((json)=>{
            this.showTopMessage('success', 'E-posta başarılı bir şekilde gönderildi');
            this.setState({
                form:"normal"
            });
        }).catch((error)=>{
            this.setState({
                form:"normal"
            });
            if(error.message==422) {
                this.showTopMessage('success', 'Hali hazırda e-posta doğrulaması yapılmış');
            }
        });
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
        this.props.changeContent(" ", true);
    }
    render() {
        if(this.state.form=="normal") {
            return(
                <Row size="sixteen">
                    <WideColumn size="four" />
                    <WideColumn size="eight">
                        <RaisedSegment otherClass="comment">
                            <Row size="one">
                                <Column>
                                    <H type="3" text="E-posta Doğrula"/>
                                </Column>
                            </Row>
                            <div className="ui negative message">
                                <div className="header">
                                    E-posta Adresiniz Doğrulanmadı
                                </div>
                                <p>E-postanıza gönderdiğimiz doğrulama kodu ile e-postanızı doğrulayabilirsiniz</p>
                            </div>
                            {(this.state.topMessage)?
                                <Row size="one">
                                    <Column>
                                        <BasicMessage type={this.state.topMessage.type} text={this.state.topMessage.text} />
                                    </Column>
                                </Row>
                            :""}
                            <Row size="one">
                                <Column>
                                    <form className="ui form attached fluid">
                                        <div className="field">
                                        <label>Doğrulama Kodu</label>
                                        <input placeholder="Doğrulama Kodu" type="text" value={this.state.code} onChange={this.changeCode} />
                                        </div>
                                    </form>
                                </Column>
                            </Row>
                            <Row size="one">
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
                            {(this.props.afterLogin)?
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
                        </RaisedSegment>
                    </WideColumn>
                </Row>
            )
        } else if(this.state.form=="loading") {
            return(
                <Row size="sixteen">
                    <WideColumn size="four"/>
                    <WideColumn size="eight">
                        <RowLoadingSpin />
                    </WideColumn>
                </Row>
            )
        } else if(this.state.form=="success") {
            return(
                <Row size="one">
                    <Column>
                        <BasicMessage type="success" text="E-posta adresiniz başarılı bir şekilde doğrulandı." />
                    </Column>
                </Row>
            )
        } else if(this.state.form=="none"){
            return ""
        }
    }
}
