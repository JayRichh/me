import BaseScene from "../components/threeModules/BaseScene";
import { Lights } from "../components/threeModules/Lights";
import { Player } from "../components/threeModules/Player";
import { StaticObjects } from "../components/threeModules/StaticObjects";
import { Events } from "../components/threeModules/Events";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";
import { useStore } from "vuex";

/** Creates a new scene and returns the scene and camera.
 * @param {HTMLElement} container - The HTML element to add the renderer to.
 * @param {Object} store - The Vuex store.
 *
 * @returns {Object} The created scene and camera.
 */
export const createScene = (container: HTMLElement) => {
  const store = useStore();
  const gameMode = store.state.gameMode;
  const focusItem = store.state.focusItem;
  const clientCubes: Record<string, THREE.Mesh> = {};

  const scene = new BaseScene(clientCubes);
  scene.addToContainer(container);
  scene.setCameraPosition(focusItem);

  addComponentsToScene(scene, clientCubes);
  setControls(scene, gameMode);
  scene.animate();
};

function addComponentsToScene(
  baseScene: BaseScene,
  clientCubes: Record<string, THREE.Mesh>
) {
  new Lights(baseScene.scene);
  new Player(baseScene.scene, clientCubes);
  new StaticObjects(baseScene.scene);
  new Events(baseScene.scene, clientCubes);
}

function setControls(baseScene: BaseScene, gameMode: boolean) {
  if (gameMode) {
    baseScene.setControls(
      new OrbitControls(baseScene.camera, baseScene.renderer.domElement)
    );
  } else {
    baseScene.setControls(null);
  }
}
