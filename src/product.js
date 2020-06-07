class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Header /> {/* from components.js */}
                <Content />
                <Footer /> {/* from components.js */}
            </div>
        )
    }
}

class Content extends React.Component {
    render() {
        return(
            <div id="content">
                <BreadCrumb />
                <ProductHeader />
                <FollowButton followed={true}/>
                <Product />
                <Comments />
            </div>
        )
    }
}

class BreadCrumb extends React.Component {
    render() {
        return(
            <Row size="one">
                <Column>
                    <div className="ui breadcrumb">
                        <a className="section">Elektronik</a>
                        <i className="right angle icon divider"></i>
                        <a className="section">Mobil Cihazlar</a>
                        <i className="right angle icon divider"></i>
                        <div className="active section">Iphone</div>
                    </div>
                </Column>
            </Row>
        )
    }
}

class ProductHeader extends React.Component {
    render() {
        return (
            <Row size="one">
                <Column>
                    <div id="productHeader">
                        <H type="1" textAlign="center" text="iphone 5s"/>
                    </div>
                </Column>
            </Row>
        )
    }
}

class FollowButton extends React.Component {
    constructor(props) {
        super(props);
        this.followToggle = this.followToggle.bind(this);
        if(this.props.followed) {
            this.state = {
                followed:true,
                class: " red "
            }
        } else {
            this.state = {
                followed:false,
                class: " "
            }
        }
    }
    followToggle() {
        if(this.state.followed) {
            // takipten çıkma kodları buraya gelecek
            this.setState({
                followed:false,
                class: " "
            });
        } else {
            // takip etme kodları buraya gelecek
            this.setState({
                followed:true,
                class: " red "
            });
        }
    }
    render() {
        return(
            <Row size="one">
                <Column>
                    <FloatRight>
                        {/*
                            takip etmediği zaman classNamedeki "red" i kaldırıcaz
                        */}
                        <div id="followButton" onClick={this.followToggle}>
                            <div className="ui labeled button" tabIndex="0">
                                <div className={"ui"+this.state.class+"button"}>
                                    <i className="heart icon"></i> Takip Et
                                </div>
                                <a className={"ui basic"+this.state.class+"left pointing label"}>
                                    1,048
                                </a>
                            </div>
                        </div>
                    </FloatRight>
                </Column>
            </Row>
        )
    }
}

class Product extends React.Component {
    render() {
        return(
            <Row size="sixteen">
                <WideColumn size="eight">
                    <Row size="one">
                        <Column>
                            <Center>
                                <ImageSlider srcs={[
                                    "https://cdn.shoplightspeed.com/shops/613622/files/8420157/image.jpg",
                                    "http://3.bp.blogspot.com/-uC4SEk9v07I/UyVCeORCsdI/AAAAAAAAA-k/6xZx0EVnCMc/s1600/iphone+5s+rep.jpg",
                                    "https://i.ytimg.com/vi/2jDd8iPIuEc/maxresdefault.jpg",
                                    "https://i.ytimg.com/vi/kLg__oZYfG8/maxresdefault.jpg",
                                    "http://3.bp.blogspot.com/-uC4SEk9v07I/UyVCeORCsdI/AAAAAAAAA-k/6xZx0EVnCMc/s1600/iphone+5s+rep.jpg"
                                ]}/>
                            </Center>
                        </Column>
                    </Row>
                </WideColumn>
                <WideColumn size="eight">
                    <Rating />
                </WideColumn>
            </Row>
        )
    }
}

class ImageSlider extends React.Component {
    constructor(props) {
        super(props);
        this.nextIndex = 0;
        this.state = {
            src: this.props.srcs[0],
            index: 0
        }
        this.change = this.change.bind(this);
    }
    change(id) {
        this.nextIndex = this.state.index + id;
        if(this.nextIndex==this.props.srcs.length) {
            this.nextIndex= 0;
        } else if(this.nextIndex==-1) {
            this.nextIndex = this.props.srcs.length - 1;
        }
        this.setState({
            index: this.nextIndex,
            src: this.props.srcs[this.nextIndex]
        });
        console.log(this.nextIndex);
    }
    render() {
        return(
            <div id="imageSlider">
                <div id="imageSliderImg">
                    <Img src={this.state.src} />
                </div>
                <div id="imageSliderButtons">
                    <Row size="one">
                        <Column>
                            <DirectlyButtons selectedIndex={this.state.index+1}/>
                        </Column>
                    </Row>
                    <Row size="one" nonStackable={true}>
                        <Column>
                            <button className="mini ui icon button" onClick={() => this.change(-1)}>
                                <i className="left arrow icon"></i>
                            </button> 
                                <button className="mini ui icon button" onClick={() => this.change(+1)}>
                                    <i className="right arrow icon"></i>
                                </button> 
                        </Column>
                    </Row>
                </div>
            </div>
        )
    }
}

class Img extends React.Component {
    render() {
        return(
            <div>
                <img id="productImg" className="ui image" src={this.props.src}></img>
            </div>
        )
    }
}

class DirectlyButtons extends React.Component {
    constructor(props) {
        super(props);
        this.buttons = [];
        this.state = {
            selectedIndex:0
        }
        for(let i=0;i<4; i++) {
            if(this.props.selectedIndex==i+1) {
                this.buttons.push(
                    <button className="disabled ui button">{i + 1}</button>
                )
            } else {
                this.buttons.push(
                    <button className="ui button">{i + 1}</button>
                )
            }
        }
    }
    render() {
        return(
            <div className="small blue ui buttons">
                {this.buttons}
            </div>
        )
    }
}

class Rating extends React.Component {
    render() {
        return(
            <div>
                <ProductAttribute name="Sağlamlık" percentValue="4.9"/>
                <ProductAttribute name="Kullanışlılık" percentValue="5.2"/>
                <ProductAttribute name="Pil Ömrü" percentValue="7.2"/>
            </div>
        )
    }
}
class ProductAttribute extends React.Component {
    render() {
        return(
            <Row size="two" nonStackable={true}>
                <Column>
                    <ProductAttributeName name={this.props.name}/>
                </Column>
                <Column>
                    <Center>
                        <DrawCircle percentValue={this.props.percentValue} />
                    </Center>
                </Column>
            </Row>
        )
    }
}
class ProductAttributeName extends React.Component {
    render() {
        return (
            <H type="3" textAlign="center" text={this.props.name} optional="lineHeight80px"/>
        )
    }
}
class DrawCircle extends React.Component {
    constructor(props) {
        super(props);
        this.percent = this.props.percentValue * 10;
        this.limitColor = {
            0: {
                min: 0,
                max: 5,
                color: "#db2828"
            },
            1: {
                min: 5,
                max: 7,
                color: "#f2711c"
            },
            2: {
                min: 7,
                max: 10,
                color: "#21ba45"
            },
        }
        this.color = this.limitColor[0].color;
        for(let i=0; i<Object.keys(this.limitColor).length; i++) {
            if(this.limitColor[i].min <= this.props.percentValue && this.props.percentValue < this.limitColor[i].max) {
                this.color = this.limitColor[i].color;
                break;
            }
        }
    }
    render() {
        return(
            <div className={"c100 p"+this.percent+" small"}>
                <span>{this.props.percentValue}</span>
                <div className="slice">
                    <div className="bar" style={{borderColor: this.color}}></div>
                    <div className="fill" style={{borderColor: this.color}}></div>
                </div>
            </div>
        )
    }
}

class Comments extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                <YorumlarHeader />
                <PageNumber />
                <Comment
                    commentOwner="Rıdvan Tülemen"
                    commentText="Yinelenen bir sayfa içeriğinin okuyucunun dikkatini dağıttığı bilinen bir gerçektir. Lorem Ipsum kullanmanın amacı, sürekli 'buraya metin gelecek, buraya metin gelecek' yazmaya kıyasla daha dengeli bir harf dağılımı sağlayarak okunurluğu artırmasıdır. Şu anda birçok masaüstü yayıncılık paketi ve web sayfa düzenleyicisi, varsayılan mıgır metinler olarak Lorem Ipsum kullanmaktadır. Ayrıca arama motorlarında 'lorem ipsum' anahtar sözcükleri ile arama yapıldığında henüz tasarım aşamasında olan çok sayıda site listelenir. Yıllar içinde, bazen kazara, bazen bilinçli olarak (örneğin mizah katılarak), çeşitli sürümleri geliştirilmiştir."
                    likeValue="312"
                    dislikeValue="31"
                    likeOrDislike="like"
                    ratingAverage="7.2"
                    date="15/05/2020"
                />
                <Comment
                    commentOwner="RTE_53"
                    commentText="Eyyy kılıçdar sen kimsin yaa!!"
                    likeValue="9912312312"
                    dislikeValue="912"
                    likeOrDislike="dislike"
                    ratingAverage="4.2"
                    date="15-05"
                />
                <Comment
                    commentOwner="ByKemal31"
                    commentText="Derhal burayı terket kardeşim"
                    likeValue="321312412"
                    dislikeValue="91"
                    ratingAverage="6.8"
                    date="15-05-12"
                />
                <Comment
                    commentOwner="Deniz_Baykal_07"
                    commentText="Benim ne işim var burda amq"
                    likeValue="999999999999"
                    dislikeValue="-1231"
                    ratingAverage="1.0"
                    date="01-05 12:15"
                />
                <PageNumber />
                <WriteComment />
            </div>
        )
    }
}
class YorumlarHeader extends React.Component {
    render() {
        return(
            <Row>
                <Column>
                    <H type="1" textAlign="center" text="Yorumlar"/>
                </Column>
            </Row>
        )
    }
}
class PageNumber extends React.Component {
    /*
        ortadaki html select'i masaüstü ve tabletlerde görünümünü daha küçük yapmak için size'ını 'two', ilk ve sonrakini de 'seven'
        yapabiliriz. ancak mobil (iphone 6s) görünümünde html select sığmıyor. Bu durumu kurtarmak için mobilde şöyle görün normalde
        şöyle görün diyebiliriz. şimdilik buraya not düşüyorum. ileride bu kısmı yaparım.
    */
    render() {
        return(
            <Row size="sixteen" nonStackable={true}>
                <WideColumn size="seven">
                    <button className="ui disabled labeled icon button">
                        <i className="left arrow icon"></i>
                            Önceki Sayfa
                    </button>
                </WideColumn>
                <WideColumn size="two">
                    <div className="ui form">
                        <div className="field">
                            <select>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </div>
                    </div>
                </WideColumn>
                <WideColumn size="seven">
                    <FloatRight>
                        <button className="ui right labeled icon button">
                            <i className="right arrow icon"></i>
                                Sonraki Sayfa
                        </button>
                    </FloatRight>
                </WideColumn>
            </Row>
        )
    }
}

class Comment extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Row>
                <Column>
                    <RaisedSegment>
                        <Row size="two" nonStackable={true}>
                            <Column>
                                <RatingBar ratingAverage={this.props.ratingAverage}/>
                            </Column>
                            <Column>
                                <FloatRight>
                                    <CommentDate date={this.props.date} />
                                </FloatRight>
                            </Column>
                        </Row>
                        <Row size="one">
                            <Column>
                                <div className="commentText">
                                    <p>
                                        {this.props.commentText}
                                    </p>
                                </div>
                            </Column>
                        </Row>
                        <Row size="two">
                            <Column>
                                <div className="commentHeader">
                                    <H type="5" text={this.props.commentOwner} />
                                </div>
                            </Column>
                            <Column>
                                <FloatRight>
                                    <LikeButton value={this.props.likeValue} likeOrDislike={this.props.likeOrDislike}/>
                                    <DislikeButton value={this.props.dislikeValue} likeOrDislike={this.props.likeOrDislike}/>
                                    <ComplaintButton />
                                </FloatRight>
                            </Column>
                        </Row>
                    </RaisedSegment>
                </Column>
            </Row>
        )
    }
}
class RatingBar extends React.Component {
    constructor(props) {
        super(props);
        this.percent = this.props.ratingAverage * 10;
        // bu kısım drawcircle ile aynı refactor ederken buna bir çare bulabilirsin
        this.limitColor = {
            0: {
                min: 0,
                max: 5,
                color: "#db2828"
            },
            1: {
                min: 5,
                max: 7,
                color: "#f2711c"
            },
            2: {
                min: 7,
                max: 10,
                color: "#21ba45"
            }
        }
        this.color = this.limitColor[0].color;
        for(let i=0; i<Object.keys(this.limitColor).length; i++) {
            if(this.limitColor[i].min <= this.props.ratingAverage && this.props.ratingAverage< this.limitColor[i].max) {
                this.color = this.limitColor[i].color;
                break;
            }
        }
        // ^^^
        this.widthOfFill = this.props.ratingAverage * 15 + "px";
    }
    render() {
        return(
            <div className="ratingBar">
                <span className="barValue">
                    {this.props.ratingAverage}
                </span>
                <div className="barStickWrapper">
                    <div className="barStick barStickFull">
                    </div>
                    <div className="barStick barStickFill" style={{backgroundColor:this.color, width:this.widthOfFill}}>
                    </div>
                </div>
            </div>
        )
    }
}
class CommentDate extends React.Component {
    render() {
        return (
            <span className="commentDate">{this.props.date}</span>
        )
    }
}
class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        if(this.props.likeOrDislike=="like") {
            this.liked = " likedComment";
        } else {
            this.liked = " ";
        }
    }
    render() {
        return(
            <button className="ui basic button">
                <i className="icon">
                    <i className={"fa fa-thumbs-up" + this.liked} aria-hidden="true"></i>
                </i>
                {this.props.value}
            </button>
        )
    }
}
class DislikeButton extends React.Component {
    constructor(props) {
        super(props);
        if(this.props.likeOrDislike=="dislike") {
            this.liked = " dislikedComment";
        } else {
            this.liked = " ";
        }
    }
    render() {
        return(
            <button className="ui basic button">
                <i className="icon">
                    <i className={"fa fa-thumbs-down" + this.liked} aria-hidden="true"></i>
                </i>
                {this.props.value}
            </button>
        )
    }
}
class ComplaintButton extends React.Component {
    render() {
        return (
            <button className="ui basic button">
                <i id="exclamation" className="fa fa-exclamation" aria-hidden="true"></i>
            </button>
        )
    }
}


class WriteComment extends React.Component {
    render() {
        return (
            <Row>
                <Column>
                    <Segment>
                        <Row size="sixteen">
                            <WideColumn size="ten">
                                <div className="ui form">
                                    <div className="field">
                                        <label>Yorum Yaz</label>
                                        <textarea rows="10"></textarea>
                                    </div>
                                </div>
                            </WideColumn>
                            <WideColumn size="six">
                                <InputRating />
                            </WideColumn>
                        </Row>
                        <Row>
                            <WideColumn>
                                <FloatRight>
                                    <SendButton />
                                </FloatRight>
                            </WideColumn>
                        </Row>
                    </Segment>
                </Column>
            </Row>
        )
    }
}
class InputRating extends React.Component {
    render() {
        return(
            <div id="inputRating">
                <InputRange name="Sağlamlık"/>
                <InputRange name="Kullanışlılık"/>
                <InputRange name="Pil Ömrü"/>
                <InputRange name="falan1"/>
                <InputRange name="falan2"/>
                <InputRange name="falan3"/>
                <InputRange name="falan4"/>
                <InputRange name="falan5"/>
            </div>
        )
    }
}
class InputRange extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value:"5"
        }
        this.change = this.change.bind(this);
    }
    change(event) {
        this.setState({
            value: event.target.value
        })
    }
    render() {
        return(
            <div className="inputRangeWrapper">
                <label className="inputRangeLabel">
                    {this.props.name}
                </label>
                <input className="inputRange" type="range" id="" name="" defaultValue="5" value={this.state.value} step="1" min="0" max="10" onChange={this.change}></input>
                <label className="inputRangeValue">
                    {this.state.value}
                </label>
            </div>
        )
    }
}
class SendButton extends React.Component {
    render() {
        return (
            <button className="ui primary button">
                Gönder
            </button>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
