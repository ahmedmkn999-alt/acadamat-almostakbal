const JSON_URLS = {
    'علمي علوم': "https://plus-teal.vercel.app/organized_output.json",
    'أدبي': "https://plus-teal.vercel.app/organized_output-a.json", 
    'علمي رياضة': "https://platform-sigma-seven.vercel.app/organized_output-e.json"
};
const BLOCKED_KEYS = ['id', 'name', 'created_at', 'updated_at', 'image_url', 'description', 'subjects'];
let currentData = null; 

// --- 1. التحقق عند فتح الصفحة ---
window.onload = function() {
    createStars();
    checkSavedLogin();
};

function checkSavedLogin() {
    const savedCode = localStorage.getItem('studentCode');
    const savedTrack = localStorage.getItem('studentTrack');

    if (savedCode && savedTrack) {
        // إخفاء الفورم العادي وإظهار المنطقة المحفوظة
        document.getElementById('login-form-area').style.display = 'none';
        document.getElementById('saved-account-area').style.display = 'block';
        document.getElementById('saved-code-text').innerText = `${savedCode} (${savedTrack})`;
        
        // بدء العد التنازلي للدخول التلقائي
        startCountdown(savedCode, savedTrack);
    }
}

// دالة الدخول التلقائي (بالضغط أو بعد العداد)
function autoLogin() {
    const savedCode = localStorage.getItem('studentCode');
    const savedTrack = localStorage.getItem('studentTrack');
    if(savedCode) performLogin(savedTrack, savedCode);
}

// دالة مسح البيانات المحفوظة
function clearSavedData() {
    localStorage.removeItem('studentCode');
    localStorage.removeItem('studentTrack');
    // إيقاف أي عداد شغال
    clearTimeout(window.loginTimer); 
    document.getElementById('saved-account-area').style.display = 'none';
    document.getElementById('countdown-msg').style.display = 'none';
    document.getElementById('login-form-area').style.display = 'block';
}

// عداد تنازلي
function startCountdown(code, track) {
    let timeLeft = 5;
    const msg = document.getElementById('countdown-msg');
    const timerSpan = document.getElementById('timer');
    msg.style.display = 'block';

    const interval = setInterval(() => {
        timeLeft--;
        timerSpan.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(interval);
            performLogin(track, code);
        }
    }, 1000);

    // تخزين الـ interval عشان لو الطالب داس "إلغاء" نوقفه
    window.loginTimer = interval; 
}

// --- 2. معالجة زر الدخول اليدوي ---
document.getElementById('login-btn').addEventListener('click', () => {
    const track = document.getElementById('track-select').value;
    const code = document.getElementById('access-code').value;
    if(!code) return alert("من فضلك اكتب الكود");
    
    // حفظ البيانات للمرة القادمة
    localStorage.setItem('studentCode', code);
    localStorage.setItem('studentTrack', track);

    performLogin(track, code);
});

// --- 3. دالة الدخول الرئيسية (Fetch Data) ---
async function performLogin(track, code) {
    const btn = document.getElementById('login-btn');
    // تغيير النص لو الزر ظاهر
    if(btn) btn.innerText = "جاري التحميل...";

    try {
        const response = await fetch(JSON_URLS[track]);
        const rawData = await response.json();

        if (rawData.subjects) currentData = rawData.subjects;
        else currentData = rawData;

        // الانتقال للصفحة التالية
        document.getElementById('login-section').classList.remove('active');
        document.getElementById('content-section').classList.add('active');
        
        document.getElementById('student-display').innerHTML = `
            🎓 الشعبة: <b>${track}</b> | 🔑 الكود: <b>${code}</b>
        `;

        renderSubjects(); 

    } catch (error) {
        console.error(error);
        alert("فشل الاتصال، حاول مرة أخرى");
        if(btn) btn.innerText = "دخول المنصة 🚀";
        // لو فشل الأوتوماتيك نرجع للفورم
        clearSavedData();
    }
}

// --- 4. باقي دوال العرض (بدون تغيير كبير) ---
function createStars() {
    const container = document.getElementById('stars-container');
    if(!container) return;
    for(let i=0; i<80; i++){
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        const size = Math.random() * 3;
        star.style.width = size + 'px'; star.style.height = size + 'px';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        container.appendChild(star);
    }
}

function renderSubjects() {
    const container = document.getElementById('cards-container');
    container.innerHTML = "";
    document.getElementById('page-title').innerText = "المواد الدراسية";
    document.getElementById('back-btn').style.display = "none";

    const keys = Object.keys(currentData);
    keys.forEach(key => {
        if(BLOCKED_KEYS.includes(key) || typeof currentData[key] !== 'object') return;
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<img src="https://cdn-icons-png.flaticon.com/512/3426/3426653.png"><h3>${key}</h3>`;
        card.onclick = () => renderTeachers(currentData[key], renderSubjects);
        container.appendChild(card);
    });
}

function renderTeachers(teachersData, backFunction) {
    const container = document.getElementById('cards-container');
    container.innerHTML = "";
    document.getElementById('page-title').innerText = "اختر المدرس";
    const backBtn = document.getElementById('back-btn');
    backBtn.style.display = "block";
    backBtn.onclick = backFunction;

    let teachersList = teachersData;
    if (!Array.isArray(teachersData) && typeof teachersData === 'object') {
        teachersList = Object.keys(teachersData).map(key => {
            return typeof teachersData[key] === 'object' ? {name: key, ...teachersData[key]} : {name: key};
        });
    }

    if (!teachersList || Object.keys(teachersList).length === 0) {
        container.innerHTML = "<p style='width:100%; text-align:center;'>لا يوجد مدرسين</p>"; return;
    }

    const loopData = Array.isArray(teachersData) ? teachersData : Object.keys(teachersData);
    loopData.forEach(item => {
        let name, content;
        if (typeof item === 'string') { name = item; content = teachersData[item]; }
        else { name = item.name || "مدرس"; content = item.courses || item; }
        if(BLOCKED_KEYS.includes(name)) return;

        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<img src="https://cdn-icons-png.flaticon.com/512/1995/1995539.png"><h3>${name}</h3>`;
        card.onclick = () => renderCourses(content, () => renderTeachers(teachersData, backFunction));
        container.appendChild(card);
    });
}

function renderCourses(coursesData, backFunction) {
    const container = document.getElementById('cards-container');
    container.innerHTML = "";
    document.getElementById('page-title').innerText = "المحاضرات";
    document.getElementById('back-btn').onclick = backFunction;

    let coursesArray = [];
    if (Array.isArray(coursesData)) coursesArray = coursesData;
    else if (typeof coursesData === 'object') coursesArray = Object.keys(coursesData).map(k => ({name: k, ...coursesData[k]}));

    if(coursesArray.length === 0) { container.innerHTML = "<p>لا توجد محاضرات.</p>"; return; }

    coursesArray.forEach(course => {
        const name = course.name || course.title || course.lesson_name || "محاضرة";
        const link = course.link || course.url || course.video_url || course.video;
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<div style="font-size:40px; margin-bottom:10px">📺</div><h3>${name}</h3>`;
        if(link) card.onclick = () => playVideo(link, () => renderCourses(coursesData, backFunction));
        else { card.style.opacity = "0.5"; card.innerHTML += "<small>(غير متاح)</small>"; }
        container.appendChild(card);
    });
}

function playVideo(url, backFunction) {
    const container = document.getElementById('cards-container');
    const videoId = extractYouTubeID(url);
    if(!videoId) return alert("رابط الفيديو غير صالح");

    container.innerHTML = `<div class="video-wrapper"><div id="player" data-plyr-provider="youtube" data-plyr-embed-id="${videoId}"></div></div>`;
    new Plyr('#player', { controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'], youtube: { noCookie: true, rel: 0, showinfo: 0, iv_load_policy: 3, modestbranding: 1 } });
    document.getElementById('back-btn').onclick = backFunction;
}

function extractYouTubeID(url) {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length == 11) ? match[2] : null;
}
