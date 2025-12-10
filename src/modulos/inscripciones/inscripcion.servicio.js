import { inscripcionRepositorio } from "./inscripcion.repositorio.js";
import { cursoRepositorio } from "../cursos/curso.repositorio.js";

export const inscripcionServicio = {
  async inscribirse(usuarioId, cursoId) {
    const curso = await cursoRepositorio.listarTodos();
    const existe = await inscripcionRepositorio.buscar(usuarioId, cursoId);

    if (existe) {
      const err = new Error("Ya estás inscrito en este curso");
      err.tipo = "VALIDACION";
      throw err;
    }

    return inscripcionRepositorio.crear(usuarioId, cursoId);
  },

  listarMisInscripciones(usuarioId) {
    return inscripcionRepositorio.listarDeUsuario(usuarioId);
  },

  listarInscritos(cursoId) {
    return inscripcionRepositorio.listarDeCurso(cursoId);
  },

  eliminar(id) {
    return inscripcionRepositorio.eliminar(id);
  },
};
