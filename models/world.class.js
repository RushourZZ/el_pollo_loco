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

/**
 * Zentrale Spielwelt-Klasse, verwaltet Spielobjekte, Kollisionen und das Rendering.
 */
export class World {
    /** @type {Character} */
    character = new Character();
    /** @type {Level} */
    level;
    /** @type {MovableObject[]} */
    enemies;
    /** @type {Cloud[]} */
    clouds;
    /** @type {BackgroundObject[]} */
    backgroundObjects;
    /** @type {HTMLCanvasElement} */
    canvas;
    /** @type {CanvasRenderingContext2D} */
    ctx;
    /** @type {Keyboard} */
    keyboard;
    /** @type {number} */
    camera_x = 50;
    /** @type {StatusBar} */
    statusBar = new StatusBar();
    /** @type {ThrowableObject[]} */
    throwableObjects = [];
    /** @type {CoinStatusBar} */
    coinStatusBar = new CoinStatusBar();
    /** @type {BottleStatusBar} */
    bottleStatusBar = new BottleStatusBar();
    /** @type {number} */
    collectedCoins = 0;
    /** @type {number} */
    collectedBottles = 0;
    /** @type {EndbossStatusBar} */
    endbossStatusBar = new EndbossStatusBar();
    /** @type {Endboss|null} */
    endboss = null;
    /** @type {boolean} */
    gameOver = false;

    /**
     * Erstellt die Spielwelt und initialisiert Level, Canvas und alle Subsysteme.
     * @param {HTMLCanvasElement} canvas - Das Canvas-Element fuer die Darstellung.
     * @param {Keyboard} keyboard - Die Tastatureingabe-Instanz.
     */
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

    /**
     * Startet den Haupt-Spielintervall fuer Kollisionen und Spiellogik.
     */
    run() {
        IntervalHub.startInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkEndbossAlert();
            this.checkEndbossDefeated();
        }, 40);
    }

    //#region check collisions
    /**
     * Prueft alle Kollisionsarten: Gegner, Muenzen, Flaschen und Wurfgeschosse.
     */
    checkCollisions() {
        this.checkEnemyCollisions();
        this.checkCoinCollisions();
        this.checkBottleCollisions();
        this.checkThrowableHits();
    }

    /**
     * Prueft Kollisionen zwischen dem Charakter und allen Gegnern.
     */
    checkEnemyCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !enemy.isDead() && !this.character.isHurt()) {
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

    /**
     * Prueft, ob der Charakter einen Gegner von oben trifft (Stomp).
     * @param {MovableObject} enemy - Der zu pruefende Gegner.
     * @returns {boolean} True, wenn der Charakter den Gegner von oben trifft.
     */
    isStompingEnemy(enemy) {
        if (enemy instanceof Endboss) return false;
        return this.character.speedY < 0;
    }

    /**
     * Erkennt und verarbeitet das Einsammeln von Muenzen.
     */
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

    /**
     * Erkennt und verarbeitet das Einsammeln von Flaschen.
     */
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
    /**
     * Prueft, ob der Endboss alarmiert werden soll, und loest ggf. Angriffe aus.
     */
    checkEndbossAlert() {
        if (!this.endboss || this.endboss.isDead()) return;
        if (this.character.x > 1900) {
            this.endboss.triggerAlert();
        }
        if (this.endboss.alertPlayed) {
            this.endboss.tryAttack(this);
        }
    }

    /**
     * Prueft, ob der Endboss besiegt wurde, und zeigt den Gewinn-Bildschirm.
     */
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
    /**
     * Prueft Treffer von Wurfgeschossen auf Gegner und entfernt zersplitterte Flaschen.
     */
    checkThrowableHits() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy)) this.handleBottleHit(bottle, enemy);
            });
        });
        this.throwableObjects = this.throwableObjects.filter((b) => !b.hasSplashed);
    }

    /**
     * Verarbeitet den Treffer einer geworfenen Flasche auf einen Gegner.
     * @param {ThrowableObject} bottle - Das Wurfgeschoss.
     * @param {MovableObject} enemy - Der getroffene Gegner.
     */
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

    /**
     * Erstellt ein Wurfgeschoss, wenn der Spieler wirft und Flaschen besitzt.
     */
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
    /**
     * Erstellt die sich wiederholenden Hintergrund-Segmente der Spielwelt.
     */
    drawBackgroundLoop() {
        const segmentWidth = 719;
        for (let i = 0; i < 10; i++) {
            this.createBackgroundSegment(i, segmentWidth);
        }
    }

    /**
     * Erzeugt ein einzelnes Hintergrund-Segment aus vier Parallax-Ebenen.
     * @param {number} i - Der Segment-Index.
     * @param {number} width - Die Breite eines Segments in Pixeln.
     */
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

    /**
     * Setzt die Referenz der Spielwelt im Charakter-Objekt.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Haupt-Render-Loop: loescht Canvas und zeichnet alle Ebenen pro Frame.
     */
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

    /**
     * Zeichnet die HUD-Elemente (Statusleisten) ohne Kamera-Verschiebung.
     */
    drawHUD() {
        this.addToMap(this.statusBar);
        this.addToMap(this.coinStatusBar);
        this.addToMap(this.bottleStatusBar);
        if (this.endboss && this.endboss.alertPlayed) {
            this.addToMap(this.endbossStatusBar);
        }
    }

    /**
     * Zeichnet alle dynamischen Spielobjekte (Charakter, Wolken, Gegner, Items).
     */
    drawGameObjects() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
    }

    /**
     * Fuegt ein Array von Objekten zur Zeichenflaeche hinzu.
     * @param {DrawableObject[]} objects - Die zu zeichnenden Objekte.
     */
    addObjectsToMap(objects) {
        objects.forEach((o) => {
            this.addToMap(o);
        });
    }

    /**
     * Zeichnet ein einzelnes Objekt auf das Canvas, ggf. horizontal gespiegelt.
     * @param {DrawableObject} mo - Das zu zeichnende Objekt.
     */
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

    /**
     * Spiegelt ein Objekt horizontal fuer die Darstellung in Gegenrichtung.
     * @param {DrawableObject} mo - Das zu spiegelnde Objekt.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Setzt die horizontale Spiegelung eines Objekts zurueck.
     * @param {DrawableObject} mo - Das zurueckzusetzende Objekt.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}
