import { Request, Response } from "express";
import { Task } from "../types/task";

const tasks: Task[] = [
  {
    id: 1,
    title: "Belajar Backend",
    description: "Express.js, dan framework lainnya",
    category: "development",
    status: "pending",
    priority: "high",
  },
  {
    id: 2,
    title: "Belajar Frontend",
    description: "Next.js, shadcn/ui, React, dan tools lainnya",
    category: "development",
    status: "completed",
    priority: "low",
  },
  {
    id: 3,
    title: "Belajar Mobile",
    description: "Flutter dan Dart",
    category: "development",
    status: "pending",
    priority: "medium",
  },
];

export class TaskController {
  getTasks = async (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: "Get all tasks data success",
      data: {
        tasks: tasks,
      },
    });
  };

  getTaskById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const task = tasks.find((task) => task.id === id);

    if (!Number.isInteger(id) || !task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Get task data success",
      data: {
        task: task,
      },
    });
  };

  createTask = async (req: Request, res: Response) => {
    const { title, description, status, priority, category } = req.body;

    if (!title || !description || !status || !priority || !category) {
      return res.status(400).json({
        success: false,
        message:
          "Please input the title, description, category, status, and priority of the task",
      });
    }

    if (status !== "pending" && status !== "completed") {
      return res.status(400).json({
        success: false,
        message: "Task' status must be pending or completed",
      });
    }

    if (priority !== "low" && priority !== "medium" && priority !== "high") {
      return res.status(400).json({
        success: false,
        message: "Task' priority must be low, medium, or high",
      });
    }

    const id =
      tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) + 1 : 1;

    const task: Task = {
      id: id,
      title: title,
      description: description,
      category: category.toLowerCase(),
      status: status,
      priority: priority,
    };

    tasks.push(task);

    return res.status(201).json({
      success: true,
      message: "Task creation success",
      data: {
        task: task,
      },
    });
  };

  updateTask = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { title, description, status, priority, category } = req.body;

    const task = tasks.find((task) => task.id === id);

    if (!Number.isInteger(id) || !task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    if (!title || !description || !status || !priority || !category) {
      return res.status(400).json({
        success: false,
        message:
          "Please input the title, description, category, status and priority of the task",
      });
    }

    if (status !== "pending" && status !== "completed") {
      return res.status(400).json({
        success: false,
        message: "Task' status must be pending or completed",
      });
    }

    if (priority !== "low" && priority !== "medium" && priority !== "high") {
      return res.status(400).json({
        success: false,
        message: "Task' priority must be low, medium, or high",
      });
    }

    task.title = title;
    task.description = description;
    task.category = category.toLowerCase();
    task.status = status;
    task.priority = priority;

    return res.status(200).json({
      success: true,
      message: "Task update success",
      data: {
        task: task,
      },
    });
  };

  deleteTask = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const index = tasks.findIndex((task) => task.id === id);

    if (!Number.isInteger(id) || index === -1) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const deletedTask = tasks.splice(index, 1)[0];

    return res.status(200).json({
      success: true,
      message: "Task deletion success",
      data: {
        task: deletedTask,
      },
    });
  };

  updateStatus = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { status } = req.body;

    const task = tasks.find((task) => task.id === id);

    if (!Number.isInteger(id) || !task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Please input the status of the task",
      });
    }

    if (status !== "pending" && status !== "completed") {
      return res.status(400).json({
        success: false,
        message: "Task' status must be pending or completed",
      });
    }

    task.status = status;

    return res.status(200).json({
      success: true,
      message: "Status update success",
      data: {
        task: task,
      },
    });
  };

  updatePriority = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { priority } = req.body;

    const task = tasks.find((task) => task.id === id);

    if (!Number.isInteger(id) || !task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    if (!priority) {
      return res.status(400).json({
        success: false,
        message: "Please input the priority of the task",
      });
    }

    if (priority !== "low" && priority !== "medium" && priority !== "high") {
      return res.status(400).json({
        success: false,
        message: "Task' priority must be low, medium, or high",
      });
    }

    task.priority = priority;

    return res.status(200).json({
      success: true,
      message: "Priority update success",
      data: {
        task: task,
      },
    });
  };
}

export default new TaskController();
