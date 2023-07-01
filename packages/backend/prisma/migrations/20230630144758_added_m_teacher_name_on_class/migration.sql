/*
  Warnings:

  - A unique constraint covering the columns `[master_teacher_uid,master_teacher_label]` on the table `Class` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_master_teacher_uid_fkey";

-- AlterTable
ALTER TABLE "Class" ADD COLUMN     "master_teacher_label" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Class_master_teacher_uid_master_teacher_label_key" ON "Class"("master_teacher_uid", "master_teacher_label");

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_master_teacher_uid_master_teacher_label_fkey" FOREIGN KEY ("master_teacher_uid", "master_teacher_label") REFERENCES "Teacher"("teacher_uid", "fullname") ON DELETE SET NULL ON UPDATE CASCADE;
