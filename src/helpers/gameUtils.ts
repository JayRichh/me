import { createOrbitScene } from '../client/scenes/createOrbitScene';
import { createFixedScene } from '../client/scenes/createFixedScene';

export const isGameModeToggled = (gameMode: boolean, threeContainer: HTMLElement, vueComponents: HTMLElement[]) => {
  if (gameMode) {
    createOrbitScene(threeContainer, vueComponents);
  } else {
    createFixedScene(threeContainer, vueComponents);
  }
  return !gameMode;
};

export const toggleGameMode = (gameMode: boolean) => {
  return !gameMode;
};
