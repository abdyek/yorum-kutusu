class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.refreshUnreadComments = this.refreshUnreadComments.bind(this);
        this.logout = this.logout.bind(this);
        this.openUnreadComments = this.openUnreadComments.bind(this);
        this.openProfile = this.openProfile.bind(this);
    }
    refreshUnreadComments() {
        // burada istekle yeni okunmamış mesajları çekicez
    }
    logout(e) {
        e.preventDefault();
        this.props.logout();
    }
    openUnreadComments(e) {
        e.preventDefault();
        this.props.changeContent("profil/"+this.props.userSlug+"/takipteki-urunler");
        // ek olarak okunmamış yorumları açacak bir mekanizma
    }
    openProfile(e) {
        e.preventDefault();
        this.props.changeContent(SITEURL+"profil/"+this.props.userSlug);
    }
    render() {
        let core;
        if(this.props.form=="user-has-unread") {
            core = (
                <FloatRight>
                    <a onClick={this.openUnreadComments}>
                        <button className="ui blue button">
                            <i className="icon">
                                <i id="unread-comments" className="fa fa-comments" aria-hidden="true"></i>
                            </i>
                            {this.props.unreadCommentsCount}
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
        } else if(this.props.form=="user-empty-unread") {
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

        } else if(this.props.form=="login") {
            core = (
                <FloatRight>
                    <a href="giris-yap" onClick={(e)=>{e.preventDefault();this.props.changeContent("giris-yap", true)}}>
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
        this.props.changeContent(" ", true);
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
                                <Menu changeContent={this.props.changeContent} form={this.props.form} unreadCommentsCount={this.props.unreadCommentsCount} userSlug={this.props.userSlug} logout={this.props.logout}/>
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
                    <Index changeContent={this.props.changeContent} changeLoading={this.props.changeLoading} />
                )
                break;
            case "profile":
                return (
                    <Profile changeContent={this.props.changeContent} changeLoading={this.props.changeLoading} />
                )
                break;
            case "product":
                return (
                    <Product  changeContent={this.props.changeContent} changeLoading={this.props.changeLoading} />
                )
                break;
            case "newProduct":
                return (
                    <NewProduct changeContent={this.props.changeContent} changeLoading={this.props.changeLoading} />
                )
                break;
            case "login":
                return (
                    <Login changeContent={this.props.changeContent} changeLoading={this.props.changeLoading} changeHeader={this.props.changeHeader} />
                )
                break;
            case "signup":
                return (
                    <Signup changeContent={this.props.changeContent}  changeLoading={this.props.changeLoading} />
                )
                break;
            case "filter":
                return (
                    <Filter  changeContent={this.props.changeContent}  changeLoading={this.props.changeLoading} />
                )
                break;
            case "emailValidationPage":
                return (
                    <EmailValidationPage  changeContent={this.props.changeContent}  changeLoading={this.props.changeLoading} />
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
            content:this.props.content,
            form:"login", // user-empty-unread, user-has-unread, login
            userSlug:"yunus-emre",
            unreadCommentsCount: 115
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
            const pathNames = getPathNames();
            const page = pathNames[0];
            this.setState({
                "content":this.contentFromSlug[page]
            });
        }.bind(this);

        this.changeContent = this.changeContent.bind(this);
        this.logout = this.logout.bind(this);
        this.changeHeader = this.changeHeader.bind(this);
    }
    componentDidMount() {
        let form = "login";
        let unread = 0;
        if(getCookie('user') && getCookie('user')!="null") {
            const json = atob(getCookie('user'));
            if(json['unreadComments']>0) {
                form = "user-has-unread";
                unread = json['unreadComments'];
            } else {
                form = "user-empty-unread";
                unread = 0;
            }
        }
        this.setState({
            "form": form,
            "unreadCommentsCount":unread
        });
    }
    changeContent(href, direct) {
        direct = direct || false;
        if(direct) {
            const cont = this.contentFromSlug[href];
            window.history.pushState({content:cont}, "title", SITEURL + href);
            this.setState({
                "content":this.contentFromSlug[href]
            })
        } else {
            const pathNames = getPathNames(href);
            const page = pathNames[0];
            const cont = this.contentFromSlug[page];
            window.history.pushState({content:cont}, "title", href);
            console.log(cont);
            this.setState({
                "content":cont
            });
        }
    }
    logout() {
        fetch(SITEURL + 'api/logout', {
            method: 'POST',
            heeader: {
                'Content-Type': 'application/json'
            }
        }).then((response)=> {
            if(!response.ok) throw new Error(response.status);
            else return response.json();
        }).then((json)=>{
            this.setState({
                form:"login"
            });
            setCookie('user', null);
            this.changeContent(' ', true);
        }).catch((error)=>{
            
        });
    }
    changeHeader(value) {
        this.setState({
            form:value
        });
    }
    render() {
        return (
            <div id="app">
                <Header changeContent={this.changeContent} form={this.state.form} userSlug={this.state.userSlug} unreadCommentsCount={this.state.unreadCommentsCount} logout={this.logout}/>
                <Content content={this.state.content} changeContent={this.changeContent} changeHeader={this.changeHeader}/>
                <Footer />
            </div>
        )
    }
}

ReactDOM.render(
    <App content={firstContent}/>,
    document.getElementById('root')
);
