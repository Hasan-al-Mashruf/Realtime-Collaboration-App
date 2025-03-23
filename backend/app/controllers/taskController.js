import taskServices from "../services/taskServices.js";
import createError from "../utils/createError.js";

export const createTask = async (req, res, next) => {
  try {
    const task = await taskServices.createTask(req.body, req.session.user);
    res.status(201).json(task);
  } catch (error) {
    next(createError(error.message, 400));
  }
};

export const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await taskServices.getTasks();
    res.status(200).json(tasks);
  } catch (error) {
    next(createError(error.message, 500));
  }
};

export const getTask = async (req, res, next) => {
  try {
    const task = await taskServices.getTaskById(req.params.id);
    if (!task) return next(createError("Task not found", 404));
    res.status(200).json(task);
  } catch (error) {
    next(createError(error.message, 400));
  }
};

export const getTaskByUserId = async (req, res, next) => {
  try {
    const task = await taskServices.getTaskByUserId(
      req.params.id,
      req.session.user
    );
    if (!task) return next(createError("Task not found", 404));
    res.status(200).json(task);
  } catch (error) {
    next(createError(error.message, 400));
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const updatedTask = await taskServices.updateTask(req.params.id, req.body);
    if (!updatedTask) return next(createError("Task not found", 404));
    res.status(200).json(updatedTask);
  } catch (error) {
    next(createError(error.message, 400));
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const deletedTask = await taskServices.deleteTask(req.params.id);
    if (!deletedTask) return next(createError("Task not found", 404));
    res.status(200).json({ context: "Task deleted successfully" });
  } catch (error) {
    next(createError(error.message, 400));
  }
};

const taskController = {
  createTask,
  getAllTasks,
  getTask,
  getTaskByUserId,
  updateTask,
  deleteTask,
};

export default taskController;
