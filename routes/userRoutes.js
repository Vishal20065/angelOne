// import express from "express";
// import { registerUser, loginUser, logoutUser, verifyEmail } from "../controllers/userController.js";

// const router = express.Router();

// router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.post("/logout", logoutUser);
// router.get("/verify-email", verifyEmail);

// export default router;



import express from "express";
import { registerUser, loginUser, logoutUser, verifyEmail ,UserByEmail} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);
router.post("/UserByEmail", UserByEmail);

// Logout (protected route)
router.get("/logout/:id",logoutUser);

// Verify Email
router.get("/verify-email", verifyEmail);

export default router;
