import Student from "@/data/student";

export default class Course {
    id: string;
    name: string;
    students: string[];
    sections: Section[];

    constructor(id: string, name: string, students: string[], sections: Section[]) {
        this.id = id;
        this.name = name;
        this.students = students;
        this.sections = sections;
    }

    getStudents(studentsList: Student[]) {
        return studentsList.filter(e => this.students.includes(e.name))
    }
}
