import { MovableObject } from "./movable-object.class.js";
import { ImageHub } from "../manager_classes/imageHub.js";
import { IntervalHub } from "../manager_classes/intervalHub.js";


export class Character extends MovableObject {
    height = 280;
    y = 155;
    world;
    speed = 10;

    constructor() {
        super();
        this.loadImage(ImageHub.CHARACTER.idle[0]);
        this.loadImages(ImageHub.CHARACTER.idle);
        this.loadImages(ImageHub.CHARACTER.long_idle);
        this.loadImages(ImageHub.CHARACTER.walk);
        this.loadImages(ImageHub.CHARACTER.jump);
        this.loadImages(ImageHub.CHARACTER.hurt);
        this.loadImages(ImageHub.CHARACTER.dead);
        this.applyGravity();

        this.animate();
    }




    //#region character animation
    animate() {

        IntervalHub.startInterval(() => {
                this.characterAnimation(ImageHub.CHARACTER.idle);
        }, 7800 / 60);

        IntervalHub.startInterval(() => {
            if(this.world.keyboard.RIGHT  && this.x < this.world.level.level_end_x){
                this.x += this.speed;
                this.otherDirection = false;
                this.characterAnimation(ImageHub.CHARACTER.walk);
            }
            if(this.world.keyboard.LEFT && this.x > 100){
                this.x -= this.speed;
                this.otherDirection = true;
                this.characterAnimation(ImageHub.CHARACTER.walk);
            }
            if(this.world.keyboard.UP && !this.isAboveGround()){
                this.speedY = 20
                
            }
            if(this.isAboveGround()){
                this.characterAnimation(ImageHub.CHARACTER.jump);
            }

            this.world.camera_x = -this.x + 100;
        }, 2000 / 60);
    }

    characterAnimation(images){
        let i = this.currentImage % images.length;
            this.img = this.imageCache[images[i]];
            this.currentImage++;
    }

    jump() {}

    //#endregion character animation
}
