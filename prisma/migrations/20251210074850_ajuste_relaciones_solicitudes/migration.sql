/*
  Warnings:

  - You are about to drop the column `usuarioId` on the `Inscripcion` table. All the data in the column will be lost.
  - You are about to drop the column `codigoAcceso` on the `Usuario` table. All the data in the column will be lost.
  - Made the column `descripcion` on table `Curso` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `actualizadoEn` to the `Inscripcion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estudianteId` to the `Inscripcion` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Inscripcion" DROP CONSTRAINT "Inscripcion_usuarioId_fkey";

-- DropIndex
DROP INDEX "Usuario_codigoAcceso_key";

-- AlterTable
ALTER TABLE "Curso" ALTER COLUMN "descripcion" SET NOT NULL,
ALTER COLUMN "codigoAcceso" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Inscripcion" DROP COLUMN "usuarioId",
ADD COLUMN     "actualizadoEn" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "estado" TEXT NOT NULL DEFAULT 'PENDIENTE',
ADD COLUMN     "estudianteId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "codigoAcceso",
ALTER COLUMN "rol" SET DEFAULT 'ESTUDIANTE';

-- AddForeignKey
ALTER TABLE "Inscripcion" ADD CONSTRAINT "Inscripcion_estudianteId_fkey" FOREIGN KEY ("estudianteId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
