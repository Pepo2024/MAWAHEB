import { db } from './firebase-config.js';
import { collection, getDocs, orderBy, query } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const tableBody = document.getElementById('users-table-body');
const loadingText = document.getElementById('loading-data');

async function fetchTalents() {
    try {
        // ترتيب البيانات من الأحدث للأقدم
        const q = query(collection(db, "talents"), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);
        
        loadingText.style.display = 'none';

        if (querySnapshot.empty) {
            tableBody.innerHTML = '<tr><td colspan="4" style="text-align:center;">لا يوجد مسجلين حتى الآن</td></tr>';
            return;
        }

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            
            // تحويل الوقت من فايربيس لوقت مفهوم
            let timeString = 'غير محدد';
            if(data.timestamp) {
                const date = data.timestamp.toDate();
                timeString = date.toLocaleDateString('ar-EG') + ' - ' + date.toLocaleTimeString('ar-EG');
            }

            // إنشاء الصفوف في الجدول
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${data.name}</td>
                <td><a href="tel:${data.phone}" dir="ltr">${data.phone}</a></td>
                <td><strong>${data.talent}</strong></td>
                <td>${timeString}</td>
            `;
            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error("Error getting documents: ", error);
        loadingText.innerHTML = "حدث خطأ في جلب البيانات. تأكد من إعدادات قاعدة البيانات.";
    }
}

// تشغيل الدالة فور فتح صفحة الآدمن
fetchTalents();