import { ImageHub } from "../manager_classes/imageHub.js";
import { DrawableObject } from "./drawable-object.class.js";

export class StatusBar extends DrawableObject {
    percentage = 100;

    constructor() {
        super();
        this.loadImages(ImageHub.STATUSBARS.statusbar_player_health_orange);
        this.setPercentage(100);
        this.x = 60;
        this.y = 0;
        this.width = 200;
        this.height = 60;
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = ImageHub.STATUSBARS.statusbar_player_health_orange[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
    resolveImageIndex() {
        let thresholds = [0, 20, 40, 60, 80, 100];
        return thresholds.filter((t) => this.percentage >= t).length - 1;
    }
}
