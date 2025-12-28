const JSON_URLS = {
    'علمي علوم': "https://plus-teal.vercel.app/organized_output.json",
    'أدبي': "https://plus-teal.vercel.app/organized_output-a.json", 
    'علمي رياضة': "https://platform-sigma-seven.vercel.app/organized_output-e.json"
};

let fullData = {};

// توليد النجوم
function createStars() {
    const container = document.getElementById('stars-container');
    for (let i = 0; i < 120; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = star.style.height = Math.random() * 3 + 'px';
        star.style.top = Math.random() * 100 + '%';
        star.style.left = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(star);
    }
}

// تسجيل الدخول
document.getElementById('login-btn').addEventListener('click', async () => {
    const name = document.getElementById('student-name').value;
    const track = document.getElementById('student-track').value;
    const code = document.getElementById('student-code').value;

    if (!name || !code) return alert("أكمل بياناتك يا بطل!");

    try {
        const res = await fetch(JSON_URLS[track]);
        fullData = await res.json();
        
        document.getElementById('login-section').classList.remove('active');
        document.getElementById('platform-section').classList.add('active');
        
        document.getElementById('user-display').innerHTML = `<b>الطالب:</b> ${name} <br> <b>الكود:</b> ${code} (صالح لـ 2026)`;
        renderSubjects();
    } catch (e) { alert("خطأ في تحميل البيانات!"); }
});

function renderSubjects() {
    const grid = document.getElementById('main-grid');
    grid.innerHTML = "";
    document.getElementById('section-title').innerText = "المواد الدراسية";
    document.getElementById('back-button').style.display = "none";

    Object.keys(fullData).forEach(subject => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `<img src="https://cdn-icons-png.flaticon.com/512/3426/3426653.png"><h3>${subject}</h3>`;
        card.onclick = () => renderTeachers(fullData[subject]);
        grid.appendChild(card);
    });
}

function renderTeachers(teachers) {
    const grid = document.getElementById('main-grid');
    grid.innerHTML = "";
    document.getElementById('section-title').innerText = "اختر المدرس";
    document.getElementById('back-button').style.display = "block";
    document.getElementById('back-button').onclick = renderSubjects;

    Object.keys(teachers).forEach(t => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `<img src="https://cdn-icons-png.flaticon.com/512/1995/1995539.png"><h3>${t}</h3>`;
        card.onclick = () => renderCourses(teachers[t]);
        grid.appendChild(card);
    });
}

function renderCourses(courses) {
    const grid = document.getElementById('main-grid');
    grid.innerHTML = "";
    document.getElementById('section-title').innerText = "المحاضرات";

    courses.forEach(course => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `<h3>${course.name || "محاضرة"}</h3><p>اضغط للمشاهدة</p>`;
        card.onclick = () => playVideo(course.link || course.url);
        grid.appendChild(card);
    });
}

// أهم جزء: تشغيل الفيديو بدون علامات يوتيوب
function playVideo(url) {
    const grid = document.getElementById('main-grid');
    const videoId = extractID(url);
    
    grid.innerHTML = `
        <div class="video-container">
            <div id="player" data-plyr-provider="youtube" data-plyr-embed-id="${videoId}"></div>
        </div>
    `;

    // إعدادات Plyr لإخفاء علامة يوتيوب ومنع الاقتراحات
    const player = new Plyr('#player', {
        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
        youtube: { noCookie: true, rel: 0, showinfo: 0, iv_load_policy: 3, modestbranding: 1 }
    });
}

function extractID(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length == 11) ? match[2] : url;
}

createStars();
