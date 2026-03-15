/**
 * Zentrale Verwaltung aller setInterval-Timer mit globaler Stopp-Funktion.
 */
export class IntervalHub {
    /** @type {number[]} */
    static allIntervals = [];

    /**
     * Startet ein neues Intervall und registriert es fuer die zentrale Verwaltung.
     * @param {Function} func - Die auszufuehrende Callback-Funktion.
     * @param {number} timer - Das Intervall in Millisekunden.
     */
    static startInterval(func, timer) {
        const newInterval = setInterval(func, timer);
        IntervalHub.allIntervals.push(newInterval);
    }

    /**
     * Stoppt alle registrierten Intervalle und leert die Intervall-Liste.
     */
    static stopAllIntervals() {
        IntervalHub.allIntervals.forEach(clearInterval);
        IntervalHub.allIntervals = [];
    }
}
