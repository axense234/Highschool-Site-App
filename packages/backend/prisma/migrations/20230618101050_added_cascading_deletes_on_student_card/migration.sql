/*
  Warnings:

  - You are about to drop the column `tag` on the `Teacher` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "StudentCardSection" DROP CONSTRAINT "StudentCardSection_student_card_uid_fkey";

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "tag",
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'TEACHER';

-- AddForeignKey
ALTER TABLE "StudentCardSection" ADD CONSTRAINT "StudentCardSection_student_card_uid_fkey" FOREIGN KEY ("student_card_uid") REFERENCES "StudentCard"("student_card_uid") ON DELETE CASCADE ON UPDATE CASCADE;
