import { prisma } from "../../database/prisma.js";

export const usuarioRepositorio = {
  listar() {
    return prisma.usuario.findMany({
      orderBy: { id: "asc" },
    });
  },

  listarPorRol(rol) {
    return prisma.usuario.findMany({
      where: { rol },
      orderBy: { id: "asc" },
    });
  },

  obtenerPorId(id) {
    return prisma.usuario.findUnique({
      where: { id },
    });
  },

  obtenerPorCorreo(correo) {
    return prisma.usuario.findUnique({
      where: { correo },
    });
  },

  crear(data) {
    return prisma.usuario.create({
      data,
    });
  },

  actualizar(id, data) {
    return prisma.usuario.update({
      where: { id },
      data,
    });
  },

  eliminar(id) {
    return prisma.usuario.update({
      where: { id },
      data: { eliminado: true },
    });
  },

  restaurar(id) {
    return prisma.usuario.update({
      where: { id },
      data: { eliminado: false },
    });
  },
};
