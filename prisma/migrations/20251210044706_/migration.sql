/*
  Warnings:

  - A unique constraint covering the columns `[codigoAcceso]` on the table `Curso` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[codigoAcceso]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - The required column `codigoAcceso` was added to the `Usuario` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- CreateEnum
CREATE TYPE "EstadoSolicitud" AS ENUM ('PENDIENTE', 'ACEPTADA', 'RECHAZADA');

-- AlterTable
ALTER TABLE "Curso" ADD COLUMN     "codigoAcceso" TEXT NOT NULL DEFAULT substr(md5(random()::text), 1, 6);

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "codigoAcceso" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "SolicitudInscripcion" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "cursoId" INTEGER NOT NULL,
    "estado" "EstadoSolicitud" NOT NULL DEFAULT 'PENDIENTE',
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SolicitudInscripcion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Curso_codigoAcceso_key" ON "Curso"("codigoAcceso");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_codigoAcceso_key" ON "Usuario"("codigoAcceso");

-- AddForeignKey
ALTER TABLE "SolicitudInscripcion" ADD CONSTRAINT "SolicitudInscripcion_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolicitudInscripcion" ADD CONSTRAINT "SolicitudInscripcion_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
