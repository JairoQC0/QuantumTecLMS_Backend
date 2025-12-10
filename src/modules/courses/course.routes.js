// src/modules/courses/course.routes.js
import { Router } from "express";
import { courseController } from "./course.controller.js";
import { authMiddleware, requireRole } from "../../core/auth.js";

export const courseRouter = Router();

// Público: catálogo
courseRouter.get("/public", courseController.listPublic);

// Protegido
courseRouter.use(authMiddleware);

// Docente: CRUD
courseRouter.get("/mine", requireRole("TEACHER"), courseController.listMine);
courseRouter.post("/", requireRole("TEACHER"), courseController.create);
courseRouter.put("/:id", requireRole("TEACHER"), courseController.update);
courseRouter.delete("/:id", requireRole("TEACHER"), courseController.remove);

// Cualquiera autenticado puede ver el detalle
courseRouter.get("/:id", courseController.getById);
