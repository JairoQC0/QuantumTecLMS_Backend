import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

function generarCodigoCurso() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

async function main() {
  console.log("🚀 Iniciando seed de usuarios y cursos...");

  const adminPass = await bcrypt.hash("admin123", 10);
  const docentePass = await bcrypt.hash("docente123", 10);
  const estudiantePass = await bcrypt.hash("estudiante123", 10);

  const admin = await prisma.usuario.upsert({
    where: { correo: "admin@quantumtec.com" },
    update: {},
    create: {
      nombre: "Administrador General",
      correo: "admin@quantumtec.com",
      contrasenaHash: adminPass,
      rol: "ADMIN",
    },
  });

  const docente = await prisma.usuario.upsert({
    where: { correo: "docente@quantumtec.com" },
    update: {},
    create: {
      nombre: "Docente Prueba",
      correo: "docente@quantumtec.com",
      contrasenaHash: docentePass,
      rol: "DOCENTE",
    },
  });

  const estudiante = await prisma.usuario.upsert({
    where: { correo: "estudiante@quantumtec.com" },
    update: {},
    create: {
      nombre: "Estudiante Demo",
      correo: "estudiante@quantumtec.com",
      contrasenaHash: estudiantePass,
      rol: "ESTUDIANTE",
    },
  });

  await prisma.curso.upsert({
    where: { id: 1 },
    update: {},
    create: {
      titulo: "Curso de Introducción a la Computación Cuántica",
      descripcion:
        "Conceptos fundamentales de qubits, puertas cuánticas y superposición.",
      docenteId: docente.id,
      activo: true,
      codigoAcceso: generarCodigoCurso(),
    },
  });

  console.log("✔ Seed finalizado correctamente.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
