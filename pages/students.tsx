import {useState} from "react";
import Student from "@/data/student";


export default function AddPage() {
    const [students, setStudents] = useState<Student[]>([
    ])

    const addStudent = () => {

    }

    return (
        <div className="grid grid-cols-1 w-1/2 mx-auto my-4 divide-y-2">
            <div className="grid grid-cols-3 text-center py-4">
                <span>ID</span>
                <span>Name</span>
                <span>Courses</span>
            </div>
            {students.map(e => (
                <div className="grid grid-cols-3 py-4 text-center">
                    <span>{e.id}</span>
                    <span>{e.name}</span>
                    <p>
                        {e.courses.map(c => (
                            <span>{c}</span>
                        ))}
                    </p>
                </div>
            ))}
        </div>
    )
}