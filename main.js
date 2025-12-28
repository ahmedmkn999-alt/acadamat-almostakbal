// روابط JSON الحقيقية
const JSON_URLS = {
  'علمي علوم': "https://plus-teal.vercel.app/organized_output.json",
  'أدبي': "https://plus-teal.vercel.app/organized_output-a.json",
  'علمي رياضة': "https://platform-sigma-seven.vercel.app/organized_output-e.json",
  'أزهر': "https://plus-teal.vercel.app/organized_output.json"
};

let subjectsData = [];
let currentLevel = 'subjects';
let selectedSubject = null;
let selectedTeacher = null;

async function loadAllSubjects(){
  const subjects = Object.keys(JSON_URLS);

  const promises = subjects.map(async subject=>{
    try{
      const response = await fetch(JSON_URLS[subject]);
      const data = await response.json();
      return {
        name: subject,
        teachers: [
          {
            name: "مدرس " + subject,
            courses: data
          }
        ]
      };
    } catch(err){
      console.error("خطأ في تحميل JSON:", subject, err);
      return null;
    }
  });

  const results = await Promise.all(promises);
  subjectsData = results.filter(item=>item!=null);
  loadSubjects();
}

function loadSubjects(){
  currentLevel='subjects';
  selectedSubject=null;
  selectedTeacher=null;
  document.getElementById('backBtn').style.display='none';
  renderData(subjectsData,'subject');
}

function renderData(data,type){
  const contentDiv=document.getElementById('content');
  contentDiv.innerHTML='';

  data.forEach(item=>{
    const card=document.createElement('div');
    card.className='card';

    if(type==='subject'){
      card.innerHTML=`<h3>${item.name}</h3><p>اضغط لعرض المدرسين</p>`;
      card.onclick=()=>{showTeachers(item);}
    }
    else if(type==='teacher'){
      card.innerHTML=`<h3>${item.name}</h3><p>اضغط لعرض الكورسات</p>`;
      card.onclick=()=>{showCourses(item);}
    }
    else if(type==='course'){
      card.innerHTML=`
        <h3>${item.title || item.name || "بدون عنوان"}</h3>
        <p>${item.description || ""}</p>
        ${item.image? `<img src="${item.image}" width="100%">` : ""}
        ${item.video? `<video width="100%" controls><source src="${item.video}" type="video/mp4"></video>` : ""}
        ${item.pdf? `<p><a href="${item.pdf}" target="_blank">تحميل PDF</a></p>` : ""}
      `;
    }
    contentDiv.appendChild(card);
  });
}

function showTeachers(subject){
  currentLevel='teachers';
  selectedSubject=subject;
  document.getElementById('backBtn').style.display='block';
  renderData(subject.teachers,'teacher');
}

function showCourses(teacher){
  currentLevel='courses';
  selectedTeacher=teacher;
  renderData(teacher.courses,'course');
}

function goBack(){
  if(currentLevel==='teachers') loadSubjects();
  else if(currentLevel==='courses') showTeachers(selectedSubject);
}

document.getElementById('searchInput').addEventListener('input',(e)=>{
  const query=e.target.value.toLowerCase();
  let filtered=[];
  if(currentLevel==='subjects'){
    filtered=subjectsData.filter(s=>s.name.toLowerCase().includes(query));
    renderData(filtered,'subject');
  } else if(currentLevel==='teachers'){
    filtered=selectedSubject.teachers.filter(t=>t.name.toLowerCase().includes(query));
    renderData(filtered,'teacher');
  } else if(currentLevel==='courses'){
    filtered=selectedTeacher.courses.filter(c=>
      (c.title && c.title.toLowerCase().includes(query)) ||
      (c.description && c.description.toLowerCase().includes(query))
    );
    renderData(filtered,'course');
  }
});

// تحميل البيانات عند بدء الصفحة
loadAllSubjects();
