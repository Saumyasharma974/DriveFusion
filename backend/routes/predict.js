import express from "express";
import axios from "axios";
import Log from "../models/Log.js";


const router = express.Router();

router.post("/accident", async (req, res) => {
  try {
    const input = {
      x_accel: req.body.x_accel,
      y_accel: req.body.y_accel,
      z_accel: req.body.z_accel,
      gps_speed: req.body.gps_speed,
    };

    console.log("Accident Input:", input);

    const response = await axios.post("http://127.0.0.1:5000/predict", input);
    const prediction = response.data.collision_detected;

    // ✅ Save to MongoDB
    await Log.create({
      type: "accident",
      input,
      prediction
    });

    res.json(response.data);
  } catch (err) {
    console.error("Accident Error:", err.message);
    res.status(500).json({ error: "Flask accident API error" });
  }
});

router.post("/maintenance", async (req, res) => {
  try {
    const input = {
      engine_temp: req.body.engine,
      brake_status: req.body.brake,
      battery_level: req.body.battery,
      fuel_level: req.body.fuel
    };

    console.log("Maintenance Input:", input);

    const response = await axios.post("http://127.0.0.1:5000/predict_maintenance", input);
    const prediction = response.data.vehicle_failure;

    // ✅ Save to MongoDB
    await Log.create({
      type: "maintenance",
      input,
      prediction
    });

    res.json(response.data);
  } catch (err) {
    console.error("Maintenance Error:", err.message);
    res.status(500).json({ error: "Flask maintenance API error" });
  }
});
router.post("/battery", async (req, res) => {
  try {
    const { speed, distance, temperature } = req.body;

    const response = await axios.post("http://127.0.0.1:5002/predict_battery", {
      speed,
      distance,
      temperature,
    });

    res.json(response.data);
  } catch (error) {
    console.error("Battery API error:", error);
    res.status(500).json({ error: "Flask battery API error" });
  }
});

export default router;
