import express from "express";
import taskController from "../controllers/taskController.js";
import checkSession from "../middleware/checkSession.js";

const router = express.Router();

router.post("/create", checkSession, taskController.createTask);
router.get("/", checkSession, taskController.getAllTasks);
router.get("/:id", checkSession, taskController.getTask);
router.get("/user/:id", checkSession, taskController.getTaskByUserId);
router.put("/:id", checkSession, taskController.updateTask);
router.delete("/:id", checkSession, taskController.deleteTask);

export default router;
