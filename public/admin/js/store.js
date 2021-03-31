Vue.use(Vuex);

const state = {
    entered:false,
    loading:true,
    username:'',
    email:'',
    message:"",
    newTags:{},
};

const getters = {
    
};

const mutations = {
    setEntered(state, value) {
        state.entered = value;
    },
    setLoading(state, value) {
        state.loading = value;
    },
    setUsername(state, value) {
        state.username = value;
    },
    setEmail(state, value) {
        state.email = value;
    },
    setMessage(state, value) {
        state.message = value;
    },
    addNewTag(state, object) {
        if(!state.newTags[object['id']]) {
            state.newTags[object['id']] = {};
        }
        state.newTags[object['id']][object['slug']] = false;
    },
    setNewTagPassiveActive(state, object) {
        state.newTags[object['id']][object['slug']] = object['value'];
    }
};

const actions = {
    setEntered({commit}, value) {
        commit('setEntered', value);
    },
    setLoading({commit}, value) {
        commit('setLoading', value);
    },
    setUsername({commit}, value) {
        commit('setUsername', value);
    },
    setEmail({commit}, value) {
        commit('setEmail', value);
    },
    setMessage({commit}, value) {
        commit('setMessage', value);
    },
    addNewTag({commit}, object) {
        commit('addNewTag', object);
    },
    setNewTagPassiveActive({commit}, object) {
        commit('setNewTagPassiveActive', object);
    },
};

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});
