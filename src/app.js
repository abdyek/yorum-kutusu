class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName : "Yunus Emre",
            userUrl: "yunus-emre",
            unreadComments: 123, /* okunmamış yorumlar */
        };
    }
    render() {
        return(
            <div id="menu">
                <FloatRight>
                    {(this.state.unreadComments)?
                        <UnreadComments unreadComments={this.state.unreadComments} userUrl={this.state.userUrl} />
                        :<AccountButton userName={this.state.userName} userUrl={this.state.userUrl} />
                    }
                    <LogoutButton userName={this.state.userName}/>
                </FloatRight>
            </div>
        )
    }
}

class AccountButton extends React.Component {
    constructor(props) {
        super(props);
        this.click = this.click.bind(this);
    }
    click() {
        if(this.props.userName) {
            // kullanıcının hesabına yönlendirme yapılacak
            this.props.userUrl; // url bir üstten geliyor yönlendirmede kullanırım
        } else {
            // Giriş yap sayfasına yönledirme yapılacak
        }
    }
    render() {
        return(
            <button class="ui blue button" onClick={this.click}>
                <i class="icon">
                    <i class="fa fa-user" aria-hidden="true"></i>
                </i>
                {(this.props.userName==undefined)?
                    <span>Giriş Yap</span>:
                    <span>Hesap</span>
                }
            </button>
        )
    }
}

class UnreadComments extends React.Component {
    constructor(props) {
        super(props);
        this.goUserProfile = this.goUserProfile.bind(this);
    }
    goUserProfile() {
        // profile takip edilen ürünleri açacak şekilde yönlendirmesi lazım
        this.props.userUrl; // url bir üstten geliyor yönlendirmede kullanırım
    }
    render() {
        return(
            <button className="ui blue button" onClick={this.goUserProfile}>
                <i className="icon">
                    <i id="unread-comments" className="fa fa-comments" aria-hidden="true"></i>
                </i>
                {this.props.unreadComments}
            </button> 
        )
    }
}

class LogoutButton extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        if(this.props.userName) {
            return(
                <button class="ui icon blue button">
                    <i class="icon">
                        <i id="logout-button" class="fa fa-sign-out" aria-hidden="true"></i>
                    </i>
                </button>
            )
        } else {
            return(
                <span></span>
            )
        }
    }
}

class SearchBar extends React.Component {
    render() {
        return(
            <div id="search" className="ui search">
                <input className="prompt" type="text" placeholder="Ara..." />
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
                                <Logo />
                            </WideColumn>
                            <WideColumn size="eight">
                                <SearchBar />
                            </WideColumn>
                            <WideColumn size="four">
                                <Menu />
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

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="app">
                <Header />
                <Content />
                <Footer />
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);