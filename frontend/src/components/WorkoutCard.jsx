import { motion } from "framer-motion";

export default function WorkoutCard({
  name,
  type,
  muscle,
  equipment,
  difficulty,
  instructions,
  index,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
      className="
        group relative rounded-2xl
        bg-white/5 border border-white/10
        backdrop-blur-xl p-6
        transition-all duration-300
        hover:-translate-y-1 hover:bg-white/10
      "
    >
      {/* Title */}
      <h3 className="text-lg sm:text-xl font-medium text-white mb-3 tracking-tight">
        {name}
      </h3>

      {/* Instructions */}
      <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-5">
        {instructions
          ? instructions.length > 300
            ? instructions.slice(0, 300) + "..."
            : instructions
          : "No instructions available."}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 text-xs">
        {type && <Tag label={type} />}
        {muscle && <Tag label={muscle} />}
        {equipment && <Tag label={equipment} />}

        {difficulty && (
          <span
            className={`px-2.5 py-1 rounded-md border text-xs
              ${
                difficulty === "beginner"
                  ? "bg-green-500/10 border-green-500/20 text-green-300"
                  : difficulty === "intermediate"
                  ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-300"
                  : "bg-red-500/10 border-red-500/20 text-red-300"
              }`}
          >
            {difficulty}
          </span>
        )}
      </div>
    </motion.div>
  );
}

function Tag({ label }) {
  return (
    <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300">
      {label}
    </span>
  );
}
