const firebaseConfig = {
  apiKey: "AIzaSyD1QB3qaFfkGYq0OWOEAr83V25NAPFwxzs",
  authDomain: "fullmark-2025.firebaseapp.com",
  databaseURL: "https://fullmark-2025-default-rtdb.firebaseio.com",
  projectId: "fullmark-2025",
  storageBucket: "fullmark-2025.firebasestorage.app",
  messagingSenderId: "963956202032",
  appId: "1:963956202032:web:4df914457d79b75dee2bf5"
};

// 1. تهيئة الفايربيس بشكل آمن
if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// 2. وظيفة فحص تسجيل الدخول
async function checkAuth() {
    const activeCode = localStorage.getItem('activeCode');
    const localDeviceId = localStorage.getItem('localDeviceId');

    // إذا كنا في صفحة الدخول لا نفعل شيئاً
    if (window.location.href.includes('index.html')) return;

    // أ- فحص أولي: لو البيانات مش موجودة أصلاً في المتصفح
    if (!activeCode || !localDeviceId) {
        console.log("بيانات تسجيل الدخول مفقودة");
        window.location.href = 'index.html';
        return;
    }

    // ب- فحص عميق من قاعدة البيانات
    try {
        const db = firebase.database();
        const snap = await db.ref('approvedStudents/' + activeCode).once('value');
        const data = snap.val();

        if (!data) {
            console.error("الكود غير موجود في السيرفر");
            handleAuthError();
        } else if (data.isBlocked) {
            alert("عذراً، هذا الحساب تم حظره");
            handleAuthError();
        } else if (data.deviceId && data.deviceId !== localDeviceId) {
            alert("هذا الحساب مسجل على جهاز آخر");
            handleAuthError();
        }
        // لو كله تمام، الصفحة هتكمل تحميل عادي
    } catch (error) {
        console.error("فشل الاتصال بـ Firebase:", error);
        // في حالة فشل الإنترنت لا نطرد الطالب فوراً، نتركه يحاول مرة أخرى
    }
}

function handleAuthError() {
    localStorage.removeItem('activeCode'); // نمسح الكود فقط ونترك الـ DeviceId
    window.location.href = 'index.html';
}

// تشغيل الفحص
checkAuth();
