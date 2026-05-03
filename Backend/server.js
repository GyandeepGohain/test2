const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

process.on("uncaughtException", (err) => {
  console.log("❌ CRASH:", err.message);
});

process.on("unhandledRejection", (err) => {
  console.log("❌ REJECTION:", err.message);
});

app.get("/", (req, res) => res.json({ message: "Task Manager V2 API running..." }));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/seed", require("./routes/seedRoutes"));

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));