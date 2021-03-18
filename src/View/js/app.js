class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.openUnreadComments = this.openUnreadComments.bind(this);
        this.openProfile = this.openProfile.bind(this);
    }
    logout(e) {
        e.preventDefault();
        this.props.logout();
    }
    openUnreadComments(e) {
        e.preventDefault();
        this.props.changeContent(SITEURL+"profil/"+this.props.userSlug+"/takipteki-urunler");
        // ek olarak okunmamış yorumları açacak bir mekanizma
    }
    openProfile(e) {
        e.preventDefault();
        this.props.changeContent(SITEURL+"profil/"+this.props.userSlug);
    }
    render() {
        if(this.props.form==="login") {
            return ( 
                <div id="menu">
                    <FloatRight>
                        <a href="giris-yap" onClick={(e)=>{e.preventDefault();this.props.changeContent("giris-yap", true)}}>
                            <button className="ui blue button">
                                <i className="icon">
                                    <i className="fa fa-user" aria-hidden="true"></i>
                                </i>
                                <span>Giriş Yap</span>
                            </button>
                        </a>
                    </FloatRight>
                </div>
            )
        } else if(this.props.form==="account") {
            if(this.props.unreadCommentsCount!==0) {
                return (
                    <div id="menu">
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
                                <button className="ui icon blue button">
                                    <i className="icon">
                                        <i id="logout-button" className="fa fa-sign-out" aria-hidden="true"></i>
                                    </i>
                                </button>
                            </a>
                        </FloatRight>
                    </div>
                )
            } else {
                return (
                    <div id="menu">
                        <FloatRight>
                            <a onClick={this.openProfile}>
                                <button className="ui blue button">
                                    <i className="icon">
                                        <i className="fa fa-user" aria-hidden="true"></i>
                                    </i>
                                    <span>Hesap</span>
                                </button>
                            </a>
                            <a onClick={this.logout}>
                                <button className="ui icon blue button">
                                    <i className="icon">
                                        <i id="logout-button" className="fa fa-sign-out" aria-hidden="true"></i>
                                    </i>
                                </button>
                            </a>
                        </FloatRight>
                    </div>
                )
            } 
        }
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

class SearchBarForProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: []
        };
        this.refreshResults = this.refreshResults.bind(this);
        this.prepareATags = this.prepareATags.bind(this);
        this.clickFunc = this.clickFunc.bind(this);
        this.changeInput = this.changeInput.bind(this);
        this.deleteResults = this.deleteResults.bind(this);
    }
    refreshResults() {
        this.setState({
            results: [
                {
                    id:"loading",
                    name:"Yükleniyor.."
                }
            ]
        });
        fetch(SITEURL + 'api/search?' + getUrlPar({
            name: this.props.tagSearchInput
        }), {method: 'GET'}).then((response)=>{
            if(!response.ok) throw new Error(response.status);
            else return response.json();
        }).then((json)=> {
            if(json.other.products.length==0) {
                this.setState({
                    results: [{
                        id:"yeni-urun",
                        name:"Ürün bulunamadı. Yeni ürün oluştur"
                    }]
                });
            } else {
                this.setState({
                    results: json.other.products
                });
            }
        }).catch((error) => {
            console.log(error);
        });
    }
    prepareATags() {
        this.aTags = [];
        for(let i=0;i<this.state.results.length;i++) {
            this.aTags.push(
                <SearchResult key={this.state.results[i].id} id={this.state.results[i].id} slug={this.state.results[i].slug} name={this.state.results[i].name} click={this.clickFunc} changeContent={this.props.changeContent}/>
            )
        }
    }
    clickFunc(obj) {
        this.props.click(obj);
        this.props.changeTagSearchInput("");
    }
    changeInput(e) {
        this.props.changeTagSearchInput(e.target.value);
        clearTimeout(this.setTime);
        if(e.target.value.length) {
            this.setTime = setTimeout(function() {
                this.refreshResults();
            }.bind(this), 1000);
        }
    }
    deleteResults() {
        setTimeout(()=>{
            this.setState({
                results: [] 
            })
        }, 200);
    }
    render() {
        if(this.state.results.length) {
            this.prepareATags();
        }
        return(
            <div id="search" className="ui search">
                <input className="prompt" type="text" placeholder="Ürün Ara.." value={this.props.tagSearchInput} onChange={this.changeInput} onBlur={this.deleteResults} />
                {(this.state.results.length)?
                    <div id="search-results" className="results transition visible">
                        {this.aTags}
                    </div>:""
                }
            </div>
        )
    }
}

class SearchBarForTag extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: []
        };
        this.checkAvailableTag = this.checkAvailableTag.bind(this);
        this.refreshResults = this.refreshResults.bind(this);
        this.prepareATags = this.prepareATags.bind(this);
        this.clickFunc = this.clickFunc.bind(this);
        this.changeInput = this.changeInput.bind(this);
        this.deleteResults = this.deleteResults.bind(this);
    }
    checkAvailableTag(tags) {
        for(let i=0;i<tags.length;i++) {
            if(this.props.tagSearchInput.toLowerCase()==tags[i].name.toLowerCase()) {
                this.props.checkAvailableTag(true);
                return;
            }
        }
        this.props.checkAvailableTag(false);
    }
    refreshResults() {
        this.setState({
            results: [
                {
                    id:"loading",
                    name:"Yükleniyor.."
                }
            ]
        });
        fetch(SITEURL + 'api/tag?' + getUrlPar({
            searchText: this.props.tagSearchInput
        }), {method: 'GET'}).then((response)=>{
            if(!response.ok) throw new Error(response.status);
            else return response.json();
        }).then((json)=> {
            this.setState({
                results: json.other.tags
            });
            this.checkAvailableTag(json.other.tags);
        }).catch((error) => {
            console.log(error);
        });
    }
    prepareATags() {
        this.aTags = [];
        for(let i=0;i<this.state.results.length;i++) {
            this.aTags.push(
                <SearchResult key={this.state.results[i].id} id={this.state.results[i].id} slug={this.state.results[i].slug} name={this.state.results[i].name} passive={this.state.results[i].passive} href={'urun'} click={this.clickFunc} />
            )
        }
    }
    clickFunc(obj) {
        this.props.click(obj);
        this.props.changeTagSearchInput("");
    }
    changeInput(e) {
        this.props.changeTagSearchInput(e.target.value);
        clearTimeout(this.setTime);
        if(e.target.value.length) {
            this.setTime = setTimeout(function() {
                this.refreshResults();
            }.bind(this), 1000);
        }
    }
    deleteResults() {
        setTimeout(()=>{
            this.setState({
                results: [] 
            })
        }, 200);
    }
    render() {
        if(this.state.results.length) {
            this.prepareATags();
        }
        return(
            <div id="search" className="ui search">
                <input className="prompt" type="text" placeholder="Etiket Ara.." value={this.props.tagSearchInput} onChange={this.changeInput} onBlur={this.deleteResults} />
                {(this.state.results.length)?
                    <div id="search-results" className="results transition visible">
                        {this.aTags}
                    </div>:""
                }
            </div>
        )
    }
}

class SearchResult extends React.Component {
    constructor(props) {
        super(props);
        this.click = this.click.bind(this);
    }
    click(e) {
        e.preventDefault();
        if(this.props.id=="loading")
            return;
        else if(this.props.id=="yeni-urun") {
            this.props.changeContent('yeni-urun', true)
            return;
        }
        this.props.click({
            id:this.props.id,
            slug:this.props.slug,
            name:this.props.name,
            passive:this.props.passive
        });
    }
    render() {
        return(
            <a key={this.props.id} className="result" href={this.props.href} onClick={this.click}>{this.props.name}</a>
        )
    }
}

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productSearchInput:""
        }
        this.changeProductSearchInput = this.changeProductSearchInput.bind(this);
        this.goProduct = this.goProduct.bind(this);
    }
    changeProductSearchInput(value) {
        this.setState({
            productSearchInput:value
        });
    }
    goProduct(obj) {
        this.props.changeContent(SITEURL + '/urun/' + obj.slug);
    }
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
                                <SearchBarForProduct
                                    tagSearchInput={this.state.productSearchInput}
                                    changeTagSearchInput={this.changeProductSearchInput}
                                    click={this.goProduct}
                                    changeContent={this.props.changeContent}
                                />
                            </WideColumn>
                            <WideColumn size="four">
                                <Menu
                                    changeContent={this.props.changeContent}
                                    form={this.props.form}
                                    unreadCommentsCount={this.props.unreadCommentsCount}
                                    userSlug={this.props.userSlug}
                                    logout={this.props.logout}
                                />
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
                                © Tüm hakları saklıdır | 2021
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
                    <Index changeContent={this.props.changeContent} />
                )
                break;
            case "profile":
                return (
                    <Profile changeContent={this.props.changeContent} />
                )
                break;
            case "product":
                return (
                    <Product  changeContent={this.props.changeContent} />
                )
                break;
            case "newProduct":
                return (
                    <NewProduct changeContent={this.props.changeContent} />
                )
                break;
            case "login":
                return (
                    <Login changeContent={this.props.changeContent} updateMenu={this.props.updateMenu} />
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
                    <EmailValidationPage changeContent={this.props.changeContent} />
                )
                break;
            case "editProduct":
                return (
                    <EditProduct changeContent={this.props.changeContent} />
                )
            case "forgotMyPassword":
                return (
                    <ForgotMyPassword changeContent={this.props.changeContent} />
                )
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
        let userInfo = getUserInfo();
        this.state = {
            content:this.props.content,
            form:(userInfo)?"account":"login", // login, account
            userSlug:(userInfo)?userInfo['slug']:"",
            unreadCommentsCount: (userInfo)?userInfo["unreadComments"]:0
        };
        this.contentFromSlug = {
            " ":"index",
            "urun":"product",
            "profil":"profile",
            "yeni-urun":"newProduct",
            "uye-ol":"signup",
            "giris-yap":"login",
            "e-posta-dogrula":"emailValidationPage",
            "filtrele":"filter",
            "urun-duzenle":"editProduct",
            "parolami-unuttum":"forgotMyPassword"
        }
        window.onpopstate = function(event) {
            const pathNames = getPathNames();
            const page = pathNames[0];
            this.setState({
                "content":this.contentFromSlug[page]
            });
        }.bind(this);
        this.updateMenu = this.updateMenu.bind(this);
        this.updateUnreadComments = this.updateUnreadComments.bind(this);
        this.changeContent = this.changeContent.bind(this);
        this.logout = this.logout.bind(this);
        this.changeHeader = this.changeHeader.bind(this);
    }
    updateMenu(slug) {
        this.setState({
            form:"account",
            userSlug:slug
        });
        this.updateUnreadComments();
    }
    updateUnreadComments() {
        if(isMember()) {
            fetch(SITEURL + 'api/followProduct?' + getUrlPar({
                pageNumber:-1
            }), {method: 'GET'}).then((response)=>{
                if(!response.ok) throw new Error(response.status);
                else return response.json();
            }).then((json)=>{
                this.setState({
                    unreadCommentsCount: json.other.allCommentCount
                });
                let userInfo = getUserInfo();
                if(userInfo) {
                    userInfo["unreadComments"] = json.other.allCommentCount;
                    let hash = base64FromObject(userInfo);
                    setCookie("user", hash);
                }
            }).catch((error) => {});
        }
    }
    changeContent(href, direct, slugs) {
        direct = direct || false;
        slugs = slugs || [];
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
            this.setState({
                "content":cont
            });
        }
        this.updateUnreadComments();
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
                <Header
                    changeContent={this.changeContent}
                    form={this.state.form}
                    userSlug={this.state.userSlug}
                    unreadCommentsCount={this.state.unreadCommentsCount}
                    logout={this.logout}
                />
                <Content
                    content={this.state.content}
                    changeContent={this.changeContent}
                    updateMenu = {this.updateMenu}
                />
                <Footer />
            </div>
        )
    }
}

ReactDOM.render(
    <App content={firstContent}/>,
    document.getElementById('root')
);
