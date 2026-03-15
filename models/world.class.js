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
    gameOver = false;

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
            this.checkEndbossDefeated();
        }, 40);
    }

    //#region check collisions
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
    //#endregion check collisions

    //#region check endboss
    checkEndbossAlert() {
        if (!this.endboss || this.endboss.isDead()) return;
        if (this.character.x > 1900) {
            this.endboss.triggerAlert();
        }
        if (this.endboss.alertPlayed) {
            this.endboss.tryAttack(this);
        }
    }

    checkEndbossDefeated() {
        if (!this.endboss || !this.endboss.isDead() || this.gameOver) return;
        this.gameOver = true;
        setTimeout(() => {
            IntervalHub.stopAllIntervals();
            document.getElementById("gameWonScreen").classList.remove("displayNone");
        }, 1000);
    }
    //#endregion check endboss

    //#region check throwable hits
    checkThrowableHits() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy)) this.handleBottleHit(bottle, enemy);
            });
        });
        this.throwableObjects = this.throwableObjects.filter((b) => !b.hasSplashed);
    }

    handleBottleHit(bottle, enemy) {
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
    checkThrowObjects() {
        if (this.keyboard.D && this.collectedBottles > 0) {
            let bottle = new ThrowableObject(this.character.x, this.character.y);
            this.throwableObjects.push(bottle);
            this.collectedBottles--;
            this.bottleStatusBar.setPercentage((this.collectedBottles / 10) * 100);
            this.keyboard.D = false;
        }
    }
    //#endregion check throwable hits

    //#region draw objects
    drawBackgroundLoop() {
        const segmentWidth = 719;
        for (let i = 0; i < 10; i++) {
            this.createBackgroundSegment(i, segmentWidth);
        }
    }

    createBackgroundSegment(i, width) {
        let variant = i % 2;
        let x = i * width;
        this.backgroundObjects.push(
            new BackgroundObject(ImageHub.BACKGROUND_LAYERS.air[0], x),
            new BackgroundObject(ImageHub.BACKGROUND_LAYERS.third_layer[variant], x),
            new BackgroundObject(ImageHub.BACKGROUND_LAYERS.second_layer[variant], x),
            new BackgroundObject(ImageHub.BACKGROUND_LAYERS.first_layer[variant], x),
        );
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0);
        this.drawHUD();
        this.ctx.translate(this.camera_x, 0);
        this.drawGameObjects();
        this.ctx.translate(-this.camera_x, 0);
        requestAnimationFrame(() => this.draw());
    }

    drawHUD() {
        this.addToMap(this.statusBar);
        this.addToMap(this.coinStatusBar);
        this.addToMap(this.bottleStatusBar);
        if (this.endboss && this.endboss.alertPlayed) {
            this.addToMap(this.endbossStatusBar);
        }
    }

    drawGameObjects() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
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
