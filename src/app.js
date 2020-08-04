class Menu extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        if(false) {
            return(
                <LogInButton />
            )
        }
        return(
            <AccountButton userName={"mahmut"} />
        )
    }
}

class LogInButton extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <a href="girisYap">
                <div id="menu" className="ui secondary  menu">
                    <div id="hesap" className="ui button">
                        <i className="icon">
                            <i className="fa fa-user" aria-hidden="true"></i>
                        </i>
                        Giriş Yap
                    </div>
                </div>
            </a>
        )
    }
}

class AccountButton extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <a href={"profil/"+this.props.userName}>
                <div id="menu" className="ui secondary  menu">
                    <div id="hesap" className="ui button">
                        <i className="fa fa-user" aria-hidden="true"></i> {this.props.userName}
                    </div>
                </div>
            </a>
        )
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
                                <FloatRight>
                                    <Menu />
                                </FloatRight>
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