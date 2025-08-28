import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import candidateRoutes from "./Routes/candidateRoutes.js";


dotenv.config();


const app = express();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));


connectDB();


app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the Mini ATS Backend!",
    version: "1.0.0",
    endpoints: {
      candidates: "/api/candidates",
      analytics: "/api/candidates/analytics",
    },
  });
});


app.use("/api/candidates", candidateRoutes);


app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal Server Error",
  });
});


app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📊 API Documentation: http://localhost:${PORT}/api/candidates`);
});
