/**
 * Zentrale Verwaltung aller Spielsounds mit Mute-Funktion und localStorage-Persistenz.
 */
export class SoundHub {
    /** @type {boolean} */
    static isMuted = localStorage.getItem("muted") === "true";

    /** @type {HTMLAudioElement} */
    static gameStart = new Audio("audio/game/gameStart.mp3");

    /** @type {{damage: HTMLAudioElement, death: HTMLAudioElement, jump: HTMLAudioElement, walk: HTMLAudioElement, longIdle: HTMLAudioElement}} */
    static CHARACTER = {
        damage: new Audio("audio/character/characterDamage.mp3"),
        death: new Audio("audio/character/characterDead.wav"),
        jump: new Audio("audio/character/characterJump.wav"),
        walk: new Audio("audio/character/characterRun.mp3"),
        longIdle: new Audio("audio/character/characterSnoring.mp3"),
    };

    /** @type {{death: HTMLAudioElement}} */
    static CHICKEN_NORMAL = {
        death: new Audio("audio/chicken/chickenDead.mp3"),
    };

    /** @type {{approach: HTMLAudioElement}} */
    static ENDBOSS = {
        approach: new Audio("audio/endboss/endbossApproach.wav"),
    };

    /** @type {HTMLAudioElement} */
    static BACKGROUND = new Audio(
        "audio/background/ikoliks_aj-latin-mexican-spanish-music-391962.mp3",
    );

    /** @type {{death: HTMLAudioElement}} */
    static SMALL_CHICKEN_DEATH = {
        death: new Audio("audio/chicken/chickenDead2.mp3"),
    };

    /** @type {{coin: HTMLAudioElement, bottle: HTMLAudioElement}} */
    static COLLECTIBLE = {
        coin: new Audio("audio/collectibles/collectSound.wav"),
        bottle: new Audio("audio/collectibles/bottleCollectSound.wav"),
    };

    /** @type {{bottle: HTMLAudioElement}} */
    static THROWABLE = {
        bottle: new Audio("audio/throwable/bottleBreak.mp3"),
    };

    /**
     * Sammelt alle Sound-Objekte aus allen Kategorien in ein Array.
     * @returns {HTMLAudioElement[]} Array aller registrierten Sounds.
     */
    static getAllSounds() {
        let sounds = [this.gameStart, this.BACKGROUND];
        let categories = [
            this.CHARACTER,
            this.CHICKEN_NORMAL,
            this.ENDBOSS,
            this.SMALL_CHICKEN_DEATH,
            this.COLLECTIBLE,
            this.THROWABLE,
        ];
        categories.forEach((cat) => sounds.push(...Object.values(cat)));
        return sounds;
    }

    /**
     * Schaltet den Mute-Zustand um und speichert ihn im localStorage.
     * @returns {boolean} Der neue Mute-Zustand.
     */
    static toggleMute() {
        this.isMuted = !this.isMuted;
        localStorage.setItem("muted", this.isMuted);
        this.applyMute();
        return this.isMuted;
    }

    /**
     * Wendet den aktuellen Mute-Zustand und die Lautstaerke auf alle Sounds an.
     */
    static applyMute() {
        this.getAllSounds().forEach((sound) => {
            sound.muted = this.isMuted;
            sound.volume = sound === this.BACKGROUND ? 0.1 : 0.4;
        });
    }

    /**
     * Stoppt alle Sounds und setzt deren Wiedergabeposition zurueck.
     */
    static resetAllSounds() {
        this.getAllSounds().forEach((sound) => {
            sound.pause();
            sound.currentTime = 0;
        });
    }
}
