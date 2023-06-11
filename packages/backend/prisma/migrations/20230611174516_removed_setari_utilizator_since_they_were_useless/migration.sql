/*
  Warnings:

  - You are about to drop the `SetariUtilizator` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SetariUtilizator" DROP CONSTRAINT "SetariUtilizator_utilizator_uid_fkey";

-- DropTable
DROP TABLE "SetariUtilizator";
