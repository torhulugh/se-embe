import PropTypes from "prop-types";
import "./style.css";

export default function ViewCelebrant({
  celebrantData,
  onNavigateBack,
  onEdit,
}) {
  if (!celebrantData) {
    return (
      <div className="view-celebrant-container">
        <h1>Celebrant Not Found</h1>
        <button onClick={onNavigateBack} className="back-button">
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="view-celebrant-container">
      <h1>Celebrant Profile</h1>
      <main>
        <section id="view--celebrant--profile--container">
          {/* Profile Display Section */}
          <div id="celebrant--profile--display">
            <div id="profile--header">
              <img
                src={celebrantData.image || "/contact-p-p.png"}
                alt="Profile Picture"
                id="celebrant--profile--image"
              />
              <div id="profile--info">
                <h2 id="celebrant--name">{celebrantData.name}</h2>
                <p id="celebrant--relationship">
                  {celebrantData.relationship || "Relationship not specified"}
                </p>
              </div>
            </div>

            {/* Details Section */}
            <div id="celebrant--details">
              <div className="detail--item">
                <label className="detail--label">Name:</label>
                <p className="detail--value">{celebrantData.name}</p>
              </div>

              <div className="detail--item">
                <label className="detail--label">Relationship:</label>
                <p className="detail--value">
                  {celebrantData.relationship || "Not specified"}
                </p>
              </div>

              <div className="detail--item">
                <label className="detail--label">Age Group:</label>
                <p className="detail--value">
                  {celebrantData.ageGroup || "Not specified"}
                </p>
              </div>

              <div className="detail--item">
                <label className="detail--label">Likes:</label>
                <p className="detail--value">
                  {celebrantData.likes || "Not specified"}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div id="view--celebrant--actions">
              <button
                type="button"
                className="Omuun--button--edit"
                onClick={onEdit}
              >
                <div className="Omuun--button--inner--edit"></div>
                <div className="top--blur--effect--edit"></div>
                <div className="right--blur--effect--edit"></div>
                <div className="left--blur--effect--edit"></div>
                <p className="Omuun--button--text--edit">Edit Profile</p>
              </button>

              <button
                type="button"
                className="Omuun--button--back"
                onClick={onNavigateBack}
              >
                <div className="Omuun--button--inner--back"></div>
                <div className="top--blur--effect--back"></div>
                <div className="right--blur--effect--back"></div>
                <div className="left--blur--effect--back"></div>
                <p className="Omuun--button--text--back">Back to Dashboard</p>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

ViewCelebrant.propTypes = {
  celebrantData: PropTypes.object,
  onNavigateBack: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};
