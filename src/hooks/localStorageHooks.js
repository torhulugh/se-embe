import { useState, useCallback, useEffect } from "react";

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

// Fallback data for when API is not available
const defaultEvents = [
  {
    _id: "1",
    event: "Birthday",
    celebrant: "John Doe",
    date: "2025-01-15",
    message:
      "Happy Birthday to the one who fills my life with meaning. May this year bring you the same joy, warmth, and love you have given me every single day.",
  },
  {
    _id: "2",
    event: "Birthday",
    celebrant: "Jon Doe",
    date: "2025-01-15",
    message:
      "Happy Birthday to the one who fills my life with meaning. May this year bring you the same joy, warmth, and love you have given me every single day.",
  },
  {
    _id: "3",
    event: "Wedding",
    celebrant: "Jon Doe",
    date: "2025-01-15",
    message:
      "Happy Birthday to the one who fills my life with meaning. May this year bring you the same joy, warmth, and love you have given me every single day.",
  },
  {
    _id: "4",
    event: "Birthday",
    celebrant: "Jon Doe",
    date: "2025-01-15",
    message:
      "Happy Birthday to the one who fills my life with meaning. May this year bring you the same joy, warmth, and love you have given me every single day.",
  },
];

const defaultCelebrants = [
  {
    _id: "1",
    name: "John Don",
    image: "/contact-p-p.png",
    relationship: "Father",
    ageGroup: "Adult",
    likes: "Reading, gardening, and cooking",
  },
  {
    _id: "2",
    name: "Jane Smith",
    image: "/contact-p-p.png",
    relationship: "Mother",
    ageGroup: "Adult",
    likes: "Music, traveling, and painting",
  },
  {
    _id: "3",
    name: "Bob Johnson",
    image: "/contact-p-p.png",
    relationship: "Brother",
    ageGroup: "Young Adult",
    likes: "Sports, gaming, and movies",
  },
  {
    _id: "4",
    name: "Alice Williams",
    image: "/contact-p-p.png",
    relationship: "Sister",
    ageGroup: "Teen",
    likes: "Dancing, social media, and fashion",
  },
  {
    _id: "5",
    name: "Mike Davis",
    image: "/contact-p-p.png",
    relationship: "Uncle",
    ageGroup: "Adult",
    likes: "Fishing, woodworking, and BBQ",
  },
  {
    _id: "6",
    name: "Sarah Brown",
    image: "/contact-p-p.png",
    relationship: "Friend",
    ageGroup: "Young Adult",
    likes: "Photography, hiking, and coffee",
  },
];

/**
 * Custom hook for managing events data with localStorage fallback
 * @returns {Object} - { events, addEvent, editEvent, deleteEvent, shareEvent, getEventById }
 */
export const useEvents = () => {
  const [events, setEvents] = useState(() => {
    const stored = localStorage.getItem("se-embe-events");
    return stored ? JSON.parse(stored) : defaultEvents;
  });

  // Save to localStorage whenever events change
  useEffect(() => {
    localStorage.setItem("se-embe-events", JSON.stringify(events));
  }, [events]);

  const addEvent = useCallback((newEvent) => {
    const event = {
      ...newEvent,
      _id: Date.now().toString(), // Simple ID generation
    };
    setEvents((prev) => [...prev, event]);
  }, []);

  const editEvent = useCallback((eventId, updatedEvent) => {
    setEvents((prev) =>
      prev.map((event) =>
        event._id === eventId ? { ...event, ...updatedEvent } : event
      )
    );
  }, []);

  const deleteEvent = useCallback((eventId) => {
    setEvents((prev) => prev.filter((event) => event._id !== eventId));
  }, []);

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

  const getEventById = useCallback(
    (eventId) => {
      return events.find((event) => event._id === eventId);
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
 * Custom hook for managing celebrants data with localStorage fallback
 * @returns {Object} - { celebrants, addCelebrant, editCelebrant, deleteCelebrant, createEventForCelebrant, getCelebrantById }
 */
export const useCelebrants = () => {
  const [celebrants, setCelebrants] = useState(() => {
    const stored = localStorage.getItem("se-embe-celebrants");
    return stored ? JSON.parse(stored) : defaultCelebrants;
  });

  // Save to localStorage whenever celebrants change
  useEffect(() => {
    localStorage.setItem("se-embe-celebrants", JSON.stringify(celebrants));
  }, [celebrants]);

  const addCelebrant = useCallback((newCelebrant) => {
    const celebrant = {
      ...newCelebrant,
      _id: Date.now().toString(),
    };
    setCelebrants((prev) => [...prev, celebrant]);
  }, []);

  const editCelebrant = useCallback((celebrantId, updatedCelebrant) => {
    setCelebrants((prev) =>
      prev.map((celebrant) =>
        celebrant._id === celebrantId
          ? { ...celebrant, ...updatedCelebrant }
          : celebrant
      )
    );
  }, []);

  const deleteCelebrant = useCallback((celebrantId) => {
    setCelebrants((prev) =>
      prev.filter((celebrant) => celebrant._id !== celebrantId)
    );
  }, []);

  const createEventForCelebrant = useCallback((celebrantId) => {
    console.log("Create event for celebrant:", celebrantId);
    // TODO: Implement navigation to create event form with pre-filled celebrant
  }, []);

  const getCelebrantById = useCallback(
    (celebrantId) => {
      return celebrants.find((celebrant) => celebrant._id === celebrantId);
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
