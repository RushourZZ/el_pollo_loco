import { ImageHub } from "../manager_classes/imageHub.js";
import { DrawableObject } from "./drawable-object.class.js";

export class BottleStatusBar extends DrawableObject {
    percentage = 0;

    constructor() {
        super();
        this.loadImages(ImageHub.STATUSBARS.statusbar_player_bottle_green);
        this.setPercentage(0);
        this.x = 60;
        this.y = 50;
        this.width = 200;
        this.height = 60;
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = ImageHub.STATUSBARS.statusbar_player_bottle_green[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage >= 100) return 5;
        if (this.percentage >= 80) return 4;
        if (this.percentage >= 60) return 3;
        if (this.percentage >= 40) return 2;
        if (this.percentage >= 20) return 1;
        return 0;
    }
}