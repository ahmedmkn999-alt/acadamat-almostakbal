/* ============================================================
   main.js - النسخة المتطورة لقراءة البيانات المعقدة
   ============================================================ */

const SUBJECT_IMAGES = {
    "لغة عربية": "https://images.unsplash.com/photo-1542645976-a2a46eec7d32?auto=format&fit=crop&w=500&q=80",
    "default": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=500&q=80"
};

let currentData = null;

window.onload = function() {
    createStars();
    document.getElementById('typewriter-text').innerText = "منصة العباقرة.. طريقك للقمة";
};

// --- زر الدخول ---
document.getElementById('login-btn').addEventListener('click', () => {
    const track = document.getElementById('track-select').value;
    const code = document.getElementById('access-code').value;

    if(!code) return alert("اكتب الكود يا بطل");

    // تحميل البيانات
    let rawData = null;
    if (track === 'science') rawData = typeof SCIENCE_RAW !== 'undefined' ? SCIENCE_RAW : null;
    else if (track === 'math') rawData = typeof MATH_RAW !== 'undefined' ? MATH_RAW : null;
    else if (track === 'lit') rawData = typeof LIT_RAW !== 'undefined' ? LIT_RAW : null;

    if (!rawData || rawData.length === 0) {
        alert("لا توجد بيانات لهذه الشعبة حالياً");
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

// --- 1. عرض المواد ---
function renderSubjects(subjects) {
    const grid = document.getElementById('cards-container');
    grid.innerHTML = "";
    document.getElementById('page-title').innerText = "المواد الدراسية";
    document.getElementById('back-btn').style.display = "none";

    subjects.forEach(sub => {
        let img = SUBJECT_IMAGES[sub.name] || SUBJECT_IMAGES["default"];
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
            // هنا بنشوف لو المحاضرة فيها فيديوهات على طول ولا لسه
            if (lec.videos) {
                renderVideos(lec.videos, () => renderLectures(lectures, goBack));
            } else {
                alert("لا توجد فيديوهات في هذه المحاضرة");
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
        // لاحظ هنا استخدمنا vid.stream_url اللي جاي من بياناتك
        div.innerHTML = `<div style="font-size:35px;margin:15px 0">📺</div><h3>${vid.title}</h3>`;
        div.onclick = () => playStream(vid.stream_url, () => renderVideos(videos, goBack));
        grid.appendChild(div);
    });
}

// --- تشغيل الفيديو (HLS Stream) ---
function playStream(url, goBack) {
    const grid = document.getElementById('cards-container');
    
    // مشغل يدعم صيغة .m3u8 اللي في روابطك
    grid.innerHTML = `
        <div class="video-wrapper">
            <video id="player" playsinline controls>
                <source src="${url}" type="application/x-mpegURL" />
            </video>
        </div>
    `;
    
    // تشغيل Plyr
    const player = new Plyr('#player', { 
        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen']
    });

    setupBack(goBack);
}

// أدوات مساعدة
function createCard(title, img, action) {
    const d = document.createElement('div');
    d.className = 'card';
    if(img.startsWith("http")) d.innerHTML = `<img src="${img}"><h3>${title}</h3>`;
    else d.innerHTML = `<img src="${img}" style="width:70px;height:70px;object-fit:contain;border:none"><h3>${title}</h3>`;
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
