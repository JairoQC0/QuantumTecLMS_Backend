import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const usuarioRepositorio = {
  buscarPorCorreo: (correo) => prisma.usuario.findUnique({ where: { correo } }),

  buscarPorId: (id) => prisma.usuario.findUnique({ where: { id } }),

  crear: (data) => prisma.usuario.create({ data }),

  actualizar: (id, data) =>
    prisma.usuario.update({
      where: { id },
      data,
    }),

  listar: () => prisma.usuario.findMany(),

  eliminar: (id) =>
    prisma.usuario.update({
      where: { id },
      data: { eliminado: true },
    }),
};
