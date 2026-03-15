import { MovableObject } from "./movable-object.class.js";
import { ImageHub } from "../manager_classes/imageHub.js";
import { IntervalHub } from "../manager_classes/intervalHub.js";
import { SoundHub } from "../manager_classes/soundHub.js";

export class SmallChicken extends MovableObject {
    y = 385;
    height = 40;
    width = 40;
    hasFrame = true;
    deathSoundPlayed = false;
    offset = { top: 5, left: 5, right: 5, bottom: 5 };

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
        IntervalHub.startInterval(() => this.updateMovement(), 1000 / 60);
        IntervalHub.startInterval(() => this.updateAnimation(), 100);
    }

    updateMovement() {
        if (!this.isDead()) this.moveLeft();
    }

    updateAnimation() {
        if (this.isDead()) {
            this.img = this.imageCache[ImageHub.ENEMIES_CHICKEN_SMALL.dead[0]];
            if (!this.deathSoundPlayed) {
                SoundHub.SMALL_CHICKEN_DEATH.death.play();
                this.deathSoundPlayed = true;
            }
        } else {
            let i = this.currentImage % ImageHub.ENEMIES_CHICKEN_SMALL.walk.length;
            this.img = this.imageCache[ImageHub.ENEMIES_CHICKEN_SMALL.walk[i]];
            this.currentImage++;
        }
    }
}
