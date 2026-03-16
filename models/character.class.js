import { MovableObject } from "./movable-object.class.js";
import { ImageHub } from "../manager_classes/imageHub.js";
import { IntervalHub } from "../manager_classes/intervalHub.js";
import { SoundHub } from "../manager_classes/soundHub.js";

/**
 * Spielbarer Charakter (Pepe) mit Bewegung, Animation und Zustandslogik.
 * @extends MovableObject
 */
export class Character extends MovableObject {
    /** @type {number} */
    height = 280;
    /** @type {number} */
    y = 170;
    /** @type {World} */
    world;
    /** @type {number} */
    speed = 10;
    /** @type {boolean} */
    hasFrameForCollision = false;
    /** @type {boolean} */
    deathAnimationStarted = false;
    /** @type {number} */
    longIdleDetector = new Date().getTime();
    /** @type {{top: number, left: number, right: number, bottom: number}} */
    offset = { top: 120, left: 20, right: 30, bottom: 15 };

    /**
     * Erstellt den Charakter, laedt alle Animationsbilder und startet Physik + Animation.
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
     * Startet die Animations-Intervalle fuer Idle-Zustand und Bewegung.
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
     * Behandelt den Idle- und Long-Idle-Zustand des Charakters.
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
     * Verarbeitet die Bewegungseingaben (links, rechts, springen).
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
            SoundHub.CHARACTER.jump.currentTime = 0;
            SoundHub.CHARACTER.jump.play();
        }
    }

    /**
     * Bestimmt den aktuellen Zustand und spielt die passende Animation ab.
     */
    handleState() {
        if (this.isDead()) return this.checkDeath();
        if (this.isHurt()) return this.playHurt();
        if (this.isAboveGround()) return this.playJump();
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) return this.playWalk();
        SoundHub.CHARACTER.walk.pause();
    }

    /**
     * Spielt die Verletzt-Animation und den Schadenssound ab.
     */
    playHurt() {
        this.characterAnimation(ImageHub.CHARACTER.hurt);
        SoundHub.CHARACTER.damage.play();
    }

    /**
     * Spielt die Sprung-Animation ab.
     */
    playJump() {
        this.characterAnimation(ImageHub.CHARACTER.jump);
    }

    /**
     * Spielt die Lauf-Animation und den Laufsound ab, setzt den Idle-Timer zurueck.
     */
    playWalk() {
        this.characterAnimation(ImageHub.CHARACTER.walk);
        SoundHub.CHARACTER.walk.play();
        this.longIdleDetector = new Date().getTime();
    }

    /**
     * Prueft, ob der Charakter im normalen Idle-Zustand ist (kein Input, nicht tot).
     * @returns {boolean} True, wenn keine Taste gedrueckt und nicht tot.
     */
    isInIdleAnimation() {
        return (
            !this.isDead() &&
            !this.world.keyboard.RIGHT &&
            !this.world.keyboard.LEFT &&
            !this.world.keyboard.UP
        );
    }

    /**
     * Prueft, ob der Charakter laenger als 5 Sekunden untaetig war.
     * @returns {boolean} True bei langem Idle-Zustand.
     */
    isLongIdle() {
        let timePassed = new Date().getTime() - this.longIdleDetector;
        return this.isInIdleAnimation() && timePassed > 5000;
    }

    /**
     * Wechselt zum naechsten Frame der uebergebenen Animationssequenz.
     * @param {string[]} images - Array der Bildpfade fuer die Animation.
     */
    characterAnimation(images) {
        let i = this.currentImage % images.length;
        this.img = this.imageCache[images[i]];
        this.currentImage++;
    }

    /**
     * Loest die Todessequenz aus, wenn der Charakter stirbt.
     */
    checkDeath() {
        if (this.deathAnimationStarted || this.world.gameOver) return;
        this.deathAnimationStarted = true;
        this.world.gameOver = true;
        SoundHub.CHARACTER.death.play();
        IntervalHub.stopAllIntervals();
        this.playDeathSequence();
    }

    /**
     * Spielt die Todes-Animation Frame fuer Frame ab und zeigt den Game-Over-Bildschirm.
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
