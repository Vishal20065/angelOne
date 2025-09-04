import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import profitRoutes from "./routes/profitRoutes.js";
import fundAddRoutes from "./routes/fundAddRoutes.js";
import fundWithdrawRoutes from "./routes/fundWithdrawRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/profits", profitRoutes);
app.use("/api/funds", fundAddRoutes);
app.use("/api/fund-withdraw", fundWithdrawRoutes);
app.use("/api/profiles", profileRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
