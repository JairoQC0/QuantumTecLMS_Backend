import { prisma } from "../../database/prisma.js";

export const cursoRepositorio = {
  listar() {
    return prisma.curso.findMany({
      orderBy: { id: "asc" },
      include: {
        docente: {
          select: {
            id: true,
            nombre: true,
            correo: true,
          },
        },
      },
    });
  },

  listarPorDocente(docenteId) {
    return prisma.curso.findMany({
      where: { docenteId },
      orderBy: { id: "asc" },
      include: {
        docente: {
          select: {
            id: true,
            nombre: true,
            correo: true,
          },
        },
      },
    });
  },

  obtenerPorId(id) {
    return prisma.curso.findUnique({
      where: { id },
      include: {
        docente: {
          select: {
            id: true,
            nombre: true,
            correo: true,
          },
        },
      },
    });
  },

  obtenerPorCodigo(codigoAcceso) {
    return prisma.curso.findUnique({
      where: { codigoAcceso },
      include: {
        docente: {
          select: {
            id: true,
            nombre: true,
            correo: true,
          },
        },
      },
    });
  },

  crear(data) {
    return prisma.curso.create({
      data,
      include: {
        docente: {
          select: {
            id: true,
            nombre: true,
            correo: true,
          },
        },
      },
    });
  },

  actualizar(id, data) {
    return prisma.curso.update({
      where: { id },
      data,
      include: {
        docente: {
          select: {
            id: true,
            nombre: true,
            correo: true,
          },
        },
      },
    });
  },

  eliminar(id) {
    return prisma.curso.delete({
      where: { id },
    });
  },
};
