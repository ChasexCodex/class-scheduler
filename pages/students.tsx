import Link from "next/link";
import {GetServerSideProps} from "next";
import {get, ref, set} from "@firebase/database";
import {db} from "@/util/firebase";
import {useReducer, useState} from "react";

type Props = {
  data: {
    'api-data': SWVEntry[],
    students: Student[],
  }
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {

  const res = await get(ref(db, '/'))
  const data = res.val()

  return {
    props: {
      data
    }
  }
}

export default function AddPage({data}: Props) {
  const [students, setStudents] = useState(data.students)
  const [, forceUpdate] = useReducer(x => x + 1, 0)

  const onChange = (i: number, field: any) => {
    return (e: any) => {
      // @ts-ignore
      students[i][field] = e.target.value
      forceUpdate()
    }
  }

  const onDelete = (i: number) => {
    return () => {
      const c = [...students]
      setStudents(c.filter((_,e) => e !== i))
    }
  }

  const onChangeCourses = (i: number, i2: number) => {
    return (e: any) => {
      students[i].courses[i2] = e.target.value
      forceUpdate()
    }
  }

  const onAdd = () => {
    setStudents([...students, {id: ('' as unknown as number), name: '', courses: []}])
  }

  const onSave = async () => {
    await set(ref(db, '/students'), students)
    alert('Saved successfully')
  }

  return (
    <div className="bg-neutral-800">
      <Link href="/" className="block bg-blue-400 px-4 py-2 m-2 max-w-max rounded-xl">
        Home
      </Link>
      <div className="min-h-screen w-3/4 mx-auto">
        <div className="flex flex-col divide-y-4 bg-neutral-600 rounded-xl py-4">
          {students.map((e, i) => (
            <div key={i} className="text-black p-4 flex flex-col">
              <button onClick={onDelete(i)} className="ml-auto w-8 h-8 bg-red-600 text-white font-extrabold rounded-full transform scale-75">X</button>
              <div className="grid grid-cols-2 w-1/5 gap-y-1">
                <p className="text-white">ID</p>
                <input className="rounded py-1 px-2" placeholder="ID..." type="text" value={e.id}
                       onChange={onChange(i, 'id')}/>
                <p className="text-white">Name</p>
                <input className="rounded py-1 px-2" placeholder="Name..." type="text" value={e.name}
                       onChange={onChange(i, 'name')}/>
              </div>
              <div className="mt-2 grid grid-cols-10 gap-x-4">
                <p className="text-white">Courses</p>
                {Array.from({length: 7}).map((_, i2) => (
                  <input key={i2}  className="rounded py-1 px-2" placeholder={"Course " + i2 + "..."} value={students[i].courses[i2]}
                         onChange={onChangeCourses(i, i2)}/>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button onClick={onAdd} className="w-10 h-10 my-4 bg-green-600 rounded-full">+</button>
        <button onClick={onSave} className="px-4 mx-4 h-10 bg-blue-600 rounded-full">Save</button>
      </div>
    </div>
  )
}