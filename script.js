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
const titles = [
    "Application Engineer & <br>Network Topologist",
    "Solutions Architect & <br>Network Infrastructure Engineer",
    "Full-Stack Application Developer & <br>Core Network Operator"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 70;
const deletingSpeed = 35;
const pauseTime = 2200;

function typeWriter() {
    const currentRole = titles[roleIndex];
    const targetElement = document.getElementById('dynamic-role');
    
    if (!targetElement) return;

    let rawText = currentRole.substring(0, charIndex);

    // Skip over the <br> tag instantly during typing
    if (!isDeleting && rawText.includes("&") && !rawText.includes(">")) {
        const brIndex = currentRole.indexOf(">", charIndex);
        if (brIndex !== -1) {
            charIndex = brIndex + 1;
            rawText = currentRole.substring(0, charIndex);
        }
    } 
    // Skip backward over the <br> tag during deleting
    else if (isDeleting && rawText.endsWith("<br>")) {
        charIndex = currentRole.lastIndexOf("<", charIndex);
        rawText = currentRole.substring(0, charIndex);
    }

    if (isDeleting) {
        targetElement.innerHTML = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        targetElement.innerHTML = rawText;
        charIndex++;
    }

    let typeDelay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex > currentRole.length) {
        typeDelay = pauseTime;
        isDeleting = true;
    } else if (isDeleting && charIndex <= 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % titles.length;
        typeDelay = 400;
        charIndex = 0; // Ensures clean reset for the next loop loop
    }

    setTimeout(typeWriter, typeDelay);
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(typeWriter, 800);
});