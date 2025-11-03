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

import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// make sure public folder exists


import QRCode from "qrcode";
import cors from 'cors'


dotenv.config();
const app = express();

const publicDir = path.join(__dirname, "public");
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);

app.use(express.json());
app.use(express.static(publicDir));

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





app.get("/generateQR", async (req, res) => {
  try {
const data = `
Name: John Doe
Email: john@example.com
Post: Marketing Manager
Profile Picture: https://yourdomain.com/images/john.jpg
    `;

    const filePath = path.join(publicDir, "profileQR.png");

    // generate QR code image
    await QRCode.toFile(filePath, data);

    // return public link
    const imageUrl = `https://angelone-7kss.onrender.com/profileQR.png`;
    res.json({ success: true, url: imageUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to generate QR" });
  }
});

app.get("/",(req,res)=>{
  res.send("welcome to server")
})



const data = `
Name: John Doe
Email: john@example.com
Post: Marketing Manager
Profile Picture: https://yourdomain.com/images/john.jpg
`;

QRCode.toFile("profileQR.png", data, (err) => {
  if (err) throw err;
  console.log("QR Code created!");
});


// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
