/**
 * Sridharan Portfolio Core Operations Engine
 * -----------------------------------------
 * Tracks viewport entries, handles precision canvas pointers,
 * and manages alphanumeric text decryption animations.
 */

// --- 1. SMOOTH SCROLL MECHANISM ---
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// --- 2. INTERACTIVE CURSOR DYNAMICS ENGINE ---
const cursorDot = document.querySelector('.custom-cursor.dot');
const cursorOutline = document.querySelector('.custom-cursor.outline');

// Only calculate coordinates if the cursor elements exist on the layout array
if (cursorDot && cursorOutline) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Instantly transition inner core, apply transitional buffer to trailing outline
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        
        cursorOutline.style.left = `${posX}px`;
        cursorOutline.style.top = `${posY}px`;
    });

    // Handle expansion transitions across interactive hardware targets
    const triggerElements = document.querySelectorAll('a, button, .project-node, input, textarea');
    triggerElements.forEach((element) => {
        element.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('hovered');
        });
        element.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('hovered');
        });
    });
}

// --- 3. CRYPTOGRAPHIC LINK SCRAMBLE EFFECT ---
const navigationLinks = document.querySelectorAll('nav a, .action-buttons a, .social-links a, .btn-primary-sm, .btn-secondary-sm');

navigationLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const targetAttribute = this.getAttribute('href');
        
        // If it is an external link or form button simulation, let default action apply
        if (!targetAttribute || targetAttribute === '#' || !targetAttribute.startsWith('#')) return;

        const originalText = this.innerText;
        const matrixChars = "$%&—+*<>-_[]{}ÿÆŒØ#01";
        let iterationProgress = 0;
        
        const scrambleInterval = setInterval(() => {
            this.innerText = originalText
                .split("")
                .map((char, index) => {
                    if(index < iterationProgress) {
                        return originalText[index];
                    }
                    return matrixChars[Math.floor(Math.random() * matrixChars.length)];
                })
                .join("");
            
            if(iterationProgress >= originalText.length) {
                clearInterval(scrambleInterval);
                this.innerText = originalText; // Restore target baseline
            }
            
            iterationProgress += 1 / 2;
        }, 30);
    });
});

// --- 4. VIEWPORT ENGINE SCROLL VISIBILITY TRIGGER ---
const portfolioSections = document.querySelectorAll('.portfolio-section');

function evalScrollTrigger() {
    portfolioSections.forEach(sec => {
        const currentScroll = window.scrollY;
        const optimizedTriggerOffset = sec.offsetTop - 580; 
        if (currentScroll > optimizedTriggerOffset) {
            sec.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', evalScrollTrigger);
window.addEventListener('DOMContentLoaded', evalScrollTrigger);