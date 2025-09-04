import Profile from "../models/profile.js";

// Create Profile
export const createProfile = async (req, res) => {
  try {
    const profile = new Profile(req.body);
    await profile.save();
    res.status(201).json({ success: true, data: profile });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get All Profiles
export const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.status(200).json({ success: true, data: profiles });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Single Profile by ID
export const getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ success: false, message: "Profile not found" });
    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Profile
export const updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!profile) return res.status(404).json({ success: false, message: "Profile not found" });
    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete Profile
export const deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findByIdAndDelete(req.params.id);
    if (!profile) return res.status(404).json({ success: false, message: "Profile not found" });
    res.status(200).json({ success: true, message: "Profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
