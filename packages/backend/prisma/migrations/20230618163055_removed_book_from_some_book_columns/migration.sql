/*
  Warnings:

  - You are about to drop the column `book_author` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `book_title` on the `Book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "book_author",
DROP COLUMN "book_title",
ADD COLUMN     "author" TEXT NOT NULL DEFAULT 'Book Author',
ADD COLUMN     "title" TEXT NOT NULL DEFAULT 'Book Title',
ALTER COLUMN "description" SET DEFAULT 'Book Description';
