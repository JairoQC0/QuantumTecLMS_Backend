// src/modules/enrollments/enrollment.controller.js
import { ok } from "../../core/respuestas.js";
import { businessError } from "../../core/businessError.js";
import { enrollmentService } from "./enrollment.service.js";

export const enrollmentController = {
  // POST /api/enrollments/request
  async request(req, res, next) {
    try {
      const { courseId } = req.body;
      if (!courseId) throw businessError("courseId es obligatorio");

      const enrollment = await enrollmentService.requestEnrollment(
        req.currentUser.id,
        Number(courseId)
      );

      return ok(res, enrollment, "Solicitud de inscripción creada", 201);
    } catch (error) {
      next(error);
    }
  },

  // GET /api/enrollments/mine
  async myEnrollments(req, res, next) {
    try {
      const list = await enrollmentService.listMyEnrollments(
        req.currentUser.id
      );
      return ok(res, list, "Cursos inscritos");
    } catch (error) {
      next(error);
    }
  },

  // GET /api/enrollments/course/:courseId/requests
  async courseRequests(req, res, next) {
    try {
      const courseId = Number(req.params.courseId);
      if (Number.isNaN(courseId)) throw businessError("ID inválido");

      const list = await enrollmentService.listCourseRequests(
        req.currentUser.id,
        courseId
      );
      return ok(res, list, "Solicitudes de inscripción");
    } catch (error) {
      next(error);
    }
  },

  // POST /api/enrollments/:id/approve
  async approve(req, res, next) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) throw businessError("ID inválido");

      const updated = await enrollmentService.changeStatus(
        req.currentUser.id,
        id,
        "APPROVED"
      );
      return ok(res, updated, "Inscripción aprobada");
    } catch (error) {
      next(error);
    }
  },

  // POST /api/enrollments/:id/reject
  async reject(req, res, next) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) throw businessError("ID inválido");

      const updated = await enrollmentService.changeStatus(
        req.currentUser.id,
        id,
        "REJECTED"
      );
      return ok(res, updated, "Inscripción rechazada");
    } catch (error) {
      next(error);
    }
  },
};
