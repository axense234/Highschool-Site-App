-- CreateTable
CREATE TABLE "WebPushSubscription" (
    "subscription_uid" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "subscribed_admin_uid" TEXT,
    "subscribed_student_uid" TEXT,
    "subscribed_teacher_uid" TEXT,

    CONSTRAINT "WebPushSubscription_pkey" PRIMARY KEY ("subscription_uid")
);

-- CreateTable
CREATE TABLE "WebPushSubscriptionKeys" (
    "keys_uid" TEXT NOT NULL,
    "subscription_uid" TEXT,
    "p256dh" TEXT NOT NULL,
    "auth" TEXT NOT NULL,

    CONSTRAINT "WebPushSubscriptionKeys_pkey" PRIMARY KEY ("keys_uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "WebPushSubscription_subscription_uid_key" ON "WebPushSubscription"("subscription_uid");

-- CreateIndex
CREATE UNIQUE INDEX "WebPushSubscription_subscribed_admin_uid_key" ON "WebPushSubscription"("subscribed_admin_uid");

-- CreateIndex
CREATE UNIQUE INDEX "WebPushSubscription_subscribed_student_uid_key" ON "WebPushSubscription"("subscribed_student_uid");

-- CreateIndex
CREATE UNIQUE INDEX "WebPushSubscription_subscribed_teacher_uid_key" ON "WebPushSubscription"("subscribed_teacher_uid");

-- CreateIndex
CREATE UNIQUE INDEX "WebPushSubscriptionKeys_keys_uid_key" ON "WebPushSubscriptionKeys"("keys_uid");

-- CreateIndex
CREATE UNIQUE INDEX "WebPushSubscriptionKeys_subscription_uid_key" ON "WebPushSubscriptionKeys"("subscription_uid");

-- AddForeignKey
ALTER TABLE "WebPushSubscription" ADD CONSTRAINT "WebPushSubscription_subscribed_admin_uid_fkey" FOREIGN KEY ("subscribed_admin_uid") REFERENCES "Admin"("admin_uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WebPushSubscription" ADD CONSTRAINT "WebPushSubscription_subscribed_student_uid_fkey" FOREIGN KEY ("subscribed_student_uid") REFERENCES "Student"("student_uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WebPushSubscription" ADD CONSTRAINT "WebPushSubscription_subscribed_teacher_uid_fkey" FOREIGN KEY ("subscribed_teacher_uid") REFERENCES "Teacher"("teacher_uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WebPushSubscriptionKeys" ADD CONSTRAINT "WebPushSubscriptionKeys_keys_uid_fkey" FOREIGN KEY ("keys_uid") REFERENCES "WebPushSubscription"("subscription_uid") ON DELETE RESTRICT ON UPDATE CASCADE;
