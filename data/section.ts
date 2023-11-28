class Section {
    number: number;
    professor: string;
    lectures: Lecture[];

    constructor(number: number, professor: string, lectures: Lecture[]) {
        this.number = number;
        this.professor = professor;
        this.lectures = lectures;
    }
}
