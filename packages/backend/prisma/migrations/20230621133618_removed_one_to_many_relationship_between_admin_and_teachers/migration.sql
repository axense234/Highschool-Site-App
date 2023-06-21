/*
  Warnings:

  - You are about to drop the column `created_by_admin_uid` on the `Teacher` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_created_by_admin_uid_fkey";

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "created_by_admin_uid",
ADD COLUMN     "adminAdmin_uid" TEXT;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_adminAdmin_uid_fkey" FOREIGN KEY ("adminAdmin_uid") REFERENCES "Admin"("admin_uid") ON DELETE SET NULL ON UPDATE CASCADE;
