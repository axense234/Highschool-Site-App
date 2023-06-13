/*
  Warnings:

  - The values [GENERAL,SPECIAL] on the enum `CategorieAnunt` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CategorieAnunt_new" AS ENUM ('GENERALE', 'SPECIALE', 'PROFESORI', 'ELEVI');
ALTER TABLE "Anunt" ALTER COLUMN "categorie" DROP DEFAULT;
ALTER TABLE "Anunt" ALTER COLUMN "categorie" TYPE "CategorieAnunt_new" USING ("categorie"::text::"CategorieAnunt_new");
ALTER TYPE "CategorieAnunt" RENAME TO "CategorieAnunt_old";
ALTER TYPE "CategorieAnunt_new" RENAME TO "CategorieAnunt";
DROP TYPE "CategorieAnunt_old";
ALTER TABLE "Anunt" ALTER COLUMN "categorie" SET DEFAULT 'GENERALE';
COMMIT;

-- AlterTable
ALTER TABLE "Anunt" ALTER COLUMN "categorie" SET DEFAULT 'GENERALE';
