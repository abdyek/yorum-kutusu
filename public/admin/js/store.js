Vue.use(Vuex);

const state = {
    entered:false,
    loading:true,
    username:'',
    email:'',
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
};

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});
