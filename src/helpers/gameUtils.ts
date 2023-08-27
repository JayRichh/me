import { createOrbitScene } from '../client/scenes/createOrbitScene';
import { setFixedView  } from '../client/scenes/createFixedScene';
import { Store } from 'vuex';

export const isGameModeToggled = (gameMode: boolean, threeContainer: HTMLElement, vueComponents: HTMLElement[]) => {
  if (gameMode) {
    createOrbitScene(threeContainer, vueComponents);
  } else {
    setFixedView(threeContainer, vueComponents);
  }
  return !gameMode;
};

export const toggleGameMode = (gameMode: boolean) => {
  return !gameMode;
};

export const toggleAndInitializeScene = (
  store: Store<any>,
  threeContainer: HTMLElement,
  vueComponents: HTMLElement[]
) => {
  store.commit('toggleGameMode');
  const gameMode = store.state.gameMode;
  if (gameMode) {
    createOrbitScene(threeContainer, vueComponents);
  } else {
    setFixedView(threeContainer, vueComponents);
  }
};

