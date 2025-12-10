// src/modules/content/content.routes.js
import { Router } from "express";
import { contentController } from "./content.controller.js";
import { authMiddleware, requireRole } from "../../core/auth.js";

export const contentRouter = Router();

contentRouter.use(authMiddleware);

// Estudiantes y docentes: ver módulos
contentRouter.get("/course/:courseId/modules", contentController.listModules);

// Docente: crear módulos y lecciones
contentRouter.post(
  "/course/:courseId/modules",
  requireRole("TEACHER"),
  contentController.addModule
);

contentRouter.post(
  "/modules/:moduleId/lessons",
  requireRole("TEACHER"),
  contentController.addLesson
);
