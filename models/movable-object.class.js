import { IntervalHub } from "../manager_classes/intervalHub.js";
import { DrawableObject } from "./drawable-object.class.js";

/**
 * Base class for all movable game objects with physics and collision detection.
 * @extends DrawableObject
 */
export class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    energy = 100;
    lastHit = 0;

    /**
     * Enables gravity simulation for this object.
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
     * Checks whether the object is above ground level.
     * @returns {boolean} True if the object is airborne.
     */
    isAboveGround() {
        return this.alwaysAboveGround || this.y < 170;
    }

    /**
     * Checks whether this object collides with another (AABB with offsets).
     * @param {MovableObject} mo - The other game object.
     * @returns {boolean} True on collision.
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
     * Reduces the object's energy by 5 and records the hit timestamp.
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
     * Checks whether the object has no energy left.
     * @returns {boolean} True if energy equals 0.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Checks whether the object was recently hit (invulnerability phase).
     * @returns {boolean} True within 300ms after the last hit.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        return timePassed < 300;
    }

    /**
     * Moves the object to the right and updates facing direction.
     */
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    /**
     * Moves the object to the left and updates facing direction.
     */
    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
    }

    /**
     * Makes the object jump by setting vertical speed.
     */
    jump() {
        this.speedY = 30;
    }
}
