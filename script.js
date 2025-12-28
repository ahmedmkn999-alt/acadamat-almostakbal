const CONFIG = {
    tracks: {
        '100': "https://api.allorigins.win/raw?url=https://plus-teal.vercel.app/organized_output.json",
        '200': "https://api.allorigins.win/raw?url=https://platform-sigma-seven.vercel.app/organized_output-e.json",
        '300': "https://api.allorigins.win/raw?url=https://plus-teal.vercel.app/organized_output-a.json"
    }
};

let fullData = null, playerInstance = null;

// وظيفة التنقل
function switchPage(pageId) {
    document.querySelectorAll('.page-section').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

// تسجيل الدخول
async function handleLogin() {
    const codeInput = document.getElementById('student-code').value.trim();
    const btn = document.querySelector('.main-btn-pro');
    
    if (CONFIG.tracks[codeInput]) {
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحميل...';
        try {
            const res = await fetch(CONFIG.tracks[codeInput]);
            fullData = await res.json();
            
            // لو البيانات Array، هنحولها لـ Object عشان التقسيم
            renderSubjects();
            switchPage('dashboard-section');
        } catch (e) {
            alert("حدث خطأ في جلب البيانات.. تأكد من الانترنت");
            btn.innerHTML = 'ابدأ الرحلة الآن <i class="fas fa-rocket"></i>';
        }
    } else {
        alert("الكود غير صحيح!");
    }
}

function renderSubjects() {
    const grid = document.getElementById('subjects-grid');
    grid.innerHTML = '';

    // التحقق من شكل البيانات (هل هي مصفوفة أم كائن؟)
    const items = Array.isArray(fullData) ? fullData : Object.entries(fullData);

    items.forEach((item, index) => {
        // لو البيانات Array بنعتمد على index، لو Object بنعتمد على Key
        const title = Array.isArray(fullData) 
            ? (item.name || item.teacher || `مدرس ${index + 1}`) 
            : item[0]; // الاسم في حالة الـ Object
        
        const card = document.createElement('div');
        card.className = 'subject-card';
        card.onclick = () => openPlayer(index, title);
        
        card.innerHTML = `
            <div class="card-image"><img src="https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400"></div>
            <div class="card-body">
                <h3>${title}</h3>
                <p style="color:#888; font-size:0.8rem; margin-top:5px;">اضغط للمشاهدة</p>
            </div>
        `;
        grid.appendChild(card);
    });
}

function openPlayer(index, title) {
    document.getElementById('current-subject-title').textContent = title;
    
    // جلب الدروس بناء على النوع
    const lessons = Array.isArray(fullData) 
        ? (fullData[index].lessons || fullData[index]) 
        : Object.values(fullData)[index];

    const list = document.getElementById('lessons-list');
    list.innerHTML = '';
    
    const lessonsArray = Array.isArray(lessons) ? lessons : [];

    lessonsArray.forEach((l, i) => {
        const li = document.createElement('li');
        li.textContent = l.title || l.lesson_name || `محاضرة ${i + 1}`;
        li.onclick = () => playVideo(l, i);
        list.appendChild(li);
    });
    
    switchPage('player-section');
    if(lessonsArray.length > 0) playVideo(lessonsArray[0], 0);
}

function playVideo(lesson, i) {
    const videoIdMatch = lesson.url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
    if (!videoIdMatch) return;
    
    const id = videoIdMatch[1];
    document.querySelector('#player iframe').src = `https://www.youtube.com/embed/${id}?modestbranding=1&rel=0`;
    document.getElementById('lesson-title-display').textContent = lesson.title || lesson.lesson_name;
    
    document.querySelectorAll('#lessons-list li').forEach((li, idx) => {
        li.classList.toggle('active', idx === i);
    });

    if(!playerInstance) playerInstance = new Plyr('#player');
}

function logout() { location.reload(); }

// نجوم وتأثيرات
(function() {
    const container = document.getElementById('stars-container');
    for(let i=0; i<50; i++) {
        const s = document.createElement('div'); s.className='star';
        s.style.left=Math.random()*100+'%'; s.style.top=Math.random()*100+'%';
        s.style.width=s.style.height=Math.random()*2+'px'; container.appendChild(s);
    }
    const phrases = ["حلمك يستحق التعب", "اصنع مستقبلك الآن", "طريقك نحو القمة"];
    let phraseIdx = 0, charIdx = 0, isDel = false;
    function type() {
        const p = phrases[phraseIdx];
        document.getElementById('typewriter').textContent = isDel ? p.substring(0, charIdx--) : p.substring(0, charIdx++);
        if(!isDel && charIdx > p.length) { isDel = true; setTimeout(type, 2000); }
        else if(isDel && charIdx === 0) { isDel = false; phraseIdx = (phraseIdx + 1)%phrases.length; setTimeout(type, 500); }
        else setTimeout(type, isDel ? 50 : 100);
    }
    type();
})();
