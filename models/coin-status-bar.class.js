import { ImageHub } from "../manager_classes/imageHub.js";
import { DrawableObject } from "./drawable-object.class.js";

/**
 * Status bar for the player's collected coins.
 * @extends DrawableObject
 */
export class CoinStatusBar extends DrawableObject {
    percentage = 0;

    /**
     * Creates the coin status bar with an initial value of 0%.
     */
    constructor() {
        super();
        this.loadImages(ImageHub.STATUSBARS.statusbar_player_coin_blue);
        this.setPercentage(0);
        this.x = 60;
        this.y = 100;
        this.width = 200;
        this.height = 60;
    }

    /**
     * Updates the percentage value and the displayed image of the coin bar.
     * @param {number} percentage - The new percentage value (0-100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = ImageHub.STATUSBARS.statusbar_player_coin_blue[this.resolveImageIndex()];
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
