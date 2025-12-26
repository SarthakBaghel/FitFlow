import { useState } from "react";

const PRESETS = {
  quick: { sessionLength: 20, reps: 10, rest: 30 },
  standard: { sessionLength: 30, reps: 12, rest: 45 },
  long: { sessionLength: 45, reps: 15, rest: 60 },
};

export default function PreWorkoutSetup({ onClose, onStart }) {
  const [sessionLength, setSessionLength] = useState(30);
  const [reps, setReps] = useState(12);
  const [rest, setRest] = useState(45);
  const [activePreset, setActivePreset] = useState("standard");

  const applyPreset = (key) => {
    const preset = PRESETS[key];
    setSessionLength(preset.sessionLength);
    setReps(preset.reps);
    setRest(preset.rest);
    setActivePreset(key);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div
        className="w-full max-w-sm rounded-2xl
                   bg-white/5 border border-white/10
                   backdrop-blur-xl shadow-2xl
                   p-6 text-white"
      >
        {/* Title */}
        <h2 className="text-lg font-semibold text-center mb-5 tracking-tight">
          Workout settings
        </h2>

        {/* Presets */}
        <div className="flex gap-2 mb-6">
          {Object.keys(PRESETS).map((key) => (
            <button
              key={key}
              onClick={() => applyPreset(key)}
              className={`flex-1 py-2 rounded-md text-xs font-medium capitalize
                transition border
                ${
                  activePreset === key
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-gray-300 border-white/15 hover:bg-white/5"
                }`}
            >
              {key}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <div>
            <label className="text-xs text-gray-400 mb-1 block">
              Session length (minutes)
            </label>
            <select
              value={sessionLength}
              onChange={(e) => {
                setSessionLength(+e.target.value);
                setActivePreset(null);
              }}
              className="w-full px-3 py-2 rounded-md
                         bg-black/40 border border-white/10
                         text-sm focus:outline-none focus:ring-1 focus:ring-white/20"
            >
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={45}>45</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-400 mb-1 block">
              Reps per exercise
            </label>
            <input
              type="number"
              value={reps}
              onChange={(e) => {
                setReps(+e.target.value);
                setActivePreset(null);
              }}
              className="w-full px-3 py-2 rounded-md
                         bg-black/40 border border-white/10
                         text-sm focus:outline-none focus:ring-1 focus:ring-white/20"
            />
          </div>

          <div>
            <label className="text-xs text-gray-400 mb-1 block">
              Rest between exercises (sec)
            </label>
            <input
              type="number"
              value={rest}
              onChange={(e) => {
                setRest(+e.target.value);
                setActivePreset(null);
              }}
              className="w-full px-3 py-2 rounded-md
                         bg-black/40 border border-white/10
                         text-sm focus:outline-none focus:ring-1 focus:ring-white/20"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-md
                       text-sm text-gray-300
                       border border-white/10
                       hover:bg-white/5 transition"
          >
            Cancel
          </button>

          <button
            onClick={() => onStart({ sessionLength, reps, rest })}
            className="flex-1 py-2 rounded-md
                       bg-white text-black text-sm font-medium
                       hover:opacity-90 transition"
          >
            Start workout
          </button>
        </div>
      </div>
    </div>
  );
}
