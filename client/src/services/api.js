import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(
      `Making ${config.method?.toUpperCase()} request to ${config.url}`
    );
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(
      `Response received from ${response.config.url}:`,
      response.status
    );
    return response;
  },
  (error) => {
    console.error(
      "Response error:",
      error.response?.status,
      error.response?.data
    );
    return Promise.reject(error);
  }
);

// API service functions
export const slotService = {
  // Get available slots for a date
  getSlots: async (date) => {
    const { data } = await apiClient.get(`/api/slots/${date}`);
    return data;
  },

  // Book a slot
  bookSlot: async (bookingData) => {
    const { data } = await apiClient.post("/api/book", bookingData);
    return data;
  },

  // Get user bookings
  getUserBookings: async (userEmail) => {
    console.log("Fetching bookings for user:", userEmail);
    const { data } = await apiClient.get(
      `/api/bookings/${encodeURIComponent(userEmail)}`
    );
    return data;
  },

  // Health check
  healthCheck: async () => {
    const { data } = await apiClient.get("/api/health");
    return data;
  },
};

export default apiClient;
