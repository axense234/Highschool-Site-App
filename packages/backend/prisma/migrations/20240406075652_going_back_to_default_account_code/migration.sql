/*
  Warnings:

  - You are about to drop the column `account_type` on the `AccountCode` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AccountCode" DROP COLUMN "account_type";

-- DropEnum
DROP TYPE "AccountType";
