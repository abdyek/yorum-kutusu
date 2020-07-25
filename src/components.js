function setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
  
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

class RowLoading extends React.Component {
    render() {
        return(
            <Row size="one">
                <Column>
                    <Center>
                        <Loading />
                    </Center>
                </Column>
            </Row>
        )
    }
}

class Loading extends React.Component {
    render() {
        return(<div className="lds-dual-ring"></div>);
    }
}

/* bu bütün sayfalarda kullanılabilecek bir bileşendir */
class Container extends React.Component {
    render() {
        return(
            <div className="ui container">
                {this.props.children}
            </div>
        )
    }
}

/* bu bütün sayfalarda kullanılabilecek bir bileşendir */
class Segment extends React.Component {
    render() {
        return(
            <div className="ui segment">
                {this.props.children}
            </div>
        )
    }
}

/* bu bütün sayfalarda kullanılabilecek bir bileşendir */
class RaisedSegment extends React.Component {
    render() {
        return(
            <div className="ui raised segment">
                {this.props.children}
            </div>
        )
    }
}

/* bu bütün sayfalarda kullanılabilecek bir bileşendir */
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


/* bu bütün sayfalarda kullanılabilecek bir bileşendir */
class Column extends React.Component {
    render() {
        return(
            <div className="column">
                {this.props.children}
            </div>
        )
    }
}

/* bu bütün sayfalarda kullanılabilecek bir bileşendir */
class WideColumn extends React.Component {
    render() {
        return(
            <div className={this.props.size + " wide column"}>{this.props.children}</div>
        )
    }
}

/* bu bütün sayfalarda kullanılabilecek bir bileşendir */
class H extends React.Component {
    constructor(props) {
        super(props);
        this.textAlign = "";
        if(this.props.textAlign=="center") {
            this.textAlign = " center aligned ";
        }
        if(!this.props.optional) {
            this.optional = "";
        } else {
            this.optional = this.props.optional;
        }
    }
    render() {
        if(this.props.type=="1") {
            return (
                <h1 className={"ui "+this.textAlign+" header " + this.optional}>{this.props.text}</h1>
            )
        } else if(this.props.type=="2") {
            return (
                <h2 className={"ui "+this.textAlign+" header " + this.optional}>{this.props.text}</h2>
            )
        } else if(this.props.type=="3") {
            return (
                <h3 className={"ui "+this.textAlign+" header " + this.optional}>{this.props.text}</h3>
            )
        } else if(this.props.type=="4") {
            return (
                <h4 className={"ui "+this.textAlign+"header " + this.optional}>{this.props.text}</h4>
            )
        } else if(this.props.type=="5") {
            return (
                <h5 className={"ui "+this.textAlign+"header " + this.optional}>{this.props.text}</h5>
            )
        }
    }
}

/* bu bütün sayfalarda kullanılabilecek bir bileşendir */
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

/* bu bütün sayfalarda kullanılabilecek bir bileşendir */
class Hx extends React.Component {
    // size -> huge, large, medium, small, tiny
    render() {
        return(
            <div className={"ui "+this.props.size+" header"}>{this.props.text}</div> 
        )
    }
}

/* bu bütün sayfalarda kullanılabilecek bir bileşendir */
class FloatRight extends React.Component {
    render() {
        return(
            <div className="floatRight">{this.props.children}</div>
        )
    }
}

/* bu bütün sayfalarda kullanılabilecek bir bileşendir */
class Button extends React.Component {
    render() {
        return(
            <button className={"ui "+this.props.type+" button"}>
                {this.props.text}
            </button>
        )
    }
}

/* bu bütün sayfalarda kullanılabilecek bir bileşendir */
class Buttons extends React.Component {
    render() {
        return (
            <div className="ui buttons">
                {this.props.children}
            </div>
        )
    }
}



/* bu bütün sayfalarda kullanılabilecek bir bileşendir */
class Logo extends React.Component {
    render() {
        return(
            <div id="logo">
                <H type="1" text="Yorum Kutusu" />
            </div>
        )
    }
}

// bunlar 2 sayfada bulunduğu için componentJS'ye taşınmasını uygun buldum
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
class ComplaintButton extends React.Component {
    render() {
        return (
            <button className="ui basic button">
                <i id="exclamation" className="fa fa-exclamation" aria-hidden="true"></i>
            </button>
        )
    }
}
// ^ bunlar 2 sayfada bulunduğu için componentJS'ye taşınmasını uygun buldum

class LoadingSpin extends React.Component {
    render() {
        return(
            <div>
                <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
            </div>
        )
    }
}

class RowLoadingSpin extends React.Component {
    render() {
        if(this.props.nonSegment) {
            return(
                <Row size="one">
                    <Column>
                        <Center>
                            <LoadingSpin />
                        </Center>
                    </Column>
                </Row>
            )
        } else {
            return(
                <Row size="one">
                    <Column>
                        <RaisedSegment>
                            <Center>
                                <LoadingSpin />
                            </Center>
                        </RaisedSegment>
                    </Column>
                </Row>
            )
        }
    }
}

class BasicMessage extends React.Component {
    constructor(props) {
        super(props);
        if(this.props.type=="success") {
            this.className = "ui blue message";
        } else if(this.props.type=="warning") {
            this.className = "ui yellow message";
        } else if(this.props.type=="danger") {
            this.className = "ui red message";
        }
    }
    render() {
        return(
            <div className={this.className}>{this.props.text}</div>
        )
    } 
}