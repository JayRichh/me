import BaseScene from "../components/threeModules/BaseScene";
import { Lights } from "../components/threeModules/Lights";
import { Objects } from "../components/threeModules/Objects";
import { Events } from "../components/threeModules/Events";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Nebula } from "../components/threeModules/Nebula";
import * as THREE from "three";

export const createScene = (
  container: HTMLElement,
  vueComponents: HTMLElement[],
  focusItem: string,
  clientCubes: Record<string, THREE.Mesh>,
  hudElement: HTMLElement,
  gameMode: boolean
) => {
  // Create a new BaseScene instance
  const baseScene = new BaseScene(clientCubes);

  // Add the renderer to the container
  baseScene.addToContainer(container);

  // Set the camera position based on the focus item
  baseScene.setCameraPosition(focusItem);

  // Create a new Nebula instance and add it to the scene
  const nebula = new Nebula(baseScene.scene);
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  nebula.addToScene(baseScene.scene, cube, material);

  // Create a new Lights instance and add it to the scene
  new Lights(baseScene.scene);

  // Create a new Objects instance and add it to the scene
  new Objects(baseScene.scene, clientCubes);

  // Create a new Events instance and add it to the scene
  new Events(baseScene.scene, clientCubes);

  // If gameMode is true, set the controls to OrbitControls, otherwise set them to null
  if (gameMode) {
    baseScene.setControls(
      new OrbitControls(baseScene.camera, baseScene.renderer.domElement)
    );
  } else {
    baseScene.setControls(null);
  }

  // Start the animation loop
  baseScene.animate();

  // Return the scene and camera
  return { scene: baseScene.scene, camera: baseScene.camera };
};
