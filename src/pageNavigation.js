class PageNavigation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sort: this.props.sortBy
		}
		this.sortByLike = this.sortByLike.bind(this);
		this.sortByTime = this.sortByTime.bind(this);
	}
	sortByLike() {
		this.props.handleChangeSortBy("like");
	}
	sortByTime() {
		this.props.handleChangeSortBy("time");
	}
    render() {
        return(
            <div>
                <Row size="three" nonStackable={true}>
                    <Column>
                    </Column>
                    <Column>
                        <Center>
                        </Center>
                    </Column>
                    <Column>
                        <FloatRight>
                        </FloatRight>
                    </Column>
                </Row>
                <Row size="one">
                    <Column>
                        <button className={(this.props.sortBy=="like")?"ui blue icon button":"ui icon button"} onClick={this.sortByLike}>
                            <i className="icon">
								<i className="fa fa-thumbs-up" aria-hidden="true"></i>
                            </i>
                        </button>
                        <button className={(this.props.sortBy=="time")?"ui blue icon button":"ui icon button"} onClick={this.sortByTime}>
                            <i className="icon">
                               <i className="fa fa-clock-o" aria-hidden="true"></i>
                            </i>
                        </button>
                        <FloatRight>
                            <button className="ui icon button">
                                <i className="icon">
                                    <i className="fa fa-angle-left" aria-hidden="true"></i>
                                </i>
                            </button>
                            <div className="ui form">
                                <div className="field">
                                    <select>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                                </div>
                            </div>
                            <button className="ui icon button" style={{"marginLeft": "0.25em"}}>
                                <i className="icon">
                                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                                </i>
                            </button>
                        </FloatRight>
                    </Column>
                </Row>
            </div>
        )
    }
}
