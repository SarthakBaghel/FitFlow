export default function WorkoutCard({ name, image, description }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-4 w-72 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between">
      <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">
        {name}
      </h3>

      {image ? (
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover rounded-lg mb-4 border border-gray-200"
        />
      ) : (
        <div className="w-full h-48 flex items-center justify-center bg-gray-200 text-gray-500 rounded-lg mb-4 border border-gray-300">
          No Image Available
        </div>
      )}

      <div
        className="text-sm text-gray-600 leading-relaxed"
        dangerouslySetInnerHTML={{
          __html: description || "No description available",
        }}
      />
    </div>
  );
}
