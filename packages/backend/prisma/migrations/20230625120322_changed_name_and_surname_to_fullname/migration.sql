/*
  Warnings:

  - You are about to drop the column `name` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `surname` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `surname` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `surname` on the `Teacher` table. All the data in the column will be lost.
  - Added the required column `fullname` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullname` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullname` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "name",
DROP COLUMN "surname",
ADD COLUMN     "fullname" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "name",
DROP COLUMN "surname",
ADD COLUMN     "fullname" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "name",
DROP COLUMN "surname",
ADD COLUMN     "fullname" TEXT NOT NULL;
