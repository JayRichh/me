import { createOrbitScene } from '../client/scenes/createOrbitScene';
import { createFixedScene } from '../client/scenes/createFixedScene';

export const toggleGameMode = (gameMode: boolean, threeContainer: HTMLElement, vueComponents: HTMLElement[]) => {
  if (gameMode) {
    createOrbitScene(threeContainer, vueComponents);
  } else {
    createFixedScene(threeContainer, vueComponents);
  }
  return !gameMode;
};
