
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
class Image extends React.Component {
    render() {
        return(
            <div>
                <img id="productImg" className=" ui image" src="https://gigaom.com/wp-content/uploads/sites/1/2013/09/iphone5s_3color_ios7_print-2.jpg"></img>
            </div>
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
            //<div className="ui right floated button">Butoncuk</div>

class Example extends React.Component {
    render() {
        return(
            <div className="floatRight">Butoncuk</div>
        )
    }
}

class LikeButton extends React.Component {
    render() {
        return(
            <button class="ui basic button">
                <i class="icon">
                    <i class="fa fa-thumbs-up" aria-hidden="true"></i>
                </i>
                {this.props.value}
            </button>
        )
    }
}

class DislikeButton extends React.Component {
    render() {
        return(
            <button class="ui basic button">
                <i class="icon">
                    <i class="fa fa-thumbs-down" aria-hidden="true"></i>
                </i>
                {this.props.value}
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

