-- CreateEnum
CREATE TYPE "Materii" AS ENUM ('MATEMATICA', 'FIZICA', 'CHIMIE', 'INFORMATICA', 'INFORMATICA_OPTIONAL', 'ENGLEZA', 'ROMANA', 'FRANCEZA', 'GERMANA', 'LATINA', 'BIOLOGIE', 'GEOGRAFIE', 'ISTORIE', 'PSIHOLOGIE', 'SPORT', 'DESEN', 'MUZICA', 'RELIGIE');

-- CreateTable
CREATE TABLE "Profesor" (
    "profesor_uid" TEXT NOT NULL,
    "imagineProfilUrl" TEXT NOT NULL DEFAULT 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
    "username" TEXT NOT NULL,
    "profesorDe" "Materii" NOT NULL,
    "descriere" TEXT NOT NULL,

    CONSTRAINT "Profesor_pkey" PRIMARY KEY ("profesor_uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profesor_profesor_uid_key" ON "Profesor"("profesor_uid");
