import { useState, useCallback, useEffect } from "react";
import { eventsAPI, celebrantsAPI, handleAPIError } from "../utils/api.js";
import { useAuth } from "../contexts/AuthContext";

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

/**
 * Custom hook for managing events data with API
 * @returns {Object} - { events, loading, error, addEvent, editEvent, deleteEvent, shareEvent, getEventById, refreshEvents }
 */
export const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated, token } = useAuth();

  // Fetch all events
  const refreshEvents = useCallback(
    async (params = {}) => {
      if (!isAuthenticated || !token) {
        setEvents([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const response = await eventsAPI.getAll(params);
        setEvents(response.data || []);
      } catch (err) {
        setError(handleAPIError(err));
        console.error("Error fetching events:", err);
        // If authentication error, clear events
        if (
          err.message.includes("401") ||
          err.message.includes("unauthorized")
        ) {
          setEvents([]);
        }
      } finally {
        setLoading(false);
      }
    },
    [isAuthenticated, token]
  );

  // Load events on mount and when auth changes
  useEffect(() => {
    refreshEvents();
  }, [refreshEvents, isAuthenticated]);

  // Add new event
  const addEvent = useCallback(
    async (newEvent) => {
      if (!isAuthenticated) {
        throw new Error("Please login to add events");
      }

      setLoading(true);
      setError(null);
      try {
        const response = await eventsAPI.create(newEvent);
        setEvents((prev) => [...prev, response.data]);
        return response.data;
      } catch (err) {
        setError(handleAPIError(err));
        console.error("Error adding event:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [isAuthenticated]
  );

  // Edit event
  const editEvent = useCallback(
    async (eventId, updatedEvent) => {
      if (!isAuthenticated) {
        throw new Error("Please login to edit events");
      }

      setLoading(true);
      setError(null);
      try {
        const response = await eventsAPI.update(eventId, updatedEvent);
        setEvents((prev) =>
          prev.map((event) => (event._id === eventId ? response.data : event))
        );
        return response.data;
      } catch (err) {
        setError(handleAPIError(err));
        console.error("Error editing event:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [isAuthenticated]
  );

  // Delete event
  const deleteEvent = useCallback(
    async (eventId) => {
      if (!isAuthenticated) {
        throw new Error("Please login to delete events");
      }

      setLoading(true);
      setError(null);
      try {
        await eventsAPI.delete(eventId);
        setEvents((prev) => prev.filter((event) => event._id !== eventId));
      } catch (err) {
        setError(handleAPIError(err));
        console.error("Error deleting event:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [isAuthenticated]
  );

  // Share event
  const shareEvent = useCallback(
    (eventId) => {
      const event = events.find((e) => e._id === eventId);
      if (event && navigator.share) {
        navigator
          .share({
            title: `${event.event} for ${event.celebrant}`,
            text: event.message,
            url: window.location.href,
          })
          .catch((err) => console.log("Error sharing:", err));
      } else {
        // Fallback: copy to clipboard
        const event = events.find((e) => e._id === eventId);
        if (event) {
          navigator.clipboard
            .writeText(
              `${event.event} for ${event.celebrant}: ${event.message}`
            )
            .then(() => {
              alert("Event details copied to clipboard!");
            })
            .catch((err) => {
              console.error("Failed to copy to clipboard:", err);
            });
        }
      }
    },
    [events]
  );

  // Get event by ID
  const getEventById = useCallback(
    async (eventId) => {
      try {
        const response = await eventsAPI.getById(eventId);
        return response.data;
      } catch (err) {
        console.error("Error fetching event by ID:", err);
        // Fallback to local state
        return events.find((event) => event._id === eventId);
      }
    },
    [events]
  );

  return {
    events,
    loading,
    error,
    addEvent,
    editEvent,
    deleteEvent,
    shareEvent,
    getEventById,
    refreshEvents,
  };
};

/**
 * Custom hook for managing celebrants data with API
 * @returns {Object} - { celebrants, loading, error, addCelebrant, editCelebrant, deleteCelebrant, createEventForCelebrant, getCelebrantById, refreshCelebrants }
 */
export const useCelebrants = () => {
  const [celebrants, setCelebrants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated, token } = useAuth();

  // Fetch all celebrants
  const refreshCelebrants = useCallback(
    async (params = {}) => {
      if (!isAuthenticated || !token) {
        setCelebrants([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const response = await celebrantsAPI.getAll(params);
        setCelebrants(response.data || []);
      } catch (err) {
        setError(handleAPIError(err));
        console.error("Error fetching celebrants:", err);
        // If authentication error, clear celebrants
        if (
          err.message.includes("401") ||
          err.message.includes("unauthorized")
        ) {
          setCelebrants([]);
        }
      } finally {
        setLoading(false);
      }
    },
    [isAuthenticated, token]
  );

  // Load celebrants on mount and when auth changes
  useEffect(() => {
    refreshCelebrants();
  }, [refreshCelebrants, isAuthenticated]);

  // Add new celebrant
  const addCelebrant = useCallback(
    async (newCelebrant) => {
      if (!isAuthenticated) {
        throw new Error("Please login to add celebrants");
      }

      setLoading(true);
      setError(null);
      try {
        const response = await celebrantsAPI.create(newCelebrant);
        setCelebrants((prev) => [...prev, response.data]);
        return response.data;
      } catch (err) {
        setError(handleAPIError(err));
        console.error("Error adding celebrant:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [isAuthenticated]
  );

  // Edit celebrant
  const editCelebrant = useCallback(
    async (celebrantId, updatedCelebrant) => {
      if (!isAuthenticated) {
        throw new Error("Please login to edit celebrants");
      }

      setLoading(true);
      setError(null);
      try {
        const response = await celebrantsAPI.update(
          celebrantId,
          updatedCelebrant
        );
        setCelebrants((prev) =>
          prev.map((celebrant) =>
            celebrant._id === celebrantId ? response.data : celebrant
          )
        );
        return response.data;
      } catch (err) {
        setError(handleAPIError(err));
        console.error("Error editing celebrant:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [isAuthenticated]
  );

  // Delete celebrant
  const deleteCelebrant = useCallback(
    async (celebrantId) => {
      if (!isAuthenticated) {
        throw new Error("Please login to delete celebrants");
      }

      setLoading(true);
      setError(null);
      try {
        await celebrantsAPI.delete(celebrantId);
        setCelebrants((prev) =>
          prev.filter((celebrant) => celebrant._id !== celebrantId)
        );
      } catch (err) {
        setError(handleAPIError(err));
        console.error("Error deleting celebrant:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [isAuthenticated]
  );

  // Create event for celebrant
  const createEventForCelebrant = useCallback((celebrantId) => {
    console.log("Create event for celebrant:", celebrantId);
    // This will be handled by the parent component navigation
  }, []);

  // Get celebrant by ID
  const getCelebrantById = useCallback(
    async (celebrantId) => {
      if (!isAuthenticated) {
        return null;
      }

      try {
        const response = await celebrantsAPI.getById(celebrantId);
        return response.data;
      } catch (err) {
        console.error("Error fetching celebrant by ID:", err);
        // Fallback to local state
        return celebrants.find((celebrant) => celebrant._id === celebrantId);
      }
    },
    [celebrants, isAuthenticated]
  );

  return {
    celebrants,
    loading,
    error,
    addCelebrant,
    editCelebrant,
    deleteCelebrant,
    createEventForCelebrant,
    getCelebrantById,
    refreshCelebrants,
  };
};
