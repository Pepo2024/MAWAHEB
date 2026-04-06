import { db } from './firebase-config.js';
import { ref, push, set } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

const form = document.getElementById('talent-form');
const submitBtn = document.getElementById('submit-btn');
const spinner = document.getElementById('spinner');
const registrationCard = document.getElementById('registration-card');
const successCard = document.getElementById('success-card');

// disable submit initially until fields are filled
submitBtn.disabled = true;

// enable/disable submit button based on inputs (includes year)
function updateSubmitState() {
    const nameVal = document.getElementById('name').value.trim();
    const phoneVal = document.getElementById('phone').value.trim();
    const talentVal = document.getElementById('talent').value.trim();
    const yearVal = (document.getElementById('year') && document.getElementById('year').value.trim()) || '';
    submitBtn.disabled = !(nameVal && phoneVal && talentVal && yearVal);
}

['name','phone','talent','year'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
        el.addEventListener('input', updateSubmitState);
        el.addEventListener('change', updateSubmitState);
    }
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // تشغيل الأنيميشن للتحميل
    submitBtn.disabled = true;
    spinner.style.display = 'inline-block';

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const talent = document.getElementById('talent').value.trim();
    const year = (document.getElementById('year') && document.getElementById('year').value.trim()) || '';

    if (!name || !phone || !talent || !year) {
        // should not happen when button is disabled correctly, but keep check
        alert('رجاءً املأ جميع الحقول.');
        submitBtn.disabled = false;
        spinner.style.display = 'none';
        if (!name) document.getElementById('name').focus();
        else if (!year) document.getElementById('year').focus();
        else if (!talent) document.getElementById('talent').focus();
        else document.getElementById('phone').focus();
        return;
    }

    try {
        // إنشاء مرجع جديد ثم كتابة البيانات، وننتظر انتهاء الكتابة فعلياً
        const listRef = ref(db, 'talents');
        const newRef = push(listRef); // only creates a new key
        const data = {
            name,
            phone,
            talent,
            year,
            timestamp: Date.now()
        };

        await set(newRef, data);
        console.log('Write successful, key:', newRef.key);

        // إعادة ضبط الفورم وإظهار رسالة النجاح بعد تأكد الكتابة
        form.reset();
        // بعد إعادة الضبط نعيد تعطيل الزر حتى يعيد المستخدم ملء الحقول
        submitBtn.disabled = true;
        spinner.style.display = 'none';
        registrationCard.classList.add('hidden');
        successCard.classList.remove('hidden');

    } catch (error) {
        console.error('Error writing to database:', error);
        alert('حدث خطأ أثناء التسجيل، يرجى المحاولة مرة أخرى.');
        submitBtn.disabled = false;
        spinner.style.display = 'none';
    }
});