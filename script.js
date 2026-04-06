import { db } from './firebase-config.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const form = document.getElementById('talent-form');
const submitBtn = document.getElementById('submit-btn');
const spinner = document.getElementById('spinner');
const registrationCard = document.getElementById('registration-card');
const successCard = document.getElementById('success-card');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // تشغيل الأنيميشن للتحميل
    submitBtn.disabled = true;
    spinner.style.display = 'inline-block';

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const talent = document.getElementById('talent').value;

    try {
        // إضافة البيانات لفايربيس
        await addDoc(collection(db, "talents"), {
            name: name,
            phone: phone,
            talent: talent,
            timestamp: serverTimestamp()
        });

        // إخفاء الفورم وإظهار رسالة النجاح ولينك الواتس
        registrationCard.classList.add('hidden');
        successCard.classList.remove('hidden');

    } catch (error) {
        console.error("Error adding document: ", error);
        alert("حدث خطأ أثناء التسجيل، يرجى المحاولة مرة أخرى.");
        submitBtn.disabled = false;
        spinner.style.display = 'none';
    }
});