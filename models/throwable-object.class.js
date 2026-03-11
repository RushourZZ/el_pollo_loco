import { MovableObject } from "./movable-object.class.js";
import { ImageHub } from "../manager_classes/imageHub.js";

export class ThrowableObject extends MovableObject{
    alwaysAboveGround = true;


    constructor(x, y){
        super();
        this.x = x;
        this.y = y;
        this.loadImage(ImageHub.SALSA_BOTTLE.rotation[0]);
        this.loadImages(ImageHub.SALSA_BOTTLE.rotation);
        this.height = 100;
        this.width = 80;
        this.throw(this.x, this.y);
    }


    throw(x, y) {
        this.x = x;
        this.y = y;
        this.speedY = 15;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 1000 / 60)
    }
}