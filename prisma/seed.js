import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed...");

  const hash = (txt) => bcrypt.hashSync(txt, 10);

  //
  // ========= USUARIOS =========
  //

  const admin = await prisma.user.create({
    data: {
      name: "Administrador General",
      email: "admin@lms.com",
      passwordHash: hash("admin123"),
      role: "ADMIN",
    },
  });

  const teachers = await prisma.user.createMany({
    data: [
      {
        name: "Juan Pérez",
        email: "juan@lms.com",
        passwordHash: hash("doc123"),
        role: "TEACHER",
      },
      {
        name: "María López",
        email: "maria@lms.com",
        passwordHash: hash("doc123"),
        role: "TEACHER",
      },
      {
        name: "Carlos Ramos",
        email: "carlos@lms.com",
        passwordHash: hash("doc123"),
        role: "TEACHER",
      },
    ],
  });

  const students = await prisma.user.createMany({
    data: [
      {
        name: "Ana Ruiz",
        email: "ana@lms.com",
        passwordHash: hash("stu123"),
        role: "STUDENT",
      },
      {
        name: "Luis Soto",
        email: "luis@lms.com",
        passwordHash: hash("stu123"),
        role: "STUDENT",
      },
      {
        name: "Valeria Cruz",
        email: "valeria@lms.com",
        passwordHash: hash("stu123"),
        role: "STUDENT",
      },
      {
        name: "Pedro Silva",
        email: "pedro@lms.com",
        passwordHash: hash("stu123"),
        role: "STUDENT",
      },
      {
        name: "Carolina Díaz",
        email: "carolina@lms.com",
        passwordHash: hash("stu123"),
        role: "STUDENT",
      },
    ],
  });

  console.log("✔ Usuarios generados (1 admin, 3 docentes, 5 alumnos)");

  //
  // ========= CURSOS  =========
  //

  const teacherList = await prisma.user.findMany({
    where: { role: "TEACHER" },
  });
  const courseTemplates = [
    {
      title: "JavaScript desde cero",
      description: "Variables, funciones, DOM, fetch, async, ESModules.",
    },
    {
      title: "SQL + PostgreSQL",
      description:
        "Consultas, JOINS, triggers, funciones, índices y normalización.",
    },
    {
      title: "Node + React FullStack",
      description: "Rest API, Frontend React, JWT Auth y despliegue.",
    },
  ];

  let courses = [];
  for (let i = 0; i < teacherList.length; i++) {
    const c = await prisma.course.create({
      data: {
        ...courseTemplates[i],
        teacherId: teacherList[i].id,
        isPublished: true,
      },
    });
    courses.push(c);
  }

  console.log("✔ 3 cursos creados");

  //
  // ========= MÓDULOS + LECCIONES =========
  //

  for (const course of courses) {
    for (let m = 1; m <= 5; m++) {
      const module = await prisma.courseModule.create({
        data: { title: `Módulo ${m}`, order: m, courseId: course.id },
      });

      for (let l = 1; l <= 5; l++) {
        await prisma.lesson.create({
          data: {
            title: `Lección ${l} del módulo ${m}`,
            order: l,
            content: `Contenido detallado de la lección ${l}. Ejemplos, teoría, ejercicios.`,
            moduleId: module.id,
          },
        });
      }
    }
  }

  console.log(
    "✔ Módulos generados: 3 cursos × 5 módulos × 5 lecciones = 75 lecciones"
  );

  //
  // ========= TAREAS =========
  //

  for (const course of courses) {
    for (let i = 1; i <= 3; i++) {
      await prisma.assignment.create({
        data: {
          title: `Tarea ${i} del curso ${course.title}`,
          description: "Sube un archivo o desarrollo escrito con tu respuesta.",
          dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * (3 * i)),
          courseId: course.id,
        },
      });
    }
  }

  console.log("✔ 9 tareas creadas (3 por curso)");

  //
  // ========= INSCRIPCIONES =========
  //

  const allStudents = await prisma.user.findMany({
    where: { role: "STUDENT" },
  });

  for (const course of courses) {
    // 3 aceptados
    for (let i = 0; i < 3; i++) {
      await prisma.enrollment.create({
        data: {
          studentId: allStudents[i].id,
          courseId: course.id,
          status: "APPROVED",
        },
      });
    }
    // 2 pendientes
    for (let i = 3; i < 5; i++) {
      await prisma.enrollment.create({
        data: {
          studentId: allStudents[i].id,
          courseId: course.id,
          status: "PENDING",
        },
      });
    }
  }

  console.log("✔ Inscripciones completadas (Aprobados + Pendientes)");

  console.log("🌱 SEED COMPLETADO CON ÉXITO");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
