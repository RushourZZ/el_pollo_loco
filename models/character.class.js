import { MovableObject } from "./movable-object.class.js";
import { ImageHub } from "../manager_classes/imageHub.js";
import { IntervalHub } from "../manager_classes/intervalHub.js";
import { SoundHub } from "../manager_classes/soundHub.js";

export class Character extends MovableObject {
    height = 280;
    y = 155;
    world;
    speed = 10;
    hasFrame = true;
    deathAnimationStarted = false;

    constructor() {
        super();
        this.loadImage(ImageHub.CHARACTER.idle[0]);
        this.loadImages(ImageHub.CHARACTER.idle);
        this.loadImages(ImageHub.CHARACTER.long_idle);
        this.loadImages(ImageHub.CHARACTER.walk);
        this.loadImages(ImageHub.CHARACTER.jump);
        this.loadImages(ImageHub.CHARACTER.hurt);
        this.loadImages(ImageHub.CHARACTER.dead);
        this.applyGravity();

        this.animate();
    }

    //#region character animation
    animate() {
        IntervalHub.startInterval(() => {
            this.characterAnimation(ImageHub.CHARACTER.idle);
        }, 7800 / 60);

        IntervalHub.startInterval(() => {
            if (!this.isDead()) {
                if (
                    this.world.keyboard.RIGHT &&
                    this.x < this.world.level.level_end_x
                ) {
                    this.moveRight();
                }
                if (this.world.keyboard.LEFT && this.x > 100) {
                    this.moveLeft();
                }
                if (this.world.keyboard.UP && !this.isAboveGround()) {
                    this.jump();
                    SoundHub.CHARACTER.jump.currentTime = 0;
                    SoundHub.CHARACTER.jump.play();
                }
            }

            if (this.isDead()) {
                this.checkDeath();
            } else if (this.isHurt()) {
                this.characterAnimation(ImageHub.CHARACTER.hurt);
                SoundHub.CHARACTER.damage.play();
            } else if (this.isAboveGround()) {
                this.characterAnimation(ImageHub.CHARACTER.jump);
                SoundHub.CHARACTER.jump.play();
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.characterAnimation(ImageHub.CHARACTER.walk);
                SoundHub.CHARACTER.walk.play();
            }

            this.world.camera_x = -this.x + 100;
        }, 2000 / 60);
    }

    isInIdleAnimation() {
        return (
            !this.isDead() &&
            !this.world.keyboard.RIGHT &&
            !this.world.keyboard.LEFT &&
            !this.world.keyboard.UP
        );
    }

    characterAnimation(images) {
        let i = this.currentImage % images.length;
        this.img = this.imageCache[images[i]];
        this.currentImage++;
    }

    checkDeath() {
        if (this.deathAnimationStarted) return;
        this.deathAnimationStarted = true;
        SoundHub.CHARACTER.death.play();
        IntervalHub.stopAllIntervals();

        ImageHub.CHARACTER.dead.forEach((images, i) => {
            setTimeout(() => {
                this.img = this.imageCache[images];
                if (i === ImageHub.CHARACTER.dead.length - 1) {
                    document.getElementById("gameOverScreen").classList.remove("displayNone");
                }
            }, i * 150);
        });
    }
    //#endregion character animation
}
