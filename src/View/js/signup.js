class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form:"normal",      // normal, loading, success
            emailText:"",
            usernameText:"",
            passwordText:"",
            passwordVerificationText:"",
            message:"",
            messageColor:"",
            emailPatternWarn: false,
            usernamePatternWarn: false,
            passwordPatternWarn:false,
            passwordVerificationWarn:false,
        }
        this.signUpClick = this.signUpClick.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changeUsername = this.changeUsername.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changePasswordVerification = this.changePasswordVerification.bind(this);
        this.setMessage = this.setMessage.bind(this);
        this.checkEmailValidation = this.checkEmailValidation.bind(this);
        this.checkUsernamePattern = this.checkUsernamePattern.bind(this);
        this.checkPasswordPattern = this.checkPasswordPattern.bind(this);
        this.checkPasswordVerification = this.checkPasswordVerification.bind(this);
        this.setForm = this.setForm.bind(this);
    }
    signUpClick(e) {
        e.preventDefault();
        this.setForm('loading');
        fetch(SITEURL + 'api/signup', {
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                eMail: this.state.emailText,
                username: this.state.usernameText,
                password:this.state.passwordText
            })
        }).then((response)=>{
            if(!response.ok) throw new Error(response.status);
            else return response.json();
        }).then((json)=>{
            this.setForm('success');
        }).catch((error)=>{
            if(error.message==422) {
                this.setState({
                    form:"normal",
                    message: "Bu e-posta ya da kullanıcı adı kullanılamıyor",
                    messageColor:"red"
                });
            } else if(error.message==403) {
                this.setState({
                    form:"normal",
                    message: "Bu işlem için yetkiniz yok, halihazırda giriş yapmış olmadığınızdan emin olun",
                    messageColor:"red"
                });
            } else if(error.message==500) {
                this.setState({
                    form:"normal",
                    message: "500 - Sunucu hatası"
                })
            }
        });
    }
    changeEmail(e) {
        this.setState({
            emailText:e.target.value
        });
        this.checkEmailValidation(e.target.value);
    }
    changeUsername(e) {
        this.setState({
            usernameText:e.target.value
        });
        this.checkUsernamePattern(e.target.value);
    }
    changePassword(e) {
        this.setState({
            passwordText:e.target.value
        })
        this.checkPasswordPattern(e.target.value);
        this.checkPasswordVerification();
    }
    changePasswordVerification(e) {
        this.setState({
            passwordVerificationText:e.target.value
        })
        this.checkPasswordVerification();
    }
    setMessage(message, color) {
        this.setState({
            message:message,
            messageColor:color
        })
    }
    checkEmailValidation(value) {
        let enabled = !validateEmail(value);
        this.setState({
            emailPatternWarn:enabled
        });
    }
    checkUsernamePattern(value) {
        const len = value.length;
        let enabled;
        if(len>60) {
            enabled = true;
        } else {
            enabled = false;
        }
        this.setState({
            usernamePatternWarn:enabled
        });
    }
    checkPasswordPattern(value) {
        const len = value.length;
        let enabled;
        if(len<10 || len>40) {
            enabled = true;
        } else {
            enabled = false;
        }
        this.setState({
            passwordPatternWarn:enabled
        });
    }
    checkPasswordVerification() {
        setTimeout(()=>{
            let enabled;
            if(this.state.passwordText!=this.state.passwordVerificationText) {
                enabled = true;
            } else {
                enabled = false;
            }
            this.setState({
                passwordVerificationWarn:enabled
            });
        }, 150);
    }
    setForm(type) {
        this.setState({
            form:type
        });
    }
    render() {
        document.title = "Üye Ol";
        if(this.state.form=="normal") {
            return(
                <div>
                    <Row size="sixteen">
                        <WideColumn size="four"></WideColumn>
                        <WideColumn size="eight">
                            <H type="1" text="Üye Ol" id={"signupHeader"} textAlign={"center"}/>
                            <form className="ui form">
                                <div className="field signupInput">
                                    <label>E-posta</label>
                                    <input type="text" name="id" placeholder="e-posta" value={this.state.emailText} onChange={this.changeEmail}/>
                                </div>
                                {(this.state.emailPatternWarn)?
                                    <BasicMessageWithColor color={"yellow"} message={"Geçersiz E-posta"}/>:""
                                }
                                <div className="field signupInput">
                                    <label>Kullanıcı Adı</label>
                                    <input type="text" name="id" placeholder="kullanıcı adı"value={this.state.usernameText} onChange={this.changeUsername} />
                                </div>
                                {(this.state.usernamePatternWarn)?
                                    <BasicMessageWithColor color={"yellow"} message={"Geçersiz Kullanıcı Adı"}/>:""
                                }
                                <div className="field signupInput">
                                    <label>Parola</label>
                                    <input type="password" name="password" placeholder="parola" value={this.state.passwordText} onChange={this.changePassword}/>
                                </div>
                                {(this.state.passwordPatternWarn)?
                                    <BasicMessageWithColor color={"yellow"} message={"Geçersiz Parola"}/>:""
                                }
                                <div className="field signupInput">
                                    <label>Parola Tekrar</label>
                                    <input type="password" name="password" placeholder="parola tekrar" value={this.state.passwordVerificationText} onChange={this.changePasswordVerification}/>
                                </div>
                                {(this.state.passwordVerificationWarn)?
                                    <BasicMessageWithColor color={"yellow"} message={"Parola Tekrarı İle Aynı Değil"}/>:""
                                }
                                {(this.state.message)? <BasicMessageWithColor color={this.state.messageColor} message={this.state.message}/>:""}
                            </form>
                        </WideColumn>
                    </Row>
                    <Row size="sixteen">
                        <WideColumn size="four"></WideColumn>
                        <WideColumn size="eight">
                            <FloatRight>
                                <button className="ui primary button" type="submit" onClick={this.signUpClick}>Üye Ol</button>
                            </FloatRight>
                        </WideColumn>
                    </Row>
                </div>
            )
        } else if(this.state.form=="loading") {
            return (
                <Row size="one">
                    <Column>
                        <RowLoadingSpin nonSegment={true} />
                    </Column>
                </Row>
            )
        } else if(this.state.form=="success") {
            return (
                <Row size="one">
                    <Column>
                        <div className="ui positive message">
                            <div className="header">
                                Başarılı
                            </div>
                            <p>Başarılı bir şekilde üye oldunuz, giriş yapabilirsiniz</p>
                        </div>
                    </Column>
                </Row>
            )
        }
    }
}
