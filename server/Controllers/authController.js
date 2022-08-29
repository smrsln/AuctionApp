import User from "../models/userModel.js";
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
  const { email, password } = req.body;
  // console.log("req: " + JSON.stringify(req.body));

  try {
    //Creating hashedPassword with 12 characters Salt
    const hashedPassword = await bcrypt.hash(password, 12);
    // console.log("hashedPassword: " + hashedPassword);
    //Created User info
    const result = await User.create({
      email,
      hash: hashedPassword,
    });
    // console.log("result: " + result);
    //Created JWT
    const token = createJWT(result.email, result._id);
    // console.log("token: " + token);

    res.status(201).json({ result, token });
  } catch (error) {
    // console.log("err: " + error);
    res.status(500).json({ message: error });

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
