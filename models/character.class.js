import { MovableObject } from "./movable-object.class.js";
import { ImageHub } from "../manager_classes/imageHub.js";

export class Character extends MovableObject {
    constructor() {
        super().loadImage(
            ImageHub.CHARACTER.idle[0],
        );
    }

    jump() {}
}
