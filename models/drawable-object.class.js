/**
 * Base class for all drawable game objects on the canvas.
 */
export class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 150;
    y = 280;
    height = 150;
    width = 100;
    offset = { top: 0, left: 0, right: 0, bottom: 0 };

    /**
     * Loads a single image and sets it as the current sprite.
     * @param {string} path - The file path to the image.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the current image onto the canvas.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Loads multiple images into the cache and returns a promise.
     * @param {string[]} arr - Array of image paths.
     * @returns {Promise} Resolves when all images are loaded.
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
     * Draws a debug frame around the collision hitbox.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context.
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
