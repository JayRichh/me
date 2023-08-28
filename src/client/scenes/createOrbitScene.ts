import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { CSS3DObject } from "three-css3d"; // Import from three-css3d
import {
  FogExp2,
  Color,
  MeshBasicMaterial,
  SphereGeometry,
  DirectionalLight,
  PerspectiveCamera,
  BoxGeometry,
} from "three";
import {
  Lensflare,
  LensflareElement,
} from "three/examples/jsm/objects/Lensflare.js";
import System from "three-nebula";
import { ClientData } from "../../helpers/gameUtils";
import { eventsEmitter } from "../../client/sockets/socketClient";
import TWEEN from "@tweenjs/tween.js";
import {
  Emitter,
  Rate,
  Span,
  Position,
  Mass,
  Radius,
  Life,
  Velocity,
  PointZone,
  Vector3D,
  Alpha,
  Color as NebulaColor,
  Scale,
  SpriteRenderer,
  Body,
  Force,
} from "three-nebula";

export const createOrbitScene = (
  container: HTMLElement,
  vueComponents: HTMLElement[],
  clientCubes: Record<string, THREE.Mesh>,
  hudElement: HTMLElement
) => {
  while (container.firstChild) {
    container.firstChild.remove();
  }

  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer();
  const system = new System();
  const emitter = new Emitter();

  scene.fog = new THREE.FogExp2(0xa0a0ff, 0.002);
  const spriteRenderer = new SpriteRenderer(scene, THREE);

  emitter
    .setRate(new Rate(new Span(4, 16), new Span(0.01)))
    .setInitializers([
      new Position(new PointZone(0, 0)),
      new Mass(1),
      new Radius(6, 12),
      new Life(3),
    ])
    .setBehaviours([
      new Alpha(1, 0),
      new Scale(0.1, 1.3),
      new NebulaColor(new Color(), new Color()),
    ]);

  system.addEmitter(emitter).addRenderer(spriteRenderer);

  const skyMaterial = new MeshBasicMaterial({ color: 0x87ceeb });
  const skyGeometry = new SphereGeometry(500, 32, 32);
  const sky = new THREE.Mesh(skyGeometry, skyMaterial);
  sky.material.side = THREE.BackSide;
  scene.add(sky);

  const groundTexture = new THREE.TextureLoader().load("textures/ground.jpg");
  const groundMaterial = new THREE.MeshPhongMaterial({ map: groundTexture });
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(500, 500),
    groundMaterial
  );
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  const directionalLight = new DirectionalLight(0xffffff, 1);
  directionalLight.position.set(0, 2, 10);
  scene.add(directionalLight);

  const textureLoader = new THREE.TextureLoader();
  const textureFlare0 = textureLoader.load("../../../public/images/flare1.png");
  const textureFlare1 = textureLoader.load("../../../public/images/flare2.png");
  const lensflare = new Lensflare();
  lensflare.addElement(new LensflareElement(textureFlare0, 512, 0));
  lensflare.addElement(new LensflareElement(textureFlare1, 120, 0.6));

  directionalLight.add(lensflare);

  const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  const [navbarElement, homeViewElement] = vueComponents;
  const navbarObject = new CSS3DObject(navbarElement);
  const homeViewObject = new CSS3DObject(homeViewElement);
  scene.add(navbarObject);
  scene.add(homeViewObject);

  const controls = new OrbitControls(camera, renderer.domElement);

  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  clientCubes["player"] = cube;

  camera.position.z = 5;

  eventsEmitter.on("removeClient", (id: string) => {
    const cube = clientCubes[id];
    if (cube) {
      scene.remove(cube);
      delete clientCubes[id];
    }
  });

  eventsEmitter.on("updateClients", (clients: Record<string, ClientData>) => {
    Object.entries(clients).forEach(([id, clientData]) => {
      let cube = clientCubes[id];
      if (!cube) {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        cube = new THREE.Mesh(geometry, material);
        cube.name = id;
        scene.add(cube);
        clientCubes[id] = cube;
      }
      if (clientData.p) {
        new TWEEN.Tween(cube.position).to(clientData.p, 50).start();
      }
      if (clientData.r) {
        new TWEEN.Tween(cube.rotation).to(clientData.r, 50).start();
      }
    });
  });

  const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    system.update();
    renderer.render(scene, camera);
  };

  animate();

  return { scene, camera, renderer, controls };
};
