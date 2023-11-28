class TargetCourse {
    id: string;
    name: string;
    requiredHours: number;
    students: Student[];

    constructor(id: string, name: string, requiredHours: number, students: Student[]) {
        this.id = id;
        this.name = name;
        this.requiredHours = requiredHours;
        this.students = students;
    }
}
