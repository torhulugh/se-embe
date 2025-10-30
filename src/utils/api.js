// API base URL
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Generic API call function
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const finalOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, finalOptions);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`API call failed for ${endpoint}:`, error);
    throw error;
  }
};

// Events API
export const eventsAPI = {
  // Get all events
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/events?${queryString}` : "/events";
    return apiCall(endpoint);
  },

  // Get single event
  getById: async (id) => {
    return apiCall(`/events/${id}`);
  },

  // Create new event
  create: async (eventData) => {
    return apiCall("/events", {
      method: "POST",
      body: JSON.stringify(eventData),
    });
  },

  // Update event
  update: async (id, eventData) => {
    return apiCall(`/events/${id}`, {
      method: "PUT",
      body: JSON.stringify(eventData),
    });
  },

  // Delete event
  delete: async (id) => {
    return apiCall(`/events/${id}`, {
      method: "DELETE",
    });
  },

  // Get events for specific celebrant
  getByCelebrant: async (celebrantId) => {
    return apiCall(`/events/celebrant/${celebrantId}`);
  },
};

// Celebrants API
export const celebrantsAPI = {
  // Get all celebrants
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/celebrants?${queryString}` : "/celebrants";
    return apiCall(endpoint);
  },

  // Get single celebrant
  getById: async (id) => {
    return apiCall(`/celebrants/${id}`);
  },

  // Create new celebrant
  create: async (celebrantData) => {
    return apiCall("/celebrants", {
      method: "POST",
      body: JSON.stringify(celebrantData),
    });
  },

  // Update celebrant
  update: async (id, celebrantData) => {
    return apiCall(`/celebrants/${id}`, {
      method: "PUT",
      body: JSON.stringify(celebrantData),
    });
  },

  // Delete celebrant
  delete: async (id) => {
    return apiCall(`/celebrants/${id}`, {
      method: "DELETE",
    });
  },

  // Get celebrant events
  getEvents: async (id) => {
    return apiCall(`/celebrants/${id}/events`);
  },

  // Get relationship options
  getRelationships: async () => {
    return apiCall("/celebrants/relationships/list");
  },

  // Get age group options
  getAgeGroups: async () => {
    return apiCall("/celebrants/age-groups/list");
  },
};

// Error handling utility
export const handleAPIError = (error) => {
  if (error.message.includes("fetch")) {
    return "Network error. Please check your connection and try again.";
  }
  return error.message || "An unexpected error occurred.";
};

export default {
  eventsAPI,
  celebrantsAPI,
  handleAPIError,
};
