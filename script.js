const JSON_URLS = {
    'علمي علوم': "https://plus-teal.vercel.app/organized_output.json",
    'أدبي': "https://plus-teal.vercel.app/organized_output-a.json", 
    'علمي رياضة': "https://platform-sigma-seven.vercel.app/organized_output-e.json"
};

let currentData = null;

// نجوم الخلفية
function initStars() {
    const container = document.getElementById('stars-container');
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = star.style.height = Math.random() * 3 + 'px';
        star.style.top = Math.random() * 100 + '%';
        star.style.left = Math.random() * 100 + '%';
        container.appendChild(star);
    }
}
initStars();

// تسجيل الدخول بالكود
document.getElementById('login-btn').addEventListener('click', async () => {
    const track = document.getElementById('student-track').value;
    const code = document.getElementById('student-code').value;

    if (!code) return alert("من فضلك أدخل كود الاشتراك");

    try {
        const res = await fetch(JSON_URLS[track]);
        const data = await res.json();
        
        // هنا بنوصل لقائمة المواد الفعالة جوه الرابط
        currentData = data.subjects || data; 

        document.getElementById('login-section').classList.remove('active');
        document.getElementById('platform-section').classList.add('active');
        
        document.getElementById('user-display').innerHTML = `<b>كود الطالب:</b> ${code} <br> <b>الشعبة:</b> ${track}`;
        
        renderSubjects();
    } catch (e) {
        alert("خطأ في الاتصال.. تأكد من الإنترنت");
    }
});

// عرض المواد
function renderSubjects() {
    const grid = document.getElementById('main-grid');
    grid.innerHTML = "";
    document.getElementById('section-title').innerText = "المواد الدراسية";
    document.getElementById('back-button').style.display = "none";

    // لو البيانات عبارة عن Array أو Object
    const subjectsList = Array.isArray(currentData) ? currentData : Object.keys(currentData);

    subjectsList.forEach(subject => {
        const subjectName = typeof subject === 'string' ? subject : (subject.name || "مادة دراسية");
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <img src="https://cdn-icons-png.flaticon.com/512/3426/3426653.png">
            <h3>${subjectName}</h3>
        `;
        // لما يدوس يفتح المدرسين بتوع المادة دي
        card.onclick = () => renderTeachers(typeof subject === 'string' ? currentData[subject] : subject.teachers);
        grid.appendChild(card);
    });
}

// عرض المدرسين
function renderTeachers(teachers) {
    if (!teachers) return alert("لا يوجد مدرسين متاحين حالياً");
    const grid = document.getElementById('main-grid');
    grid.innerHTML = "";
    document.getElementById('section-title').innerText = "اختر المدرس";
    document.getElementById('back-button').style.display = "block";
    document.getElementById('back-button').onclick = renderSubjects;

    const teacherList = Array.isArray(teachers) ? teachers : Object.keys(teachers);

    teacherList.forEach(t => {
        const tName = typeof t === 'string' ? t : (t.name || "مدرس المادة");
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <img src="https://cdn-icons-png.flaticon.com/512/1995/1995539.png">
            <h3>${tName}</h3>
        `;
        card.onclick = () => renderCourses(typeof t === 'string' ? teachers[t] : t.courses);
        grid.appendChild(card);
    });
}

// عرض الكورسات (المحاضرات)
function renderCourses(courses) {
    if (!courses) return alert("لا يوجد محاضرات لهذا المدرس");
    const grid = document.getElementById('main-grid');
    grid.innerHTML = "";
    document.getElementById('section-title').innerText = "المحاضرات المتاحة";

    courses.forEach(lesson => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <div style="font-size: 40px;">📺</div>
            <h3>${lesson.name || "محاضرة جديدة"}</h3>
        `;
        card.onclick = () => playVideo(lesson.link || lesson.url);
        grid.appendChild(card);
    });
}

// مشغل الفيديو
function playVideo(url) {
    if (!url) return alert("عفواً، رابط الفيديو غير متوفر");
    const grid = document.getElementById('main-grid');
    const videoId = extractID(url);
    
    grid.innerHTML = `
        <div class="video-container">
            <div id="player" data-plyr-provider="youtube" data-plyr-embed-id="${videoId}"></div>
        </div>
    `;
    new Plyr('#player', {
        youtube: { noCookie: true, modestbranding: 1, rel: 0 }
    });
}

function extractID(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length == 11) ? match[2] : url;
}
