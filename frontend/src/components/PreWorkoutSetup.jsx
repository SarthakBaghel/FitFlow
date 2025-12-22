import { useState } from "react";

export default function PreWorkoutSetup({ onClose, onStart }) {
  const [sessionLength, setSessionLength] = useState(30);
  const [reps, setReps] = useState(12);
  const [rest, setRest] = useState(45);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl p-6 w-full max-w-md text-white">
        <h2 className="text-2xl font-bold mb-4 text-center">
          ⚙️ Workout Settings
        </h2>

        {/* Session Length */}
        <label className="block mb-1 text-gray-300">Session Length (minutes)</label>
        <select
          value={sessionLength}
          onChange={(e) => setSessionLength(+e.target.value)}
          className="w-full p-2 rounded bg-gray-800 mb-3"
        >
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={45}>45</option>
        </select>

        {/* Reps */}
        <label className="block mb-1 text-gray-300">Reps per Exercise</label>
        <input
          type="number"
          value={reps}
          onChange={(e) => setReps(+e.target.value)}
          className="w-full p-2 rounded bg-gray-800 mb-3"
        />

        {/* Rest */}
        <label className="block mb-1 text-gray-300">Rest Between Exercises (sec)</label>
        <input
          type="number"
          value={rest}
          onChange={(e) => setRest(+e.target.value)}
          className="w-full p-2 rounded bg-gray-800 mb-6"
        />

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="w-1/2 py-2 rounded bg-gray-700 hover:bg-gray-600"
          >
            Cancel
          </button>

          <button
            onClick={() =>
              onStart({ sessionLength, reps, rest })
            }
            className="w-1/2 py-2 rounded bg-green-600 hover:bg-green-700"
          >
            Start Workout
          </button>
        </div>
      </div>
    </div>
  );
}
