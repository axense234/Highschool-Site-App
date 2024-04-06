-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('ADMIN', 'PROFESOR', 'ELEV');

-- AlterTable
ALTER TABLE "AccountCode" ADD COLUMN     "account_type" "AccountType" NOT NULL DEFAULT 'ADMIN';
