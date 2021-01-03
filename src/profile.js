class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form:"normal", // normal, loading, notFound
            settingAreaVisible:false,
            followedProductsVisible:false,
            username:"",
            slug:"",
            owner:false
        }
        // setting elementary funcs
        this.openSetting = this.openSetting.bind(this);
        this.closeSetting = this.closeSetting.bind(this);
        this.toggleSetting = this.toggleSetting.bind(this);
        // followedProducts elementary funcs
        this.openFollowedProducts = this.openFollowedProducts.bind(this);
        this.closeFollowedProducts = this.closeFollowedProducts.bind(this);
        this.toggleFollowedProducts = this.toggleFollowedProducts.bind(this);
        // set form loading / normal
        this.setFormLoading = this.setFormLoading.bind(this);
        this.setFormNormal = this.setFormNormal.bind(this);
    }
    componentDidMount() {
        this.setFormLoading();
        const userslug = getPathNames()[1];
        fetch(SITEURL + 'api/member?' + getUrlPar({
            slug:userslug,
            sortBy: "like",     // !! only now
            pageNumber:1,       // !! only now
            onlyComment:false
        }), {method: 'GET'}).then((response)=>{
            if(!response.ok) throw new Error(response.status);
            else return response.json();
        }).then((json)=> {
            this.setState({
                username:json.other.member.username,
                slug:json.other.member.slug,
                owner:json.other.member.owner
            });
            this.setFormNormal();
        }).catch((error) => {
            if(error.message==404) {
                this.setState({form:"notFound"});
            }
        });
    }
    openSetting() {
        this.closeFollowedProducts();
        this.setState({settingAreaVisible:true});
    }
    closeSetting() {
        this.setState({settingAreaVisible:false});
    }
    toggleSetting() {
        if(this.state.settingAreaVisible)
            this.closeSetting();
        else
            this.openSetting();
    }
    openFollowedProducts() {
        this.closeSetting();
        this.setState({followedProductsVisible:true})
    }
    closeFollowedProducts() {
        this.setState({followedProductsVisible:false})
    }
    toggleFollowedProducts() {
        if(this.state.followedProductsVisible)
            this.closeFollowedProducts();
        else
            this.openFollowedProducts();
    }
    setFormLoading() {
        this.setState({ form:"loading" });
    }
    setFormNormal() {
        this.setState({ form:"normal" });
    }
    render() {
        if(this.state.form=="normal") {
            return(
                <div>
                    <EmailValidation validated={true}/>
                    <ProfileHeader
                        changeContent={this.props.changeContent}
                        memberUsername={this.state.username}
                    />
                    <OwnerButtons
                        owner={this.state.owner}
                        settingButton={this.toggleSetting}
                        followedProductsButton={this.toggleFollowedProducts}
                    />
                    <SettingArea
                        visible={this.state.settingAreaVisible}
                        close={this.closeSetting}
                    />
                    <FollowedProductsArea
                        visible={this.state.followedProductsVisible}
                        close={this.closeFollowedProducts}
                        changeContent={this.props.changeContent}
                    />
                    <ProfileComments />
                </div>
            )
        } else if(this.state.form=="loading") {
            return(<RowLoadingSpin nonSegment={true} />)
        } else if(this.state.form=="notFound") {
            return(
                <Row size="one">
                    <Column>
                        <div className="ui negative huge message">
                            <div className="header">
                                404
                            </div>
                            <p>Böyle bir profil yok</p>
                        </div>
                    </Column>
                </Row>
            )
        }
    }
}

class FollowedProductsArea extends React.Component {
    render()  {
        if(this.props.visible) {
            return(
                <div>
                    <Row size="two" nonStackable={true}>
                        <Column>
                            <h3 className="ui header yorumkutusu-header">Takipteki Ürünler</h3>
                        </Column>
                        <Column>
                            <FloatRight>
                                <CancelButton handleCancelButton={this.props.close}/>
                            </FloatRight>
                        </Column>
                    </Row>
                    <Row>
                        <Column>
                             <FollowedProductsTable
                                changeContent={this.props.changeContent}
                            /> 
                           {/* <FollowedProductsLabels /> */}
                        </Column>
                    </Row>
                </div>
            )
        } else {
            return ""
        }
    }
}

class FollowedProductsTable extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            form:"normal", // normal, loading
            info: [
                {
                    productID:0,
                    productSlug:"iphone-5s", 
                    productName:"Iphone 5s",
                    newComment: "5"
                },
                {
                    productID:2,
                    productSlug:"mahmut-efendi-kahveleri", 
                    productName:"Mahmut Efendi Kahveleri",
                    newComment: "5"
                },
                {
                    productID:0,
                    productSlug:"starBucks-sumatra", 
                    productName:"StarBucks Sumatra",
                    newComment: "99"
                }
            ]
        }
    }
    render() {
        if(this.state.form=="normal") {
            this.tr = [];
            for(let i=0;i<this.state.info.length;i++) {
                this.tr.push(
                    <tr>
                        <td data-label={this.state.info[i].productSlug}>
                            <FollowedProductsCell
                                changeContent={this.state.changeContent}
                                slug={this.state.info[i].productSlug}
                                name={this.state.info[i].productName}
                            />
                        </td>
                        <td>{this.state.info[i].newComment}</td>
                    </tr>
                )
            }
            return (
                <table className="ui inverted table">
                  <thead>
                    <tr><th>Takipteki Ürün</th>
                    <th>Yeni Yorum</th>
                  </tr></thead>
                  <tbody>
                    {this.tr}
                  </tbody>
                </table>
            )
        } else if(this.state.form=="loading") {
            return (
                <RowLoadingSpin nonSegment={true} />
            )
        }
    }
}

class FollowedProductsCell extends React.Component {
    constructor(props){
        super(props);
        this.goProduct = this.goProduct.bind(this);
    }
    goProduct(e) {
        e.preventDefault();
        this.props.changeContent(SITEURL + 'urun/' + this.props.slug);
    }
    render() {
        return(
            <div>
                <a className="yorumkutusu-a" href={SITEURL + 'urun/' + this.props.slug} onClick={this.goProduct}>{this.props.name}</a>
            </div>
        )
    }
}

class FollowedProductsLabels extends React.Component {
    render() {
        return(
            <div>
                <Row size="one">
                    <Column>
                        <div className="ui label">
                            IPhone 5s
                            <div className="detail">99</div>
                        </div>
                    </Column>
                </Row>
                <Row size="one">
                    <Column>
                        <div className="ui label">
                            Mahmut Efendi Kahveleri
                            <div className="detail">12</div>
                        </div>
                    </Column>
                </Row>
                <Row size="one">
                    <Column>
                        <div className="ui label">
                            Startbucks Sumatra
                            <div className="detail">0</div>
                        </div>
                    </Column>
                </Row>
            </div>
        )
    }
}

class ProfileHeader extends React.Component {
    render() {
        return (
            <Row size="one">
                <Column>
                    <Row>
                        <Column>
                            <Center>
                                <h1 className="ui header yorumkutusu-header">{this.props.memberUsername}</h1>
                            </Center>
                        </Column>
                    </Row>
                </Column>
            </Row>
        )
    }
}

class ProfileComments extends React.Component {
    render() {
        return (
            <div></div>
        )
    }
}

class OwnerButtons extends React.Component {
    render() {
        if(this.props.owner) {
            return (
                <div>
                    <Center>
                    <button className="ui small teal button" onClick={this.props.followedProductsButton}>
                        <i className="icon">
                            <i className="fa fa-cube" aria-hidden="true"></i>
                        </i>
                        Takipteki Ürünler
                    </button> 
                    <button className="ui small teal button" onClick={this.props.settingButton}>
                        <i className="icon">
                            <i className="fa fa-cog" aria-hidden="true"></i>
                        </i>
                        Ayarlar
                    </button> 
                    </Center>
                </div>
            )
        } else {
            return("")
        }
    }
}

class SettingArea extends React.Component {
    render() {
        if(this.props.visible) {
            return(
                <Row size="one">
                    <Column>
                        <Row size="two" nonStackable={true}>
                            <Column>
                                <h2 className="ui header yorumkutusu-header">Ayarlar</h2>
                            </Column>
                            <Column>
                                <FloatRight>
                                    <CancelButton handleCancelButton={this.props.close}/>
                                </FloatRight>
                            </Column>
                        </Row>
                        <Row size="sixteen">
                            <WideColumn size="one"></WideColumn>
                            <WideColumn size="fourteen">
                                <h3 className="ui header yorumkutusu-header">Hesap</h3>
                                <ProfileSettings />
                            </WideColumn>
                        </Row>
                    </Column>
                </Row>
            )
        } else {
            return("")
        }
    }
}

class ProfileSettings extends React.Component {
    render() {
        return(
            <Row size="one">
                <Column>
                    <Row size="two">
                        <Column>
                            <ChangeEmail />
                        </Column>
                        <Column>
                            <ChangePassword />
                        </Column>
                    </Row>
                </Column>
            </Row>
        )
    }
}

class ChangeEmail extends React.Component {
    constructor(props) {
        super(props);
        this.emailInputs = [
            {
                name:"E-posta",
                state:"email"
            },
            {
                name:"Yeni E-posta",
                state:"newEmail1"
            },
            {
                name:"Yeni E-posta Tekrar",
                state:"newEmail2"
            }
        ]
        this.state = {
            form:"normal",
            email:"",
            newEmail1:"",
            newEmail2:"",
            password:"",
            formMessageOnlyText:false,
            formMessageType:"",
            formMessageHeader:"",
            formMessageTextArr:[]
        }
        this.send = this.send.bind(this);
        this.changedSuccessfully = this.changedSuccessfully.bind(this);
        this.checkInputs = this.checkInputs.bind(this);
        this.changeEmailInput = this.changeEmailInput.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.setFormMessageList = this.setFormMessageList.bind(this);
        this.setFormMessageText = this.setFormMessageText.bind(this);
        this.setLoading = this.setLoading.bind(this);
        this.setNormal = this.setNormal.bind(this);
    }
    send() {
        if(this.checkInputs()) {
            this.setLoading();
            //this.changedSuccessfully();
            //this.failed(401);
            //this.failed(400);
            //this.failed(422, 3);
            //this.failed(422, 1);
            //this.failed(403);
            //this.failed(400);
        }
    }
    changedSuccessfully() {
        this.setFormMessageText("success", "Başarılı!", "Onay için yeni e-postanızı kontrol ediniz");
    }
    failed(type, subType) {
        if(type==401) {
            this.setFormMessageText("error", "Başarısız!", "Parolanız doğru değil");
        } else if(type==500) {
            this.setFormMessageText("error", "Başarısız!", "Beklenmedik bir hata oldu");
        } else if(type==422 && subType==3) {
            this.setFormMessageText("error", "Başarısız!", "Bu e-posta geçersiz");
        } else if(type==422 && subType==1) {
            this.setFormMessageText("error", "Başarısız!", "Bu e-posta kullanımda");
        } else if(type==403) {
            this.setFormMessageText("error", "Başarısız!", "Bu işlem için yetkiniz yok");
        } else if(type==400) {
            this.setFormMessageText("error", "Başarısız!", "Bu istek geçersiz");
        }
    }
    checkInputs() {
        let errors = [];
        // email
        for(let i=0;i<this.emailInputs.length;i++) {
            if(!validateEmail(this.state[this.emailInputs[i].state])) {
                errors.push(this.emailInputs[i].name + " geçersiz");
            }
        }
        if(this.state.newEmail1!=this.state.newEmail2) {
            errors.push("Yeni e-posta tekrarı ile aynı değil");
        }
        if(this.state.password.length<10 || this.state.password.length>40) {
            errors.push("Geçersiz parola");
        }
        if(errors.length) {
            this.setFormMessageList("error", "Başarısız", errors);
            return false;
        }
        return true;
    }
    changeEmailInput(e) {
        if(e.target.name=="email") {
            this.setState({
                email:e.target.value
            });
        } else if(e.target.name=="newEmail1") {
            this.setState({
                newEmail1:e.target.value
            });
        } else if(e.target.name=="newEmail2") {
            this.setState({
                newEmail2:e.target.value
            });
        }
    }
    changePassword(e){
        this.setState({
            password:e.target.value
        });
    }
    setFormMessageList(type, header, arr) {
        this.setState({
            formMessageOnlyText:false,
            formMessageType:type,
            formMessageHeader:header,
            formMessageTextArr:arr
        });
    }
    setFormMessageText(type, header, text) {
        this.setState({
            formMessageOnlyText:true,
            formMessageType:type,
            formMessageHeader:header,
            formMessageTextArr:text
        })
    }
    setLoading() {
        this.setState({
            form:"loading"
        });
    }
    setNormal() {
        this.setState({
            form:"normal"
        });
    }
    render() {
        if(this.state.form=="normal") {
            return(
                <div>
                    <h4 className="ui header yorumkutusu-header">E-posta Değiştir</h4>
                    <form className="ui form">
                        <FormField
                            labelText={this.emailInputs[0].name}
                            inputType="email"
                            inputName={this.emailInputs[0].state}
                            inputValue={this.state.email}
                            inputChange={this.changeEmailInput}
                            inputPlaceholder={this.emailInputs[0].name}
                        />
                        <FormField
                            labelText={this.emailInputs[1].name}
                            inputType="email"
                            inputName={this.emailInputs[1].state}
                            inputValue={this.state.newEmail1}
                            inputChange={this.changeEmailInput}
                            inputPlaceholder={this.emailInputs[1].name}
                        />
                        <FormField
                            labelText={this.emailInputs[2].name}
                            inputType="email"
                            inputName={this.emailInputs[2].state}
                            inputValue={this.state.newEmail2}
                            inputChange={this.changeEmailInput}
                            inputPlaceholder={this.emailInputs[2].name}
                        />
                        <FormField
                            labelText="Parola"
                            inputType="password"
                            inputName="password"
                            inputValue={this.state.password}
                            inputChange={this.changePassword}
                            inputPlaceholder="Parola"
                        />
                        {(this.state.formMessageType)?
                            <FormMessageList
                                onlyText={this.state.formMessageOnlyText}
                                header={this.state.formMessageHeader}
                                mix={this.state.formMessageTextArr}
                                type={this.state.formMessageType}
                            />:""}
                        <FloatRight>
                            <FormButton text="Değiştir" onClickHandler={this.send}/>
                        </FloatRight>
                    </form>
                </div>
            )
        } else if (this.state.form=="loading") {
            return (
                <RowLoadingSpin nonSegment={true}/>
            )
        }
    }
}

class FormField extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className="field">
                <label className="yorumkutusu-label">{this.props.labelText}</label>
                <input className="yorumkutusu-input" name={this.props.inputName} type={this.props.inputType} value={this.props.inputValue} onChange={this.props.inputChange} placeholder={this.props.inputPlaceholder}/>
            </div>
        )
    }
}

class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form:"normal", // normal, loading
            password:"",
            newPassword1:"",
            newPassword2:"",
            formMessageOnlyText:false,
            formMessageType:"",
            formMessageHeader:"",
            formMessageTextArr:[]
        }
        this.changedSuccessfully = this.changedSuccessfully.bind(this);
        this.failed = this.failed.bind(this);
        this.setFormMessageList = this.setFormMessageList.bind(this);
        this.setFormMessageText = this.setFormMessageText.bind(this);
        this.send = this.send.bind(this);
        this.checkInputs = this.checkInputs.bind(this);
        this.changeInput = this.changeInput.bind(this);
    }
    changedSuccessfully() {
        this.setFormMessageText("success", "Başarılı!", "Parolanız başarılı bir şekilde değiştirildi");
    }
    failed(type) {
        if(type==401) {
            this.setFormMessageText("error", "Başarısız!", "Parolanız doğru değil");
        } else if(type==500) {
            this.setFormMessageText("error", "Başarısız!", "Beklenmedik bir hata oldu");
        } else if(type==403) {
            this.setFormMessageText("error", "Başarısız!", "Bu işlem için yetkiniz yok");
        } else if(type==400) {
            this.setFormMessageText("error", "Başarısız!", "Bu istek geçersiz");
        }
    }
    setFormMessageList(type, header, arr) {
        this.setState({
            formMessageOnlyText:false,
            formMessageType:type,
            formMessageHeader:header,
            formMessageTextArr:arr
        });
    }
    setFormMessageText(type, header, text) {
        this.setState({
            formMessageOnlyText:true,
            formMessageType:type,
            formMessageHeader:header,
            formMessageTextArr:text
        })
    }
    send() {
        if(this.checkInputs()) {
            this.changedSuccessfully();
            //this.failed(401);
            //this.failed(500);
            //this.failed(403);
            //this.failed(400);
        }
    }
    checkInputs() {
        const inputsInfo = ["password", "newPassword1", "newPassword2"];
        let errors = [];
        for(let i=0;i<inputsInfo.length;i++) {
            if(this.state[inputsInfo[i]].length < 10 || this.state[inputsInfo[i]].length > 40) {
                errors.push("Parolanın uzunluğu 10 ile 40 karakter arasında olmalı");
                break;
            }
        }
        if(this.state.newPassword1!=this.state.newPassword2) {
            errors.push("Yeni parola tekrarı ile aynı değil");
        }
        if(errors.length) {
            this.setFormMessageList("error", "Başarısız!", errors);
            return false;
        }
        return true;
    }
    changeInput(e) {
        if(e.target.name=="password") {
            this.setState({ password:e.target.value });
        } else if(e.target.name=="newPassword1") {
            this.setState({ newPassword1: e.target.value });
        } else if(e.target.name=="newPassword2") {
            this.setState({ newPassword2: e.target.value });
        }
    }
    render() {
        if(this.state.form=="normal") {
            return(
                <div>
                    <h4 className="ui header yorumkutusu-header">Parola Değiştir</h4>
                    <form className="ui form">
                        <FormField
                            labelText="Parola"
                            inputType="password"
                            inputName="password"
                            inputValue={this.state.password}
                            inputChange={this.changeInput}
                            inputPlaceholder="Parola"
                        />
                        <FormField
                            labelText="Yeni Parola"
                            inputType="password"
                            inputName="newPassword1"
                            inputValue={this.state.newPassword1}
                            inputChange={this.changeInput}
                            inputPlaceholder="Yeni Parola"
                        />
                        <FormField
                            labelText="Yeni Parola Tekrar"
                            inputType="password"
                            inputName="newPassword2"
                            inputValue={this.state.newPassword2}
                            inputChange={this.changeInput}
                            inputPlaceholder="Yeni Parola Tekrar"
                        />
                        {(this.state.formMessageType)?
                            <FormMessageList
                                onlyText={this.state.formMessageOnlyText}
                                header={this.state.formMessageHeader}
                                mix={this.state.formMessageTextArr}
                                type={this.state.formMessageType}
                            />:""}
                        <FloatRight>
                            <FormButton text="Değiştir" onClickHandler={this.send}/>
                        </FloatRight>
                    </form>
                </div>
            )
        } else if(this.state.form="loading") {
            return(<RowLoadingSpin nonSegment={true} />)
        }
    }
}

class FormMessageList extends React.Component {
    // this.props.type = info, error, success, warning
    render() {
        if(!this.props.onlyText) {
            this.li = [];
            for(let i=0;i<this.props.mix.length;i++) {
                this.li.push(
                    <li key={i}>{this.props.mix[i]}</li>
                )
            }
        }
        return(
            <div className={"ui "+this.props.type+" message yorumkutusu-form-message"}>
                <div className="header">{this.props.header}</div>
            {(this.props.onlyText)?
                <p>{this.props.mix}</p>                
                :<ul className="list">
                    {this.li}
                </ul>
            }
            </div>
        )
    }
}

class FormButton extends React.Component {
    constructor(props) {
        super(props);
        this.click = this.click.bind(this);
    }
    click(e) {
        e.preventDefault();
        this.props.onClickHandler();
    }
    render() {
        this.buttonColor = (this.props.color)?this.props.color:"green";
        this.disabled = (this.props.disabled)?"disabled":"";
        return (
            <button className={"ui "+this.buttonColor+" button " + this.disabled} onClick={this.click}>{this.props.text}</button>
        )
    }
}

