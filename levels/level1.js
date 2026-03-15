import { Level } from "../models/level.class.js";
import { Chicken } from "../models/chicken.class.js";
import { Cloud } from "../models/cloud.class.js";
import { BackgroundObject } from "../models/background-object.class.js";
import { ImageHub } from "../manager_classes/imageHub.js";
import { Endboss } from "../models/endboss.class.js";
import { Coin } from "../models/coin.class.js";
import { Bottle } from "../models/bottle.class.js";

/**
 * Erstellt und konfiguriert das erste Spiel-Level mit allen Objekten.
 * @returns {Level} Das vollstaendig initialisierte Level-1-Objekt.
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
 * Erstellt die Gegner-Liste fuer Level 1 (Huehner + Endboss).
 * @returns {MovableObject[]} Array aller Gegner.
 */
function createEnemies() {
    let chickens = Array.from({ length: 4 }, () => new Chicken());
    return [...chickens, new Endboss()];
}

/**
 * Erstellt eine bestimmte Anzahl von Wolken.
 * @param {number} count - Die Anzahl der zu erstellenden Wolken.
 * @returns {Cloud[]} Array der erstellten Wolken.
 */
function createClouds() {
    return Array.from({ length: 15 }, () => new Cloud());
}

/**
 * Erstellt das initiale Hintergrund-Segment an Position 0.
 * @returns {BackgroundObject[]} Array der vier Hintergrund-Ebenen.
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
 * Erstellt eine bestimmte Anzahl von Sammelobjekten eines Typs.
 * @param {Function} ItemClass - Der Konstruktor des zu erstellenden Objekttyps.
 * @param {number} count - Die Anzahl der zu erstellenden Objekte.
 * @returns {DrawableObject[]} Array der erstellten Objekte.
 */
function createItems(ItemClass, count) {
    return Array.from({ length: count }, () => new ItemClass());
}
