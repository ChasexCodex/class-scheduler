import Student from "@/data/student";
import Course from "@/data/course";
import EmptySlot from "@/data/empty-slot";

function isConflicting(lecture1: Lecture, lecture2: Lecture): boolean {
    // Check if the lectures are on the same day
    if (lecture1.day !== lecture2.day) {
        return false;
    }

    // Calculate the start and end times in minutes for easier comparison
    const start1 = lecture1.startTime.toMinutes();
    const end1 = start1 + lecture1.endTime.toMinutes();
    const start2 = lecture2.startTime.toMinutes();
    const end2 = start2 + lecture2.endTime.toMinutes();


    // Check for overlap
    return (start1 < end2) && (end1 > start2);
}

function combinations<T>(array: T[], size: number): T[][] {
    if (size > array.length) {
        return [];
    }
    if (size === array.length) {
        return [array];
    }
    if (size === 1) {
        return array.map((element) => [element]);
    }

    const ret: T[][] = [];

    for (let i = 0; i < array.length - size + 1; i++) {
        const head = array.slice(i, i + 1);
        const tailCombinations = combinations(array.slice(i + 1), size - 1);
        for (const combination of tailCombinations) {
            ret.push([...head, ...combination]);
        }
    }

    return ret;
}

function generateSectionCombinations(courses: Course[], count: number): Section[][] {
    function combine(index: number, selectedSections: Section[]): Section[][] {
        if (selectedSections.length === count) {
            return [selectedSections];
        }
        if (index === courses.length) {
            return [];
        }

        // Combine sections from the current course with the previously selected sections
        const withCurrent = courses[index].sections.flatMap(section =>
            combine(index + 1, [...selectedSections, section])
        );

        // Skip the current course
        const withoutCurrent = combine(index + 1, selectedSections);

        return [...withCurrent, ...withoutCurrent];
    }

    return combine(0, []);
}

function sectionsOverlap(sections: Section[]): boolean {
    const allLectures = sections.flatMap(section => section.lectures);

    return allLectures.some((lecture1, index1) =>
        allLectures.some((lecture2, index2) =>
            index1 !== index2 && isConflicting(lecture1, lecture2)
        )
    );
}

function removePrefix(obj: { [s: string]: any }, prefix: string) {
    let newObj = {} as { [s: string]: any };

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (key.startsWith(prefix)) {
                newObj[key.substring(prefix.length)] = obj[key];
            } else {
                newObj[key] = obj[key];
            }
        }
    }

    return newObj;
}

function selectObjectKeys(obj: { [s: string]: any }, keys: string[]) {
    const selected = {} as { [s: string]: any };

    keys.forEach(key => {
        if (obj.hasOwnProperty(key)) {
            selected[key] = obj[key];
        }
    });

    return selected;
}

function generateStudentsSchedules(students: Student[], courseList: Course[]) {
    const courseSections = students.flatMap(e => e.coursesSection)
    const distinctSections = getDistinctElements(courseSections, (a, b) =>
        a.section == b.section && a.course == b.course
    )

    const sections = distinctSections.map(
        s =>
            courseList.find(e => e.name === s.course)!
            .sections.find(e => e.number === s.section)!
    )

    let allLectures: Lecture[] = sections.flatMap(section => section.lectures);
    allLectures = allLectures.sort((a, b) => {
        if (a.day !== b.day) return a.day - b.day;
        return a.startTime.toMinutes() - b.startTime.toMinutes();
    });

    const startBound = new Time(7, 0);
    const endBound = new Time(21, 0);

    const emptySlots: EmptySlot[] = [];

    for (let day = Day.Monday; day <= Day.Sunday; day++) {
        const lecturesForDay = allLectures.filter(lecture => lecture.day === day);

        // Starting slot for the day if the first lecture is after the start bound
        if (lecturesForDay.length === 0 || lecturesForDay[0].startTime.toMinutes() > startBound.toMinutes()) {
            emptySlots.push(
                new EmptySlot(day, startBound, lecturesForDay.length > 0 ? lecturesForDay[0].startTime : endBound)
            );
        }

        // Intermediate empty slots
        for (let i = 0; i < lecturesForDay.length - 1; i++) {
            const currentLecture = lecturesForDay[i];
            const nextLecture = lecturesForDay[i + 1];

            if (currentLecture.endTime.toMinutes() < nextLecture.startTime.toMinutes()) {
                emptySlots.push(
                    new EmptySlot(day, currentLecture.endTime, nextLecture.startTime)
                );
            }
        }

        // Ending slot for the day if the last lecture ends before the end bound
        if (lecturesForDay.length > 0 && lecturesForDay[lecturesForDay.length - 1].endTime.toMinutes() < endBound.toMinutes()) {
            emptySlots.push(
                new EmptySlot(day, lecturesForDay[lecturesForDay.length - 1].endTime, endBound)
            );
        }
    }

    return emptySlots;
}

function getDistinctElements<T>(array: T[], comparer: (a: T, b: T) => boolean): T[] {
    return array.reduce((distinctElements, currentElement) => {
        if (!distinctElements.some(element => comparer(element, currentElement))) {
            distinctElements.push(currentElement);
        }
        return distinctElements;
    }, [] as T[]);
}

function convertSWVToCourses(obj: SWV_Entry[]): Course[] {
    return []
}