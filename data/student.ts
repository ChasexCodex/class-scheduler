import CourseSection from "@/data/course-section";

export default class Student {
    id: string;
    name: string;
    coursesSection: CourseSection[];

    constructor(id: string, name: string, coursesSection: CourseSection[]) {
        this.id = id;
        this.name = name;
        this.coursesSection = coursesSection;
    }
}
