class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Header /> {/* from components.js */}
                <Content 
                    comments={[
                        {
                            key:"1",
                            commentOwner:"Yunus Emre Bulut",
                            commentText:"Çok güzel bir telefon. Yapanlardan Allah razı olsun.",
                            likeValue:"455",
                            dislikeValue:"75",
                            likeOrDislike:"like",
                            ratingAverage:"9.8",
                            date:"07.06"
                        },
                        {
                            key:"2",
                            commentOwner:"Rıdvan Tülemen",
                            commentText:"Apple gerçekten güzel ürünler üretiyor. Steve Jobs R.I.P :(",
                            likeValue:"499",
                            dislikeValue:"27",
                            likeOrDislike:"like",
                            ratingAverage:"8.2",
                            date:"03.05"
                        },
                        {
                            key:"3",
                            commentOwner:"Alp_77",
                            commentText:"Bu tasarım sonraki sürümlerde de sürdürülmeliydi. Bu kadar güzel tasarımlı başka iphone yok.",
                            likeValue:"999",
                            dislikeValue:"12",
                            likeOrDislike:" ",
                            ratingAverage:"5.4",
                            date:"13.12"
                        },
                        {
                            key:"4",
                            commentOwner:"ceza_22",
                            commentText:"Samzung s3ün gedir götürünü yabar anca.",
                            likeValue:"13",
                            dislikeValue:"176",
                            likeOrDislike:"dislike",
                            ratingAverage:"1.2",
                            date:"12.12"
                        },
                    ]}
                    productName="iphone 5s"
                    mainCategory={{
                        name:"Elektronik"
                    }}
                    categoryChildren={[
                        {
                            id:"2",
                            name:"Telefon"
                        },
                        {
                            id:"4",
                            name:"Akıllı Telefon"
                        }
                    ]}
                    followers={315}
                    followed={false}
                    attributes={[
                        {
                            key:1,
                            name:"Tasarım",
                            percentValue: 7.8
                        },
                        {
                            key:2,
                            name:"Kullanışlılık",
                            percentValue: 6.9
                        },
                        {
                            key:3,
                            name:"Pil Ömrü",
                            percentValue: 4.6
                        },
                        {
                            key:4,
                            name:"Taşınabilirlik",
                            percentValue: 7.5
                        },
                        {
                            key:5,
                            name:"Fiyat-Performans",
                            percentValue: 6.4
                        }
                    ]}
                />
                <Footer /> {/* from components.js */}
            </div>
        )
    }
}

class Content extends React.Component {
    render() {
        return(
            <div id="content">
                <BreadCrumb
                    mainCategory={this.props.mainCategory}
                    categoryChildren={this.props.categoryChildren}
                    productName={this.props.productName}
                />
                <ProductHeader />
                <FollowButton followers={this.props.followers} followed={this.props.followed}/>
                <Product attributes={this.props.attributes}/>
                <Comments comments={this.props.comments} />
            </div>
        )
    }
}

class BreadCrumb extends React.Component {
    constructor(props){
        super(props);
        this.categoryChildren = [];
        for(var i=0;i<this.props.categoryChildren.length; i++) {
            this.categoryChildren.push(
                <span key={this.props.categoryChildren[i].id}>
                    <i className="right angle icon divider"></i>
                    <a className="section">{this.props.categoryChildren[i].name}</a>
                </span>
            )
        }
    }
    render() {
        return(
            <Row size="one">
                <Column>
                    <div className="ui breadcrumb">
                        <a className="section">{this.props.mainCategory.name}</a>
                        {this.categoryChildren}
                        <i className="right angle icon divider"></i>
                        <div className="active section">{this.props.productName}</div>
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
                                    {this.props.followers}
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
                    <Rating attributes={this.props.attributes}/>
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
                    <button key={i} className="disabled ui button">{i + 1}</button>
                )
            } else {
                this.buttons.push(
                    <button key={i} className="ui button">{i + 1}</button>
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
    constructor(props){
        super(props);
        this.attributes = [];
        for(let i=0;i<this.props.attributes.length;i++) {
            this.attributes.push(
                <ProductAttribute
                    key={this.props.attributes[i].key}
                    name={this.props.attributes[i].name}
                    percentValue={this.props.attributes[i].percentValue}
                />
            )
        }
            
    }
    render() {
        return(
            <div>
                {this.attributes}
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
        this.comments = [];
        for(let i=0;i<this.props.comments.length;i++) {
            this.comments.push(
                <Comment
                    key = {this.props.comments[i].key}
                    commentOwner= {this.props.comments[i].commentOwner}
                    commentText= {this.props.comments[i].commentText}
                    likeValue={this.props.comments[i].likeValue}
                    dislikeValue={this.props.comments[i].dislikeValue}
                    likeOrDislike={this.props.comments[i].likeOrDislike}
                    ratingAverage={this.props.comments[i].ratingAverage}
                    date={this.props.comments[i].date}
                />
            );
        }
    }
    render() {
        return(
            <div>
                <YorumlarHeader />
                <PageNumber />
                    {this.comments}
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
                <input className="inputRange" type="range" id="" name="" defaultValue={this.state.value} step="1" min="0" max="10" onChange={this.change}></input>
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
