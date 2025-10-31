import { useState, useEffect, useCallback } from "react";
import { eventsAPI, celebrantsAPI } from "../utils/api";
import { useAuth } from "../contexts/AuthContext";

/**
 * Custom hook for managing events data with MongoDB
 * Replaces localStorage with database storage
 */
export const useMongoEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated, token } = useAuth();

  // Fetch events from MongoDB
  const fetchEvents = useCallback(async () => {
    if (!isAuthenticated || !token) {
      setEvents([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await eventsAPI.getAll();
      setEvents(response.data || response.events || []);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching events:", err);
      // If authentication error, clear events
      if (err.message.includes("401") || err.message.includes("unauthorized")) {
        setEvents([]);
      }
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, token]);

  // Load events on mount and when auth changes
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents, isAuthenticated]);

  // Add new event
  const addEvent = useCallback(
    async (newEvent) => {
      if (!isAuthenticated) {
        return { success: false, error: "Please login to add events" };
      }

      try {
        setError(null);
        const response = await eventsAPI.create(newEvent);
        const createdEvent = response.data || response.event;

        setEvents((prev) => [...prev, createdEvent]);
        return { success: true, data: createdEvent };
      } catch (err) {
        setError(err.message);
        return { success: false, error: err.message };
      }
    },
    [isAuthenticated]
  );

  // Edit existing event
  const editEvent = useCallback(
    async (eventId, updatedEvent) => {
      if (!isAuthenticated) {
        return { success: false, error: "Please login to edit events" };
      }

      try {
        setError(null);
        const response = await eventsAPI.update(eventId, updatedEvent);
        const updated = response.data || response.event;

        setEvents((prev) =>
          prev.map((event) =>
            event._id === eventId ? { ...event, ...updated } : event
          )
        );
        return { success: true, data: updated };
      } catch (err) {
        setError(err.message);
        return { success: false, error: err.message };
      }
    },
    [isAuthenticated]
  );

  // Delete event
  const deleteEvent = useCallback(
    async (eventId) => {
      if (!isAuthenticated) {
        return { success: false, error: "Please login to delete events" };
      }

      try {
        setError(null);
        await eventsAPI.delete(eventId);

        setEvents((prev) => prev.filter((event) => event._id !== eventId));
        return { success: true };
      } catch (err) {
        setError(err.message);
        return { success: false, error: err.message };
      }
    },
    [isAuthenticated]
  );

  // Get event by ID
  const getEventById = useCallback(
    (eventId) => {
      return events.find((event) => event._id === eventId);
    },
    [events]
  );

  // Share event (using Web Share API or fallback)
  const shareEvent = useCallback(
    async (eventId) => {
      const event = getEventById(eventId);
      if (!event) return { success: false, error: "Event not found" };

      const shareData = {
        title: `${event.event} for ${event.celebrant}`,
        text: event.message,
        url: window.location.href,
      };

      try {
        if (navigator.share && navigator.canShare(shareData)) {
          await navigator.share(shareData);
          return { success: true };
        } else {
          // Fallback: copy to clipboard
          await navigator.clipboard.writeText(
            `${shareData.title}\n${shareData.text}\n${shareData.url}`
          );
          return { success: true, method: "clipboard" };
        }
      } catch (err) {
        return { success: false, error: err.message };
      }
    },
    [getEventById]
  );

  // Refresh events (useful for real-time updates)
  const refreshEvents = useCallback(() => {
    fetchEvents();
  }, [fetchEvents]);

  return {
    events,
    loading,
    error,
    addEvent,
    editEvent,
    deleteEvent,
    getEventById,
    shareEvent,
    refreshEvents,
  };
};

/**
 * Custom hook for managing celebrants data with MongoDB
 * Replaces localStorage with database storage
 */
export const useMongoCelebrants = () => {
  const [celebrants, setCelebrants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated, token } = useAuth();

  // Fetch celebrants from MongoDB
  const fetchCelebrants = useCallback(async () => {
    if (!isAuthenticated || !token) {
      setCelebrants([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await celebrantsAPI.getAll();
      setCelebrants(response.data || response.celebrants || []);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching celebrants:", err);
      // If authentication error, clear celebrants
      if (err.message.includes("401") || err.message.includes("unauthorized")) {
        setCelebrants([]);
      }
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, token]);

  // Load celebrants on mount and when auth changes
  useEffect(() => {
    fetchCelebrants();
  }, [fetchCelebrants, isAuthenticated]);

  // Add new celebrant
  const addCelebrant = useCallback(
    async (newCelebrant) => {
      if (!isAuthenticated) {
        return { success: false, error: "Please login to add celebrants" };
      }

      try {
        setError(null);
        const response = await celebrantsAPI.create(newCelebrant);
        const createdCelebrant = response.data || response.celebrant;

        setCelebrants((prev) => [...prev, createdCelebrant]);
        return { success: true, data: createdCelebrant };
      } catch (err) {
        setError(err.message);
        return { success: false, error: err.message };
      }
    },
    [isAuthenticated]
  );

  // Edit existing celebrant
  const editCelebrant = useCallback(
    async (celebrantId, updatedCelebrant) => {
      if (!isAuthenticated) {
        return { success: false, error: "Please login to edit celebrants" };
      }

      try {
        setError(null);
        const response = await celebrantsAPI.update(
          celebrantId,
          updatedCelebrant
        );
        const updated = response.data || response.celebrant;

        setCelebrants((prev) =>
          prev.map((celebrant) =>
            celebrant._id === celebrantId
              ? { ...celebrant, ...updated }
              : celebrant
          )
        );
        return { success: true, data: updated };
      } catch (err) {
        setError(err.message);
        return { success: false, error: err.message };
      }
    },
    [isAuthenticated]
  );

  // Delete celebrant
  const deleteCelebrant = useCallback(
    async (celebrantId) => {
      if (!isAuthenticated) {
        return { success: false, error: "Please login to delete celebrants" };
      }

      try {
        setError(null);
        await celebrantsAPI.delete(celebrantId);

        setCelebrants((prev) =>
          prev.filter((celebrant) => celebrant._id !== celebrantId)
        );
        return { success: true };
      } catch (err) {
        setError(err.message);
        return { success: false, error: err.message };
      }
    },
    [isAuthenticated]
  );

  // Get celebrant by ID
  const getCelebrantById = useCallback(
    (celebrantId) => {
      return celebrants.find((celebrant) => celebrant._id === celebrantId);
    },
    [celebrants]
  );

  // Get celebrant events
  const getCelebrantEvents = useCallback(
    async (celebrantId) => {
      if (!isAuthenticated) {
        return { success: false, error: "Please login to view events" };
      }

      try {
        setError(null);
        const response = await celebrantsAPI.getEvents(celebrantId);
        return { success: true, data: response.data || response.events || [] };
      } catch (err) {
        setError(err.message);
        return { success: false, error: err.message };
      }
    },
    [isAuthenticated]
  );

  // Refresh celebrants (useful for real-time updates)
  const refreshCelebrants = useCallback(() => {
    fetchCelebrants();
  }, [fetchCelebrants]);

  return {
    celebrants,
    loading,
    error,
    addCelebrant,
    editCelebrant,
    deleteCelebrant,
    getCelebrantById,
    getCelebrantEvents,
    refreshCelebrants,
  };
};

/**
 * Custom hook for managing user preferences with MongoDB
 * Stores user-specific settings and preferences
 */
export const useUserPreferences = () => {
  const [preferences, setPreferences] = useState({
    theme: "light",
    notifications: true,
    defaultView: "events",
    reminderDays: 7,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // In a real implementation, this would fetch from a user preferences endpoint
  // For now, we'll use localStorage as a fallback until backend preferences are implemented
  useEffect(() => {
    const stored = localStorage.getItem("user-preferences");
    if (stored) {
      try {
        setPreferences(JSON.parse(stored));
      } catch (err) {
        console.error("Error parsing stored preferences:", err);
      }
    }
  }, []);

  // Update preferences
  const updatePreferences = useCallback(
    async (newPreferences) => {
      try {
        setError(null);
        setLoading(true);

        const updated = { ...preferences, ...newPreferences };
        setPreferences(updated);

        // For now, store in localStorage until backend preferences endpoint is ready
        localStorage.setItem("user-preferences", JSON.stringify(updated));

        // TODO: Implement API call to save preferences to MongoDB
        // const response = await userAPI.updatePreferences(updated);

        return { success: true, data: updated };
      } catch (err) {
        setError(err.message);
        return { success: false, error: err.message };
      } finally {
        setLoading(false);
      }
    },
    [preferences]
  );

  return {
    preferences,
    loading,
    error,
    updatePreferences,
  };
};

/**
 * Custom hook for managing active view state
 * @param {string} initialView - Initial view ('events' or 'celebrants')
 * @returns {Object} - { activeView, setActiveView, isEventsView, isCelebrantsView }
 */
export const useActiveView = (initialView = "events") => {
  const [activeView, setActiveView] = useState(initialView);

  const setActiveViewCallback = useCallback((view) => {
    if (view === "events" || view === "celebrants") {
      setActiveView(view);
    }
  }, []);

  return {
    activeView,
    setActiveView: setActiveViewCallback,
    isEventsView: activeView === "events",
    isCelebrantsView: activeView === "celebrants",
  };
};
