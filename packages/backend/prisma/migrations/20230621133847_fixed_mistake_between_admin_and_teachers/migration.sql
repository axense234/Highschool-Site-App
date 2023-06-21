/*
  Warnings:

  - You are about to drop the column `adminAdmin_uid` on the `Teacher` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_adminAdmin_uid_fkey";

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "adminAdmin_uid";
