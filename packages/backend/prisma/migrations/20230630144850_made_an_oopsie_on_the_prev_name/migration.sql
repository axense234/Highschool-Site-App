/*
  Warnings:

  - You are about to drop the column `master_teacher_label` on the `Class` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[master_teacher_uid,master_teacher_name]` on the table `Class` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_master_teacher_uid_master_teacher_label_fkey";

-- DropIndex
DROP INDEX "Class_master_teacher_uid_master_teacher_label_key";

-- AlterTable
ALTER TABLE "Class" DROP COLUMN "master_teacher_label",
ADD COLUMN     "master_teacher_name" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Class_master_teacher_uid_master_teacher_name_key" ON "Class"("master_teacher_uid", "master_teacher_name");

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_master_teacher_uid_master_teacher_name_fkey" FOREIGN KEY ("master_teacher_uid", "master_teacher_name") REFERENCES "Teacher"("teacher_uid", "fullname") ON DELETE SET NULL ON UPDATE CASCADE;
