/*
  Warnings:

  - You are about to drop the column `absences` on the `StudentCardSection` table. All the data in the column will be lost.
  - You are about to drop the column `grades` on the `StudentCardSection` table. All the data in the column will be lost.
  - Added the required column `card_section_uid` to the `Absence` table without a default value. This is not possible if the table is not empty.
  - Added the required column `card_section_uid` to the `Grade` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Absence" ADD COLUMN     "card_section_uid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Grade" ADD COLUMN     "card_section_uid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "StudentCardSection" DROP COLUMN "absences",
DROP COLUMN "grades";

-- AddForeignKey
ALTER TABLE "Absence" ADD CONSTRAINT "Absence_card_section_uid_fkey" FOREIGN KEY ("card_section_uid") REFERENCES "StudentCardSection"("card_section_uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_card_section_uid_fkey" FOREIGN KEY ("card_section_uid") REFERENCES "StudentCardSection"("card_section_uid") ON DELETE RESTRICT ON UPDATE CASCADE;
