import { prisma } from "../../database/prisma.js";

export const cursoRepositorio = {
  listarTodos() {
    return prisma.curso.findMany({
      include: {
        docente: true,
      },
      orderBy: { id: "asc" },
    });
  },

  listarPorDocente(docenteId) {
    return prisma.curso.findMany({
      where: { docenteId },
      include: {
        docente: true,
      },
      orderBy: { id: "asc" },
    });
  },

  listarDisponibles(usuarioId) {
    return prisma.curso.findMany({
      where: {
        activo: true,
        inscripciones: {
          none: {
            usuarioId,
          },
        },
      },
      include: {
        docente: true,
      },
      orderBy: { id: "asc" },
    });
  },

  crear(data) {
    return prisma.curso.create({
      data,
      include: {
        docente: true,
      },
    });
  },

  actualizar(id, data) {
    return prisma.curso.update({
      where: { id },
      data,
      include: {
        docente: true,
      },
    });
  },

  eliminar(id) {
    return prisma.curso.delete({
      where: { id },
    });
  },
};
