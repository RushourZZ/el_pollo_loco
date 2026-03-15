export class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 150;
    y = 280;
    height = 150;
    width = 100;
    offset = { top: 0, left: 0, right: 0, bottom: 0 };

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

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
