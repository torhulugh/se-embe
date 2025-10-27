import { useState } from "react";
import "./dashboard.css";
import Calendar from "./components/calendar/";
import Events from "./components/events/";
import Header from "./components/header/";
import Toggle from "./components/toggle-button/";
import Celebrants_Profile from "./components/celebrant/";

import "./App.css";

function App() {
  const [activeView, setActiveView] = useState("events"); // 'events' or 'celebrants'

  return (
    <>
      <Header />
      <main>
        <section id="dashboard">
          {/* left section */}
          <section id="dashboard--left--section">
            {/* calendar */}
            <Calendar />
            <div id="overview--note">
              <div id="note--header--title-container">
                <p id="note--header--title">Today's Overview</p>
                <img
                  id="overview--header--deco"
                  src="public/overview-header.png"
                  alt="edit-icon"
                />
              </div>
              <img id="notes-lines" src="public/notes-lines.png" alt="" />
            </div>
          </section>
          {/* right section */}
          <section id="dashboard--right--section">
            <div id="right--section--content--container">
              <div id="right--section--header">
                <p id="right--section--header--title">
                  {activeView === "events"
                    ? "Upcoming Events for Today Wednesday 15 2025"
                    : "Celebrants Profile"}
                </p>
                {/* buttons */}
                <Toggle activeView={activeView} setActiveView={setActiveView} />
                {/* 🍇 */}
              </div>
              {/* event table header */}
              {activeView === "events" && (
                <div id="right--section--table--header">
                  <p id="table--header--event">Event</p>
                  <p id="table--header--time">Celebrant</p>
                  <p id="table--header--location">Date</p>
                  <p id="table--header--status">Message</p>
                </div>
              )}
              {activeView === "celebrants" && (
                <div id="right--section--table--header">
                  <p id="table--header--event">Name</p>
                  <p id="table--header--time">Profile</p>
                  <p id="table--header--location">Actions</p>
                  <p id="table--header--status">Status</p>
                </div>
              )}
              {/* event table body */}
              {activeView === "events" && <Events />}
              {activeView === "celebrants" && (
                <Celebrants_Profile activeView={activeView} />
              )}
            </div>
          </section>
        </section>
      </main>
    </>
  );
}

export default App;
