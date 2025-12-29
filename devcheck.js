/* ============================================================
   devcheck.js - نظام حظر الأجهزة (Device Ban System)
   ============================================================ */

// استيراد مكتبات Firebase الحديثة (Modular)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js';
import { getDatabase, ref, get } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js';

// 1. إعدادات Firebase الخاصة بمنصتك (thanawy-1383)
const firebaseConfig = {
    apiKey: "AIzaSyBK6FZF3LW83qaUHBKYTfiVd2Ozrd1Rf2g",
    authDomain: "thanawy-1383.firebaseapp.com",
    databaseURL: "https://thanawy-1383-default-rtdb.firebaseio.com",
    projectId: "thanawy-1383",
    storageBucket: "thanawy-1383.firebasestorage.app",
    messagingSenderId: "1026664406457",
    appId: "1:1026664406457:web:87d71f7e41bef36ba0aa68",
    measurementId: "G-J5R2EFM2D0"
};

// تهيئة التطبيق
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ثوابت النظام
const BLOCKED_DEVICES_PATH = 'blockedDevices'; // اسم الجدول في الداتا بيز
const DEVICE_ID_KEY = 'localDeviceId'; // المفتاح المحفوظ في جهاز الطالب

/**
 * دالة التحقق من الحظر وإعادة التوجيه
 */
async function checkDeviceBlockStatusAndRedirect() {
    
    // 🚨 حماية هامة: لو إحنا أصلاً في صفحة الحظر، وقف الكود عشان ميعملش Loop
    if (window.location.href.includes("block.html")) {
        return;
    }

    // 1. قراءة كود الجهاز من الذاكرة المحلية
    const currentDeviceId = localStorage.getItem(DEVICE_ID_KEY);

    // لو مفيش كود جهاز (لسه مسجلش دخول)، عديها ومتحظرش حد بالغلط
    if (!currentDeviceId || typeof currentDeviceId !== 'string' || currentDeviceId.trim() === "") {
        return;
    }
    
    const deviceIdKey = currentDeviceId.trim();
    // مرجع للبحث في الداتا بيز: blockedDevices/CODE_XYZ
    const deviceRef = ref(db, `${BLOCKED_DEVICES_PATH}/${deviceIdKey}`);

    try {
        // 2. اسأل الفايربيس: هل الجهاز ده موجود في قائمة المحظورين؟
        const snapshot = await get(deviceRef);

        if (snapshot.exists()) {
            // 🚫 الجهاز محظور!
            console.error(`⛔ هذا الجهاز محظور: ${deviceIdKey}`);
            
            // طرده فوراً لصفحة الحظر (استبدال الرابط لمنع الرجوع)
            window.location.replace('block.html'); 
        } else {
            // ✅ الجهاز سليم
            // console.log(`✅ الجهاز سليم وغير محظور.`);
        }

    } catch (error) {
        // لو حصل خطأ في النت، متعملش حاجة وسيب الطالب يكمل عشان منظلمش حد
        console.error("⚠️ خطأ في الاتصال بقاعدة بيانات الحظر:", error.message);
    }
}

// تنفيذ التحقق فوراً عند تحميل الملف
checkDeviceBlockStatusAndRedirect();
