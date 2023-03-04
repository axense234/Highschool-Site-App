// Prisma Client
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const anuntClient = prisma.anunt;
const utlizatorClient = prisma.utilizator;
const setariUtilizatorClient = prisma.setariUtilizator;
const profesorClient = prisma.profesor;

const connectToPostgres = async () => {
  await prisma.$connect();
};

export {
  anuntClient,
  utlizatorClient,
  setariUtilizatorClient,
  connectToPostgres,
  profesorClient,
};
