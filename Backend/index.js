
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import TodoModel from "./models/Todo.js";


const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPath = path.resolve(__dirname, "../Frontend/dist");
dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

app.use(cors());
app.use(express.json());

// Create a task
app.post("/add", async (req, res) => {
  try {
    const { task } = req.body;

    if (!task?.trim()) {
      return res.status(400).json({ message: "Task is required" });
    }

    const result = await TodoModel.create({ task: task.trim() });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: "Failed to create task" });
  }
});

// Get all tasks
app.get("/get", async (req, res) => {
  try {
    const result = await TodoModel.find();
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
});

// Toggle task completion
app.put("/edit/:id", async (req, res) => {
  try {
    const todo = await TodoModel.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "Task not found" });
    }

    todo.done = !todo.done;
    await todo.save();

    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: "Failed to update task status" });
  }
});

// Update task text
app.put("/update/:id", async (req, res) => {
  try {
    const { task } = req.body;

    if (!task?.trim()) {
      return res.status(400).json({ message: "Task is required" });
    }

    const result = await TodoModel.findByIdAndUpdate(
      req.params.id,
      { task: task.trim() },
      { new: true, runValidators: true }
    );

    if (!result) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Failed to update task" });
  }
});

// Delete a task
app.delete("/delete/:id", async (req, res) => {
  try {
    const result = await TodoModel.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Failed to delete task" });
  }
});

// Serve the built React frontend
app.use(express.static(frontendPath));

// React app fallback for client-side routes
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Start only after MongoDB connects
async function startServer() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from environment variables");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server listening on port: ${PORT}`);
    });
  } catch (err) {
    console.error("Server startup failed:", err.message);
    process.exit(1);
  }
}

startServer();
