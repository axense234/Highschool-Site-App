-- CreateTable
CREATE TABLE "WebPushSubscription" (
    "subscription_uid" TEXT NOT NULL,
    "id" TEXT NOT NULL DEFAULT '',
    "endpoint" TEXT NOT NULL,
    "auth" TEXT NOT NULL,
    "p256dh" TEXT NOT NULL,
    "user_uid" TEXT NOT NULL,

    CONSTRAINT "WebPushSubscription_pkey" PRIMARY KEY ("subscription_uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "WebPushSubscription_subscription_uid_key" ON "WebPushSubscription"("subscription_uid");

-- CreateIndex
CREATE UNIQUE INDEX "WebPushSubscription_endpoint_key" ON "WebPushSubscription"("endpoint");

-- CreateIndex
CREATE UNIQUE INDEX "WebPushSubscription_user_uid_key" ON "WebPushSubscription"("user_uid");
