import User from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createJWT = (email, id) => {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      id,
      email,
    },
    process.env.SECRET,
    {
      expiresIn: parseInt(exp.getTime() / 1000),
    }
  );
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    //Creating hashedPassword with 24 characters Salt
    const hashedPassword = await bcrypt.hash(password, 24);
    //Created User info
    const result = await User.create({
      email,
      hash: hashedPassword,
    });
    //Created JWT
    const token = createJWT(result.email, result._id);

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await User.findOne({ email });

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.hash);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = createJWT(oldUser.email, oldUser._id);

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
