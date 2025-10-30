import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./style.css";

export default function AddEventForm({
  onNavigateBack,
  onSaveEvent,
  celebrants = [],
  onNavigateToAddCelebrant,
  editMode = false,
  eventData = null,
}) {
  const [formData, setFormData] = useState({
    celebrant: "",
    eventType: "",
    eventDate: "",
    message: "",
  });

  // Pre-populate form when in edit mode
  useEffect(() => {
    if (editMode && eventData) {
      // Find the celebrant ID from the name
      const celebrant = celebrants.find((c) => c.name === eventData.celebrant);
      const celebrantId = celebrant ? celebrant.id.toString() : "";

      // Convert event type back to form format (lowercase with dashes)
      const eventType = eventData.event.toLowerCase().replace(/\s+/g, "-");

      setFormData({
        celebrant: celebrantId,
        eventType: eventType,
        eventDate: eventData.date,
        message: eventData.message,
      });
    }
  }, [editMode, eventData, celebrants]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (formData.celebrant === "default" || !formData.celebrant) {
      alert("Please select a celebrant");
      return;
    }

    if (formData.eventType === "default" || !formData.eventType) {
      alert("Please select an event type");
      return;
    }

    if (!formData.eventDate) {
      alert("Please select an event date");
      return;
    }

    if (!formData.message.trim()) {
      alert("Please enter an event message");
      return;
    }

    // Find the selected celebrant name
    const selectedCelebrant = celebrants.find(
      (c) => c.id.toString() === formData.celebrant
    );
    const celebrantName = selectedCelebrant
      ? selectedCelebrant.name
      : formData.celebrant;

    // Save the event data
    const eventDataToSave = {
      event: formData.eventType
        .replace("-", " ")
        .replace(/\b\w/g, (l) => l.toUpperCase()),
      celebrant: celebrantName,
      date: formData.eventDate,
      message: formData.message.trim(),
    };

    onSaveEvent && onSaveEvent(eventDataToSave);

    // Show success message
    const action = editMode ? "updated" : "saved";
    alert(
      `Event "${eventDataToSave.event}" for ${eventDataToSave.celebrant} has been ${action} successfully!`
    );
  };
  return (
    <div>
      <h1>{editMode ? "Edit Event" : "Create an Event"}</h1>
      <main>
        <section id="create--celebrantProfile--container">
          <div id="book--cover">
            <img
              id="profile--img"
              src="images/contact-p-p.png"
              alt="Profile Image"
            />
            <p>
              If you haven't created a profile for the celebrant yet, click the
              button below to create one before setting up their event.
            </p>
            <div
              id="create--profile--btn"
              onClick={onNavigateToAddCelebrant}
              style={{ cursor: "pointer" }}
            >
              <p>Create a celebrant profile</p>
              <div className="book--btn--blur-effect"></div>
            </div>
          </div>
        </section>
        <section id="create--event--container">
          <form id="create--event--form" onSubmit={handleSubmit}>
            {/* <!-- Celebrant --> */}
            <div className="form-group">
              <label className="eventForm--labels" htmlFor="celebrant">
                Celebrant *
              </label>
              <select
                name="celebrant"
                id="celebrant"
                value={formData.celebrant}
                onChange={handleInputChange}
                required
              >
                <option value="default">Select Celebrant</option>
                {celebrants.length === 0 ? (
                  <option value="" disabled>
                    No celebrants available - Create one first
                  </option>
                ) : (
                  celebrants.map((celebrant) => (
                    <option key={celebrant.id} value={celebrant.id}>
                      {celebrant.name}
                    </option>
                  ))
                )}
              </select>
            </div>
            {/* <!-- event type --> */}
            <div className="form-group">
              <label className="eventForm--labels" htmlFor="event--type">
                Event Type *
              </label>
              <select
                name="eventType"
                id="event--type"
                value={formData.eventType}
                onChange={handleInputChange}
                required
              >
                <option value="default">Select Event Type</option>

                {/* <!-- Personal Milestones --> */}
                <optgroup label="Personal Milestones">
                  <option value="birthday">Birthday</option>
                  <option value="name-day">Name Day</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="graduation">Graduation Ceremony</option>
                  <option value="party">Party</option>
                  <option value="baby-shower">Baby Shower</option>
                  <option value="naming-ceremony">Naming Ceremony</option>
                  <option value="housewarming">Housewarming Party</option>
                  <option value="engagement">Engagement Celebration</option>
                </optgroup>

                {/* <!-- Life Achievements --> */}
                <optgroup label="Life Achievements">
                  <option value="book-launch">
                    Book Publishing / Project Launch
                  </option>
                  <option value="business-opening">
                    Business / Store Opening
                  </option>
                  <option value="proposal">Proposal Celebration</option>
                  <option value="wedding">Wedding Ceremony</option>
                  <option value="wedding-anniversary">
                    Wedding Anniversary
                  </option>
                  <option value="vow-renewal">Vow Renewal</option>
                  <option value="first-steps">
                    Child's First Steps / First Words
                  </option>
                  <option value="school-admission">
                    School Admission / First Day
                  </option>
                  <option value="religious-confirmation">
                    Religious Confirmation / First Communion
                  </option>
                  <option value="adoption-day">Adoption Day Celebration</option>
                  <option value="family-reunion">Family Reunion</option>
                </optgroup>

                {/* <!-- Religious & Cultural Events --> */}
                <optgroup label="Religious & Cultural Events">
                  <option value="christmas">Christmas</option>
                  <option value="easter">Easter</option>
                  <option value="ramadan">
                    Ramadan / Eid al-Fitr / Eid al-Adha
                  </option>
                  <option value="hanukkah">Hanukkah</option>
                  <option value="diwali">Diwali</option>
                  <option value="holi">Holi</option>
                  <option value="passover">Passover</option>
                  <option value="thanksgiving">Thanksgiving</option>
                  <option value="lent">Lent and Good Friday</option>
                  <option value="lunar-new-year">Lunar New Year</option>
                  <option value="kwanzaa">Kwanzaa</option>
                  <option value="new-year">New Year's Day</option>
                  <option value="valentines-day">Valentine's Day</option>
                  <option value="womens-day">International Women's Day</option>
                  <option value="mothers-day">Mother's Day</option>
                  <option value="fathers-day">Father's Day</option>
                  <option value="independence-day">
                    Independence/National Day
                  </option>
                  <option value="memorial-day">Memorial Day</option>
                </optgroup>

                {/* <!-- Entertainment & Community --> */}
                <optgroup label="Entertainment & Community">
                  <option value="award-ceremony">Award Ceremony</option>
                  <option value="sports-party">Sports Watch Party</option>
                  <option value="movie-party">Movie Release Party</option>
                  <option value="gaming-tournament">
                    Gaming Tournament Night
                  </option>
                  <option value="community-festival">
                    Community Festival / Carnival
                  </option>
                  <option value="food-festival">Food Festival</option>
                </optgroup>

                {/* <!-- Other --> */}
                <optgroup label="Other">
                  <option value="special-day">Special Day</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="funeral">Funeral</option>
                  <option value="other">Other</option>
                </optgroup>
              </select>
            </div>
            {/* <!-- Event Date --> */}
            <div className="form-group">
              <label className="eventForm--labels" htmlFor="event--date">
                Event Date *
              </label>
              <input
                type="date"
                id="event--date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleInputChange}
                required
              />
            </div>
            {/* <!-- Event Message --> */}
            <div className="form-group column">
              <label className="eventForm--labels message" htmlFor="message">
                Event Message *
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Enter a personalized message for this celebration..."
                required
              />
            </div>
            {/* <!-- Submit Button --> */}
            <button type="submit" className="Omuun--button--save">
              <div className="Omuun--button--inner--save"></div>
              <div className="top--blur--effect--save"></div>
              <div className="right--blur--effect--save"></div>
              <div className="left--blur--effect--save"></div>
              <p className="Omuun--button--text--save">
                {editMode ? "Update" : "Save"}
              </p>
            </button>
            {/* Back to Dashboard Button */}
            <button
              type="button"
              onClick={onNavigateBack}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              ← Back to Dashboard
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

AddEventForm.propTypes = {
  onNavigateBack: PropTypes.func,
  onSaveEvent: PropTypes.func,
  celebrants: PropTypes.array,
  onNavigateToAddCelebrant: PropTypes.func,
  editMode: PropTypes.bool,
  eventData: PropTypes.object,
};
