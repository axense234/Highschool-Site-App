/*
  Warnings:

  - You are about to drop the column `subscription` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `subscription` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `subscription` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `user_uid` on the `WebPushSubscription` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[created_by_admin_uid]` on the table `WebPushSubscription` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[created_by_teacher_uid]` on the table `WebPushSubscription` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[created_by_student_uid]` on the table `WebPushSubscription` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "WebPushSubscription_user_uid_key";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "subscription";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "subscription";

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "subscription";

-- AlterTable
ALTER TABLE "WebPushSubscription" DROP COLUMN "user_uid",
ADD COLUMN     "created_by_admin_uid" TEXT,
ADD COLUMN     "created_by_student_uid" TEXT,
ADD COLUMN     "created_by_teacher_uid" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "WebPushSubscription_created_by_admin_uid_key" ON "WebPushSubscription"("created_by_admin_uid");

-- CreateIndex
CREATE UNIQUE INDEX "WebPushSubscription_created_by_teacher_uid_key" ON "WebPushSubscription"("created_by_teacher_uid");

-- CreateIndex
CREATE UNIQUE INDEX "WebPushSubscription_created_by_student_uid_key" ON "WebPushSubscription"("created_by_student_uid");

-- AddForeignKey
ALTER TABLE "WebPushSubscription" ADD CONSTRAINT "WebPushSubscription_created_by_admin_uid_fkey" FOREIGN KEY ("created_by_admin_uid") REFERENCES "Admin"("admin_uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WebPushSubscription" ADD CONSTRAINT "WebPushSubscription_created_by_teacher_uid_fkey" FOREIGN KEY ("created_by_teacher_uid") REFERENCES "Teacher"("teacher_uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WebPushSubscription" ADD CONSTRAINT "WebPushSubscription_created_by_student_uid_fkey" FOREIGN KEY ("created_by_student_uid") REFERENCES "Student"("student_uid") ON DELETE SET NULL ON UPDATE CASCADE;
