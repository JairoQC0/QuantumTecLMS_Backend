// src/modules/auth/auth.routes.js
import { Router } from "express";
import { authController } from "./auth.controller.js";
import { authMiddleware } from "../../core/auth.js";

export const authRouter = Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.get("/me", authMiddleware, authController.me);
