Vue.component('testing', {
    template: `
    <div>
        <row size='sixteen'>
            <column size="ten">
 Yaygın inancın tersine, Lorem Ipsum rastgele sözcüklerden oluşmaz. Kökleri M.Ö. 45 tarihinden bu yana klasik Latin edebiyatına kadar uzanan 2000 yıllık bir geçmişi vardır. Virginia'daki Hampden-Sydney College'dan Latince profesörü Richard McClintock, bir Lorem Ipsum pasajında geçen ve anlaşılması en güç sözcüklerden biri olan 'consectetur' sözcüğünün klasik edebiyattaki örneklerini incelediğinde kesin bir kaynağa ulaşmıştır. Lorm Ipsum, Çiçero tarafından M.Ö. 45 tarihinde kaleme alınan "de Finibus Bonorum et Malorum" (İyi ve Kötünün Uç Sınırları) eserinin 1.10.32 ve 1.10.33 sayılı bölümlerinden gelmektedir. Bu kitap, ahlak kuramı üzerine bir tezdir ve Rönesans döneminde çok popüler olmuştur. Lorem Ipsum pasajının ilk satırı olan "Lorem ipsum dolor sit amet" 1.10.32 sayılı bölümdeki bir satırdan gelmektedir. 
            </column>
            <column size="six">
             Yaygın inancın tersine, Lorem Ipsum rastgele sözcüklerden oluşmaz. Kökleri M.Ö. 45 tarihinden bu yana klasik Latin edebiyatına kadar uzanan 2000 yıllık bir geçmişi vardır. Virginia'daki Hampden-Sydney College'dan Latince profesörü Richard McClintock, bir Lorem Ipsum pasajında geçen ve anlaşılması en güç sözcüklerden biri olan 'consectetur' sözcüğünün klasik edebiyattaki örneklerini incelediğinde kesin bir kaynağa ulaşmıştır. Lorm Ipsum, Çiçero tarafından M.Ö. 45 tarihinde kaleme alınan "de Finibus Bonorum et Malorum" (İyi ve Kötünün Uç Sınırları) eserinin 1.10.32 ve 1.10.33 sayılı bölümlerinden gelmektedir. Bu kitap, ahlak kuramı üzerine bir tezdir ve Rönesans döneminde çok popüler olmuştur. Lorem Ipsum pasajının ilk satırı olan "Lorem ipsum dolor sit amet" 1.10.32 sayılı bölümdeki bir satırdan gelmektedir. 
            </column>
        </row>
        <row>
            <column>
                <center>
                    <h1>Tam orta</h1>
                </center>
            </column>
        </row>
        <row size="two">
            <column>
                <float-right>
                    buton tarzı ufak şeyler olsaydı sağa yaslanırdı burası
                </float-right>
            </column>
            <column>
                ayşe
            </column>
        </row>
        <row>
            <column>
                <basic-message color="pink" message="bu bir mesajdır"></basic-message>
            </column>
        </row>
    </div>
    `
});

Vue.component('login', {
    data: function() {
        return {
            email:"",
            password:"",
        }
    },
    computed: {
        ...Vuex.mapState([
            'message'
        ]),
    },
    methods: {
        ...Vuex.mapActions([
            'setEntered',
            'setLoading',
            'setUsername',
            'setEmail',
            'setMessage',
        ]),
        login() {
            this.setLoading(true);
            fetch(SITEURL + 'api/loginAsAdmin', {
                method: 'POST',
                header: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: this.email,
                    password:this.password
                })
            }).then((response)=>{
                if(!response.ok) throw new Error(response.status);
                else return response.json();
            }).then((json)=>{
                this.setEntered(true);
                this.setUsername(json.username);
                this.setEmail(json.email);
                this.setLoading(false);
            }).catch((error)=>{
                this.setLoading(false);
                this.setMessage("Bir hata oldu : " +error.message);
            });
        },
    },
    template: `
        <div>
            <row size="sixteen">
                <column size="four"></column>
                <column size="eight">
                    <row>
                        <column>
                            <h1 class="textAlignCenter">Yönetici Girişi</h1>
                        </column>
                    </row>
                    <row v-if="this.message.length">
                        <column>
                            {{this.message}}
                        </column>
                    </row>
                    <row>
                        <column>
                            <form class="ui form">
                                <div class="field">
                                    <label>E-posta</label>
                                    <input type="text" name="email" placeholder="E-posta" v-model="email">
                                </div>
                                <div class="field">
                                    <label>Parola</label>
                                    <input type="password" name="password" placeholder="Parola" v-model="password">
                                </div>
                                <float-right>
                                    <customable-button type="yellow" name="Giriş Yap" @handleClick="login">
                                    </customable-button>
                                </float-right>
                            </form>
                        </column>
                    </row>
                </column>
                <column size="four"></column>
            </row>
        </div>
    `
});

Vue.component('all-task', {
    template: `
        <div>
            <comment-request></comment-request>
            <product-request></product-request>
        </div>
    `
});

Vue.component('task-wrapper', {
    props:{
        name: {
            type:String,
            default:"name"
        },
    },
    methods: {
        load() {
            this.$emit('handleLoad');
        }
    },
    template: `
        <div>
            <row size="two">
                <column>
                    <h2>{{name}}</h2>
                </column>
                <column>
                    <float-right>
                        <customable-button type="teal" name="Yükle" @handleClick="load"></customable-button>
                    </float-right>
                </column>
            </row>
            <row>
                <column>
                    <slot></slot>
                </column>
            </row>
        </div>
    `
});

Vue.component('comment-request', {
    data: function() {
        return {
            commentRequest: [],
            empty:false,
            message:"",
        };
    },
    methods: {
        load() {
            fetch(SITEURL + 'api/commentRequest', {method: 'GET'}).then((response)=>{
                if(!response.ok) throw new Error(response.status);
                else return response.json();
            }).then((json)=> {
                if(json.other.request.length) {
                    this.commentRequest = json.other.request;
                    this.message = "";
                } else {
                    this.message = "(yok)";
                }
            }).catch((error) => {
                this.message = "Bir hata oldu :" + error.messagek
            });
        }
    },
    template: `
        <task-wrapper name="Yorum İstekleri" @handleLoad="load">
            <row v-if="this.message.length">
                <column>
                    <center><h2>{{message}}</h2></center>
                </column>
            </row>
            <comment-request-line v-for="request in commentRequest" :member="request.member" :key="request.id" :id="request.id" :product="request.product" :comment="request.comment">
            </comment-request-line>
        </task-wrapper>
    `
});

Vue.component('comment-request-line', {
    props:['id', 'member', 'product', 'comment'],
    data: function() {
        return {
            note:"Teşekkürler",
            message:""
        }
    },
    methods: {
        decision(allow) {
            fetch(SITEURL + 'api/commentRequest', {
                method: 'POST',
                header: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    commentRequestID:this.id,
                    allow: allow,
                    adminNote: this.note
                })
            }).then((response)=>{
                if(!response.ok) throw new Error(response.status);
                else return response.json();
            }).then((json)=>{
                this.setMessage("Başarılı");
            }).catch((error)=>{
                this.setMessage("Bir hata oldu :" + error.message);
            });
        },
        setMessage(message) {
            this.message = message;
        }
    },
    template: `
        <div>
            <div v-if="this.message.length">
                {{message}}
            </div>
            <div v-else class="margin-top-bottom-2rem">
                <h3>{{id}}</h3>  
                <b>Üye</b>
                <div>{{member.username}} ({{member.slug}} - {{member.email}})</div>
                <b>Ürün</b>
                <div>{{product.name}} ({{product.slug}})</div>
                <b>Yorum</b>
                <div>id : {{comment.id}}<br/> {{comment.text}} <br/> {{comment.dateTime}} </div>
                <row>
                    <column>
                        <textarea v-model="note"></textarea>
                    </column>
                </row>
                <row size="two">
                    <column>
                        <customable-button name="Onayla" type="green" @handleClick="decision(true)"></customable-button>
                    </column>
                    <column>
                        <float-right>
                            <customable-button name="Reddet" type="red" @handleClick="decision(false)"></customable-button>
                        </float-right>
                    </column>
                </row>
                <br />
            </div>
        </div>
    `
});

Vue.component('product-request', {
    data: function() {
        return {
            productRequest: [],
            message:""
        }
    },
    methods: {
        load() {
            fetch(SITEURL + 'api/productApproval', {method: 'GET'}).then((response)=>{
                if(!response.ok) throw new Error(response.status);
                else return response.json();
            }).then((json)=> {
                if(json.other.productRequest.length) {
                    this.productRequest = json.other.productRequest;
                    this.message = "";
                } else {
                    this.message = "(yok)";
                }
            }).catch((error) => {
                this.message = "Bir hata oldu :" + error.messagek
            });
        }
    },
    template: `
        <task-wrapper name="Ürün İstekleri" @handleLoad="load">
            <row v-if="this.message.length">
                <column>
                    <center><h2>{{message}}</h2></center>
                </column>
            </row>
            <product-request-line v-for="request in productRequest" :key="request.request.id" :request="request"></product-request-line>
        </task-wrapper>
    `
});

Vue.component('product-request-line', {
    props:{
        request: {
            type:Object,
            default:Object(),
        },
    },
    computed: {
        ...Vuex.mapState([
            'newTags'
        ]),
    },
    data: function() {
        return {
            message:"",
            success:false,
        }
    },
    methods: {
        allow() {
            console.log(this.newTags);
            fetch(SITEURL + 'api/productApproval', {
                method: 'POST',
                header: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productRequestID: this.request.request.id,
                    newTags:this.newTags[this.request.request.id],
                })
            }).then((response)=>{
                if(!response.ok) throw new Error(response.status);
                else return response.json();
            }).then((json)=>{
                this.message="";
                this.success=true;
            }).catch((error)=>{
                this.message = "Bir hata oldu: " + error.message;
            });
        },
        deny() {
            fetch(SITEURL + 'api/productApproval', {
                method: 'DELETE',
                header: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productRequestID: this.request.request.id,
                })
            }).then((response)=>{
                if(!response.ok) throw new Error(response.status);
                else return response.json();
            }).then((json)=>{
                this.message="";
                this.success=true;
            }).catch((error)=>{
                this.message = "Bir hata oldu: " + error.message;
            });
        }
    },
    template: `
        <div class="margin-top-bottom-2rem">
            <div v-if="success">
                Başarılı
            </div>
            <div v-else>
                <div v-if="message.length">
                    <basic-message :message="message"></basic-message>
                </div>
                <h3>{{request.request.id}}</h3>
                <b>Üye</b>
                <div>{{request.member.username}} ({{request.member.slug}} - {{request.member.email}})</div>
                <b>İstek Türü: {{request.request.type}}</b>
                <div v-if="request.request.type==='new'">
                    <b>name: </b>{{request.newProduct.name}}<br/>
                    <b>slug: </b>{{request.newProduct.slug}}<br/>
                </div>
                <div v-else>
                    <b>id: </b>{{request.availableProduct.id}}<br />
                    <b>name: </b>{{request.availableProduct.name}}==><b>{{request.update.name}}</b><br />
                    <b>slug: </b>{{request.availableProduct.slug}}==><b>{{request.update.slug}}</b><br />
                </div>
                <div><b>Etiketler</b></div>
                <tag-area v-for="twp in request.tagWithProduct" :key="twp.twpRequestID" :twp="twp" :requestId="request.request.id"></tag-area>
                <row size="two">
                    <column>
                        <customable-button type="green" name="Onayla" @handleClick="allow"></customable-button>
                    </column>
                    <column>
                        <float-right>
                            <customable-button type="red" name="Reddet" @handleClick="deny"></customable-button>
                        </float-right>
                    </column>
                </row>
            </div>
        </div>
    `
});

Vue.component('tag-area', {
    props: {
        twp: {
            type:Object,
        },
        requestId: {
            type:String
        },
    },
    data: function() {
        return {
            passive:false
        };
    },
    methods: {
        ...Vuex.mapActions([
            'addNewTag',
            'setNewTagPassiveActive',
        ]),
        makeActive() {
            this.setNewTagPassiveActive({
                'id':this.requestId,
                'slug':this.twp.newTag.slug,
                'value':false
            });
            this.passive = false;
        },
        makePassive() {
            this.setNewTagPassiveActive({
                'id':this.requestId,
                'slug':this.twp.newTag.slug,
                'value':true
            });
            this.passive = true;
        }
    },
    created() {
        if(this.twp.type==='new') {
            this.addNewTag({
                'id': this.requestId,
                'slug': this.twp.newTag.slug
            });
        }
    },
    template:`
        <div class="padding-left-2rem margin-top-bottom-2rem">
            <b>Tür:</b>{{twp.type}}
            <div v-if="twp.type==='available'">
                <b>id:</b>{{twp.tag.id}}<br/>
                <b>name:</b>{{twp.tag.name}}<br/>
                <b>slug:</b>{{twp.tag.slug}}<br/>
                <b>passive:</b>{{twp.tag.passive}}<br/>
            </div>
            <div v-else>
                <b>name:</b>{{twp.newTag.name}}<br/>
                <b>slug:</b>{{twp.newTag.slug}}<br/>
                <div v-if="this.passive">
                    <customable-button name="Pasif" type="orange" @handleClick="makeActive"></customable-button>
                </div>
                <div v-else>
                    <customable-button name="Aktif" type="green" @handleClick="makePassive"></customable-button>
                </div>
            </div>
        </div>
    `
});

Vue.component('admin-info', {
    computed: {
        ...Vuex.mapState([
            'username',
            'email'
        ]),
    },
    template: `
        <div>
            <row size="two">
                <column>
                    <h2>{{username}} ({{email}})</h2>
                </column>
                <column>
                    <logout></logout>
                </column>
            </row>
        </div>
    `
});

Vue.component('logout', {
    methods: {
        ...Vuex.mapActions([
            'setLoading',
            'setEntered',
        ]),
        logout() {
            this.setLoading(true);
            fetch(SITEURL + 'api/logout', {
                method: 'POST',
                header: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ })
            }).then((response)=>{
                if(!response.ok) throw new Error(response.status);
                else return response.json();
            }).then((json)=>{ 
                this.setEntered(false);
                this.setLoading(false);
            })
        }
    },
    template:`
        <div>
            <float-right>
                <customable-button name="Çıkış Yap" type="red" @handleClick="logout"></customable-button>
            </float-right>
        </div>
    `
});

new Vue({
    el:'#app',
    computed: {
        ...Vuex.mapState([
            'entered',
            'loading',
        ]),
    },
    methods: {
        ...Vuex.mapActions([
            'setEntered',
            'setLoading',
            'setUsername',
            'setEmail',
        ]),
    },
    mounted() {
        fetch(SITEURL + 'api/who', {
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ })
        }).then((response)=>{
            if(!response.ok) throw new Error(response.status);
            else return response.json();
        }).then((json)=>{
            if(json.other.who==='admin') {
                this.setEntered(true);
                this.setUsername(json.other.admin.username);
                this.setEmail(json.other.admin.email);
            } else {
                this.setEntered(false);
            }
            this.setLoading(false);
        }).catch((error)=>{});
    },
    store
});
