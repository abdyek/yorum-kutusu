class Index extends React.Component {
    constructor(props) {
        super(props);
        this.changeContent = this.changeContent.bind(this);
    }
    changeContent(e) {
        e.preventDefault();
        this.props.changeContent(e.target.href);
    }
    render() {
        document.title = "Ana Sayfa";
        return(
            <div>
                <a href="giris-yap" onClick={this.changeContent}>
                    Giriş Yap
                </a>
                <H type="1" text="burası ana sayfa" />
            </div>
        )
    }
}