import Task from "../models/taskModel.js";
import User from "../models/userModel.js";

const createTask = async (payload, user) => {
  const existingUser = await User.findById(user._id);
  if (!existingUser) throw new Error("User not found");

  // Create the task
  const task = await Task.create({ ...payload, user });

  return task;
};

const getTasks = async () => {
  return await Task.find().populate("user");
};

const getTaskById = async (id) => {
  return await Task.findById(id);
};

const getTaskByUserId = async (taskId, user) => {
  const existingUser = await User.findById(user._id);
  if (!existingUser) throw new Error("User not found");

  // Find the task that belongs to the user
  const task = await Task.findOne({ _id: taskId, user: user._id }).populate(
    "user"
  );
  if (!task) throw new Error("Task not found ");
  return task;
};

const updateTask = async (id, data) => {
  return await Task.findByIdAndUpdate(id, data, { new: true });
};

const deleteTask = async (id) => {
  return await Task.findByIdAndDelete(id);
};

const taskServices = {
  createTask,
  getTasks,
  getTaskById,
  getTaskByUserId,
  updateTask,
  deleteTask,
};
export default taskServices;
