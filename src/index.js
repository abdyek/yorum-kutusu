class Index extends React.Component {
    constructor(props) {
        super(props);
        this.changeContent = this.changeContent.bind(this);
    }
    changeContent(content) {
        //console.log(content);
        this.props.changeContent(content);
    }
    render() {
        return(
            <div onClick={(e)=>this.changeContent("login", e)} >
                <H type="1" text="burası ana sayfa" />
            </div>
        )
    }
}