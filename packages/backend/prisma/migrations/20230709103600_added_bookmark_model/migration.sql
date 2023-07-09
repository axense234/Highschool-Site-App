-- CreateEnum
CREATE TYPE "BookmarkType" AS ENUM ('SPECIAL', 'NORMAL', 'DEFAULT');

-- CreateTable
CREATE TABLE "Bookmark" (
    "bookmark_uid" TEXT NOT NULL,
    "id" TEXT NOT NULL DEFAULT '',
    "admin_uid" TEXT,
    "teacher_uid" TEXT,
    "student_uid" TEXT,
    "dest" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "type" "BookmarkType" NOT NULL,

    CONSTRAINT "Bookmark_pkey" PRIMARY KEY ("bookmark_uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bookmark_bookmark_uid_key" ON "Bookmark"("bookmark_uid");

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_admin_uid_fkey" FOREIGN KEY ("admin_uid") REFERENCES "Admin"("admin_uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_teacher_uid_fkey" FOREIGN KEY ("teacher_uid") REFERENCES "Teacher"("teacher_uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_student_uid_fkey" FOREIGN KEY ("student_uid") REFERENCES "Student"("student_uid") ON DELETE SET NULL ON UPDATE CASCADE;
