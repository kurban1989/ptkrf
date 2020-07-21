const state = () => {
  return {
    active: false,
    activeCar: false
  }
}

const mutations = {
  SET_ACTIVE: (state, boolean) => {
    state.active = boolean
  },
  SET_ACTIVE_CAR: (state, boolean) => {
    state.activeCar = boolean
  }
}

const actions = {
  toggleModal ({ commit }, boolean) {
    commit('SET_ACTIVE', boolean)
  },
  toggleModalCar ({ commit }, boolean) {
    commit('SET_ACTIVE_CAR', boolean)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
