import * as THREE from 'three';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export const createOrbitScene = (element: HTMLElement, vueComponents: HTMLElement[]) => {
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 4;

  const controls = new OrbitControls(camera, renderer.domElement);

  const scene = new THREE.Scene();
  scene.add(new THREE.AxesHelper(500));

  vueComponents.forEach((component) => {
    const cssObject = new CSS3DObject(component);
    // Position and rotate your cssObject as needed
    // scene.add(cssObject);
  });

  const animate = function () {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };

  animate();
};

// In your Game.vue component, update the toggleGameMode method to use the createOrbitScene function
const toggleGameMode = (element: HTMLElement, vueComponents: HTMLElement[]) => {
  let gameMode = { value: false };
  gameMode.value = !gameMode.value;
  if (gameMode.value) {
    createOrbitScene(element, vueComponents);
  } else {
    // createFixedScene function needs to be defined
    // createFixedScene(element, vueComponents);
  }
};

