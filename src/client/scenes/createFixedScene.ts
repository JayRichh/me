import * as THREE from 'three';
import { CSS3DObject } from 'three-css3d';  // Import from three-css3d
import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare.js';
import { FogExp2, DirectionalLight, Color, Scene, MeshBasicMaterial, SphereGeometry, Mesh, PerspectiveCamera, BoxGeometry } from 'three';
import { System, Emitter, Rate, Span, Position, Color as NebulaColor, Mass, Radius, Life, Velocity, PointZone, Vector3D, Alpha, Scale, SpriteRenderer } from 'three-nebula';

export const setFixedView = (container: HTMLElement, vueComponents: HTMLElement[], focusItem: string) => {
  while (container.firstChild) {
    container.firstChild.remove();
  }

  let scene = new Scene();

  let renderer = new THREE.WebGLRenderer(); 
  let system = new System();
  let emitter = new Emitter();
  let spriteRenderer = new SpriteRenderer(scene, THREE);

  const velocity = new Velocity(new Vector3D(0, 1, 0) as any, true);

  emitter.setRate(new Rate(new Span(4, 16), new Span(0.01)))
        .setInitializers([
          new Position(new PointZone(0, 0)),
          new Mass(1),
          new Radius(6, 12),
          new Life(3),
          velocity
        ])
        .setBehaviours([
            new Alpha(1, 0),
            new Scale(0.1, 1.3),
            new NebulaColor(new Color(), new Color())
          ]);
  
  system.addEmitter(emitter)
        .addRenderer(spriteRenderer);

  scene.fog = new THREE.FogExp2(0xa0a0ff, 0.002);

  const skyMaterial = new MeshBasicMaterial({ color: 0x87CEEB });
  const skyGeometry = new SphereGeometry(500, 32, 32);
  const sky = new Mesh(skyGeometry, skyMaterial);
  sky.material.side = THREE.BackSide;
  scene.add(sky);

  const groundTexture = new THREE.TextureLoader().load('textures/ground.jpg');
  const groundMaterial = new THREE.MeshPhongMaterial({ map: groundTexture });
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(500, 500), groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(0, 2, 10);
  scene.add(directionalLight);

  const textureLoader = new THREE.TextureLoader();
  const textureFlare0 = textureLoader.load('../../../public/images/flare1.png');
  const textureFlare1 = textureLoader.load('../../../public/images/flare2.png');
  const lensflare = new Lensflare();
  lensflare.addElement(new LensflareElement(textureFlare0, 512, 0));
  lensflare.addElement(new LensflareElement(textureFlare1, 120, 0.6));
  
  directionalLight.add(lensflare);

  let camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  vueComponents.forEach((element, index) => {
    const cssObject = new CSS3DObject(element); // Create CSS3DObjects for each Vue component and add them to the scene
    cssObject.position.set(0, index * 2, 0);  // Position components on different y-axis
    scene.add(cssObject); 
  });

  let geometry = new BoxGeometry();
  let material = new MeshBasicMaterial({ color: 0x00ff00 });
  let cube = new Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 5;
  const adjustFixedView = () => {
    switch (focusItem) {
      case 'about':
        camera.position.set(0, 2, 5);
        break;
      case 'projects':
        camera.position.set(0, 4, 5);
        break;
      case 'contact':
        camera.position.set(0, 6, 5);
        break;
      default:
        camera.position.set(0, 0, 5);
    }
  };
  if (camera) {
    adjustFixedView();
  } else {
    camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
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