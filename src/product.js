class Content extends React.Component {
    render() {
        return(
            <div>
                <Product />
                <Comments />
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
                        [buraya etiketler gelecek]
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
    render() {
        return(
            <div>
                <Row size="one">
                    <Column>
                        <Segment>
                            <TopOfComment text={this.props.text} userName={this.props.userName}/>
                            <BottomOfComment likeCount={this.props.likeCount} liked={this.props.liked} date={this.props.date}/>
                        </Segment>
                    </Column>
                </Row>
            </div>
        )
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
                                <ReportButton />
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
    render() {
        return (
            <button className="ui icon button">
                <i className="icon">
                    <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
                </i>
            </button>
        )
    }
}

class ReportArea extends React.Component {
    render() {
        return(
            <div>
                burası report area
            </div>
        )
    }
}