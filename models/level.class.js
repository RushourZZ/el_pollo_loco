

export class Level {
    enemies;
    clouds;
    backgroundObjects;
    endboss;
    level_end_x = 3000;

    constructor(enemies, clouds, backgroundObjects, endboss) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.endboss = endboss;
    }
}