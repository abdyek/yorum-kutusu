class App extends React.Component {
    render() {
        return(
            <div>
                <Header />
                <Content />
                <Footer />
            </div>
        )
    }
}

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form:"normal",
            emailText:"",
            usernameText:"",
            passwordText:"",
            passwordVerificationText:"",
            /*
            error:[
                "Kullanıcı adı hali hazırda kullanılmakta",
                "E-mail hali hazırda kullanılmakta",
                "Şifre çok kısa (en az 6 karakter)",
                "Şifre en az 1 rakam ve 1 harf içermelidir"
            ]
            */
            error:null
        }
        this.signUpClick = this.signUpClick.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changeUsername = this.changeUsername.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changePasswordVerification = this.changePasswordVerification.bind(this);
    }
    signUpClick(e) {
        if(this.state.passwordText!=this.state.passwordVerificationText) {
            this.setState({
                error:["Parola tekrarı ile uyumlu değil!"]
            })
        } else {
            // API'ye gönderme işini buraya yapıyoruz
            // this.state.error 'u null a eşitleyince hata mesajı görünmüyor,
            // API'den gelen error'un valuesunu doğrudan this.state.error'a eşitle
            // eğer başarılı bir şekilde hesap oluşturulmuşsa giriş sayfasına yönlendirip orada "üyelik işleminiz başarılı" diye bir mesaj verilebilir
        }
        e.preventDefault();
    }
    changeEmail(e) {
        this.setState({
            emailText:e.target.value
        })
    }
    changeUsername(e) {
        this.setState({
            usernameText:e.target.value
        })
    }
    changePassword(e) {
        this.setState({
            passwordText:e.target.value
        })
    }
    changePasswordVerification(e) {
        this.setState({
            passwordVerificationText:e.target.value
        })
    }
    render() {
        if(this.state.error) {
            this.errorMessageContent = [];
            for(let i=0;i<this.state.error.length;i++) {
                this.errorMessageContent.push(
                    <li key={i}>{this.state.error[i]}</li>
                )
            }
        }
        return(
            <div>
                <Row size="sixteen">
                    <WideColumn size="four"></WideColumn>
                    <WideColumn size="eight">
                        <H type="1" textAlign="center" text="Üye Ol"/>
                        <form className="ui form">
                            <div className="field">
                                <label>E-posta</label>
                                <input type="text" name="id" placeholder="e-posta" value={this.state.emailText} onChange={this.changeEmail}/>
                            </div>
                            <div className="field">
                                <label>Kullanıcı Adı</label>
                                <input type="text" name="id" placeholder="kullanıcı adı"value={this.state.usernameText} onChange={this.changeUsername} />
                            </div>
                            <div className="field">
                                <label>Parola</label>
                                <input type="password" name="password" placeholder="parola" value={this.state.passwordText} onChange={this.changePassword}/>
                            </div>
                            <div className="field">
                                <label>Parola Tekrar</label>
                                <input type="password" name="password" placeholder="parola tekrar" value={this.state.passwordVerificationText} onChange={this.changePasswordVerification}/>
                            </div>
                        </form>
                    </WideColumn>
                </Row>
                <Row size="sixteen">
                    <WideColumn size="four"></WideColumn>
                    <WideColumn size="eight">
                        {
                            this.state.error?
                            <div className="ui error message">
                                <div className="header">
                                    Üyelik için bu koşulları sağlamanız gerekiyor
                                </div>
                                <ul className="list">
                                    {this.errorMessageContent}
                                </ul>
                            </div> 
                            :
                            ""
                        }
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
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)