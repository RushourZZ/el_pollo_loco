import { ImageHub } from "../manager_classes/imageHub.js";
import { DrawableObject } from "./drawable-object.class.js";

/**
 * Status bar for the endboss health.
 * @extends DrawableObject
 */
export class EndbossStatusBar extends DrawableObject {
    percentage = 100;

    /**
     * Creates the endboss status bar with an initial value of 100%.
     */
    constructor() {
        super();
        this.loadImages(ImageHub.STATUSBARS.statusbar_endboss);
        this.setPercentage(100);
        this.x = 260;
        this.y = 410;
        this.width = 200;
        this.height = 60;
    }

    /**
     * Updates the percentage value and the displayed image of the endboss bar.
     * @param {number} percentage - The new percentage value (0-100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = ImageHub.STATUSBARS.statusbar_endboss[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the image index based on the current percentage value.
     * @returns {number} Index of the matching status bar image (0-5).
     */
    resolveImageIndex() {
        if (this.percentage >= 100) return 5;
        if (this.percentage >= 80) return 4;
        if (this.percentage >= 60) return 3;
        if (this.percentage >= 40) return 2;
        if (this.percentage >= 20) return 1;
        return 0;
    }
}
