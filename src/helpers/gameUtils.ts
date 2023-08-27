import { createOrbitScene } from '../client/scenes/createOrbitScene';
import { setFixedView } from '../client/scenes/createFixedScene';

export const isGameModeToggled = (gameMode: boolean, threeContainer: HTMLElement, vueComponents: HTMLElement[], focusItem: string) => {
  if (gameMode) {
    createOrbitScene(threeContainer, vueComponents);
  } else {
    setFixedView(threeContainer, vueComponents, focusItem);
  }
  return !gameMode;
};

export const toggleGameMode = (gameMode: boolean) => {
  return !gameMode;
};

export const toggleAndInitializeScene = (gameMode: boolean, threeContainer: HTMLElement, vueComponents: HTMLElement[], focusItem: string) => {
  gameMode = !gameMode;
  if (gameMode) {
    createOrbitScene(threeContainer, vueComponents);
  } else {
    setFixedView(threeContainer, vueComponents, focusItem);
  }
  return gameMode;
};
