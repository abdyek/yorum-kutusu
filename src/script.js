class Container extends React.Component {
    render() {
        return(
            <div className="ui container">
                {this.props.children}
            </div>
        )
    }
}

class Segment extends React.Component {
    render() {
        return(
            <div className="ui segment">
                {this.props.children}
            </div>
        )
    }
}
class RaisedSegment extends React.Component {
    render() {
        return(
            <div className="ui raised segment">
                {this.props.children}
            </div>
        )
    }
}


class Row extends React.Component {
    constructor(props){
        super(props);
        this.stackable = "stackable";
        if(this.props.nonStackable) {
            this.stackable = "";
        }
    }
    render() {
        if(this.props.withoutContainer) {
            return(
                <div className={"ui " + this.stackable + " " + this.props.size + " column grid"}>
                    {this.props.children}
                </div>
            )
        } else {
            return(
                <Container>
                    <div className={"ui " + this.stackable + " " + this.props.size + " column grid"}>
                        {this.props.children}
                    </div>
                </Container>
            )
        }
    }
}


class Column extends React.Component {
    render() {
        return(
            <div className="column">
                {this.props.children}
            </div>
        )
    }
}

class WideColumn extends React.Component {
    render() {
        return(
            <div className={this.props.size + " wide column"}>{this.props.children}</div>
        )
    }
}

class H extends React.Component {
    constructor(props) {
        super(props);
        this.textAlign = "";
        if(this.props.textAlign=="center") {
            this.textAlign = " center aligned ";
        }
    }
    render() {
        if(this.props.type=="1") {
            return (
                <h1 className={"ui "+this.textAlign+" header"}>{this.props.text}</h1>
            )
        } else if(this.props.type=="2") {
            return (
                <h2 className={"ui "+this.textAlign+" header"}>{this.props.text}</h2>
            )
        } else if(this.props.type=="3") {
            return (
                <h3 className={"ui "+this.textAlign+" header"}>{this.props.text}</h3>
            )
        } else if(this.props.type=="4") {
            return (
                <h4 className={"ui "+this.textAlign+"header"}>{this.props.text}</h4>
            )
        } else if(this.props.type=="5") {
            return (
                <h5 className={"ui "+this.textAlign+"header"}>{this.props.text}</h5>
            )
        }
    }
}

class Center extends React.Component {
    render() {
        return(
            <div className="ui one column stackable center aligned page grid">
                <div className={"column "+this.props.size +" wide"}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

class Hx extends React.Component {
    // size -> huge, large, medium, small, tiny
    render() {
        return(
            <div class={"ui "+this.props.size+" header"}>{this.props.text}</div> 
        )
    }
}

class FloatRight extends React.Component {
    render() {
        return(
            <div className="floatRight">{this.props.children}</div>
        )
    }
}

class Button extends React.Component {
    render() {
        return(
            <button className={"ui "+this.props.type+" button"}>
                {this.props.text}
            </button>
        )
    }
}

class Buttons extends React.Component {
    render() {
        return (
            <div className="ui buttons">
                {this.props.children}
            </div>
        )
    }
}

// şimdilik bu kısım component tarzı değil, sonradan düzeltirim
class Img extends React.Component {
    render() {
        return(
            <div>
                <img id="productImg" className="ui image" src={this.props.src}></img>
            </div>
        )
    }
}

class MiniImage extends React.Component {
    render() {
        return (
            <div className="ui small image">
                <img src={this.props.src} />
            </div>
        )
    }
}

class MiniImagesWrapper extends React.Component {
    render() {
        return(
            <Center>
                <MiniImage src="https://cdn.shoplightspeed.com/shops/613622/files/8420157/image.jpg" />
                <MiniImage src="http://3.bp.blogspot.com/-uC4SEk9v07I/UyVCeORCsdI/AAAAAAAAA-k/6xZx0EVnCMc/s1600/iphone+5s+rep.jpg" />
                <MiniImage src="https://i.ytimg.com/vi/2jDd8iPIuEc/maxresdefault.jpg" />
                <MiniImage src="https://i.ytimg.com/vi/kLg__oZYfG8/maxresdefault.jpg" />
                <MiniImage src="http://3.bp.blogspot.com/-uC4SEk9v07I/UyVCeORCsdI/AAAAAAAAA-k/6xZx0EVnCMc/s1600/iphone+5s+rep.jpg" />
            </Center>
        )
    }
}


class Menu extends React.Component {
    render() {
        return(
            <div id="menu" className="ui teal inverted menu">
                <a className="active item">
                    Ana Sayfa
                </a>
                <a className="item">
                    Takip
                </a>
                <a className="item">
                    Hesap
                </a>
            </div>
        )
    }
}

class Menu2 extends React.Component {
    render() {
        return(
            <div id="menu" class="ui icon inverted menu">
  <a class="item">
    <i class="icon">
        <i class="fa fa-home" aria-hidden="true"></i>
    </i>
  </a>
  <a class="item">
    <i class="icon">
        <i class="fa fa-user" aria-hidden="true"></i>
    </i>
  </a>
  <a class="item">
    <i class="icon">
        <i class="fa fa-bug" aria-hidden="true"></i>
    </i>
  </a>
</div>
        )
    }
}

class Menu3 extends React.Component {
    render() {
        return(
            <div id="menu" className="ui secondary  menu">
    <div id="hesap" class="ui button">
        <i class="user icon"></i> Hesap
    </div>
</div>
        )
    }
}


class Logo extends React.Component {
    render() {
        return(
            <div id="logo">
                <H type="1" text="Yorumlaa" />
            </div>
        )
    }
}

class SearchBar extends React.Component {
    render() {
        return(
<div id="search" className="ui search">
  <input className="prompt" type="text" placeholder="Ara..." />
</div>
        )
    }
}

class BreadCrumb extends React.Component {
    render() {
        return(
            <Row>
                <WideColumn size="one" />
                <WideColumn size="fourteen">
                    <div className="ui breadcrumb">
                        <a className="section">Elektronik</a>
                        <i className="right angle icon divider"></i>
                        <a className="section">Mobil Cihazlar</a>
                        <i className="right angle icon divider"></i>
                        <div className="active section">Iphone</div>
                    </div>
                </WideColumn>
            </Row>
        )
    }
}

class ProductHeader extends React.Component {
    render() {
        return (
            <H type="1" textAlign="center" text="iphone 5s"/>
        )
    }
}

class FollowButton extends React.Component {
    render() {
        return(
            <Row size="one">
                <Column>
                    <FloatRight>
                        {/*
                            takip etmediği zaman classNamedeki "red" i kaldırıcaz
                        */}
                        <div className="ui labeled button" tabindex="0">
                            <div className="ui red button">
                                <i className="heart icon"></i> Takip Et
                            </div>
                            <a className="ui basic red left pointing label">
                                1,048
                            </a>
                        </div>
                    </FloatRight>
                </Column>
            </Row>
        )
    }
}
            //<div className="ui right floated button">Butoncuk</div>

class Example extends React.Component {
    render() {
        return(
            <Row size="">
                <Column>
                    <div className="overflowX">
                        Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı 1500'lerden beri endüstri standardı sahte metinler olarak kullanılmıştır. Beşyüz yıl boyunca varlığını sürdürmekle kalmamış, aynı zamanda pek değişmeden elektronik dizgiye de sıçramıştır. 1960'larda Lorem Ipsum pasajları da içeren Letraset yapraklarının yayınlanması ile ve yakın zamanda Aldus PageMaker gibi Lorem Ipsum sürümleri içeren masaüstü yayıncılık yazılımları ile popüler olmuştur.
                    </div>
                </Column>
            </Row>
        )
    }
}

class OverfloX extends React.Component {
    render() {
        return(
            <div className="overflowX">
                {this.props.children}
            </div>
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
            <button class="ui basic button">
                <i class="icon">
                    <i class={"fa fa-thumbs-up" + this.liked} aria-hidden="true"></i>
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
            <button class="ui basic button">
                <i class="icon">
                    <i class={"fa fa-thumbs-down" + this.liked} aria-hidden="true"></i>
                </i>
                {this.props.value}
            </button>
        )
    }
}


class ComplaintButton extends React.Component {
    render() {
        return (
            <button class="ui basic button">
                <i id="exclamation" class="fa fa-exclamation" aria-hidden="true"></i>
            </button>
        )
    }
}


class Categories extends React.Component {
    render(){
        return(
            <div id="categories">
                <button class=" big ui button">Elektronik</button>
                <button class=" big ui  button">Giyim</button>
                <button class=" big ui  button">Mobilya</button>
                <button class=" big ui  button">Gıda</button>
                <button class=" big ui  button">Ofis</button>
                <button class=" big ui  button">Kozmetik</button>
                <button class=" big ui  button">Kitap</button>
            </div>
        )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Header />
                <Content />
                <Footer />
            </div>
        )
    }
}

class Header extends React.Component {
    render() {
        return(
            <header>
                <Row withoutContainer={true} size="one">
                    <Column>
                        <Row>
                            <WideColumn size="four">
                                <Logo />
                            </WideColumn>
                            <WideColumn size="eight">
                                <SearchBar />
                            </WideColumn>
                            <WideColumn size="four">
                                <FloatRight>
                                    <Menu3 />
                                </FloatRight>
                            </WideColumn>
                        </Row>
                    </Column>
                </Row>
                <Row withoutContainer={true} size="one">
                    <Column>
                        <Center size="sixteen">
                            <Categories />
                        </Center>
                    </Column>
                </Row>
            </header>
        )
    }
}

class Content extends React.Component {
    render() {
        return(
            <div id="content">
                <BreadCrumb />
                <ProductHeader />
                <FollowButton />
                <Product />
                <Comments />
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
                    <button class="disabled ui button">{i + 1}</button>
                )
            } else {
                this.buttons.push(
                    <button class="ui button">{i + 1}</button>
                )
            }
        }
    }
    render() {
        return(
            <div class="small blue ui buttons">
                {this.buttons}
            </div>
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
                    burası rating alanı
                </WideColumn>
            </Row>
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

class Comments extends React.Component {
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
                />
                <Comment
                    commentOwner="RTE_53"
                    commentText="Eyyy kılıçdar sen kimsin yaa!!"
                    likeValue="9912312312"
                    dislikeValue="912"
                    likeOrDislike="dislike"
                />
                <Comment
                    commentOwner="ByKemal31"
                    commentText="Derhal burayı terket kardeşim"
                    likeValue="321312412"
                    dislikeValue="91"
                />
                <Comment
                    commentOwner="Deniz_Baykal_07"
                    commentText="Benim ne işim var burda amq"
                    likeValue="999999999999"
                    dislikeValue="-1231"
                />
                <PageNumber />
                <WriteComment />
            </div>
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
                        <div className="commentHeader">
                            <H type="4" text={this.props.commentOwner} />
                        </div>
                        <div className="commentText">
                            <p>
                                {this.props.commentText}
                            </p>
                        </div>
                        <Row size="one">
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

class SendButton extends React.Component {
    render() {
        return (
            <button class="ui primary button">
                Gönder
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
                        <Row>
                            <Column>
                                <div className="ui form">
                                    <div className="field">
                                        <label>Yorum Yaz</label>
                                        <textarea rows="5"></textarea>
                                    </div>
                                </div>
                            </Column>
                        </Row>
                        <Row>
                            <Column>
                                <FloatRight>
                                    <SendButton />
                                </FloatRight>
                            </Column>
                        </Row>
                    </Segment>
                </Column>
            </Row>
        )
    }
}

class Footer extends React.Component {
    render() {
        return(
            <div>

            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
