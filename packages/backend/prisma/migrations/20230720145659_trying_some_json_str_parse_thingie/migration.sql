/*
  Warnings:

  - You are about to drop the `WebPushSubscription` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WebPushSubscriptionKeys` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "WebPushSubscription" DROP CONSTRAINT "WebPushSubscription_subscribed_admin_uid_fkey";

-- DropForeignKey
ALTER TABLE "WebPushSubscription" DROP CONSTRAINT "WebPushSubscription_subscribed_student_uid_fkey";

-- DropForeignKey
ALTER TABLE "WebPushSubscription" DROP CONSTRAINT "WebPushSubscription_subscribed_teacher_uid_fkey";

-- DropForeignKey
ALTER TABLE "WebPushSubscriptionKeys" DROP CONSTRAINT "WebPushSubscriptionKeys_keys_uid_fkey";

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "subscription" TEXT;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "subscription" TEXT;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "subscription" TEXT;

-- DropTable
DROP TABLE "WebPushSubscription";

-- DropTable
DROP TABLE "WebPushSubscriptionKeys";
