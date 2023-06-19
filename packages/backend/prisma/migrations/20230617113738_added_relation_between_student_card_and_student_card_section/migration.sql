/*
  Warnings:

  - The primary key for the `StudentCard` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `card_uid` on the `StudentCard` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[student_card_uid]` on the table `StudentCard` will be added. If there are existing duplicate values, this will fail.
  - The required column `student_card_uid` was added to the `StudentCard` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `student_card_uid` to the `StudentCardSection` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "StudentCard_card_uid_key";

-- AlterTable
ALTER TABLE "StudentCard" DROP CONSTRAINT "StudentCard_pkey",
DROP COLUMN "card_uid",
ADD COLUMN     "student_card_uid" TEXT NOT NULL,
ADD CONSTRAINT "StudentCard_pkey" PRIMARY KEY ("student_card_uid");

-- AlterTable
ALTER TABLE "StudentCardSection" ADD COLUMN     "student_card_uid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "StudentCard_student_card_uid_key" ON "StudentCard"("student_card_uid");

-- AddForeignKey
ALTER TABLE "StudentCardSection" ADD CONSTRAINT "StudentCardSection_student_card_uid_fkey" FOREIGN KEY ("student_card_uid") REFERENCES "StudentCard"("student_card_uid") ON DELETE RESTRICT ON UPDATE CASCADE;
