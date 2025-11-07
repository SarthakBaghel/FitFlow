export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-600 text-lg font-medium">
        Loading workouts...
      </p>
    </div>
  );
}
