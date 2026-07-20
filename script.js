// --- CUSTOM CURSOR GRAPHICS ENGINE ---
const cursorDot = document.querySelector('.custom-cursor.dot');
const cursorOutline = document.querySelector('.custom-cursor.outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;
    
    if (cursorDot && cursorOutline) {
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        
        cursorOutline.style.left = `${posX}px`;
        cursorOutline.style.top = `${posY}px`;
    }
});

document.querySelectorAll('a, button, input, textarea, .project-node').forEach(el => {
    el.addEventListener('mouseenter', () => cursorOutline && cursorOutline.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursorOutline && cursorOutline.classList.remove('hovered'));
});

// Scroll Reveal Animation Observer
const observerOptions = {
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.portfolio-section').forEach(section => {
    observer.observe(section);
});

// Dynamic Typewriter / Fading Rotation Engine
const roles = [
    "Application Engineer & Network Topologist",
    "Solutions Architect & Network Infrastructure Engineer",
    "Full-Stack Application Developer & Core Network Operator"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 70;
const deletingSpeed = 35;
const pauseTime = 2200;

function typeWriter() {
    const currentRole = roles[roleIndex];
    const targetElement = document.getElementById('dynamic-role');
    
    if (!targetElement) return;

    if (isDeleting) {
        targetElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        targetElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeDelay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
        typeDelay = pauseTime;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeDelay = 400;
    }

    setTimeout(typeWriter, typeDelay);
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(typeWriter, 800);
});