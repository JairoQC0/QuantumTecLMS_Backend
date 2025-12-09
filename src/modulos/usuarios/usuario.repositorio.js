import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const usuarioRepositorio = {
  listar: () => prisma.usuario.findMany({ where: { eliminado: false } }),

  buscarPorId: (id) =>
    prisma.usuario.findFirst({
      where: { id, eliminado: false },
    }),

  buscarPorCorreo: (correo) =>
    prisma.usuario.findFirst({
      where: { correo, eliminado: false },
    }),

  crear: (datos) => prisma.usuario.create({ data: datos }),

  actualizar: (id, datos) =>
    prisma.usuario.update({
      where: { id },
      data: datos,
    }),

  eliminarLogico: (id) =>
    prisma.usuario.update({
      where: { id },
      data: { eliminado: true },
    }),
};
