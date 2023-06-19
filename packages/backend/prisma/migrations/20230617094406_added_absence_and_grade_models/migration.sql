-- CreateTable
CREATE TABLE "Absence" (
    "absence_uid" TEXT NOT NULL,
    "id" TEXT NOT NULL DEFAULT '',
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reasoned" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Absence_pkey" PRIMARY KEY ("absence_uid")
);

-- CreateTable
CREATE TABLE "Grade" (
    "grade_uid" TEXT NOT NULL,
    "id" TEXT NOT NULL DEFAULT '',
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "value" INTEGER NOT NULL,

    CONSTRAINT "Grade_pkey" PRIMARY KEY ("grade_uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Absence_absence_uid_key" ON "Absence"("absence_uid");

-- CreateIndex
CREATE UNIQUE INDEX "Grade_grade_uid_key" ON "Grade"("grade_uid");
