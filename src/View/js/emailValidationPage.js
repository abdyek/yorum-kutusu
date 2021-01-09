class EmailValidationPage extends React.Component {
    render() {
        document.title = "E-Posta Doğrula";
        return(
            <div>
                <EmailValidation newUser={true} changeContent={this.props.changeContent} />
            </div>
        )
    }
}