/**
 * This class is responsible for running animations.
 * It uses the requestAnimationFrame method to create a smooth animation loop.
 */
export class Animations {
  /**
   * This method runs the animation loop.
   * It takes a callback function as an argument which is called on each frame.
   * @param callback - A function to be executed each time the frame updates.
   */
  runAnimation(callback: () => void): void {
    requestAnimationFrame(() => {
      this.runAnimation(callback);
    });
    callback();
  }
}
