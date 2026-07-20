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

// Clean Static Title with HTML line break
document.addEventListener("DOMContentLoaded", () => {
    const targetElement = document.getElementById('dynamic-role');
    if (targetElement) {
        targetElement.innerHTML = "Full-Stack Application Developer &\nCore Network Operator","Solutions Architect &\nNetwork Infrastructure Engineer";
    }
});

// --- ASYNCHRONOUS FORM SUBMISSION HANDLER ---
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        submitBtn.textContent = "[ TRANSMITTING PACKETS... ]";
        
        const data = new FormData(contactForm);
        
        try {
            const response = await fetch("https://formspree.io/f/mkodbbvy", {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                formStatus.style.color = "var(--accent-teal)";
                formStatus.textContent = "SUCCESS: Transmission deployed. Signal received!";
                contactForm.reset();
                submitBtn.textContent = "[ 🛰️ DEPLOY MESSAGE THROUGH SECURE TUNNEL ]";
            } else {
                formStatus.style.color = "#ff5555";
                formStatus.textContent = "ERROR: Transmission failed. Check link parameters.";
                submitBtn.textContent = "[ 🛰️ DEPLOY MESSAGE THROUGH SECURE TUNNEL ]";
            }
        } catch (error) {
            formStatus.style.color = "#ff5555";
            formStatus.textContent = "FATAL: Network socket unreachable.";
            submitBtn.textContent = "[ 🛰️ DEPLOY MESSAGE THROUGH SECURE TUNNEL ]";
        }
    });
}