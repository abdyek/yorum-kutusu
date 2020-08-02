class Comment extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            // normal, report, edit, delete, message, loading
            form:"normal",
            topMessage: this.props.topMessage,
            message: this.props.message
        };
        this.openReportArea = this.openReportArea.bind(this);
        this.closeReportArea = this.closeReportArea.bind(this);
        this.openEditArea = this.openEditArea.bind(this);
        this.closeEditArea = this.closeEditArea.bind(this);
        this.openDeleteArea = this.openDeleteArea.bind(this);
        this.closeDeleteArea = this.closeDeleteArea.bind(this);
        this.confirmDelete = this.confirmDelete.bind(this);
    }
    openReportArea() {
        this.setState({
            form: "report"
        });
    }
    closeReportArea() {
        this.setState({
            form: "normal"
        });
    }
    openEditArea() {
        this.setState({
            form:"edit",
            topMessage: null
        });
    }
    closeEditArea() {
        this.setState({
            form:"normal"
        });
    }
    openDeleteArea() {
        this.setState({
            form:"delete",
            topMessage: null
        });
    }
    closeDeleteArea() {
        this.setState({
            form:"normal"
        });
    }
    confirmDelete() {
        this.setState({
            form:"loading"
        });
        setTimeout(function(){
            this.setState({
                form:"message",
                message: {
                    messageType: "success",
                    messageText: "Başarılı bir şekilde yorumunuz kaldırıldı"
                }
            })
        }.bind(this),1000)
    }
    render() {
        if(this.state.form=="normal") {
            return(
                <div>
                    {(this.state.topMessage)? 
                        <Row size="one">
                            <Column>
                                <BasicMessage type={this.state.topMessage.type} text={this.state.topMessage.text} />
                            </Column>
                        </Row>
                    :""}
                    <Row size="one">
                        <Column>
                            <RaisedSegment>
                                <TopOfComment text={this.props.text} title={this.props.title} owner={this.props.owner} handleOpenEditArea={this.openEditArea} handleOpenDeleteArea={this.openDeleteArea} />
                                <BottomOfComment likeCount={this.props.likeCount} liked={this.props.liked} date={this.props.date} handleOpenReportArea={this.openReportArea} handleCloseReportArea={this.closeReportArea} tags={this.props.tags} owner={this.props.owner} />
                            </RaisedSegment>
                        </Column>
                    </Row>
                </div>
            )
        } else if(this.state.form=="report") {
            return(
                <ReportArea handleCloseReportArea={this.closeReportArea}/>
            )
        } else if(this.state.form=="edit") {
            return(
                <EditArea tags={this.props.tags} handleCancelButton={this.closeEditArea} commentText={this.props.text} owner={this.props.owner} />
            )
        } else if(this.state.form=="delete") {
            return(
                <DeleteArea handleCancelButton={this.closeDeleteArea} handleConfirmButton={this.confirmDelete}/>
            )
        } else if(this.state.form=="message") {
            return(
                <Row size="one">
                    <Column>
                        <BasicMessage type={this.state.message.messageType} text={this.state.message.messageText} />
                    </Column>
                </Row>
            )
        } else if(this.state.form=="loading") {
            return(
                <RowLoadingSpin />
            )
        }
    }
}

class TopOfComment extends React.Component{
    constructor(props) {
        super(props);
        this.openEditArea = this.openEditArea.bind(this);
        this.openDeleteArea = this.openDeleteArea.bind(this);
    }
    openEditArea() {
        this.props.handleOpenEditArea();
    }
    openDeleteArea() {
        this.props.handleOpenDeleteArea();
    }
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
                                    <button className="ui icon teal button" onClick={this.openEditArea}>
                                            <i className="icon">
                                                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                        </i>
                                        Düzenle
                                    </button>
                                    <button className="ui icon orange button" onClick={this.openDeleteArea}>
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
                        <Tags tags={this.props.tags} activeOnly={true}/>
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
                                <ReportButton handleOpenReportArea={this.props.handleOpenReportArea} disabled={this.props.owner}/>
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
        this.buttonClass = (this.props.disabled)?"ui icon disabled button":"ui icon button";
    }
    openReportArea() {
        this.props.handleOpenReportArea();
    }
    render() {
        return (
            <button className={this.buttonClass} onClick={this.openReportArea}>
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
                                            <CancelButton handleCancelButton={this.closeReportArea} />
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
                                    <BasicMessage type="warning" text="'Neden' boş bırakılamaz!"/>
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
                                    <BasicMessage type="warning" text="Açıklama bu kadar uzun olamaz!"/>
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
                                    <BasicMessage type={this.props.messageType} text={this.props.text}/>
                                </Column>
                            </Row>
                        </RaisedSegment>
                    </Column>
                </Row>
            </div>
        )
    }
}

class WriteComment extends React.Component {
    constructor(props) {
        super(props);
        if(this.props.forEdit) {
            this.var = {
                title: "Yorum Düzenle",
                buttonName: "Düzenle",
                buttonClassName: "ui green button"
            };
        } else {
            this.var = {
                title: "Yorum Yaz",
                buttonName: "Gönder",
                buttonClassName: "ui green disabled button"
            };
        }
        this.state = {
            // normal, loading, sent, edited
            form:"normal",
            messageType:"success",  // success, warning, danger
            messageText:"mahmutcan",
            message: null,
            commentText:this.props.commentText,
            sendButtonClassName: this.var.buttonClassName,
            topMessage: null
        };
        this.sendComment = this.sendComment.bind(this);
        this.changeComment = this.changeComment.bind(this);
    }
    sendComment() {
        //this.setState({
            //form:"loading"
        //});
        // gerekli API işlemleri buraya yapılacak
        // yorum düzenleme de buradan gönderileceği için, düzenleme mi yoksa yeni yorum gönderme mi kontrolleri burada yaparım
        //if(this.props.forEdit) {
            // başarılı olması durumunda edited 'e çeviricez
            //setTimeout(function() {
                //this.setState({
                    //form:"edited"
                //})
            //}.bind(this), 1000);
        //}
        // başarısız olma durumunda kullanılabilecek bir üst mesaj
        this.setState({
            topMessage: {
                type:"warning",
                text:"bir sorun oldu"
            }
        });
        /*
        this.setState({
            form:"sent",
            message: {
                type:"warning",
                text:"hata hata!!"
            }
        });
        */
    }
    changeComment(e) {
        if(!e.target.value.length) {
            this.setState({
                sendButtonClassName:"ui green disabled button",
            })
        } else {
            this.setState({
                sendButtonClassName:"ui green button",
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
                        {(this.state.topMessage)?
                            <Row size="one">
                                <Column>
                                    <BasicMessage type={this.state.topMessage.type} text={this.state.topMessage.text} />
                                </Column>
                            </Row>
                        :""}
                        <RaisedSegment>
                            <Row size="two" nonStackable={true}>
                                <Column>
                                    <H type="4" text={this.var.title} />
                                </Column>
                                <Column>
                                    {
                                        (this.props.forEdit)?
                                            <FloatRight>
                                                <CancelButton handleCancelButton={this.props.handleCancelButton}/>
                                            </FloatRight>
                                        :""
                                    }
                                </Column>
                            </Row>
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
                                    <Rating tags={this.props.tags} forEdit={this.props.forEdit}/>
                                </Column>
                            </Row>
                            <Row size="one">
                                <Column>
                                    <FloatRight>
                                        <button className={this.state.sendButtonClassName} onClick={this.sendComment}>
                                            {this.var.buttonName}
                                        </button>
                                    </FloatRight>
                                </Column>
                            </Row>
                        </RaisedSegment>
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
                        <BasicMessage type={this.state.message.type} text={this.state.message.text} />
                    </Column>
                </Row>
            )
        } else if(this.state.form=="edited") {
            return(
                // bu kısım başarılı olması durumunda gösterilecek
                // API ile konuşturan yunus emre'ye not: buradaki Comment componentinin özelliklerini WriteComment'in state'i üzerinde tuttuğun API reponse'u değerleri
                // üzerinden dolduracaksın
                <Comment text="

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus condimentum elementum est, eget condimentum purus venenatis id. Aliquam ultrices lacinia lacus vitae congue. Fusce id elit sapien. Etiam velit diam, hendrerit vitae tincidunt vel, tempor sed leo. Quisque iaculis dolor non ultrices suscipit. Donec consectetur, lorem vel molestie blandit, mi mi sagittis nisl, ac pretium nibh nulla ut odio. Proin vitae auctor dolor, vitae ultricies lectus. Fusce a lectus sodales, tincidunt libero imperdiet, vulputate est. Vestibulum euismod, ante at malesuada finibus, quam urna aliquam leo, at tristique orci nunc sit amet tellus. Donec nibh tellus, suscipit ac euismod nec, scelerisque sed dui. Aliquam pellentesque tincidunt felis et sollicitudin. Quisque molestie consequat tellus, commodo pharetra lacus.

Etiam scelerisque dui non leo feugiat, ut ornare nibh accumsan. Cras eget ex cursus, tristique dolor non, molestie libero. Duis dolor felis, hendrerit eu ligula ut, iaculis semper mi. Maecenas venenatis quis turpis nec sodales. Duis consequat nulla sed efficitur consequat. Integer suscipit blandit mollis. Proin posuere, lacus sed posuere lacinia, tortor est tristique augue, sed consectetur augue eros et augue. Quisque mauris diam, rhoncus sed vulputate quis, gravida in massa.

Praesent purus leo, porta in elit ut, porta blandit risus. Integer ipsum dolor, luctus sed tincidunt ac, ullamcorper ornare libero. Curabitur porta arcu elit, sit amet varius orci rutrum vitae. Pellentesque luctus dolor tortor. Nulla fringilla odio massa, vitae laoreet felis fringilla in. Vestibulum maximus condimentum velit vel ultrices. Maecenas commodo, lorem et mollis maximus, felis elit tempus arcu, a volutpat ex justo eu urna. Sed aliquet semper feugiat. Ut ornare ipsum at posuere faucibus.

Nullam vitae massa blandit, tristique lectus in, volutpat dolor. Curabitur non nisi et erat maximus eleifend vitae quis dui. Cras at ultrices nulla. Maecenas viverra dapibus tortor, ac commodo risus finibus ac. Nullam ultrices tortor nec posuere luctus. Vivamus viverra, tellus suscipit dignissim euismod, tellus dolor pulvinar tellus, vitae placerat libero enim aliquet libero. Aenean gravida sem at odio dapibus, quis aliquet sem malesuada. Vestibulum dictum metus ac orci mattis egestas. Suspendisse vel auctor elit, et suscipit nulla. Aliquam feugiat neque nisl, ac convallis metus dignissim non. Morbi dapibus vitae est sed egestas. Integer laoreet ac elit vitae facilisis. Quisque fermentum ipsum eu sagittis mattis. Duis pellentesque ante quis aliquam volutpat. Proin eget arcu quis orci sagittis fringilla. Cras elementum tempus quam.

Nulla non mollis risus. Fusce cursus quam nec est suscipit accumsan. Sed sit amet nisi lacus. Etiam a libero in nisi vehicula efficitur. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas in velit vitae eros consequat feugiat. Sed vitae sapien et turpis egestas tempor sit amet vel purus. Duis non arcu dolor. Nam eget accumsan elit, sit amet ultrices nunc. Proin eget lacinia nunc. Sed tortor ex, vehicula ut interdum nec, aliquam eget risus. Phasellus ligula lorem, dapibus quis diam in, iaculis volutpat orci. Nulla facilisi. In dignissim viverra elit sit amet accumsan. "
                    likeCount="145"
                    liked={false}
                    title="Mahmut"
                    date="19 Temmuz - 21:45"
                    tags={[{
                            id:3,
                            passive:false,
                            text:"Batarya",
                            color:"yellow",
                            rateValue: "5"
                        },
                        {
                            id:4,
                            passive:false,
                            text:"Kamera",
                            color:"orange",
                            rateValue: "4"
                        },
                        {
                            id:5,
                            passive:false,
                            text:"Tasarım",
                            color:"",
                            rateValue: "-"
                        }
                        ]
                    }
                    owner={true}
                    topMessage={{
                        type: "success",
                        text: "Yorumunuz başarılı bir şekilde düzenlendi"
                    }}
                />
            )
        }
    }
}

class Rating extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        this.ratingLines = [];
        let keyArr = Object.keys(this.props.tags);
        for(let i=0;i<keyArr.length;i++) {
            if(!this.props.tags[keyArr[i]].passive) {
                this.ratingLines.push(
                    <RatingLine key={keyArr[i]} tagKey={this.props.tags[keyArr[i]].id} tagName={this.props.tags[keyArr[i]].text} forEdit={this.props.forEdit} rateValue={this.props.tags[keyArr[i]].rateValue}/>
                )
            }
        }
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
        this.rateValue = (this.props.forEdit)? this.props.rateValue:"-";
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
        this.state = {
            rateValue: this.rateValue,
            color: this.colors[this.rateValue]
        };
        this.selectOption = this.selectOption.bind(this);
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

class EditArea extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                <WriteComment tags={this.props.tags} forEdit={true} commentText={this.props.commentText} handleCancelButton={this.props.handleCancelButton} />
            </div>
        )
    }
}

class DeleteArea extends React.Component {
    constructor(props) {
        super(props);
        this.cancelFunc = this.cancelFunc.bind(this);
        this.confirmFunc = this.confirmFunc.bind(this);
    }
    confirmFunc() {
        this.props.handleConfirmButton();
    }
    cancelFunc() {
        this.props.handleCancelButton();
    }
    render() {
        return(
            <Row size="one">
                <Column>
                    <RaisedSegment>
                        <Row size="one">
                            <Column>
                                <BasicMessage type="danger" text="Bu yorumu kalıcı olarak silmek istediğinizden emin misiniz?" />
                            </Column>
                        </Row>
                        <Row size="two" nonStackable={true}>
                            <Column>
                                <FloatRight>
                                    <button className="ui green button" onClick={this.confirmFunc}>
                                        Evet
                                    </button>
                                </FloatRight>
                            </Column>
                            <Column>
                                <button className="ui red button" onClick={this.cancelFunc}>
                                    Hayır
                                </button>
                            </Column>
                        </Row>
                    </RaisedSegment>
                </Column>
            </Row>
        )
    }
}
