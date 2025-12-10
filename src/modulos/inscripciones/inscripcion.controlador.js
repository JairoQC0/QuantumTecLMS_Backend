import { inscripcionServicio } from "./inscripcion.servicio.js";
import { respuestaExitosa } from "../../core/respuestas.js";

export const inscripcionControlador = {
  inscribirse: async (req, res, next) => {
    try {
      const data = await inscripcionServicio.inscribirse(
        req.usuarioActual.id,
        req.body.cursoId
      );
      return respuestaExitosa(res, data, "Inscripción exitosa", 201);
    } catch (err) {
      next(err);
    }
  },

  misInscripciones: async (req, res, next) => {
    try {
      const data = await inscripcionServicio.listarMisInscripciones(
        req.usuarioActual.id
      );
      return respuestaExitosa(res, data);
    } catch (err) {
      next(err);
    }
  },

  inscritosDelCurso: async (req, res, next) => {
    try {
      const data = await inscripcionServicio.listarInscritos(
        parseInt(req.params.cursoId)
      );
      return respuestaExitosa(res, data);
    } catch (err) {
      next(err);
    }
  },

  eliminar: async (req, res, next) => {
    try {
      await inscripcionServicio.eliminar(parseInt(req.params.id));
      return respuestaExitosa(res, null, "Inscripción eliminada");
    } catch (err) {
      next(err);
    }
  },
};
