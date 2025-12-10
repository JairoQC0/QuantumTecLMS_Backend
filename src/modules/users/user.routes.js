// src/modules/users/user.routes.js
import { Router } from "express";
import { userController } from "./user.controller.js";
import { authMiddleware, requireRole } from "../../core/auth.js";

export const userRouter = Router();

userRouter.use(authMiddleware, requireRole("ADMIN"));

userRouter.get("/", userController.list);
userRouter.get("/:id", userController.getById);
userRouter.put("/:id", userController.update);
userRouter.delete("/:id", userController.remove);
