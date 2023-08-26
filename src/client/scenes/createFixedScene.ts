import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';
import { createOrbitScene } from './createOrbitScene';

export const createFixedScene = (element: HTMLElement, vueComponents: HTMLElement[]) => {
  const renderer = new CSS3DRenderer();
  // Initialize your Three.js scene
  // ...

  vueComponents.forEach((component) => {
    const cssObject = new CSS3DObject(component);
    // Position and rotate your cssObject as needed
    // scene.add(cssObject);
    
  });
  
  // Your render loop or animation
};

export const toggleScene = (isOrbit: boolean, element: HTMLElement, vueComponents: HTMLElement[]) => {
  if (isOrbit) {
    createOrbitScene(element, vueComponents);
  } else {
    createFixedScene(element, vueComponents);
  }
};

