/*
  Warnings:

  - A unique constraint covering the columns `[admin_uid,fullname]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[teacher_uid,fullname]` on the table `Teacher` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Announcement" DROP CONSTRAINT "Announcement_created_by_admin_uid_fkey";

-- AlterTable
ALTER TABLE "Announcement" ADD COLUMN     "created_by_admin_fullname" TEXT,
ADD COLUMN     "created_by_teacher_fullname" TEXT,
ADD COLUMN     "created_by_teacher_uid" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Admin_admin_uid_fullname_key" ON "Admin"("admin_uid", "fullname");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_teacher_uid_fullname_key" ON "Teacher"("teacher_uid", "fullname");

-- AddForeignKey
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_created_by_admin_uid_created_by_admin_fullnam_fkey" FOREIGN KEY ("created_by_admin_uid", "created_by_admin_fullname") REFERENCES "Admin"("admin_uid", "fullname") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_created_by_teacher_uid_created_by_teacher_ful_fkey" FOREIGN KEY ("created_by_teacher_uid", "created_by_teacher_fullname") REFERENCES "Teacher"("teacher_uid", "fullname") ON DELETE SET NULL ON UPDATE CASCADE;
