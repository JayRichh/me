// src/helpers/gameUtils.ts
import { createOrbitScene } from "../client/scenes/createOrbitScene";
import { setFixedView } from "../client/scenes/createFixedScene";
import * as THREE from "three";
import TWEEN from "@tweenjs/tween.js";
import { eventsEmitter } from "../client/sockets/socketClient";

export interface ClientData {
  p?: { x: number; y: number; z: number };
  r?: { _x: number; _y: number; _z: number };
}

type FocusItem = "about" | "projects" | "contact" | "default";
interface SceneElements {
  container: HTMLElement;
  vueComponents: HTMLElement[];
  clientCubes: Record<string, THREE.Mesh>;
  hudElement: any;
  focusItem: any;
}

export const isGameModeToggled = (
  gameMode: boolean,
  threeContainer: HTMLElement,
  vueComponents: HTMLElement[],
  focusItem: FocusItem,
  clientCubes: Record<string, THREE.Mesh>,
  hudElement: HTMLElement
) => {
  if (gameMode) {
    createOrbitScene(threeContainer, vueComponents, clientCubes, hudElement);
  } else {
    setFixedView(
      threeContainer,
      vueComponents,
      focusItem,
      clientCubes,
      hudElement
    );
  }
  return !gameMode;
};

export const toggleGameMode = (gameMode: boolean) => {
  return !gameMode;
};

export const toggleAndInitializeScene = (
  mode: boolean,
  sceneElements: SceneElements
) => {
  mode = !mode;
  const { container, vueComponents, clientCubes, hudElement, focusItem } =
    sceneElements;
  if (mode) {
    return createOrbitScene(container, vueComponents, clientCubes, hudElement);
  } else {
    return setFixedView(
      container,
      vueComponents,
      focusItem,
      clientCubes,
      hudElement
    );
  }
};
