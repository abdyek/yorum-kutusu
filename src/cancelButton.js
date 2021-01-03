class CancelButton extends React.Component {
    constructor(props) {
        super(props);
        this.closeFunc = this.closeFunc.bind(this);
    }
    closeFunc() {
        this.props.handleCancelButton();
    }
    render() {
        return(
            <button className="ui mini icon red button" onClick={this.closeFunc}>
                <i className="icon">
                    <i className="fa fa-times" aria-hidden="true"></i>
                </i>
            </button>
        )
    }
}
