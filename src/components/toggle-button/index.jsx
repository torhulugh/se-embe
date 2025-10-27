import { useState, useEffect } from "react";
import "./style.css";

export default function Toggle({ activeView, setActiveView }) {
  const [activeButton, setActiveButton] = useState(
    activeView === "events" ? 0 : 1
  );

  // Sync local state with props
  useEffect(() => {
    setActiveButton(activeView === "events" ? 0 : 1);
  }, [activeView]);

  const handleButtonClick = (index) => {
    setActiveButton(index);
    if (index === 0) {
      setActiveView("events");
    } else {
      setActiveView("celebrants");
    }
  };

  return (
    <section className="Omuun--button--container">
      <div
        className={`Omuun--button ${
          activeButton === 0 ? "active" : "inactive"
        }`}
        onClick={() => handleButtonClick(0)}
      >
        <div
          className={`Omuun--button--inner ${
            activeButton === 0 ? "active" : "inactive"
          }`}
        ></div>
        <div
          className={`top--blur--effect ${
            activeButton === 0 ? "active" : "inactive"
          }`}
        ></div>
        <div
          className={`right--blur--effect ${
            activeButton === 0 ? "active" : "inactive"
          }`}
        ></div>
        <div
          className={`left--blur--effect ${
            activeButton === 0 ? "active" : "inactive"
          }`}
        ></div>
        <p
          className={`Omuun--button--text ${
            activeButton === 0 ? "active" : "inactive"
          }`}
        >
          Events
        </p>
      </div>
      <div
        className={`Omuun--button ${
          activeButton === 1 ? "active" : "inactive"
        }`}
        onClick={() => handleButtonClick(1)}
      >
        <div
          className={`Omuun--button--inner ${
            activeButton === 1 ? "active" : "inactive"
          }`}
        ></div>
        <div
          className={`top--blur--effect ${
            activeButton === 1 ? "active" : "inactive"
          }`}
        ></div>
        <div
          className={`right--blur--effect ${
            activeButton === 1 ? "active" : "inactive"
          }`}
        ></div>
        <div
          className={`left--blur--effect ${
            activeButton === 1 ? "active" : "inactive"
          }`}
        ></div>
        <p
          className={`Omuun--button--text ${
            activeButton === 1 ? "active" : "inactive"
          }`}
        >
          Celebrants
        </p>
      </div>
    </section>
  );
}
