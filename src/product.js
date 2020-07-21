class Content extends React.Component {
    constructor(props) {
        super(props);
        this.tagsInfo = [
            {
                id:0,
                passive:true,
                text:"Akıllı Telefon",
            },
            {
                id:1,
                passive:true,
                text:"Apple"
            },
            {
                id:2,
                passive:true,
                text:"Ipone"
            },
            {
                id:3,
                passive:false,
                text:"Batarya",
                color:"yellow",
                rateValue: "5.5"
            },
            {
                id:4,
                passive:false,
                text:"Kamera",
                color:"orange",
                rateValue: "4.2"
            },
            {
                id:5,
                passive:false,
                text:"Ekran",
                color:"green",
                rateValue: "9.3"
            },
        ];
    }
    render() {
        return(
            <div>
                <Product tags={this.tagsInfo}/>
                <Comments />
                <WriteComment tags={this.tagsInfo}/>
            </div>
        )
    }
}

class Product extends React.Component {
    render() {
        return (
            <div>
                <Row size="one">
                    <Column>
                        <Tags tags={this.props.tags}/>
                    </Column>
                </Row>
                <Row size="one">
                    <Column>
                        <H type="1" text="Iphone 5s" />
                    </Column>
                </Row>
            </div>
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
                <Center>
                    {this.tags}
                </Center>
            </div>
        )
    }
}

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

class Comments extends React.Component {
    render() {
        return (
            <div>
                <Comment text="

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus condimentum elementum est, eget condimentum purus venenatis id. Aliquam ultrices lacinia lacus vitae congue. Fusce id elit sapien. Etiam velit diam, hendrerit vitae tincidunt vel, tempor sed leo. Quisque iaculis dolor non ultrices suscipit. Donec consectetur, lorem vel molestie blandit, mi mi sagittis nisl, ac pretium nibh nulla ut odio. Proin vitae auctor dolor, vitae ultricies lectus. Fusce a lectus sodales, tincidunt libero imperdiet, vulputate est. Vestibulum euismod, ante at malesuada finibus, quam urna aliquam leo, at tristique orci nunc sit amet tellus. Donec nibh tellus, suscipit ac euismod nec, scelerisque sed dui. Aliquam pellentesque tincidunt felis et sollicitudin. Quisque molestie consequat tellus, commodo pharetra lacus.

Etiam scelerisque dui non leo feugiat, ut ornare nibh accumsan. Cras eget ex cursus, tristique dolor non, molestie libero. Duis dolor felis, hendrerit eu ligula ut, iaculis semper mi. Maecenas venenatis quis turpis nec sodales. Duis consequat nulla sed efficitur consequat. Integer suscipit blandit mollis. Proin posuere, lacus sed posuere lacinia, tortor est tristique augue, sed consectetur augue eros et augue. Quisque mauris diam, rhoncus sed vulputate quis, gravida in massa.

Praesent purus leo, porta in elit ut, porta blandit risus. Integer ipsum dolor, luctus sed tincidunt ac, ullamcorper ornare libero. Curabitur porta arcu elit, sit amet varius orci rutrum vitae. Pellentesque luctus dolor tortor. Nulla fringilla odio massa, vitae laoreet felis fringilla in. Vestibulum maximus condimentum velit vel ultrices. Maecenas commodo, lorem et mollis maximus, felis elit tempus arcu, a volutpat ex justo eu urna. Sed aliquet semper feugiat. Ut ornare ipsum at posuere faucibus.

Nullam vitae massa blandit, tristique lectus in, volutpat dolor. Curabitur non nisi et erat maximus eleifend vitae quis dui. Cras at ultrices nulla. Maecenas viverra dapibus tortor, ac commodo risus finibus ac. Nullam ultrices tortor nec posuere luctus. Vivamus viverra, tellus suscipit dignissim euismod, tellus dolor pulvinar tellus, vitae placerat libero enim aliquet libero. Aenean gravida sem at odio dapibus, quis aliquet sem malesuada. Vestibulum dictum metus ac orci mattis egestas. Suspendisse vel auctor elit, et suscipit nulla. Aliquam feugiat neque nisl, ac convallis metus dignissim non. Morbi dapibus vitae est sed egestas. Integer laoreet ac elit vitae facilisis. Quisque fermentum ipsum eu sagittis mattis. Duis pellentesque ante quis aliquam volutpat. Proin eget arcu quis orci sagittis fringilla. Cras elementum tempus quam.

Nulla non mollis risus. Fusce cursus quam nec est suscipit accumsan. Sed sit amet nisi lacus. Etiam a libero in nisi vehicula efficitur. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas in velit vitae eros consequat feugiat. Sed vitae sapien et turpis egestas tempor sit amet vel purus. Duis non arcu dolor. Nam eget accumsan elit, sit amet ultrices nunc. Proin eget lacinia nunc. Sed tortor ex, vehicula ut interdum nec, aliquam eget risus. Phasellus ligula lorem, dapibus quis diam in, iaculis volutpat orci. Nulla facilisi. In dignissim viverra elit sit amet accumsan. "
                    likeCount="145"
                    liked={false}
                    userName="Mahmut"
                    date="19 Temmuz - 21:45"
                />
                <Comment text="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
                    likeCount="13"
                    liked={false}
                    userName="abdyek"
                    date="13 Temmuz - 08:12"
                />
                <Comment text="bu çok hoş bir yorumcuk"
                    likeCount="99"
                    liked={false}
                    userName="at hırsızı 12"
                    date="02 Haziran - 13:51"
                />
                <Comment text="yorumsuz"
                    likeCount="103"
                    liked={true}
                    userName="liseli_detected91"
                    date="21 Ocak - 17:29"
                />
                <Comment text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                    likeCount="0"
                    liked={false}
                    userName="crazy_mahmut"
                    date="14 Aralık 2019- 18:49"
                />
            </div>
        )
    }
}

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
                                <TopOfComment text={this.props.text} userName={this.props.userName}/>
                                <BottomOfComment likeCount={this.props.likeCount} liked={this.props.liked} date={this.props.date} handleOpenReportArea={this.openReportArea} handleCloseReportArea={this.closeReportArea}/>
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
                <Row size="one">
                    <Column>
                        <div className="user-name">
                            <H type="3" text={this.props.userName} />
                        </div>
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
                            <Segment>
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
                            </Segment>
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
                        <Segment>
                            <Row size="one">
                                <Column>
                                    <BasicMessage messageType={this.props.messageType} text={this.props.text}/>
                                </Column>
                            </Row>
                        </Segment>
                    </Column>
                </Row>
            </div>
        )
    }
}

class WriteComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // normal, loading, sent
            form:"normal",
            messageType:"success",  // success, warning, danger
            messageText:"mahmutcan",
            commentText:"",
            sendButtonDisabled: true,
            sendButtonClassName: "ui green disabled button"
        };
        this.sendComment = this.sendComment.bind(this);
        this.changeComment = this.changeComment.bind(this);
    }
    sendComment() {
        this.setState({
            form:"loading"
        });
        // gerekli API işlemleri buraya yapılacak
    }
    changeComment(e) {
        if(!e.target.value.length) {
            this.setState({
                sendButtonClassName:"ui green disabled button",
                sendButtonDisabled: true
            })
        } else {
            this.setState({
                sendButtonClassName:"ui green button",
                sendButtonDisabled: false
            })
        }
        this.setState({
            commentText: e.target.value
        });
    }
    render() {
        if(this.state.form=="normal") {
            return(
                <Row size="one">
                    <Column>
                        <Segment>
                            <H type="4" text="Yorum Yaz" />
                            <Row size="one">
                                <Column>
                                <div className="ui form">
                                    <div className="field">
                                        <label>Yorumunuz</label>
                                        <textarea value={this.state.commentText} onChange={this.changeComment}></textarea>
                                    </div>
                                </div>
                                </Column>
                            </Row>
                            <Row size="one">
                                <Column>
                                    <Rating tags={this.props.tags}/>
                                </Column>
                            </Row>
                            <Row size="one">
                                <Column>
                                    <FloatRight>
                                        <button className={this.state.sendButtonClassName} onClick={this.sendComment}>
                                            Gönder
                                        </button>
                                    </FloatRight>
                                </Column>
                            </Row>
                        </Segment>
                    </Column>
                </Row>
            )
        } else if(this.state.form=="loading") {
            return(
                <RowLoadingSpin />
            )
        } else if(this.state.form=="sent") {
            return (
                <Row size="one">
                    <Column>
                        <BasicMessage messageType={this.state.messageType} text={this.state.messageText} />
                    </Column>
                </Row>
            )
        }
    }
}

class Rating extends React.Component {
    constructor(props){
        super(props);
        this.ratingLines = [];
        for(let i=0;i<this.props.tags.length;i++) {
            if(!this.props.tags[i].passive) {
                this.ratingLines.push(
                    <RatingLine key={this.props.tags[i].id} tagKey={this.props.tags[i].id} tagName={this.props.tags[i].text} />
                )
            }
        }
    }
    render() {
        return(
            <Row size="sixteen">
                <WideColumn size="two">
                </WideColumn>
                <WideColumn size="twelve">
                    { this.ratingLines }
                </WideColumn>
            </Row>
        )
    }
}

class RatingLine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rateValue: "-",
            color: ""
        };
        this.selectOption = this.selectOption.bind(this);
        this.colors = {
            "-": "",
            1: "red",
            2: "red",
            3: "orange",
            4: "orange",
            5: "yellow",
            6: "yellow",
            7: "teal",
            8: "teal",
            9: "blue",
            10: "blue"
        };
    }
    selectOption(e) {
        this.setState({
            rateValue: e.target.value,
            color:this.colors[e.target.value]
        });
    }
    render() {
        return(
            <Row size="one">
                <Column>
                    <Row size="two">
                        <Column>
                            <Center>
                                <Tag key={this.props.tagKey} passive={false} text={this.props.tagName} color={this.state.color} rateValue={this.state.rateValue}/>
                            </Center>
                        </Column>
                        <Column>
                            <Center>
                                <div className="ui form">
                                    <div className="field">
                                        <select onChange={this.selectOption}>
                                            <option value="-">Seçilmemiş</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                        </select>
                                    </div>
                                </div>
                            </Center>
                        </Column>
                    </Row>
                </Column>
            </Row>
        )
    }
}
