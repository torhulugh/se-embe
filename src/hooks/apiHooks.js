import { useState, useCallback, useEffect } from "react";
import { eventsAPI, celebrantsAPI, handleAPIError } from "../utils/api.js";

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

  // Fetch all events
  const refreshEvents = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await eventsAPI.getAll(params);
      setEvents(response.data || []);
    } catch (err) {
      setError(handleAPIError(err));
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load events on mount
  useEffect(() => {
    refreshEvents();
  }, [refreshEvents]);

  // Add new event
  const addEvent = useCallback(async (newEvent) => {
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
  }, []);

  // Edit event
  const editEvent = useCallback(async (eventId, updatedEvent) => {
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
  }, []);

  // Delete event
  const deleteEvent = useCallback(async (eventId) => {
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
  }, []);

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

  // Fetch all celebrants
  const refreshCelebrants = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await celebrantsAPI.getAll(params);
      setCelebrants(response.data || []);
    } catch (err) {
      setError(handleAPIError(err));
      console.error("Error fetching celebrants:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load celebrants on mount
  useEffect(() => {
    refreshCelebrants();
  }, [refreshCelebrants]);

  // Add new celebrant
  const addCelebrant = useCallback(async (newCelebrant) => {
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
  }, []);

  // Edit celebrant
  const editCelebrant = useCallback(async (celebrantId, updatedCelebrant) => {
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
  }, []);

  // Delete celebrant
  const deleteCelebrant = useCallback(async (celebrantId) => {
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
  }, []);

  // Create event for celebrant
  const createEventForCelebrant = useCallback((celebrantId) => {
    console.log("Create event for celebrant:", celebrantId);
    // This will be handled by the parent component navigation
  }, []);

  // Get celebrant by ID
  const getCelebrantById = useCallback(
    async (celebrantId) => {
      try {
        const response = await celebrantsAPI.getById(celebrantId);
        return response.data;
      } catch (err) {
        console.error("Error fetching celebrant by ID:", err);
        // Fallback to local state
        return celebrants.find((celebrant) => celebrant._id === celebrantId);
      }
    },
    [celebrants]
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
