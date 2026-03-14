import { MovableObject } from "./movable-object.class.js";
import { ImageHub } from "../manager_classes/imageHub.js";
import { IntervalHub } from "../manager_classes/intervalHub.js";

export class SmallChicken extends MovableObject {
    y = 385;
    height = 40;
    width = 40;
    hasFrame = true;

    constructor(x) {
        super();
        this.loadImage(ImageHub.ENEMIES_CHICKEN_SMALL.walk[0]);
        this.loadImages(ImageHub.ENEMIES_CHICKEN_SMALL.walk);
        this.loadImages(ImageHub.ENEMIES_CHICKEN_SMALL.dead);
        this.x = x;
        this.speed = 2 + Math.random() * 1.5;
        this.animate();
    }

    animate() {
        IntervalHub.startInterval(() => {
            if (!this.isDead()) this.moveLeft();
        }, 1000 / 60);

        IntervalHub.startInterval(() => {
            if (this.isDead()) {
                if (this.isDead()) {
                    this.img = this.imageCache[ImageHub.ENEMIES_CHICKEN_SMALL.dead[0]];
                } else {
                    let i = this.currentImage % ImageHub.ENEMIES_CHICKEN_SMALL.walk.length;
                    this.img = this.imageCache[ImageHub.ENEMIES_CHICKEN_SMALL.walk[i]];
                    this.currentImage++;
                }
            }
        }, 100);
    }
}
