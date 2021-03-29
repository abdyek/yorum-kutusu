Vue.component('container', {
    template: `
        <div class='ui container'>
            <slot></slot>
        </div>
    `
});

Vue.component('row',{
    props: {
        stackable:{
            type:Boolean,
            default:true
        },
        size: {
            type:String,
            default:"one"
        }
    },
    template: `
        <container>
            <div :class="['ui', {'stackable': stackable} ,size, 'column grid']">
                <slot></slot>
            </div>
        </container>
    `
});

Vue.component('column', {
    props: {
        size: {
            type:String,
            default:"none"
        }
    },
    template: `
        <div :class="[(this.size!=='none' ?this.size+ ' wide':''),'column']">
            <slot></slot>
        </div>
    `
});

Vue.component('center', {
    template:`
        <div class="ui column stackable center aligned page grid">
            <slot></slot>
        </div>
    `
});

Vue.component('float-right', {
    template:`
        <div class="floatRight">
            <slot></slot>
        </div>
    `
});

Vue.component('customable-button', {
    props: {
        type:{
            type:String,
            default:""
        },
        name:{
            type:String,
            default:"name"
        }
    },
    template:`
        <div :class="['ui', type, 'button']" @click="$emit('handleClick')">
            {{name}}
        </div>
    `
});

Vue.component('basic-message', {
    props: {
        color:{
            type:String,
            default:""
        },
        message: {
            type:String,
            default:"message"
        }
    },
    template:`
        <div :class="['ui', color,' message']">{{message}}</div>
    `
});

Vue.component('loading', {
    template: `
        <div id="loading">Yükleniyor...</div>
    `
});

