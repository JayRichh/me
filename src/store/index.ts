import { toggleAndInitializeScene } from "../helpers/gameUtils";
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
    toggleGameMode(state) {
      state.gameMode = !state.gameMode;
      toggleAndInitializeScene(state.gameMode, {
        container: document.getElementById("three-container") as HTMLElement,
        vueComponents: [document.getElementById("navbar") as HTMLElement],
        clientCubes: {},
        hudElement: document.getElementById("hud-element") as HTMLElement,
        focusItem: state.focusItem,
      });
    },
  },
  actions: {},
  modules: {},
});
