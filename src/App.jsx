import { useState, useEffect } from "react";
import "./dashboard.css";
import Calendar from "./components/calendar/";
import Events from "./components/events/";
import Header from "./components/header/";
import Toggle from "./components/toggle-button/";
import CelebrantsProfile from "./components/celebrant/";
import AddEventForm from "./pages/add-event-form/";
import AddCelebrantForm from "./pages/add-celebrant-form/";
import ViewCelebrant from "./pages/view-celebrant/";
import Login from "./pages/login/";
import SignUp from "./pages/sign-up/";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import {
  useActiveView,
  useMongoEvents,
  useMongoCelebrants,
} from "./hooks/mongoHooks";

import "./App.css";

// Main App Component wrapped with AuthProvider
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

// App Content Component (needs to be inside AuthProvider to use useAuth)
function AppContent() {
  const { isAuthenticated, isLoading, user, logout } = useAuth();
  const { activeView, setActiveView, isEventsView, isCelebrantsView } =
    useActiveView("events");
  const eventsHook = useMongoEvents();
  const celebrantsHook = useMongoCelebrants();

  // Navigation state
  const [currentPage, setCurrentPage] = useState("dashboard"); // 'dashboard', 'add-event', 'add-celebrant', 'view-celebrant', 'login', 'signup'

  // Edit state
  const [editMode, setEditMode] = useState({
    isEditing: false,
    itemType: null, // 'event' or 'celebrant'
    itemId: null,
  });

  // View state
  const [viewState, setViewState] = useState({
    celebrantId: null,
  });

  // Set up global navigation functions for auth pages
  useEffect(() => {
    window.navigateToLogin = () => setCurrentPage("login");
    window.navigateToSignUp = () => setCurrentPage("signup");

    return () => {
      delete window.navigateToLogin;
      delete window.navigateToSignUp;
    };
  }, []);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "1.2rem",
          color: "#3d5952",
        }}
      >
        Loading...
      </div>
    );
  }

  // If not authenticated, show auth pages
  if (!isAuthenticated) {
    if (currentPage === "signup") {
      return <SignUp onSignUpSuccess={() => setCurrentPage("dashboard")} />;
    }

    return <Login onLoginSuccess={() => setCurrentPage("dashboard")} />;
  }

  const navigateToAddEvent = () => {
    setEditMode({ isEditing: false, itemType: null, itemId: null });
    setViewState({ celebrantId: null });
    setCurrentPage("add-event");
  };

  const navigateToAddCelebrant = () => {
    setEditMode({ isEditing: false, itemType: null, itemId: null });
    setViewState({ celebrantId: null });
    setCurrentPage("add-celebrant");
  };

  const navigateToViewCelebrant = (celebrantId) => {
    setEditMode({ isEditing: false, itemType: null, itemId: null });
    setViewState({ celebrantId: celebrantId });
    setCurrentPage("view-celebrant");
  };

  const navigateToEditEvent = (eventId) => {
    setEditMode({ isEditing: true, itemType: "event", itemId: eventId });
    setViewState({ celebrantId: null });
    setCurrentPage("add-event");
  };

  const navigateToEditCelebrant = (celebrantId) => {
    setEditMode({
      isEditing: true,
      itemType: "celebrant",
      itemId: celebrantId,
    });
    setViewState({ celebrantId: null });
    setCurrentPage("add-celebrant");
  };

  const navigateToDashboard = () => {
    setEditMode({ isEditing: false, itemType: null, itemId: null });
    setViewState({ celebrantId: null });
    setCurrentPage("dashboard");
  };

  // Render different pages based on currentPage state
  if (currentPage === "add-event") {
    const eventData =
      editMode.isEditing && editMode.itemType === "event"
        ? eventsHook.events.find((e) => e._id === editMode.itemId)
        : null;

    return (
      <>
        <Header
          onCreateEvent={navigateToAddEvent}
          onAddCelebrant={navigateToAddCelebrant}
          onNavigateHome={navigateToDashboard}
        />
        <AddEventForm
          onNavigateBack={navigateToDashboard}
          onSaveEvent={async (eventData) => {
            if (editMode.isEditing) {
              const result = await eventsHook.editEvent(
                editMode.itemId,
                eventData
              );
              if (result.success) {
                navigateToDashboard();
              } else {
                alert(`Failed to update event: ${result.error}`);
              }
            } else {
              const result = await eventsHook.addEvent(eventData);
              if (result.success) {
                navigateToDashboard();
              } else {
                alert(`Failed to create event: ${result.error}`);
              }
            }
          }}
          celebrants={celebrantsHook.celebrants}
          onNavigateToAddCelebrant={navigateToAddCelebrant}
          editMode={editMode.isEditing}
          eventData={eventData}
        />
      </>
    );
  }

  if (currentPage === "add-celebrant") {
    const celebrantData =
      editMode.isEditing && editMode.itemType === "celebrant"
        ? celebrantsHook.celebrants.find((c) => c._id === editMode.itemId)
        : null;

    return (
      <>
        <Header
          onCreateEvent={navigateToAddEvent}
          onAddCelebrant={navigateToAddCelebrant}
          onNavigateHome={navigateToDashboard}
        />
        <AddCelebrantForm
          onNavigateBack={navigateToDashboard}
          onSaveCelebrant={async (celebrantData) => {
            if (editMode.isEditing) {
              const result = await celebrantsHook.editCelebrant(
                editMode.itemId,
                celebrantData
              );
              if (result.success) {
                navigateToDashboard();
              } else {
                alert(`Failed to update celebrant: ${result.error}`);
              }
            } else {
              const result = await celebrantsHook.addCelebrant(celebrantData);
              if (result.success) {
                navigateToDashboard();
              } else {
                alert(`Failed to create celebrant: ${result.error}`);
              }
            }
          }}
          editMode={editMode.isEditing}
          celebrantData={celebrantData}
        />
      </>
    );
  }

  if (currentPage === "view-celebrant") {
    const celebrantData = viewState.celebrantId
      ? celebrantsHook.celebrants.find((c) => c._id === viewState.celebrantId)
      : null;

    return (
      <>
        <Header
          onCreateEvent={navigateToAddEvent}
          onAddCelebrant={navigateToAddCelebrant}
          onNavigateHome={navigateToDashboard}
        />
        <ViewCelebrant
          celebrantData={celebrantData}
          onNavigateBack={navigateToDashboard}
          onEdit={() => {
            if (viewState.celebrantId) {
              navigateToEditCelebrant(viewState.celebrantId);
            }
          }}
        />
      </>
    );
  }

  // Default dashboard view
  return (
    <>
      <Header
        onCreateEvent={navigateToAddEvent}
        onAddCelebrant={navigateToAddCelebrant}
        onNavigateHome={navigateToDashboard}
      />
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
                  src="/overview-header.png"
                  alt="overview-header-decoration"
                />
              </div>
              <img
                id="notes-lines"
                src="/notes-lines.png"
                alt="decorative-lines"
              />
            </div>
          </section>
          {/* right section */}
          <section id="dashboard--right--section">
            <div id="right--section--content--container">
              <div id="right--section--header">
                <p id="right--section--header--title">
                  {isEventsView
                    ? "Upcoming Events for Today Wednesday 15 2025"
                    : "Celebrants Profile"}
                </p>
                {/* buttons */}
                <Toggle activeView={activeView} setActiveView={setActiveView} />
                {/* 🍇 */}
              </div>
              {/* event table header */}
              {isEventsView && (
                <div id="right--section--table--header">
                  <p id="table--header--event">Event</p>
                  <p id="table--header--time">Celebrant</p>
                  <p id="table--header--location">Date</p>
                  <p id="table--header--status">Message</p>
                </div>
              )}
              {/* event and celebrant content section */}
              <div
                id="events--celebrants--container"
                style={{
                  height: isEventsView ? "77%" : "83%",
                }}
              >
                {/* event table body */}
                {isEventsView && (
                  <Events
                    eventsHook={eventsHook}
                    onEditEvent={navigateToEditEvent}
                  />
                )}
                {isCelebrantsView && (
                  <CelebrantsProfile
                    activeView={activeView}
                    celebrantsHook={celebrantsHook}
                    onEditCelebrant={navigateToEditCelebrant}
                    onViewCelebrant={navigateToViewCelebrant}
                  />
                )}
              </div>
            </div>
          </section>
        </section>
      </main>
    </>
  );
}

export default App;
