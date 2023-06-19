-- DropForeignKey
ALTER TABLE "Absence" DROP CONSTRAINT "Absence_card_section_uid_fkey";

-- AlterTable
ALTER TABLE "Absence" ALTER COLUMN "card_section_uid" DROP NOT NULL;

-- AlterTable
ALTER TABLE "StudentCatalogue" ADD COLUMN     "label" TEXT NOT NULL DEFAULT 'Nume Catalog';

-- AddForeignKey
ALTER TABLE "Absence" ADD CONSTRAINT "Absence_card_section_uid_fkey" FOREIGN KEY ("card_section_uid") REFERENCES "StudentCardSection"("card_section_uid") ON DELETE SET NULL ON UPDATE CASCADE;
