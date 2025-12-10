import { cursoServicio } from "./curso.servicio.js";
import { respuestaExitosa } from "../../core/respuestas.js";

export const cursoControlador = {
  listarTodos: async (req, res, next) => {
    try {
      const data = await cursoServicio.listarTodos();
      return respuestaExitosa(res, data);
    } catch (err) {
      next(err);
    }
  },

  listarMisCursos: async (req, res, next) => {
    try {
      const data = await cursoServicio.listarPorDocente(req.usuarioActual.id);
      return respuestaExitosa(res, data);
    } catch (err) {
      next(err);
    }
  },

  listarCursosDisponibles: async (req, res, next) => {
    try {
      const data = await cursoServicio.listarDisponibles(req.usuarioActual.id);
      return respuestaExitosa(res, data);
    } catch (err) {
      next(err);
    }
  },

  crear: async (req, res, next) => {
    try {
      const payload = {
        titulo: req.body.titulo,
        descripcion: req.body.descripcion || "",
        docenteId: Number(req.body.docenteId),
      };

      const data = await cursoServicio.crear(payload);
      return respuestaExitosa(res, data, "Curso creado", 201);
    } catch (err) {
      next(err);
    }
  },

  actualizar: async (req, res, next) => {
    try {
      const payload = {
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        docenteId: Number(req.body.docenteId),
        activo: req.body.activo ?? undefined,
      };

      const data = await cursoServicio.actualizar(
        Number(req.params.id),
        payload
      );
      return respuestaExitosa(res, data, "Curso actualizado");
    } catch (err) {
      next(err);
    }
  },

  eliminar: async (req, res, next) => {
    try {
      await cursoServicio.eliminar(Number(req.params.id));
      return respuestaExitosa(res, null, "Curso eliminado");
    } catch (err) {
      next(err);
    }
  },
};
