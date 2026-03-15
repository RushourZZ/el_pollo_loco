import { ImageHub } from "../manager_classes/imageHub.js";
import { DrawableObject } from "./drawable-object.class.js";

/**
 * Statusleiste fuer die gesammelten Muenzen des Spielers.
 * @extends DrawableObject
 */
export class CoinStatusBar extends DrawableObject {
    /** @type {number} */
    percentage = 0;

    /**
     * Erstellt die Muenz-Statusleiste mit Anfangswert 0%.
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
     * Aktualisiert den Prozentwert und das angezeigte Bild der Muenzleiste.
     * @param {number} percentage - Der neue Prozentwert (0-100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = ImageHub.STATUSBARS.statusbar_player_coin_blue[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Ermittelt den Bildindex anhand des aktuellen Prozentwerts.
     * @returns {number} Index des passenden Statusleisten-Bildes (0-5).
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
