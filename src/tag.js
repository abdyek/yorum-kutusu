class Tag extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        if(this.props.passive) {
            return (
                <a className="ui large label tag-abdyek">{this.props.text}</a>
            )
        }
        return (
            <a className={"ui "+this.props.color+" large label tag-abdyek"}>{this.props.text}
                <div className="detail">{this.props.rateValue}</div> 
            </a>
        )
    }
}

class Tags extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        this.tags = []
        for(let i=0;i<this.props.tags.length;i++) {
            if(this.props.activeOnly && this.props.tags[i].passive) {
                continue;
            }
            this.tags.push(
                <Tag key={this.props.tags[i].id}
                    passive={this.props.tags[i].passive}
                    text={this.props.tags[i].text}
                    color={this.props.tags[i].color}
                    rateValue={this.props.tags[i].rateValue}
                />
            )
        }
        return(
            <div>
                <div>
                    {this.tags}
                </div>
            </div>
        )
    }
}