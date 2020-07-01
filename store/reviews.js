const state = () => {
  return {
    reviews: null,
    totalreviews: 0
  }
}

const mutations = {
  SET_REVIEWS: (state, reviews) => {
    state.reviews = reviews
  },
  SET_TOTAL_REVIEWS: (state, totalreviews) => {
    state.totalreviews = totalreviews
  }
}

const actions = {
  setReviews ({ commit }, reviews) {
    commit('SET_REVIEWS', reviews ? reviews.data.data : [])
    commit('SET_TOTAL_REVIEWS', reviews.data.total[0]['COUNT(1)'] || 0)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
