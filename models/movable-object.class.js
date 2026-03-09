import { IntervalHub } from "../manager_classes/intervalHub.js";


export class MovableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    currentImage = 0;
    imageCache = {};
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;

    applyGravity() {
        IntervalHub.startInterval(() =>{
            if(this.isAboveGround() || this.speedY > 0){
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60);
    }

    isAboveGround() {
        return this.y < 180;
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    moveRight() {}

    moveLeft() {
        IntervalHub.startInterval(() => { this.x -= 0.15; }, 1000 / 60);
    }
}

