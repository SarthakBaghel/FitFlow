import { motion } from "framer-motion";

export default function WorkoutCard({ name, type, muscle, equipment, difficulty, instructions, index }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-gray-700/50 rounded-2xl p-6 shadow-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] backdrop-blur-md"
    >
      <h3 className="text-xl sm:text-2xl font-bold text-blue-400 mb-3 tracking-wide">
        {name}
      </h3>

      <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-5">
        {instructions
          ? instructions.length > 350
            ? instructions.slice(0, 350) + "..."
            : instructions
          : "No instructions available for this exercise."}
      </p>

      <div className="flex flex-wrap gap-3 text-xs font-medium">
        {type && (
          <span className="px-3 py-1 bg-gray-700/50 border border-gray-600 rounded-md text-gray-300">
            🏷️ {type}
          </span>
        )}
        {muscle && (
          <span className="px-3 py-1 bg-gray-700/50 border border-gray-600 rounded-md text-gray-300">
            💪 {muscle}
          </span>
        )}
        {equipment && (
          <span className="px-3 py-1 bg-gray-700/50 border border-gray-600 rounded-md text-gray-300">
            ⚙️ {equipment}
          </span>
        )}
        {difficulty && (
          <span
            className={`px-3 py-1 rounded-md border ${
              difficulty === "beginner"
                ? "bg-green-700/40 border-green-600 text-green-300"
                : difficulty === "intermediate"
                ? "bg-yellow-700/40 border-yellow-600 text-yellow-300"
                : "bg-red-700/40 border-red-600 text-red-300"
            }`}
          >
            🎯 {difficulty}
          </span>
        )}
      </div>
    </motion.div>
  );
}
