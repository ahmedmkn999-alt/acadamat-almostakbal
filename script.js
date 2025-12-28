// التكوين الأساسي مع روابطك المباشرة
const CONFIG = {
    tracks: {
        '100': "https://plus-teal.vercel.app/organized_output.json",
        '200': "https://platform-sigma-seven.vercel.app/organized_output-e.json",
        '300': "https://plus-teal.vercel.app/organized_output-a.json"
    }
};

let fullData = null;
let currentLessons = [];
let playerInstance = null;

// دالة التنقل الآمنة
function switchPage(pageId) {
    document.querySelectorAll('.page-section').forEach(p => {
        p.style.display = 'none';
        p.classList.remove('active');
    });
    const target = document.getElementById(pageId);
    if (target) {
        target.style.display = 'flex';
        setTimeout(() => target.classList.add('active'), 10);
    }
}

// دالة تسجيل الدخول ومعالجة البيانات
async function handleLogin() {
    const code = document.getElementById('student-code').value.trim();
    const btn = document.querySelector('.main-btn-pro');
    
    if (CONFIG.tracks[code]) {
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري جلب البيانات...';
        try {
            // نستخدم AllOrigins فقط إذا فشل الطلب المباشر لتجاوز الحظر
            const targetUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(CONFIG.tracks[code])}`;
            const res = await fetch(targetUrl);
            fullData = await res.json();
            
            console.log("البيانات المحملة:", fullData); // للتأكد في وحدة التحكم
            
            renderSubjects();
            switchPage('dashboard-section');
        } catch (e) {
            alert("حدث خطأ في الاتصال بالسيرفر. تأكد من الإنترنت.");
            btn.innerHTML = 'ابدأ الرحلة الآن <i class="fas fa-rocket"></i>';
        }
    } else {
        alert("الكود غير صحيح!");
    }
}

// دالة عرض المدرسين (حل مشكلة الأرقام 0 و 1)
function renderSubjects() {
    const grid = document.getElementById('subjects-grid');
    grid.innerHTML = '';

    // تحويل البيانات سواء كانت Object أو Array إلى شكل موحد
    let items = [];
    if (Array.isArray(fullData)) {
        // إذا كانت مصفوفة، نأخذ الخصائص من داخل العناصر
        fullData.forEach((obj, index) => {
            let name = obj.name || obj.teacher || obj.subject || `قسم ${index + 1}`;
            items.push({ title: name, data: obj.lessons || obj.videos || obj });
        });
    } else {
        // إذا كانت Object (أسماء المدرسين هي المفاتيح)
        Object.entries(fullData).forEach(([key, value]) => {
            items.push({ title: key, data: value });
        });
    }

    items.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'subject-card';
        card.onclick = () => openPlayer(item.data, item.title);
        
        card.innerHTML = `
            <div class="card-image"><img src="https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400"></div>
            <div class="card-body">
                <h3>${item.title}</h3>
                <p style="color:var(--gold); font-size:0.8rem; margin-top:5px;">اضغط للمشاهدة</p>
            </div>
        `;
        grid.appendChild(card);
    });
}

// فتح المشغل
function openPlayer(lessons, subjectTitle) {
    document.getElementById('current-subject-title').textContent = subjectTitle;
    const list = document.getElementById('lessons-list');
    list.innerHTML = '';
    
    // التأكد أن الدروس عبارة عن مصفوفة
    currentLessons = Array.isArray(lessons) ? lessons : (lessons.lessons || []);

    currentLessons.forEach((l, i) => {
        const li = document.createElement('li');
        li.textContent = l.lesson_name || l.title || `محاضرة ${i + 1}`;
        li.onclick = () => playVideo(l, i);
        list.appendChild(li);
    });
    
    switchPage('player-section');
    if(currentLessons.length > 0) playVideo(currentLessons[0], 0);
}

function playVideo(lesson, i) {
    const url = lesson.url || lesson.link || "";
    const videoIdMatch = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
    
    if (videoIdMatch) {
        const id = videoIdMatch[1];
        document.querySelector('#player iframe').src = `https://www.youtube.com/embed/${id}?modestbranding=1&rel=0`;
        document.getElementById('lesson-title-display').textContent = lesson.lesson_name || lesson.title;
        
        document.querySelectorAll('#lessons-list li').forEach((li, idx) => {
            li.classList.toggle('active', idx === i);
        });

        if(!playerInstance) playerInstance = new Plyr('#player');
    }
}

function logout() { location.reload(); }

// تأثيرات بصرية
window.onload = () => {
    const container = document.getElementById('stars-container');
    for(let i=0; i<50; i++) {
        const s = document.createElement('div'); s.className='star';
        s.style.left=Math.random()*100+'%'; s.style.top=Math.random()*100+'%';
        s.style.width=s.style.height=Math.random()*2+'px'; container.appendChild(s);
    }
};
