"use client";
import { messaging } from "@/lib/fcm"
import { getToken, onMessage } from "firebase/messaging";

function topicOnMessageHandler(message: any) {
    console.log(message);
}
interface Userdata {
    id: string,
    token: string,
    topic?: string
}
export async function initializeFirebaseNotification() {
    const permission = await Notification.requestPermission();
    if (permission != "granted") {
        console.log("is permission in notifyPermission" + permission);
        return false;
    } else {
        // getAndStoreToken();
        subscribeToTopic("testing", topicOnMessageHandler)
        return true;
    }
}

async function getAndStoreToken(token: string) {
    const userDataString = localStorage.getItem("userData") as string;
    const userData = JSON.parse(userDataString);



    let extraBody = {}
    if (userData) {
        extraBody = { userId: userData?.id, topic: userData?.topic }
    }
    else {
        extraBody = { init: true }
    }
    try {
        const response = await fetch("http://139.59.26.241/fcm/store", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({ fcm_token: token, ...extraBody }),
        });

        const data = await response.json();
        console.log("data ", data);
        localStorage.setItem("userData", JSON.stringify(data))
        return data;
    } catch (err: any) {
        console.error(err?.message);
        // throw Error(
        //     "this is error in notifyPermission ke function - getAndStoreToken mein !",
        // );
    }
}





export const subscribeToTopic = async (topicName: any, handler = (payload: any) => { }) => {
    const token = await getToken(messaging!!, {
        vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
    });

    if (token) {
        getAndStoreToken(token)
        // return fetch({
        //     url: topicURL,
        //     method: "POST",
        //     headers: {
        //         Authorization: `key=${FIREBASE_API_KEY}`,
        //     },
        // })
        //     .then((response) => {
        //         onMessage(
        //             (payload) => {
        //                 handler(payload);
        //             },
        //             (error: any) => {
        //                 console.log(error);
        //             }
        //         );
        //         getAndStoreToken(token)
        //     })
        //     .catch(() => {
        //         console.error(`Can't subscribe to ${topicName} topic`);
        //     });
    }
}