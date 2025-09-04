import app from "./app.js";
import "./config/database.js"; // Initialize Firebase

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📅 Slot Booking API ready at http://localhost:${PORT}`);
  console.log(`🌍 Timezone: ${process.env.TZ || "UTC"}`);
});
