class EmailValidationPage extends React.Component {
    render() {
        document.title = "E-Posta Doğrula";
        return(
            <div>
                <EmailValidation afterLogin={true} changeContent={this.props.changeContent} validated={false}/>
            </div>
        )
    }
}
