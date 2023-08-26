import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { GUI } from "dat.gui";
import TWEEN from "@tweenjs/tween.js";
import { io } from "socket.io-client";
import { createFixedScene } from "./scenes/createFixedScene";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});

const myObject3D = new THREE.Object3D();
myObject3D.position.x = Math.random() * 4 - 2;
myObject3D.position.z = Math.random() * 4 - 2;

const gridHelper = new THREE.GridHelper(10, 10);
gridHelper.position.y = -0.5;
scene.add(gridHelper);

camera.position.z = 4;

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

let timestamp = 0;

const stats = new Stats();
document.body.appendChild(stats.dom);

const gui = new GUI();
const cubeFolder = gui.addFolder("Cube");
const cubePositionFolder = cubeFolder.addFolder("Position");
cubePositionFolder.add(myObject3D.position, "x", -5, 5);
cubePositionFolder.add(myObject3D.position, "z", -5, 5);
cubePositionFolder.open();
const cubeRotationFolder = cubeFolder.addFolder("Rotation");
cubeRotationFolder.add(myObject3D.rotation, "x", 0, Math.PI * 2, 0.01);
cubeRotationFolder.add(myObject3D.rotation, "y", 0, Math.PI * 2, 0.01);
cubeRotationFolder.add(myObject3D.rotation, "z", 0, Math.PI * 2, 0.01);
cubeRotationFolder.open();
cubeFolder.open();

const animate = function () {
  requestAnimationFrame(animate);

  controls.update();

  TWEEN.update();

  if (clientCubes[myId]) {
    camera.lookAt(clientCubes[myId].position);
  }

  render();

  stats.update();
};

const render = function () {
  renderer.render(scene, camera);
};

animate();

document.addEventListener('DOMContentLoaded', () => {
  const threeContainer = document.getElementById('three-container');
  const vueComponentIds = ['about-card', 'contact-card'];
  const vueComponents = vueComponentIds.map(id => document.getElementById(id)).filter(el => el !== null) as HTMLElement[];

  if (threeContainer !== null) {
    createFixedScene(threeContainer , vueComponents);
  } else {
    console.error("Element with id 'three-container' not found");
  }
});
