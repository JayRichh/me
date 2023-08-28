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
  }
}
