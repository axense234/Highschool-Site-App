/*
  Warnings:

  - Made the column `image_url` on table `Class` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Class" ALTER COLUMN "image_url" SET NOT NULL,
ALTER COLUMN "image_url" SET DEFAULT 'https://res.cloudinary.com/birthdayreminder/image/upload/v1685015242/Highschool%20Site%20App/ltibp_logo_ptonmd.png';
