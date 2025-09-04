import mongoose from "mongoose";


function toTwoDecimals(num) {
  if (num == null) return num;
  return parseFloat(num.toFixed(2));
}

const profitSchema = new mongoose.Schema({
  name: { type: String },
  date: { type: String },
  equity: { type: String },
  realisedPl: { type: Number,set: toTwoDecimals,
    get: toTwoDecimals },
  charges: { type: Number ,set: toTwoDecimals,
    get: toTwoDecimals},
  netRealised: { type: Number,set: toTwoDecimals,
    get: toTwoDecimals }
}, { timestamps: true });

// Auto-calculate netRealised before save
profitSchema.pre("save", function (next) {
  if (this.realisedPl != null && this.charges != null) {
    this.netRealised = this.realisedPl - this.charges;
  }
  next();
});

export default mongoose.model("Profit", profitSchema);
