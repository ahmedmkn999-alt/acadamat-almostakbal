
/* ============================================================
   auth.js - نظام الحماية والتحقق من الأكواد (Firebase)
   ============================================================ */

(function() { // تشغيل الكود في بيئة معزولة لحماية المتغيرات

    // 🚨 1. إعدادات Firebase (نفس إعداداتك)
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

    // 🚨 2. الصفحة التي يتم الرجوع إليها عند الخطأ
    // خليناها index.html عشان تشتغل معاك محلي وعالمي
    const LOGIN_PAGE_URL = "index.html"; 

    // --- دالة الخروج والتوجيه ---
    function forceLogout(reason) {
        console.warn("⛔ تم تسجيل الخروج بسبب: " + reason);
        // مسح البيانات المسجلة عشان ميحصلش تعليق
        localStorage.removeItem('activeCode');
        localStorage.removeItem('localDeviceId');
        localStorage.removeItem('studentName'); // لو بتسجل الاسم امسحه كمان
        
        // توجيه المستخدم لصفحة الدخول
        window.location.replace(LOGIN_PAGE_URL);
    }

    // --- التأكد من تحميل مكتبة Firebase ---
    if (typeof firebase === 'undefined') {
        console.error("خطأ: مكتبة Firebase لم يتم تحميلها في ملف HTML");
        // ممكن هنا نوقف الكود أو نعرض رسالة، بس هنسيبه يكمل يمكن تتحمل
    } else {
        if (firebase.apps.length === 0) {
            firebase.initializeApp(firebaseConfig);
        }
    }

    // *******************************************************************
    // بداية عملية التحقق (Logic)
    // *******************************************************************

    const activeCode = localStorage.getItem('activeCode');
    const localDeviceId = localStorage.getItem('localDeviceId');

    // 3. الفحص المبدئي: هل يوجد كود محفوظ؟
    if (!activeCode || !localDeviceId) {
        // لو مفيش كود، والمستخدم مش في صفحة الدخول أصلاً -> نرجعه للدخول
        if (!window.location.href.includes("index.html")) {
            forceLogout("بيانات الدخول غير موجودة");
        }
        return; // وقف الكود هنا لو مفيش بيانات
    }

    // 4. التحقق من السيرفر (Server-Side Verification)
    const db = firebase.database();

    async function verifyCodeOnServer(code) {
        try {
            console.log("جارٍ التحقق من الكود: " + code);
            
            // قراءة البيانات مرة واحدة
            const snapshot = await db.ref('approvedStudents/' + code).once('value');
            const data = snapshot.val();
            const now = Date.now();

            // أ. الكود غير موجود في قاعدة البيانات
            if (!data) {
                forceLogout("الكود غير صحيح أو تم حذفه");
                return;
            }

            // ب. الكود منتهي الصلاحية
            if (data.expiry && data.expiry <= now) {
                forceLogout("عفواً، انتهت صلاحية اشتراكك");
                return;
            }
            
            // ج. الكود محظور
            if (data.isBlocked === true) {
                forceLogout("تم حظر هذا الحساب من الإدارة");
                return;
            }
            
            // د. التحقق من الجهاز (Device Fingerprint)
            const storedDeviceId = data.deviceId;
            
            // لو الكود جديد ومش مربوط بجهاز، نربطه بالجهاز ده حالاً
            if (!storedDeviceId) {
                await db.ref('approvedStudents/' + code).update({ deviceId: localDeviceId });
                console.log("✅ تم ربط الكود بهذا الجهاز لأول مرة");
            } 
            // لو مربوط بجهاز تاني
            else if (storedDeviceId !== localDeviceId) {
                forceLogout("عفواً، هذا الكود مستخدم على جهاز آخر");
                return;
            }

            // ✅ كل شيء تمام
            console.log("✅ تم التحقق بنجاح. أهلاً بك.");
            
            // (اختياري) عرض الكود للطالب في الصفحة لو العنصر موجود
            const codeDisplayElement = document.getElementById('student-display');
            if (codeDisplayElement) {
                // نعرض اسم الطالب لو موجود، أو الكود
                const displayName = data.studentName || "طالب";
                codeDisplayElement.innerText = `👤 ${displayName} | 🔑 ${code}`;
            }

        } catch (error) {
            console.error("خطأ في الاتصال بقاعدة البيانات:", error);
            // في حالة خطأ النت، ممكن نطلعه برة أو نسيبه (حسب رغبتك)
            // forceLogout("خطأ في الاتصال بالخادم"); 
        }
    }

    // تنفيذ التحقق
    verifyCodeOnServer(activeCode);

})();
