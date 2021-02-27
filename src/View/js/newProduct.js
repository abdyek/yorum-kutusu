class NewProduct extends React.Component {
    componentDidMount() {
        if(!isMember()) {
            this.props.changeContent('giris-yap', true);
        }
    }
    render() {
	document.title = "Yeni Ürün Oluştur";
        return (
            <div>
                <Row size="one">
                    <Column>
                        <H type="1" text="Yeni Ürün Oluştur" id={"newProductHeader"} textAlign={"center"}/>
                    </Column>
                </Row>
                <ProductEditor changeContent={this.props.changeContent} />
            </div>
        )
    }
}

class ProductEditor extends React.Component {
    constructor(props) {
        super(props);
        const productName = this.props.productName || "";
        const productSlug = this.constProductSlug = generateProductSlug(productName) || "";
        const tags = this.props.tags || [];
        this.state = {
            form:"normal", // normal, created, loading, updated
            productName:productName,
            productSlug:productSlug,
            productInputLoading:"",
            productAvailable: false,
            emptyProductNameWarn: false,
            tags:tags,
            reponseVisible:false,
            responseHeader:"",
            responseMessage:"",
            responseType:""
        };
        this.updateProductName = this.updateProductName.bind(this);
        this.setProductInputLoading = this.setProductInputLoading.bind(this);
        this.loadInfo = this.loadInfo.bind(this);
        this.clickSearchResult = this.clickSearchResult.bind(this);
        this.goProduct = this.goProduct.bind(this);
        this.addTag = this.addTag.bind(this);
        this.addNewTag = this.addNewTag.bind(this);
        this.sortTags = this.sortTags.bind(this);
        this.closeTag = this.closeTag.bind(this);
        this.createEditButton = this.createEditButton.bind(this);
        this.createProduct = this.createProduct.bind(this);
        this.editProduct = this.editProduct.bind(this);
    }
    updateProductName(e) {
        this.setState({
            productName:e.target.value,
            productSlug:generateProductSlug(e.target.value)
        });
        clearTimeout(this.setTime);
        if(e.target.value.length) {
            this.setTime = setTimeout(function() {
                this.setProductInputLoading(true);
                this.loadInfo();
            }.bind(this), 1000);
        }
    }
    setProductInputLoading(value) {
        const str = (value)?"loading":"";
        this.setState({
            productInputLoading: str
        });
    }
    loadInfo() {
        if(this.props.editMode===true) {
            this.apiPar = {
                'productName':this.state.productName,
                'exception': this.constProductSlug
            };
        } else {
            this.apiPar = {
                'productName':this.state.productName,
            };
        }
        fetch(SITEURL + 'api/newProductChecker?' + getUrlPar(this.apiPar), {method: 'GET'}).then((response)=>{
            if(!response.ok) throw new Error(response.status);
            else return response.json();
        }).then((json)=>{
            let available;
            if(json.available) {
                available=true;
            } else {
                available=false;
            }
            this.setState({
                productAvailable:available,
                productSlug:json.slug,
                productInputLoading:"",
            });
        }).catch((error) => {
            if(error.message==404) {
                
            }
        });
    }
    goProduct() {
        this.props.changeContent(SITEURL+"urun/"+this.state.productSlug);
    }
    clickSearchResult(obj) {
        this.addTag(obj);
    }
    addTag(obj) {
        const tags = [...this.state.tags];
        for(let i=0;i<tags.length;i++) {
            if(obj.id==tags[i].id) 
                return;
        }
        tags.push({
            id:obj.id,
            slug: obj.slug,
            name: obj.name,
            passive: obj.passive,
            newTag:(obj.newTag==undefined)?false:true
        });
        this.setState({
            tags:this.sortTags(tags)
        });
    }
    addNewTag(name, index) {
        this.addTag({
            id:"n"+index,
            slug:generateProductSlug(name),
            name:name,
            newTag:true
        });
    }
    sortTags(tags) {
        const sortedTags = [];
        for(let type=0;type<3;type++) {
            for(let i=0;i<tags.length;i++) {
                if(type==0) {
                    if(tags[i].passive==true) {
                        sortedTags.push(tags[i]);
                    }
                } else if(type==1) {
                    if(tags[i].passive==false) {
                        sortedTags.push(tags[i]);
                    }
                } else if(type==2) {
                    if(tags[i].passive==undefined) {
                        sortedTags.push(tags[i]);
                    }
                }
            }
        }
        return sortedTags;
    }
    closeTag(id) {
        const tags = this.state.tags.filter(function(tag) {
            if(tag.id!=id) 
                return tag
        });
        this.setState({
            tags:tags
        });
    }
    createEditButton() {
        if(this.state.productName.length == 0) {
            this.setState({
                emptyProductNameWarn:true
            });
            return;
        }
        if(this.props.editMode===true) {
            this.editProduct();
        } else {
            this.createProduct();
        }
    }
    createProduct() {
        this.setState({
            form:"loading"
        });
        fetch(SITEURL + 'api/newProduct', {
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productName:this.state.productName,
                tags:normalizer('tags-for-product-changing', this.state.tags)
            })
        }).then((response)=>{
            if(!response.ok) throw new Error(response.status);
            else return response.json();
        }).then((json)=>{
            this.setState({
                form:"created"
            });
        }).catch((error)=>{
            if(error.message==400) {
                this.setState({
                    form:"normal",
                    responseVisible:true,
                    responseHeader:error.message,
                    responseMessage:"Geçersiz istek..",
                    responseType:"negative"
                });
            } else if(error.message==422) {
                this.setState({
                    form:"normal",
                    responseVisible:true,
                    responseHeader:error.message,
                    responseMessage:"Böyle bir ürün ya da etiket zaten mevcut",
                    responseType:"negative"
                });
            } else if(error.message==404) {
                this.setState({
                    form:"normal",
                    responseVisible:true,
                    responseHeader:error.message,
                    responseMessage:"Eklemeye çalıştığınız etiket mevcut değil",
                    responseType:"negative"
                });
            } else if(error.message==403) {
                this.setState({
                    form:"normal",
                    responseVisible:true,
                    responseHeader:error.message,
                    responseMessage:"Yetkiniz yok! Başka bir sekmede çıkış yapmış olabilirsiniz. Lütfen giriş yapmayı deneyin.",
                    responseType:"negative"
                });
            }
        });
    }
    editProduct() {
        this.setState({
            form:"loading"
        });
        fetch(SITEURL + 'api/updateProduct', {
            method: 'PATCH',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productID:this.props.productID,
                productNewName:this.state.productName,
                tags:normalizer('tags-for-product-changing', this.state.tags)
            })
        }).then((response)=>{
            if(!response.ok) throw new Error(response.status);
            else return response.json();
        }).then((json)=>{
            this.setState({
                form:"updated"
            });
        }).catch((error)=>{
            if(error.message==400) {
                this.setState({
                    form:"normal",
                    responseVisible:true,
                    responseHeader:error.message,
                    responseMessage:"Geçersiz istek..",
                    responseType:"negative"
                });
            } else if(error.message==422) {
                this.setState({
                    form:"normal",
                    responseVisible:true,
                    responseHeader:error.message,
                    responseMessage:"Böyle bir ürün ya da etiket zaten mevcut",
                    responseType:"negative"
                });
            } else if(error.message==404) {
                this.setState({
                    form:"normal",
                    responseVisible:true,
                    responseHeader:error.message,
                    responseMessage:"Eklemeye çalıştığınız etiket ya da ürün mevcut değil",
                    responseType:"negative"
                });
            } else if(error.message==403) {
                this.setState({
                    form:"normal",
                    responseVisible:true,
                    responseHeader:error.message,
                    responseMessage:"Yetkiniz yok! Başka bir sekmede çıkış yapmış olabilirsiniz. Lütfen giriş yapmayı deneyin.",
                    responseType:"negative"
                });
            }
        });
    }
    render() {
        if(this.state.form=="normal") {
            return(
                <div>
                    <Row size="sixteen">
                        <WideColumn size="one"></WideColumn>
                        <WideColumn size="fourteen">
                            <Row size="one">
                                <Column>
                                    <h3 className="hStandart">Ürün Adı</h3>
                                    <div className={"ui form "+this.state.productInputLoading+" newProductForm"}>
                                        <div className="field">
                                            <label id="productSlugLabel">urun/{this.state.productSlug}</label>
                                            <input type="text" onChange={this.updateProductName} value={this.state.productName} placeholder="Ürün İsimi" />
                                        </div>
                                    </div>
                                </Column>
                            </Row>
                            {(this.state.productAvailable)?
                                <div>
                                    <Row size="one">
                                        <Column>
                                            <BasicMessageWithColor color={"yellow"} message="Bu ürün mevcut" />
                                        </Column>
                                    </Row>
                                    <Row size="one">
                                        <Column>
                                            <Center>
                                                <Button type="huge green" name="Ürün Sayfasına Git" click={this.goProduct}/>
                                            </Center>
                                        </Column>
                                    </Row>
                                </div>:
                                <div>
                                    <Row size="one">
                                        <Column>
                                            <h1 id="newProductPreviewHeader"> {this.state.productName} </h1>
                                        </Column>
                                    </Row>
                                    <TagSelector
                                        tags={this.state.tags}
                                        closeFunc={this.closeTag}
                                        tagSearchInput={this.state.tagSearchInput}
                                        clickSearchResult={this.clickSearchResult}
                                        addNewTag={this.addNewTag}
                                    />
                                    {(this.state.emptyProductNameWarn)?
                                        <div>
                                            <Row>
                                                <Column>
                                                    <BasicMessageWithColor color="yellow" message={"İsimsiz ürün oluşturamazsınız!"}/>
                                                </Column>
                                            </Row>
                                        </div>:""
                                    }
                                    {(this.state.responseVisible)?
                                        <div>
                                            <Row>
                                                <Column>
                                                    <Message header={this.state.responseHeader} message={this.state.responseMessage} type={this.state.responseType}/>
                                                </Column>
                                            </Row>
                                        </div>:""
                                    }
                                    <Row size="one">
                                        <Column>
                                            <FloatRight>
                                                <Button type="large green" name={(this.props.editMode===true)?"Düzenle":"Oluştur"} click={this.createEditButton}/>
                                            </FloatRight>
                                        </Column>
                                    </Row>
                                </div>
                            }
                        </WideColumn>
                        <WideColumn size="/one"></WideColumn>
                    </Row>
                </div>
            )
        } else if(this.state.form=="created") {
            return (
                <Row size="one">
                    <Column>
                        <Message header="Katkı Sağladığınız İçin Teşekkürler" message="Başarılı bir şekilde gönderildi. Yönetici onayından sonra ürün görüntülenebilir olacak."/>
                    </Column>
                </Row>
            )
        } else if(this.state.form=="loading") {
	    document.title = "Teşekkürler";
            return (
                <Row size="one">
                    <Column>
                        <RowLoadingSpin nonSegment={true} />
                    </Column>
                </Row>
            )
        } else if(this.state.form=="updated") {
	    document.title = "Teşekkürler";
            return (
                <Row size="one">
                    <Column>
                        <Message header="Düzenleme Yaparak Katkı Sağladığınız İçin Teşekkürler" message="Başarılı bir şekilde gönderildi. Yönetici onayından sonra ürün güncellenecektir."/>
                    </Column>
                </Row>
            )
        }
    }
}

class TagSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tagSearchInput:"",
            addNewTagButtonVisible:false,
        };
        this.newTagIndex = 0;
        this.changeTagSearchInput = this.changeTagSearchInput.bind(this);
        this.prepareTags = this.prepareTags.bind(this);
        this.checkAvailableTag = this.checkAvailableTag.bind(this);
        this.addNewTag = this.addNewTag.bind(this);
    }
    changeTagSearchInput(value) {
        this.setState({
            tagSearchInput:value,
            addNewTagButtonVisible:false
        });
    }
    prepareTags() {
        let color;
        this.tags = [];
        for(let i=0;i<this.props.tags.length;i++) {
            color = (this.props.tags[i].passive)?"grey":"orange";
            if(this.props.tags[i].newTag) {
                color = "teal";
            }
            this.tags.push(
                <TagWithClose key={this.props.tags[i].id} id={this.props.tags[i].id} color={color} name={this.props.tags[i].name} closeFunc={this.props.closeFunc} />
            )
        }
    }
    checkAvailableTag(available) {
        const notAvailable = !available;
        let visible = true;
        if(available) {
            visible = false;
        } else {
            for(let i=0;i<this.props.tags.length;i++) {
                if(this.props.tags[i].name.toLowerCase()==this.state.tagSearchInput.toLowerCase()) {
                    visible = false;
                    break;
                }
            }
        }
        this.setState({
            addNewTagButtonVisible:visible
        });
    }
    addNewTag() {
        this.props.addNewTag(this.state.tagSearchInput, this.newTagIndex);
        this.newTagIndex++;
        this.setState({
            addNewTagButtonVisible: false,
            tagSearchInput:""
        });
    }
    render() {
        this.prepareTags();
        return (
            <div>
                <Row size="one">
                    <Column>
                        <SearchBarForTag
                            tagSearchInput={this.state.tagSearchInput}
                            changeTagSearchInput={this.changeTagSearchInput}
                            click={this.props.clickSearchResult}
                            checkAvailableTag={this.checkAvailableTag}
                        />
                    </Column>
                </Row>
                <Row size="one">
                    <Column>
                        {this.tags}
                    </Column>
                </Row>
                {(this.state.addNewTagButtonVisible)?
                    <div>
                        <Row size="one">
                            <Column>
                                <BasicMessageWithColor message="Böyle bir etiket yok" color="yellow" />
                            </Column>
                        </Row>
                        <Row size="one">
                            <Column>
                                <Center>
                                    <Button name="Yeni Etiket Olarak Ekle" type="teal" click={this.addNewTag}/>
                                </Center>
                            </Column>
                        </Row>
                    </div>
                    :""
                }
            </div>
        )
    }
}

class TagWithClose extends React.Component {
    constructor(props) {
        super(props);
        this.close = this.close.bind(this);
    }
    close() {
        this.props.closeFunc(this.props.id);
    }
    render() {
        this.color = this.props.color || "";
        return (
            <div className="TagWithClose">
                <a className={"ui "+this.color+" large label"}>
                    {this.props.name}
                </a>
                <i className="icon" onClick={this.close} >
                    <i className="fa fa-times" aria-hidden="true"></i>
                </i>
            </div>
        )
    }
}
