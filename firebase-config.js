// استيراد أدوات الفايربيس من السيرفر الرسمي
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// ضع كود الإعدادات الخاص بك من Firebase هنا
const firebaseConfig = {
  apiKey: "AIzaSyDYT-BW9faoG6v3y_E8WF8smm608v43veo",
  authDomain: "mahragan-c3f08.firebaseapp.com",
  databaseURL: "https://mahragan-c3f08-default-rtdb.firebaseio.com",
  projectId: "mahragan-c3f08",
  storageBucket: "mahragan-c3f08.firebasestorage.app",
  messagingSenderId: "596504243115",
  appId: "1:596504243115:web:e961fb777b264a90c340ee",
  measurementId: "G-42CNW2LGZG"
};

// تهيئة قاعدة البيانات
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// تصدير db عشان نستخدمها في باقي الملفات بشكل آمن ومنفصل
export { db };