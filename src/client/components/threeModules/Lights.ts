/**
 * The Lights class is responsible for creating and managing the lights in the scene.
 * It creates a directional light and adds lens flare effects to it.
 * The light and its effects are added to the scene passed in the constructor.
 */
import * as THREE from "three";
import {
  Lensflare,
  LensflareElement,
} from "three/examples/jsm/objects/Lensflare.js";

export class Lights {
  /**
   * The constructor takes a THREE.Scene object as a parameter.
   * It creates a directional light, adds lens flare effects to it, and adds them to the scene.
   * @param scene - The scene to which the light and its effects will be added.
   */
    constructor(scene: THREE.Scene) {
    // Create a directional light with warmer color
    const directionalLight = new THREE.DirectionalLight(0xffaa00, 1);
    directionalLight.position.set(0, 5, 10);
    directionalLight.castShadow = true; // Enable shadow casting

    // Configure shadow properties for better quality
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;

    // Add directional light to the scene
    scene.add(directionalLight);

    // Create an ambient light for softer tones
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    // Create a point light for additional highlights
    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Lensflare effects
    const textureLoader = new THREE.TextureLoader();
    const textureFlare0 = textureLoader.load("../../../public/img/flare1.png");
    const textureFlare1 = textureLoader.load("../../../public/img/flare2.png");
    const lensflare = new Lensflare();
    lensflare.addElement(new LensflareElement(textureFlare0, 512, 0));
    lensflare.addElement(new LensflareElement(textureFlare1, 120, 0.6));

    // Add lensflare to directional light
    directionalLight.add(lensflare);
  }
}
