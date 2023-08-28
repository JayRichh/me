export interface SceneOptions {
  container: HTMLElement;
  vueComponents: HTMLElement[];
  focusItem: string;
  clientCubes: Record<string, THREE.Mesh>;
}
