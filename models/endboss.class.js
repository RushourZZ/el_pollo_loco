import { ImageHub } from "../manager_classes/imageHub.js";
import { MovableObject } from "./movable-object.class.js";
import { IntervalHub } from "../manager_classes/intervalHub.js";
import { SmallChicken } from "./small-chicken.class.js";
import { SoundHub } from "../manager_classes/soundHub.js";

export class Endboss extends MovableObject {
    height = 500;
    width = 300;
    y = -10;
    hasFrame = true;
    isAlerted = false;
    alertPlayed = false;
    lastAttack = 0;
    lastDirectionChange = 0;
    movingRight = true;
    speed = 1.5;
    offset = { top: 60, bottom: 10, left: 30, right: 30 };

    constructor() {
        super();
        this.loadImage(ImageHub.ENEMIE_BOSS_CHICKEN.walk[0]);
        this.loadImages(ImageHub.ENEMIE_BOSS_CHICKEN.walk);
        this.loadImages(ImageHub.ENEMIE_BOSS_CHICKEN.hurt);
        this.loadImages(ImageHub.ENEMIE_BOSS_CHICKEN.alert);
        this.loadImages(ImageHub.ENEMIE_BOSS_CHICKEN.attack);
        this.loadImages(ImageHub.ENEMIE_BOSS_CHICKEN.dead);
        this.x = 2200;
        this.animate();
    }

    animate() {
        IntervalHub.startInterval(() => {
            this.moveEndboss();
        }, 1000 / 60);
        IntervalHub.startInterval(() => {
            this.updateAnimation();
        }, 150);
    }

    moveEndboss() {
        if (!this.isAlerted || this.isDead()) return;
        let now = Date.now();
        if (now - this.lastDirectionChange > 2000) {
            this.movingRight = !this.movingRight;
            this.lastDirectionChange = now;
        }
        if (this.movingRight) {
            this.moveRight();
            this.otherDirection = true;
        } else {
            this.moveLeft();
            this.otherDirection = false;
        }
    }

    updateAnimation() {
        if (this.isDead()) {
            this.endbossAnimation(ImageHub.ENEMIE_BOSS_CHICKEN.dead);
            SoundHub.ENDBOSS.approach.play();
        } else if (this.isHurt()) {
            this.endbossAnimation(ImageHub.ENEMIE_BOSS_CHICKEN.hurt);
        } else if (this.isAlerted && !this.alertPlayed) {
            this.playAlert();
            
        } else if (this.isAttacking) {
            this.endbossAnimation(ImageHub.ENEMIE_BOSS_CHICKEN.attack);
            
        } else if (this.isAlerted) {
            this.endbossAnimation(ImageHub.ENEMIE_BOSS_CHICKEN.walk);
            
        }
    }

    playAlert() {
        this.endbossAnimation(ImageHub.ENEMIE_BOSS_CHICKEN.alert);
        if (this.currentImage >= ImageHub.ENEMIE_BOSS_CHICKEN.alert.length) {
            this.alertPlayed = true;
            this.currentImage = 0;
        }
    }

    triggerAlert() {
        if (this.isAlerted) return;
        this.isAlerted = true;
        this.currentImage = 0;
        SoundHub.ENDBOSS.approach.volume = 1.0;
        SoundHub.ENDBOSS.approach.play();
        console.log("ENDBOSS SOUND PLAYED");
        
    }

    tryAttack(world) {
        let now = Date.now();
        if (now - this.lastAttack < 3000) return;
        this.lastAttack = now;
        this.isAttacking = true;
        this.currentImage = 0;
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                world.level.enemies.push(new SmallChicken(this.x - 50));
            }, i * 300);
        }
        setTimeout(() => {
            this.isAttacking = false;
            this.currentImage = 0;
        }, 150 * ImageHub.ENEMIE_BOSS_CHICKEN.attack.length);
    }

    endbossAnimation(images) {
        let i = this.currentImage % images.length;
        this.img = this.imageCache[images[i]];
        this.currentImage++;
    }
}
