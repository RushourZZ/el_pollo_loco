/**
 * Basisklasse fuer alle zeichenbaren Spielobjekte auf dem Canvas.
 */
export class DrawableObject {
    /** @type {HTMLImageElement} */
    img;
    /** @type {Object<string, HTMLImageElement>} */
    imageCache = {};
    /** @type {number} */
    currentImage = 0;
    /** @type {number} */
    x = 150;
    /** @type {number} */
    y = 280;
    /** @type {number} */
    height = 150;
    /** @type {number} */
    width = 100;
    /** @type {{top: number, left: number, right: number, bottom: number}} */
    offset = { top: 0, left: 0, right: 0, bottom: 0 };

    /**
     * Laedt ein einzelnes Bild und setzt es als aktuelle Darstellung.
     * @param {string} path - Der Dateipfad zum Bild.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Zeichnet das aktuelle Bild auf das Canvas.
     * @param {CanvasRenderingContext2D} ctx - Der 2D-Rendering-Kontext.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Laedt mehrere Bilder in den Cache und gibt ein Promise zurueck.
     * @param {string[]} arr - Array von Bildpfaden.
     * @returns {Promise<void[]>} Wird aufgeloest, wenn alle Bilder geladen sind.
     */
    loadImages(arr) {
        let promises = arr.map((path) => {
            return new Promise((resolve) => {
                let img = new Image();
                img.onload = () => resolve();
                img.src = path;
                this.imageCache[path] = img;
            });
        });
        return Promise.all(promises);
    }

    /**
     * Zeichnet einen Debug-Rahmen um die Kollisions-Hitbox des Objekts.
     * @param {CanvasRenderingContext2D} ctx - Der 2D-Rendering-Kontext.
     */
    drawFrame(ctx) {
        if (!this.hasFrame) return;
        ctx.beginPath();
        ctx.lineWidth = "1";
        ctx.strokeStyle = "red";
        ctx.rect(
            this.x + this.offset.left,
            this.y + this.offset.top,
            this.width - this.offset.right - this.offset.left,
            this.height - this.offset.bottom - this.offset.top,
        );
        ctx.stroke();
    }
}
