// eğer kullanıcı giriş yapmadıysa burayı göstericez
class LogIn extends React.Component {
    constructor(props) {
        super(props);
        // bind
        this.changeContent = this.changeContent.bind(this);
        this.login = this.login.bind(this);
        this.logInClick = this.logInClick.bind(this);
        this.idChange = this.idChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        // ^ bind
        this.state = {
            id:"",
            password:"",
            success:false,
            loading:false,
            message: "",
            messageColor:""
        }
    }
    componentDidMount() {
        if(isMember()) {
            this.props.changeContent(' ', true);
        }
    }
    changeContent(e) {
        e.preventDefault();
        this.props.changeContent(e.target.href);
    }
    login() {
        fetch(SITEURL + 'api/login', {
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.id,
                password:this.state.password
            })
        }).then((response)=>{
            if(!response.ok) throw new Error(response.status);
            else return response.json();
        }).then((json)=>{
            this.setState({
                loading:false,
                success:true
            });
            let hash = btoa({
                'userID':json.userID,
                'unreadComments':0
            });
            setCookie('user', hash);
            this.props.changeHeader("user-empty-unread");
            setTimeout(()=>{
                this.props.changeContent(' ', true);
            }, 2000);
        }).catch((error)=>{
            if(error.message==401) {
                this.setState({
                    loading:false,
                    message: "E-posta ile parola uyumsuz",
                    messageColor:"red"
                });
            } else if(error.message==403) {
                this.setState({
                    loading:false,
                    message: "Zaten giriş yapılmış!",
                    messageColor:"red"
                });
            }
        });
    }
    logInClick(event) {
        this.setState({
            loading:true
        })
        this.login();
        event.preventDefault();
    }
    idChange(event) {
        this.setState({
            id:event.target.value
        })
    }
    passwordChange(event){
        this.setState({
            password:event.target.value
        })
    }
    render() {
        document.title = "Giriş Yap";
        if(this.state.success) {
            return (
                <div>
                    <Row size="sixteen">
                        <WideColumn size="four" />
                        <WideColumn size="eight">
                            <div class="ui blue message">
                                <div class="header">
                                    Başarılı bir şekilde giriş yaptınız
                                </div>
                                Bir kaç saniye içerisinde ana sayfaya yönlendirileceksiniz
                            </div>
                        </WideColumn>
                    </Row>
                </div>
            )
        }
        if(this.state.loading){
            return(
                <RowLoadingSpin nonSegment={true} />
            )
        } else {
            return(
                <div>
                <Row size="sixteen">
                    <WideColumn size="four" />
                    <WideColumn size="eight">
                        {(this.state.message)?
                            <div class={"ui "+this.state.messageColor+" message"}>{this.state.message}</div>
                        :""}
                        <form className="ui form">
                            <div className="field loginInput">
                                <label>E-posta</label>
                                <input type="text" name="id" value={this.state.id} onChange={this.idChange} placeholder="E-posta" />
                            </div>
                            <div className="field loginInput">
                                <label>Parola</label>
                                <input type="password" name="password" value={this.state.password} onChange={this.passwordChange} placeholder="Parola" />
                            </div>
                            <FloatRight>
                                <button className="ui teal button" type="submit" onClick={this.logInClick}>Giriş Yap</button>
                            </FloatRight>
                        </form>
                    </WideColumn>
                </Row>
                <Row size="one">
                    <Column>
                        <Center>
                            <div className="haveAccount">
                                Hesabın mı yok?<br />
                                <a href="uye-ol" onClick={this.changeContent}>
                                    Şimdi Üye ol
                                </a>
                            </div>
                        </Center>
                    </Column>
                </Row>
                </div>
            )
        }
    }
}

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.changeContent = this.changeContent.bind(this);
    }
    changeContent(e) {
        e.preventDefault();
        this.props.changeContent(e.target.href);
    }
    render() {
        return(
            <div>
                <Row size="one">
                    <Column>
                        <Center>
                            <div className="haveAccount">
                                Hesabın mı yok?<br />
                                <a href="uye-ol" onClick={this.changeContent}>
                                    Şimdi Üye ol
                                </a>
                            </div>
                        </Center>
                    </Column>
                </Row>
            </div>
        )
    }
}

class ErrorMessageBox extends React.Component {
    render() {
        if(this.props.text==undefined) {
            return <div></div>
        }
        return(
            <div className="ui red message">{this.props.text}</div>
        )
    }
}

class UserArea extends React.Component {
    render() {
        return(
            <div>Kullanıcı ayarları ve diğer şeyler</div>
        )
    }
}

class Head extends React.Component {
    render() {
        return(
            <div>
                <Row size="sixteen">
                    <WideColumn size="four" />
                    <WideColumn size="eight">
                        <h1 className="girisYapHeader textAlignCenter">Giriş Yap</h1>
                    </WideColumn>
                </Row>
            </div>
        )
    }
}

class Login extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                <Head />
                <LogIn changeContent={this.props.changeContent} changeHeader={this.props.changeHeader}/>
            </div>
        )
    }
}
