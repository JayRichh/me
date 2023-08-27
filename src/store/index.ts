import { createStore } from "vuex";

export default createStore({
  state: {
    gameMode: false,
  },
  getters: {},
  mutations: {
    toggleGameMode(state) {
      state.gameMode = !state.gameMode;
    },
  },
  actions: {},
  modules: {},
});
