// src/modules/assignments/assignment.service.js
import { prisma } from "../../core/prismaClient.js";
import { businessError } from "../../core/businessError.js";

export const assignmentService = {
  async create(courseId, teacherId, data) {
    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!course) throw businessError("Curso no encontrado");
    if (course.teacherId !== teacherId) {
      throw businessError("No puedes crear tareas para este curso");
    }

    return prisma.assignment.create({
      data: {
        title: data.title,
        description: data.description || "",
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
        courseId,
      },
    });
  },

  listByCourse(courseId) {
    return prisma.assignment.findMany({
      where: { courseId },
      orderBy: { createdAt: "desc" },
    });
  },

  async submit(assignmentId, studentId, data) {
    const assignment = await prisma.assignment.findUnique({
      where: { id: assignmentId },
      include: {
        course: {
          include: {
            enrollments: true,
          },
        },
      },
    });
    if (!assignment) throw businessError("Tarea no encontrada");

    const isEnrolled = assignment.course.enrollments.some(
      (e) => e.studentId === studentId && e.status === "APPROVED"
    );
    if (!isEnrolled) throw businessError("No estás inscrito en este curso");

    const existing = await prisma.submission.findFirst({
      where: {
        assignmentId,
        studentId,
      },
    });

    if (existing) {
      return prisma.submission.update({
        where: { id: existing.id },
        data: {
          content: data.content || "",
          submittedAt: new Date(),
        },
      });
    }

    return prisma.submission.create({
      data: {
        content: data.content || "",
        assignmentId,
        studentId,
      },
    });
  },

  listSubmissions(assignmentId, teacherId) {
    return prisma.submission.findMany({
      where: {
        assignmentId,
        assignment: {
          course: {
            teacherId,
          },
        },
      },
      include: {
        student: { select: { id: true, name: true, email: true } },
      },
    });
  },

  async grade(submissionId, teacherId, grade) {
    const submission = await prisma.submission.findUnique({
      where: { id: submissionId },
      include: {
        assignment: {
          include: { course: true },
        },
      },
    });
    if (!submission) throw businessError("Entrega no encontrada");
    if (submission.assignment.course.teacherId !== teacherId) {
      throw businessError("No puedes calificar esta entrega");
    }

    return prisma.submission.update({
      where: { id: submissionId },
      data: { grade },
    });
  },
};
