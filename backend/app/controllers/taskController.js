import redis from "../../redis.js";
import taskServices from "../services/taskServices.js";
import createError from "../utils/createError.js";
import updateCache from "../utils/updateCache.js";

export const createTask = async (req, res, next) => {
  const user = req.session.user;
  try {
    const task = await taskServices.createTask(req.body, user._id);
    await redis.del("tasks");
    res.status(201).json(task);
  } catch (error) {
    next(createError(error.message, 400));
  }
};

export const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await taskServices.getTasks();
    await updateCache("tasks", tasks);
    res.status(200).json(tasks);
  } catch (error) {
    next(createError(error.message, 500));
  }
};

export const getTaskByUserId = async (req, res, next) => {
  const user = req.session.user;
  try {
    const task = await taskServices.getTaskByUserId(req.params.id, user._id);
    if (!task) return next(createError("Task not found", 404));
    const cacheKey = `task:${req.params.id}`;
    updateCache(cacheKey, task);
    res.status(200).json(task);
  } catch (error) {
    next(createError(error.message, 400));
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const updatedTask = await taskServices.updateTask(req.params.id, req.body);
    if (!updatedTask) return next(createError("Task not found", 404));
    const cacheKey = `task:${req.params.id}`;
    await redis.del(cacheKey);
    await redis.del("tasks");
    res.status(200).json(updatedTask);
  } catch (error) {
    next(createError(error.message, 400));
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const deletedTask = await taskServices.deleteTask(req.params.id);
    if (!deletedTask) return next(createError("Task not found", 404));
    const cacheKey = `task:${req.params.id}`;
    await redis.del(cacheKey);
    await redis.del("tasks");
    res.status(200).json({ context: "Task deleted successfully" });
  } catch (error) {
    next(createError(error.message, 400));
  }
};

const taskController = {
  createTask,
  getAllTasks,
  getTaskByUserId,
  updateTask,
  deleteTask,
};

export default taskController;
