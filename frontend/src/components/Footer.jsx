export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 text-center py-4 border-t border-gray-700">
      <p className="text-sm">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-blue-400">Workout Planner</span> | Built by{" "}
        <span className="text-white font-medium">Sarthak Baghel 💪</span>
      </p>
    </footer>
  );
}
