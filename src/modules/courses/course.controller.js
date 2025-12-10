// src/modules/courses/course.controller.js
import { ok } from "../../core/respuestas.js";
import { businessError } from "../../core/businessError.js";
import { courseService } from "./course.service.js";

export const courseController = {
  // GET /api/courses/public
  async listPublic(req, res, next) {
    try {
      const courses = await courseService.listPublic();
      return ok(res, courses, "Cursos publicados");
    } catch (error) {
      next(error);
    }
  },

  // GET /api/courses/mine (docente)
  async listMine(req, res, next) {
    try {
      const courses = await courseService.listByTeacher(req.currentUser.id);
      return ok(res, courses, "Cursos del docente");
    } catch (error) {
      next(error);
    }
  },

  // GET /api/courses/:id
  async getById(req, res, next) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) throw businessError("ID inválido");

      const course = await courseService.getById(id);
      return ok(res, course, "Curso obtenido");
    } catch (error) {
      next(error);
    }
  },

  // POST /api/courses
  async create(req, res, next) {
    try {
      const { title } = req.body;
      if (!title) throw businessError("title es obligatorio");

      const course = await courseService.create(req.body, req.currentUser.id);
      return ok(res, course, "Curso creado", 201);
    } catch (error) {
      next(error);
    }
  },

  // PUT /api/courses/:id
  async update(req, res, next) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) throw businessError("ID inválido");

      const course = await courseService.update(
        id,
        req.currentUser.id,
        req.body
      );
      return ok(res, course, "Curso actualizado");
    } catch (error) {
      next(error);
    }
  },

  // DELETE /api/courses/:id
  async remove(req, res, next) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) throw businessError("ID inválido");

      await courseService.remove(id, req.currentUser.id);
      return ok(res, null, "Curso eliminado");
    } catch (error) {
      next(error);
    }
  },
};
