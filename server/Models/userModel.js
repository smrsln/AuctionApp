import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      //lowercase: true,
      //required: [true, "can't be blank"],
      match: [/^[a-zA-Z]+$/, "is invalid"],
      //index: true,
      //unique: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      index: true,
      unique: true,
    },
    image: String,
    hash: String,
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
export default User;
