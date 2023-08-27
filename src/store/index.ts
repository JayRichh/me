import { createStore } from "vuex";

export default createStore({
  state: {
    gameMode: false,
    hud: null,
  },
  getters: {},
  mutations: {
    toggleGameMode(state) {
      state.gameMode = !state.gameMode;
    },
    setHUD(state, hud) {
      state.hud = hud;
    },
  },
  actions: {},
  modules: {},
});
