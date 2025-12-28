const CONFIG = {
    tracks: {
        '100': "https://api.allorigins.win/raw?url=https://plus-teal.vercel.app/organized_output.json",
        '200': "https://api.allorigins.win/raw?url=https://platform-sigma-seven.vercel.app/organized_output-e.json",
        '300': "https://api.allorigins.win/raw?url=https://plus-teal.vercel.app/organized_output-a.json"
    }
};

let fullData = null, playerInstance = null;

function switchPage(id) {
    document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

async function handleLogin() {
    const code = document.getElementById('student-code').value.trim();
    if (CONFIG.tracks[code]) {
        try {
            const res = await fetch(CONFIG.tracks[code]);
            fullData = await res.json();
            renderDashboard();
            switchPage('dashboard-section');
        } catch (e) { alert("خطأ في الاتصال بالسيرفر"); }
    } else { alert("الكود غير صحيح!"); }
}

function renderDashboard() {
    const grid = document.getElementById('subjects-grid');
    grid.innerHTML = '';
    Object.keys(fullData).forEach(key => {
        const card = document.createElement('div');
        card.className = 'subject-card';
        card.onclick = () => openPlayer(key);
        card.innerHTML = `
            <div class="card-img"><img src="https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400"></div>
            <div class="card-info">
                <h3>${key}</h3>
                <p style="color:#888; font-size:0.9rem">اضغط لبدء المذاكرة</p>
            </div>
        `;
        grid.appendChild(card);
    });
}

function openPlayer(key) {
    document.getElementById('current-subject-title').textContent = key;
    const lessons = Array.isArray(fullData[key]) ? fullData[key] : [];
    const list = document.getElementById('lessons-list');
    list.innerHTML = '';
    lessons.forEach((l, i) => {
        const li = document.createElement('li');
        li.className = 'lesson-item';
        li.textContent = l.title || l.lesson_name || `المحاضرة ${i+1}`;
        li.onclick = () => playVideo(l, i);
        list.appendChild(li);
    });
    switchPage('player-section');
    if(lessons.length) playVideo(lessons[0], 0);
}

function playVideo(lesson, index) {
    const videoId = lesson.url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/)[1];
    document.querySelector('#player iframe').src = `https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0`;
    document.getElementById('lesson-title-display').textContent = lesson.title || lesson.lesson_name;
    document.querySelectorAll('.lesson-item').forEach((li, i) => li.classList.toggle('active', i === index));
    if(!playerInstance) playerInstance = new Plyr('#player');
}

function logout() { location.reload(); }

// تأثيرات بصرية
(function() {
    const container = document.getElementById('stars-container');
    for(let i=0; i<60; i++) {
        const s = document.createElement('div'); s.className='star';
        s.style.left=Math.random()*100+'%'; s.style.top=Math.random()*100+'%';
        s.style.width=s.style.height=Math.random()*3+'px'; container.appendChild(s);
    }
})();
