// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || "http://localhost:5000",
  ENDPOINTS: {
    SLOTS: "/api/slots",
    BOOK: "/api/book",
    BOOKINGS: "/api/bookings",
    HEALTH: "/api/health",
  },
};

// Business Logic Constants
export const BUSINESS_CONFIG = {
  SLOT_INTERVAL: 30, // minutes
  START_TIME: "09:00",
  END_TIME: "17:00",
  MAX_BOOKINGS_PER_USER_PER_DAY: 1,
};

// UI Constants
export const UI_CONFIG = {
  DEBOUNCE_DELAY: 600, // ms
  TOAST_AUTO_CLOSE: 5000, // ms
  DATE_FORMAT: "MMMM D, YYYY",
  TIME_FORMAT: "h:mm A",
};

// Validation Messages
export const VALIDATION_MESSAGES = {
  EMAIL_REQUIRED: "Please enter your email address",
  INVALID_EMAIL: "Please enter a valid email address",
  SLOT_BOOKING_FAILED: "Failed to book slot. Please try again.",
  SLOT_ALREADY_BOOKED:
    "This slot is already booked. Please select another time.",
  FETCH_SLOTS_FAILED: "Failed to fetch available slots",
};
