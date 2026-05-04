import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: 請替換為您在 Firebase 控制台的專案設定！
// (前往 Firebase 控制台 -> 專案設定 -> 一般 -> 網頁應用程式)
const firebaseConfig = {
  apiKey: "AIzaSyBWcgI0vwLBtey0907lW-R_5Rha9URsEc8",
  authDomain: "network-79464.firebaseapp.com",
  projectId: "network-79464",
  storageBucket: "network-79464.firebasestorage.app",
  messagingSenderId: "857595432846",
  appId: "1:857595432846:web:37d0245fe7424a1cafdedf",
  measurementId: "G-DVMLFT47BZ"
};

let app, db: any;
try {
  // 防呆檢查：如果還沒填寫金鑰，使用模擬模式以避免畫面崩潰
  if (firebaseConfig.apiKey !== "YOUR_API_KEY") {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log("Firebase initialized successfully");
  } else {
    console.warn("⚠️ 尚未設定 Firebase 金鑰！請至 src/firebase.ts 填寫 firebaseConfig，目前暫時使用 localStorage 備用模式。");
    db = { mock: true };
  }
} catch (error) {
  console.error("Firebase initialization error", error);
  db = { mock: true };
}

export { db, app };
