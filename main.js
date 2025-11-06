// Form Validation
let form = document.getElementById("form");
let userName = document.getElementById("name");
let userEmail = document.getElementById("email");
let userMessage = document.getElementById("message");
let userPhone = document.getElementById("phone");

form.addEventListener("submit",(e) =>{
    e.preventDefault()
});
    userName.addEventListener("input",()=>{
    validateInput(userName,userName.value.trim().length >= 3);

});
userEmail.addEventListener("input",()=>{
    validateInput(userEmail,/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail.value));
});
userPhone.addEventListener("input",() =>{
   validateInput(userPhone, /^\d{10}$/.test(userPhone.value));
});
userMessage.addEventListener("input",() =>{
    validateInput(userMessage,userMessage.value.trim().length > 10);
});

function validateInput(input,condition){
    if(condition){
        input.classList.remove("input-error");
        input.classList.add("input-success");
    }else{
        input.classList.remove("input-success"); 
        input.classList.add("input-error");
    }
}

// function showError(input,message){
//     errorMessage.textContent = message;
//     errorMessage.style.display = "block";
// }

// function clearError(input){
//     errorMessage.textContent = "";
//     errorMessage.style.display = "none";
// }

// Track navigation clicks for SPA Google Analytics
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    const sectionId = link.getAttribute('href').substring(1);
    gtag('event', 'page_view', {
      page_title: sectionId,
      page_path: '/' + sectionId
    });
  });
});

// Track when user scrolls into a section
const sections = document.querySelectorAll('section');
let currentSection = '';

window.addEventListener('scroll', () => {
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
      const sectionId = section.getAttribute('id');
      if (sectionId !== currentSection) {
        currentSection = sectionId;
        gtag('event', 'page_view', {
          page_title: sectionId,
          page_path: '/' + sectionId
        });
      }
    }
  });
});

