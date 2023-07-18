import { WebPushSubscription, WebPushSubscriptionKeys } from "@prisma/client";

export type TemplateWebPushSubscription = WebPushSubscription & {
  keys: WebPushSubscriptionKeys;
};
