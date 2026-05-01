// --- MOBILE MENU LOGIC ---
document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.querySelector('[data-collapse-toggle="navbar-dropdown"]');
    const navbarMenu = document.getElementById('navbar-dropdown');

    if (toggleButton && navbarMenu) {
        toggleButton.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevents click from bubbling
            navbarMenu.classList.toggle('hidden');
            
            // Sync the ARIA attribute
            const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
            toggleButton.setAttribute('aria-expanded', !isExpanded);
        });
    }
});

// --- HERO SECTION: JOB TITLE CHANGER ---
const names = ["SOFTWARE ENGINEER", "BACK-END DEVELOPER", "FRONT-END DEVELOPER", "UI/UX DESIGNER"];
let nameIndex = 0;

function changeText() {
    const h1 = document.querySelector('.my_name');
    if (h1) {
        nameIndex = (nameIndex + 1) % names.length;
        h1.textContent = names[nameIndex];
    }
}
setInterval(changeText, 2000);

// --- TYPING EFFECTS HELPER ---
function setupTypingEffect(elementId, text, speed = 150) {
    const heading = document.getElementById(elementId);
    if (!heading) return;

    let index = 0;
    let isDeleting = false;

    function type() {
        if (!isDeleting && index <= text.length) {
            heading.innerHTML = text.substring(0, index);
            index++;
        } else if (isDeleting && index >= 0) {
            heading.innerHTML = text.substring(0, index);
            index--;
        }

        if (index > text.length) {
            setTimeout(() => { isDeleting = true; }, 1000);
        } else if (index < 0) {
            isDeleting = false;
            index = 0;
        }

        setTimeout(type, isDeleting ? 100 : speed);
    }
    type();
}

document.addEventListener("DOMContentLoaded", function () {
    setupTypingEffect("heading", "My key areas of expertise");
    setupTypingEffect("heading_twn", "Changanacherry, Kottayam");
    setupTypingEffect("heading2", "My Services");
});

// --- CAROUSEL LOGIC ---
const slides = document.querySelectorAll('.carousel-slide');
let currentIndex = 0;

if (slides.length > 0) {
    setInterval(() => {
        slides[currentIndex].classList.remove('translate-x-0');
        slides[currentIndex].classList.add('translate-x-full');

        currentIndex = (currentIndex + 1) % slides.length;

        slides[currentIndex].classList.remove('translate-x-full');
        slides[currentIndex].classList.add('translate-x-0');
    }, 3000);
}

// --- VIDEO HOVER LOGIC ---
document.querySelectorAll("video").forEach((video) => {
    video.addEventListener("mouseenter", () => {
        video.currentTime = 0;
        video.muted = false;
        video.play().catch(e => console.log("Auto-play blocked"));
    });
    video.addEventListener("mouseleave", () => {
        video.pause();
        video.currentTime = 0;
    });
});

// --- FORM VALIDATION ---
const formElements = {
    name: document.getElementById('name'),
    phone: document.getElementById('phone'),
    email: document.getElementById('mail'),
    text: document.getElementById('text'),
    submit: document.getElementById('submitBtn')
};

function validateForm() {
    if (!formElements.name) return; // Only run on contact page

    const isNameValid = formElements.name.value.length >= 3;
    const isPhoneValid = /^[0-9]{10}$/.test(formElements.phone.value);
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formElements.email.value);
    const isTextValid = formElements.text.value.length >= 10;

    document.getElementById('nameError').style.display = isNameValid ? 'none' : 'block';
    document.getElementById('phoneError').style.display = isPhoneValid ? 'none' : 'block';
    document.getElementById('emailError').style.display = isEmailValid ? 'none' : 'block';
    document.getElementById('textError').style.display = isTextValid ? 'none' : 'block';

    formElements.submit.disabled = !(isNameValid && isPhoneValid && isEmailValid && isTextValid);
}

if (formElements.name) {
    ['input', 'blur'].forEach(evt => {
        formElements.name.addEventListener(evt, validateForm);
        formElements.phone.addEventListener(evt, validateForm);
        formElements.email.addEventListener(evt, validateForm);
        formElements.text.addEventListener(evt, validateForm);
    });
}