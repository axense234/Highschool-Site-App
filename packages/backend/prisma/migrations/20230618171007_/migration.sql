/*
  Warnings:

  - A unique constraint covering the columns `[master_teacher_uid]` on the table `StudentCatalogue` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "TeacherType" AS ENUM ('CLASA', 'DIRIGINTE');

-- AlterTable
ALTER TABLE "Absence" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Announcement" ADD COLUMN     "created_by_admin_uid" TEXT;

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Grade" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "class_uid" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "student_card_uid" DROP DEFAULT;

-- AlterTable
ALTER TABLE "StudentCard" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "StudentCardSection" ADD COLUMN     "teacher_uid" TEXT;

-- AlterTable
ALTER TABLE "StudentCatalogue" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "master_teacher_uid" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "created_by_admin_uid" TEXT,
ADD COLUMN     "master_catalogue_uid" TEXT,
ADD COLUMN     "master_class_uid" TEXT,
ADD COLUMN     "type" "TeacherType" NOT NULL DEFAULT 'CLASA',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Class" (
    "class_uid" TEXT NOT NULL,
    "id" TEXT NOT NULL DEFAULT '',
    "created_by_admin_uid" TEXT,
    "master_teacher_uid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("class_uid")
);

-- CreateTable
CREATE TABLE "_many" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Class_class_uid_key" ON "Class"("class_uid");

-- CreateIndex
CREATE UNIQUE INDEX "Class_master_teacher_uid_key" ON "Class"("master_teacher_uid");

-- CreateIndex
CREATE UNIQUE INDEX "_many_AB_unique" ON "_many"("A", "B");

-- CreateIndex
CREATE INDEX "_many_B_index" ON "_many"("B");

-- CreateIndex
CREATE UNIQUE INDEX "StudentCatalogue_master_teacher_uid_key" ON "StudentCatalogue"("master_teacher_uid");

-- AddForeignKey
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_created_by_admin_uid_fkey" FOREIGN KEY ("created_by_admin_uid") REFERENCES "Admin"("admin_uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_class_uid_fkey" FOREIGN KEY ("class_uid") REFERENCES "Class"("class_uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_created_by_admin_uid_fkey" FOREIGN KEY ("created_by_admin_uid") REFERENCES "Admin"("admin_uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_created_by_admin_uid_fkey" FOREIGN KEY ("created_by_admin_uid") REFERENCES "Admin"("admin_uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_master_teacher_uid_fkey" FOREIGN KEY ("master_teacher_uid") REFERENCES "Teacher"("teacher_uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentCatalogue" ADD CONSTRAINT "StudentCatalogue_master_teacher_uid_fkey" FOREIGN KEY ("master_teacher_uid") REFERENCES "Teacher"("teacher_uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentCardSection" ADD CONSTRAINT "StudentCardSection_teacher_uid_fkey" FOREIGN KEY ("teacher_uid") REFERENCES "Teacher"("teacher_uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_many" ADD CONSTRAINT "_many_A_fkey" FOREIGN KEY ("A") REFERENCES "Class"("class_uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_many" ADD CONSTRAINT "_many_B_fkey" FOREIGN KEY ("B") REFERENCES "Teacher"("teacher_uid") ON DELETE CASCADE ON UPDATE CASCADE;
