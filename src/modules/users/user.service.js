// src/modules/users/user.service.js
import { prisma } from "../../core/prismaClient.js";
import { businessError } from "../../core/businessError.js";

export const userService = {
  list() {
    return prisma.user.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
  },

  async getById(id) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) throw businessError("Usuario no encontrado");
    return user;
  },

  async update(id, data) {
    const updated = await prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        role: data.role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
    return updated;
  },

  async softDelete(id) {
    await prisma.user.update({
      where: { id },
      data: { isActive: false },
    });
  },
};
