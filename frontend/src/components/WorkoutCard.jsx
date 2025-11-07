export default function WorkoutCard({ name, image, description }) {
  return (
    <div className="card">
      <h3>{name}</h3>
      {image ? (
        <img src={image} alt={name} />
      ) : (
        <div className="no-image">No Image Available</div>
      )}
      <p dangerouslySetInnerHTML={{ __html: description || "No description" }} />
    </div>
  );
}
