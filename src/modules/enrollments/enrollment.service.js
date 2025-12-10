// src/modules/enrollments/enrollment.service.js
import { prisma } from "../../core/prismaClient.js";
import { businessError } from "../../core/businessError.js";

export const enrollmentService = {
  async requestEnrollment(studentId, courseId) {
    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!course) throw businessError("Curso no encontrado");
    if (!course.isPublished) throw businessError("Curso no publicado");

    const existing = await prisma.enrollment.findFirst({
      where: { studentId, courseId },
    });
    if (existing) throw businessError("Ya tienes una inscripción creada");

    return prisma.enrollment.create({
      data: {
        studentId,
        courseId,
        status: "PENDING",
      },
    });
  },

  listMyEnrollments(studentId) {
    return prisma.enrollment.findMany({
      where: { studentId, status: "APPROVED" },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            description: true,
            teacher: { select: { id: true, name: true } },
          },
        },
      },
    });
  },

  listCourseRequests(teacherId, courseId) {
    return prisma.enrollment.findMany({
      where: {
        courseId,
        course: { teacherId },
        status: "PENDING",
      },
      include: {
        student: { select: { id: true, name: true, email: true } },
        course: { select: { id: true, title: true } },
      },
    });
  },

  async changeStatus(teacherId, enrollmentId, newStatus) {
    const enrollment = await prisma.enrollment.findUnique({
      where: { id: enrollmentId },
      include: { course: true },
    });

    if (!enrollment) throw businessError("Inscripción no encontrada");
    if (enrollment.course.teacherId !== teacherId) {
      throw businessError("No puedes gestionar inscripciones de otro curso");
    }

    if (!["APPROVED", "REJECTED"].includes(newStatus)) {
      throw businessError("Estado inválido");
    }

    return prisma.enrollment.update({
      where: { id: enrollmentId },
      data: { status: newStatus },
    });
  },
};
