/* ============================================================
   كود التشغيل الرئيسي (Logic)
   ============================================================ */

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

    // هنا بنختار الداتا بناء على الشعبة من الملفات التلاتة اللي فوق
    if (track === 'science') currentData = SCIENCE_DATA;
    else if (track === 'math') currentData = MATH_DATA;
    else if (track === 'lit') currentData = LIT_DATA;

    document.getElementById('login-section').classList.remove('active');
    document.getElementById('content-section').classList.add('active');
    
    const names = {"science": "علمي علوم", "math": "علمي رياضة", "lit": "أدبي"};
    document.getElementById('student-display').innerText = `${names[track]} | كود: ${code}`;

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
    d.innerHTML = `<img src="${icon}"><h3>${title}</h3>`;
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
