import * as THREE from 'three';
import { io } from 'socket.io-client';

const socket = io();

export const createFixedScene = (element: HTMLElement, vueComponents: HTMLElement[]) => {
  socket.emit('changeView', { view: 'orbit' });

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(
    window.innerWidth / -2,
    window.innerWidth / 2,
    window.innerHeight / 2,
    window.innerHeight / -2,
    1,
    1000
  );
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  element.appendChild(renderer.domElement);

  camera.position.z = 4;

  vueComponents.forEach((component) => {
    const componentTexture = new THREE.CanvasTexture(component);
    const componentMaterial = new THREE.MeshBasicMaterial({ map: componentTexture });
    const componentGeometry = new THREE.PlaneGeometry(1, 1);
    const componentMesh = new THREE.Mesh(componentGeometry, componentMaterial);
    componentMesh.position.set(0, 1, 0); // Set position
    scene.add(componentMesh);
  });

  const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };

  animate();
};
