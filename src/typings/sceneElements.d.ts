export interface SceneElements {
  container: HTMLElement;
  vueComponents: HTMLElement[];
  clientCubes: Record<string, THREE.Mesh>;
  hudElement: any;
  focusItem: any;
}
