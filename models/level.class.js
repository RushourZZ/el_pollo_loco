/**
 * Represents a game level containing all its objects.
 */
export class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    level_end_x = 3000;

    /**
     * Creates a new level with all game objects.
     * @param {MovableObject[]} enemies - Array of enemies in the level.
     * @param {Cloud[]} clouds - Array of clouds.
     * @param {BackgroundObject[]} backgroundObjects - Array of background objects.
     * @param {Coin[]} coins - Array of coins.
     * @param {Bottle[]} bottles - Array of bottles.
     */
    constructor(enemies, clouds, backgroundObjects, coins, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;

        this.coins = coins;
        this.bottles = bottles;
    }
}
