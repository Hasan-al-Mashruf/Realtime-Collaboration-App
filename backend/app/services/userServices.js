import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

const registerUser = async (payload) => {
  const { name, email, password } = payload;
  const hashedPassword = bcrypt.hashSync(
    password,
    Number(process.env.BCRYPTROUND)
  );
  const newUser = await User.create({ name, email, password: hashedPassword });
  return newUser;
};

const loginUser = async (payload) => {
  const { email, password } = payload;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (isPasswordValid) {
    return user;
  } else {
    throw new Error("Invalid credentials");
  }
};

const userServices = { registerUser, loginUser };
export default userServices;
