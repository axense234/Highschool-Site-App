/*
  Warnings:

  - You are about to drop the column `creatDe` on the `Anunt` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Anunt" DROP CONSTRAINT "Anunt_creatDe_fkey";

-- AlterTable
ALTER TABLE "Anunt" DROP COLUMN "creatDe";
