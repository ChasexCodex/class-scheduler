import {GetServerSideProps} from "next";
import {ref, get} from "@firebase/database";
import {db} from "@/util/firebase";


export const getServerSideProps: GetServerSideProps = async (context) => {
    const res = await get(ref(db, '/api-data'));
    const rawData: SWV_Entry[] = res.val()
    const courses = convertSWVToCourses(rawData)

    return {
        props: {
            courses,
        },
    }
}


export default function ShowPage({courses}: any) {
    return (
        <div className="grid grid-cols-7">
            {Array.from({length: 7}).map((_, i) => (
                <div key={i}>
                    {Array.from({length: 7}).map(e2 => (
                            <div key={i * i} className="h-10 w-10 bg-red-50"/>
                        )
                    )}
                </div>
            ))}
        </div>
    )
}