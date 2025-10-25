import "./style.css";

export default function Header() {
  return (
    <header>
      <p id="site-logo">Se-Embe</p>
      <section id="header--right--section">
        <section className="Omuun--button--container--header">
          <div className="Omuun--button--header">
            <div className="Omuun--button--inner--header"></div>
            <div className="top--blur--effect--header"></div>
            <div className="right--blur--effect--header"></div>
            <div className="left--blur--effect--header"></div>
            <p className="Omuun--button--text--header">Create Event</p>
          </div>
          <div className="Omuun--button--header">
            <div className="Omuun--button--inner--header"></div>
            <div className="top--blur--effect--header"></div>
            <div className="right--blur--effect--header"></div>
            <div className="left--blur--effect--header"></div>
            <p className="Omuun--button--text--header">Add Celebrant</p>
          </div>
        </section>
        <section id="header--icons">
          <img id="settings-icon" src="images/settings.png" alt="" />
          <img id="notification-icon" src="images/notification.png" alt="" />
          <img
            src="images/profile-pic.png"
            alt="profile-pic"
            id="profile-pic"
          />
        </section>
      </section>
    </header>
  );
}