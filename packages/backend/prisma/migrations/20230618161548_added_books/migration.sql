-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "student_card_uid" SET DEFAULT '';

-- CreateTable
CREATE TABLE "Book" (
    "book_uid" TEXT NOT NULL,
    "id" TEXT NOT NULL DEFAULT '',
    "created_by_teacher_uid" TEXT DEFAULT '',
    "created_by_admin_uid" TEXT DEFAULT '',
    "book_title" TEXT NOT NULL,
    "book_author" TEXT NOT NULL,
    "pdf_file_url" TEXT,
    "description" TEXT NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("book_uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Book_book_uid_key" ON "Book"("book_uid");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_created_by_teacher_uid_fkey" FOREIGN KEY ("created_by_teacher_uid") REFERENCES "Teacher"("teacher_uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_created_by_admin_uid_fkey" FOREIGN KEY ("created_by_admin_uid") REFERENCES "Admin"("admin_uid") ON DELETE SET NULL ON UPDATE CASCADE;
