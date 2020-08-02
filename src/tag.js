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
        let keyArr = Object.keys(this.props.tags);
        for(let i=0;i<keyArr.length;i++) {
            this.tags.push(
                <Tag key={keyArr[i]}
                    passive={this.props.tags[keyArr[i]].passive}
                    text={this.props.tags[keyArr[i]].text}
                    color={this.props.tags[keyArr[i]].color}
                    rateValue={this.props.tags[keyArr[i]].rateValue}
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