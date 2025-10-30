import PropTypes from "prop-types";
import "./style.css";

const EventRow = ({
  event,
  celebrant,
  date,
  message,
  onEdit,
  onDelete,
  onShare,
}) => (
  <div className="table--row--container">
    <p className="table--row--event">{event}</p>
    <p className="table--row--celebrant">{celebrant}</p>
    <p className="table--row--date">{date}</p>
    <p className="table--row--message">{message}</p>
    <div className="table--row--actionsButtons">
      <img
        className="edit--icon"
        src="/edit-icon.png"
        alt="edit-event"
        onClick={onEdit}
        style={{ cursor: "pointer" }}
      />
      <img
        className="delete--icon"
        src="/delete-icon.png"
        alt="delete-event"
        onClick={onDelete}
        style={{ cursor: "pointer" }}
      />
      <img
        src="/share-icon.png"
        alt="share-event"
        className="share"
        onClick={onShare}
        style={{ cursor: "pointer" }}
      />
    </div>
  </div>
);

export default function Events({ eventsHook, onEditEvent }) {
  const { events, editEvent, deleteEvent, shareEvent } = eventsHook;

  const handleEdit = (eventId) => {
    if (onEditEvent) {
      onEditEvent(eventId);
    } else {
      console.log("Edit event:", eventId);
      // TODO: Implement edit functionality
    }
  };

  const handleDelete = (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      deleteEvent(eventId);
    }
  };

  const handleShare = (eventId) => {
    shareEvent(eventId);
  };

  return (
    <>
      {events.map((event) => (
        <EventRow
          key={event.id}
          event={event.event}
          celebrant={event.celebrant}
          date={event.date}
          message={event.message}
          onEdit={() => handleEdit(event.id)}
          onDelete={() => handleDelete(event.id)}
          onShare={() => handleShare(event.id)}
        />
      ))}
    </>
  );
}

Events.propTypes = {
  eventsHook: PropTypes.shape({
    events: PropTypes.array.isRequired,
    editEvent: PropTypes.func.isRequired,
    deleteEvent: PropTypes.func.isRequired,
    shareEvent: PropTypes.func.isRequired,
  }).isRequired,
  onEditEvent: PropTypes.func,
};

EventRow.propTypes = {
  event: PropTypes.string.isRequired,
  celebrant: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onShare: PropTypes.func.isRequired,
};
