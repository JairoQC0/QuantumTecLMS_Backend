// src/modules/content/content.controller.js
import { ok } from "../../core/respuestas.js";
import { businessError } from "../../core/businessError.js";
import { contentService } from "./content.service.js";

export const contentController = {
  // GET /api/content/course/:courseId/modules
  async listModules(req, res, next) {
    try {
      const courseId = Number(req.params.courseId);
      if (Number.isNaN(courseId)) throw businessError("ID inválido");

      const modules = await contentService.listModules(courseId);
      return ok(res, modules, "Módulos listados");
    } catch (error) {
      next(error);
    }
  },

  // POST /api/content/course/:courseId/modules
  async addModule(req, res, next) {
    try {
      const courseId = Number(req.params.courseId);
      if (Number.isNaN(courseId)) throw businessError("ID inválido");
      if (!req.body.title) throw businessError("title es obligatorio");

      const module = await contentService.addModule(
        courseId,
        req.currentUser.id,
        req.body
      );
      return ok(res, module, "Módulo creado", 201);
    } catch (error) {
      next(error);
    }
  },

  // POST /api/content/modules/:moduleId/lessons
  async addLesson(req, res, next) {
    try {
      const moduleId = Number(req.params.moduleId);
      if (Number.isNaN(moduleId)) throw businessError("ID inválido");
      if (!req.body.title) throw businessError("title es obligatorio");

      const lesson = await contentService.addLesson(
        moduleId,
        req.currentUser.id,
        req.body
      );
      return ok(res, lesson, "Lección creada", 201);
    } catch (error) {
      next(error);
    }
  },
};
