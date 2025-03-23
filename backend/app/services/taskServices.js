import Task from "../models/taskModel.js";

const createTask = async (payload) => {
  return await Task.create(payload);
};

const getTasks = async () => {
  return await Task.find();
};

const getTaskById = async (id) => {
  return await Task.findById(id);
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
  updateTask,
  deleteTask,
};
export default taskServices;
