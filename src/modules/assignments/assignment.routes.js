// src/modules/assignments/assignment.routes.js
import { Router } from "express";
import { assignmentController } from "./assignment.controller.js";
import { authMiddleware, requireRole } from "../../core/auth.js";

export const assignmentRouter = Router();

assignmentRouter.use(authMiddleware);

// Docente
assignmentRouter.post(
  "/course/:courseId",
  requireRole("TEACHER"),
  assignmentController.create
);
assignmentRouter.get("/course/:courseId", assignmentController.listByCourse);
assignmentRouter.get(
  "/:assignmentId/submissions",
  requireRole("TEACHER"),
  assignmentController.listSubmissions
);
assignmentRouter.post(
  "/submissions/:submissionId/grade",
  requireRole("TEACHER"),
  assignmentController.grade
);

// Estudiante
assignmentRouter.post(
  "/:assignmentId/submit",
  requireRole("STUDENT"),
  assignmentController.submit
);
