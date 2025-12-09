import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Iniciando seed de usuarios...");

  const adminPass = await bcrypt.hash("admin123", 10);
  const docentePass = await bcrypt.hash("docente123", 10);
  const estudiantePass = await bcrypt.hash("estudiante123", 10);

  await prisma.usuario.upsert({
    where: { correo: "admin@quantumtec.com" },
    update: {},
    create: {
      nombre: "Administrador General",
      correo: "admin@quantumtec.com",
      contrasenaHash: adminPass,
      rol: "ADMIN",
    },
  });

  await prisma.usuario.upsert({
    where: { correo: "docente@quantumtec.com" },
    update: {},
    create: {
      nombre: "Docente Prueba",
      correo: "docente@quantumtec.com",
      contrasenaHash: docentePass,
      rol: "DOCENTE",
    },
  });

  await prisma.usuario.upsert({
    where: { correo: "estudiante@quantumtec.com" },
    update: {},
    create: {
      nombre: "Estudiante Demo",
      correo: "estudiante@quantumtec.com",
      contrasenaHash: estudiantePass,
      rol: "ESTUDIANTE",
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
