const firebaseConfig = {
  apiKey: "AIzaSyD1QB3qaFfkGYq0OWOEAr83V25NAPFwxzs",
  authDomain: "fullmark-2025.firebaseapp.com",
  databaseURL: "https://fullmark-2025-default-rtdb.firebaseio.com",
  projectId: "fullmark-2025",
  storageBucket: "fullmark-2025.firebasestorage.app",
  messagingSenderId: "963956202032",
  appId: "1:963956202032:web:4df914457d79b75dee2bf5"
};

// تهيئة الفايربيس
if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// فحص تسجيل الدخول
const activeCode = localStorage.getItem('activeCode');
const localDeviceId = localStorage.getItem('localDeviceId');

// لو مش في صفحة الدخول، افحص الكود
if (!window.location.href.includes('index.html')) {
    if (!activeCode || !localDeviceId) {
        window.location.href = 'index.html';
    } else {
        const db = firebase.database();
        db.ref('approvedStudents/' + activeCode).once('value').then(snap => {
            const data = snap.val();
            if(!data || data.deviceId !== localDeviceId || data.isBlocked) {
                localStorage.clear();
                window.location.href = 'index.html';
            }
        });
    }
}
