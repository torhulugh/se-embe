import { useState } from 'react'
import "./dashboard.css";
import Calendar from "./components/calendar/"
import Events from "./components/events/"
import Header from "./components/header/"
import './App.css'

function App() {
  

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
                src="images/overview-header.png"
                alt="edit-icon"
              />
            </div>
            <img id="notes-lines" src="images/notes-lines.png" alt="" />
          </div>
        </section>
        {/* right section */}
        <section id="dashboard--right--section">
          <div id="right--section--content--container">
            <div id="right--section--header">
              <p id="right--section--header--title">
                Upcoming Events for Today Wednesday 15 2025
              </p>
              {/* buttons */}
              <section className="Omuun--button--container">
                <div className="Omuun--button">
                  <div className="Omuun--button--inner"></div>
                  <div className="top--blur--effect"></div>
                  <div className="right--blur--effect"></div>
                  <div className="left--blur--effect"></div>
                  <p className="Omuun--button--text">Event</p>
                </div>
                <div className="Omuun--button--inactive">
                  <div className="Omuun--button--inactive--inner"></div>
                  <div className="top--blur--effect--inactive"></div>
                  <p className="Omuun--button--text--inactive">Celebrants</p>
                </div>
              </section>
              {/* 🍇 */}
            </div>
            {/* event table header */}
            <Events />
          </div>
        </section>
      </section>
      </main>
    </>
  )
}

export default App