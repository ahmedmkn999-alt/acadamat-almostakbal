/* =========================================
   كود التشغيل الرئيسي
   ========================================= */

// جمل تتغير كل مرة بتأثير الكتابة
const QUOTES = [
    "النجاح قرار.. وليس صدفة!",
    "تعب اليوم.. هو راحة الغد.",
    "أنت أقوى مما تتخيل.. استمر!",
    "الدرجة النهائية تنتظرك..",
    "لا تؤجل عمل اليوم إلى الغد."
];

let currentData = null;

window.onload = function() {
    createStars();
    // اختيار جملة عشوائية وتفعيل الأنيميشن
    const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    const quoteEl = document.getElementById('quote-text');
    quoteEl.innerText = randomQuote;
    
    // إعادة تشغيل الأنيميشن
    quoteEl.style.animation = 'none';
    quoteEl.offsetHeight; /* trigger reflow */
    quoteEl.style.animation = null; 
};

// --- زر الدخول ---
document.getElementById('login-btn').addEventListener('click', () => {
    const track = document.getElementById('track-select').value;
    const code = document.getElementById('access-code').value;

    // 1. السماح بأي كود (عشان مشكلة الدخول)
    if(!code || code.length < 1) {
        return alert("اكتب أي رقم يا بطل عشان تدخل!");
    }

    // 2. تحميل البيانات بناء على الملفات الخارجية
    // بنستخدم try-catch عشان لو الملفات مش مربوطة صح منعملش كراش
    try {
        if (track === 'science') {
            if (typeof SCIENCE_DATA !== 'undefined') currentData = SCIENCE_DATA;
            else throw new Error("ملف علمي علوم مفقود");
        } 
        else if (track === 'math') {
            if (typeof MATH_DATA !== 'undefined') currentData = MATH_DATA;
            else throw new Error("ملف علمي رياضة مفقود");
        } 
        else if (track === 'lit') {
            if (typeof LIT_DATA !== 'undefined') currentData = LIT_DATA;
            else throw new Error("ملف أدبي مفقود");
        }
    } catch (e) {
        alert("خطأ: تأكد من أن ملفات المواد (1_science.js, etc) موجودة ومربوطة في ملف الـ HTML");
        return;
    }

    // 3. الانتقال للصفحة
    document.getElementById('login-section').classList.remove('active');
    document.getElementById('content-section').classList.add('active');
    
    const trackName = track === 'science' ? 'علمي علوم' : track === 'math' ? 'علمي رياضة' : 'أدبي';
    document.getElementById('student-display').innerText = `${trackName} | كود: ${code}`;

    renderSubjects();
});

// --- عرض المواد (بدون id و created_at) ---
function renderSubjects() {
    const grid = document.getElementById('cards-container');
    grid.innerHTML = "";
    document.getElementById('page-title').innerText = "المواد الدراسية";
    document.getElementById('back-btn').style.display = "none";

    // هنا بنضمن إننا بنعرض المواد بس، مش أي داتا تانية
    Object.keys(currentData).forEach(subject => {
        // فلتر أمان: لو المفتاح مش مادة حقيقية (زي id او name) تجاهله
        if (subject === 'id' || subject === 'name') return;

        createCard(subject, "https://cdn-icons-png.flaticon.com/512/3426/3426653.png", () => {
            renderTeachers(currentData[subject], renderSubjects);
        });
    });
}

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

function renderCourses(courses, goBack) {
    const grid = document.getElementById('cards-container');
    grid.innerHTML = "";
    document.getElementById('page-title').innerText = "المحاضرات";
    setupBack(goBack);

    courses.forEach(course => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `<div style="font-size:35px;margin-bottom:10px">📺</div><h3>${course.name}</h3>`;
        div.onclick = () => playVideo(course.link, () => renderCourses(courses, goBack));
        grid.appendChild(div);
    });
}

function playVideo(url, goBack) {
    const grid = document.getElementById('cards-container');
    const id = extractYouTubeID(url);
    
    if(!id) {
        alert("فيديو غير متاح حالياً");
        return; 
    }

    grid.innerHTML = `<div class="video-wrapper"><div id="player" data-plyr-provider="youtube" data-plyr-embed-id="${id}"></div></div>`;
    new Plyr('#player', { controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'], youtube: { noCookie: true, rel: 0, showinfo: 0, modestbranding: 1 } });
    setupBack(goBack);
}

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
