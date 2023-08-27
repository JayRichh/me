import { createOrbitScene } from '../client/scenes/createOrbitScene';
import { createFixedScene } from '../client/scenes/createFixedScene';

export const toggleGameMode = (gameMode: any) => {
  gameMode = !gameMode;
  const gameCanvas = document.getElementById('gameCanvas');
  const vueComponents = Array.from(document.querySelectorAll('.vue-component')) as HTMLElement[];
  if (gameCanvas) {
    if (gameMode) {
      createOrbitScene(gameCanvas, vueComponents);
    } else {
      createFixedScene(gameCanvas, vueComponents);
    }
  } else {
    console.error('gameCanvas element not found');
  }
  return gameMode;
};
