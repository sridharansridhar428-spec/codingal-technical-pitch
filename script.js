// Custom Cursor Movement Tracking with RequestAnimationFrame for Smooth Rendering
const cursorDot = document.querySelector('.custom-cursor.dot');
const cursorOutline = document.querySelector('.custom-cursor.outline');

let mouseX = 0;
let mouseY = 0;
let outlineX = 0;
let outlineY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (cursorDot) {
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    }
});

// Smooth lagging outline animation loop
function renderCursor() {
    if (cursorOutline) {
        outlineX += (mouseX - outlineX) * 0.2;
        outlineY += (mouseY - outlineY) * 0.2;
        
        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;
    }
    requestAnimationFrame(renderCursor);
}
requestAnimationFrame(renderCursor);

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