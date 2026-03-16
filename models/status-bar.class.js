import { ImageHub } from "../manager_classes/imageHub.js";
import { DrawableObject } from "./drawable-object.class.js";

/**
 * Status bar for the player's health.
 * @extends DrawableObject
 */
export class StatusBar extends DrawableObject {
    percentage = 100;

    /**
     * Creates the health status bar with an initial value of 100%.
     */
    constructor() {
        super();
        this.loadImages(ImageHub.STATUSBARS.statusbar_player_health_orange);
        this.setPercentage(100);
        this.x = 60;
        this.y = 0;
        this.width = 200;
        this.height = 60;
    }

    /**
     * Updates the percentage value and the displayed image of the status bar.
     * @param {number} percentage - The new percentage value (0-100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = ImageHub.STATUSBARS.statusbar_player_health_orange[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the image index based on the current percentage value.
     * @returns {number} Index of the matching status bar image (0-5).
     */
    resolveImageIndex() {
        let thresholds = [0, 20, 40, 60, 80, 100];
        return thresholds.filter((t) => this.percentage >= t).length - 1;
    }
}
