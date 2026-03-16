/**
 * Central management of all setInterval timers with a global stop function.
 */
export class IntervalHub {
    static allIntervals = [];

    /**
     * Starts a new interval and registers it for central management.
     * @param {Function} func - The callback function to execute.
     * @param {number} timer - The interval duration in milliseconds.
     */
    static startInterval(func, timer) {
        const newInterval = setInterval(func, timer);
        IntervalHub.allIntervals.push(newInterval);
    }

    /**
     * Stops all registered intervals and clears the interval list.
     */
    static stopAllIntervals() {
        IntervalHub.allIntervals.forEach(clearInterval);
        IntervalHub.allIntervals = [];
    }
}
