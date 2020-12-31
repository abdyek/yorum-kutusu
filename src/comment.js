class Comment extends React.Component {
    constructor(props){
        super(props);
        let form = (this.props.form)?this.props.form:"normal";
        form = (this.props.hidden)?"hidden":form;
        this.state = {
            // normal, report, edit, delete, message, loading, hidden
            form:form,
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
        this.openLoadingSpin = this.openLoadingSpin.bind(this);
        this.makeNone = this.makeNone.bind(this);
        this.setForm = this.setForm.bind(this);
        this.justOneTime = this.justOneTime.bind(this);
        this.removeHide = this.removeHide.bind(this);
    }
    likeToggle() {
        if(isMember()) {
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
        } else {
            this.props.changeContent('giris-yap', true);
        }
    }
    openReportArea() {
        this.setForm("report");
    }
    closeReportArea() {
        this.setForm("normal");
    }
    openEditArea() {
        this.setState({
            form:"edit",
            topMessage: null
        });
    }
    closeEditArea() {
        this.setForm("normal");
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
    openLoadingSpin() {
        this.setState({
            form:"loading"
        });
    }
    makeNone() {
        this.setState({
            form:"none"
        })
    }
    setForm(formType) {
        this.setState({
            form:formType
        });
    }
    justOneTime(){
        this.setState({
            form:"normal"
        });
    }
    removeHide(){
        this.setState({
            form:"normal"
        });
        fetch(SITEURL + 'api/removeHideComment', {
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                commentID:this.props.id
            })
        }).then((response)=>{
            if(!response.ok) throw new Error(response.status);
            else return response.json();
        }).then((json)=>{
        }).catch((error)=>{
        });
        
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
                                <BottomOfComment
                                    likeCount={this.state.likeCount}
                                    liked={this.state.liked}
                                    likeButtonDisabled={this.state.likeButtonDisabled}
                                    likeToggle={this.likeToggle}
                                    date={this.props.date}
                                    handleOpenReportArea={this.openReportArea}
                                    handleCloseReportArea={this.closeReportArea}
                                    tags={this.props.rating}
                                    owner={this.props.owner}
                                    changeContent={this.props.changeContent}
                                    id={this.props.id}
                                    reported={this.props.reported}
                                />
                            </RaisedSegment>
                        </Column>
                    </Row>
                </div>
            )
        } else if(this.state.form=="report") {
            return(
                <ReportArea handleCloseReportArea={this.closeReportArea} commentID={this.props.id}/>
            )
        } else if(this.state.form=="edit") {
            return(
                <EditArea rating={this.props.rating} tags={this.props.tags} handleCancelButton={this.closeEditArea} commentText={this.props.text} owner={this.props.owner} reloadFunc={this.props.reloadFunc} setForm={this.setForm} productID={this.props.productID} setForm={this.setForm}/>
            )
        } else if(this.state.form=="delete") {
            return(
                <DeleteArea handleCancelButton={this.closeDeleteArea} runBeforeDelete={this.openLoadingSpin} runAfterDelete={this.makeNone} reloadFunc={this.props.reloadFunc} id={this.props.id}/>
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
        } else if(this.state.form=="none") {
            return(
                ""
            )
        } else if(this.state.form=="hidden") {
            return(
                <HiddenArea justOneTime={this.justOneTime} removeHide={this.removeHide}/>
            )
        }
    }
}

class HiddenArea extends React.Component {
    render() {
        return(
            <Row size="one">
                <Column>
                    <RaisedSegment otherClass="comment">
                        <Row size="one">
                            <Column>
                                <div className="ui olive message">Bu yorumu gizlediniz</div>
                            </Column>
                        </Row>
                        <Row size="one">
                            <Column>
                                <FloatRight>
                                    <button className="ui yellow button" onClick={this.props.justOneTime}>Şimdilik Göster</button>
                                    <button className="ui olive button" onClick={this.props.removeHide}>Görünür Yap</button>
                                </FloatRight>
                            </Column>
                        </Row>
                    </RaisedSegment>
                </Column>
            </Row>
        )
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
                            <H type="3" text={this.props.title} optional="comment-header" href={SITEURL + this.slugPrefix + "/" + this.props.slug} handleOnClick={(e)=>{e.preventDefault();this.props.changeContent(e.target.href)}}/>
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
                            <ReportButton handleOpenReportArea={this.props.handleOpenReportArea} disabled={this.props.owner || this.props.reported} changeContent={this.props.changeContent}/>
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
        if(isMember()) {
            this.props.handleOpenReportArea();
        } else {
            this.props.changeContent('giris-yap', true);
        }
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
            // normal, loading, message
            form:"loading",
            messageType:"",  // colors
            messageHeader:"",
            messageText:"",
            hideComment:true,
            selectOptionWarning:false,
            option:"-1",
            reportText: '',
            reportTextSize:0,
            reportTextLimitWarning: false
        };
        this.fetchReportOptions();
        this.fetchReportOptions = this.fetchReportOptions.bind(this);
        this.closeReportArea = this.closeReportArea.bind(this);
        this.sendReport = this.sendReport.bind(this);
        this.changeOption = this.changeOption.bind(this);
        this.changeTextarea = this.changeTextarea.bind(this);
        this.toggleHideComment = this.toggleHideComment.bind(this);
    }
    fetchReportOptions() {
        fetch(SITEURL + 'api/reportOptions', {
            method: 'GET',
            header: {
                'Content-Type': 'application/json'
            }
        }).then((response)=>{
            if(!response.ok) throw new Error(response.status);
            else return response.json();
        }).then((json)=>{
            console.log(json);
            this.setState({
                form:"normal",
                options:json['other']['reportOptions']
            });
        }).catch((error)=>{

        });
    }
    closeReportArea() {
        this.props.handleCloseReportArea();
    }
    sendReport() {
        if(this.state.option=="-1") {
            this.setState({
                selectOptionWarning:true
            });
        } else {
            this.setState({
                form:"loading"
            });
            fetch(SITEURL + 'api/report', {
                method: 'POST',
                header: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    commentID:this.props.commentID,
                    reportOptionID: this.state.option,
                    reportText:this.state.reportText,
                    hide:this.state.hideComment
                })
            }).then((response)=>{
                if(!response.ok) throw new Error(response.status);
                else return response.json();
            }).then((json)=>{
                this.setState({
                    form:"message",
                    messageType:"success",  // success, warning, danger
                    messageHeader:"Geri bildirim gönderildi",
                    messageText:"Geri bildirim göndererek daha kaliteli bir ortam oluşturma konusunda bize yardımcı olduğunuz için teşekkür ederiz"
                });
            }).catch((error)=>{
                if(error.message==422) {
                    this.setState({
                        form:"message",
                        messageType:"red",
                        messageHeader:"Zaten şikayet edilmiş",
                        messageText:"Bu yorum için zaten henüz değerlendirilmemiş bir şikayetiniz mevcut"
                    })
                }
            });
        }
    }
    changeOption(e) {
        this.setState({
            option:e.target.value
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
    toggleHideComment() {
        this.setState({
            hideComment: (this.state.hideComment)?false:true
        });
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
                                                Çok fazla yanlış geri bildirim yapmanız halinde, ileride yapacağınız geri bildirimler dikkate alınmayabilir.
                                            </p>
                                        </div>
                                    </Column>
                                </Row>
                                <Row size="one">
                                    <Column>
                                        <ReportOptions handleChangeOption={this.changeOption} options={this.state.options} selected={this.state.option} />
                                    </Column>
                                </Row>
                                {this.state.selectOptionWarning ?
                                    <BasicMessage type="warning" text='"Neden" boş bırakılamaz!'/>
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
                                        <div className="field">
                                            <div className="ui checkbox">
                                                <input type="checkbox" id="hiddenCommentCheckbox" checked={this.state.hideComment} onChange={this.toggleHideComment}/>
                                                <label for="hiddenCommentCheckbox">Ayrıca bu yorumu gizle</label>
                                            </div>
                                        </div>
                                    </Column>
                                </Row>
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
        } else if(this.state.form=="message") {
            return(
                <Row size="one">
                    <Column>
                        <RaisedSegment>
                            <div className={"ui "+this.state.messageType+" message"}>
                                <div className="header">
                                    {this.state.messageHeader}
                                </div>
                                <p>
                                    {this.state.messageText}
                                </p>
                            </div>
                        </RaisedSegment>
                    </Column>
                </Row>
            )
        }
    }
}

class ReportOptions extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const options = [];
        options.push(<option value="-1" key="-1">-- Lütfen Seçiniz --</option>)
        for(let i=0;i<this.props.options.length;i++) {
            options.push(<option value={this.props.options[i].id} key={this.props.options[i].id}>{this.props.options[i].optionName}</option>)
        }
        return(
            <div>
                <div className="ui form">
                    <div className="field">
                        <label>Neden</label>
                        <select onChange={this.props.handleChangeOption} value={this.props.option}>
                            {options}
                        </select>
                    </div>
                </div>
            </div>
        )
    }
}

class Rating extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        this.ratingLines = [];
        let keys = Object.keys(this.props.tags);
        for(let i=0;i<keys.length;i++) {
            let j = keys[i];
            this.ratingLines.push(
                <RatingLine
                    key={j}
                    tagKey={this.props.tags[j].id}
                    tagName={this.props.tags[j].text}
                    tagSlug={this.props.tags[j].slug}
                    value={this.props.tags[j].value}
                    color={this.props.tags[j].color}
                    selectOption={this.props.selectOption}
                />
            )
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
    }
    render() {
        return(
            <Row size="one">
                <Column>
                    <Row size="two">
                        <Column>
                            <Center>
                                <Tag key={this.props.tagKey} passive={false} text={this.props.tagName} color={this.props.color} rateValue={this.props.value}/>
                            </Center>
                        </Column>
                        <Column>
                            <Center>
                                <div className="ui form">
                                    <div className="field">
                                        <select onChange={(e)=>this.props.selectOption(e, this.props.tagSlug)} value={this.props.value}>
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
        this.state = {
            commentText:this.props.commentText,
            rating:this.props.rating,
            tags:this.mergeTagAndRating(),
            sendButtonState: (this.props.commentText.length)?"":"disabled"
        }
        this.mergeTagAndRating = this.mergeTagAndRating.bind(this);
        this.changeComment = this.changeComment.bind(this);
        this.sendComment = this.sendComment.bind(this);
        this.selectOption = this.selectOption.bind(this);
    }
    mergeTagAndRating() {
        let tags = {};
        for(let i=0;i<this.props.tags.length;i++) {
            if(!this.props.tags[i].passive) {
                tags[this.props.tags[i].slug] = {
                    slug:this.props.tags[i].slug,
                    text:this.props.tags[i].text,
                    color:getRatingColor('-'),
                    value:'-'
                }
            }
        }
        // overwriting
        for(let i=0;i<this.props.rating.length;i++) {
            tags[this.props.rating[i].slug].value = this.props.rating[i].rateValue;
            tags[this.props.rating[i].slug].color = getRatingColor(this.props.rating[i].rateValue);
        }
        return tags;
    }
    changeComment(e) {
        this.setState({
            commentText:e.target.value,
            sendButtonState: (e.target.value.length)?"":"disabled"
        });
    }
    sendComment() {
        console.log(this.props.productID);
        if(this.props.newComment) {
            // new comment
            fetch(SITEURL + 'api/comment', {
                method: 'POST',
                header: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productID:this.props.productID,
                    commentText: this.state.commentText,
                    rating: normalizer("rating", this.state.tags)
                })
            }).then((response)=>{
                if(!response.ok) throw new Error(response.status);
                else return response.json();
            }).then((json)=>{
                this.props.reloadFunc();
            }).catch((error)=>{
                if(error.message==422) {
                    this.showTopMessage("warning", "Her ürüne sadece bir kere yorum yapabilirsiniz");
                }
            });
        } else {
            if(this.props.setForm){
                this.props.setForm('loading');
            }
            // edit comment
            fetch(SITEURL + 'api/comment', {
                method: 'PUT',
                header: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productID:this.props.productID,
                    commentText: this.state.commentText,
                    rating: normalizer("rating", this.state.tags)
                })
            }).then((response)=>{
                if(!response.ok) throw new Error(response.status);
                else return response.json();
            }).then((json)=>{
                if(this.props.setForm){
                    this.props.setForm('normal');
                }
                this.props.reloadFunc();
            }).catch((error)=>{
                if(error.message==422) {
                    this.showTopMessage("warning", "Her ürüne sadece bir kere yorum yapabilirsiniz");
                }
            });
        }
    }
    selectOption(e, slug) {
        console.log(slug + " - " +  e.target.value);
        let temp = this.state.tags;
        temp[slug].value = e.target.value;
        temp[slug].color = getRatingColor(e.target.value);
        this.setState({
            tags:temp
        });
    }
    render() {
        this.title = (this.props.newComment)?"Yorum Yaz":"Düzenle";
        this.buttonName = (this.props.newComment)?"Gönder":"Düzenle";
        return(
            <Row size="one">
                <Column>
                    {(null)?
                        <Row size="one">
                            <Column>
                                <BasicMessage type={this.state.topMessage.type} text={this.state.topMessage.text} />
                            </Column>
                        </Row>
                    :""}
                    <RaisedSegment>
                        <Row size="two" nonStackable={true}>
                            <Column>
                                <H type="4" text={this.title} />
                            </Column>
                            <Column>
                                {
                                    (!this.props.newComment)?
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
                                <Rating tags={this.state.tags} selectOption={this.selectOption}/>
                            </Column>
                        </Row>
                        <Row size="one">
                            <Column>
                                <FloatRight>
                                    <button className={"ui green "+this.state.sendButtonState+" button"} onClick={this.sendComment}>
                                        {this.buttonName}
                                    </button>
                                </FloatRight>
                            </Column>
                        </Row>
                    </RaisedSegment>
                </Column>
            </Row>)
    }
}

class DeleteArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form:"normal"
        }
        this.deleteComment = this.deleteComment.bind(this);
    }
    deleteComment() {
        this.props.runBeforeDelete();
        fetch(SITEURL + 'api/comment', {
            method: 'DELETE',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                commentID: this.props.id
            })
        }).then((response)=>{
            if(!response.ok) throw new Error(response.status);
            else return response.json();
        }).then((json)=>{
            this.props.runAfterDelete();
            this.props.reloadFunc();
        }).catch((error)=>{
            if(error.message==404) {
                this.props.runAfterDelete();
                this.props.reloadFunc();
            } else {
                this.props.runAfterDelete();
                this.props.reloadFunc();
            }
        });
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
                                    <button className="ui green button" onClick={this.deleteComment}>
                                        Evet
                                    </button>
                                </FloatRight>
                            </Column>
                            <Column>
                                <button className="ui red button" onClick={this.props.handleCancelButton}>
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

class BottomComment extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            topMessage: null,
            likeButtonDisabled: false
        }
    }
    render() {
        if(this.props.form=="normal") {
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
                                <TopOfComment
                                    text={this.props.ownComment.commentText}
                                    slug={this.props.ownComment.owner.slug}
                                    title={this.props.ownComment.owner.username}
                                    owner={true}
                                    handleOpenEditArea={this.props.openEdit}
                                    handleOpenDeleteArea={this.props.openDelete}
                                    changeContent={this.props.changeContent}
                                    type={"profile"}
                                />
                                <BottomOfComment
                                    likeCount={this.props.ownComment.commentLikeCount}
                                    liked={this.props.ownComment.liked}
                                    likeButtonDisabled={this.state.likeButtonDisabled}
                                    likeToggle={this.likeToggle}
                                    date={this.props.ownComment.commentCreateDateTime}
                                    handleOpenReportArea={this.openReportArea}
                                    handleCloseReportArea={this.closeReportArea}
                                    //tags={[]}
                                    tags={normalizer('comment-rating', this.props.ownComment.rating)}
                                    owner={true}
                                    changeContent={this.props.changeContent}
                                    id={this.props.ownComment.id}
                                />
                            </RaisedSegment>
                        </Column>
                    </Row>
                </div>
            )
        } else if (this.props.form=="edit") {
            return(
                <EditArea
                    rating={normalizer('comment-rating', this.props.ownComment.rating)}
                    tags={this.props.tags}
                    handleCancelButton={this.props.openNormal}
                    commentText={this.props.ownComment.commentText}
                    owner={true}
                    reloadFunc={this.props.reloadFunc}
                    productID={this.props.productID}
                />
            )
        } else if(this.props.form=="newComment") {
            return(
                <EditArea
                    tags={this.props.tags}
                    rating={[]}
                    handleCancelButton={this.props.openNormal}
                    commentText=""
                    owner={true}
                    reloadFunc={this.props.reloadFunc}
                    newComment={true}
                    productID={this.props.productID}
                    changeContent={this.props.changeContent}
                />
            )
        } else if(this.props.form=="hidden") {
            return(
                ""
            )
        } else if(this.props.form=="delete") {
            return(
                <DeleteArea handleCancelButton={this.props.openNormal} runBeforeDelete={this.props.openLoadingSpin} runAfterDelete={this.props.hide} reloadFunc={this.props.reloadFunc} id={this.props.ownComment.commentID}/>
            )
        } else if(this.props.form=="loading") {
            return(
                <RowLoadingSpin />
            )
        }
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
                                        productID={this.props.productID}
                                        changeContent={this.props.changeContent}
                                        reloadFunc={this.props.reloadFunc}
                                        tags={this.props.tags}
                                        key={com.id}
                                        id={com.id}
                                        text={com.text}
                                        type={com.type}
                                        slug={com.slug}
                                        likeCount={com.likeCount}
                                        liked={com.liked}
                                        title={com.title}
                                        date={com.date}
                                        rating={com.rating}
                                        owner={com.owner}
                                        reported={com.reported}
                                        hidden={com.hidden}
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
