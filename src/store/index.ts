import { createStore } from "vuex";

export default createStore({
  state: {
    gameMode: false,
    focusItem: "home",
    hud: null,
  },
  getters: {},
  mutations: {
    setFocusItem(state, focusItem) {
      state.focusItem = focusItem;
    },
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
