import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { createTokenForUser } from "../utils/authentication.js";

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageURL: {
      type: String,
      default: "/images/defaultAvatar.svg.webp",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  const salt = 10;
  const hashedPassword = await bcrypt.hash(user.password, salt);
  this.password = hashedPassword;
  next();
});

userSchema.static("matchPasswordAndGenerateToken", async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error("user not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    throw new Error("invalid password");

  const token = createTokenForUser(user);
  console.log(token);
  return token;
});

const user = mongoose.model("user", userSchema);

export default user;
