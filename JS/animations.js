document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero section animation
    gsap.from('.hero-content', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.5
    });

    gsap.from('#characterMascot', {
        duration: 1,
        x: 100,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.8
    });

    // Dialogue box animation
    const dialogueBox = document.getElementById('dialogue-box');
    const characterMascot = document.getElementById('characterMascot');

    if (characterMascot) {
        characterMascot.addEventListener('mouseenter', () => {
            gsap.to(dialogueBox, {
                duration: 0.5,
                opacity: 1,
                scale: 1,
                ease: 'back.out(1.7)'
            });
        });

        characterMascot.addEventListener('mouseleave', () => {
            gsap.to(dialogueBox, {
                duration: 0.5,
                opacity: 0,
                scale: 0,
                ease: 'back.in(1.7)'
            });
        });
    }


    // Scroll-triggered animations
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Starfield background
    const starfield = document.getElementById('starfield');
    if (starfield) {
        for (let i = 0; i < 200; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 5}s`;
            star.style.animationDuration = `${Math.random() * 5 + 3}s`;
            starfield.appendChild(star);
        }
    }
});
