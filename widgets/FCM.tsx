"use client";

import { useEffect, useRef } from "react";
import ToastComponent from "@/widgets/Toast";
import { onMessageListener } from "@/lib/fcm";
import { ToastAction, ToastActionElement } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { initializeFirebaseNotification } from "@/widgets/NotifyPermission";
import { onMessageListenerForeground } from "@/utils/foregroundFCM";
// export default function FirebaseFCM() {
//   useEffect(() => {
//     const userDataString = localStorage.getItem("userData");
//     const userData = JSON.parse(userDataString);
//     async function Ind() {
//       await initializeFirebaseNotification(userData);
//       console.log("quartz");

//       onMessageListener()
//         .then((payload) => {
//           console.log("kya ho tum,mujhe ab batao !");
//           console.log(payload);
//         })
//         .catch((err) => console.log("failed: ", err));

//       onMessageListenerForeground()
//         .then((payload: any) => {
//           console.log("fakfak");

//           toast({
//             title: payload?.notification?.title,
//             description: payload?.notification?.body,
//             action: (
//               <ToastAction altText="Try again">Click Foreground</ToastAction>
//             ),
//           });
//         })
//         .catch((err) => console.log("failed: ", err));
//     }
//     async function initInd() {
//       await initializeFirebaseNotification();
//       console.log("quartz");

//       onMessageListener()
//         .then((payload) => {
//           console.log("kya ho tum,mujhe ab batao !");
//           console.log(payload);
//         })
//         .catch((err) => console.log("failed: ", err));

//       onMessageListenerForeground()
//         .then((payload: any) => {
//           toast({
//             title: payload?.notification?.title,
//             description: payload?.notification?.body,
//             action: (
//               <ToastAction altText="Try again">Click Foreground</ToastAction>
//             ),
//           });
//         })
//         .catch((err) => console.log("failed: ", err));
//     }

//     if (userData) {
//       Ind();
//     } else {
//       initInd();
//     }
//   }, []);
//   const { toast } = useToast();

//   return null;
// }
export default function FirebaseFCM() {
  const { toast } = useToast();

  useEffect(() => {
    const setupListeners = async () => {
      const userDataString = localStorage.getItem("userData") as string;
      const userData = JSON.parse(userDataString);

      await initializeFirebaseNotification(userData);
      console.log("Firebase initialized");

      // Set up background message listener
      onMessageListener()
        .then((payload) => {
          console.log("Background message received: ", payload);
        })
        .catch((err) => console.log("Background listener failed: ", err));

      // Set up continuous foreground message listener
      onMessageListenerForeground((payload: any) => {
        console.log("Foreground message received: ", payload);
        toast({
          title: payload?.notification?.title,
          description: payload?.notification?.body,
          action: (
            <ToastAction altText="Try again">Click Foreground</ToastAction>
          ),
        });
      });
    };

    setupListeners();
  }, [toast]);

  return null;
}
