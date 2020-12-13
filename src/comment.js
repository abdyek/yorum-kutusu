class Comment extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            // normal, report, edit, delete, message, loading
            form:"normal",
            topMessage: this.props.topMessage,
            message: this.props.message,
            likeCount:this.props.likeCount,
            liked:this.props.liked,
            likeButtonDisabled:false
        };
        this.likeToggle = this.likeToggle.bind(this);
        this.openReportArea = this.openReportArea.bind(this);
        this.closeReportArea = this.closeReportArea.bind(this);
        this.openEditArea = this.openEditArea.bind(this);
        this.closeEditArea = this.closeEditArea.bind(this);
        this.openDeleteArea = this.openDeleteArea.bind(this);
        this.closeDeleteArea = this.closeDeleteArea.bind(this);
        this.confirmDelete = this.confirmDelete.bind(this);
    }
    likeToggle() {
        this.make = (this.state.liked)?false:true;
        this.setState({
            likeButtonDisabled:true
        });
        fetch(SITEURL + 'api/likeComment', {
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                commentID: this.props.id,
                like: this.make
            })
        }).then((response)=>{
            if(!response.ok) throw new Error(response.status);
            else return response.json();
        }).then((json)=>{
            this.setState({
                likeButtonDisabled:false,
                liked:this.make,
                likeCount: json['other']['count']
            });
        }).catch((error)=>{
        });
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
                            <RaisedSegment otherClass="comment">
                                <TopOfComment text={this.props.text} slug={this.props.slug} title={this.props.title} owner={this.props.owner} handleOpenEditArea={this.openEditArea} handleOpenDeleteArea={this.openDeleteArea} changeContent={this.props.changeContent} type={this.props.type}/>
                                <BottomOfComment likeCount={this.state.likeCount} liked={this.state.liked} likeButtonDisabled={this.state.likeButtonDisabled} likeToggle={this.likeToggle} date={this.props.date} handleOpenReportArea={this.openReportArea} handleCloseReportArea={this.closeReportArea} tags={this.props.tags} owner={this.props.owner} changeContent={this.props.changeContent} id={this.props.id}/>
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
        this.minifyLimit = 750;
        this.slugPrefix = (this.props.type=="profile")?"profil":"urun";
        // ^ comment'i iki yerde kullandığım ve 2 tür title yapısı olduğu için böyle bir çözüm buldum
        this.state = {
            readAll:false,
        };
        this.openEditArea = this.openEditArea.bind(this);
        this.openDeleteArea = this.openDeleteArea.bind(this);
        this.readAll = this.readAll.bind(this);
        this.minifyText = this.minifyText.bind(this);
        if(this.props.text.length>this.minifyLimit) {
            this.minifiedText = this.minifyText(this.props.text, this.minifyLimit);
        } else {
            this.state = {
                readAll:true
            };
        }
    }
    openEditArea() {
        this.props.handleOpenEditArea();
    }
    openDeleteArea() {
        this.props.handleOpenDeleteArea();
    }
    readAll() {
        this.setState({
            readAll: true
        });
    }
    minifyText(text, limit) {
        let minifiedText = "";
        for(let i=0;i<limit;i++) {
            minifiedText += text[i];
        }
        return minifiedText;
    }
    render() {
        return (
            <div>
                <Row size="two" nonStackable={true}>
                    <Column>
                        <div className="comment-header-wrapper">
                            <H type="3" text={this.props.title} optional="comment-header" href={this.slugPrefix + "/" + this.props.slug} handleOnClick={(e)=>{e.preventDefault();this.props.changeContent(e.target.href)}}/>
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
                                        {(!isMobile())?"Düzenle":""}
                                    </button>
                                    <button className="ui icon orange button" onClick={this.openDeleteArea}>
                                        <i className="icon">
                                            <i className="fa fa-trash" aria-hidden="true"></i>
                                        </i>
                                        {(!isMobile())?"Sil":""}
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
                            {(this.state.readAll)?this.props.text:this.minifiedText}
                        </div>
                    </Column>
                </Row>
                {(!this.state.readAll)?
                    <Row size="one">
                        <Column>
                            <FloatRight>
                                <a className="read-all" onClick={this.readAll}>Devamını Oku</a>
                            </FloatRight>
                        </Column>
                    </Row>
                :""}
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
                        <Tags tags={this.props.tags} activeOnly={true} handleOnClick={this.props.changeContent}/>
                    </Column>
                </Row>
                <Row size="two" nonStackable={true}>
                    <Column>
                        <div className="comment-date">
                            {this.props.date}
                        </div>
                    </Column>
                    <Column>
                        <FloatRight>
                            <LikeButton likeCount={this.props.likeCount} liked={this.props.liked} likeButtonDisabled={this.props.likeButtonDisabled} id={this.props.id} likeToggle={this.props.likeToggle}/>
                            <ReportButton handleOpenReportArea={this.props.handleOpenReportArea} disabled={this.props.owner}/>
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
    }
    render() {
        this.disabled = (this.props.likeButtonDisabled)?" disabled":"";
        this.buttonClass = (this.props.liked)? "ui blue button": "ui button";
        return(
            <button className={this.buttonClass + this.disabled} onClick={this.props.likeToggle}>
                <i className="icon">
                    <i className="fa fa-thumbs-up" aria-hidden="true"></i>
                </i>
                {this.props.likeCount}
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
            // normal, loading, sent
            form:"normal",
            messageType:"success",  // success, warning, danger
            messageText:"bu neyin mesajı bilmiyorum",
            message: {
                type:"success",
                text:"başarılı bir message"
            },
            commentText:this.props.commentText,
            sendButtonClassName: this.var.buttonClassName,
            topMessage: {
                type:null,
                text:null
            }
        };
        this.sendComment = this.sendComment.bind(this);
        this.changeComment = this.changeComment.bind(this);
        this.showTopMessage = this.showTopMessage.bind(this);
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
        this.showTopMessage("success", "başarılı bir şekilde yorumunuz gönderildi");
        this.setState({
            form:"sent"
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
    showTopMessage(type, text) {
        let topMessage = {
            type:type,
            text:text
        };
        this.setState({
            topMessage:topMessage
        })
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
            return(
                // bu kısım başarılı olması durumunda gösterilecek
                // API ile konuşturan yunus emre'ye not: buradaki Comment componentinin özelliklerini WriteComment'in state'i üzerinde tuttuğun API reponse'u değerleri
                // üzerinden dolduracaksın
                <Comment text={this.state.commentText}
                    likeCount="0"
                    liked={false}
                    title="Buraya kullanıcı adı gelecek"
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
                        type: this.state.topMessage.type,
                        text: this.state.topMessage.text
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

class Comments extends React.Component {
	constructor(props) {
	    super(props);
	}
    render() {
		if(this.props.form=="normal") {
			this.comments = [];
			for(let i=0;i<this.props.comments.length;i++) {
				let com = this.props.comments[i];
				this.comments.push(
                                    <Comment
                                        changeContent={this.props.changeContent}
                                        key={com.id}
                                        id={com.id}
                                        text={com.text}
                                        type={com.type}
                                        slug={com.slug}
                                        likeCount={com.likeCount}
                                        liked={com.liked}
                                        title={com.title}
                                        date={com.date}
                                        tags={com.tags}
                                        owner={com.owner}
                                    />
				)
			}
			return (
				<div>
					{this.comments}
				</div>
			)
		} else if(this.props.form=="loading"){
			return(
				<RowLoadingSpin nonSegment={true} />
			)
		} else if(this.props.form=="noComment") {
			return(
				<Row size="one">
					<Column>
						<div class="ui big yellow message">
                                                    Yorum yok, ilk yorum senden olsun!
						</div>
					</Column>
				</Row>
			)
		}
    }
}
