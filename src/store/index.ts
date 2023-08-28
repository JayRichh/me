import { toggleAndInitializeScene } from "../helpers/gameUtils";
import { createStore } from "vuex";

export default createStore({
  state: {
    gameMode: false,
    focusItem: "default",
    hudElement: null,
  },
  getters: {},
  mutations: {
    toggleControls(state) {
      state.gameMode = !state.gameMode;
    },
    setFocusItem(state, focusItem) {
      state.focusItem = focusItem;
    },
    setHUD(state, hudElement) {
      state.hudElement = hudElement;
    },
  },
  actions: {},
  modules: {},
});
