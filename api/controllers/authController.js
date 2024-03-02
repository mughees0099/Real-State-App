import User from "../models/user.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
export const Signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const user = new User({
    username: username,
    email: email,
    password: hashedPassword,
  });
  try {
    await user.save();
    res.status(201).json("User created successfully");
    return;
  } catch (err) {
    next(err);
  }
};

export const Signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      email,
    });
    if (!user) {
      next(errorHandler(404, "User not found!"));
      return;
    }
    const isPasswordValid = bcryptjs.compareSync(password, user.password);
    if (!isPasswordValid) {
      next(errorHandler(401, "Wrong Credentials!"));
      return;
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password: userPassword, ...others } = user._doc;
    res
      .cookie("token", token, {
        httpOnly: true,
        // sameSite: "None",
        // secure: true,
        expires: new Date(Date.now() + 60 * 60 * 1000),
      })
      .status(200)
      .json(others);
    return;
  } catch (err) {
    next(err);
  }
};
