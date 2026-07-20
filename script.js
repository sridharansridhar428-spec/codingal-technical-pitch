// Custom Cursor Movement Tracking
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

// Interactive elements hover effects for custom cursor
const interactiveElements = document.querySelectorAll('a, button, input, textarea, .project-node, .badge-node');
interactiveElements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
        if (cursorOutline) cursorOutline.classList.add('hovered');
    });
    el.addEventListener('mouseleave', () => {
        if (cursorOutline) cursorOutline.classList.remove('hovered');
    });
});

// Dynamic Title Rotation Engine
const titles = [
    "Application Engineer & Network Topologist",
    "Solutions Architect & Network Infrastructure Engineer",
    "Full-Stack Application Developer & Core Network Operator"
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const targetElement = document.getElementById("dynamic-title");
const typingSpeed = 90;   
const erasingSpeed = 45;   
const delayBetween = 2200; 

function typeEffect() {
    if (!targetElement) return;
    
    const currentTitle = titles[titleIndex];
    
    if (isDeleting) {
        targetElement.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
    } else {
        targetElement.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
        isDeleting = true;
        setTimeout(typeEffect, delayBetween);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        setTimeout(typeEffect, 400);
    } else {
        setTimeout(typeEffect, isDeleting ? erasingSpeed : typingSpeed);
    }
}

// Initialize typing rotation upon DOM load
document.addEventListener("DOMContentLoaded", () => {
    if (targetElement) {
        setTimeout(typeEffect, 500);
    }
});