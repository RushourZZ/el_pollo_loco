import { ImageHub } from "../manager_classes/imageHub.js";
import { MovableObject } from "./movable-object.class.js";
import { IntervalHub } from "../manager_classes/intervalHub.js";
import { SmallChicken } from "./small-chicken.class.js";
import { SoundHub } from "../manager_classes/soundHub.js";

/**
 * Endboss-Gegner mit Alarmierung, Angriff und Bewegungslogik.
 * @extends MovableObject
 */
export class Endboss extends MovableObject {
    /** @type {number} */
    height = 500;
    /** @type {number} */
    width = 300;
    /** @type {number} */
    y = -10;
    /** @type {boolean} */
    hasFrameForCollision = false;
    /** @type {boolean} */
    isAlerted = false;
    /** @type {boolean} */
    alertPlayed = false;
    /** @type {number} */
    lastAttack = 0;
    /** @type {number} */
    lastDirectionChange = 0;
    /** @type {boolean} */
    movingRight = true;
    /** @type {number} */
    speed = 1.5;
    /** @type {{top: number, bottom: number, left: number, right: number}} */
    offset = { top: 60, bottom: 10, left: 30, right: 30 };

    /**
     * Erstellt den Endboss, laedt alle Animationsbilder und startet die Animation.
     */
    constructor() {
        super();
        this.loadImage(ImageHub.ENEMIE_BOSS_CHICKEN.walk[0]);
        this.loadImages(ImageHub.ENEMIE_BOSS_CHICKEN.walk);
        this.loadImages(ImageHub.ENEMIE_BOSS_CHICKEN.hurt);
        this.loadImages(ImageHub.ENEMIE_BOSS_CHICKEN.alert);
        this.loadImages(ImageHub.ENEMIE_BOSS_CHICKEN.attack);
        this.loadImages(ImageHub.ENEMIE_BOSS_CHICKEN.dead);
        this.x = 2200;
        this.animate();
    }

    /**
     * Startet Bewegungs- und Animations-Intervalle des Endbosses.
     */
    animate() {
        IntervalHub.startInterval(() => {
            this.moveEndboss();
        }, 1000 / 60);
        IntervalHub.startInterval(() => {
            this.updateAnimation();
        }, 150);
    }

    /**
     * Steuert die Hin-und-Her-Bewegung des Endbosses nach Alarmierung.
     */
    moveEndboss() {
        if (!this.isAlerted || this.isDead()) return;
        let now = Date.now();
        if (now - this.lastDirectionChange > 2000) {
            this.movingRight = !this.movingRight;
            this.lastDirectionChange = now;
        }
        if (this.movingRight) {
            this.moveRight();
            this.otherDirection = true;
        } else {
            this.moveLeft();
            this.otherDirection = false;
        }
    }

    /**
     * Waehlt die passende Animation basierend auf dem aktuellen Zustand.
     */
    updateAnimation() {
        if (this.isDead()) return this.endbossAnimation(ImageHub.ENEMIE_BOSS_CHICKEN.dead);
        if (this.isHurt()) return this.endbossAnimation(ImageHub.ENEMIE_BOSS_CHICKEN.hurt);
        if (this.isAlerted && !this.alertPlayed) return this.playAlert();
        if (this.isAttacking) return this.endbossAnimation(ImageHub.ENEMIE_BOSS_CHICKEN.attack);
        if (this.isAlerted) return this.endbossAnimation(ImageHub.ENEMIE_BOSS_CHICKEN.walk);
    }

    /**
     * Spielt die Alarm-Animation einmalig ab und markiert sie als abgeschlossen.
     */
    playAlert() {
        this.endbossAnimation(ImageHub.ENEMIE_BOSS_CHICKEN.alert);
        if (this.currentImage >= ImageHub.ENEMIE_BOSS_CHICKEN.alert.length) {
            this.alertPlayed = true;
            this.currentImage = 0;
        }
    }

    /**
     * Versetzt den Endboss in den alarmierten Zustand und spielt den Annaehrungssound.
     */
    triggerAlert() {
        if (this.isAlerted) return;
        this.isAlerted = true;
        this.currentImage = 0;
        SoundHub.ENDBOSS.approach.volume = 1.0;
        SoundHub.ENDBOSS.approach.play();
    }

    /**
     * Versucht einen Angriff: spawnt kleine Huehner mit Cooldown-Pruefung.
     * @param {World} world - Referenz auf die Spielwelt fuer das Spawnen.
     */
    tryAttack(world) {
        let now = Date.now();
        if (now - this.lastAttack < 3000) return;
        this.lastAttack = now;
        this.isAttacking = true;
        this.currentImage = 0;
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                world.level.enemies.push(new SmallChicken(this.x - 50));
            }, i * 300);
        }
        setTimeout(() => {
            this.isAttacking = false;
            this.currentImage = 0;
        }, 150 * ImageHub.ENEMIE_BOSS_CHICKEN.attack.length);
    }

    /**
     * Wechselt zum naechsten Frame der uebergebenen Endboss-Animationssequenz.
     * @param {string[]} images - Array der Bildpfade fuer die Animation.
     */
    endbossAnimation(images) {
        let i = this.currentImage % images.length;
        this.img = this.imageCache[images[i]];
        this.currentImage++;
    }
}
