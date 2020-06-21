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
            message:""
        }
    }
    logInClick(event) {
        $.ajax({
            type:'POST',
            url:'ajax-login',
            data:{
                "user": {
                    "email_or_username": this.props.id,
                    "password": this.props.password
                }
            },
            success: function(response) {
                if(response["message"]) {
                    console.log("işte şimdi bittiniz");
                    alert(response["message"]);
                    this.setState({
                        message:response["message"]
                    })
                } else {
                    console.log("helal olsun kanka giriş yaptın");
                }
                this.props.came();

            }.bind(this),
            dataType:'json'
        })
        this.props.sent();
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
        this.props.idChangeHandler(event.target.value);
    }
    passwordChange(event){
        this.props.passwordChangeHandler(event.target.value);
    }
    render() {
        return(
            <Row size="sixteen">
                <WideColumn size="four" />
                <WideColumn size="eight">
                    <H type="1" textAlign="center" text="Giriş Yap"/>
                    {this.props.message}
                    <form className="ui form">
                        <div className="field">
                            <label>E-posta</label>
                            <input type="text" name="id" value={this.props.id} onChange={this.idChange} placeholder="veya Kullanıcı Adı" />
                        </div>
                        <div className="field">
                            <label>Parola</label>
                            <input type="password" name="password" value={this.props.password} onChange={this.passwordChange} placeholder="Parola" />
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
        this.state = {
            id:"",
            password:"",
            sent: false
        }
        this.showLoading = this.showLoading.bind(this);
        this.showLogin = this.showLogin.bind(this);
        this.changeId = this.changeId.bind(this);
        this.changePassword = this.changePassword.bind(this);
    }
    showLoading(){
        this.setState({
            sent:true
        })
    }
    showLogin() {
        this.setState({
            sent:false
        })
    }
    changeId(value) {
        this.setState({
            id:value
        })
    }
    changePassword(value){
        this.setState({
            password:value
        })
    }
    render() {
        if(this.state.sent) {
            this.page = <Loading />
        } else {
            this.page = <LogIn
                            sent={this.showLoading}
                            came={this.showLogin}
                            id={this.state.id}
                            password={this.state.password}
                            idChangeHandler={this.changeId}
                            passwordChangeHandler={this.changePassword}
                            message={"falan"}
                        />
        }
        return(
            <div>
                {this.page}
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
