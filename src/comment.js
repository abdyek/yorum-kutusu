class Comment extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            reportArea: false
        };
        this.openReportArea = this.openReportArea.bind(this);;
        this.closeReportArea = this.closeReportArea.bind(this);;
    }
    openReportArea() {
        this.setState({
            reportArea: true
        });
    }
    closeReportArea() {
        this.setState({
            reportArea: false
        })
    }
    render() {
        if(!this.state.reportArea) {
            return(
                <div>
                    <Row size="one">
                        <Column>
                            <Segment>
                                <TopOfComment text={this.props.text} title={this.props.title} owner={this.props.owner}/>
                                <BottomOfComment likeCount={this.props.likeCount} liked={this.props.liked} date={this.props.date} handleOpenReportArea={this.openReportArea} handleCloseReportArea={this.closeReportArea} tags={this.props.tags}/>
                            </Segment>
                        </Column>
                    </Row>
                </div>
            )
        } else {
            return (
                <ReportArea handleCloseReportArea={this.closeReportArea}/>
            )
        }
    }
}

class TopOfComment extends React.Component{
    render() {
        return (
            <div>
                <Row size="two" nonStackable={true}>
                    <Column>
                        <div className="user-name">
                            <H type="3" text={this.props.title} />
                        </div>
                    </Column>
                    <Column>
                        <FloatRight>
                            {(this.props.owner)?
                                <div>
                                    <button className="ui icon teal button">
                                            <i className="icon">
                                                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                        </i>
                                        Düzenle
                                    </button>
                                    <button className="ui icon orange button">
                                        <i className="icon">
                                            <i className="fa fa-trash" aria-hidden="true"></i>
                                        </i>
                                        Sil
                                    </button>
                                </div>
                                :""
                            }
                        </FloatRight>
                    </Column>
                </Row>
                <Row size="one">
                    <Column>
                        <div className="comment-text">
                            {this.props.text}
                        </div>
                    </Column>
                </Row>
            </div>
        )
    }
}

class BottomOfComment extends React.Component {
    render() {
        return(
            <div>
                <Row size="one">
                    <Column>
                        <Center>
                            <Tags tags={this.props.tags} activeOnly={true}/>
                        </Center>
                    </Column>
                </Row>
                <Row size="one">
                    <Column>
                        <FloatRight>
                            <div className="comment-date">
                                {this.props.date}
                            </div>
                        </FloatRight>
                    </Column>
                </Row>
                <Row size="one" nonStackable={true}>
                    <Column>
                        <FloatRight>
                            <div>
                                <LikeButton likeCount={this.props.likeCount} liked={this.props.liked}/>
                                <ReportButton handleOpenReportArea={this.props.handleOpenReportArea}/>
                            </div>
                        </FloatRight>
                    </Column>
                </Row>
            </div>
        )
    }
}

class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            liked:this.props.liked,
            likeCount: this.props.likeCount
        };
        this.like = this.like.bind(this);
    }
    like() {
        let likeCount = this.state.likeCount;
        if(this.state.liked) {
            likeCount--;
            this.setState({
                liked:false,
                likeCount: likeCount
            });
        } else {
            likeCount++;
            this.setState({
                liked:true,
                likeCount: likeCount
            });
        }
    }
    render() {
        this.buttonClass = (this.state.liked)? "ui blue button": "ui button";
        return(
            <button className={this.buttonClass} onClick={this.like}>
                <i className="icon">
                    <i className="fa fa-thumbs-up" aria-hidden="true"></i>
                </i>
                {this.state.likeCount}
            </button>
        )
    }
}

class ReportButton extends React.Component {
    constructor(props){
        super(props);
        this.openReportArea = this.openReportArea.bind(this);
    }
    openReportArea() {
        this.props.handleOpenReportArea();
    }
    render() {
        return (
            <button className="ui icon button" onClick={this.openReportArea}>
                <i className="icon">
                    <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
                </i>
            </button>
        )
    }
}

class ReportArea extends React.Component {
    constructor(props) {
        super(props);
        this.limitOfReportText = 200;
        this.state = {
            // normal, loading, reported
            form:"normal",
            messageType:"success",  // success, warning, danger
            messageText:"",
            selectOptionWarning:false,
            reason:0,
            reportText: '',
            reportTextSize:0,
            reportTextLimitWarning: false
        };
        this.closeReportArea = this.closeReportArea.bind(this);
        this.sendReport = this.sendReport.bind(this);
        this.changeReason = this.changeReason.bind(this);
        this.changeTextarea = this.changeTextarea.bind(this);
    }
    closeReportArea() {
        this.props.handleCloseReportArea();
    }
    sendReport() {
        if(this.state.reason==0) {
            this.setState({
                selectOptionWarning:true
            });
        } else {
            this.setState({
                form:"loading"
            });
        }
        // burada API'ye gönderme şeyleri de olacak
    }
    changeReason(e) {
        this.setState({
            reason:e.target.value
        });
        if(e.target.value) {
            this.setState({
                selectOptionWarning: false
            })
        }
    }
    changeTextarea(e) {
        this.setState({
            reportText:e.target.value,
            reportTextSize: e.target.value.length
        })
        if(e.target.value.length>this.limitOfReportText) {
            this.setState({
                reportTextLimitWarning: true
            })
        } else {
            this.setState({
                reportTextLimitWarning: false
            })
        }
    }
    render() {
        if(this.state.form=="normal") {
            return(
                <div>
                    <Row size="one">
                        <Column>
                            <RaisedSegment>
                                <Row size="two" nonStackable={true}>
                                    <Column>
                                        <H type="3" text="Geri Bildirim" />
                                    </Column>
                                    <Column>
                                        <FloatRight>
                                            <button className="ui icon red button" onClick={this.closeReportArea}>
                                                <i className="icon">
                                                    <i className="fa fa-times" aria-hidden="true"></i>
                                                </i>
                                            </button>
                                        </FloatRight>
                                    </Column>
                                </Row>
                                <Row size="one">
                                    <Column>
                                        <div className="ui yellow message">
                                            <div className="header">
                                                Bu yorum hakkında geri bildirimde bulunuyorsunuz.
                                            </div>
                                            <p>
                                                Bildirimin asılsız olması durumunda size olan güvenimizin azalacağını unutmayın.
                                            </p>
                                        </div>
                                    </Column>
                                </Row>
                                <Row size="one">
                                    <Column>
                                        <ReportReason handleChangeReason={this.changeReason} reasons={[
                                            {
                                                key:0,
                                                value: " -- Lütfen birini seçin -- "
                                            },
                                            {
                                                key:1,
                                                value: "Hakaret"
                                            },
                                            {
                                                key:2,
                                                value: "Siyasi içerik"
                                            },
                                            {
                                                key:3,
                                                value: "Uygunsuz Kullanıcı Adı"
                                            }, 
                                        ]} />
                                    </Column>
                                </Row>
                                {this.state.selectOptionWarning ?
                                    <BasicMessage messageType="warning" text="'Neden' boş bırakılamaz!"/>
                                : ''}
                                <Row size="one">
                                    <Column>
                                        <div className="ui form">
                                            <div className="field">
                                                <label>Açıklama</label>
                                                <textarea rows="2" onChange={this.changeTextarea} value={this.state.reportText}></textarea>
                                            </div>
                                        </div> 
                                    </Column>
                                </Row>
                                {this.state.reportTextLimitWarning ?
                                    <BasicMessage messageType="warning" text="Açıklama bu kadar uzun olamaz!"/>
                                : ''}
                                <Row size="one">
                                    <Column>
                                        <FloatRight>
                                            <div>
                                                <span className="report-text-count ">
                                                    {this.state.reportTextSize}/200
                                                </span>
                                                <button className={this.state.reportTextLimitWarning ? "ui blue disabled button" : "ui blue button"} onClick={this.sendReport}>Gönder</button>
                                            </div>
                                        </FloatRight>
                                    </Column>
                                </Row>
                            </RaisedSegment>
                        </Column>
                    </Row>
                </div>
            )
        } else if(this.state.form=="loading") {
            return(
                <div>
                    <RowLoadingSpin />
                </div>
            )
        } else if(this.state.form=="reported") {
            return(
                <Reported messageType={this.state.messageType} text={this.state.messageText}/>
            )
        }
    }
}

class ReportReason extends React.Component {
    constructor(props) {
        super(props);
        this.changeReason = this.changeReason.bind(this);
    }
    changeReason(e) {
        this.props.handleChangeReason(e);
    }
    render() {
        const options = [];
        for(let i=0;i<this.props.reasons.length;i++) {
            options.push(<option value={i} key={this.props.reasons[i].key}>{this.props.reasons[i].value}</option>)
        }
        return(
            <div>
                <div className="ui form">
                    <div className="field">
                        <label>Neden</label>
                        <select onChange={this.changeReason}>
                            {options}
                        </select>
                    </div>
                </div>
            </div>
        )
    }
}

class Reported extends React.Component {
    render() {
        return(
            <div>
                <Row size="one">
                    <Column>
                        <RaisedSegment>
                            <Row size="one">
                                <Column>
                                    <BasicMessage messageType={this.props.messageType} text={this.props.text}/>
                                </Column>
                            </Row>
                        </RaisedSegment>
                    </Column>
                </Row>
            </div>
        )
    }
}