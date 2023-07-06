-- CreateTable
CREATE TABLE "AccountCode" (
    "code_uid" TEXT NOT NULL,
    "id" TEXT NOT NULL DEFAULT '',
    "value" TEXT NOT NULL,

    CONSTRAINT "AccountCode_pkey" PRIMARY KEY ("code_uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "AccountCode_code_uid_key" ON "AccountCode"("code_uid");

-- CreateIndex
CREATE UNIQUE INDEX "AccountCode_value_key" ON "AccountCode"("value");
