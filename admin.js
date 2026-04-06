import { db } from './firebase-config.js';
import { ref, onValue, query, orderByChild } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

const recordsList = document.getElementById('records-list');
const loadingText = document.getElementById('loading-data');

async function fetchTalents() {
    try {
        const talentsRef = query(ref(db, "talents"), orderByChild("timestamp"));
        onValue(talentsRef, (snapshot) => {
            loadingText.style.display = 'none';

            if (!snapshot.exists()) {
                recordsList.innerHTML = '<div class="no-records">لا يوجد مسجلين حتى الآن</div>';
                return;
            }

            // اجمع السجلات في مصفوفة ثم رتبها تنازليًا حسب timestamp
            const items = [];
            snapshot.forEach((childSnapshot) => {
                const data = childSnapshot.val();
                items.push(data);
            });

            items.sort((a,b) => (b.timestamp || 0) - (a.timestamp || 0));

            recordsList.innerHTML = '';
            items.forEach((data) => {
                const date = data.timestamp ? new Date(data.timestamp) : null;
                const timeString = date ? date.toLocaleDateString('ar-EG') + ' - ' + date.toLocaleTimeString('ar-EG') : 'غير محدد';

                const card = document.createElement('div');
                card.className = 'record-card';
                card.innerHTML = `
                    <div class="record-head">
                        <div class="rec-name">${data.name}</div>
                        <div class="rec-time">${timeString}</div>
                    </div>
                    <div class="record-body">
                        <div class="rec-row"><strong>الموهبة:</strong> <span>${data.talent || '-'}</span></div>
                        <div class="rec-row"><strong>السنة:</strong> <span>${data.year || '-'}</span></div>
                        <div class="rec-row"><strong>التليفون:</strong> <a href="tel:${data.phone}" dir="ltr">${data.phone}</a></div>
                    </div>
                `;
                recordsList.appendChild(card);
            });
        });

    } catch (error) {
        console.error("Error getting documents: ", error);
        loadingText.innerHTML = "حدث خطأ في جلب البيانات. تأكد من إعدادات قاعدة البيانات.";
    }
}

// تشغيل الدالة فور فتح صفحة الآدمن
fetchTalents();