const state = () => {
  return {
    active: false
  }
}

const mutations = {
  SET_ACTIVE: (state, boolean) => {
    state.active = boolean
  }
}

const actions = {
  toggleModal ({ commit }, boolean) {
    commit('SET_ACTIVE', boolean)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
