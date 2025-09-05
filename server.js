import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import profitRoutes from "./routes/profitRoutes.js";
import fundAddRoutes from "./routes/fundAddRoutes.js";
import fundWithdrawRoutes from "./routes/fundWithdrawRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import order1Routes from "./routes/order1Routes.js";
import order2Routes from "./routes/order2Routes.js";


import cors from 'cors'


dotenv.config();
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",       // ✅ allow all
    credentials: true, // ⚠️ note: with "*" this may cause issues
  })
);


// Routes
app.use("/api/users", userRoutes);
app.use("/api/profits", profitRoutes);
app.use("/api/funds", fundAddRoutes);
app.use("/api/fund-withdraw", fundWithdrawRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/orders1", order1Routes);
app.use("/api/orders2", order2Routes);


// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
