class EmailValidationPage extends React.Component {
    render() {
        const pathNames = getPathNames();
        this.code = (pathNames[1])?pathNames[1]:"";
        return(
            <div>
                <EmailValidation afterLogin={true} changeContent={this.props.changeContent} validated={false} code={this.code}/>
            </div>
        )
    }
}
