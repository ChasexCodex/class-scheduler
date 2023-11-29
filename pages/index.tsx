import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col dark:bg-neutral-800">
      <p className="text-7xl font-bold text-center py-20">Class Scheduler</p>

      <div className="grid grid-cols-2 gap-x-32 gap-y-10 w-1/3 mx-auto justify-evenly text-center">
        <Link
          href="/students"
          className="py-2 px-4 bg-black dark:bg-neutral-400 font-semibold rounded-full transition hover:ring ring-gray-200">
          Students
        </Link>
        <Link
          href="/target-courses"
          className="py-2 px-4 bg-black dark:bg-neutral-400 font-semibold rounded-full transition hover:ring ring-gray-200">
          Target Courses
        </Link>
        <Link
          href="/courses"
          className="py-2 px-4 bg-black dark:bg-neutral-400 font-semibold rounded-full transition hover:ring ring-gray-200">
          Add Courses
        </Link>
        <Link
          href="/generate"
          className="py-2 px-4 bg-black dark:bg-neutral-400 font-semibold rounded-full transition hover:ring ring-gray-200">
          Determine availability
        </Link>
      </div>


      <div className="mt-auto bg-black">
        <hr/>
        <p className="space-x-4 py-4 px-4">
          <span>Made by:</span>
          <span>Elyas Al-Amri;</span>
          <span>Ejmen Al-Ubejdij;</span>
          <span>Hamad AlDous</span>
        </p>
      </div>
    </div>
  )
}
