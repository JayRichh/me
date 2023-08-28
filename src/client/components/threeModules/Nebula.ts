import * as THREE from "three";
import { Scene, Mesh, Material } from "three";
import {
  System,
  Emitter,
  Rate,
  Span,
  Position,
  Mass,
  Radius,
  Life,
  Alpha,
  Scale,
  SpriteRenderer,
  Color,
  PointZone,
} from "three-nebula";

/**
 * Nebula class is responsible for creating and managing the Nebula in the scene.
 * It creates a system, emitter and spriteRenderer and adds them to the scene.
 */
export class Nebula {
  system: System;
  emitter: Emitter;
  spriteRenderer: SpriteRenderer;

  /**
   * The constructor takes a THREE.Scene object as a parameter.
   * It creates a system, emitter and spriteRenderer and adds them to the scene.
   * @param scene - The scene to which the system, emitter and spriteRenderer will be added.
   */
  constructor(scene: Scene) {
    this.system = new System();
    this.emitter = new Emitter();
    this.spriteRenderer = new SpriteRenderer(scene, THREE);

    this.emitter
      .setRate(new Rate(new Span(4, 16), new Span(0.01)))
      .setInitializers([
        new Position(new PointZone(0, 0)),
        new Mass(1),
        new Radius(6, 12),
        new Life(3),
      ])
      .setBehaviours([
        new Alpha(1, 0),
        new Color(new THREE.Color(0xffff11), new THREE.Color(0xffaacc)),
        new Scale(0.01, 0.2),
      ])
      .setPosition({ x: 0, y: 0, z: 0 })
      .emit();

    this.system.addEmitter(this.emitter).addRenderer(this.spriteRenderer);
  }

  /**
   * Adds the mesh to the provided scene and updates the system.
   * @param scene - The scene to which the mesh will be added.
   * @param mesh - The mesh to be added to the scene.
   * @param material - The material to be applied to the mesh.
   */
  addToScene(scene: Scene, mesh: Mesh, material: Material): void {
    mesh.material = material;
    scene.add(mesh);
    this.system.update();
  }
}
