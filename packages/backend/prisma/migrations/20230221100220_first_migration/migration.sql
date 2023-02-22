-- CreateEnum
CREATE TYPE "RolUtilizator" AS ENUM ('ADMIN', 'PROFESOR', 'UTILIZATOR');

-- CreateTable
CREATE TABLE "Anunt" (
    "anunt_uid" TEXT NOT NULL,
    "titlu" TEXT NOT NULL,
    "descriere" TEXT NOT NULL,
    "imagineUrl" TEXT,
    "videoUrl" TEXT,
    "pozitionareVideoInAnunt" TEXT DEFAULT 'mijloc',
    "creatDe" TEXT,

    CONSTRAINT "Anunt_pkey" PRIMARY KEY ("anunt_uid")
);

-- CreateTable
CREATE TABLE "SetariUtilizator" (
    "setari_uid" TEXT NOT NULL,
    "utilizator_uid" TEXT NOT NULL,

    CONSTRAINT "SetariUtilizator_pkey" PRIMARY KEY ("setari_uid")
);

-- CreateTable
CREATE TABLE "Utilizator" (
    "utilizator_uid" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rolUtilizator" "RolUtilizator" NOT NULL DEFAULT 'UTILIZATOR',

    CONSTRAINT "Utilizator_pkey" PRIMARY KEY ("utilizator_uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Anunt_anunt_uid_key" ON "Anunt"("anunt_uid");

-- CreateIndex
CREATE UNIQUE INDEX "SetariUtilizator_setari_uid_key" ON "SetariUtilizator"("setari_uid");

-- CreateIndex
CREATE UNIQUE INDEX "SetariUtilizator_utilizator_uid_key" ON "SetariUtilizator"("utilizator_uid");

-- CreateIndex
CREATE UNIQUE INDEX "Utilizator_utilizator_uid_key" ON "Utilizator"("utilizator_uid");

-- CreateIndex
CREATE UNIQUE INDEX "Utilizator_username_key" ON "Utilizator"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Utilizator_email_key" ON "Utilizator"("email");

-- AddForeignKey
ALTER TABLE "Anunt" ADD CONSTRAINT "Anunt_creatDe_fkey" FOREIGN KEY ("creatDe") REFERENCES "Utilizator"("utilizator_uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SetariUtilizator" ADD CONSTRAINT "SetariUtilizator_utilizator_uid_fkey" FOREIGN KEY ("utilizator_uid") REFERENCES "Utilizator"("utilizator_uid") ON DELETE RESTRICT ON UPDATE CASCADE;
