import { createScene } from "../client/scenes/createScene";
import * as THREE from "three";
import { SceneElements } from "../typings/sceneElements";

export const toggleGameMode = (gameMode: boolean) => {
  return !gameMode;
};

export const toggleAndInitializeScene = (
  mode: boolean,
  sceneElements: SceneElements
) => {
  const { container, vueComponents, clientCubes, hudElement, focusItem } =
    sceneElements;
  return createScene(
    container,
    vueComponents,
    focusItem,
    clientCubes,
    hudElement,
    mode
  );
};
