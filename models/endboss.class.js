import { ImageHub } from "../manager_classes/imageHub.js";
import { MovableObject } from "./movable-object.class.js";
import { IntervalHub } from "../manager_classes/intervalHub.js";

export class Endboss extends MovableObject {

    height = 500;
    width = 300;
    y = -10;
    hasFrame = true;

    constructor() {
        super();
        this.loadImage(ImageHub.ENEMIE_BOSS_CHICKEN.walk[0]);
        this.loadImages(ImageHub.ENEMIE_BOSS_CHICKEN.walk);
        this.loadImages(ImageHub.ENEMIE_BOSS_CHICKEN.hurt);  
        this.loadImages(ImageHub.ENEMIE_BOSS_CHICKEN.alert);
        this.x = 700;
        
        this.animate();
    }



    //#region endboss animations
    endbossAnimation(images) {
        let i = this.currentImage % images.length;
        this.img = this.imageCache[images[i]];
        this.currentImage++;
    }

    animate() {
        IntervalHub.startInterval(() => {
            this.endbossAnimation(ImageHub.ENEMIE_BOSS_CHICKEN.walk);
        }, 7000 / 60)

       
    }
    //#endregion endboss animations
}
