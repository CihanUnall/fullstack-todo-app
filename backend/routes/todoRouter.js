import express from "express";
import { getTodos } from "../controllers/todoController.js";
import { addTodo } from "../controllers/todoController.js";
import { updateTodo } from "../controllers/todoController.js";
import { deleteTodo } from "../controllers/todoController.js";

export const todoRouter = express.Router();

todoRouter.get("/todos", getTodos);

// Add a new todo
todoRouter.post("/add", addTodo);

// Update a todo (state)
todoRouter.put("/:userID", updateTodo);

// Delete a todo
todoRouter.delete("/:userID", deleteTodo);
