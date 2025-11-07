export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-950 to-black flex items-center justify-center px-6 py-16 text-white">
      <div className="max-w-3xl w-full bg-gray-900/80 backdrop-blur-md border border-gray-700/50 rounded-2xl shadow-2xl p-10 text-center animate-fadeIn">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          💪 About This App
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
          <span className="font-semibold text-blue-400">Workout Planner</span> is a
          full-stack web app built with{" "}
          <span className="font-medium text-purple-400">React</span> and{" "}
          <span className="font-medium text-purple-400">Express</span>, powered by
          the{" "}
          <span className="font-medium text-blue-400">
            API Ninjas Exercise API
          </span>
          . It helps you instantly generate{" "}
          <span className="font-semibold text-blue-300">
            personalized workout routines
          </span>{" "}
          tailored to your fitness goals, equipment, and experience level.
        </p>

        {/* Developer credit */}
        <p className="text-lg text-gray-400">
          Designed and developed by{" "}
          <span className="font-semibold text-purple-400 hover:text-purple-300 transition">
            Sarthak Baghel
          </span>
          .
        </p>

        {/* Accent line */}
        <div className="mt-8 h-1 w-1/2 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-70"></div>
      </div>
    </div>
  );
}
