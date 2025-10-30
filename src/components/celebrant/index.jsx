import PropTypes from "prop-types";
import "./style.css";

const CelebrantCard = ({ celebrant, onEdit, onDelete, onCreate, onView }) => (
  <div
    className="celebrant--card"
    onClick={onView}
    style={{ cursor: "pointer" }}
  >
    <img src={celebrant.image} alt="profile-picture" className="profile--pic" />
    <p className="celebrants--name">{celebrant.name}</p>
    <div
      className="action--btn--container"
      onClick={(e) => e.stopPropagation()}
    >
      <img
        src="/edit-icon.png"
        alt="edit-celebrant"
        className="edit--celebrantProfile"
        onClick={onEdit}
        style={{ cursor: "pointer" }}
      />
      <img
        src="/delete-icon.png"
        alt="delete-celebrant"
        className="delete--celebrantProfile"
        onClick={onDelete}
        style={{ cursor: "pointer" }}
      />
      <img
        src="/create-evnt-icon.png"
        alt="create-event"
        className="createEvent--with--celebrantProfile"
        onClick={onCreate}
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
  const {
    celebrants,
    editCelebrant,
    deleteCelebrant,
    createEventForCelebrant,
  } = celebrantsHook;

  const containerStyle = {
    display: activeView === "celebrants" ? "flex" : "none",
  };

  const handleView = (celebrantId) => {
    if (onViewCelebrant) {
      onViewCelebrant(celebrantId);
    }
  };

  const handleEdit = (celebrantId) => {
    if (onEditCelebrant) {
      onEditCelebrant(celebrantId);
    } else {
      console.log("Edit celebrant:", celebrantId);
      // TODO: Implement edit functionality
    }
  };

  const handleDelete = (celebrantId) => {
    if (window.confirm("Are you sure you want to delete this celebrant?")) {
      deleteCelebrant(celebrantId);
    }
  };

  const handleCreateEvent = (celebrantId) => {
    createEventForCelebrant(celebrantId);
  };

  return (
    <div id="celebrants--profile-container" style={containerStyle}>
      {celebrants.map((celebrant) => (
        <CelebrantCard
          key={celebrant.id}
          celebrant={celebrant}
          onView={() => handleView(celebrant.id)}
          onEdit={() => handleEdit(celebrant.id)}
          onDelete={() => handleDelete(celebrant.id)}
          onCreate={() => handleCreateEvent(celebrant.id)}
        />
      ))}
    </div>
  );
}

CelebrantsProfile.propTypes = {
  activeView: PropTypes.oneOf(["events", "celebrants"]).isRequired,
  celebrantsHook: PropTypes.shape({
    celebrants: PropTypes.array.isRequired,
    editCelebrant: PropTypes.func.isRequired,
    deleteCelebrant: PropTypes.func.isRequired,
    createEventForCelebrant: PropTypes.func.isRequired,
  }).isRequired,
  onEditCelebrant: PropTypes.func,
  onViewCelebrant: PropTypes.func,
};

CelebrantCard.propTypes = {
  celebrant: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onView: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
};
