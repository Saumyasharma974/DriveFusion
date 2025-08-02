import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import predictRoutes from "./routes/predict.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Routes

app.use("/api/predict", predictRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Node Backend Running with Flask ML Integration");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
