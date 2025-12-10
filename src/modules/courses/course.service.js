// src/modules/courses/course.service.js
import { prisma } from "../../core/prismaClient.js";
import { businessError } from "../../core/businessError.js";

export const courseService = {
  async create(data, teacherId) {
    const teacher = await prisma.user.findUnique({
      where: { id: teacherId },
    });
    if (!teacher || teacher.role !== "TEACHER") {
      throw businessError("El usuario no es un docente válido");
    }

    return prisma.course.create({
      data: {
        title: data.title,
        description: data.description || "",
        teacherId,
      },
    });
  },

  listPublic() {
    return prisma.course.findMany({
      where: { isPublished: true },
      include: {
        teacher: {
          select: { id: true, name: true, email: true },
        },
      },
    });
  },

  listByTeacher(teacherId) {
    return prisma.course.findMany({
      where: { teacherId },
      include: { modules: true },
    });
  },

  async getById(id) {
    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        teacher: { select: { id: true, name: true } },
        modules: {
          include: { lessons: true },
          orderBy: { order: "asc" },
        },
      },
    });
    if (!course) throw businessError("Curso no encontrado");
    return course;
  },

  async update(id, teacherId, data) {
    const course = await prisma.course.findUnique({ where: { id } });
    if (!course) throw businessError("Curso no encontrado");
    if (course.teacherId !== teacherId) {
      throw businessError("No puedes modificar un curso de otro docente");
    }

    return prisma.course.update({
      where: { id },
      data: {
        title: data.title ?? course.title,
        description: data.description ?? course.description,
        isPublished: data.isPublished ?? course.isPublished,
      },
    });
  },

  async remove(id, teacherId) {
    const course = await prisma.course.findUnique({ where: { id } });
    if (!course) throw businessError("Curso no encontrado");
    if (course.teacherId !== teacherId) {
      throw businessError("No puedes eliminar este curso");
    }

    await prisma.course.delete({ where: { id } });
  },
};
