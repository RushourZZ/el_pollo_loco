export class SoundHub {
    static isMuted = localStorage.getItem("muted") === "true";

    static gameStart = new Audio("audio/game/gameStart.mp3");

    static CHARACTER = {
        damage: new Audio("audio/character/characterDamage.mp3"),
        death: new Audio("audio/character/characterDead.wav"),
        jump: new Audio("audio/character/characterJump.wav"),
        walk: new Audio("audio/character/characterRun.mp3"),
        longIdle: new Audio("audio/character/characterSnoring.mp3"),
    };

    static CHICKEN_NORMAL = {
        death: new Audio("audio/chicken/chickenDead.mp3"),
    };

    static ENDBOSS = {
        approach: new Audio("audio/endboss/endbossApproach.wav"),
    };

    static BACKGROUND = new Audio(
        "audio/background/daynigthmorning-new-dream-background-music-465079.mp3",
    );

    static SMALL_CHICKEN_DEATH = {
        death: new Audio("audio/chicken/chickenDead2.mp3"),
    };

    static COLLECTIBLE = {
        coin: new Audio("audio/collectibles/collectSound.wav"),
        bottle: new Audio("audio/collectibles/bottleCollectSound.wav"),
    };

    static THROWABLE = {
        bottle: new Audio("audio/throwable/bottleBreak.mp3"),
    };

    static getAllSounds() {
        return [
            this.gameStart,
            this.BACKGROUND,
            this.CHARACTER.damage,
            this.CHARACTER.death,
            this.CHARACTER.jump,
            this.CHARACTER.walk,
            this.CHARACTER.longIdle,
            this.CHICKEN_NORMAL.death,
            this.ENDBOSS.approach,
            this.SMALL_CHICKEN_DEATH.death,
            this.COLLECTIBLE.coin,
            this.COLLECTIBLE.bottle,
            this.THROWABLE.bottle,
        ];
    }
    static toggleMute() {
        this.isMuted = !this.isMuted;
        localStorage.setItem("muted", this.isMuted);
        this.applyMute();
        return this.isMuted;
    }
    static applyMute() {
        this.getAllSounds().forEach((sound) => {
            sound.muted = this.isMuted;
            sound.volume = 0.2;
        });
    }
}
