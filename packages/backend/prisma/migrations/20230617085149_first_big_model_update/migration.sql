/*
  Warnings:

  - You are about to drop the `Anunt` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profesor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Utilizator` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Subjects" AS ENUM ('MATEMATICA', 'FIZICA', 'CHIMIE', 'INFORMATICA', 'INFORMATICA_OPTIONAL', 'ENGLEZA', 'ROMANA', 'FRANCEZA', 'GERMANA', 'LATINA', 'BIOLOGIE', 'GEOGRAFIE', 'ISTORIE', 'PSIHOLOGIE', 'SPORT', 'DESEN', 'MUZICA', 'RELIGIE');

-- CreateEnum
CREATE TYPE "AnnouncementCategory" AS ENUM ('GENERALE', 'SPECIALE', 'PROFESORI', 'ELEVI');

-- CreateEnum
CREATE TYPE "VideoPozition" AS ENUM ('INCEPUT', 'FINAL');

-- DropTable
DROP TABLE "Anunt";

-- DropTable
DROP TABLE "Profesor";

-- DropTable
DROP TABLE "Utilizator";

-- DropEnum
DROP TYPE "CategorieAnunt";

-- DropEnum
DROP TYPE "Materii";

-- DropEnum
DROP TYPE "RolUtilizator";

-- CreateTable
CREATE TABLE "Announcement" (
    "announcement_uid" TEXT NOT NULL,
    "id" TEXT NOT NULL DEFAULT '',
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "AnnouncementCategory" NOT NULL DEFAULT 'GENERALE',
    "img_url" TEXT,
    "video_url" TEXT,
    "video_pozition" "VideoPozition" DEFAULT 'INCEPUT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Announcement_pkey" PRIMARY KEY ("announcement_uid")
);

-- CreateTable
CREATE TABLE "Admin" (
    "admin_uid" TEXT NOT NULL,
    "id" TEXT NOT NULL DEFAULT '',
    "profile_img_url" TEXT NOT NULL DEFAULT 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("admin_uid")
);

-- CreateTable
CREATE TABLE "Student" (
    "student_uid" TEXT NOT NULL,
    "id" TEXT NOT NULL DEFAULT '',
    "profile_img_url" TEXT NOT NULL DEFAULT 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("student_uid")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "teacher_uid" TEXT NOT NULL,
    "id" TEXT NOT NULL DEFAULT '',
    "profile_img_url" TEXT NOT NULL DEFAULT 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
    "subject" "Subjects" NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("teacher_uid")
);

-- CreateTable
CREATE TABLE "StudentCatalogue" (
    "catalogue_uid" TEXT NOT NULL,
    "id" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "StudentCatalogue_pkey" PRIMARY KEY ("catalogue_uid")
);

-- CreateTable
CREATE TABLE "StudentCard" (
    "card_uid" TEXT NOT NULL,
    "id" TEXT NOT NULL DEFAULT '',
    "catalogue_uid" TEXT,

    CONSTRAINT "StudentCard_pkey" PRIMARY KEY ("card_uid")
);

-- CreateTable
CREATE TABLE "StudentCardSection" (
    "card_section_uid" TEXT NOT NULL,
    "id" TEXT NOT NULL DEFAULT '',
    "subject" "Subjects" NOT NULL,
    "grades" TEXT[],
    "absences" TEXT[],

    CONSTRAINT "StudentCardSection_pkey" PRIMARY KEY ("card_section_uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Announcement_announcement_uid_key" ON "Announcement"("announcement_uid");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_admin_uid_key" ON "Admin"("admin_uid");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_student_uid_key" ON "Student"("student_uid");

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_teacher_uid_key" ON "Teacher"("teacher_uid");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_email_key" ON "Teacher"("email");

-- CreateIndex
CREATE UNIQUE INDEX "StudentCatalogue_catalogue_uid_key" ON "StudentCatalogue"("catalogue_uid");

-- CreateIndex
CREATE UNIQUE INDEX "StudentCard_card_uid_key" ON "StudentCard"("card_uid");

-- CreateIndex
CREATE UNIQUE INDEX "StudentCardSection_card_section_uid_key" ON "StudentCardSection"("card_section_uid");

-- AddForeignKey
ALTER TABLE "StudentCard" ADD CONSTRAINT "StudentCard_catalogue_uid_fkey" FOREIGN KEY ("catalogue_uid") REFERENCES "StudentCatalogue"("catalogue_uid") ON DELETE SET NULL ON UPDATE CASCADE;
