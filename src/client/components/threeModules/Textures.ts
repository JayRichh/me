import { TextureLoader, Texture } from "three";

/**
 * Class to manage the loading of textures in the Three.js scene.
 * It allows to load a texture from a URL and returns a Promise with the loaded Texture.
 */
export class Textures {
  loader: TextureLoader;

  /**
   * Constructs the Textures object and initializes the TextureLoader.
   */
  constructor() {
    this.loader = new TextureLoader();
  }

  /**
   * Loads a texture from a URL.
   * @param url - The URL of the texture to load.
   * @returns A Promise with the loaded Texture.
   */
  loadTexture(url: string): Promise<Texture> {
    return new Promise((resolve, reject) => {
      this.loader.load(
        url,
        (texture) => resolve(texture),
        undefined,
        (error) => reject(error)
      );
    });
  }
}
