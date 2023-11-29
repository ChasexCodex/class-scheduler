import {GetServerSideProps} from "next";
import {get, ref} from "@firebase/database";
import {db} from "@/util/firebase";
import Link from "next/link";

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

const days: Partial<keyof JsonClob>[] = [
  'SSRMEET_SUN_DAY',
  'SSRMEET_MON_DAY',
  'SSRMEET_TUE_DAY',
  'SSRMEET_WED_DAY',
  'SSRMEET_THU_DAY',
  'SSRMEET_FRI_DAY',
  'SSRMEET_SAT_DAY',
]

export default function GeneratePage({data}: Props) {
  const crns = Array.from(new Set(data.students.flatMap(e => e.courses)))
  const courses = crns
    .map(e => data["api-data"].find(c => c.SWV_CLASS_SEARCH_CRN === e))

  const lectures = courses.flatMap(e => {
    if (!e || !e.SWV_CLASS_SEARCH_JSON_CLOB) return []
    if (typeof e.SWV_CLASS_SEARCH_JSON_CLOB === 'string') {
      return JSON.parse(e.SWV_CLASS_SEARCH_JSON_CLOB) as JsonClob
    }
    return e.SWV_CLASS_SEARCH_JSON_CLOB
  })
    .filter(e => !!e.SSRMEET_BEGIN_TIME && !!e.SSRMEET_END_TIME)

  const toMinutes = (s: string) => {
    const hours = parseInt(s.slice(0, 2))
    const minutes = parseInt(s.slice(3, 5))
    const shift = (s.endsWith("PM") && hours !== 12) ? 12 : 0

    return minutes + 60 * (hours + shift)
  }

  const start = (l: JsonClob): number => {
    return toMinutes(l.SSRMEET_BEGIN_TIME) - 7 * 60
  }

  const length = (l: JsonClob): number => {
    if (l.SSRMEET_BEGIN_TIME.includes('12:00')) {
      console.log(l, toMinutes(l.SSRMEET_END_TIME), toMinutes(l.SSRMEET_BEGIN_TIME))
    }
    return toMinutes(l.SSRMEET_END_TIME) - toMinutes(l.SSRMEET_BEGIN_TIME)
  }

  // console.log(lectures)
  return (
    <div className="min-h-screen flex flex-col">
      <Link
        href="/"
        className="px-4 py-2 bg-blue-400 max-w-max rounded-full m-4"
      >
        Back
      </Link>
      <div className="flex-1 w-2/3 mx-auto flex flex-col bg-neutral-800">
        <div className="grid grid-cols-8">
          <p>Times</p>
          <p>Sunday</p>
          <p>Monday</p>
          <p>Tuesday</p>
          <p>Wednesday</p>
          <p>Thursday</p>
          <p>Friday</p>
          <p>Saturday</p>
        </div>
        <div className="grid grid-cols-8 flex-1 gap-x-1">
          <div className="relative">
            {Array.from({length: 14}).map((_, i) => (
              <div
                style={{
                  top: i * 60,
                  height: 60,
                }}
                className="absolute left-0 right-0">
                <div className="h-full border-t">
                  {((i + 6) % 12) + 1}
                </div>
              </div>
            ))}
          </div>
          {days.map(d =>
            <div className="h-full relative">
              {lectures.filter(e => e[d] !== null).map(e => (
                <div style={{
                  top: start(e),
                  height: length(e),
                }} className="absolute right-0 left-0 bg-red-900">
                  <p className="text-center">
                    {e.SSRMEET_BEGIN_TIME} - {e.SSRMEET_END_TIME}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}