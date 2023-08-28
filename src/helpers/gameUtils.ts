import { createScene } from "../client/scenes/createScene";
import * as THREE from "three";

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
