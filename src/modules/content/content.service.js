// src/modules/content/content.service.js
import { prisma } from "../../core/prismaClient.js";
import { businessError } from "../../core/businessError.js";

export const contentService = {
  async addModule(courseId, teacherId, data) {
    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!course) throw businessError("Curso no encontrado");
    if (course.teacherId !== teacherId) {
      throw businessError("No puedes modificar este curso");
    }

    const last = await prisma.courseModule.findFirst({
      where: { courseId },
      orderBy: { order: "desc" },
    });

    const order = last ? last.order + 1 : 1;

    return prisma.courseModule.create({
      data: {
        title: data.title,
        order,
        courseId,
      },
    });
  },

  async addLesson(moduleId, teacherId, data) {
    const module = await prisma.courseModule.findUnique({
      where: { id: moduleId },
      include: { course: true },
    });
    if (!module) throw businessError("Módulo no encontrado");

    if (module.course.teacherId !== teacherId) {
      throw businessError("No puedes modificar este curso");
    }

    const last = await prisma.lesson.findFirst({
      where: { moduleId },
      orderBy: { order: "desc" },
    });

    const order = last ? last.order + 1 : 1;

    return prisma.lesson.create({
      data: {
        title: data.title,
        content: data.content || "",
        order,
        moduleId,
      },
    });
  },

  listModules(courseId) {
    return prisma.courseModule.findMany({
      where: { courseId },
      include: { lessons: { orderBy: { order: "asc" } } },
      orderBy: { order: "asc" },
    });
  },
};
