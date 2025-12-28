/* ============================================================
   1. قاموس صور المواد (صور واقعية بجودة عالية)
   ============================================================ */
const SUBJECT_IMAGES = {
    // اللغات
    "اللغة العربية": "https://images.unsplash.com/photo-1542645976-a2a46eec7d32?auto=format&fit=crop&w=500&q=80",
    "اللغة الإنجليزية": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=500&q=80",
    "الفرنساوي": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=500&q=80",
    
    // علمي
    "الفيزياء": "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=500&q=80",
    "الكيمياء": "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=500&q=80",
    "الأحياء": "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=500&q=80",
    "الجيولوجيا": "https://images.unsplash.com/photo-1614957004492-c99981442426?auto=format&fit=crop&w=500&q=80",
    
    // رياضة
    "الرياضيات البحتة": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=500&q=80",
    "الرياضيات التطبيقية": "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=500&q=80",
    
    // أدبي
    "التاريخ": "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=500&q=80",
    "الجغرافيا": "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=500&q=80",
    "علم النفس": "https://images.unsplash.com/photo-1493612276216-9c59019558f7?auto=format&fit=crop&w=500&q=80",
    "الفلسفة": "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?auto=format&fit=crop&w=500&q=80",

    // الافتراضي
    "default": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=500&q=80"
};

// جمل الكتابة المتحركة
const MESSAGES = [
    "النجاح قرار، مش صدفة..",
    "حلمك يستاهل تعبك..",
    "عافر هتوصل..",
    "الدرجة النهائية في انتظارك.."
];

/* ============================================================
   2. كود التشغيل والمنطق
   ============================================================ */
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

// --- تأثير الكتابة ---
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

// --- زر الدخول (مع الحماية) ---
document.getElementById('login-btn').addEventListener('click', () => {
    const track = document.getElementById('track-select').value;
    const code = document.getElementById('access-code').value;

    if(!code || code.length < 1) {
        return alert("أدخل كود الدخول يا بطل!");
    }

    // فحص وتحميل البيانات
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
        alert("⚠️ خطأ في الملفات: تأكد من وجود ملفات البيانات (1_science.js, 2_math.js, 3_lit.js) بنفس الاسم.");
        return;
    }

    // الانتقال وتغيير الواجهة
    document.getElementById('login-section').classList.remove('active');
    document.getElementById('content-section').classList.add('active');
    
    const trackNames = {"science": "علمي علوم", "math": "علمي رياضة", "lit": "أدبي"};
    document.getElementById('student-display').innerText = `👤 ${trackNames[track]} | 🔑 ${code}`;

    renderSubjects();
});

// --- عرض المواد (بالصور) ---
function renderSubjects() {
    const grid = document.getElementById('cards-container');
    grid.innerHTML = "";
    document.getElementById('page-title').innerText = "المواد الدراسية";
    document.getElementById('back-btn').style.display = "none";

    Object.keys(currentData).forEach(subject => {
        // البحث عن صورة المادة أو استخدام الافتراضية
        // البحث الجزئي (مثلاً: "اللغة العربية" تجيب صورة العربي)
        let imgUrl = SUBJECT_IMAGES["default"];
        for (const key in SUBJECT_IMAGES) {
            if (subject.includes(key)) {
                imgUrl = SUBJECT_IMAGES[key];
                break;
            }
        }

        createCard(subject, imgUrl, () => {
            renderTeachers(currentData[subject], renderSubjects);
        });
    });
}

// --- عرض المدرسين ---
function renderTeachers(teachers, goBack) {
    const grid = document.getElementById('cards-container');
    grid.innerHTML = "";
    document.getElementById('page-title').innerText = "اختر المدرس";
    setupBack(goBack);

    Object.keys(teachers).forEach(teacher => {
        // صورة ثابتة للمدرس
        createCard(teacher, "https://cdn-icons-png.flaticon.com/512/1995/1995539.png", () => {
            renderCourses(teachers[teacher], () => renderTeachers(teachers, goBack));
        });
    });
}

// --- عرض المحاضرات ---
function renderCourses(courses, goBack) {
    const grid = document.getElementById('cards-container');
    grid.innerHTML = "";
    document.getElementById('page-title').innerText = "المحاضرات المتاحة";
    setupBack(goBack);

    if(courses.length === 0) grid.innerHTML = "<p style='width:100%;text-align:center;color:#aaa'>لا توجد محاضرات حالياً</p>";

    courses.forEach(course => {
        const div = document.createElement('div');
        div.className = 'card';
        // كارت الفيديو بدون صورة، أيقونة فقط
        div.innerHTML = `<div style="font-size:40px;margin:20px 0;">📺</div><h3>${course.name}</h3>`;
        div.onclick = () => playVideo(course.link, () => renderCourses(courses, goBack));
        grid.appendChild(div);
    });
}

// --- تشغيل الفيديو ---
function playVideo(url, goBack) {
    const grid = document.getElementById('cards-container');
    const id = extractYouTubeID(url);
    
    if(!id) {
        alert("رابط الفيديو غير صالح");
        return;
    }

    grid.innerHTML = `
        <div class="video-wrapper">
            <div id="player" data-plyr-provider="youtube" data-plyr-embed-id="${id}"></div>
        </div>
        <div style="text-align:center; margin-top:20px; color:#aaa;">
            نتمنى لك مشاهدة ممتعة ☕
        </div>
    `;
    
    new Plyr('#player', { 
        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
        youtube: { noCookie: true, rel: 0, showinfo: 0, modestbranding: 1 } 
    });
    setupBack(goBack);
}

// --- أدوات مساعدة ---
function createCard(title, imgUrl, action) {
    const d = document.createElement('div');
    d.className = 'card';
    
    // لو الصورة أيقونة (مدرس) نعرضها صغيرة، لو صورة مادة نعرضها عريضة
    if (imgUrl.includes("flaticon")) {
        d.innerHTML = `<img src="${imgUrl}" style="width:70px; height:70px; object-fit:contain; border:none; margin:15px 0;"><h3>${title}</h3>`;
    } else {
        d.innerHTML = `<img src="${imgUrl}"><h3>${title}</h3>`;
    }
    
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
