export default class EmptySlot {
    day: Day
    start: Time
    end: Time

    constructor(day: Day, start: Time, end: Time) {
        this.day = day
        this.start = start
        this.end = end
    }
}