const validCodes = ["FULL123", "STUDENT2025", "LEARN2025"];

function checkCode(){
  const input = document.getElementById('codeInput').value.trim();
  const errorMsg = document.getElementById('errorMsg');

  if(validCodes.includes(input)){
    errorMsg.style.color="#00ff99";
    errorMsg.textContent="تم تسجيل الدخول بنجاح!";
    setTimeout(()=>{window.location.href="main.html";},800);
  } else {
    errorMsg.style.color="#ff6666";
    errorMsg.textContent="الكود غير صحيح، حاول مرة أخرى!";
  }
}
