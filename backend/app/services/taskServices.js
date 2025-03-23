import Task from "../models/taskModel.js";
import User from "../models/userModel.js";

const createTask = async (payload, userId) => {
  const existingUser = await User.findById(userId);
  if (!existingUser) throw new Error("User not found");

  // Create the task
  const task = await Task.create({ ...payload, user: userId });

  return task;
};

const getTasks = async () => {
  return await Task.find().populate("user");
};

const getTaskByUserId = async (taskId, userId) => {
  const existingUser = await User.findById(userId);
  if (!existingUser) throw new Error("User not found");

  // Find the task that belongs to the user
  const task = await Task.findOne({ _id: taskId, user: userId }).populate(
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
  getTaskByUserId,
  updateTask,
  deleteTask,
};
export default taskServices;
