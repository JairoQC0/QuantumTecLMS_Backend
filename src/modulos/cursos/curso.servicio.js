import { cursoRepositorio } from "./curso.repositorio.js";

function generarCodigoCurso() {
  return Math.random().toString(16).substring(2, 8).toUpperCase();
}

export const cursoServicio = {
  listar() {
    return cursoRepositorio.listar();
  },

  listarPorDocente(docenteId) {
    return cursoRepositorio.listarPorDocente(docenteId);
  },

  obtenerPorId(id) {
    return cursoRepositorio.obtenerPorId(id);
  },

  obtenerPorCodigo(codigoAcceso) {
    return cursoRepositorio.obtenerPorCodigo(codigoAcceso);
  },

  async crear({ titulo, descripcion, docenteId, activo }) {
    const codigoAcceso = generarCodigoCurso();

    const data = {
      titulo,
      descripcion: descripcion || null,
      docenteId,
      activo: activo ?? true,
      codigoAcceso,
    };

    return cursoRepositorio.crear(data);
  },

  async actualizar(id, { titulo, descripcion, activo, docenteId }) {
    const data = {};

    if (titulo !== undefined) data.titulo = titulo;
    if (descripcion !== undefined) data.descripcion = descripcion;
    if (typeof activo === "boolean") data.activo = activo;

    if (docenteId !== undefined && docenteId !== null && docenteId !== "") {
      const parsed = Number(docenteId);
      if (!Number.isNaN(parsed)) data.docenteId = parsed;
    }

    return cursoRepositorio.actualizar(id, data);
  },

  eliminar(id) {
    return cursoRepositorio.eliminar(id);
  },
};
