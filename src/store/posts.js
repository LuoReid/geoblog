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
      selectedPostDetails: null,
    }
  },
  getters: {
    draft: state => state.draft,
    posts: state => state.posts,
    selectedPost: state => state.posts.find(p => p._id === state.selectedPostId),
    currentPost: (state, getters) => state.draft || getters.selectedPost,
    selectedPostDetails: state => state.selectedPostDetails,
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
    selectedPostDetails(state, value) {
      state.selectedPostDetails = value
    },
    addComment(state, { post, comment }) {
      post.comments.push(comment)
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
    // logout({ commit }) {
    //   commit('posts', { posts: [], mapBounds: null })
    // }
    logout: {
      handle({ commit }) {
        commit('posts', { posts: [], mapBounds: null })
      }, root: true,
    },
    'logged-in': {
      handle({ dispatch, state }) {
        if (state.mapBounds) {
          dispatch('fetchPosts', { mapBounds: state.mapBounds, force: true })
        }
        if (state.selectedPostId) {
          dispatch('selectPost', state.selectedPostId)
        }
      }, root: true,
    },
    async selectPost({ commit }, id) {
      commit('selectedPostDetails', null)
      commit('selectedPostId', id)
      const details = await $fetch(`posts/${id}`)
      commit('selectedPostDetails', details)
    },
    unselectPost({ commit }) {
      commit('selectedPostId', null)
    },
    async sendComment({ commit, rootGetters }, { post, comment }) {
      const user = rootGetters.user
      commit('addComment', {
        post, comment: {
          ...comment,
          date: new Date(),
          user_id: user._id,
          author: user,
        }
      })
      await $fetch(`posts/${post._id}/comment`, { method: 'POST', body: JSON.stringify(comment) })
    }
  }
}