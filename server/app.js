import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Import routes
import slotRoutes from "./routes/slotRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";

// Import middleware
import { errorHandler } from "./middleware/errorHandler.js";

// Load environment variables
dotenv.config();

// Set timezone
process.env.TZ = process.env.APP_TIMEZONE || process.env.TZ || "UTC";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/slots", slotRoutes);
app.use("/api/book", bookingRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/health", healthRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

export default app;
