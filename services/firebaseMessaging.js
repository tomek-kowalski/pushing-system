import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "",
  authDomain: "pushing-system.firebaseapp.com",
  projectId: "pushing-system",
  storageBucket: "pushing-system.firebasestorage.app",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};


const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestPermission = async () => {
  console.log("Requesting permission...");
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    console.log("Notification permission granted.");
    return getFCMToken();
  } else {
    console.log("Permission denied.");
    return null;
  }
};

export const getFCMToken = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey: "",
    });
    if (token) {
      console.log("FCM Token:", token);
      return token;
    } else {
      console.log("No registration token available.");
    }
  } catch (error) {
    console.error("Error retrieving FCM token:", error);
  }
};


onMessage(messaging, (payload) => {
  console.log("Message received:", payload);
});
