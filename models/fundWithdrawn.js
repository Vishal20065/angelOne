import mongoose from "mongoose";

const fundWithdrawnSchema = new mongoose.Schema(
  {
    name: { type: String },
    account: { type: String },
    price: { type: Number },
    status: {
      type: String,
      enum: ["APPROVED", "CANCELLED"],
      default: "APPROVED",
    },
  },
  { timestamps: true }
);

export default mongoose.model("FundWithDraw", fundWithdrawnSchema);
