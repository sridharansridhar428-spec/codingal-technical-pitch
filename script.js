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

// Dynamic Typewriter Engine (Token-based to handle <br> safely)
const titles = [
    "Application Engineer & <br>Network Topologist",
    "Solutions Architect & <br>Network Infrastructure Engineer",
    "Full-Stack Application Developer & <br>Core Network Operator"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 60;
const deletingSpeed = 30;
const pauseTime = 2200;

function typeWriter() {
    const targetElement = document.getElementById('dynamic-role');
    if (!targetElement) return;

    const currentRole = titles[roleIndex];

    if (!isDeleting) {
        // If we hit an HTML tag, advance past it immediately in one go
        if (currentRole.substr(charIndex, 5) === "<br>") {
            charIndex += 5;
        }
        charIndex++;
        targetElement.innerHTML = currentRole.substring(0, charIndex);

        if (charIndex >= currentRole.length) {
            isDeleting = true;
            setTimeout(typeWriter, pauseTime);
            return;
        }
        setTimeout(typeWriter, typingSpeed);
    } else {
        // If deleting hits an HTML tag, skip backward past it immediately
        if (currentRole.substr(charIndex - 5, 5) === "<br>") {
            charIndex -= 5;
        }
        charIndex--;
        targetElement.innerHTML = currentRole.substring(0, charIndex);

        if (charIndex <= 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % titles.length;
            charIndex = 0;
            setTimeout(typeWriter, 400);
            return;
        }
        setTimeout(typeWriter, deletingSpeed);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(typeWriter, 800);
});