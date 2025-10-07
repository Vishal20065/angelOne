import mongoose from "mongoose";

const fundAddSchema = new mongoose.Schema(
  {
    name: { type: String, },
    account: { type: String},
    price: { type: Number },
      date: { type: String },
    status: {
      type: String,
      enum: ["success", "pending"],
      default: "success"
    }
  },
  { timestamps: true }
);

export default mongoose.model("FundAdd", fundAddSchema);
