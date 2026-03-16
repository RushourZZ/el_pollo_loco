/**
 * Manages keyboard and touch inputs for game controls.
 */
export class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;

    /**
     * Creates the keyboard instance and registers all event listeners.
     */
    constructor() {
        this.addEvents();
    }

    /**
     * Registers all keyboard and touch event listeners.
     */
    addEvents() {
        this.addKeydownListener();
        this.addKeyupListener();
        this.addTouchEvents();
    }

    /**
     * Registers the keydown listener for keyboard controls.
     */
    addKeydownListener() {
        let keyMap = {
            ArrowRight: "RIGHT",
            ArrowLeft: "LEFT",
            ArrowUp: "UP",
            ArrowDown: "DOWN",
            " ": "SPACE",
            d: "D",
        };
        window.addEventListener("keydown", (e) => {
            if (keyMap[e.key]) this[keyMap[e.key]] = true;
        });
    }

    /**
     * Registers the keyup listener to reset key states.
     */
    addKeyupListener() {
        let keyMap = {
            ArrowRight: "RIGHT",
            ArrowLeft: "LEFT",
            ArrowUp: "UP",
            ArrowDown: "DOWN",
            " ": "SPACE",
        };
        window.addEventListener("keyup", (e) => {
            if (keyMap[e.key]) this[keyMap[e.key]] = false;
        });
    }

    /**
     * Binds touch events to the mobile control elements.
     */
    addTouchEvents() {
        this.bindTouch("btnLeft", "LEFT");
        this.bindTouch("btnRight", "RIGHT");
        this.bindTouch("btnJump", "UP");
        this.bindTouch("btnThrow", "D");
    }

    /**
     * Binds touchstart and touchend events to a button.
     * @param {string} id - The DOM ID of the touch button.
     * @param {string} key - The key state to set.
     */
    bindTouch(id, key) {
        let btn = document.getElementById(id);
        if (!btn) return;
        btn.addEventListener(
            "touchstart",
            (e) => {
                e.preventDefault();
                this[key] = true;
            },
            { passive: false },
        );
        btn.addEventListener(
            "touchend",
            (e) => {
                e.preventDefault();
                this[key] = false;
            },
            { passive: false },
        );
    }
}
