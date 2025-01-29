import express from "express";
import TaskController from "../controllers/task.controller";
import verifyToken from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/create", verifyToken, TaskController.createTask);
router.get("/allTasks", verifyToken, TaskController.getAllTasks);
router.post("/update/:id", verifyToken, TaskController.Taskstatus);
router.delete("/delete/:id", verifyToken, TaskController.deleteTask);



export default router