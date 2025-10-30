import { useState, useCallback } from "react";

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
 * Custom hook for managing events data
 * @returns {Object} - { events, addEvent, editEvent, deleteEvent, shareEvent }
 */
export const useEvents = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      event: "Birthday",
      celebrant: "John Doe",
      date: "2025-01-15",
      message:
        "Happy Birthday to the one who fills my life with meaning. May this year bring you the same joy, warmth, and love you have given me every single day.",
    },
    {
      id: 2,
      event: "Birthday",
      celebrant: "Jon Doe",
      date: "2025-01-15",
      message:
        "Happy Birthday to the one who fills my life with meaning. May this year bring you the same joy, warmth, and love you have given me every single day.",
    },
    {
      id: 3,
      event: "Wedding",
      celebrant: "Jon Doe",
      date: "2025-01-15",
      message:
        "Happy Birthday to the one who fills my life with meaning. May this year bring you the same joy, warmth, and love you have given me every single day.",
    },
    {
      id: 4,
      event: "Birthday",
      celebrant: "Jon Doe",
      date: "2025-01-15",
      message:
        "Happy Birthday to the one who fills my life with meaning. May this year bring you the same joy, warmth, and love you have given me every single day.",
    },
  ]);

  const addEvent = useCallback((newEvent) => {
    const event = {
      ...newEvent,
      id: Date.now(), // Simple ID generation
    };
    setEvents((prev) => [...prev, event]);
  }, []);

  const editEvent = useCallback((eventId, updatedEvent) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === eventId ? { ...event, ...updatedEvent } : event
      )
    );
  }, []);

  const deleteEvent = useCallback((eventId) => {
    setEvents((prev) => prev.filter((event) => event.id !== eventId));
  }, []);

  const shareEvent = useCallback(
    (eventId) => {
      const event = events.find((e) => e.id === eventId);
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
        const event = events.find((e) => e.id === eventId);
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

  const getEventById = useCallback(
    (eventId) => {
      return events.find((event) => event.id === eventId);
    },
    [events]
  );

  return {
    events,
    addEvent,
    editEvent,
    deleteEvent,
    shareEvent,
    getEventById,
  };
};

/**
 * Custom hook for managing celebrants data
 * @returns {Object} - { celebrants, addCelebrant, editCelebrant, deleteCelebrant, createEventForCelebrant }
 */
export const useCelebrants = () => {
  const [celebrants, setCelebrants] = useState([
    {
      id: 1,
      name: "John Don",
      image: "/contact-p-p.png",
      relationship: "Father",
      ageGroup: "Adult",
      likes: "Reading, gardening, and cooking",
    },
    {
      id: 2,
      name: "Jane Smith",
      image: "/contact-p-p.png",
      relationship: "Mother",
      ageGroup: "Adult",
      likes: "Music, traveling, and painting",
    },
    {
      id: 3,
      name: "Bob Johnson",
      image: "/contact-p-p.png",
      relationship: "Brother",
      ageGroup: "Young Adult",
      likes: "Sports, gaming, and movies",
    },
    {
      id: 4,
      name: "Alice Williams",
      image: "/contact-p-p.png",
      relationship: "Sister",
      ageGroup: "Teen",
      likes: "Dancing, social media, and fashion",
    },
    {
      id: 5,
      name: "Mike Davis",
      image: "/contact-p-p.png",
      relationship: "Uncle",
      ageGroup: "Adult",
      likes: "Fishing, woodworking, and BBQ",
    },
    {
      id: 6,
      name: "Sarah Brown",
      image: "/contact-p-p.png",
      relationship: "Friend",
      ageGroup: "Young Adult",
      likes: "Photography, hiking, and coffee",
    },
  ]);

  const addCelebrant = useCallback((newCelebrant) => {
    const celebrant = {
      ...newCelebrant,
      id: Date.now(),
    };
    setCelebrants((prev) => [...prev, celebrant]);
  }, []);

  const editCelebrant = useCallback((celebrantId, updatedCelebrant) => {
    setCelebrants((prev) =>
      prev.map((celebrant) =>
        celebrant.id === celebrantId
          ? { ...celebrant, ...updatedCelebrant }
          : celebrant
      )
    );
  }, []);

  const deleteCelebrant = useCallback((celebrantId) => {
    setCelebrants((prev) =>
      prev.filter((celebrant) => celebrant.id !== celebrantId)
    );
  }, []);

  const createEventForCelebrant = useCallback((celebrantId) => {
    console.log("Create event for celebrant:", celebrantId);
    // TODO: Implement navigation to create event form with pre-filled celebrant
  }, []);

  const getCelebrantById = useCallback(
    (celebrantId) => {
      return celebrants.find((celebrant) => celebrant.id === celebrantId);
    },
    [celebrants]
  );

  return {
    celebrants,
    addCelebrant,
    editCelebrant,
    deleteCelebrant,
    createEventForCelebrant,
    getCelebrantById,
  };
};
