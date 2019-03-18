import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict:process.env.NODE_ENV !== 'production',
  state() {
    return {
      user: null,
    }
  },
  mutations: {
    user: (state, user) => {
      state.user = user
    }
  }
})

export default store