import { MovableObject } from "./movable-object.class.js";
import { ImageHub } from "../manager_classes/imageHub.js";

export class Character extends MovableObject {
height = 280;
y = 155;
    constructor() {
        super();
        this.loadImage(
            ImageHub.CHARACTER.idle[0],
        );

        this.loadImages(ImageHub.CHARACTER.idle);
    }

    jump() {}
}
