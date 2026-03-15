/**
 * Repraesentiert ein Spiel-Level mit allen enthaltenen Objekten.
 */
export class Level {
    /** @type {MovableObject[]} */
    enemies;
    /** @type {Cloud[]} */
    clouds;
    /** @type {BackgroundObject[]} */
    backgroundObjects;
    /** @type {Coin[]} */
    coins;
    /** @type {Bottle[]} */
    bottles;
    /** @type {number} */
    level_end_x = 3000;

    /**
     * Erstellt ein neues Level mit allen Spielobjekten.
     * @param {MovableObject[]} enemies - Array der Gegner im Level.
     * @param {Cloud[]} clouds - Array der Wolken.
     * @param {BackgroundObject[]} backgroundObjects - Array der Hintergrundobjekte.
     * @param {Coin[]} coins - Array der Muenzen.
     * @param {Bottle[]} bottles - Array der Flaschen.
     */
    constructor(enemies, clouds, backgroundObjects, coins, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;

        this.coins = coins;
        this.bottles = bottles;
    }
}
