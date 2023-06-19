-- DropForeignKey
ALTER TABLE "Grade" DROP CONSTRAINT "Grade_card_section_uid_fkey";

-- AlterTable
ALTER TABLE "Grade" ALTER COLUMN "card_section_uid" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_card_section_uid_fkey" FOREIGN KEY ("card_section_uid") REFERENCES "StudentCardSection"("card_section_uid") ON DELETE SET NULL ON UPDATE CASCADE;
