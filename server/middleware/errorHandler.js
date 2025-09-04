// Error handling middleware
export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  // Handle validation errors
  if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }

  // Handle specific error types
  if (err.message && err.message.includes("Slot is already booked")) {
    return res.status(409).json({ error: err.message });
  }

  if (err.message && err.message.includes("You already booked a slot")) {
    return res.status(409).json({ error: err.message });
  }

  // Default error response
  res.status(500).json({ error: "Internal server error" });
};
