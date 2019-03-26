import Vue from 'vue'
import Vuex from 'vuex'

import $fetch from '../plugins/fetch'
import router from '../router';

import maps from './maps'
import posts from './posts'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state() {
    return {
      user: null,
    }
  },
  mutations: {
    user: (state, user) => {
      state.user = user
    }
  },
  getters: {
    user: state => state.user,
    userPicture: (state, getters) => {
      const user = getters.user
      if (user) {
        const photos = user.profile.photos
        if (photos && photos.length !== 0) {
          return photos[0].value
        }
      }
    },
  },
  actions: {
    async  login({ commit }) {
      // try {
      //   const user = await $fetch('user')
      //   console.log(user)
      //   commit('user', user)
      //   if (user) {
      //     router.replace(router.currentRoute.params.wantedRoute || { name: 'home' })
      //   }
      // } catch (e) {
      //   console.warn(e)
      // }
      const userData = {
        profile: {
          displayName: 'Mr Cat',
        },
      }
      commit('user', userData)
    },
    logout({ commit }) {
      commit('user', null)
      $fetch('logout')
      if (router.currentRoute.matched.some(r => r.meta.private)) {
        router.replace({ name: 'login', params: { wantedRoute: router.currentRoute.fullPath } })
      }
      //commit('user', null)
    },
    async init({ dispatch }) {
      await dispatch('login')
    }
  },

  modules: {
    maps, posts,
  },
})

export default store