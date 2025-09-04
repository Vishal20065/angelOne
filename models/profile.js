import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    clientId: { type: String, required: true },
    price: { type: Number, required: true },
    date: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
