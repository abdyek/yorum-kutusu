class ForgotMyPassword extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            form:"sendEmailButton", // sendEmailButton, normal, loading, success
            email:"",
            username:"",
            recoveryCode:"",
            password:"",
            passwordAgain:"",
            emailPatternWarn:false,
            passwordWarn:false,
            passwordAgainWarn:false,
            responseVisible:false,
            responseColor:"",
            responseMessage:"",
            infoMessage:true
        }
        this.sendEmail = this.sendEmail.bind(this);
        this.send = this.send.bind(this);
        this.goLogin = this.goLogin.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changeUsername = this.changeUsername.bind(this);
        this.changeRecoveryCode = this.changeRecoveryCode.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changePasswordAgain = this.changePasswordAgain.bind(this);
        this.setResponseMessage = this.setResponseMessage.bind(this);
        this.goBack = this.goBack.bind(this);
    }
    sendEmail() {
        if(this.state.emailPatternWarn || this.state.email.length===0 || this.state.username.length===0) {
            this.setState({
                emailPatternWarn:true
            });
            return;
        }
        this.setState({
            form:"loading"  // loading
        });
        fetch(SITEURL + 'api/forgotMyPassword', {
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                eMail:this.state.email,
                username:this.state.username
            })
        }).then((response)=>{
            if(!response.ok) throw new Error(response.status);
            else return response.json();
        }).then((json)=>{
            this.setState({
                form:"normal",
                responseVisible:false
            });
        }).catch((error)=>{
            if(error.message==403) {
                this.setResponseMessage("red", "Bu işlem için yetkiniz yok");
                this.setState({
                    form:"sendEmailButton"
                })
            }
        });
    }
    send() {
        if(this.state.passwordWarn || this.state.passwordAgainWarn || this.state.password.length===0 ||  this.state.passwordAgain.length===0) {
            this.setState({
                passwordWarn:true
            });
            return;
        }
        this.setState({
            form:"loading"
        });
        fetch(SITEURL + 'api/forgotMyPassword', {
            method: 'PUT',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                eMail:this.state.email,
                username: this.state.username,
                recoveryCode: this.state.recoveryCode,
                newPassword:this.state.password
            })
        }).then((response)=>{
            if(!response.ok) throw new Error(response.status);
            else return response.json();
        }).then((json)=>{
            this.setState({
                form:"success"
            });
        }).catch((error)=>{
            let form;
            if(error.message==403) {
                this.setResponseMessage("red", "Bu işlem için yetkiniz yok");
                form = "normal";
            } else if(error.message==404) {
                this.setResponseMessage("red", "Geçersiz Kod");
                form = "normal";
            } else if(error.message==401) {
                this.setResponseMessage("red", "3 defa hatalı kod girişi yaptınız. Yeni bir kurtarma e-postası isteyin");
                form = "sendEmailButton";
            }
            this.setState({
                form:form
            });
        });
    }
    goLogin(e) {
        e.preventDefault();
        this.props.changeContent('giris-yap', true);
    }
    changeEmail(e) {
        this.setState({
            email:e.target.value,
            emailPatternWarn:!validateEmail(e.target.value)
        });
    }
    changeUsername(e) {
        this.setState({
            username:e.target.value
        });
    }
    changeRecoveryCode(e) {
        this.setState({
            recoveryCode:e.target.value
        });
    }
    changePassword(e) {
        const len = e.target.value.length;
        let showWarn = false;
        if(len<10 || len>40) {
            showWarn = true
        }
        this.setState({
            password:e.target.value,
            passwordWarn:showWarn
        });
    }
    changePasswordAgain(e){
        const password = this.state.password;
        this.setState({
            passwordAgain:e.target.value,
            passwordAgainWarn: (password!=e.target.value)
        });
    }
    setResponseMessage(color, message) {
        this.setState({
            responseVisible:true,
            responseColor:color,
            responseMessage:message
        });
    }
    goBack() {
        this.setState({
            responseVisible:false,
            form:"sendEmailButton"
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
                                    {(this.state.emailPatternWarn)?
                                        <BasicMessageWithColor color="yellow" message="Geçersiz E-posta"/>:""}
                                    <div className="field">
                                        <label>Kullanıcı Adı</label>
                                        <input type="text" name="kullanici-adi" placeholder="Kullanıcı Adı" value={this.state.username} onChange={this.changeUsername}/>
                                    </div>
                                </form>
                            </Column>
                        </Row>
                        {(this.state.responseVisible)?
                            <Row size="one">
                                <Column>
                                    <BasicMessageWithColor color={this.state.responseColor} message={this.state.responseMessage} />
                                </Column>
                            </Row>:""
                        }
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
                        <ForgotMyPasswordHeader />
                        <Row size="one">
                            <Column>
                                <form className="ui form">
                                    <div className="field">
                                        <label>E-posta</label>
                                        <input type="email" name="e-posta" placeholder="E-posta" value={this.state.email} disabled/>
                                    </div>
                                    <div className="field">
                                        <label>Kullanıcı Adı</label>
                                        <input type="text" name="kullanici-adi" placeholder="Kullanıcı Adı" value={this.state.username} disabled/>
                                    </div>
                                    {(this.state.infoMessage)?
                                        <Message header="E-posta kutunuzu kontrol edin" message="E-posta ve kullanıcı adınızı eksiksiz yazdıysanız kurtarma e-postası sorunsuz bir şekilde ulaşacaktır" />:""
                                    }
                                    <div className="field">
                                        <label>Kurtarma Kodu</label>
                                        <input type="text" name="kurtarma-kodu" placeholder="Kurtarma Kodu" value={this.state.recoveryCode} onChange={this.changeRecoveryCode}/>
                                    </div>
                                    <div className="field">
                                        <label>Yeni Parola</label>
                                        <input type="password" name="parola" placeholder="Parola" value={this.state.password} onChange={this.changePassword}/>
                                    </div>
                                    {(this.state.passwordWarn)?
                                        <BasicMessageWithColor color="yellow" message="Parola uzunluğu [10-40] karakter olmalı"/>:""}
                                    <div className="field">
                                        <label>Yeni Parola Tekrar</label>
                                        <input type="password" name="parola-tekrar" placeholder="Parola Tekrar" value={this.state.passwordAgain} onChange={this.changePasswordAgain}/>
                                    </div>
                                    {(this.state.passwordAgainWarn)?
                                        <BasicMessageWithColor color="yellow" message="Parola tekrarı ile aynı değil"/>:""}
                                </form>
                                {(this.state.responseVisible)?
                                    <Row size="one">
                                        <Column>
                                            <BasicMessageWithColor color={this.state.responseColor} message={this.state.responseMessage} />
                                        </Column>
                                    </Row>:""
                                }
                                <Row size="two">
                                    <Column>
                                        <Button type="teal" name="Düzenle" click={this.goBack} />
                                    </Column>
                                    <Column>
                                        <FloatRight>
                                            <Button type="green" name="Değiştir" click={this.send}/>
                                        </FloatRight>
                                    </Column>
                                </Row>
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
