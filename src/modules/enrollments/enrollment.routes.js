// src/modules/enrollments/enrollment.routes.js
import { Router } from "express";
import { enrollmentController } from "./enrollment.controller.js";
import { authMiddleware, requireRole } from "../../core/auth.js";

export const enrollmentRouter = Router();

enrollmentRouter.use(authMiddleware);

// Estudiante
enrollmentRouter.post(
  "/request",
  requireRole("STUDENT"),
  enrollmentController.request
);
enrollmentRouter.get(
  "/mine",
  requireRole("STUDENT"),
  enrollmentController.myEnrollments
);

// Docente
enrollmentRouter.get(
  "/course/:courseId/requests",
  requireRole("TEACHER"),
  enrollmentController.courseRequests
);

enrollmentRouter.post(
  "/:id/approve",
  requireRole("TEACHER"),
  enrollmentController.approve
);

enrollmentRouter.post(
  "/:id/reject",
  requireRole("TEACHER"),
  enrollmentController.reject
);
