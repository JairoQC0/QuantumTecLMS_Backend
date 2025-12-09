import { prisma } from "../../database/prisma.js";

export const usuarioRepositorio = {
  crear: (data) => prisma.usuario.create({ data }),

  listar: () =>
    prisma.usuario.findMany({
      orderBy: { id: "desc" },
    }),

  obtenerPorId: (id) =>
    prisma.usuario.findUnique({
      where: { id },
    }),

  obtenerPorCorreo: (correo) =>
    prisma.usuario.findUnique({
      where: { correo },
    }),

  actualizar: (id, data) =>
    prisma.usuario.update({
      where: { id },
      data,
    }),

  eliminar: (id) =>
    prisma.usuario.update({
      where: { id },
      data: { eliminado: true },
    }),

  restaurar: (id) =>
    prisma.usuario.update({
      where: { id },
      data: { eliminado: false },
    }),
};
