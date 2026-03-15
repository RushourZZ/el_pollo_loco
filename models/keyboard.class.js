/**
 * Verwaltet Tastatur- und Touch-Eingaben fuer die Spielsteuerung.
 */
export class Keyboard {
    /** @type {boolean} */
    LEFT = false;
    /** @type {boolean} */
    RIGHT = false;
    /** @type {boolean} */
    UP = false;
    /** @type {boolean} */
    DOWN = false;
    /** @type {boolean} */
    SPACE = false;
    /** @type {boolean} */
    D = false;

    /**
     * Erstellt die Keyboard-Instanz und registriert alle Event-Listener.
     */
    constructor() {
        this.addEvents();
    }

    /**
     * Registriert alle Tastatur- und Touch-Event-Listener.
     */
    addEvents() {
        this.addKeydownListener();
        this.addKeyupListener();
        this.addTouchEvents();
    }

    /**
     * Registriert den Keydown-Listener fuer die Tastatursteuerung.
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
     * Registriert den Keyup-Listener zum Zuruecksetzen der Tastenzustaende.
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
     * Bindet Touch-Events an die mobilen Steuerungselemente.
     */
    addTouchEvents() {
        this.bindTouch("btnLeft", "LEFT");
        this.bindTouch("btnRight", "RIGHT");
        this.bindTouch("btnJump", "UP");
        this.bindTouch("btnThrow", "D");
    }

    /**
     * Bindet Touch-Start und Touch-End Events an einen Button.
     * @param {string} id - Die DOM-ID des Touch-Buttons.
     * @param {string} key - Der Tastenzustand, der gesetzt werden soll.
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
