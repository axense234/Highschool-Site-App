/*
  Warnings:

  - You are about to drop the column `type` on the `Teacher` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "type",
ADD COLUMN     "master" BOOLEAN NOT NULL DEFAULT false;

-- DropEnum
DROP TYPE "TeacherType";
