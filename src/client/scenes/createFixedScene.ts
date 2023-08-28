import * as THREE from "three";
import { CSS3DObject } from "three-css3d"; // Import from three-css3d
import {
  Lensflare,
  LensflareElement,
} from "three/examples/jsm/objects/Lensflare.js";
import {
  FogExp2,
  DirectionalLight,
  Color,
  Scene,
  MeshBasicMaterial,
  SphereGeometry,
  Mesh,
  PerspectiveCamera,
  BoxGeometry,
} from "three";
import {
  System,
  Emitter,
  Rate,
  Span,
  Position,
  Color as NebulaColor,
  Mass,
  Radius,
  Life,
  Velocity,
  PointZone,
  Vector3D,
  Alpha,
  Scale,
  SpriteRenderer,
} from "three-nebula";
import TWEEN from "@tweenjs/tween.js";
import type { ClientData } from "../../helpers/gameUtils";
import { eventsEmitter } from "../sockets/socketClient";
import { type } from "os";

type FocusItem = "about" | "projects" | "contact" | "default";

export const setFixedView = (
  container: HTMLElement,
  vueComponents: HTMLElement[],
  focusItem: FocusItem,
  clientCubes: Record<string, THREE.Mesh>,
  hudElement: HTMLElement
) => {
  while (container.firstChild) {
    container.firstChild.remove();
  }

  const scene = new Scene();

  const renderer = new THREE.WebGLRenderer();
  const system = new System();
  const emitter = new Emitter();
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

  scene.fog = new THREE.FogExp2(0xa0a0ff, 0.002);

  const skyMaterial = new MeshBasicMaterial({ color: 0x87ceeb });
  const skyGeometry = new SphereGeometry(500, 32, 32);
  const sky = new Mesh(skyGeometry, skyMaterial);
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

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(0, 2, 10);
  scene.add(directionalLight);

  const textureLoader = new THREE.TextureLoader();
  const textureFlare0 = textureLoader.load("../../../public/img/flare1.png");
  const textureFlare1 = textureLoader.load("../../../public/img/flare2.png");
  const lensflare = new Lensflare();
  lensflare.addElement(new LensflareElement(textureFlare0, 512, 0));
  lensflare.addElement(new LensflareElement(textureFlare1, 120, 0.6));

  directionalLight.add(lensflare);

  let camera = new PerspectiveCamera(
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

  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  clientCubes["player"] = cube;

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

  camera.position.z = 5;
  const adjustFixedView = () => {
    const positions: Record<FocusItem, [number, number, number]> = {
      about: [0, 2, 5],
      projects: [0, 4, 5],
      contact: [0, 6, 5],
      default: [0, 0, 5],
    };
    camera.position.set(...(positions[focusItem] as [number, number, number]));
  };

  if (camera) {
    adjustFixedView();
  } else {
    camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    adjustFixedView();
  }

  const animate = () => {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    system.update();
    renderer.render(scene, camera);
  };

  animate();

  return { scene, camera, renderer, controls: null };
};
