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
    res.status(201).json(newUser);
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
  getUsers,
};
export default userController;
