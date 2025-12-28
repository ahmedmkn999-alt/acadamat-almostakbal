/* ============================================================
   main.js - المحرك الذكي مع مكتبة الصور الكاملة
   ============================================================ */

// 1. قاموس صور المواد (صور واقعية بجودة عالية لكل المواد)
const SUBJECT_IMAGES = {
    // اللغات
    "لغة عربية": "https://images.unsplash.com/photo-1542645976-a2a46eec7d32?auto=format&fit=crop&w=500&q=80",
    "لغة إنجليزية": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=500&q=80",
    "لغة فرنسية": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=500&q=80",
    
    // علمي
    "فيزياء": "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=500&q=80",
    "كيمياء": "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=500&q=80",
    "أحياء": "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=500&q=80",
    "جيولوجيا": "https://images.unsplash.com/photo-1614957004492-c99981442426?auto=format&fit=crop&w=500&q=80",
    
    // رياضة
    "الرياضيات البحتة": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=500&q=80",
    "الرياضيات التطبيقية": "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=500&q=80",
    
    // أدبي
    "التاريخ": "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=500&q=80",
    "الجغرافيا": "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=500&q=80",
    "علم النفس": "https://images.unsplash.com/photo-1493612276216-9c59019558f7?auto=format&fit=crop&w=500&q=80",
    "الفلسفة": "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?auto=format&fit=crop&w=500&q=80",

    // صورة افتراضية
    "default": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=500&q=80"
};

let currentData = null;

// تشغيل عند التحميل
window.onload = function() {
    createStars();
    document.getElementById('typewriter-text').innerText = "منصة العباقرة.. طريقك للقمة";
};

// --- زر الدخول ---
document.getElementById('login-btn').addEventListener('click', () => {
    const track = document.getElementById('track-select').value;
    const code = document.getElementById('access-code').value;

    if(!code) return alert("اكتب الكود يا بطل");

    // تحميل البيانات وفحص وجود الملفات
    let rawData = null;
    if (track === 'science') rawData = typeof SCIENCE_RAW !== 'undefined' ? SCIENCE_RAW : null;
    else if (track === 'math') rawData = typeof MATH_RAW !== 'undefined' ? MATH_RAW : null;
    else if (track === 'lit') rawData = typeof LIT_RAW !== 'undefined' ? LIT_RAW : null;

    if (!rawData || rawData.length === 0) {
        alert("⚠️ لم يتم العثور على بيانات لهذه الشعبة.\nتأكد من وجود ملفات البيانات (data_science.js, data_math.js, data_lit.js) وربطها في ملف index.html");
        return;
    }

    // الدخول
    document.getElementById('login-section').classList.remove('active');
    document.getElementById('content-section').classList.add('active');
    document.getElementById('student-display').innerText = `كود الطالب: ${code}`;
    
    // تجهيز المواد (بناخد أول سنة دراسية كمثال)
    if(rawData[0] && rawData[0].subjects) {
        currentData = rawData[0].subjects;
        renderSubjects(currentData);
    }
});

// --- 1. عرض المواد (بالصور) ---
function renderSubjects(subjects) {
    const grid = document.getElementById('cards-container');
    grid.innerHTML = "";
    document.getElementById('page-title').innerText = "المواد الدراسية";
    document.getElementById('back-btn').style.display = "none";

    subjects.forEach(sub => {
        // البحث الذكي عن الصورة (لو الاسم فيه كلمة "فيزياء" يجيب صورة الفيزياء)
        let img = SUBJECT_IMAGES["default"];
        for (const key in SUBJECT_IMAGES) {
            if (sub.name.includes(key)) {
                img = SUBJECT_IMAGES[key];
                break;
            }
        }
        
        createCard(sub.name, img, () => {
            renderTeachers(sub.teachers, () => renderSubjects(subjects));
        });
    });
}

// --- 2. عرض المدرسين ---
function renderTeachers(teachers, goBack) {
    const grid = document.getElementById('cards-container');
    grid.innerHTML = "";
    document.getElementById('page-title').innerText = "اختر المدرس";
    setupBack(goBack);

    teachers.forEach(teacher => {
        let img = teacher.image_url || "https://cdn-icons-png.flaticon.com/512/1995/1995539.png";
        createCard(teacher.name, img, () => {
            renderChapters(teacher.chapters, () => renderTeachers(teachers, goBack));
        });
    });
}

// --- 3. عرض الفصول (الترمات) ---
function renderChapters(chapters, goBack) {
    const grid = document.getElementById('cards-container');
    grid.innerHTML = "";
    document.getElementById('page-title').innerText = "الفصول الدراسية";
    setupBack(goBack);

    chapters.forEach(chap => {
        createCard(chap.name, "https://cdn-icons-png.flaticon.com/512/3534/3534033.png", () => {
            renderLectures(chap.lectures, () => renderChapters(chapters, goBack));
        });
    });
}

// --- 4. عرض المحاضرات ---
function renderLectures(lectures, goBack) {
    const grid = document.getElementById('cards-container');
    grid.innerHTML = "";
    document.getElementById('page-title').innerText = "المحاضرات";
    setupBack(goBack);

    lectures.forEach(lec => {
        createCard(lec.name, "https://cdn-icons-png.flaticon.com/512/2997/2997452.png", () => {
            if (lec.videos && lec.videos.length > 0) {
                renderVideos(lec.videos, () => renderLectures(lectures, goBack));
            } else {
                alert("لا توجد فيديوهات في هذه المحاضرة حالياً");
            }
        });
    });
}

// --- 5. عرض الفيديوهات (القائمة النهائية) ---
function renderVideos(videos, goBack) {
    const grid = document.getElementById('cards-container');
    grid.innerHTML = "";
    document.getElementById('page-title').innerText = "قائمة التشغيل";
    setupBack(goBack);

    videos.forEach(vid => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `<div style="font-size:35px;margin:15px 0">📺</div><h3>${vid.title}</h3>`;
        div.onclick = () => playStream(vid.stream_url, () => renderVideos(videos, goBack));
        grid.appendChild(div);
    });
}

// --- تشغيل الفيديو (HLS Stream) ---
function playStream(url, goBack) {
    const grid = document.getElementById('cards-container');
    
    // مشغل يدعم صيغة .m3u8
    grid.innerHTML = `
        <div class="video-wrapper">
            <video id="player" playsinline controls>
                <source src="${url}" type="application/x-mpegURL" />
            </video>
        </div>
        <div style="text-align:center; margin-top:15px; color:#aaa;">مشاهدة ممتعة ☕</div>
    `;
    
    const player = new Plyr('#player', { 
        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen']
    });

    setupBack(goBack);
}

// أدوات مساعدة
function createCard(title, img, action) {
    const d = document.createElement('div');
    d.className = 'card';
    // لو الصورة رابط (http) نعرضها كصورة، لو غير كدا نعرضها كأيقونة
    if(img.startsWith("http") && !img.includes("flaticon")) {
        d.innerHTML = `<img src="${img}"><h3>${title}</h3>`;
    } else {
        d.innerHTML = `<img src="${img}" style="width:70px;height:70px;object-fit:contain;border:none;margin-top:10px;"><h3>${title}</h3>`;
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
    const c = document.getElementById('stars-container');
    if(!c) return;
    for(let i=0; i<80; i++){
        const s = document.createElement('div');
        s.className = 'star';
        s.style.left = Math.random()*100+'%'; s.style.top = Math.random()*100+'%';
        let sz = Math.random()*3; s.style.width=sz+'px'; s.style.height=sz+'px';
        c.appendChild(s);
    }
}
