import { ImageHub } from "../manager_classes/imageHub.js";
import { MovableObject } from "./movable-object.class.js";
import { IntervalHub } from "../manager_classes/intervalHub.js";

export class Endboss extends MovableObject {

    height = 500;
    width = 300;
    y = -10;
// #region endboss images
    IMAGES_WALKING = [
        ImageHub.ENEMIE_BOSS_CHICKEN.walk[0],
        ImageHub.ENEMIE_BOSS_CHICKEN.walk[1],
        ImageHub.ENEMIE_BOSS_CHICKEN.walk[2],
    ];

    IMAGES_HURT = [
        ImageHub.ENEMIE_BOSS_CHICKEN.hurt[0],
        ImageHub.ENEMIE_BOSS_CHICKEN.hurt[1],
        ImageHub.ENEMIE_BOSS_CHICKEN.hurt[2],
    ];

    IMAGES_DEAD = [
        ImageHub.ENEMIE_BOSS_CHICKEN.dead[0],
        ImageHub.ENEMIE_BOSS_CHICKEN.dead[1],
        ImageHub.ENEMIE_BOSS_CHICKEN.dead[2],
    ];

    IMAGES_ALERT = [
        ImageHub.ENEMIE_BOSS_CHICKEN.alert[0],
        ImageHub.ENEMIE_BOSS_CHICKEN.alert[1],
        ImageHub.ENEMIE_BOSS_CHICKEN.alert[2],
    ];
// #endregion endboss images 
    constructor() {
        super();
        this.loadImage(ImageHub.ENEMIE_BOSS_CHICKEN.walk[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);  
        this.loadImages(this.IMAGES_ALERT);
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
            this.endbossAnimation(this.IMAGES_ALERT);
        }, 7000 / 60)

       
    }
    //#endregion endboss animations
}
