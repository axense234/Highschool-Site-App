// Prisma Client
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const announcementClient = prisma.announcement;
const adminClient = prisma.admin;
const teacherClient = prisma.teacher;
const studentCatalogueClient = prisma.studentCatalogue;
const studentClient = prisma.student;
const studentCardClient = prisma.studentCard;
const studentCardSectionClient = prisma.studentCardSection;
const absenceClient = prisma.absence;
const gradeClient = prisma.grade;
const bookClient = prisma.book;
const classClient = prisma.class;
const accountCodeClient = prisma.accountCode;
const bookmarkClient = prisma.bookmark;

const connectToPostgres = async () => {
  await prisma.$connect().then(async () => {
    console.log(`Connected to Postgres through Prisma.`);
  });
};

export {
  connectToPostgres,
  announcementClient,
  adminClient,
  teacherClient,
  studentCatalogueClient,
  studentClient,
  studentCardClient,
  studentCardSectionClient,
  absenceClient,
  gradeClient,
  bookClient,
  classClient,
  accountCodeClient,
  bookmarkClient,
};
