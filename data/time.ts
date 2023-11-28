class Time {
    hours: number;
    minutes: number;

    constructor(hours: number, minutes: number) {
        this.hours = hours;
        this.minutes = minutes;
    }

    toMinutes(): number {
        return this.hours * 60 + this.minutes;
    }
}