import Student from "@/data/student";
import Course from "@/data/course";

class AcademicYear {
    courses: Course[];
    students: string[];
    targetCourses: TargetCourse[];
    yearNumber: number;

    constructor(courses: Course[], students: string[], targetCourses: TargetCourse[], yearNumber: number) {
        this.courses = courses;
        this.students = students;
        this.targetCourses = targetCourses;
        this.yearNumber = yearNumber;
    }

    getStudents(studentsList: Student[]) {
        return studentsList.filter(s => this.students.includes(s.id))
    }
}
