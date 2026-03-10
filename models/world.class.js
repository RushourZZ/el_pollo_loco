import { Character } from "./character.class.js";
import { BackgroundObject } from "./background-object.class.js";
import { ImageHub } from "../manager_classes/imageHub.js";
import { level1 } from "../levels/level1.js";
import { IntervalHub } from "../manager_classes/intervalHub.js";

export class World {
    character = new Character();
    level = level1;
    enemies = level1.enemies;
    clouds = level1.clouds;
    backgroundObjects = level1.backgroundObjects;
    canvas;
    ctx;
    keyboard;
    camera_x = 50;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.drawBackgroundLoop();
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    checkCollisions() {
        IntervalHub.startInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.hit();
                    console.log("Collision detected", this.character.energy);
                }
            });
            }, 200);
    }
    //#region draw objects
    drawBackgroundLoop() {
        const backgroundSegmentWidth = 719;
        const backgroundSegments = 10;

        for (let i = 0; i < backgroundSegments; i++) {
            let variant = Math.abs(i % 2);
            this.backgroundObjects.push(
                new BackgroundObject(
                    ImageHub.BACKGROUND_LAYERS.air[0],
                    i * backgroundSegmentWidth,
                ),
                new BackgroundObject(
                    ImageHub.BACKGROUND_LAYERS.third_layer[variant],
                    i * backgroundSegmentWidth,
                ),
                new BackgroundObject(
                    ImageHub.BACKGROUND_LAYERS.second_layer[variant],
                    i * backgroundSegmentWidth,
                ),
                new BackgroundObject(
                    ImageHub.BACKGROUND_LAYERS.first_layer[variant],
                    i * backgroundSegmentWidth,
                ),
            );
        }
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);

        this.ctx.translate(-this.camera_x, 0);

        // ? Draw wird immer wieder neu aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }
    addObjectsToMap(objects) {
        objects.forEach((o) => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }
    //#endregion draw objects

    


    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}
