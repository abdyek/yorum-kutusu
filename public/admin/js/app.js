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
            password:""
        }
    },
    methods: {
        ...Vuex.mapActions([
            'setEntered',
            'setLoading',
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
                this.setLoading(false);
            }).catch((error)=>{
                if(error.message==401) {
                    
                }
            });
        }
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
    template: `
        <div>
            <row>
                <column>
                    <h1>{{name}}</h1>
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
    template: `
        <task-wrapper name="Yorum İstekleri">
            yorum istekleri buraya gelecek
        </task-wrapper>
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
                    <h2>{{username}}</h2>
                    <h3>{{email}}</h3>
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
