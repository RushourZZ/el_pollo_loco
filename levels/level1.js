import { Level } from "../models/level.class.js";
import { Chicken } from "../models/chicken.class.js";
import { Cloud } from "../models/cloud.class.js";
import { BackgroundObject } from "../models/background-object.class.js";
import { ImageHub } from "../manager_classes/imageHub.js";
import { Endboss } from "../models/endboss.class.js";
import { Coin } from "../models/coin.class.js";
import { Bottle } from "../models/bottle.class.js";

export function createLevel1() {
    return new Level(
        createEnemies(),
        [new Cloud(), new Cloud()],
        createInitialBackground(),
        createItems(Coin, 15),
        createItems(Bottle, 15),
    );
}

function createEnemies() {
    let chickens = Array.from({ length: 4 }, () => new Chicken());
    return [...chickens, new Endboss()];
}

function createInitialBackground() {
    return [
        new BackgroundObject(ImageHub.BACKGROUND_LAYERS.air[0], 0),
        new BackgroundObject(ImageHub.BACKGROUND_LAYERS.third_layer[0], 0),
        new BackgroundObject(ImageHub.BACKGROUND_LAYERS.second_layer[0], 0),
        new BackgroundObject(ImageHub.BACKGROUND_LAYERS.first_layer[0], 0),
    ];
}

function createItems(ItemClass, count) {
    return Array.from({ length: count }, () => new ItemClass());
}