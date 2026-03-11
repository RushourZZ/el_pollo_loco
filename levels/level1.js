import { Level } from "../models/level.class.js";
import { Chicken } from "../models/chicken.class.js";
import { Cloud } from "../models/cloud.class.js";
import { BackgroundObject } from "../models/background-object.class.js";
import { ImageHub } from "../manager_classes/imageHub.js";
import { Endboss } from "../models/endboss.class.js";

export const level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Endboss(),
    ],
    [new Cloud(), new Cloud()],
    [
        new BackgroundObject(ImageHub.BACKGROUND_LAYERS.air[0], 0),
        new BackgroundObject(ImageHub.BACKGROUND_LAYERS.third_layer[0], 0),
        new BackgroundObject(ImageHub.BACKGROUND_LAYERS.second_layer[0], 0),
        new BackgroundObject(ImageHub.BACKGROUND_LAYERS.first_layer[0], 0),
    ],
);
