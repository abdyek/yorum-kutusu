// eğer kullanıcı giriş yapmadıysa burayı göstericez
class LogIn extends React.Component {
    constructor(props) {
        super(props);
        // bind
        this.logInClick = this.logInClick.bind(this);
        this.idChange = this.idChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        // ^ bind
        this.state = {
            id:"",
            password:"",
            loading:false,
            message: ""
        }
    }
    logInClick(event) {
        this.setState({
            loading:true
        })
        $.ajax({
            type:'POST',
            url:'ajax-login',
            data:{
                "user": {
                    "email_or_username": this.state.id,
                    "password": this.state.password
                }
            },
            success: function(response) {
                // başarılı olması durumunda çalışacak fonki
                // setCookie("jwt",response.jwt,365);
                console.log(response);
                this.setState({
                    loading:false
                })
                if(response.jwt) {
                    console.log(response);
                    // setCookie("userName", response.username, 365); -> buna ihtiyaç kalmadı artık kullanıcı ismini back-endden çekiyorum
                    window.location.href = 'index';
                }
                if(response.message!="") {
                    this.setState({
                        message: <ErrorMessageBox text={response.message}/>
                    });
                }
            }.bind(this),
            dataType:'json'
        })
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
        if(this.state.loading){
            return(
                <RowLoading />
            )
        } else {
            return(
                <Row size="sixteen">
                    <WideColumn size="four" />
                    <WideColumn size="eight">
                        {this.state.message}
                        <form className="ui form">
                            <div className="field">
                                <label>E-posta</label>
                                <input type="text" name="id" value={this.state.id} onChange={this.idChange} placeholder="veya Kullanıcı Adı" />
                            </div>
                            <div className="field">
                                <label>Parola</label>
                                <input type="password" name="password" value={this.state.password} onChange={this.passwordChange} placeholder="Parola" />
                            </div>
                            <FloatRight>
                                <button className="ui primary button" type="submit" onClick={this.logInClick}>Giriş Yap</button>
                            </FloatRight>
                        </form>
                    </WideColumn>
                </Row>
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
                            Hesabın mı yok?<br />
                            <a href="uye-ol" onClick={this.changeContent}>
                                Şimdi Üye ol
                            </a>
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
                        <H type="1" textAlign="center" text="Giriş Yap"/>
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
                <LogIn />
                <SignUp changeContent={this.props.changeContent} />
            </div>
        )
    }
}
