import { Router } from "express";
import TaskController from "../controllers/task.controller";

const router = Router();

router.get("/", TaskController.getTasks);
router.get("/:id", TaskController.getTaskById);
router.post("/", TaskController.createTask);
router.put("/:id", TaskController.updateTask);
router.delete("/:id", TaskController.deleteTask);

router.patch("/status/:id", TaskController.updateStatus);
router.patch("/priority/:id", TaskController.updatePriority);

export default router;
