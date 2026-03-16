import { Level } from "../models/level.class.js";
import { Chicken } from "../models/chicken.class.js";
import { Cloud } from "../models/cloud.class.js";
import { BackgroundObject } from "../models/background-object.class.js";
import { ImageHub } from "../manager_classes/imageHub.js";
import { Endboss } from "../models/endboss.class.js";
import { Coin } from "../models/coin.class.js";
import { Bottle } from "../models/bottle.class.js";

/**
 * Creates and configures the first game level with all objects.
 * @returns {Level} The fully initialized level 1 object.
 */
export function createLevel1() {
    return new Level(
        createEnemies(),
        createClouds(),
        createInitialBackground(),
        createItems(Coin, 15),
        createItems(Bottle, 15),
    );
}

/**
 * Creates the enemy list for level 1 (chickens + endboss).
 * @returns {MovableObject[]} Array of all enemies.
 */
function createEnemies() {
    let chickens = Array.from({ length: 4 }, () => new Chicken());
    return [...chickens, new Endboss()];
}

/**
 * Creates a set of clouds for the level.
 * @returns {Cloud[]} Array of created clouds.
 */
function createClouds() {
    return Array.from({ length: 15 }, () => new Cloud());
}

/**
 * Creates the initial background segment at position 0.
 * @returns {BackgroundObject[]} Array of the four background layers.
 */
function createInitialBackground() {
    return [
        new BackgroundObject(ImageHub.BACKGROUND_LAYERS.air[0], 0),
        new BackgroundObject(ImageHub.BACKGROUND_LAYERS.third_layer[0], 0),
        new BackgroundObject(ImageHub.BACKGROUND_LAYERS.second_layer[0], 0),
        new BackgroundObject(ImageHub.BACKGROUND_LAYERS.first_layer[0], 0),
    ];
}

/**
 * Creates a specified number of collectible objects of a given type.
 * @param {Function} ItemClass - The constructor of the object type to create.
 * @param {number} count - The number of objects to create.
 * @returns {DrawableObject[]} Array of created objects.
 */
function createItems(ItemClass, count) {
    return Array.from({ length: count }, () => new ItemClass());
}
