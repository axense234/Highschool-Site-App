/*
  Warnings:

  - A unique constraint covering the columns `[student_uid]` on the table `StudentCard` will be added. If there are existing duplicate values, this will fail.
  - Made the column `catalogue_uid` on table `StudentCard` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "StudentCard" DROP CONSTRAINT "StudentCard_catalogue_uid_fkey";

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "student_card_uid" TEXT;

-- AlterTable
ALTER TABLE "StudentCard" ADD COLUMN     "student_uid" TEXT,
ALTER COLUMN "catalogue_uid" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "StudentCard_student_uid_key" ON "StudentCard"("student_uid");

-- AddForeignKey
ALTER TABLE "StudentCard" ADD CONSTRAINT "StudentCard_catalogue_uid_fkey" FOREIGN KEY ("catalogue_uid") REFERENCES "StudentCatalogue"("catalogue_uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentCard" ADD CONSTRAINT "StudentCard_student_uid_fkey" FOREIGN KEY ("student_uid") REFERENCES "Student"("student_uid") ON DELETE SET NULL ON UPDATE CASCADE;
