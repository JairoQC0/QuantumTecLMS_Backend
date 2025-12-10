import { cursoRepositorio } from "./curso.repositorio.js";

export const cursoServicio = {
  listarTodos() {
    return cursoRepositorio.listarTodos();
  },

  listarPorDocente(docenteId) {
    return cursoRepositorio.listarPorDocente(docenteId);
  },

  listarDisponibles(usuarioId) {
    return cursoRepositorio.listarDisponibles(usuarioId);
  },

  crear(dataEntrada) {
    if (!dataEntrada.titulo || !dataEntrada.docenteId) {
      const error = new Error("Datos incompletos");
      error.tipo = "VALIDACION";
      throw error;
    }

    const docenteIdNumber = Number(dataEntrada.docenteId);
    if (Number.isNaN(docenteIdNumber)) {
      const error = new Error("Docente inválido");
      error.tipo = "VALIDACION";
      throw error;
    }

    const data = {
      titulo: dataEntrada.titulo,
      descripcion: dataEntrada.descripcion ?? null,
      docenteId: docenteIdNumber,
    };

    return cursoRepositorio.crear(data);
  },

  actualizar(id, dataEntrada) {
    const data = {};

    if (dataEntrada.titulo !== undefined) {
      data.titulo = dataEntrada.titulo;
    }

    if (dataEntrada.descripcion !== undefined) {
      data.descripcion = dataEntrada.descripcion;
    }

    if (dataEntrada.activo !== undefined) {
      data.activo = dataEntrada.activo;
    }

    if (dataEntrada.docenteId !== undefined) {
      const docenteIdNumber = Number(dataEntrada.docenteId);
      if (!Number.isNaN(docenteIdNumber)) {
        data.docente = { connect: { id: docenteIdNumber } };
      }
    }

    return cursoRepositorio.actualizar(id, data);
  },

  eliminar(id) {
    return cursoRepositorio.eliminar(id);
  },
};
