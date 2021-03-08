class ForgotMyPassword extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            form:"sendEmailButton", // sendEmailButton, normal, loading, success
            email:"",
            username:"",
            emailPatterWarn:false,
            responseVisible:false,
        }
        this.sendEmail = this.sendEmail.bind(this);
        this.sendRecoveryCode = this.sendRecoveryCode.bind(this);
        this.goLogin = this.goLogin.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changeUsername = this.changeUsername.bind(this);
    }
    sendEmail() {
        this.setState({
            form:"loading"
        });
        // sending request
    }
    sendRecoveryCode() {
        this.setState({
            form:"loading"
        });
        // sending request
    }
    goLogin(e) {
        e.preventDefault();
        this.props.changeContent('giris-yap', true);
    }
    changeEmail(e) {
        this.setState({
            email:e.target.value,
            emailPatterWarn:!validateEmail(e.target.value)
        });
    }
    changeUsername(e) {
        this.setState({
            username:e.target.value
        });
    }
    render() {
        document.title="Parolami Unuttum";
        if(this.state.form=="sendEmailButton") {
            return (
                <Row size="sixteen">
                    <WideColumn size="four"/>
                    <WideColumn size="eight">
                        <ForgotMyPasswordHeader />
                        <Row size="one">
                            <Column>
                                <form className="ui form">
                                    <div className="field">
                                        <label>E-posta</label>
                                        <input type="email" name="e-posta" placeholder="E-posta" value={this.state.email} onChange={this.changeEmail}/>
                                    </div>
                                    {(this.state.emailPatterWarn)?
                                        <BasicMessageWithColor color="yellow" message="Geçersiz E-posta"/>:""}
                                    <div className="field">
                                        <label>Kullanıcı Adı</label>
                                        <input type="text" name="kullanici-adi" placeholder="Kullanıcı Adı" value={this.state.username} onChange={this.changeUsername}/>
                                    </div>
                                </form>
                            </Column>
                        </Row>
                        <Row size="one">
                            <Column>
                                <Center>
                                    <Button type="green big" name="Kurtarma E-postası Gönder" click={this.sendEmail}/>
                                </Center>
                            </Column>
                        </Row>
                    </WideColumn>
                    <WideColumn size="four"/>
                </Row>
            )
        } else if(this.state.form=="normal") {
            return (
                <Row size="sixteen">
                    <WideColumn size="four"/>
                    <WideColumn size="eight">
                        <Row size="one">
                            <Column>
                                <form className="ui form">
                                    <div className="field">
                                        <label>First Name</label>
                                        <input type="text" name="first-name" placeholder="First Name"/>
                                    </div>
                                    <div className="field">
                                        <label>Last Name</label>
                                        <input type="text" name="last-name" placeholder="Last Name" />
                                    </div>
                                    <button className="ui button" type="submit">Submit</button>
                                </form>
                            </Column>
                        </Row>
                    </WideColumn>
                    <WideColumn size="four"/>
                </Row>
            )
        } else if(this.state.form=="loading") {
            return (
                <RowLoadingSpin nonSegment={true} />
            )
        } else if(this.state.form=="success") {
            return (
                <Row size="sixteen">
                    <WideColumn size="four"/>
                    <WideColumn size="eight">
                        <Row size="one">
                            <Column>
                                <Message header="Başarılı" message="Başarılı bir şekilde parola sıfırlandı. Giriş yapabilirsiniz"/>
                            </Column>
                        </Row>
                        <Row size="one">
                            <Column>
                                <Center>
                                    <Button type="green" name="Giriş Yap" click={this.goLogin}/>
                                </Center>
                            </Column>
                        </Row>
                    </WideColumn>
                    <WideColumn size="four"/>
                </Row>
            )
        }
    }
}

class ForgotMyPasswordHeader extends React.Component {
    render() {
        return (
            <Row size="one">
                <Column>
                    <H type="1" text="Parolamı Unuttum" id={"forgotMyPasswordHeader"} textAlign={"center"}/>
                </Column>
            </Row>
        )
    }
}
