/*
  Warnings:

  - Added the required column `actualizatLa` to the `Anunt` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CategorieAnunt" AS ENUM ('GENERAL', 'SPECIAL', 'PROFESORI', 'ELEVI');

-- AlterTable
ALTER TABLE "Anunt" ADD COLUMN     "actualizatLa" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "categorie" "CategorieAnunt" NOT NULL DEFAULT 'GENERAL',
ADD COLUMN     "creatLa" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
