import { prisma } from "../../database/prisma.js";

export const inscripcionRepositorio = {
  crear(usuarioId, cursoId) {
    return prisma.inscripcion.create({
      data: {
        usuarioId,
        cursoId,
      },
    });
  },

  listarDeUsuario(usuarioId) {
    return prisma.inscripcion.findMany({
      where: { usuarioId },
      include: {
        curso: {
          include: {
            docente: { select: { id: true, nombre: true } },
          },
        },
      },
    });
  },

  listarDeCurso(cursoId) {
    return prisma.inscripcion.findMany({
      where: { cursoId },
      include: {
        estudiante: { select: { id: true, nombre: true, correo: true } },
      },
    });
  },

  eliminar(id) {
    return prisma.inscripcion.delete({
      where: { id },
    });
  },

  buscar(usuarioId, cursoId) {
    return prisma.inscripcion.findFirst({
      where: { usuarioId, cursoId },
    });
  },
};
