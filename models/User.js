// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true,unique: true},
//   phone: { type: String },
//   password: { type: String, required: true }, // plain text password

//    isVerified: {
//       type: Boolean,
//       default: false,
//     },
    
//   role: {
//   type: String,
//   enum: ["user", "admin"],
//   default: "user",
// },


//     verificationToken: {
//       type:String,
      
//     },
// },
//   { timestamps: true }
// );

// export default mongoose.model("User", userSchema);



import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    password: { type: String, required: true }, // ⚠️ plain text (better to hash later)

    isVerified: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    verificationToken: { type: String },

    session:{
      type:Boolean,
      default:false
    },


    // ✅ Track currently active login token
    activeToken: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);

