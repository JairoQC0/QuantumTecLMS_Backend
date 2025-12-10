import { cursoServicio } from "./curso.servicio.js";
import { respuestaExitosa, respuestaError } from "../../core/respuestas.js";

export const cursoControlador = {
  async listar(req, res) {
    try {
      const cursos = await cursoServicio.listar();
      return respuestaExitosa(res, 200, "Lista de cursos", cursos);
    } catch (error) {
      console.error("ERROR CONTROLADO:", error);
      return respuestaError(
        res,
        500,
        "Error al listar cursos",
        error.message || String(error)
      );
    }
  },

  async listarPorDocente(req, res) {
    try {
      const docenteId = Number(req.query.docenteId);
      if (!docenteId) {
        return respuestaError(res, 400, "El docenteId es obligatorio");
      }

      const cursos = await cursoServicio.listarPorDocente(docenteId);
      return respuestaExitosa(res, 200, "Cursos del docente", cursos);
    } catch (error) {
      console.error("ERROR CONTROLADO:", error);
      return respuestaError(
        res,
        500,
        "Error al listar cursos del docente",
        error.message || String(error)
      );
    }
  },

  async obtenerPorId(req, res) {
    try {
      const id = Number(req.params.id);
      const curso = await cursoServicio.obtenerPorId(id);

      if (!curso) {
        return respuestaError(res, 404, "Curso no encontrado");
      }

      return respuestaExitosa(res, 200, "Curso obtenido", curso);
    } catch (error) {
      console.error("ERROR CONTROLADO:", error);
      return respuestaError(
        res,
        500,
        "Error al obtener curso",
        error.message || String(error)
      );
    }
  },

  async crear(req, res) {
    try {
      const { titulo, descripcion, docenteId, activo } = req.body;

      if (!titulo) {
        return respuestaError(res, 400, "El título es obligatorio");
      }

      if (!docenteId) {
        return respuestaError(
          res,
          400,
          "El docenteId es obligatorio para crear el curso"
        );
      }

      const curso = await cursoServicio.crear({
        titulo,
        descripcion,
        docenteId: Number(docenteId),
        activo: typeof activo === "boolean" ? activo : true,
      });

      return respuestaExitosa(res, 201, "Curso creado correctamente", curso);
    } catch (error) {
      console.error("ERROR CONTROLADO:", error);
      return respuestaError(
        res,
        500,
        "Error al crear curso",
        error.message || String(error)
      );
    }
  },

  async actualizar(req, res) {
    try {
      const id = Number(req.params.id);
      const { titulo, descripcion, activo, docenteId } = req.body;

      const curso = await cursoServicio.actualizar(id, {
        titulo,
        descripcion,
        activo,
        docenteId,
      });

      return respuestaExitosa(
        res,
        200,
        "Curso actualizado correctamente",
        curso
      );
    } catch (error) {
      console.error("ERROR CONTROLADO:", error);
      return respuestaError(
        res,
        500,
        "Error al actualizar curso",
        error.message || String(error)
      );
    }
  },

  async eliminar(req, res) {
    try {
      const id = Number(req.params.id);
      await cursoServicio.eliminar(id);
      return respuestaExitosa(res, 200, "Curso eliminado correctamente");
    } catch (error) {
      console.error("ERROR CONTROLADO:", error);
      return respuestaError(
        res,
        500,
        "Error al eliminar curso",
        error.message || String(error)
      );
    }
  },
};
