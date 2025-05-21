import express from "express";
import { getTodos } from "../controllers/todoController.js";

export const todoRouter = express.Router();

todoRouter.post("/", getTodos);
