import express from "express";
import userController from "../controllers/userController.js";
import checkSession from "../middleware/checkSession.js";

const router = express.Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/logout", userController.logoutUser);
router.get("/", checkSession, userController.getUsers);

export default router;
