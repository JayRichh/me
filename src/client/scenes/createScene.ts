import BaseScene from "../components/threeModules/BaseScene";
import { Lights } from "../components/threeModules/Lights";
import { Objects } from "../components/threeModules/Objects";
import { Events } from "../components/threeModules/Events";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Nebula } from "../components/threeModules/Nebula";
import { SceneOptions } from "@/typings/sceneOptions";
import * as THREE from "three";
import { useStore } from "vuex";

/** Creates a new scene and returns the scene and camera.
 * @param {HTMLElement} container - The HTML element to add the renderer to.
 * @param {HTMLElement[]} vueComponents - The Vue components to add to the scene.
 * @param {string} focusItem - The item to focus the camera on.
 * @param {Record<string, THREE.Mesh>} clientCubes - The client cubes to add to the scene.
 * @param {HTMLElement} hudElement - The HUD element to add to the scene.
 * @param {boolean} gameMode - Whether to use game mode or not.
 *
 * @returns {Object} The created scene and camera.
 */
export const createScene = ({
  container,
  vueComponents,
  focusItem,
  clientCubes,
}: SceneOptions) => {
  const store = useStore();
  const gameMode = store.state.gameMode;
  const baseScene = new BaseScene(clientCubes);
  baseScene.addToContainer(container);
  baseScene.setCameraPosition(focusItem);

  const nebula = new Nebula(baseScene.scene);
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  nebula.addToScene(baseScene.scene, cube, material);

  new Lights(baseScene.scene);
  new Objects(baseScene.scene, clientCubes);
  new Events(baseScene.scene, clientCubes);

  if (gameMode) {
    baseScene.setControls(
      new OrbitControls(baseScene.camera, baseScene.renderer.domElement)
    );
  } else {
    baseScene.setControls(null);
  }

  baseScene.animate();

  return { scene: baseScene.scene, camera: baseScene.camera };
};
