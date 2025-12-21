/* ================= YEAR ================= */
document.getElementById("year").textContent = new Date().getFullYear();

/* ================= THEME TOGGLE ================= */
const toggleBtn = document.getElementById("themeToggle");
const icon = toggleBtn.querySelector("i");
const root = document.documentElement;

const savedTheme = localStorage.getItem("theme");
if(savedTheme){
    root.setAttribute("data-theme", savedTheme);
    icon.className = savedTheme === "dark" ? "bi bi-sun" : "bi bi-moon";
}

toggleBtn.addEventListener("click", toggleTheme);
toggleBtn.addEventListener("keydown", (e) => {
    if(e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleTheme(); }
});

function toggleTheme(){
    const current = root.getAttribute("data-theme") || "light";
    const next = current === "dark" ? "light" : "dark";

    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);

    icon.className = next === "dark" ? "bi bi-sun" : "bi bi-moon";
    
    // Fun transition effect
    
}

/* ================= TYPING ROTATOR ================= */
const roles = [
    "C# & .NET backend engineer.",
    "Designing APIs, data models, and resilient services.",
    "Building internal tools that reduce future pain."
];
const typingEl = document.querySelector(".typing");
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop(){
    const current = roles[roleIndex];
    if(!deleting){
        typingEl.textContent = current.slice(0, ++charIndex);
        if(charIndex === current.length){
            deleting = true;
            setTimeout(typeLoop, 1200);
            return;
        }
    } else {
        typingEl.textContent = current.slice(0, --charIndex);
        if(charIndex === 0){
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }
    setTimeout(typeLoop, deleting ? 30 : 60);
}
if(typingEl) typeLoop();

/* ================= SCROLL REVEAL WITH OBSERVER ================= */
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        }
    });
},{threshold:0.15});
reveals.forEach(el=>observer.observe(el));

/* ================= SKILL BARS ANIMATION ================= */
const skillObserver = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            const items = entry.target.querySelectorAll('.skill-item');
            items.forEach((item, i) => {
                setTimeout(() => {
                    item.classList.add('show');
                    const fill = item.querySelector('.skill-fill');
                    const width = fill.dataset.width;
                    setTimeout(() => {
                        fill.style.width = width + '%';
                    }, 100);
                }, i * 100);
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, {threshold: 0.2});

const aboutSection = document.getElementById('about');
if(aboutSection) skillObserver.observe(aboutSection);

/* ================= SMOOTH NAV SCROLL ================= */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
        const target = document.querySelector(this.getAttribute('href'));
        if(target){
            e.preventDefault();
            target.scrollIntoView({behavior:'smooth', block:'start'});
            createEmojiReaction('🚀', e.clientX, e.clientY);
        }
    });
});

/* ================= CONTACT COPY + TOAST ================= */
const copyBtn = document.getElementById("copyEmail");
if(copyBtn){
    copyBtn.addEventListener("click", async () => {
        const email = document.getElementById("emailInput").value;
        try{
            await navigator.clipboard.writeText(email);
            const toastEl = document.getElementById('toast');
            const toast = new bootstrap.Toast(toastEl);
            toast.show();
            
        } catch {
            alert("Copy failed — please copy manually: " + email);
        }
    });
}

/* ================= FLOATING PARTICLES BACKGROUND ================= */
function createParticles(){
    const container = document.getElementById('particles');
    const particleCount = 30;
    
    for(let i = 0; i < particleCount; i++){
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.opacity = Math.random() * 0.3 + 0.1;
        container.appendChild(particle);
    }
}
createParticles();

/* ================= CURSOR TRAIL ================= */
const cursorTrail = document.getElementById('cursorTrail');
let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorTrail.style.opacity = '0.6';
});

function animateTrail(){
    trailX += (mouseX - trailX) * 0.1;
    trailY += (mouseY - trailY) * 0.1;
    
    cursorTrail.style.left = trailX + 'px';
    cursorTrail.style.top = trailY + 'px';
    
    requestAnimationFrame(animateTrail);
}
animateTrail();

/* ================= PROJECT CARDS SPARKLE EFFECT ================= */
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        
    });
    
    card.addEventListener('click', (e) => {
        if(e.target.tagName !== 'A'){
            
        }
    });
});



/* ================= EMOJI REACTIONS ================= */
function createEmojiReaction(emoji, x, y){
    const reaction = document.createElement('div');
    reaction.textContent = emoji;
    reaction.style.left = x + 'px';
    reaction.style.top = y + 'px';
    document.body.appendChild(reaction);

}



/* ================= SCROLL TO TOP BUTTON ================= */
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if(window.scrollY > 500){
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
    createEmojiReaction('🚀', window.innerWidth / 2, window.innerHeight / 2);
});

/* ================= EASTER EGG - CODE RAIN ================= */
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if(konamiCode.join(',') === konamiSequence.join(',')){
        activateCodeRain();
        konamiCode = [];
    }
});

function activateCodeRain(){
    const codeRain = document.getElementById('codeRain');
    codeRain.classList.add('active');
    
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789{}[];:<>?/';
    const columns = Math.floor(window.innerWidth / 20);
    
    for(let i = 0; i < columns; i++){
        for(let j = 0; j < 20; j++){
            const char = document.createElement('div');
            char.className = 'code-char';
            char.textContent = chars[Math.floor(Math.random() * chars.length)];
            char.style.left = (i * 20) + 'px';
            char.style.top = '-20px';
            char.style.animationDuration = (Math.random() * 2 + 3) + 's';
            char.style.animationDelay = (Math.random() * 2) + 's';
            codeRain.appendChild(char);
        }
    }
    
    setTimeout(() => {
        codeRain.classList.remove('active');
        setTimeout(() => {
            codeRain.innerHTML = '';
        }, 1000);
    }, 8000);
    
    createEmojiReaction('🎮', window.innerWidth / 2, window.innerHeight / 2);
}

/* ================= BRAND NAME CLICK EASTER EGG ================= */
let clickCount = 0;
const brandName = document.getElementById('brandName');

brandName.addEventListener('click', (e) => {
    e.preventDefault();
    clickCount++;
    
    if(clickCount >= 5){
        
        clickCount = 0;
    } else {
        
    }
});

/* ================= VIEW PROJECTS BUTTON ANIMATION ================= */
const viewProjectsBtn = document.getElementById('viewProjectsBtn');
viewProjectsBtn.addEventListener('click', (e) => {
    
});

/* ================= SOCIAL ICONS FUN INTERACTIONS ================= */
document.querySelectorAll('.social-icons a').forEach(link => {
    link.addEventListener('mouseenter', (e) => {
        const icon = link.querySelector('i');
        if(icon.classList.contains('bi-github')){
            createEmojiReaction('💻', e.clientX, e.clientY);
        } else if(icon.classList.contains('bi-linkedin')){
            createEmojiReaction('💼', e.clientX, e.clientY);
        }
    });
});

/* ================= TAG INTERACTIONS ================= */
document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('click', (e) => {
        createEmojiReaction('🏷️', e.clientX, e.clientY);
        createSparkles(tag.parentElement, e);
    });
});

/* ================= RANDOM FUN FACTS TOOLTIP (Optional) ================= */
const funFacts = [
    "Did you know? C# was originally called 'Cool'!",
    "Fun fact: .NET has over 100,000 APIs!",
    "The first version of .NET was released in 2002!",
    "Bootstrap was originally called 'Twitter Blueprint'!"
];

// Add fun tooltips to skills on hover
document.querySelectorAll('.skill-item strong').forEach((skill, index) => {
    skill.style.cursor = 'help';
    skill.title = funFacts[index % funFacts.length];
});

/* ================= PERFORMANCE OPTIMIZATION ================= */
// Throttle scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if(scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        // Scroll-dependent code here
    }, 100);
}, {passive: true});

/* ================= ACCESSIBILITY ENHANCEMENTS ================= */
// Announce page transitions for screen readers
function announceNavigation(target){
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = `Navigating to ${target}`;
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1000);
}

/* ================= WELCOME MESSAGE ================= */
setTimeout(() => {
    createEmojiReaction('👋', window.innerWidth / 2, 100);
}, 500);

console.log('%c🎉 Welcome to my portfolio! 🎉', 'font-size: 20px; color: #2563eb; font-weight: bold;');
console.log('%cTry clicking on the brand name 5 times! 😉', 'font-size: 14px; color: #8b5cf6;');
console.log('%cOr try the Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A', 'font-size: 14px; color: #10b981;');