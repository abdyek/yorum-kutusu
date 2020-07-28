class PageNavigation extends React.Component {
	constructor(props) {
        super(props);
        this.state={
            currentPage:this.props.currentPage
        };
		this.sortByLike = this.sortByLike.bind(this);
        this.sortByTime = this.sortByTime.bind(this);
        this.selectOption = this.selectOption.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
	}
	sortByLike() {
		this.props.handleChangeSortBy("like");
	}
	sortByTime() {
		this.props.handleChangeSortBy("time");
    }
    selectOption(e) {
        let value = (typeof e=="object")? e.target.value: e;
        this.props.handleChangePageNumber(value);
        this.setState({
            currentPage:value
        });
    }
    nextPage() {
        if(this.state.currentPage<this.props.pageCount) {
            this.selectOption(parseInt(this.state.currentPage)+1);
        }
    }
    prevPage() {
        if(this.state.currentPage>1) {
            this.selectOption(parseInt(this.state.currentPage)-1);
        }
    }
    render() {
        this.options = [];
        for(let i=1;i<=this.props.pageCount;i++) {
            this.options.push(
                <option key={i} value={i}>{i}</option>
            )
        }
        return(
            <div>
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
                            <button className="ui icon button" onClick={this.prevPage}>
                                <i className="icon">
                                    <i className="fa fa-angle-left" aria-hidden="true"></i>
                                </i>
                            </button>
                            <div className="ui form">
                                <div className="field">
                                    <select onChange={this.selectOption} value={this.state.currentPage}>
                                        {this.options}
                                    </select>
                                </div>
                            </div>
                            <button className="ui icon button" style={{"marginLeft": "0.25em"}} onClick={this.nextPage} >
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
