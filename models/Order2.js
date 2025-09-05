import mongoose from "mongoose";

function toTwoDecimals(num) {
  if (num == null) return num;
  return parseFloat(num.toFixed(2));
}

const order2Schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    date: { type: String },
    equity: { type: String },
    Avg: { type: String },
    price: { type: Number, set: toTwoDecimals, get: toTwoDecimals },
    lot: { type: Number, set: toTwoDecimals, get: toTwoDecimals },
    ltp: { type: Number, set: toTwoDecimals, get: toTwoDecimals },
    ltpercent: { type: Number, set: toTwoDecimals, get: toTwoDecimals },
    buy: { type: Number, set: toTwoDecimals, get: toTwoDecimals },
    sell: { type: Number, set: toTwoDecimals, get: toTwoDecimals },
  },
  { timestamps: true }
);

export default mongoose.model("Order2", order2Schema);
