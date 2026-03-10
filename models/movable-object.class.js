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
    energy = 100;

    lastHit = 0;

    applyGravity() {
        IntervalHub.startInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
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

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (!this.hasFrame) return;
        ctx.beginPath();
        ctx.lineWidth = "1";
        ctx.strokeStyle = "red";
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }

    isColliding(mo) {
        return (
            this.x + this.width > mo.x &&
            this.x < mo.x + mo.width &&
            this.y + this.height > mo.y &&
            this.y < mo.y + mo.height
        );
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isDead() {
        return this.energy == 0;
        
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        return timePassed < 100;
    }
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
    }

    jump() {
        this.speedY = 30;
    }
}
