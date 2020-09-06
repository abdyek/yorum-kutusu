class Tag extends React.Component {
    constructor(props){
        super(props);
    }
    onClick() {
        this.props.handleOnClick();
    }
    render() {
        if(this.props.passive) {
            return (
                <a className="ui large label tag-abdyek">{this.props.text}</a>
            )
        }
        return (
            <a name={this.props.id} className={"ui "+this.props.color+" large label tag-abdyek"} onClick={this.props.handleOnClick}>{this.props.text}
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
                    id={keyArr[i]} // Tag'ın içerisinde this.props.key olarak erişmeye izin vermediği için bu şekilde göndermem gerekti
                    passive={this.props.tags[keyArr[i]].passive}
                    text={this.props.tags[keyArr[i]].text}
                    color={this.props.tags[keyArr[i]].color}
                    rateValue={this.props.tags[keyArr[i]].rateValue}
                    handleOnClick={this.props.handleOnClick}
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