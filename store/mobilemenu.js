const state = () => {
  return {
    active: false,
    isMobile: false
  }
}

const mutations = {
  SET_ACTIVE: (state, boolean) => {
    state.active = boolean
  },
  SET_DETECT: (state, boolean) => {
    state.isMobile = boolean
  }
}

const actions = {
  switchMobileMenu ({ commit }, boolean) {
    commit('SET_ACTIVE', boolean)
  },
  mobileDetect ({ commit }, boolean) {
    commit('SET_DETECT', boolean)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
