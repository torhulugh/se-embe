import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./style.css";

export default function AddCelebrantForm({
  onNavigateBack,
  onSaveCelebrant,
  editMode = false,
  celebrantData = null,
}) {
  const [formData, setFormData] = useState({
    name: "",
    relationship: "",
    ageGroup: "",
    likes: "",
    image: "/contact-p-p.png", // Default image
  });

  // Pre-populate form when in edit mode
  useEffect(() => {
    if (editMode && celebrantData) {
      setFormData({
        name: celebrantData.name || "",
        relationship: celebrantData.relationship || "",
        ageGroup: celebrantData.ageGroup || "",
        likes: celebrantData.likes || "",
        image: celebrantData.image || "/contact-p-p.png",
      });
    }
  }, [editMode, celebrantData]);

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
    if (!formData.name.trim()) {
      alert("Please enter a celebrant name");
      return;
    }

    if (formData.relationship === "default" || !formData.relationship) {
      alert("Please select a relationship");
      return;
    }

    // Save the celebrant data
    const celebrantData = {
      ...formData,
      name: formData.name.trim(),
    };

    onSaveCelebrant && onSaveCelebrant(celebrantData);

    // Show success message
    const action = editMode ? "updated" : "saved";
    alert(`Celebrant "${celebrantData.name}" has been ${action} successfully!`);
  };
  return (
    <div>
      <h1>
        {editMode ? "Edit Celebrant Profile" : "Create a celebrant Profile"}
      </h1>
      <main>
        <form id="create--celebrant--form" onSubmit={handleSubmit}>
          <section id="create--celebrant--container">
            {/* Celebrant */}
            <div className="form-group">
              <label className="eventForm--labels" htmlFor="celebrant--name">
                Celebrant Name *
              </label>
              <input
                type="text"
                id="celebrant--name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter celebrant name"
                required
              />
            </div>
            {/* relationship */}
            <div className="form-group">
              <label
                className="eventForm--labels"
                htmlFor="celebrant--relationship"
              >
                Celebrant Relationship *
              </label>
              <select
                name="relationship"
                id="celebrant--relationship"
                value={formData.relationship}
                onChange={handleInputChange}
                required
              >
                <option value="default">Select Relationship</option>
                <option value="self">Self</option>
                <option value="friend">Friend</option>
                <option value="family">Brother</option>
                <option value="colleague">Sister</option>
                <option value="colleague">Son</option>
                <option value="colleague">Daughter</option>
                <option value="colleague">Nephew</option>
                <option value="colleague">Niece</option>
                <option value="colleague">Nibling</option>
                <option value="colleague">Male friend</option>
                <option value="colleague">Female friend</option>
                <option value="colleague">Male cousin</option>
                <option value="colleague">Female cousin</option>
                <option value="other">Other</option>
              </select>
            </div>
            {/* age */}
            <div className="form-group">
              <label className="eventForm--labels" htmlFor="age--group">
                Celebrant Age Group
              </label>
              <select
                name="ageGroup"
                id="age--group"
                value={formData.ageGroup}
                onChange={handleInputChange}
              >
                <option value="default">Select Age Group</option>
                <option value="child">Child (0-12)</option>
                <option value="teen">Teen (13-19)</option>
                <option value="young-adult">Young Adult (20-35)</option>
                <option value="adult">Adult (36-55)</option>
                <option value="senior">Senior (56+)</option>
              </select>
            </div>

            {/* Celebrant likes */}
            <div className="form-group likes">
              <label className="eventForm--labels message" htmlFor="message">
                Celebrant likes
              </label>
              <textarea
                id="message"
                name="likes"
                rows="4"
                value={formData.likes}
                onChange={handleInputChange}
                placeholder="What does this celebrant like? (hobbies, interests, etc.)"
                required
              />
            </div>
          </section>
          {/* Submit Button */}
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
      </main>
    </div>
  );
}

AddCelebrantForm.propTypes = {
  onNavigateBack: PropTypes.func,
  onSaveCelebrant: PropTypes.func,
  editMode: PropTypes.bool,
  celebrantData: PropTypes.object,
};
