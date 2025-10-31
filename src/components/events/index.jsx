import { useMongoEvents } from "../../hooks/mongoHooks";
import LazyImage from "../common/LazyImage";
import "./style.css";

const EventRow = ({ event, onEdit, onDelete, onShare }) => {
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  return (
    <div className="table--row--container">
      <p className="table--row--event">
        {event.event || event.type || "Event"}
      </p>
      <p className="table--row--celebrant">
        {event.celebrant?.name || event.celebrant || "Unknown"}
      </p>
      <p className="table--row--date">{formatDate(event.date)}</p>
      <p className="table--row--message">{event.message || "No message"}</p>
      <div className="table--row--actionsButtons">
        <LazyImage
          className="edit--icon"
          src="public/edit-icon.png"
          alt="edit-event"
          onClick={() => onEdit(event._id)}
          style={{ cursor: "pointer" }}
        />
        <LazyImage
          className="delete--icon"
          src="public/delete-icon.png"
          alt="delete-event"
          onClick={() => onDelete(event._id)}
          style={{ cursor: "pointer" }}
        />
        <LazyImage
          src="public/share-icon.png"
          alt="share-event"
          className="share"
          onClick={() => onShare(event._id)}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default function Events({ eventsHook, onEditEvent }) {
  const { events, loading, error, deleteEvent, shareEvent, refreshEvents } =
    eventsHook || useMongoEvents();

  const handleEdit = (eventId) => {
    if (onEditEvent) {
      onEditEvent(eventId);
    } else {
      console.log("Edit event:", eventId);
    }
  };

  const handleDelete = async (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      const result = await deleteEvent(eventId);
      if (result.success) {
        // Event deleted successfully
        console.log("Event deleted successfully");
      } else {
        alert(`Failed to delete event: ${result.error}`);
      }
    }
  };

  const handleShare = async (eventId) => {
    const result = await shareEvent(eventId);
    if (result.success) {
      if (result.method === "clipboard") {
        alert("Event details copied to clipboard!");
      }
    } else {
      alert(`Failed to share event: ${result.error}`);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading events...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="error-container">
        <p>Error loading events: {error}</p>
        <button onClick={refreshEvents} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  // Empty state
  if (events.length === 0) {
    return (
      <div className="empty-state">
        <p>No events found. Create your first event!</p>
      </div>
    );
  }

  return (
    <div id="right--section--table--body">
      {events.map((event) => (
        <EventRow
          key={event._id}
          event={event}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onShare={handleShare}
        />
      ))}
    </div>
  );
}
