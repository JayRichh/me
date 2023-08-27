import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import TWEEN from '@tweenjs/tween.js';
import { io } from 'socket.io-client';

const socket = io();

export const createOrbitScene = (element: HTMLElement, vueComponents: HTMLElement[]) => {
  socket.emit('changeView', { view: 'fixed' });
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  element.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);

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
    controls.update();
    TWEEN.update();
    renderer.render(scene, camera);
  };

  animate();
};
