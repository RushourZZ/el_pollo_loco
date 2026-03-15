import { ImageHub } from "../manager_classes/imageHub.js";
import { DrawableObject } from "./drawable-object.class.js";

/**
 * Statusleiste fuer die Gesundheit des Spielers.
 * @extends DrawableObject
 */
export class StatusBar extends DrawableObject {
    /** @type {number} */
    percentage = 100;

    /**
     * Erstellt die Gesundheits-Statusleiste mit Anfangswert 100%.
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
     * Aktualisiert den Prozentwert und das angezeigte Bild der Statusleiste.
     * @param {number} percentage - Der neue Prozentwert (0-100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = ImageHub.STATUSBARS.statusbar_player_health_orange[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Ermittelt den Bildindex anhand des aktuellen Prozentwerts.
     * @returns {number} Index des passenden Statusleisten-Bildes (0-5).
     */
    resolveImageIndex() {
        let thresholds = [0, 20, 40, 60, 80, 100];
        return thresholds.filter((t) => this.percentage >= t).length - 1;
    }
}
