import { IntervalHub } from "../manager_classes/intervalHub.js";
import { DrawableObject } from "./drawable-object.class.js";

/**
 * Basisklasse fuer alle beweglichen Spielobjekte mit Physik und Kollisionserkennung.
 * @extends DrawableObject
 */
export class MovableObject extends DrawableObject {
    /** @type {number} */
    speed = 0.15;
    /** @type {boolean} */
    otherDirection = false;
    /** @type {number} */
    speedY = 0;
    /** @type {number} */
    acceleration = 2;
    /** @type {number} */
    energy = 100;
    /** @type {number} */
    lastHit = 0;

    /**
     * Aktiviert die Schwerkraft-Simulation fuer dieses Objekt.
     */
    applyGravity() {
        IntervalHub.startInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                this.speedY = 0;
                this.y = 170;
            }
        }, 1000 / 60);
    }

    /**
     * Prueft, ob sich das Objekt ueber dem Boden befindet.
     * @returns {boolean} True, wenn das Objekt in der Luft ist.
     */
    isAboveGround() {
        return this.alwaysAboveGround || this.y < 170;
    }

    /**
     * Prueft, ob dieses Objekt mit einem anderen kollidiert (AABB mit Offsets).
     * @param {MovableObject} mo - Das andere Spielobjekt.
     * @returns {boolean} True bei Kollision.
     */
    isColliding(mo) {
        return (
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
        );
    }

    /**
     * Reduziert die Energie des Objekts um 5 und speichert den Trefferzeitpunkt.
     */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Prueft, ob das Objekt keine Energie mehr hat.
     * @returns {boolean} True, wenn Energie gleich 0.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Prueft, ob das Objekt kuerzlich getroffen wurde (Unverwundbarkeitsphase).
     * @returns {boolean} True innerhalb von 300ms nach dem letzten Treffer.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        return timePassed < 300;
    }

    /**
     * Bewegt das Objekt nach rechts und setzt die Blickrichtung.
     */
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    /**
     * Bewegt das Objekt nach links und setzt die Blickrichtung.
     */
    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
    }

    /**
     * Laesst das Objekt springen, indem die vertikale Geschwindigkeit gesetzt wird.
     */
    jump() {
        this.speedY = 30;
    }
}
