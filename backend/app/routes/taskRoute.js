import express from "express";
import taskController from "../controllers/taskController.js";
import checkSession from "../middleware/checkSession.js";
import checkCache from "../middleware/checkCache.js";

const router = express.Router();

router.post("/create", checkSession, taskController.createTask);
router.get("/", checkSession, checkCache("tasks"), taskController.getAllTasks);
router.get(
  "/:id",
  checkSession,
  checkCache("task"),
  taskController.getTaskByUserId
);

router.put("/:id", checkSession, taskController.updateTask);
router.delete("/:id", checkSession, taskController.deleteTask);

export default router;
