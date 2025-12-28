const JSON_URLS = {
    'علمي علوم': "https://plus-teal.vercel.app/organized_output.json",
    'أدبي': "https://plus-teal.vercel.app/organized_output-a.json", 
    'علمي رياضة': "https://platform-sigma-seven.vercel.app/organized_output-e.json"
};

// 🚫 مفاتيح ممنوع تظهر في الكروت
const BLOCKED_KEYS = ['id', 'name', 'created_at', 'updated_at', 'image_url', 'description', 'subjects', 'metadata', 'title'];

let currentData = null; 
let loginTimer = null;

// تشغيل عند فتح الموقع
window.onload = function() {
    createStars();
    checkSavedLogin();
};

// --- 1. نظام الدخول والحفظ ---
function checkSavedLogin() {
    const savedCode = localStorage.getItem('studentCode');
    const savedTrack = localStorage.getItem('studentTrack');

    if (savedCode && savedTrack) {
        // إخفاء الفورم وإظهار الحساب المحفوظ
        document.getElementById('login-form-area').style.display = 'none';
        document.getElementById('saved-account-area').style.display = 'block';
        document.getElementById('saved-info').innerText = `${savedCode} (${savedTrack})`;
        
        // تشغيل العداد
        startCountdown(savedCode, savedTrack);
    }
}

function startCountdown(code, track) {
    let timeLeft = 5;
    const timerElem = document.getElementById('timer-count');
    const barElem = document.getElementById('progress-fill');
    
    // ريست للبار
    barElem.style.width = '100%';
    
    loginTimer = setInterval(() => {
        timeLeft--;
        timerElem.innerText = timeLeft;
        barElem.style.width = (timeLeft * 20) + '%'; // تصغير الشريط
        
        if (timeLeft <= 0) {
            clearInterval(loginTimer);
            performLogin(track, code);
        }
    }, 1000);
}

function autoLogin() {
    const code = localStorage.getItem('studentCode');
    const track = localStorage.getItem('studentTrack');
    if(code) performLogin(track, code);
}

function clearSavedData() {
    clearInterval(loginTimer); // وقف العداد فوراً
    localStorage.removeItem('studentCode');
    localStorage.removeItem('studentTrack');
    
    document.getElementById('saved-account-area').style.display = 'none';
    document.getElementById('login-form-area').style.display = 'block';
}

// زر الدخول اليدوي
document.getElementById('login-btn').addEventListener('click', () => {
    const track = document.getElementById('track-select').value;
    const code = document.getElementById('access-code').value;
    
    if(!code) return alert("اكتب الكود يا بطل");
    
    // حفظ البيانات
    localStorage.setItem('studentCode', code);
    localStorage.setItem('studentTrack', track);
    
    performLogin(track, code);
});

// --- 2. جلب البيانات وتنظيفها ---
async function performLogin(track, code) {
    // لو بنعمل دخول أوتوماتيك نغير نص الكارت
    const loadingText = document.querySelector('.welcome-back') || document.getElementById('login-btn');
    if(loadingText) loadingText.innerText = "جاري تحضير المواد...";

    try {
        const response = await fetch(JSON_URLS[track]);
        let rawData = await response.json();

        // 🧠 الذكاء الاصطناعي للفلترة:
        // 1. لو مصفوفة خد أول عنصر
        if (Array.isArray(rawData)) rawData = rawData[0];

        // 2. دور على المواد جوه المفاتيح المحتملة
        if (rawData.subjects) currentData = rawData.subjects;
        else if (rawData.Subjects) currentData = rawData.Subjects;
        else currentData = rawData; // لو مفيش، خد كله وهنفلتر تحت

        // الانتقال للصفحة
        document.getElementById('login-section').classList.remove('active');
        document.getElementById('content-section').classList.add('active');
        document.getElementById('student-display').innerText = `الشعبة: ${track} | الكود: ${code}`;
        
        renderSubjects();

    } catch (e) {
        console.error(e);
        alert("خطأ في الاتصال! تأكد من النت");
        clearSavedData(); // نرجعه يسجل تاني
    }
}

// --- 3. عرض المحتوى (Rendering) ---
function renderSubjects() {
    const grid = document.getElementById('cards-container');
    grid.innerHTML = "";
    document.getElementById('page-title').innerText = "المواد الدراسية";
    document.getElementById('back-btn').style.display = "none";

    const keys = Object.keys(currentData);
    if(keys.length === 0) grid.innerHTML = "<p>لا توجد مواد.</p>";

    keys.forEach(key => {
        // 🛑 الفلتر: أي مفتاح من القائمة المحظورة أو قيمته مش (مجموعة بيانات) تجاهله
        if(BLOCKED_KEYS.includes(key)) return;
        if(typeof currentData[key] !== 'object' && !Array.isArray(currentData[key])) return;

        createCard(key, "https://cdn-icons-png.flaticon.com/512/3426/3426653.png", () => {
            renderTeachers(currentData[key], renderSubjects);
        });
    });
}

function renderTeachers(data, goBack) {
    const grid = document.getElementById('cards-container');
    grid.innerHTML = "";
    document.getElementById('page-title').innerText = "المدرسين";
    setupBackBtn(goBack);

    // توحيد شكل البيانات (Array ولا Object)
    let list = [];
    if(Array.isArray(data)) list = data;
    else list = Object.keys(data).map(k => typeof data[k] === 'object' ? {name: k, ...data[k]} : {name: k});

    list.forEach(item => {
        let name = item.name || "مدرس";
        let content = item.courses || item;
        if(BLOCKED_KEYS.includes(name)) return;

        createCard(name, "https://cdn-icons-png.flaticon.com/512/1995/1995539.png", () => {
            renderCourses(content, () => renderTeachers(data, goBack));
        });
    });
}

function renderCourses(data, goBack) {
    const grid = document.getElementById('cards-container');
    grid.innerHTML = "";
    document.getElementById('page-title').innerText = "المحاضرات";
    setupBackBtn(goBack);

    let list = [];
    if(Array.isArray(data)) list = data;
    else list = Object.keys(data).map(k => ({name: k, ...data[k]}));

    if(list.length === 0) grid.innerHTML = "<p>لا توجد محاضرات.</p>";

    list.forEach(item => {
        const name = item.name || item.title || item.lesson_name || "محاضرة";
        const link = item.link || item.url || item.video || item.video_url;
        
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<div style="font-size:35px;margin-bottom:5px">📺</div><h3>${name}</h3>`;
        
        if(link) {
            card.onclick = () => playVideo(link, () => renderCourses(data, goBack));
        } else {
            card.style.opacity = "0.5";
            card.innerHTML += "<small>(قريباً)</small>";
        }
        grid.appendChild(card);
    });
}

function playVideo(url, goBack) {
    const grid = document.getElementById('cards-container');
    const id = extractYouTubeID(url);
    if(!id) return alert("الريديو غير متاح");

    grid.innerHTML = `<div class="video-wrapper"><div id="player" data-plyr-provider="youtube" data-plyr-embed-id="${id}"></div></div>`;
    new Plyr('#player', { 
        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
        youtube: { noCookie: true, rel: 0, showinfo: 0, modestbranding: 1 } 
    });
    setupBackBtn(goBack);
}

// دوال مساعدة
function createCard(title, icon, action) {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `<img src="${icon}"><h3>${title}</h3>`;
    div.onclick = action;
    document.getElementById('cards-container').appendChild(div);
}

function setupBackBtn(action) {
    const btn = document.getElementById('back-btn');
    btn.style.display = "block";
    btn.onclick = action;
}

function extractYouTubeID(url) {
    if(!url) return null;
    const match = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
    return (match && match[2].length == 11) ? match[2] : null;
}

function createStars() {
    const c = document.getElementById('stars-container');
    if(!c) return;
    for(let i=0; i<60; i++){
        const s = document.createElement('div');
        s.className = 'star';
        s.style.left = Math.random()*100+'%'; s.style.top = Math.random()*100+'%';
        s.style.width = Math.random()*2+'px'; s.style.height = s.style.width;
        s.style.animationDuration = (Math.random()*3+2)+'s';
        c.appendChild(s);
    }
}
