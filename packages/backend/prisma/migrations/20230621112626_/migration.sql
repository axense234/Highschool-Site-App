/*
  Warnings:

  - A unique constraint covering the columns `[class_uid,label]` on the table `Class` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_class_uid_fkey";

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "class_label" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Class_class_uid_label_key" ON "Class"("class_uid", "label");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_class_uid_class_label_fkey" FOREIGN KEY ("class_uid", "class_label") REFERENCES "Class"("class_uid", "label") ON DELETE SET NULL ON UPDATE CASCADE;
