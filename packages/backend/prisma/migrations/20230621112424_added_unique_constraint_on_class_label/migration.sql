/*
  Warnings:

  - A unique constraint covering the columns `[label]` on the table `Class` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Class_label_key" ON "Class"("label");
