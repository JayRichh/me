import * as THREE from 'three';
import { CSS3DObject } from 'three-css3d';  // Import from three-css3d

export const setFixedView = (container: HTMLElement, vueComponents: HTMLElement[]) => {
  while (container.firstChild) {
    container.firstChild.remove();
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  // Create CSS3DObjects for each Vue component and add them to the scene
  vueComponents.forEach((element, index) => {
    const cssObject = new CSS3DObject(element);
    cssObject.position.set(0, index * 2, 0);  // Position components on different y-axis
    scene.add(cssObject);
  });

  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 5;

  const animate = () => {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  };

  animate();

  return { scene, camera, renderer, controls: null };
};