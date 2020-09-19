class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // user-empty-unread, user-has-unread, login
            form:"user-empty-unread",
            userName:"Yunus Emre",
            userURL:"yunus-emre",
            unreadComments: 115 /* okunmamış yorumlar */
        };
        this.refreshUnreadComments = this.refreshUnreadComments.bind(this);
        this.logout = this.logout.bind(this);
        this.openUnreadComments = this.openUnreadComments.bind(this);
        this.openProfile = this.openProfile.bind(this);
        this.openLogin = this.openLogin.bind(this);
    }
    refreshUnreadComments() {
        // burada istekle yeni okunmamış mesajları çekicez
    }
    logout(e) {
        e.preventDefault();
        this.setState({
            form:"login"
        });
    }
    openUnreadComments(e) {
        e.preventDefault();
        this.props.changeContent("profil/"+this.state.userURL);
        // ek olarak okunmamış yorumları açacak bir mekanizma
    }
    openProfile(e) {
        e.preventDefault();
        this.props.changeContent("profil/"+this.state.userURL);
    }
    openLogin(e) {
        e.preventDefault();
        this.props.changeContent("giris-yap");
    }
    render() {
        let core;
        if(this.state.form=="user-has-unread") {
            core = (
                <FloatRight>
                    <a href={this.state.href} onClick={this.openUnreadComments}>
                        <button className="ui blue button" onClick={this.goUserProfile}>
                            <i className="icon">
                                <i id="unread-comments" className="fa fa-comments" aria-hidden="true"></i>
                            </i>
                            {this.state.unreadComments}
                        </button> 
                    </a>
                    <a onClick={this.logout}>
                        <button class="ui icon blue button">
                            <i class="icon">
                                <i id="logout-button" class="fa fa-sign-out" aria-hidden="true"></i>
                            </i>
                        </button>
                    </a>
                </FloatRight>
            )
        } else if(this.state.form=="user-empty-unread") {
            core = (
                <FloatRight>
                    <a onClick={this.openProfile}>
                        <button class="ui blue button">
                            <i class="icon">
                                <i class="fa fa-user" aria-hidden="true"></i>
                            </i>
                            <span>Hesap</span>
                        </button>
                    </a>
                    <a onClick={this.logout}>
                        <button class="ui icon blue button">
                            <i class="icon">
                                <i id="logout-button" class="fa fa-sign-out" aria-hidden="true"></i>
                            </i>
                        </button>
                    </a>
                </FloatRight>
            )

        } else if(this.state.form=="login") {
            core = (
                <FloatRight>
                    <a onClick={this.openLogin}>
                        <button class="ui blue button">
                            <i class="icon">
                                <i class="fa fa-user" aria-hidden="true"></i>
                            </i>
                            <span>Giriş Yap</span>
                        </button>
                    </a>
                </FloatRight>
            )
        }
        return(
            <div id="menu">
                {core}
            </div>
        )
    }
}

class Logo extends React.Component {
    constructor(props){
        super(props);
        this.goHome = this.goHome.bind(this);
    }
    goHome(e) {
        this.props.changeContent(" ");
    }
    render() {
        return(
            <div id="logo" onClick={this.goHome}>
                <H type="1" text="Yorum Kutusu" />
            </div>
        )
    }
}

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: "",
            results: { }
        };
        this.refreshResults = this.refreshResults.bind(this);
        this.prepareATags = this.prepareATags.bind(this);
        this.changeInput = this.changeInput.bind(this);
        this.deleteResults = this.deleteResults.bind(this);
    }
    refreshResults() {
        // burada sunucu ile konuşucaz gelen veriyi results'a atıyoruz ve işlem tamamdır
        this.setState({
            results: {
                88: {
                    productName: "Le-Cola",
                    productUrl: "le-cola"
                }
            }
        });
    }
    prepareATags() {
        this.aTags = [];
        let keys = Object.keys(this.state.results);
        for(let i=0;i<keys.length;i++) {
            this.aTags.push(
                <a key={keys[i]} className="result" href={"urun/" + this.state.results[keys[i]].productUrl}>{this.state.results[keys[i]].productName}</a>
            )
        }
    }
    changeInput(e) {
        this.setState({
            inputValue:e.target.value
        });
        // bu kısımda bir delay'a ihtiyacım olabilir çünkü her harfte yenileme yaparsam back-end sıkıntı çekebilir
        this.refreshResults();
    }
    deleteResults() {
        this.setState({
            results: {}
        })
    }
    render() {
        if(Object.keys(this.state.results).length) {
            this.prepareATags();
        }
        return(
            <div id="search" className="ui search">
                <input className="prompt" type="text" placeholder="Ara..." value={this.state.inputValue} onChange={this.changeInput} onBlur={this.deleteResults} />
                {(Object.keys(this.state.results).length)?
                    <div id="search-results" className="results transition visible">
                        {this.aTags}
                    </div>
                :""}
            </div>
        )
    }
}

class Header extends React.Component {
    render() {
        return(
            <header>
                <Row withoutContainer={true} size="one">
                    <Column>
                        <Row>
                            <WideColumn size="four">
                                <Logo changeContent={this.props.changeContent} />
                            </WideColumn>
                            <WideColumn size="eight">
                                <SearchBar />
                            </WideColumn>
                            <WideColumn size="four">
                                <Menu changeContent={this.props.changeContent} />
                            </WideColumn>
                        </Row>
                    </Column>
                </Row>
            </header>
        )
    }
}

class Footer extends React.Component {
    render() {
        return(
            <footer>
                <div className="ui inverted vertical footer segment">
                    <div className="ui container">
                        <div>
                            yorumkutusu.com
                            <FloatRight>
                                © Tüm hakları saklıdır | 2020
                            </FloatRight>
                        </div>
                    </div>
                </div> 
            </footer>
        )
    }
}

class Content extends React.Component {
    render() {
        switch(this.props.content) {
            case "index":
                return (
                    <Index changeContent={this.props.changeContent}/>
                )
                break;
            case "profile":
                return (
                    <Profile changeContent={this.props.changeContent}/>
                )
                break;
            case "product":
                return (
                    <Product  changeContent={this.props.changeContent}/>
                )
                break;
            case "newProduct":
                return (
                    <NewProduct changeContent={this.props.changeContent}/>
                )
                break;
            case "login":
                return (
                    <Login changeContent={this.props.changeContent} />
                )
                break;
            case "signup":
                return (
                    <Signup changeContent={this.props.changeContent} />
                )
                break;
            case "filter":
                return (
                    <Filter  changeContent={this.props.changeContent} />
                )
                break;
            case "emailValidationPage":
                return (
                    <EmailValidationPage  changeContent={this.props.changeContent} />
                )
                break;
            default:
                return (
                    <div>{"Böyle bir sayfa yok" + this.state.content} </div>
                )
        } 
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "content":this.props.content
        };
        this.contentFromSlug = {
            " ":"index",
            "urun":"product",
            "profil":"profile",
            "yeni-urun":"newProduct",
            "uye-ol":"signup",
            "giris-yap":"login",
            "e-posta-dogrula":"emailValidationPage",
            "filtrele":"filter"
        }
        window.onpopstate = function(event) {
            if(event){
                if(window.history.state==null) {
                    window.history.back();
                } else {
                    this.setState({
                        content:window.history.state.content
                    });
                }
            }
            else{
                // Continue user action through link or button
            }
        }.bind(this);

        this.changeContent = this.changeContent.bind(this);
    }
    changeContent(href) {
        //console.log(event.target.href);
        //window.history.pushState({content:content}, "Title", SITEURL+ this.slug[content]);
        let foo = href.split(SITEURL);
        let bar = foo[foo.length-1];
        slug = bar.split("/")[0];
        let content = this.contentFromSlug[slug];
        window.history.pushState({content:content}, "Title", bar);
        this.setState({
            "content":content
        });
    }
    render() {
        return (
            <div id="app">
                <Header changeContent={this.changeContent} />
                <Content content={this.state.content} changeContent={this.changeContent} />
                <Footer />
            </div>
        )
    }
}

ReactDOM.render(
    <App content={firstContent}/>,
    document.getElementById('root')
);