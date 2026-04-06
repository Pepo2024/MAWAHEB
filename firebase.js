// استيراد أدوات الفايربيس من السيرفر الرسمي
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

// ضع كود الإعدادات الخاص بك من Firebase هنا
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// تهيئة قاعدة البيانات
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// تصدير db عشان نستخدمها في باقي الملفات بشكل آمن ومنفصل
export { db };