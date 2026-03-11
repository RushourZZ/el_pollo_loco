export class SoundHub {
    static gameStart = new Audio("audio/game/gameStart.mp3");

    static CHARACTER = {
        damage: new Audio("audio/character/characterDamage.mp3"),
        death: new Audio("audio/character/characterDead.wav"),
        jump: new Audio("audio/character/characterJump.wav"),
        walk: new Audio("audio/character/characterRun.mp3"),
        longIdle: new Audio("audio/character/characterSnoring.mp3"),
    };

    static CHICKEN = {
        death: new Audio("audio/chicken/chickenDead.mp3"),
    };

    static ENDBOSS = {
        approach: new Audio("audio/endboss/endbossApproach.wav"),
    };

    static BACKGROUND = new Audio("audio/background/daynigthmorning-new-dream-background-music-465079.mp3")
}
