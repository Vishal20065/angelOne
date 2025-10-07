// import User from "../models/User.js";
// import sendEmail from "../middleware/sendEmail.js";
// import jwt from "jsonwebtoken";
// import sendVerificationEmail from "../utils/sendEmail.js";
// import crypto from "crypto";

// // Register
// export const registerUser = async (req, res) => {
//   try {
//     const { name, email, phone, password } = req.body;
//     // const verificationToken = crypto.randomBytes(32).toString("hex");    

//     const user = new User({ name, email, phone, password});
//     await user.save();

//     // Send welcome email
//     //  await sendVerificationEmail(email,verificationToken);

//     res.status(201).json({ success: true, message: "User registered", user });
//   } catch (err) {
//     res.status(400).json({ success: false, message: err.message });
//   }
// };

// // Login


// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find user
//     const user = await User.findOne({ email });

//     // Check credentials (you’re not hashing passwords, so compare directly)
//     if (!user || user.password !== password) {
//       return res
//         .status(401)
//         .json({ success: false, message: "Invalid credentials" });
//     }

//     // Create JWT payload
//     const payload = { id: user._id, email: user.email };

//     // Sign token
//     const token = jwt.sign(payload, process.env.JWT_SECRET, {
//       expiresIn: "1d"
//     });

//     res.status(200).json({
//       success: true,
//       message: "Login successful",
//       token, // send token to frontend
//       user,
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };


// // Logout
// export const logoutUser = async (req, res) => {
//   try {
//     // Since no JWT/session, just return response
//     res.status(200).json({ success: true, message: "Logged out successfully" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };


// export const verifyEmail = async (req, res) => {
//   const { token } = req.query;

//   try {
//     const user = await User.findOne({ verificationToken: token });

//     if (!user) {
//       return res.status(400).send({ message: "Invalid or expired token" });
//     }

//     user.isVerified = true;
//     user.verificationToken = undefined;
//     await user.save();

//     // res.status(200).json({ message: "Email verified successfully" });
//     return res.redirect(`${process.env.CLIENT_URL}`);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };







import User from "../models/User.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

// Register
export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const user = new User({ name, email, phone, password });
    await user.save();

    res.status(201).json({ success: true, message: "User registered", user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Login (single-session enforced)
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    user.session = true;

    await user.save();

    const payload = { id: user._id, email: user.email };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

    // ✅ Overwrite old token with new one
    user.activeToken = token;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export const UserByEmail = async (req, res) => {
  try {
    const { email, } = req.body;
    const user = await User.findOne({ email });
    res.status(200).json({
      success: true,
      message: "Login successful",
      user,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Logout
// export const logoutUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.params._id);

//     if (user) {
//       user.activeToken = null;
//       user.session = false;
//       await user.save();
//     }
//     res.status(200).json({ success: true, message: "Logged out successfully" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };


export const logoutUser = async (req, res) => {
  try {
    const { id } = req.params;   // ✅ get id from params

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.activeToken = null;
    user.session = false;
    await user.save();

    return res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};


// Verify Email
export const verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).send({ message: "Invalid or expired token" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    return res.redirect(`${process.env.CLIENT_URL}`);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
