import { Character } from "./character.class.js";
import { BackgroundObject } from "./background-object.class.js";
import { ImageHub } from "../manager_classes/imageHub.js";
import { createLevel1 } from "../levels/level1.js";
import { IntervalHub } from "../manager_classes/intervalHub.js";
import { StatusBar } from "./status-bar.class.js";
import { CoinStatusBar } from "./coin-status-bar.class.js";
import { BottleStatusBar } from "./bottle-status-bar.class.js";
import { ThrowableObject } from "./throwable-object.class.js";
import { Endboss } from "./endboss.class.js";
import { EndbossStatusBar } from "./endboss-status-bar.class.js";
import { SoundHub } from "../manager_classes/soundHub.js";

export class World {
    character = new Character();
    level;
    enemies;
    clouds;
    backgroundObjects;
    canvas;
    ctx;
    keyboard;
    camera_x = 50;
    statusBar = new StatusBar();
    throwableObjects = [];
    coinStatusBar = new CoinStatusBar();
    bottleStatusBar = new BottleStatusBar();
    collectedCoins = 0;
    collectedBottles = 0;
    endbossStatusBar = new EndbossStatusBar();
    endboss = null;

    constructor(canvas, keyboard) {
        this.level = createLevel1();
        this.enemies = this.level.enemies;
        this.clouds = this.level.clouds;
        this.backgroundObjects = this.level.backgroundObjects;
        this.endboss = this.level.enemies.find((e) => e instanceof Endboss);
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.drawBackgroundLoop();
        this.setWorld();
        this.draw();
        this.run();
    }

    run() {
        IntervalHub.startInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkEndbossAlert();
        }, 40);
    }

    checkCollisions() {
        this.checkEnemyCollisions();
        this.checkCoinCollisions();
        this.checkBottleCollisions();
        this.checkThrowableHits();
    }
    checkEnemyCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !enemy.isDead()) {
                if (this.isStompingEnemy(enemy)) {
                    enemy.energy = 0;
                    this.character.speedY = 15;
                } else {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                }
            }
        });
    }

    isStompingEnemy(enemy) {
        if (enemy instanceof Endboss) return false;
        return this.character.speedY < 0;
    }
    checkCoinCollisions() {
        this.level.coins = this.level.coins.filter((coin) => {
            if (this.character.isColliding(coin)) {
                this.collectedCoins++;

                this.coinStatusBar.setPercentage((this.collectedCoins / 10) * 100);
                SoundHub.COLLECTIBLE.coin.currentTime = 0;
                SoundHub.COLLECTIBLE.coin.play();
                return false;
            }
            return true;
        });
    }
    checkBottleCollisions() {
        this.level.bottles = this.level.bottles.filter((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.collectedBottles++;
                this.bottleStatusBar.setPercentage((this.collectedBottles / 10) * 100);
                SoundHub.COLLECTIBLE.bottle.currentTime = 0;
                SoundHub.COLLECTIBLE.bottle.play();
                return false;
            }
            return true;
        });
    }

    checkEndbossAlert() {
        if (!this.endboss || this.endboss.isDead()) return;
        if (this.character.x > 1900) {
            this.endboss.triggerAlert();
        }
        if (this.endboss.alertPlayed) {
            this.endboss.tryAttack(this);
        }
    }

    checkThrowableHits() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy)) {
                    if (enemy instanceof Endboss) {
                        enemy.hit();
                        this.endbossStatusBar.setPercentage(enemy.energy);
                    } else {
                        enemy.energy = 0;
                        setTimeout(() => {
                            this.level.enemies = this.level.enemies.filter((e) => e !== enemy);
                        }, 500);
                    }
                    bottle.startSplash();
                }
            });
        });
        this.throwableObjects = this.throwableObjects.filter((bottle) => !bottle.hasSplashed);
    }
    checkThrowObjects() {
        if (this.keyboard.D && this.collectedBottles > 0) {
            let bottle = new ThrowableObject(this.character.x, this.character.y);
            this.throwableObjects.push(bottle);
            this.collectedBottles--;
            this.bottleStatusBar.setPercentage((this.collectedBottles / 10) * 100);
            this.keyboard.D = false;
        }
    }
    //#region draw objects
    drawBackgroundLoop() {
        const backgroundSegmentWidth = 719;
        const backgroundSegments = 10;

        for (let i = 0; i < backgroundSegments; i++) {
            let variant = Math.abs(i % 2);
            this.backgroundObjects.push(
                new BackgroundObject(ImageHub.BACKGROUND_LAYERS.air[0], i * backgroundSegmentWidth),
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

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.coinStatusBar);
        this.addToMap(this.bottleStatusBar);
        if (this.endboss && this.endboss.alertPlayed) this.addToMap(this.endbossStatusBar);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
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
