/* ============================================================
   كود التشغيل الرئيسي (Logic) + صور المواد
   ============================================================ */

// 🎨 قاموس صور المواد (أي مادة جديدة ضيفلها صورة هنا)
const SUBJECT_IMAGES = {
    "اللغة العربية": "https://cdn-icons-png.flaticon.com/512/3389/3389081.png", // كتاب وقلم
    "اللغة الإنجليزية": "https://cdn-icons-png.flaticon.com/512/197/197484.png", // حرف A
    "الفرنساوي": "https://cdn-icons-png.flaticon.com/512/330/330490.png", // برج إيفل
    "الفيزياء": "https://cdn-icons-png.flaticon.com/512/2933/2933886.png", // ذرة
    "الكيمياء": "https://cdn-icons-png.flaticon.com/512/1231/1231466.png", // دورق اختبار
    "الأحياء": "https://cdn-icons-png.flaticon.com/512/2921/2921229.png", // ميكروسكوب و DNA
    "الجيولوجيا": "https://cdn-icons-png.flaticon.com/512/2933/2933198.png", // طبقات الأرض
    "الرياضيات البحتة": "https://cdn-icons-png.flaticon.com/512/2933/2933855.png", // أدوات هندسية
    "الرياضيات التطبيقية": "https://cdn-icons-png.flaticon.com/512/3082/3082353.png", // آلة حاسبة
    "التاريخ": "https://cdn-icons-png.flaticon.com/512/2682/2682446.png", // لفافة ورق قديمة
    "الجغرافيا": "https://cdn-icons-png.flaticon.com/512/2947/2947656.png", // كرة أرضية
    "علم النفس": "https://cdn-icons-png.flaticon.com/512/2490/2490428.png", // مخ
    "الفلسفة": "https://cdn-icons-png.flaticon.com/512/3209/3209983.png", // عمود يوناني
    "default": "https://cdn-icons-png.flaticon.com/512/3426/3426653.png" // صورة افتراضية لو المادة ملهاش صورة
};

const QUOTES = [
    "النجاح قرار، مش صدفة.",
    "تعبك النهاردة راحة لبكرة.",
    "أنت قد الحلم، كمل.",
    "الدرجة النهائية في انتظارك."
];

let currentData = null;

window.onload = function() {
    createStars();
    document.getElementById('quote-text').innerText = `"${QUOTES[Math.floor(Math.random() * QUOTES.length)]}"`;
};

// إنشاء النجوم
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

// زر الدخول
document.getElementById('login-btn').addEventListener('click', () => {
    const track = document.getElementById('track-select').value;
    const code = document.getElementById('access-code').value;

    if(!code) return alert("اكتب الكود يا هندسة!");

    // هنا بنختار الداتا بناء على الشعبة
    try {
        if (track === 'science') currentData = SCIENCE_DATA;
        else if (track === 'math') currentData = MATH_DATA;
        else if (track === 'lit') currentData = LIT_DATA;
        
        if(!currentData) throw new Error("البيانات لم تحمل");

    } catch(e) {
        // رسالة خطأ لو الملفات مش مترتبة صح على جيت هاب
        alert("خطأ! تأكد أنك قمت بتسمية ملفات الداتا على GitHub بـ: 1_science.js و 2_math.js و 3_lit.js");
        return;
    }

    document.getElementById('login-section').classList.remove('active');
    document.getElementById('content-section').classList.add('active');
    
    const names = {"science": "علمي علوم", "math": "علمي رياضة", "lit": "أدبي"};
    document.getElementById('student-display').innerText = `${names[track]} | كود: ${code}`;

    renderSubjects();
});

// عرض المواد (تم التعديل لإضافة الصور)
function renderSubjects() {
    const grid = document.getElementById('cards-container');
    grid.innerHTML = "";
    document.getElementById('page-title').innerText = "المواد الدراسية";
    document.getElementById('back-btn').style.display = "none";

    Object.keys(currentData).forEach(subjectName => {
        // نختار الصورة المناسبة من القاموس اللي فوق، لو ملهاش صورة ناخد الافتراضية
        const subjectIcon = SUBJECT_IMAGES[subjectName] || SUBJECT_IMAGES["default"];
        
        createCard(subjectName, subjectIcon, () => {
            renderTeachers(currentData[subjectName], renderSubjects);
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
        // صورة ثابتة للمدرسين
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
        alert("فيديو تجريبي (الرابط يحتاج تحديث)");
        grid.innerHTML = `<div class="video-wrapper"><div id="player" data-plyr-provider="youtube" data-plyr-embed-id="S212g44vPjE"></div></div>`;
    } else {
        grid.innerHTML = `<div class="video-wrapper"><div id="player" data-plyr-provider="youtube" data-plyr-embed-id="${id}"></div></div>`;
    }
    
    new Plyr('#player', { controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'], youtube: { noCookie: true, rel: 0, showinfo: 0, modestbranding: 1 } });
    setupBack(goBack);
}

function createCard(title, icon, action) {
    const d = document.createElement('div');
    d.className = 'card';
    // تعديل بسيط في ال CSS عشان الصور الجديدة تظهر بشكل أحسن
    d.innerHTML = `<img src="${icon}" style="width: 70px; height: 70px; margin-bottom: 15px;"><h3>${title}</h3>`;
    d.onclick = action;
    document.getElementById('cards-container').appendChild(d);
}

function setupBack(action) {
    const b = document.getElementById('back-btn');
    b.style.display = "block";
    b.onclick = action;
}

function extractYouTubeID(url) {
    if(!url) return null;
    const m = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
    return (m && m[2].length == 11) ? m[2] : null;
}
