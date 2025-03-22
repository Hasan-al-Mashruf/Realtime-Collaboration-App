import User from "../models/userModel.js";
import userServices from "../services/userServices.js";
import createError from "../utils/createError.js";

export const registerUser = async (req, res, next) => {
  try {
    const newUser = await userServices.registerUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    next(createError(error.message, 400));
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const newUser = await userServices.loginUser(req.body);
    req.session.regenerate(function (err) {
      if (err) next(err);
      req.session.user = newUser;
      req.session.save(function (err) {
        if (err) return next(err);
        res.status(201).json(newUser);
      });
    });
  } catch (error) {
    next(createError(error.message, 400));
  }
};

export const logoutUser = (req, res, next) => {
  try {
    // Destroy the session on logout
    req.session.destroy((err) => {
      if (err) {
        return next(createError("Failed to destroy session", 500));
      }
      res.status(200).json({ message: "Logged out successfully" });
    });
  } catch (error) {
    next(createError(error.message, 400));
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(createError(error.message, 400));
  }
};

const userController = {
  registerUser,
  loginUser,
  logoutUser,
  getUsers,
};
export default userController;
