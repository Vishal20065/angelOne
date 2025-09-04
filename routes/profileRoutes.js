import express from "express";
import {
  createProfile,
  getProfiles,
  getProfileById,
  updateProfile,
  deleteProfile,
} from "../controllers/profileController.js";

const router = express.Router();

router.post("/create", createProfile);        // Create
router.get("/get", getProfiles);           // Read All
router.get("/getOne/:id", getProfileById);     // Read One
router.put("/update/:id", updateProfile);      // Update
router.delete("/dalete/:id", deleteProfile);   // Delete

export default router;
