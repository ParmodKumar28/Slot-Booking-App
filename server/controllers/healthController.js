export const healthCheck = (req, res) => {
  res.json({
    status: "OK",
    message: "Slot booking API is running",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
};
