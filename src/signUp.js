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
    render() {
        return(
            <div>
                <Row size="one">
                    <Column>
                        buraya giriş yap şeyleri gelecek
                    </Column>
                </Row>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)