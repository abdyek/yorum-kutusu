class PageNavigation extends React.Component {
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
                        <button className="ui blue icon button">
                            <i className="icon">
                                <i class="fa fa-line-chart" aria-hidden="true"></i>
                            </i>
                        </button>
                        <button className="ui icon button">
                            <i className="icon">
                                <i class="fa fa-clock-o" aria-hidden="true"></i>
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