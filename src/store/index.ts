import { createStore } from "vuex";

export default createStore({
  state: {
    gameMode: false,
    focusItem: "default",
  },
  mutations: {
    toggleControls(state) {
      state.gameMode = !state.gameMode;
    },
    setFocusItem(state, focusItem) {
      state.focusItem = focusItem;
    },
  },
});
