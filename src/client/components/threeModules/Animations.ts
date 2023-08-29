/**
 * This class is responsible for running animations.
 * It uses the requestAnimationFrame method to create a smooth animation loop.
 */
export class Animations {
  lastTime: number = 0;
  /**
   * This method runs the animation loop.
   * It takes a callback function as an argument which is called on each frame.
   * @param callback - A function to be executed each time the frame updates.
   */
  runAnimation(callback: (deltaTime: number) => void): void {
    const currentTime = Date.now();
    const deltaTime = (currentTime - this.lastTime) / 1000.0;

    requestAnimationFrame(() => {
      this.runAnimation(callback);
    });

    callback(deltaTime);
    this.lastTime = currentTime;
  }
}
