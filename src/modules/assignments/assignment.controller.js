// src/modules/assignments/assignment.controller.js
import { ok } from "../../core/respuestas.js";
import { businessError } from "../../core/businessError.js";
import { assignmentService } from "./assignment.service.js";

export const assignmentController = {
  // Docente: crear tarea
  // POST /api/assignments/course/:courseId
  async create(req, res, next) {
    try {
      const courseId = Number(req.params.courseId);
      if (Number.isNaN(courseId)) throw businessError("ID inválido");
      if (!req.body.title) throw businessError("title es obligatorio");

      const assignment = await assignmentService.create(
        courseId,
        req.currentUser.id,
        req.body
      );
      return ok(res, assignment, "Tarea creada", 201);
    } catch (error) {
      next(error);
    }
  },

  // GET /api/assignments/course/:courseId
  async listByCourse(req, res, next) {
    try {
      const courseId = Number(req.params.courseId);
      if (Number.isNaN(courseId)) throw businessError("ID inválido");

      const list = await assignmentService.listByCourse(courseId);
      return ok(res, list, "Tareas del curso");
    } catch (error) {
      next(error);
    }
  },

  // Estudiante: enviar entrega
  // POST /api/assignments/:assignmentId/submit
  async submit(req, res, next) {
    try {
      const assignmentId = Number(req.params.assignmentId);
      if (Number.isNaN(assignmentId)) throw businessError("ID inválido");

      const submission = await assignmentService.submit(
        assignmentId,
        req.currentUser.id,
        req.body
      );
      return ok(res, submission, "Entrega registrada");
    } catch (error) {
      next(error);
    }
  },

  // Docente: ver entregas
  // GET /api/assignments/:assignmentId/submissions
  async listSubmissions(req, res, next) {
    try {
      const assignmentId = Number(req.params.assignmentId);
      if (Number.isNaN(assignmentId)) throw businessError("ID inválido");

      const list = await assignmentService.listSubmissions(
        assignmentId,
        req.currentUser.id
      );
      return ok(res, list, "Entregas de la tarea");
    } catch (error) {
      next(error);
    }
  },

  // Docente: calificar
  // POST /api/assignments/submissions/:submissionId/grade
  async grade(req, res, next) {
    try {
      const submissionId = Number(req.params.submissionId);
      if (Number.isNaN(submissionId)) throw businessError("ID inválido");

      const { grade } = req.body;
      if (grade == null) throw businessError("grade es obligatorio");

      const updated = await assignmentService.grade(
        submissionId,
        req.currentUser.id,
        Number(grade)
      );
      return ok(res, updated, "Entrega calificada");
    } catch (error) {
      next(error);
    }
  },
};
