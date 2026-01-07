import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-child-xl font-display font-bold text-primary-600">
            Welcome to PAL Vocabulary! 🎓
          </h1>
          <p className="text-child-base text-gray-700">
            Choose your role to get started
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Student Entry */}
          <Link href="/student">
            <div className="bg-white rounded-child shadow-lg p-8 hover:shadow-xl transition-shadow cursor-pointer tap-feedback group">
              <div className="space-y-4 text-center">
                <div className="text-6xl">👨‍🎓</div>
                <h2 className="text-child-lg font-display font-semibold text-primary-600 group-hover:text-primary-700">
                  I am a Student
                </h2>
                <p className="text-child-sm text-gray-600">
                  Start learning and practicing vocabulary
                </p>
              </div>
            </div>
          </Link>

          {/* Teacher Entry */}
          <Link href="/teacher">
            <div className="bg-white rounded-child shadow-lg p-8 hover:shadow-xl transition-shadow cursor-pointer tap-feedback group">
              <div className="space-y-4 text-center">
                <div className="text-6xl">👩‍🏫</div>
                <h2 className="text-child-lg font-display font-semibold text-secondary-600 group-hover:text-secondary-700">
                  I am a Teacher
                </h2>
                <p className="text-child-sm text-gray-600">
                  Manage classes and track progress
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div className="text-center text-gray-500 text-child-xs">
          <p>PAL Vocabulary Support Tool for Class 3</p>
        </div>
      </div>
    </main>
  )
}
