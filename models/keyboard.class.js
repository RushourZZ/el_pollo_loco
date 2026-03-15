export class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;

    constructor() {
        this.addEvents();
    }

    addEvents() {
        this.addKeydownListener();
        this.addKeyupListener();
        this.addTouchEvents();
    }

    addKeydownListener() {
        let keyMap = {
            ArrowRight: "RIGHT", ArrowLeft: "LEFT",
            ArrowUp: "UP", ArrowDown: "DOWN",
            " ": "SPACE", d: "D",
        };
        window.addEventListener("keydown", (e) => {
            if (keyMap[e.key]) this[keyMap[e.key]] = true;
        });
    }

    addKeyupListener() {
        let keyMap = {
            ArrowRight: "RIGHT", ArrowLeft: "LEFT",
            ArrowUp: "UP", ArrowDown: "DOWN",
            " ": "SPACE",
        };
        window.addEventListener("keyup", (e) => {
            if (keyMap[e.key]) this[keyMap[e.key]] = false;
        });
    }

    addTouchEvents() {
        this.bindTouch("btnLeft", "LEFT");
        this.bindTouch("btnRight", "RIGHT");
        this.bindTouch("btnJump", "UP");
        this.bindTouch("btnThrow", "D");
    }
    bindTouch(id, key) {
        let btn = document.getElementById(id);
        if (!btn) return;
        btn.addEventListener("touchstart", (e) => {
            e.preventDefault();
            this[key] = true;
        }, {passive: false });
        btn.addEventListener("touchend", (e) => {
            e.preventDefault();
            this[key] = false;
        }, {passive: false });
    }
}
