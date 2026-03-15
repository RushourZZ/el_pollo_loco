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
    longIdleDetector = new Date().getTime();
    offset = { top: 120, left: 20, right: 30, bottom: 15 };

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
        IntervalHub.startInterval(() => this.handleIdle(), 7800 / 60);
        IntervalHub.startInterval(() => {
            this.handleMovement();
            this.handleState();
            this.world.camera_x = -this.x + 100;
        }, 2000 / 60);
    }

    handleIdle() {
        if (this.isLongIdle()) {
            this.characterAnimation(ImageHub.CHARACTER.long_idle);
            SoundHub.CHARACTER.longIdle.play();
        } else if (this.isInIdleAnimation()) {
            SoundHub.CHARACTER.longIdle.pause();
            this.characterAnimation(ImageHub.CHARACTER.idle);
        }
    }

    handleMovement() {
        if (this.isDead()) return;
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
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

    handleState() {
        if (this.isDead()) return this.checkDeath();
        if (this.isHurt()) return this.playHurt();
        if (this.isAboveGround()) return this.playJump();
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) return this.playWalk();
        SoundHub.CHARACTER.walk.pause();
    }

    playHurt() {
        this.characterAnimation(ImageHub.CHARACTER.hurt);
        SoundHub.CHARACTER.damage.play();
    }

    playJump() {
        this.characterAnimation(ImageHub.CHARACTER.jump);
    }

    playWalk() {
        this.characterAnimation(ImageHub.CHARACTER.walk);
        SoundHub.CHARACTER.walk.play();
        this.longIdleDetector = new Date().getTime();
    }

    isInIdleAnimation() {
        return (
            !this.isDead() &&
            !this.world.keyboard.RIGHT &&
            !this.world.keyboard.LEFT &&
            !this.world.keyboard.UP
        );
    }

    isLongIdle() {
        let timePassed = new Date().getTime() - this.longIdleDetector;
        return this.isInIdleAnimation() && timePassed > 5000;
    }

    characterAnimation(images) {
        let i = this.currentImage % images.length;
        this.img = this.imageCache[images[i]];
        this.currentImage++;
    }

    checkDeath() {
        if (this.deathAnimationStarted || this.world.gameOver) return;
        this.deathAnimationStarted = true;
        this.world.gameOver = true;
        SoundHub.CHARACTER.death.play();
        IntervalHub.stopAllIntervals();
        this.playDeathSequence();
    }

    playDeathSequence() {
        ImageHub.CHARACTER.dead.forEach((frame, i) => {
            setTimeout(() => {
                this.img = this.imageCache[frame];
                if (i === ImageHub.CHARACTER.dead.length - 1) {
                    document.getElementById("gameOverScreen").classList.remove("displayNone");
                }
            }, i * 150);
        });
    }
    //#endregion character animation
}
