import { onMessage } from "firebase/messaging";
import { getMessaging } from "firebase/messaging";

const messaging = typeof window !== "undefined" ? getMessaging() : null;

export const onMessageListenerForeground = (callback: any) => {
    if (!messaging) return;

    onMessage(messaging, (payload) => {
        console.log("payload", payload);
        callback(payload);
    });
};