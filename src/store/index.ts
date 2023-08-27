import { createStore } from "vuex";

export default createStore({
  state: {
    gameMode: false,
    hud: null,
  },
  getters: {},
  mutations: {
    toggleControlsMode(state) {
      state.gameMode = !state.gameMode;
    },
    setHUD(state, hud) {
      state.hud = hud;
    },
  },
  actions: {},
  modules: {},
});
