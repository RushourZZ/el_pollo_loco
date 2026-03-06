import { MovableObject } from "./movable-object.class.js";
import { ImageHub } from "../manager_classes/imageHub.js";

export class Chicken extends MovableObject {
    y = 370;
    height = 70;
    width = 70;
    constructor() {
        super().loadImage(ImageHub.ENEMIES_CHICKEN_NORMAL.walk[0]);

        this.x = 200 + Math.random() * 500;
    }
}
