import { useAuth } from "../contexts/AuthContext";

// Custom hook for authenticated API calls
export const useApi = () => {
  const { apiCall, isAuthenticated } = useAuth();

  // Events API
  const eventsApi = {
    // Get all events
    getAll: async (filters = {}) => {
      const queryParams = new URLSearchParams(filters).toString();
      const url = `/events${queryParams ? `?${queryParams}` : ""}`;
      return await apiCall(url);
    },

    // Get single event
    getById: async (id) => {
      return await apiCall(`/events/${id}`);
    },

    // Create new event
    create: async (eventData) => {
      return await apiCall("/events", {
        method: "POST",
        body: JSON.stringify(eventData),
      });
    },

    // Update event
    update: async (id, eventData) => {
      return await apiCall(`/events/${id}`, {
        method: "PUT",
        body: JSON.stringify(eventData),
      });
    },

    // Delete event
    delete: async (id) => {
      return await apiCall(`/events/${id}`, {
        method: "DELETE",
      });
    },
  };

  // Celebrants API
  const celebrantsApi = {
    // Get all celebrants
    getAll: async (filters = {}) => {
      const queryParams = new URLSearchParams(filters).toString();
      const url = `/celebrants${queryParams ? `?${queryParams}` : ""}`;
      return await apiCall(url);
    },

    // Get single celebrant
    getById: async (id) => {
      return await apiCall(`/celebrants/${id}`);
    },

    // Create new celebrant
    create: async (celebrantData) => {
      return await apiCall("/celebrants", {
        method: "POST",
        body: JSON.stringify(celebrantData),
      });
    },

    // Update celebrant
    update: async (id, celebrantData) => {
      return await apiCall(`/celebrants/${id}`, {
        method: "PUT",
        body: JSON.stringify(celebrantData),
      });
    },

    // Delete celebrant
    delete: async (id) => {
      return await apiCall(`/celebrants/${id}`, {
        method: "DELETE",
      });
    },
  };

  return {
    events: eventsApi,
    celebrants: celebrantsApi,
    isAuthenticated,
  };
};
