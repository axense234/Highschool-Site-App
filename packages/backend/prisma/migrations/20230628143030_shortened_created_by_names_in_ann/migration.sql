/*
  Warnings:

  - You are about to drop the column `created_by_admin_fullname` on the `Announcement` table. All the data in the column will be lost.
  - You are about to drop the column `created_by_teacher_fullname` on the `Announcement` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Announcement" DROP CONSTRAINT "Announcement_created_by_admin_uid_created_by_admin_fullnam_fkey";

-- DropForeignKey
ALTER TABLE "Announcement" DROP CONSTRAINT "Announcement_created_by_teacher_uid_created_by_teacher_ful_fkey";

-- AlterTable
ALTER TABLE "Announcement" DROP COLUMN "created_by_admin_fullname",
DROP COLUMN "created_by_teacher_fullname",
ADD COLUMN     "created_by_admin_name" TEXT,
ADD COLUMN     "created_by_teacher_name" TEXT;

-- AddForeignKey
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_created_by_admin_uid_created_by_admin_name_fkey" FOREIGN KEY ("created_by_admin_uid", "created_by_admin_name") REFERENCES "Admin"("admin_uid", "fullname") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_created_by_teacher_uid_created_by_teacher_nam_fkey" FOREIGN KEY ("created_by_teacher_uid", "created_by_teacher_name") REFERENCES "Teacher"("teacher_uid", "fullname") ON DELETE SET NULL ON UPDATE CASCADE;
