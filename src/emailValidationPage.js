class EmailValidationPage extends React.Component {
    constructor(props){
        super(props);
        this.changeContent = this.changeContent.bind(this);
    }
    changeContent(content) {
        this.props.changeContent(content);
    }
    render() {
        document.title = "E-Posta Doğrula";
        return(
            <div>
                <EmailValidation newUser={true} />
            </div>
        )
    }
}