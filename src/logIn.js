// bu kısmı nereden kontrol edeceğime henüz karar vermedim

class App extends React.Component {
    constructor(props) {
        super(props);
    }
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

// eğer kullanıcı giriş yapmadıysa burayı göstericez
class LogIn extends React.Component {
    constructor(props) {
        super(props);
        // bind
        this.logInClick = this.logInClick.bind(this);
        this.rememberMeToggle = this.rememberMeToggle.bind(this);
        this.onChangeHandler= this.onChangeHandler.bind(this);
        this.idChange = this.idChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        // ^ bind
        this.state = {
            rememberMeCheched:true,
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
    rememberMeToggle() {
        if(this.state.rememberMeCheched) {
            this.setState({
                rememberMeCheched:false
            })
        } else {
            this.setState({
                rememberMeCheched:true
            })
        }
    }
    onChangeHandler(){
        /*
            bu fonksiyonun bütün olayı react'ın "bilader checked'i state e bağladın ama onChange 'e bir şey bağlamadın" uyarısına karşılık
            "yaa react kardeş çok rahat konuşuyordun" demektir
        */
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
                <Loading />
            )
        }
        return(
            <Row size="sixteen">
                <WideColumn size="four" />
                <WideColumn size="eight">
                    <H type="1" textAlign="center" text="Giriş Yap"/>
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
                        <div className="field">
                            <div className="ui checkbox" onClick={this.rememberMeToggle}>
                            <input type="checkbox" onChange={this.onChangeHandler} checked={this.state.rememberMeCheched} tabIndex="0" className="hidden" />
                            <label>Beni Hatırla</label>
                            </div>
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

class Content extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                <LogIn />
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
