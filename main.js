/* =========================================
   كود التشغيل والمنطق
   ========================================= */

// جمل تتغير بتأثير الكتابة (Typewriter)
const MESSAGES = [
    "حلمك يستاهل تعبك..",
    "النجاح قرار وليس صدفة..",
    "عافر هتوصل..",
    "دفعة 2026 أبطال.."
];

let currentData = null;
let msgIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeSpeed = 100;
const deleteSpeed = 50;
const delayBetween = 2000;

window.onload = function() {
    createStars();
    typeWriterEffect();
};

// تأثير الكتابة المتحركة
function typeWriterEffect() {
    const textElement = document.getElementById("typewriter-text");
    const currentMsg = MESSAGES[msgIndex];
    
    if (isDeleting) {
        textElement.innerText = currentMsg.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.innerText = currentMsg.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentMsg.length) {
        speed = delayBetween;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        msgIndex = (msgIndex + 1) % MESSAGES.length;
        speed = 500;
    }

    setTimeout(typeWriterEffect, speed);
}

// زر الدخول
document.getElementById('login-btn').addEventListener('click', () => {
    const track = document.getElementById('track-select').value;
    const code = document.getElementById('access-code').value;

    if(!code || code.length < 1) {
        return alert("من فضلك اكتب أي كود للدخول!");
    }

    // فحص تحميل الملفات (عشان نحل مشكلة 'مش راضي يخش')
    try {
        if (track === 'science') {
            if (typeof SCIENCE_DATA === 'undefined') throw new Error();
            currentData = SCIENCE_DATA;
        } 
        else if (track === 'math') {
            if (typeof MATH_DATA === 'undefined') throw new Error();
            currentData = MATH_DATA;
        } 
        else if (track === 'lit') {
            if (typeof LIT_DATA === 'undefined') throw new Error();
            currentData = LIT_DATA;
        }
    } catch (e) {
        alert("خطأ: ملف بيانات الشعبة غير موجود! تأكد من وجود ملفات (1_science.js, 2_math.js, 3_lit.js) في نفس المجلد.");
        return;
    }

    // الانتقال للصفحة
    document.getElementById('login-section').classList.remove('active');
    document.getElementById('content-section').classList.add('active');
    
    const trackName = track === 'science' ? 'علمي علوم' : track === 'math' ? 'علمي رياضة' : 'أدبي';
    document.getElementById('student-display').innerHTML = `👤 ${trackName} <span style="color:#666">|</span> 🔑 ${code}`;

    renderSubjects();
});

// عرض المواد
function renderSubjects() {
    const grid = document.getElementById('cards-container');
    grid.innerHTML = "";
    document.getElementById('page-title').innerText = "المواد الدراسية";
    document.getElementById('back-btn').style.display = "none";

    Object.keys(currentData).forEach(subject => {
        createCard(subject, "https://cdn-icons-png.flaticon.com/512/3426/3426653.png", () => {
            renderTeachers(currentData[subject], renderSubjects);
        });
    });
}

// عرض المدرسين
function renderTeachers(teachers, goBack) {
    const grid = document.getElementById('cards-container');
    grid.innerHTML = "";
    document.getElementById('page-title').innerText = "المدرسين";
    setupBack(goBack);

    Object.keys(teachers).forEach(teacher => {
        createCard(teacher, "https://cdn-icons-png.flaticon.com/512/1995/1995539.png", () => {
            renderCourses(teachers[teacher], () => renderTeachers(teachers, goBack));
        });
    });
}

// عرض الفيديوهات
function renderCourses(courses, goBack) {
    const grid = document.getElementById('cards-container');
    grid.innerHTML = "";
    document.getElementById('page-title').innerText = "المحاضرات";
    setupBack(goBack);

    if(courses.length === 0) grid.innerHTML = "<p style='width:100%;text-align:center'>لا توجد محاضرات حالياً</p>";

    courses.forEach(course => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `<div style="font-size:35px;margin-bottom:10px">📺</div><h3>${course.name}</h3>`;
        div.onclick = () => playVideo(course.link, () => renderCourses(courses, goBack));
        grid.appendChild(div);
    });
}

// تشغيل الفيديو
function playVideo(url, goBack) {
    const grid = document.getElementById('cards-container');
    const id = extractYouTubeID(url);
    
    if(!id) {
        alert("عفواً، رابط الفيديو غير متاح حالياً");
        return;
    }

    grid.innerHTML = `<div class="video-wrapper"><div id="player" data-plyr-provider="youtube" data-plyr-embed-id="${id}"></div></div>`;
    new Plyr('#player', { controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'], youtube: { noCookie: true, rel: 0, showinfo: 0, modestbranding: 1 } });
    setupBack(goBack);
}

// أدوات مساعدة
function createCard(title, icon, action) {
    const d = document.createElement('div');
    d.className = 'card';
    d.innerHTML = `<img src="${icon}"><h3>${title}</h3>`;
    d.onclick = action;
    document.getElementById('cards-container').appendChild(d);
}

function setupBack(action) {
    const b = document.getElementById('back-btn');
    b.style.display = "block";
    b.onclick = action;
}

function createStars() {
    const container = document.getElementById('stars-container');
    if(!container) return;
    for(let i=0; i<80; i++){
        const s = document.createElement('div');
        s.className = 'star';
        s.style.left = Math.random()*100+'%'; s.style.top = Math.random()*100+'%';
        let size = Math.random()*3; s.style.width=size+'px'; s.style.height=size+'px';
        container.appendChild(s);
    }
}

function extractYouTubeID(url) {
    if(!url) return null;
    const m = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
    return (m && m[2].length == 11) ? m[2] : null;
}
