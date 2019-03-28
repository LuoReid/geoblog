import { $fetch } from "../plugins/fetch";

let fetchPostsUid = 0

export default {
  namespaced: true,
  state() {
    return {
      draft: null,
      mapBounds: null,
      posts: [],
      selectedPostId: null,
    }
  },
  getters: {
    draft: state => state.draft,
    posts: state => state.posts,
    selectedPost: state => state.posts.find(p => p._id === state.selectedPostId),
    currentPost: (state, getters) => state.draft || getters.selectedPost,
  },
  mutations: {
    addPost(state, value) {
      state.posts.push(value)
    },
    draft(state, value) {
      state.draft = value
    },
    posts(state, { posts, mapBounds }) {
      state.posts = posts
      state.mapBounds = mapBounds
    },
    selectedPostId(state, value) {
      state.selectedPostId = value
    },
    updateDraft(state, value) {
      Object.assign(state.draft, value)
    },
  },
  actions: {
    clearDraft({ commit }) {
      commit('draft', null)
    },
    createDraft({ commit }) {
      commit('draft', {
        title: '',
        content: '',
        position: null,
        placeId: null,
      })
    },
    setDraftLocation({ dispatch, getters }, { position, placeId }) {
      if (!getters.draft) {
        dispatch('createDraft')
      }
      dispatch('updateDraft', { position, placeId })
    },
    updateDraft({ dispatch, commit, getters }, draft) {
      commit('updateDraft', draft)
    },
    async createPost({ commit, dispatch }, draft) {
      const data = { ...draft, position: draft.position.toJSON() }
      const result = await $fetch('posts/new', { method: 'POST', body: JSON.stringify(data) })
      dispatch('clearDraft')
      commit('addPost', result)
      dispatch('selectPost', result._id)
    },
    async selectPost({ commit }, id) {
      commit('selectedPostId', id)
      //get blog detail 
    },
    async fetchPost({ commit, state }, { mapBounds, force }) {
      let oldBounds = state.mapBounds
      if (force || !oldBounds || !oldBounds.equals(mapBounds)) {
        const requestId = ++fetchPostsUid
        const ne = mapBounds.getNorthEast()
        const sw = mapBounds.getSouthWest()
        const query = `posts ne=${encodeURIComponent(ne.toUrlValue())}&sw=${encodeURIComponent(sw.toUrlValue())}`
        const posts = await $fetch(query)
        if (requestId === fetchPostsUid) {
          commit('posts', { posts, mapBounds })
        }
      }
    },
    setBounds({ dispatch }, value) {
      dispatch('posts/fetchPosts', { mapBounds: value }, { root: true })
    },
  }
}