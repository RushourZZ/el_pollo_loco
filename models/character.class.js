import { MovableObject } from "./movable-object.class.js";
import { ImageHub } from "../manager_classes/imageHub.js";
import { IntervalHub } from "../manager_classes/intervalHub.js";
import { SoundHub } from "../manager_classes/soundHub.js";

/**
 * Playable character (Pepe) with movement, animation and state logic.
 * @extends MovableObject
 */
export class Character extends MovableObject {
    height = 280;
    y = 170;
    world;
    speed = 10;
    hasFrameForCollision = false;
    deathAnimationStarted = false;
    longIdleDetector = new Date().getTime();
    offset = { top: 120, left: 20, right: 30, bottom: 15 };

    /**
     * Creates the character, loads all animation images and starts physics + animation.
     */
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
    /**
     * Starts the animation intervals for idle state and movement.
     */
    animate() {
        IntervalHub.startInterval(() => this.handleIdle(), 7800 / 60);
        IntervalHub.startInterval(() => {
            this.handleMovement();
            this.handleState();
            this.world.camera_x = -this.x + 100;
        }, 2000 / 60);
    }

    /**
     * Handles the idle and long idle state of the character.
     */
    handleIdle() {
        if (this.isLongIdle()) {
            this.characterAnimation(ImageHub.CHARACTER.long_idle);
            SoundHub.CHARACTER.longIdle.play();
        } else if (this.isInIdleAnimation()) {
            SoundHub.CHARACTER.longIdle.pause();
            this.characterAnimation(ImageHub.CHARACTER.idle);
        }
    }

    /**
     * Processes movement inputs (left, right, jump).
     */
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
            this.longIdleDetector = new Date().getTime();
            SoundHub.CHARACTER.jump.currentTime = 0;
            SoundHub.CHARACTER.jump.play();
        }
    }

    /**
     * Determines the current state and plays the matching animation.
     */
    handleState() {
        if (this.isDead()) return this.checkDeath();
        if (this.isHurt()) return this.playHurt();
        if (this.isAboveGround()) return this.playJump();
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) return this.playWalk();
        SoundHub.CHARACTER.walk.pause();
    }

    /**
     * Plays the hurt animation and damage sound.
     */
    playHurt() {
        this.characterAnimation(ImageHub.CHARACTER.hurt);
        SoundHub.CHARACTER.damage.play();
    }

    /**
     * Plays the jump animation.
     */
    playJump() {
        this.characterAnimation(ImageHub.CHARACTER.jump);
    }

    /**
     * Plays the walk animation and sound, resets the idle timer.
     */
    playWalk() {
        this.characterAnimation(ImageHub.CHARACTER.walk);
        SoundHub.CHARACTER.walk.play();
        this.longIdleDetector = new Date().getTime();
    }

    /**
     * Checks whether the character is in normal idle state (no input, not dead).
     * @returns {boolean} True if no key is pressed and not dead.
     */
    isInIdleAnimation() {
        return (
            !this.isDead() &&
            !this.isAboveGround() &&
            !this.world.keyboard.RIGHT &&
            !this.world.keyboard.LEFT &&
            !this.world.keyboard.UP
        );
    }

    /**
     * Checks whether the character has been inactive for more than 5 seconds.
     * @returns {boolean} True on long idle state.
     */
    isLongIdle() {
        let timePassed = new Date().getTime() - this.longIdleDetector;
        return this.isInIdleAnimation() && timePassed > 5000;
    }

    /**
     * Advances to the next frame of the given animation sequence.
     * @param {string[]} images - Array of image paths for the animation.
     */
    characterAnimation(images) {
        let i = this.currentImage % images.length;
        this.img = this.imageCache[images[i]];
        this.currentImage++;
    }

    /**
     * Triggers the death sequence when the character dies.
     */
    checkDeath() {
        if (this.deathAnimationStarted || this.world.gameOver) return;
        this.deathAnimationStarted = true;
        this.world.gameOver = true;
        SoundHub.resetAllSounds();
        SoundHub.CHARACTER.death.play();
        IntervalHub.stopAllIntervals();
        this.playDeathSequence();
    }

    /**
     * Plays the death animation frame by frame and shows the game over screen.
     */
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
