-- DropForeignKey
ALTER TABLE "StudentCard" DROP CONSTRAINT "StudentCard_catalogue_uid_fkey";

-- AlterTable
ALTER TABLE "StudentCard" ALTER COLUMN "catalogue_uid" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "StudentCard" ADD CONSTRAINT "StudentCard_catalogue_uid_fkey" FOREIGN KEY ("catalogue_uid") REFERENCES "StudentCatalogue"("catalogue_uid") ON DELETE SET NULL ON UPDATE CASCADE;
