import PropTypes from "prop-types";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./style.css";

export default function Header({
  onCreateEvent,
  onAddCelebrant,
  onNavigateHome,
}) {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <header>
      <a
        href="#"
        id="site-logo"
        onClick={(e) => {
          e.preventDefault();
          onNavigateHome && onNavigateHome();
        }}
      >
        Se-Embe
      </a>
      <section id="header--right--section">
        <section className="Omuun--button--container--header">
          <div
            className="Omuun--button--header"
            onClick={onCreateEvent}
            style={{ cursor: "pointer" }}
          >
            <div className="Omuun--button--inner--header"></div>
            <div className="top--blur--effect--header"></div>
            <div className="right--blur--effect--header"></div>
            <div className="left--blur--effect--header"></div>
            <p className="Omuun--button--text--header">Create Event</p>
          </div>
          <div
            className="Omuun--button--header"
            onClick={onAddCelebrant}
            style={{ cursor: "pointer" }}
          >
            <div className="Omuun--button--inner--header"></div>
            <div className="top--blur--effect--header"></div>
            <div className="right--blur--effect--header"></div>
            <div className="left--blur--effect--header"></div>
            <p className="Omuun--button--text--header">Add Celebrant</p>
          </div>
        </section>
        <section id="header--icons">
          <img id="settings-icon" src="/settings.png" alt="settings" />
          <img
            id="notification-icon"
            src="/notification.png"
            alt="notifications"
          />
          <div className="user-menu-container">
            <div
              className="user-info"
              onClick={() => setShowUserMenu(!showUserMenu)}
              style={{ cursor: "pointer" }}
            >
              <span className="user-name">
                {user?.fullName || `${user?.firstName} ${user?.lastName}`}
              </span>
              <img
                src="/profile-pic.png"
                alt="profile-picture"
                id="profile-pic"
              />
            </div>
            {showUserMenu && (
              <div className="user-dropdown">
                <div className="user-dropdown-item">
                  <strong>
                    {user?.fullName || `${user?.firstName} ${user?.lastName}`}
                  </strong>
                  <span className="user-email">{user?.email}</span>
                </div>
                <hr />
                <div
                  className="user-dropdown-item logout-item"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </section>
      </section>
    </header>
  );
}

Header.propTypes = {
  onCreateEvent: PropTypes.func,
  onAddCelebrant: PropTypes.func,
  onNavigateHome: PropTypes.func,
};
