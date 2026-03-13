import { DrawableObject } from "./drawable-object.class.js";
import {ImageHub} from "../manager_classes/imageHub.js";
import { IntervalHub } from "../manager_classes/intervalHub.js";

export class Coin extends DrawableObject {
    height = 100;
    width = 100;

    constructor(){
        super();
        this.loadImage(ImageHub.ICONS.coin[0]);
        this.loadImages(ImageHub.ICONS.coin);
        this.x = 300 + Math.random() * 1800;
        this.y = 100 + Math.random() * 250;
        this.animate();
    }

    animate() {
        IntervalHub.startInterval(() => {
            let i = this.currentImage % ImageHub.ICONS.coin.length;
            this.img = this.imageCache[ImageHub.ICONS.coin[i]];
            this.currentImage++;
        }, 1000 / 60);
    }
}