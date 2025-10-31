import { useMongoCelebrants } from "../../hooks/mongoHooks";
import LazyImage from "../common/LazyImage";
import "./style.css";

const CelebrantCard = ({ celebrant, onEdit, onDelete, onCreate, onView }) => (
  <div
    className="celebrant--card"
    onClick={() => onView(celebrant._id)}
    style={{ cursor: "pointer" }}
  >
    <LazyImage
      src={celebrant.image || "public/default-profile.png"}
      alt="profile-picture"
      className="profile--pic"
    />
    <p className="celebrants--name">{celebrant.name}</p>
    <p className="celebrant--relationship">{celebrant.relationship}</p>
    <p className="celebrant--age-group">{celebrant.ageGroup}</p>
    <div
      className="action--btn--container"
      onClick={(e) => e.stopPropagation()}
    >
      <LazyImage
        src="public/edit-icon.png"
        alt="edit-celebrant"
        className="edit--celebrantProfile"
        onClick={() => onEdit(celebrant._id)}
        style={{ cursor: "pointer" }}
      />
      <LazyImage
        src="public/delete-icon.png"
        alt="delete-celebrant"
        className="delete--celebrantProfile"
        onClick={() => onDelete(celebrant._id)}
        style={{ cursor: "pointer" }}
      />
      <LazyImage
        src="public/create-evnt-icon.png"
        alt="create-event"
        className="createEvent--with--celebrantProfile"
        onClick={() => onCreate(celebrant._id)}
        style={{ cursor: "pointer" }}
      />
    </div>
  </div>
);

export default function CelebrantsProfile({
  activeView,
  celebrantsHook,
  onEditCelebrant,
  onViewCelebrant,
}) {
  const { celebrants, loading, error, deleteCelebrant, refreshCelebrants } =
    celebrantsHook || useMongoCelebrants();

  const handleEdit = (celebrantId) => {
    if (onEditCelebrant) {
      onEditCelebrant(celebrantId);
    } else {
      console.log("Edit celebrant:", celebrantId);
    }
  };

  const handleDelete = async (celebrantId) => {
    if (window.confirm("Are you sure you want to delete this celebrant?")) {
      const result = await deleteCelebrant(celebrantId);
      if (result.success) {
        console.log("Celebrant deleted successfully");
      } else {
        alert(`Failed to delete celebrant: ${result.error}`);
      }
    }
  };

  const handleCreateEvent = (celebrantId) => {
    // TODO: Navigate to create event page with celebrant pre-selected
    console.log("Create event for celebrant:", celebrantId);
  };

  const handleView = (celebrantId) => {
    if (onViewCelebrant) {
      onViewCelebrant(celebrantId);
    } else {
      console.log("View celebrant:", celebrantId);
    }
  };

  // Don't render if not active view
  if (activeView !== "celebrants") {
    return null;
  }

  // Loading state
  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading celebrants...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="error-container">
        <p>Error loading celebrants: {error}</p>
        <button onClick={refreshCelebrants} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  // Empty state
  if (celebrants.length === 0) {
    return (
      <div className="empty-state">
        <p>No celebrants found. Add your first celebrant!</p>
      </div>
    );
  }

  return (
    <div className="celebrants--container">
      {celebrants.map((celebrant) => (
        <CelebrantCard
          key={celebrant._id}
          celebrant={celebrant}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCreate={handleCreateEvent}
          onView={handleView}
        />
      ))}
    </div>
  );
}
