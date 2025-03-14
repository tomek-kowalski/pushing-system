import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCo5jIEaktZzqMEhhUzZ1Jtdop4OuY8N1Q",
  authDomain: "pushing-system.firebaseapp.com",
  projectId: "pushing-system",
  storageBucket: "pushing-system.firebasestorage.app",
  messagingSenderId: "1096229244533",
  appId: "1:1096229244533:web:10fa97357c5a0f65f1723c",
  measurementId: "G-JDZGB5788D",
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
      vapidKey: "BBJBEJFEKXO2A3-AneWxqz2Vt988UcQzGunCyiHb1bCCSgADvnl0v_wICXgYTP_26FCIZfPbezBxeoa-CeoO03A",
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
