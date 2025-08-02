import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  type: String,
  input: Object,
  prediction: Number,
  timestamp: String,
});

export default mongoose.model("Log", logSchema);
