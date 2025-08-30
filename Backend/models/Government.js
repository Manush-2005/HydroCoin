import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken"; // ✅ Add this

dotenv.config();

const locationSchema = new mongoose.Schema({
  lat: {
    type: Number,
    required: true,
  },
  lon: {
    type: Number,
    required: true,
  },
});

let governmentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  location: {
    type: locationSchema,
    required: true,
  },
  walletId: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["central", "state", "local"],
    default: "local",
  },

  pendingProductions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Production",
      default: [],
    },
  ],
  approvedProductions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Production",
      default: [],
    },
  ],
});

//Secure the password with bcrypt
governmentSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    next();
  }

  try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, saltRound);
    user.password = hash_password;
  } catch (error) {
    next(error);
  }
});

//compare the password

governmentSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

//create json web token

governmentSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        role: this.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
  } catch (error) {
    console.error(error);
  }
};

const Government = mongoose.model("Government", governmentSchema);
export default Government;
