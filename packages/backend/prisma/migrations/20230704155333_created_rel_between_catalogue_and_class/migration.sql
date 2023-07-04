/*
  Warnings:

  - A unique constraint covering the columns `[class_uid]` on the table `StudentCatalogue` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Class" ADD COLUMN     "catalogue_uid" TEXT;

-- AlterTable
ALTER TABLE "StudentCatalogue" ADD COLUMN     "class_uid" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "StudentCatalogue_class_uid_key" ON "StudentCatalogue"("class_uid");

-- AddForeignKey
ALTER TABLE "StudentCatalogue" ADD CONSTRAINT "StudentCatalogue_class_uid_fkey" FOREIGN KEY ("class_uid") REFERENCES "Class"("class_uid") ON DELETE SET NULL ON UPDATE CASCADE;
